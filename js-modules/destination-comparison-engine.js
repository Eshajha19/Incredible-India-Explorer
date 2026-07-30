/**
 * js-modules/destination-comparison-engine.js
 * Intelligent Destination Comparison Tool — rule-based, client-side only,
 * no backend. Compares up to four destinations from trip-data.js across
 * budget, weather, duration, adventure level, family-friendliness,
 * accessibility, and nearby destinations, and produces an explainable
 * preference-based recommendation.
 *
 * "AI-powered" in the feature request is implemented here as transparent,
 * explainable weighted scoring against user-stated preferences — the same
 * honest framing trip-data.js already uses ("Rule-based, client-side
 * only"). There's no model call; every score can be traced back to a
 * specific preference weight and destination attribute, which also makes
 * it something this module can unit test deterministically.
 *
 * Depends on `tripDestinations` (from trip-data.js) being loaded first,
 * mirroring js-modules/trip-planner.js's dependency on the same dataset.
 * Exposes window.DestinationComparison, loaded the same way trip-planner.js
 * is (see app.js's route-based module loading).
 */
(function (root) {
  "use strict";

  const MAX_COMPARE = 4;
  const NEARBY_RADIUS_KM = 200;
  const NEARBY_LIMIT = 3;
  const SAVED_COMPARISONS_KEY = "destinationComparisonSaved";

  // ---------------------------------------------------------------------
  // Geometry (mirrors TripPlanner.haversineDistanceKm — kept local so this
  // module has no runtime dependency on trip-planner.js, only on the
  // shared trip-data.js dataset).
  // ---------------------------------------------------------------------
  function haversineDistanceKm(lat1, lng1, lat2, lng2) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // ---------------------------------------------------------------------
  // Derived attributes
  // ---------------------------------------------------------------------
  // trip-data.js has no explicit weather/adventure/family/accessibility
  // fields. Rather than inventing a large hand-curated dataset across all
  // ~96 destinations, these are transparent heuristics derived from fields
  // that already exist (categories, bestSeason, popularity, minDays). Each
  // is documented here and in docs/DESTINATION_COMPARISON.md as an
  // editorial approximation, not verified/live data.

  const CLIMATE_BY_CATEGORY = {
    desert: "Hot, dry days; cold nights",
    mountains: "Cool to cold; snow possible in winter",
    beaches: "Warm, humid, coastal",
    backwaters: "Warm, humid, coastal",
    wildlife: "Warm; varies by region and season",
    spiritual: "Varies by region — check bestSeason",
    historical: "Varies by region — check bestSeason",
    heritage: "Varies by region — check bestSeason",
    adventure: "Varies by region — check bestSeason",
    city: "Varies by region — check bestSeason",
  };
  const CLIMATE_PRIORITY = ["desert", "mountains", "beaches", "backwaters", "wildlife"];

  function estimateClimate(destination) {
    const match = CLIMATE_PRIORITY.find((cat) => destination.categories.includes(cat));
    return CLIMATE_BY_CATEGORY[match] || "Varies by region — check bestSeason";
  }

  // 1 (low) - 5 (high). Categories associated with physically demanding or
  // outdoor-risk activity push this up; every destination starts at a
  // baseline of 2 so a purely historical/spiritual city doesn't read as
  // "zero adventure".
  function estimateAdventureLevel(destination) {
    let score = 2;
    if (destination.categories.includes("adventure")) score += 2;
    if (destination.categories.includes("mountains")) score += 1;
    if (destination.categories.includes("desert")) score += 1;
    if (destination.categories.includes("wildlife")) score += 1;
    return Math.max(1, Math.min(5, score));
  }

  // 1 (low) - 5 (high). Categories with broad, low-physical-demand appeal
  // score higher; pure high-adventure destinations score lower as a
  // simple inverse of estimateAdventureLevel, nudged by category.
  function estimateFamilyFriendliness(destination) {
    let score = 3;
    if (destination.categories.some((c) => ["historical", "heritage", "city", "spiritual"].includes(c))) score += 1;
    if (destination.categories.includes("beaches")) score += 1;
    if (destination.categories.includes("adventure")) score -= 1;
    if (destination.categories.includes("desert")) score -= 1;
    return Math.max(1, Math.min(5, score));
  }

  // 1 (remote) - 5 (very accessible). Proxy from popularity (well-known
  // destinations tend to have better flight/rail connectivity in
  // practice) and minDays (destinations worth only a short stop tend to
  // sit closer to a hub than multi-day remote trips). Documented as a
  // heuristic proxy, not a measured transit-time score.
  function estimateAccessibility(destination) {
    const popularityScore = destination.popularity / 2; // 0.5-5
    const proximityBonus = destination.minDays <= 1 ? 1 : destination.minDays >= 3 ? -1 : 0;
    return Math.max(1, Math.min(5, Math.round(popularityScore + proximityBonus)));
  }

  function findNearbyDestinations(destination, allDestinations) {
    return allDestinations
      .filter((d) => d.id !== destination.id)
      .map((d) => ({ id: d.id, name: d.name, distanceKm: haversineDistanceKm(destination.lat, destination.lng, d.lat, d.lng) }))
      .filter((d) => d.distanceKm <= NEARBY_RADIUS_KM)
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, NEARBY_LIMIT);
  }

  // ---------------------------------------------------------------------
  // Comparison
  // ---------------------------------------------------------------------
  /**
   * @param {string[]} ids - 1 to 4 destination ids
   * @param {Array} [allDestinations] - defaults to global tripDestinations
   * @param {string} [costTier="mid"] - "budget" | "mid" | "luxury"
   */
  function compareDestinations(ids, allDestinations, costTier) {
    const pool = allDestinations || root.tripDestinations || [];
    const tier = costTier || "mid";
    if (!ids || ids.length === 0) {
      throw new Error("Select at least one destination to compare.");
    }
    if (ids.length > MAX_COMPARE) {
      throw new Error(`You can compare up to ${MAX_COMPARE} destinations at a time.`);
    }

    const rows = ids.map((id) => {
      const destination = pool.find((d) => d.id === id);
      if (!destination) throw new Error(`Unknown destination: ${id}`);
      return {
        id: destination.id,
        name: destination.name,
        state: destination.state,
        bestTimeToVisit: destination.bestSeason,
        estimatedBudgetPerDay: destination.costPerDay[tier] ?? destination.costPerDay.mid,
        budgetTiers: destination.costPerDay,
        popularAttractions: destination.highlights,
        weather: estimateClimate(destination),
        idealTripDuration: { minDays: destination.minDays, maxDays: destination.maxDays },
        adventureLevel: estimateAdventureLevel(destination),
        familyFriendliness: estimateFamilyFriendliness(destination),
        accessibility: estimateAccessibility(destination),
        nearbyDestinations: findNearbyDestinations(destination, pool),
        userRating: destination.popularity,
        description: destination.description,
      };
    });

    return { costTier: tier, destinations: rows };
  }

  // ---------------------------------------------------------------------
  // Preference-based recommendation
  // ---------------------------------------------------------------------
  // preferences: { budgetWeight, adventureWeight, familyWeight,
  //                accessibilityWeight, maxBudgetPerDay, maxDays }
  // Each weight is 0-5 (0 = don't care, 5 = very important). Missing
  // weights default to 1 (mild default relevance) so a comparison with no
  // stated preferences still produces a reasoned, if generic, pick.
  function scoreDestination(row, preferences) {
    const w = {
      budget: preferences.budgetWeight ?? 1,
      adventure: preferences.adventureWeight ?? 1,
      family: preferences.familyWeight ?? 1,
      accessibility: preferences.accessibilityWeight ?? 1,
    };

    const reasons = [];
    let score = 0;

    // Lower cost scores higher when budget matters; normalize against a
    // generous ceiling so the score stays in a sane 0-5-ish range per term.
    const budgetCeiling = preferences.maxBudgetPerDay || 15000;
    const budgetFit = Math.max(0, 1 - row.estimatedBudgetPerDay / budgetCeiling) * 5;
    score += budgetFit * w.budget;
    if (w.budget >= 3 && budgetFit >= 3) reasons.push(`fits comfortably within your budget (~₹${row.estimatedBudgetPerDay}/day)`);

    score += row.adventureLevel * w.adventure;
    if (w.adventure >= 3 && row.adventureLevel >= 4) reasons.push("offers a high level of adventure activity");

    score += row.familyFriendliness * w.family;
    if (w.family >= 3 && row.familyFriendliness >= 4) reasons.push("is well suited to family travel");

    score += row.accessibility * w.accessibility;
    if (w.accessibility >= 3 && row.accessibility >= 4) reasons.push("is easy to reach");

    if (preferences.maxDays && row.idealTripDuration.minDays <= preferences.maxDays) {
      score += 3;
      reasons.push(`fits within your ${preferences.maxDays}-day trip window`);
    } else if (preferences.maxDays && row.idealTripDuration.minDays > preferences.maxDays) {
      score -= 5;
      reasons.push(`typically needs more than ${preferences.maxDays} day(s), longer than your window`);
    }

    // Small, transparent tie-breaker so the recommendation isn't silent
    // about popularity when everything else is close.
    score += row.userRating * 0.2;

    return { score, reasons };
  }

  /**
   * @param {Object} comparison - output of compareDestinations()
   * @param {Object} [preferences]
   * @returns {{ winner: Object, ranked: Array, explanation: string }}
   */
  function getRecommendation(comparison, preferences) {
    const prefs = preferences || {};
    const ranked = comparison.destinations
      .map((row) => {
        const { score, reasons } = scoreDestination(row, prefs);
        return { ...row, score, reasons };
      })
      .sort((a, b) => b.score - a.score);

    const winner = ranked[0];
    const runnerUp = ranked[1];

    let explanation;
    if (!winner) {
      explanation = "Add destinations to compare before requesting a recommendation.";
    } else if (winner.reasons.length === 0) {
      explanation = `${winner.name} is the best overall match based on your comparison — no single factor stands out sharply, but it scores most consistently well across your priorities.`;
    } else {
      explanation = `${winner.name} is the best match because it ${winner.reasons.join(", and ")}.`;
    }
    if (runnerUp && winner && Math.abs(winner.score - runnerUp.score) < 1) {
      explanation += ` ${runnerUp.name} is a very close second — worth a second look if any single priority above matters more than the others.`;
    }

    return { winner, ranked, explanation };
  }

  // ---------------------------------------------------------------------
  // Export comparison report
  // ---------------------------------------------------------------------
  function exportComparisonText(comparison, recommendation) {
    const lines = ["Destination Comparison Report", ""];
    comparison.destinations.forEach((row) => {
      lines.push(`${row.name}, ${row.state}`);
      lines.push(`  Best time to visit: ${row.bestTimeToVisit}`);
      lines.push(`  Weather: ${row.weather}`);
      lines.push(`  Estimated budget: ₹${row.estimatedBudgetPerDay}/day (${comparison.costTier} tier)`);
      lines.push(`  Ideal trip duration: ${row.idealTripDuration.minDays}-${row.idealTripDuration.maxDays} days`);
      lines.push(`  Adventure level: ${row.adventureLevel}/5`);
      lines.push(`  Family friendliness: ${row.familyFriendliness}/5`);
      lines.push(`  Accessibility: ${row.accessibility}/5`);
      lines.push(`  Popular attractions: ${row.popularAttractions.join(", ")}`);
      if (row.nearbyDestinations.length) {
        lines.push(`  Nearby: ${row.nearbyDestinations.map((n) => `${n.name} (${n.distanceKm.toFixed(0)}km)`).join(", ")}`);
      }
      lines.push(`  Traveler popularity: ${row.userRating}/10`);
      lines.push("");
    });
    if (recommendation) {
      lines.push("Recommendation:");
      lines.push(`  ${recommendation.explanation}`);
    }
    return lines.join("\n");
  }

  function exportComparisonJSON(comparison, recommendation) {
    return JSON.stringify(
      { generatedAt: new Date().toISOString(), costTier: comparison.costTier, destinations: comparison.destinations, recommendation: recommendation ? recommendation.explanation : null },
      null,
      2
    );
  }

  // ---------------------------------------------------------------------
  // Save comparisons for future reference (localStorage, same pattern as
  // TripPlanner's SAVED_TRIPS_KEY — no backend in this project).
  // ---------------------------------------------------------------------
  function getStorage() {
    try {
      return typeof localStorage !== "undefined" ? localStorage : null;
    } catch (e) {
      return null;
    }
  }

  function getSavedComparisons() {
    const storage = getStorage();
    if (!storage) return [];
    try {
      return JSON.parse(storage.getItem(SAVED_COMPARISONS_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveComparison(name, ids) {
    const storage = getStorage();
    const saved = getSavedComparisons();
    const entry = { id: `cmp_${Date.now()}`, name: name || ids.join(" vs "), ids, savedAt: new Date().toISOString() };
    const updated = [...saved, entry];
    if (storage) storage.setItem(SAVED_COMPARISONS_KEY, JSON.stringify(updated));
    return entry;
  }

  function deleteSavedComparison(entryId) {
    const storage = getStorage();
    const updated = getSavedComparisons().filter((c) => c.id !== entryId);
    if (storage) storage.setItem(SAVED_COMPARISONS_KEY, JSON.stringify(updated));
    return updated;
  }

  // ---------------------------------------------------------------------
  root.DestinationComparison = {
    MAX_COMPARE,
    haversineDistanceKm,
    estimateClimate,
    estimateAdventureLevel,
    estimateFamilyFriendliness,
    estimateAccessibility,
    findNearbyDestinations,
    compareDestinations,
    getRecommendation,
    exportComparisonText,
    exportComparisonJSON,
    getSavedComparisons,
    saveComparison,
    deleteSavedComparison,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = root.DestinationComparison;
  }
})(typeof window !== "undefined" ? window : globalThis);
