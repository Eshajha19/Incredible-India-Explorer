import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load trip-data.js
const tripDataCode = readFileSync(resolve(__dirname, '../../trip-data.js'), 'utf-8');
const getTripData = new Function(tripDataCode + '\nreturn { tripDestinations };');
const { tripDestinations } = getTripData();
globalThis.tripDestinations = tripDestinations;

// Load trip-planner.js
const plannerCode = readFileSync(resolve(__dirname, '../../js-modules/trip-planner.js'), 'utf-8');
// Evaluate the code so the IIFE executes on globalThis
new Function(plannerCode)();
const TripPlanner = globalThis.TripPlanner;

describe('TripPlanner Core Logic', () => {
  it('should compute haversine distance correctly', () => {
    const d = TripPlanner.haversineDistanceKm(28.6139, 77.209, 28.6139, 77.209);
    expect(d).toBe(0);

    const delhiAgra = TripPlanner.haversineDistanceKm(28.6139, 77.209, 27.1767, 78.0081);
    expect(delhiAgra).toBeGreaterThan(150);
    expect(delhiAgra).toBeLessThan(250);
  });

  it('should choose correct cost tier based on daily budget', () => {
    expect(TripPlanner.chooseCostTier(2000, 10)).toBe('budget');
    expect(TripPlanner.chooseCostTier(35000, 10)).toBe('mid');
    expect(TripPlanner.chooseCostTier(100000, 10)).toBe('luxury');
  });

  it('should generate a valid itinerary', () => {
    const it = TripPlanner.generateItinerary({ budget: 50000, days: 7, travelers: 1, categories: ['mountains'] });
    expect(it.destinations.length).toBeGreaterThan(0);
    expect(it.daysUsed).toBeLessThanOrEqual(7);
    expect(it.budget.grandTotal).toBeGreaterThan(0);
  });
});

describe('TripPlanner URL Serialization/Deserialization', () => {
  it('should serialize inputs to query parameters correctly', () => {
    const inputs = {
      budget: 45000,
      days: 8,
      travelers: 2,
      categories: ['beaches', 'adventure']
    };
    const queryString = TripPlanner.serializeParams(inputs);
    expect(queryString).toContain('budget=45000');
    expect(queryString).toContain('days=8');
    expect(queryString).toContain('travelers=2');
    expect(queryString).toContain('categories=beaches%2Cadventure');
  });

  it('should deserialize query parameters back to inputs object', () => {
    const queryString = '?budget=55000&days=6&travelers=3&categories=historical,spiritual';
    const parsed = TripPlanner.deserializeParams(queryString);
    expect(parsed.budget).toBe(55000);
    expect(parsed.days).toBe(6);
    expect(parsed.travelers).toBe(3);
    expect(parsed.categories).toEqual(['historical', 'spiritual']);
  });

  it('should handle empty/missing parameters during deserialization', () => {
    const parsed = TripPlanner.deserializeParams('');
    expect(parsed.budget).toBeNull();
    expect(parsed.days).toBeNull();
    expect(parsed.travelers).toBe(1); // default
    expect(parsed.categories).toEqual([]);
  });
});
