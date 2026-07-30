import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load trip-data.js (shared destination dataset)
const tripDataCode = readFileSync(resolve(__dirname, '../../trip-data.js'), 'utf-8');
const getTripData = new Function(tripDataCode + '\nreturn { tripDestinations };');
const { tripDestinations } = getTripData();
globalThis.tripDestinations = tripDestinations;

// Load destination-comparison-engine.js
const engineCode = readFileSync(resolve(__dirname, '../../js-modules/destination-comparison-engine.js'), 'utf-8');
new Function(engineCode)();
const DestinationComparison = globalThis.DestinationComparison;

describe('DestinationComparison: derived attributes', () => {
  const agra = tripDestinations.find((d) => d.id === 'agra');
  const manali = tripDestinations.find((d) => d.id === 'manali');
  const jaisalmer = tripDestinations.find((d) => d.id === 'jaisalmer');

  it('estimates climate from category, preferring the most climate-specific category', () => {
    expect(DestinationComparison.estimateClimate(jaisalmer)).toMatch(/hot|dry/i);
    expect(DestinationComparison.estimateClimate(manali)).toMatch(/cool|cold/i);
  });

  it('gives adventure-tagged, mountain destinations a higher adventure level than a historical city', () => {
    expect(DestinationComparison.estimateAdventureLevel(manali)).toBeGreaterThan(DestinationComparison.estimateAdventureLevel(agra));
  });

  it('keeps every derived score within its documented 1-5 range', () => {
    tripDestinations.forEach((d) => {
      expect(DestinationComparison.estimateAdventureLevel(d)).toBeGreaterThanOrEqual(1);
      expect(DestinationComparison.estimateAdventureLevel(d)).toBeLessThanOrEqual(5);
      expect(DestinationComparison.estimateFamilyFriendliness(d)).toBeGreaterThanOrEqual(1);
      expect(DestinationComparison.estimateFamilyFriendliness(d)).toBeLessThanOrEqual(5);
      expect(DestinationComparison.estimateAccessibility(d)).toBeGreaterThanOrEqual(1);
      expect(DestinationComparison.estimateAccessibility(d)).toBeLessThanOrEqual(5);
    });
  });

  it('finds nearby destinations within the search radius, nearest first', () => {
    const nearby = DestinationComparison.findNearbyDestinations(agra, tripDestinations);
    for (let i = 1; i < nearby.length; i++) {
      expect(nearby[i - 1].distanceKm).toBeLessThanOrEqual(nearby[i].distanceKm);
    }
    nearby.forEach((n) => expect(n.distanceKm).toBeLessThanOrEqual(200));
    expect(nearby.some((n) => n.id === agra.id)).toBe(false); // never includes itself
  });
});

describe('DestinationComparison: compareDestinations', () => {
  it('compares 1 to 4 destinations and includes every required attribute', () => {
    const result = DestinationComparison.compareDestinations(['agra', 'jaipur', 'manali', 'goa'], tripDestinations, 'mid');
    expect(result.destinations).toHaveLength(4);
    result.destinations.forEach((row) => {
      expect(row).toHaveProperty('bestTimeToVisit');
      expect(row).toHaveProperty('estimatedBudgetPerDay');
      expect(row).toHaveProperty('popularAttractions');
      expect(row).toHaveProperty('weather');
      expect(row).toHaveProperty('idealTripDuration');
      expect(row).toHaveProperty('adventureLevel');
      expect(row).toHaveProperty('familyFriendliness');
      expect(row).toHaveProperty('accessibility');
      expect(row).toHaveProperty('nearbyDestinations');
      expect(row).toHaveProperty('userRating');
    });
  });

  it('rejects more than four destinations', () => {
    expect(() =>
      DestinationComparison.compareDestinations(['agra', 'jaipur', 'manali', 'goa', 'shimla'], tripDestinations)
    ).toThrow(/up to 4/);
  });

  it('rejects an empty selection', () => {
    expect(() => DestinationComparison.compareDestinations([], tripDestinations)).toThrow(/at least one/i);
  });

  it('rejects an unknown destination id', () => {
    expect(() => DestinationComparison.compareDestinations(['not-a-real-place'], tripDestinations)).toThrow(/unknown destination/i);
  });

  it('reflects the requested cost tier in estimatedBudgetPerDay', () => {
    const budget = DestinationComparison.compareDestinations(['agra'], tripDestinations, 'budget').destinations[0];
    const luxury = DestinationComparison.compareDestinations(['agra'], tripDestinations, 'luxury').destinations[0];
    expect(budget.estimatedBudgetPerDay).toBeLessThan(luxury.estimatedBudgetPerDay);
  });

  it('updates dynamically — recomparing with a different destination set changes the result, not a cached one', () => {
    const first = DestinationComparison.compareDestinations(['agra'], tripDestinations);
    const second = DestinationComparison.compareDestinations(['manali'], tripDestinations);
    expect(first.destinations[0].name).not.toBe(second.destinations[0].name);
  });
});

describe('DestinationComparison: getRecommendation', () => {
  it('recommends the cheaper destination when budget is weighted heavily and nothing else is', () => {
    const comparison = DestinationComparison.compareDestinations(['udaipur', 'haridwar'], tripDestinations, 'mid');
    const rec = DestinationComparison.getRecommendation(comparison, { budgetWeight: 5, adventureWeight: 0, familyWeight: 0, accessibilityWeight: 0 });
    expect(rec.winner.id).toBe('haridwar'); // cheaper per-day cost in trip-data.js
  });

  it('recommends the more adventurous destination when adventure is weighted heavily and nothing else is', () => {
    const comparison = DestinationComparison.compareDestinations(['agra', 'manali'], tripDestinations, 'mid');
    const rec = DestinationComparison.getRecommendation(comparison, { budgetWeight: 0, adventureWeight: 5, familyWeight: 0, accessibilityWeight: 0 });
    expect(rec.winner.id).toBe('manali');
  });

  it('produces a human-readable explanation naming the winning destination', () => {
    const comparison = DestinationComparison.compareDestinations(['jaipur', 'shimla'], tripDestinations, 'mid');
    const rec = DestinationComparison.getRecommendation(comparison, { familyWeight: 4 });
    expect(rec.explanation).toContain(rec.winner.name);
  });

  it('penalizes destinations that need longer than the stated trip window', () => {
    const comparison = DestinationComparison.compareDestinations(['haridwar', 'lakshadweep'], tripDestinations, 'mid');
    const rec = DestinationComparison.getRecommendation(comparison, { maxDays: 1 });
    const lakshadweepRow = rec.ranked.find((r) => r.id === 'lakshadweep');
    expect(lakshadweepRow.reasons.join(' ')).toMatch(/longer than your window/);
  });

  it('handles an empty comparison gracefully instead of throwing', () => {
    const comparison = { costTier: 'mid', destinations: [] };
    const rec = DestinationComparison.getRecommendation(comparison, {});
    expect(rec.winner).toBeUndefined();
    expect(rec.explanation).toMatch(/add destinations/i);
  });
});

describe('DestinationComparison: export', () => {
  const comparison = DestinationComparison.compareDestinations(['agra', 'jaipur'], tripDestinations, 'mid');
  const recommendation = DestinationComparison.getRecommendation(comparison, { budgetWeight: 3 });

  it('exportComparisonText includes every compared destination and the recommendation', () => {
    const text = DestinationComparison.exportComparisonText(comparison, recommendation);
    expect(text).toContain('Agra');
    expect(text).toContain('Jaipur');
    expect(text).toContain(recommendation.winner.name);
  });

  it('exportComparisonJSON produces valid, parseable JSON with matching destination count', () => {
    const json = DestinationComparison.exportComparisonJSON(comparison, recommendation);
    const parsed = JSON.parse(json);
    expect(parsed.destinations).toHaveLength(2);
    expect(parsed.recommendation).toContain(recommendation.winner.name);
  });
});

describe('DestinationComparison: saved comparisons (localStorage)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with no saved comparisons', () => {
    expect(DestinationComparison.getSavedComparisons()).toEqual([]);
  });

  it('saves a comparison and retrieves it later', () => {
    const entry = DestinationComparison.saveComparison('Rajasthan trip', ['jaipur', 'jodhpur', 'udaipur']);
    const saved = DestinationComparison.getSavedComparisons();
    expect(saved).toHaveLength(1);
    expect(saved[0].id).toBe(entry.id);
    expect(saved[0].ids).toEqual(['jaipur', 'jodhpur', 'udaipur']);
  });

  it('deletes a saved comparison by id', () => {
    const entry = DestinationComparison.saveComparison('Hills trip', ['shimla', 'manali']);
    DestinationComparison.deleteSavedComparison(entry.id);
    expect(DestinationComparison.getSavedComparisons()).toEqual([]);
  });
});
