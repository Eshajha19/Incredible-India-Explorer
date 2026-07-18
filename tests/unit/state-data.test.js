/**
 * state-data.test.js
 * Tests for mapData.locations — validates all 36 Indian states/UTs have
 * correct structure, required fields, and valid SVG path data.
 */

import { describe, it, expect } from 'vitest';

const REQUIRED_FIELDS = ['id', 'name', 'path', 'capital', 'food', 'festival', 'description', 'story'];

describe('mapData.locations — state data integrity', () => {
  it('has exactly 36 state entries', () => {
    expect(mapData.locations).toHaveLength(36);
  });

  it('every state has all required fields', () => {
    mapData.locations.forEach((state) => {
      REQUIRED_FIELDS.forEach((field) => {
        expect(state).toHaveProperty(field);
      });
    });
  });

  it('every required field is a non-empty string', () => {
    mapData.locations.forEach((state) => {
      REQUIRED_FIELDS.forEach((field) => {
        expect(typeof state[field]).toBe('string');
        expect(state[field].trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('all state IDs are unique', () => {
    const ids = mapData.locations.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all state names are unique', () => {
    const names = mapData.locations.map((s) => s.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('every SVG path data is a non-empty string (valid SVG path syntax)', () => {
    mapData.locations.forEach((state) => {
      expect(state.path.length).toBeGreaterThan(10);
      // SVG path data typically starts with 'm' or 'M'
      expect(state.path.trim().charAt(0).toLowerCase()).toBe('m');
    });
  });

  it('every description is a substantial sentence (>20 chars)', () => {
    mapData.locations.forEach((state) => {
      expect(state.description.length).toBeGreaterThan(20);
    });
  });

  it('every story includes the capital name', () => {
    mapData.locations.forEach((state) => {
      expect(state.story).toContain(state.capital);
    });
  });

  it('state lookup by id returns the correct state', () => {
    const lookup = (id) => mapData.locations.find((s) => s.id === id);
    expect(lookup('mh').name).toBe('Maharashtra');
    expect(lookup('dl').name).toBe('Delhi');
    expect(lookup('tn').name).toBe('Tamil Nadu');
    expect(lookup('rj').name).toBe('Rajasthan');
    expect(lookup('wb').name).toBe('West Bengal');
  });

  it('mapData has a valid viewBox string', () => {
    expect(mapData.viewBox).toMatch(/^\d+\s+\d+\s+\d+\s+\d+$/);
  });

  it('all state IDs are 2-letter lowercase codes', () => {
    mapData.locations.forEach((state) => {
      expect(state.id).toMatch(/^[a-z]{2}$/);
    });
  });

  it('food and festival are distinct from state name', () => {
    mapData.locations.forEach((state) => {
      expect(state.food).not.toBe(state.name);
      expect(state.festival).not.toBe(state.name);
    });
  });
});
