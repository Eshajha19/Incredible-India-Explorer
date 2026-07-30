/**
 * adaptive-preference-engine.js
 * Issue #864 — AI-Powered Personalized Travel Companion.
 *
 * Turns the raw event log from interaction-tracker.js into a weighted
 * preference profile: which interest tags the user gravitates toward,
 * which budget tier and travel season/month they favor, and how confident
 * we are in that profile yet (so the recommender can detect a genuine
 * cold start vs. a returning user).
 *
 * Pure and DOM-free — same convention as EventRecommendationEngine — so it
 * can be unit tested without a browser. Reuses the exact same destination
 * shape as js-modules/travel/travel-recommend-data.js (`tags`, `budget`,
 * `seasons`) rather than introducing a second, competing tag taxonomy.
 */

import { EVENT_TYPES } from './interaction-tracker.js';

// Signals decay exponentially so a trip planned last week counts for more
// than one from six months ago, without ever fully discarding history.
const DEFAULT_HALF_LIFE_DAYS = 30;

// Base weight per event type before recency decay is applied.
const BASE_WEIGHT = Object.freeze({
  [EVENT_TYPES.VIEW]: 1,
  [EVENT_TYPES.SEARCH]: 1.5,
  [EVENT_TYPES.BOOKMARK]: 4,
  [EVENT_TYPES.UNBOOKMARK]: -4,
  [EVENT_TYPES.TRIP_PLANNED]: 3,
  // RATING is handled specially: centered on 3 stars, see ratingWeight().
});

// Total accumulated |weight| needed before we call the profile "warmed up"
// enough to stop treating the user as a cold start. Tuned to roughly
// "a small handful of bookmarks/ratings, or a slightly longer browsing session".
const CONFIDENCE_SATURATION = 12;

/** Same budget-tier thresholds as js-modules/trip-planner.js's chooseCostTier,
 *  kept in sync so a planned trip maps to the same tier the destination
 *  catalog's `budget` field uses. */
export function chooseCostTier(perPersonBudget, days) {
  const perDay = perPersonBudget / Math.max(1, days || 1);
  if (perDay >= 7000) return 'luxury';
  if (perDay >= 2800) return 'mid';
  return 'budget';
}

function ratingWeight(rating) {
  // 5 stars -> +4, 4 -> +2, 3 -> 0, 2 -> -2, 1 -> -4
  return (Number(rating) - 3) * 2;
}

function decayFactor(ageMs, halfLifeDays) {
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  return Math.pow(0.5, ageDays / halfLifeDays);
}

function addWeighted(map, key, amount) {
  if (!key && key !== 0) return;
  map[key] = (map[key] || 0) + amount;
}

export class AdaptivePreferenceEngine {
  /**
   * @param {object} [options]
   * @param {Array} [options.destinations] catalog with {id, tags, budget, seasons} — e.g. window.TRAVEL_DESTINATIONS
   * @param {number} [options.halfLifeDays]
   * @param {number} [options.now] injectable "current time" (ms) for deterministic tests
   */
  constructor(options = {}) {
    this.destinations = options.destinations || [];
    this.halfLifeDays = options.halfLifeDays || DEFAULT_HALF_LIFE_DAYS;
    this.now = options.now || (() => Date.now());
  }

  _destination(id) {
    return this.destinations.find((d) => d.id === id);
  }

  /**
   * Builds a preference profile from a raw event list.
   * @param {Array} events from InteractionTracker.getEvents()
   * @returns {{tagWeights:object, budgetWeights:object, seasonWeights:object, totalSignal:number, confidence:number, eventCount:number}}
   */
  buildProfile(events = []) {
    const nowMs = typeof this.now === 'function' ? this.now() : this.now;
    const tagWeights = {};
    const budgetWeights = {};
    const seasonWeights = {};
    let totalSignal = 0;

    for (const event of events) {
      const ageMs = Math.max(0, nowMs - (event.timestamp || nowMs));
      const decay = decayFactor(ageMs, this.halfLifeDays);

      let baseWeight;
      if (event.type === EVENT_TYPES.RATING) {
        baseWeight = ratingWeight(event.rating);
      } else {
        baseWeight = BASE_WEIGHT[event.type] ?? 0;
      }
      const weight = baseWeight * decay;
      totalSignal += Math.abs(weight);

      // Distribute a destination-linked event's weight across its tags.
      const dest = event.destinationId ? this._destination(event.destinationId) : null;
      if (dest && Array.isArray(dest.tags) && dest.tags.length) {
        const perTag = weight / dest.tags.length;
        dest.tags.forEach((tag) => addWeighted(tagWeights, tag, perTag));
      }
      if (dest && dest.budget) {
        addWeighted(budgetWeights, dest.budget, weight);
      }
      if (dest && Array.isArray(dest.seasons)) {
        dest.seasons.forEach((season) => addWeighted(seasonWeights, season, weight / dest.seasons.length));
      }

      // A search query can name a tag directly (e.g. searching "wildlife" or
      // "beaches") even before the user opens any matching destination.
      if (event.type === EVENT_TYPES.SEARCH && event.query) {
        const q = event.query.toLowerCase();
        const knownTags = new Set(this.destinations.flatMap((d) => d.tags || []));
        knownTags.forEach((tag) => {
          if (q.includes(tag)) addWeighted(tagWeights, tag, weight);
        });
      }

      // An explicitly planned trip carries direct budget/month evidence,
      // independent of which destination (if any) it was linked to.
      if (event.type === EVENT_TYPES.TRIP_PLANNED) {
        if (event.budget && event.days) {
          const tier = chooseCostTier(event.budget, event.days);
          addWeighted(budgetWeights, tier, weight);
        }
        if (event.month) {
          addWeighted(seasonWeights, `month:${event.month}`, weight);
        }
      }
    }

    return {
      tagWeights,
      budgetWeights,
      seasonWeights,
      totalSignal,
      eventCount: events.length,
      confidence: Math.min(1, totalSignal / CONFIDENCE_SATURATION),
    };
  }

  /** True when there isn't yet enough signal to call this a learned profile. */
  static isColdStart(profile) {
    return !profile || profile.confidence < 0.15;
  }

  /** Top N tags by learned weight, positive weights only. */
  static getTopTags(profile, n = 3) {
    if (!profile) return [];
    return Object.entries(profile.tagWeights)
      .filter(([, weight]) => weight > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([tag]) => tag);
  }

  /** Highest-weighted budget tier, or null if no signal yet. */
  static getPreferredBudget(profile) {
    if (!profile) return null;
    const entries = Object.entries(profile.budgetWeights).filter(([, w]) => w > 0);
    if (!entries.length) return null;
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }
}

export default AdaptivePreferenceEngine;
