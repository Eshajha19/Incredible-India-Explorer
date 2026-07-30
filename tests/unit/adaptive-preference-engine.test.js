import { describe, it, expect } from 'vitest';
import { AdaptivePreferenceEngine, chooseCostTier } from '../../js-modules/adaptive-preference-engine.js';
import { EVENT_TYPES } from '../../js-modules/interaction-tracker.js';

const DAY = 1000 * 60 * 60 * 24;
const NOW = 1_700_000_000_000;

const destinations = [
  { id: 'wild-1', name: 'Kaziranga', tags: ['wildlife', 'forests'], budget: 'mid', seasons: ['winter'] },
  { id: 'beach-1', name: 'Goa', tags: ['beaches', 'food'], budget: 'mid', seasons: ['winter'] },
  { id: 'luxury-1', name: 'Udaipur', tags: ['heritage'], budget: 'luxury', seasons: ['winter', 'summer'] },
];

function makeEngine(overrides = {}) {
  return new AdaptivePreferenceEngine({ destinations, now: () => NOW, ...overrides });
}

describe('chooseCostTier', () => {
  it('matches the trip-planner thresholds', () => {
    expect(chooseCostTier(1000, 1)).toBe('budget');
    expect(chooseCostTier(3000, 1)).toBe('mid');
    expect(chooseCostTier(8000, 1)).toBe('luxury');
  });
});

describe('AdaptivePreferenceEngine', () => {
  it('reports cold start with no events', () => {
    const engine = makeEngine();
    const profile = engine.buildProfile([]);
    expect(AdaptivePreferenceEngine.isColdStart(profile)).toBe(true);
    expect(profile.confidence).toBe(0);
  });

  it('increases the wildlife tag weight after a wildlife bookmark', () => {
    const engine = makeEngine();
    const profile = engine.buildProfile([
      { type: EVENT_TYPES.BOOKMARK, destinationId: 'wild-1', timestamp: NOW },
    ]);
    expect(profile.tagWeights.wildlife).toBeGreaterThan(0);
    expect(AdaptivePreferenceEngine.getTopTags(profile, 1)).toEqual(['wildlife']);
  });

  it('an unbookmark cancels out a prior bookmark of the same recency', () => {
    const engine = makeEngine();
    const profile = engine.buildProfile([
      { type: EVENT_TYPES.BOOKMARK, destinationId: 'wild-1', timestamp: NOW },
      { type: EVENT_TYPES.UNBOOKMARK, destinationId: 'wild-1', timestamp: NOW },
    ]);
    expect(profile.tagWeights.wildlife).toBeCloseTo(0, 5);
  });

  it('weighs a 5-star rating positively and a 1-star rating negatively', () => {
    const engine = makeEngine();
    const goodProfile = engine.buildProfile([
      { type: EVENT_TYPES.RATING, destinationId: 'wild-1', rating: 5, timestamp: NOW },
    ]);
    const badProfile = engine.buildProfile([
      { type: EVENT_TYPES.RATING, destinationId: 'wild-1', rating: 1, timestamp: NOW },
    ]);
    expect(goodProfile.tagWeights.wildlife).toBeGreaterThan(0);
    expect(badProfile.tagWeights.wildlife).toBeLessThan(0);
  });

  it('a 3-star rating is neutral', () => {
    const engine = makeEngine();
    const profile = engine.buildProfile([
      { type: EVENT_TYPES.RATING, destinationId: 'wild-1', rating: 3, timestamp: NOW },
    ]);
    expect(profile.tagWeights.wildlife || 0).toBeCloseTo(0, 5);
  });

  it('decays older events so recent activity dominates', () => {
    const engine = makeEngine();
    const recent = engine.buildProfile([
      { type: EVENT_TYPES.VIEW, destinationId: 'wild-1', timestamp: NOW },
    ]);
    const old = engine.buildProfile([
      { type: EVENT_TYPES.VIEW, destinationId: 'wild-1', timestamp: NOW - 90 * DAY },
    ]);
    expect(old.tagWeights.wildlife).toBeLessThan(recent.tagWeights.wildlife);
    expect(old.tagWeights.wildlife).toBeGreaterThan(0); // decays, never disappears entirely
  });

  it('confidence grows with more/stronger signals and eventually exits cold start', () => {
    const engine = makeEngine();
    const fewEvents = engine.buildProfile([
      { type: EVENT_TYPES.VIEW, destinationId: 'wild-1', timestamp: NOW },
    ]);
    const manyEvents = engine.buildProfile(
      Array.from({ length: 6 }, () => ({ type: EVENT_TYPES.BOOKMARK, destinationId: 'wild-1', timestamp: NOW }))
    );
    expect(fewEvents.confidence).toBeLessThan(manyEvents.confidence);
    expect(AdaptivePreferenceEngine.isColdStart(fewEvents)).toBe(true);
    expect(AdaptivePreferenceEngine.isColdStart(manyEvents)).toBe(false);
  });

  it('extracts budget affinity from a planned trip', () => {
    const engine = makeEngine();
    const profile = engine.buildProfile([
      { type: EVENT_TYPES.TRIP_PLANNED, budget: 20000, days: 2, timestamp: NOW }, // 10000/day -> luxury
    ]);
    expect(AdaptivePreferenceEngine.getPreferredBudget(profile)).toBe('luxury');
  });

  it('a search query matching a known tag contributes to that tag weight', () => {
    const engine = makeEngine();
    const profile = engine.buildProfile([
      { type: EVENT_TYPES.SEARCH, query: 'best wildlife parks', timestamp: NOW },
    ]);
    expect(profile.tagWeights.wildlife).toBeGreaterThan(0);
  });
});
