import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Minimal in-memory localStorage polyfill (vitest's default 'node'
// environment has no localStorage global, unlike a browser/jsdom).
function makeLocalStorageStub() {
  let store = {};
  return {
    getItem: (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; },
  };
}
globalThis.localStorage = makeLocalStorageStub();

// Load trip-data.js (used by the engine to look up destination-specific rates)
const tripDataCode = readFileSync(resolve(__dirname, '../../trip-data.js'), 'utf-8');
const getTripData = new Function(tripDataCode + '\nreturn { tripDestinations };');
const { tripDestinations } = getTripData();
globalThis.tripDestinations = tripDestinations;

// Load smart-budget-planner.js so its IIFE executes on globalThis
const engineCode = readFileSync(resolve(__dirname, '../../js-modules/smart-budget-planner.js'), 'utf-8');
new Function(engineCode)();
const SmartBudgetPlanner = globalThis.SmartBudgetPlanner;

describe('SmartBudgetPlanner.calculateBudget', () => {
  it('produces a positive total with all category costs present', () => {
    const plan = SmartBudgetPlanner.calculateBudget({
      destination: 'Jaipur',
      days: 5,
      travelers: 2,
      accommodationTier: 'standard',
      transportMode: 'train',
      dailyFoodBudget: 800,
      sightseeing: 3000,
      shopping: 2000,
      misc: 1000,
    });

    expect(plan.total).toBeGreaterThan(0);
    expect(plan.categories.accommodation).toBeGreaterThan(0);
    expect(plan.categories.transport).toBeGreaterThan(0);
    expect(plan.categories.food).toBe(800 * 5 * 2);
    expect(plan.categories.sightseeing).toBe(3000);
    expect(plan.categories.shopping).toBe(2000);
    expect(plan.categories.misc).toBe(1000);
    expect(plan.categories.contingency).toBeGreaterThan(0);
    expect(plan.matchedDestination).toBe('Jaipur');
  });

  it('sums category percentages to (approximately) 100', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ days: 4, travelers: 1, dailyFoodBudget: 600 });
    const sum = Object.values(plan.categoryPercentages).reduce((a, b) => a + b, 0);
    expect(sum).toBeGreaterThan(99);
    expect(sum).toBeLessThan(101);
  });

  it('falls back to sane defaults for an unrecognized destination', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Nowhereville', days: 3, travelers: 1 });
    expect(plan.matchedDestination).toBeNull();
    expect(plan.total).toBeGreaterThan(0);
  });

  it('clamps invalid/negative inputs to safe minimums', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ days: -5, travelers: 0, sightseeing: -100 });
    expect(plan.inputs.days).toBe(1);
    expect(plan.inputs.travelers).toBe(1);
    expect(plan.categories.sightseeing).toBe(0);
  });

  it('scales accommodation cost with number of travelers (room sharing)', () => {
    const solo = SmartBudgetPlanner.calculateBudget({ days: 4, travelers: 1, accommodationTier: 'standard' });
    const group = SmartBudgetPlanner.calculateBudget({ days: 4, travelers: 4, accommodationTier: 'standard' });
    // 4 travelers = 2 rooms, so cost should be roughly double 1 traveler = 1 room, not 4x
    expect(group.categories.accommodation).toBeCloseTo(solo.categories.accommodation * 2, -2);
  });
});

describe('SmartBudgetPlanner.compareTiers', () => {
  it('returns an increasing total from budget -> standard -> luxury', () => {
    const tiers = SmartBudgetPlanner.compareTiers({ days: 5, travelers: 2, transportMode: 'train' });
    const byTier = Object.fromEntries(tiers.map((t) => [t.tier, t.total]));
    expect(byTier.budget).toBeLessThan(byTier.standard);
    expect(byTier.standard).toBeLessThan(byTier.luxury);
  });
});

describe('SmartBudgetPlanner.getRecommendations', () => {
  it('flags flights on short trips and suggests train as an alternative', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ days: 2, travelers: 1, transportMode: 'flight' });
    const recs = SmartBudgetPlanner.getRecommendations(plan);
    expect(recs.some((r) => r.category === 'transport')).toBe(true);
  });

  it('flags high shopping allowance relative to total budget', () => {
    const plan = SmartBudgetPlanner.calculateBudget({
      days: 3,
      travelers: 1,
      dailyFoodBudget: 300,
      shopping: 20000,
    });
    const recs = SmartBudgetPlanner.getRecommendations(plan);
    expect(recs.some((r) => r.category === 'shopping')).toBe(true);
  });

  it('always includes at least one general suggestion', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ days: 5, travelers: 1 });
    const recs = SmartBudgetPlanner.getRecommendations(plan);
    expect(recs.some((r) => r.category === 'general')).toBe(true);
  });
});

describe('SmartBudgetPlanner.getDailySpendingPlan', () => {
  it('divides every category evenly across the trip length', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ days: 5, travelers: 1, sightseeing: 5000 });
    const daily = SmartBudgetPlanner.getDailySpendingPlan(plan);
    expect(daily.sightseeing).toBe(Math.round(5000 / 5));
    expect(daily.total).toBe(Math.round(plan.total / 5));
  });
});

describe('SmartBudgetPlanner.exportReportText', () => {
  it('includes destination, total cost, and category lines', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Goa', days: 4, travelers: 2 });
    const recs = SmartBudgetPlanner.getRecommendations(plan);
    const text = SmartBudgetPlanner.exportReportText(plan, recs);
    expect(text).toContain('Goa');
    expect(text).toContain('TOTAL ESTIMATED COST');
    expect(text).toContain('Accommodation');
  });
});

describe('SmartBudgetPlanner persistence (save / edit / delete)', () => {
  beforeEach(() => {
    globalThis.localStorage.clear();
  });

  it('starts with no saved plans', () => {
    expect(SmartBudgetPlanner.getSavedPlans()).toEqual([]);
  });

  it('saves a plan and retrieves it back', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Manali', days: 4, travelers: 2 });
    const ok = SmartBudgetPlanner.savePlan(plan);
    expect(ok).toBe(true);

    const saved = SmartBudgetPlanner.getSavedPlans();
    expect(saved.length).toBe(1);
    expect(saved[0].plan.id).toBe(plan.id);
    expect(saved[0].title).toContain('Manali');
  });

  it('edits (recalculates) an existing saved plan in place', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Manali', days: 4, travelers: 2 });
    SmartBudgetPlanner.savePlan(plan);

    const updated = SmartBudgetPlanner.updateSavedPlan(plan.id, { destination: 'Manali', days: 7, travelers: 2 });
    expect(updated.plan.inputs.days).toBe(7);
    expect(updated.plan.id).toBe(plan.id);

    const saved = SmartBudgetPlanner.getSavedPlans();
    expect(saved.length).toBe(1); // still just one record, updated in place
    expect(saved[0].plan.inputs.days).toBe(7);
  });

  it('deletes a saved plan', () => {
    const plan = SmartBudgetPlanner.calculateBudget({ destination: 'Manali', days: 4, travelers: 2 });
    SmartBudgetPlanner.savePlan(plan);
    expect(SmartBudgetPlanner.getSavedPlans().length).toBe(1);

    SmartBudgetPlanner.deleteSavedPlan(plan.id);
    expect(SmartBudgetPlanner.getSavedPlans().length).toBe(0);
  });
});
