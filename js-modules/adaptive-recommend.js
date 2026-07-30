/**
 * adaptive-recommend.js
 * Issue #864 — AI-Powered Personalized Travel Companion.
 *
 * Ranks destinations by blending two signal sources:
 *   - "explicit" preferences — the interest/budget/season quiz already
 *     shipped in js-modules/travel/travel-recommend.js (issue #185)
 *   - "learned" preferences — the AdaptivePreferenceEngine profile built
 *     from real behavior (bookmarks, searches, ratings, planned trips)
 *
 * A brand-new visitor has neither, so recommendations fall back to a
 * diverse/popular set with an honest "help us learn your taste" message —
 * this is what makes the "cold start" acceptance criterion testable rather
 * than silently guessing.
 *
 * Kept pure/DOM-free like its sibling engines so it can be unit tested
 * directly and reused by both frontend/travel/ and the Preference Dashboard.
 */

import { AdaptivePreferenceEngine } from './adaptive-preference-engine.js';

const DEFAULT_LIMIT = 6;

function shuffle(arr, random = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 0-1 normalized score for how well a destination's tags match learned tag weights. */
function learnedTagScore(dest, profile) {
  if (!profile || !dest.tags || !dest.tags.length) return 0;
  const sum = dest.tags.reduce((acc, tag) => acc + Math.max(0, profile.tagWeights[tag] || 0), 0);
  return sum / dest.tags.length;
}

/** 0-1 score for explicit quiz interest overlap (mirrors travel-recommend.js's scoring, without duplicating its DOM wiring). */
function explicitTagScore(dest, explicitPrefs) {
  const interests = (explicitPrefs && explicitPrefs.interests) || [];
  if (!interests.length || !dest.tags) return 0;
  const matched = dest.tags.filter((t) => interests.includes(t));
  return matched.length / interests.length;
}

function budgetBonus(dest, explicitPrefs, profile) {
  let bonus = 0;
  if (explicitPrefs && explicitPrefs.budget && explicitPrefs.budget !== 'any' && dest.budget === explicitPrefs.budget) {
    bonus += 1;
  }
  const learnedBudget = AdaptivePreferenceEngine.getPreferredBudget(profile);
  if (learnedBudget && dest.budget === learnedBudget) bonus += 1;
  return bonus;
}

function seasonBonus(dest, explicitPrefs) {
  if (!explicitPrefs || !explicitPrefs.season || explicitPrefs.season === 'any') return 0;
  if (!dest.seasons) return 0;
  return dest.seasons.includes(explicitPrefs.season) || dest.seasons.includes('year-round') ? 1 : 0;
}

function buildExplanation({ dest, learnedTags, explicitInterests, budgetMatched, seasonMatched }) {
  const parts = [];
  if (learnedTags.length) {
    parts.push(`you've recently engaged with ${learnedTags.join(' and ')} destinations`);
  }
  if (explicitInterests.length) {
    parts.push(`you told us you enjoy ${explicitInterests.join(' and ')}`);
  }
  if (budgetMatched) parts.push(`it matches your typical budget`);
  if (seasonMatched) parts.push(`it's ideal for your preferred travel season`);

  if (!parts.length) {
    return 'A popular pick to help us learn your taste — bookmark or rate places you like to sharpen future recommendations.';
  }
  const joined = parts.length === 1 ? parts[0] : parts.slice(0, -1).join(', ') + ', and ' + parts[parts.length - 1];
  return `Recommended because ${joined}.`;
}

export class AdaptiveRecommender {
  /** @param {Array} destinations catalog with {id, tags, budget, seasons, popularity?} */
  constructor(destinations = []) {
    this.destinations = destinations;
  }

  /**
   * @param {object} [options]
   * @param {object} [options.explicitPrefs] {interests:string[], budget:string, season:string} from the existing quiz
   * @param {object} [options.profile] output of AdaptivePreferenceEngine#buildProfile
   * @param {number} [options.limit]
   * @param {string[]} [options.excludeIds]
   * @param {Function} [options.random] injectable RNG for deterministic tests
   */
  recommend(options = {}) {
    const { explicitPrefs, profile, limit = DEFAULT_LIMIT, excludeIds = [], random } = options;
    const excluded = new Set(excludeIds);
    const pool = this.destinations.filter((d) => !excluded.has(d.id));

    const hasExplicit = Boolean(
      explicitPrefs &&
        ((explicitPrefs.interests && explicitPrefs.interests.length) ||
          (explicitPrefs.budget && explicitPrefs.budget !== 'any') ||
          (explicitPrefs.season && explicitPrefs.season !== 'any'))
    );
    const hasLearned = !AdaptivePreferenceEngine.isColdStart(profile);

    if (!hasExplicit && !hasLearned) {
      return shuffle(pool, random)
        .slice(0, limit)
        .map((dest) => ({
          dest,
          score: 0,
          isColdStart: true,
          explanation: buildExplanation({ dest, learnedTags: [], explicitInterests: [], budgetMatched: false, seasonMatched: false }),
        }));
    }

    const ranked = pool
      .map((dest) => {
        const learned = learnedTagScore(dest, profile);
        const explicit = explicitTagScore(dest, explicitPrefs);
        const bBonus = budgetBonus(dest, explicitPrefs, profile);
        const sBonus = seasonBonus(dest, explicitPrefs);

        // Explicit quiz answers are a stronger, deliberate signal than
        // inferred behavior, so they're weighted higher when both exist.
        const score = explicit * 3 + learned * 2 + bBonus + sBonus;

        const learnedTags = AdaptivePreferenceEngine.getTopTags(profile, 2).filter((t) => (dest.tags || []).includes(t));
        const explicitInterests = ((explicitPrefs && explicitPrefs.interests) || []).filter((t) => (dest.tags || []).includes(t));

        return {
          dest,
          score,
          isColdStart: false,
          explanation: buildExplanation({
            dest,
            learnedTags,
            explicitInterests,
            budgetMatched: bBonus > 0,
            seasonMatched: sBonus > 0,
          }),
        };
      })
      .sort((a, b) => b.score - a.score);

    return ranked.slice(0, limit);
  }
}

export default AdaptiveRecommender;
