import { describe, it, expect } from 'vitest';
import { AdaptiveRecommender } from '../../js-modules/adaptive-recommend.js';
import { AdaptivePreferenceEngine } from '../../js-modules/adaptive-preference-engine.js';
import { EVENT_TYPES } from '../../js-modules/interaction-tracker.js';

const destinations = [
  { id: 'wild-1', name: 'Kaziranga', tags: ['wildlife', 'forests'], budget: 'mid', seasons: ['winter'] },
  { id: 'beach-1', name: 'Goa', tags: ['beaches', 'food'], budget: 'mid', seasons: ['winter'] },
  { id: 'luxury-1', name: 'Udaipur', tags: ['heritage'], budget: 'luxury', seasons: ['winter', 'summer'] },
  { id: 'wild-2', name: 'Ranthambore', tags: ['wildlife'], budget: 'luxury', seasons: ['winter'] },
];

describe('AdaptiveRecommender — cold start', () => {
  it('returns a diverse, clearly-labeled cold-start list when there is no explicit or learned signal', () => {
    const recommender = new AdaptiveRecommender(destinations);
    const results = recommender.recommend({ limit: 4, random: () => 0.5 });

    expect(results).toHaveLength(4);
    results.forEach((r) => {
      expect(r.isColdStart).toBe(true);
      expect(r.explanation).toMatch(/help us learn your taste/i);
    });
  });
});

describe('AdaptiveRecommender — learned preferences', () => {
  it('ranks wildlife destinations first once the learned profile favors wildlife', () => {
    const engine = new AdaptivePreferenceEngine({ destinations, now: () => 1_700_000_000_000 });
    const profile = engine.buildProfile([
      { type: EVENT_TYPES.BOOKMARK, destinationId: 'wild-1', timestamp: 1_700_000_000_000 },
      { type: EVENT_TYPES.BOOKMARK, destinationId: 'wild-2', timestamp: 1_700_000_000_000 },
      { type: EVENT_TYPES.RATING, destinationId: 'wild-1', rating: 5, timestamp: 1_700_000_000_000 },
    ]);

    const recommender = new AdaptiveRecommender(destinations);
    const results = recommender.recommend({ profile, limit: 4 });

    expect(results[0].dest.tags).toContain('wildlife');
    expect(results[0].isColdStart).toBe(false);
    expect(results[0].explanation).toMatch(/wildlife/i);
  });
});

describe('AdaptiveRecommender — explicit preferences', () => {
  it('prioritizes destinations matching explicit quiz interests', () => {
    const recommender = new AdaptiveRecommender(destinations);
    const results = recommender.recommend({
      explicitPrefs: { interests: ['beaches'], budget: 'any', season: 'any' },
      limit: 4,
    });

    expect(results[0].dest.id).toBe('beach-1');
    expect(results[0].explanation).toMatch(/beaches/i);
  });

  it('gives a budget bonus when explicit budget matches the destination tier', () => {
    const recommender = new AdaptiveRecommender(destinations);
    const results = recommender.recommend({
      explicitPrefs: { interests: [], budget: 'luxury', season: 'any' },
      limit: 4,
    });
    const top2 = results.slice(0, 2).map((r) => r.dest.budget);
    expect(top2).toContain('luxury');
  });
});

describe('AdaptiveRecommender — exclusions and limits', () => {
  it('respects excludeIds and limit', () => {
    const recommender = new AdaptiveRecommender(destinations);
    const results = recommender.recommend({
      explicitPrefs: { interests: ['wildlife'], budget: 'any', season: 'any' },
      excludeIds: ['wild-1'],
      limit: 10,
    });
    expect(results.some((r) => r.dest.id === 'wild-1')).toBe(false);
  });
});

describe('AdaptiveRecommender — performance', () => {
  it('stays fast on a large synthetic catalog (acceptance criterion: performant for large datasets)', () => {
    const large = Array.from({ length: 5000 }, (_, i) => ({
      id: `dest-${i}`,
      name: `Destination ${i}`,
      tags: [i % 2 === 0 ? 'wildlife' : 'beaches'],
      budget: i % 3 === 0 ? 'luxury' : 'mid',
      seasons: ['winter'],
    }));
    const recommender = new AdaptiveRecommender(large);

    const start = Date.now();
    const results = recommender.recommend({
      explicitPrefs: { interests: ['wildlife'], budget: 'mid', season: 'any' },
      limit: 10,
    });
    const elapsedMs = Date.now() - start;

    expect(results).toHaveLength(10);
    expect(elapsedMs).toBeLessThan(200); // single linear pass over 5k items should be near-instant
  });
});
