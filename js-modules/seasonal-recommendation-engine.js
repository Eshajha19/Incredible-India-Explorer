/**
 * seasonal-recommendation-engine.js
 *
 * Seasonal Travel Recommendation Engine (Issue #773).
 *
 * Pure, DOM-free logic that ranks destinations for a given travel month
 * by combining three signals already present in this repo's datasets,
 * rather than duplicating them:
 *
 *  - `trip-data.js`'s `bestSeason` field (e.g. "Oct-Mar", or multiple
 *    ranges like "Mar-Jun, Oct-Feb") — used to score how well a chosen
 *    travel month fits a destination.
 *  - `event-data.js`'s recurring festival/event windows
 *    (startMonth/endMonth), cross-referenced by `destinationId` or
 *    `state` — used to surface festivals happening during that month.
 *  - `popularity` and `categories`/interest tags, already used by
 *    js-modules/travel/travel-recommend.js (Issue #185) — used the same
 *    way here for interest matching and tie-breaking.
 *
 * No live weather API is called here. Real day-level forecasts (see
 * weather-core.js / weather-service.js) only cover ~2 weeks out, which
 * doesn't match this feature's "which month should I visit" use case, so
 * "weather-aware" is implemented as season-fit against each destination's
 * curated best-season window instead of live conditions — consistent
 * with how bestSeason is already used elsewhere in this project. See
 * docs/seasonal-recommendation-engine.md for the full rationale.
 *
 * Kept DOM/localStorage-free (mirrors event-recommendation-engine.js) so
 * it can be unit tested directly — see
 * tests/unit/seasonal-recommendation-engine.test.js.
 */

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MONTH_INDEX = MONTH_NAMES.reduce((acc, name, i) => {
  acc[name.toLowerCase()] = i + 1;
  return acc;
}, {});

/** True if `month` (1-12) falls within a possibly year-wrapping [start, end] range. */
function monthInRange(month, start, end) {
  if (typeof month !== "number" || typeof start !== "number" || typeof end !== "number") {
    return false;
  }
  if (start <= end) return month >= start && month <= end;
  // Wraps across the year boundary, e.g. Nov(11) - Feb(2).
  return month >= start || month <= end;
}

/**
 * Parses a `bestSeason` string like `"Oct-Mar"` or `"Mar-Jun, Sep-Dec"`
 * into an array of `{ start, end }` month-number ranges (1-12). Unknown
 * or malformed segments are skipped rather than throwing, since this
 * dataset is hand-curated free text.
 */
export function parseSeasonRanges(bestSeason) {
  if (typeof bestSeason !== "string" || !bestSeason.trim()) return [];

  return bestSeason
    .split(",")
    .map((segment) => segment.trim())
    .map((segment) => {
      const parts = segment.split("-").map((p) => p.trim().toLowerCase());
      if (parts.length !== 2) return null;
      const start = MONTH_INDEX[parts[0]];
      const end = MONTH_INDEX[parts[1]];
      if (!start || !end) return null;
      return { start, end };
    })
    .filter(Boolean);
}

/**
 * Distance in months from `month` to the nearest edge of a single
 * [start, end] range (0 if inside the range), accounting for wraparound.
 */
function monthsFromRange(month, start, end) {
  if (monthInRange(month, start, end)) return 0;
  const distTo = (a, b) => {
    const diff = Math.abs(a - b);
    return Math.min(diff, 12 - diff);
  };
  return Math.min(distTo(month, start), distTo(month, end));
}

/**
 * Scores how well `month` (1-12) fits a destination's `bestSeason`
 * windows. Pure function - the core "seasonal ranking" signal.
 *
 * Returns:
 *  - level: "ideal" | "shoulder" | "off-season" | "unknown"
 *  - score: 1 (ideal), 0.55 (shoulder, i.e. one month from an ideal
 *    window), or 0.15 (off-season)
 *  - reason: short human-readable explanation
 */
export function computeSeasonalFit(destination, month) {
  const ranges = parseSeasonRanges(destination && destination.bestSeason);
  const monthName = MONTH_NAMES[month - 1];

  if (!ranges.length) {
    return {
      level: "unknown",
      score: 0.5,
      reason: `No curated best-season data for ${destination ? destination.name : "this destination"} yet.`,
    };
  }

  const minDistance = Math.min(...ranges.map((r) => monthsFromRange(month, r.start, r.end)));

  if (minDistance === 0) {
    return {
      level: "ideal",
      score: 1,
      reason: `${monthName} falls within ${destination.name}'s best season (${destination.bestSeason}).`,
    };
  }

  if (minDistance === 1) {
    return {
      level: "shoulder",
      score: 0.55,
      reason: `${monthName} is just outside ${destination.name}'s peak season (${destination.bestSeason}) - expect a shoulder-season mix of conditions.`,
    };
  }

  return {
    level: "off-season",
    score: 0.15,
    reason: `${monthName} is outside ${destination.name}'s best season (${destination.bestSeason}) - conditions are likely to be unfavorable.`,
  };
}

/** Festivals/events happening at `destination` during `month`, sorted by popularity. */
export function getFestivalsForMonth(destination, month, events) {
  if (!destination || !Array.isArray(events)) return [];
  return events
    .filter((event) => {
      const matchesPlace =
        event.destinationId === destination.id ||
        (destination.state && event.state &&
          event.state.toLowerCase() === destination.state.toLowerCase());
      return matchesPlace && monthInRange(month, event.startMonth, event.endMonth);
    })
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
}

export class SeasonalRecommendationEngine {
  /**
   * @param {Object} [options]
   * @param {Array} [options.destinations] Destinations (trip-data.js shape: id, name, state, categories, bestSeason, popularity).
   * @param {Array} [options.events] Festivals/events (event-data.js shape: destinationId, state, startMonth, endMonth, popularity).
   */
  constructor(options = {}) {
    this.destinations = options.destinations || [];
    this.events = options.events || [];
  }

  static get MONTHS() {
    return MONTH_NAMES.slice();
  }

  /**
   * Ranks destinations for a given travel month.
   *
   * @param {Object} params
   * @param {number} params.month 1-12
   * @param {string[]} [params.interests] category tags to prefer (matches destination.categories)
   * @param {number} [params.limit=6]
   * @returns {Array} ranked results: { destination, score, seasonalFit, festivals, matchedInterests, explanation }
   */
  recommend({ month, interests = [], limit = 6 } = {}) {
    if (typeof month !== "number" || month < 1 || month > 12) {
      throw new Error("recommend() requires a `month` between 1 and 12");
    }

    const normalizedInterests = (interests || []).map((i) => String(i).toLowerCase());

    const scored = this.destinations.map((destination) => {
      const seasonalFit = computeSeasonalFit(destination, month);
      const festivals = getFestivalsForMonth(destination, month, this.events);

      const matchedInterests = normalizedInterests.length
        ? (destination.categories || []).filter((c) => normalizedInterests.includes(c.toLowerCase()))
        : [];

      // Weighting: seasonal fit dominates (this is a *seasonal*
      // recommendation engine), interests are a strong secondary
      // signal, festivals + popularity are tie-breaking bonuses.
      const interestScore = normalizedInterests.length
        ? matchedInterests.length / normalizedInterests.length
        : 1; // no interests given -> don't penalize anyone
      const festivalBonus = festivals.length ? Math.min(festivals.length * 0.05, 0.15) : 0;
      const popularityBonus = ((destination.popularity || 0) / 10) * 0.1;

      const score =
        seasonalFit.score * 0.55 +
        interestScore * 0.25 +
        festivalBonus +
        popularityBonus;

      const explanationParts = [seasonalFit.reason];
      if (matchedInterests.length) {
        explanationParts.push(`Matches your interest in ${matchedInterests.join(", ")}.`);
      }
      if (festivals.length) {
        explanationParts.push(
          `${festivals[0].name}${festivals.length > 1 ? ` (+${festivals.length - 1} more)` : ""} takes place around this time.`,
        );
      }

      return {
        destination,
        score: Number(score.toFixed(4)),
        seasonalFit,
        festivals,
        matchedInterests,
        explanation: explanationParts.join(" "),
      };
    });

    const filtered = normalizedInterests.length
      ? scored.filter((r) => r.matchedInterests.length > 0)
      : scored;

    return filtered.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  /**
   * Suggests alternative destinations for `month` when `destination` is
   * a poor seasonal fit - same category, but genuinely "ideal" for that
   * month, ranked by popularity.
   *
   * @param {Object} destination The destination the user was originally interested in.
   * @param {number} month 1-12
   * @param {number} [limit=3]
   */
  getAlternatives(destination, month, limit = 3) {
    if (!destination) return [];
    const fit = computeSeasonalFit(destination, month);
    if (fit.level === "ideal" || fit.level === "unknown") return [];

    const categories = destination.categories || [];
    const monthName = MONTH_NAMES[month - 1];

    return this.destinations
      .filter((candidate) => candidate.id !== destination.id)
      .map((candidate) => ({
        destination: candidate,
        seasonalFit: computeSeasonalFit(candidate, month),
        sharedCategories: (candidate.categories || []).filter((c) => categories.includes(c)),
      }))
      .filter((r) => r.seasonalFit.level === "ideal" && r.sharedCategories.length > 0)
      .sort((a, b) => {
        if (b.sharedCategories.length !== a.sharedCategories.length) {
          return b.sharedCategories.length - a.sharedCategories.length;
        }
        return (b.destination.popularity || 0) - (a.destination.popularity || 0);
      })
      .slice(0, limit)
      .map((r) => ({
        ...r,
        explanation: `${r.destination.name} shares ${destination.name}'s ${r.sharedCategories.join("/")} appeal and is ideal to visit in ${monthName}, unlike ${destination.name} this time of year.`,
      }));
  }
}

export const SEASONAL_ENGINE_INTERNALS = { monthInRange, monthsFromRange, MONTH_NAMES, MONTH_INDEX };
