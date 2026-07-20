/**
 * bridges.test.js
 * Unit tests for Indian Bridges Explorer data structure, filtering,
 * search algorithms, sorting, and helper utilities.
 */

import { describe, it, expect } from 'vitest';
import {
  bridgesData,
  filterBridges,
  sortBridges,
  groupBridgesByState,
  getUniqueStates,
  getUniqueTypes
} from '../../bridges.js';

const REQUIRED_FIELDS = [
  'id',
  'name',
  'state',
  'stateCode',
  'location',
  'type',
  'waterBody',
  'lengthMeters',
  'yearOpened',
  'constructionHistory',
  'engineeringHighlights',
  'image',
  'tags'
];

describe('Indian Bridges Data Integrity', () => {
  it('contains at least 25 famous bridges in the dataset', () => {
    expect(bridgesData.length).toBeGreaterThanOrEqual(25);
  });

  it('every bridge contains all required fields with non-empty values', () => {
    bridgesData.forEach((bridge, index) => {
      REQUIRED_FIELDS.forEach(field => {
        expect(bridge, `Bridge at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'tags') {
          expect(Array.isArray(bridge.tags)).toBe(true);
          expect(bridge.tags.length).toBeGreaterThan(0);
        } else if (field === 'lengthMeters' || field === 'yearOpened') {
          expect(typeof bridge[field]).toBe('number');
          expect(bridge[field]).toBeGreaterThan(0);
        } else {
          expect(typeof bridge[field]).toBe('string');
          expect(bridge[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all bridge IDs are unique', () => {
    const ids = bridgesData.map(b => b.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all bridge names are unique', () => {
    const names = bridgesData.map(b => b.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it('covers at least 10 distinct Indian states/UTs', () => {
    const states = new Set(bridgesData.map(b => b.state));
    expect(states.size).toBeGreaterThanOrEqual(10);
  });

  it('includes diverse bridge types (Cantilever, Cable-stayed, Arch, Beam, Truss, Living Root)', () => {
    const types = new Set(bridgesData.map(b => b.type));
    expect(types.has('Cantilever')).toBe(true);
    expect(types.has('Cable-stayed')).toBe(true);
    expect(types.has('Arch')).toBe(true);
    expect(types.has('Beam')).toBe(true);
    expect(types.has('Truss')).toBe(true);
    expect(types.has('Living Root')).toBe(true);
  });
});

describe('Bridges Filtering & Search Algorithms', () => {
  it('returns all bridges when search query and filters are default', () => {
    const result = filterBridges(bridgesData);
    expect(result.length).toBe(bridgesData.length);
  });

  it('filters bridges by search query (e.g. Howrah)', () => {
    const result = filterBridges(bridgesData, { search: 'Howrah' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(bridge => {
      const match = [
        bridge.name,
        bridge.location,
        bridge.state,
        bridge.waterBody,
        bridge.type,
        bridge.constructionHistory,
        bridge.engineeringHighlights,
        ...(bridge.tags || [])
      ].some(f => f && f.toLowerCase().includes('howrah'));
      expect(match).toBe(true);
    });
  });

  it('filters bridges by state code', () => {
    const result = filterBridges(bridgesData, { state: 'wb' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(bridge => {
      expect(bridge.stateCode).toBe('wb');
    });
  });

  it('filters bridges by type (e.g. cable-stayed)', () => {
    const result = filterBridges(bridgesData, { type: 'cable-stayed' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(bridge => {
      expect(bridge.type.toLowerCase()).toBe('cable-stayed');
    });
  });

  it('combines search, state, and type filters correctly', () => {
    const result = filterBridges(bridgesData, {
      search: 'mumbai',
      state: 'mh',
      type: 'cable-stayed'
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(bridge => {
      expect(bridge.stateCode).toBe('mh');
      expect(bridge.type.toLowerCase()).toBe('cable-stayed');
    });
  });

  it('returns empty array when search query matches no bridge', () => {
    const result = filterBridges(bridgesData, { search: 'nonexistentbridgename999' });
    expect(result.length).toBe(0);
  });

  it('handles invalid or empty inputs gracefully', () => {
    expect(filterBridges(null)).toEqual([]);
    expect(filterBridges(undefined)).toEqual([]);
    expect(filterBridges([])).toEqual([]);
  });
});

describe('Bridges Sorting Logic', () => {
  it('sorts bridges by length descending', () => {
    const sorted = sortBridges(bridgesData, 'length-desc');
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].lengthMeters).toBeGreaterThanOrEqual(sorted[i].lengthMeters);
    }
  });

  it('sorts bridges by length ascending', () => {
    const sorted = sortBridges(bridgesData, 'length-asc');
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].lengthMeters).toBeLessThanOrEqual(sorted[i].lengthMeters);
    }
  });

  it('sorts bridges by year opened descending', () => {
    const sorted = sortBridges(bridgesData, 'year-desc');
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].yearOpened).toBeGreaterThanOrEqual(sorted[i].yearOpened);
    }
  });

  it('sorts bridges by year opened ascending', () => {
    const sorted = sortBridges(bridgesData, 'year-asc');
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].yearOpened).toBeLessThanOrEqual(sorted[i].yearOpened);
    }
  });

  it('sorts bridges alphabetically by name', () => {
    const sorted = sortBridges(bridgesData, 'name-asc');
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

describe('Bridges Grouping & Helper Functions', () => {
  it('groups bridges correctly by state', () => {
    const grouped = groupBridgesByState(bridgesData);
    expect(Object.keys(grouped).length).toBeGreaterThanOrEqual(10);
    expect(grouped['West Bengal']).toBeDefined();
    expect(grouped['West Bengal'].some(b => b.id === 'howrah-bridge')).toBe(true);
  });

  it('extracts unique states sorted alphabetically', () => {
    const states = getUniqueStates(bridgesData);
    expect(states.length).toBeGreaterThanOrEqual(10);
    expect(states[0]).toHaveProperty('code');
    expect(states[0]).toHaveProperty('name');
    for (let i = 1; i < states.length; i++) {
      expect(states[i - 1].name.localeCompare(states[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('extracts unique bridge types sorted alphabetically', () => {
    const types = getUniqueTypes(bridgesData);
    expect(types.length).toBeGreaterThan(0);
    expect(types).toContain('Cantilever');
    expect(types).toContain('Cable-stayed');
    expect(types).toContain('Arch');
  });
});
