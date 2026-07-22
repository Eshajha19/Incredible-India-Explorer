/**
 * cultural-footprint.test.js
 * Unit tests for State Cultural Footprint Explorer dataset, directional link integrity,
 * search/category filtering, and cross-state influence traversal lookups.
 */

import { describe, it, expect } from 'vitest';
import {
  states,
  influences,
  domains,
  filterStates,
  filterInfluences,
  getStateInfluences,
  findStateById,
  getUniqueDomains,
  getUniqueRegions
} from '../../cultural-footprint.js';

const REQUIRED_STATE_FIELDS = [
  'id',
  'name',
  'region',
  'capital',
  'summary',
  'coords'
];

const REQUIRED_INFLUENCE_FIELDS = [
  'id',
  'source',
  'target',
  'domain',
  'title',
  'strength',
  'description'
];

describe('Cultural Footprint States Dataset Integrity', () => {
  it('contains at least 20 states in the dataset', () => {
    expect(states.length).toBeGreaterThanOrEqual(20);
  });

  it('every state contains all required fields with non-empty values', () => {
    states.forEach((state, index) => {
      REQUIRED_STATE_FIELDS.forEach(field => {
        expect(state, `State at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'coords') {
          expect(typeof state.coords.x).toBe('number');
          expect(typeof state.coords.y).toBe('number');
          expect(state.coords.x).toBeGreaterThanOrEqual(0);
          expect(state.coords.x).toBeLessThanOrEqual(900);
          expect(state.coords.y).toBeGreaterThanOrEqual(0);
          expect(state.coords.y).toBeLessThanOrEqual(600);
        } else {
          expect(typeof state[field]).toBe('string');
          expect(state[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all state IDs and coordinates are unique', () => {
    const ids = states.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);

    const coordSet = new Set(states.map(s => `${s.coords.x},${s.coords.y}`));
    expect(coordSet.size).toBe(states.length);
  });
});

describe('Cultural Footprint Influences & Network Integrity', () => {
  it('contains at least 35 influence links in the dataset', () => {
    expect(influences.length).toBeGreaterThanOrEqual(35);
  });

  it('every influence link contains all required fields with valid values', () => {
    influences.forEach((inf, index) => {
      REQUIRED_INFLUENCE_FIELDS.forEach(field => {
        expect(inf, `Influence link at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'strength') {
          expect(typeof inf.strength).toBe('number');
          expect(inf.strength).toBeGreaterThanOrEqual(1);
          expect(inf.strength).toBeLessThanOrEqual(5);
        } else {
          expect(typeof inf[field]).toBe('string');
          expect(inf[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('every influence link references valid existing state IDs for source and target', () => {
    const stateIds = new Set(states.map(s => s.id));
    influences.forEach((inf, index) => {
      expect(stateIds.has(inf.source), `Link at index ${index} source "${inf.source}" does not exist`).toBe(true);
      expect(stateIds.has(inf.target), `Link at index ${index} target "${inf.target}" does not exist`).toBe(true);
      expect(inf.source, `Link at index ${index} cannot have self-referential influence`).not.toBe(inf.target);
    });
  });

  it('covers all 8 core cultural domains', () => {
    const activeDomains = new Set(influences.map(inf => inf.domain));
    expect(activeDomains.size).toBe(8);
    domains.forEach(d => {
      expect(activeDomains.has(d), `Domain ${d} has no influence links mapped`).toBe(true);
    });
  });
});

describe('Cultural Footprint Filtering & Search', () => {
  it('returns all states when query and region are default', () => {
    const result = filterStates(states);
    expect(result.length).toBe(states.length);
  });

  it('filters states by search query (e.g. Bengal)', () => {
    const result = filterStates(states, { search: 'Bengal' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(s => {
      const match = [s.name, s.capital, s.region, s.summary].some(f => f && f.toLowerCase().includes('bengal'));
      expect(match).toBe(true);
    });
  });

  it('filters states by region (e.g. South)', () => {
    const result = filterStates(states, { region: 'South' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(s => {
      expect(s.region.toLowerCase()).toBe('south');
    });
  });

  it('filters influence links by domain (e.g. cuisine)', () => {
    const result = filterInfluences(influences, { domain: 'cuisine' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(inf => {
      expect(inf.domain).toBe('cuisine');
    });
  });

  it('filters influence links by origin state (e.g. WB)', () => {
    const result = filterInfluences(influences, { originState: 'WB' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(inf => {
      expect(inf.source).toBe('WB');
    });
  });

  it('handles invalid or empty inputs gracefully', () => {
    expect(filterStates(null)).toEqual([]);
    expect(filterInfluences(null)).toEqual([]);
  });
});

describe('Cultural Footprint Traversal & Lookups', () => {
  it('finds state by ID correctly', () => {
    const st = findStateById('TN');
    expect(st).toBeDefined();
    expect(st.name).toBe('Tamil Nadu');
  });

  it('returns incoming and outgoing influences for a given state', () => {
    const { outgoing, incoming } = getStateInfluences('WB', influences);
    expect(outgoing.length).toBeGreaterThan(0);
    expect(incoming.length).toBeGreaterThanOrEqual(0);
    outgoing.forEach(inf => expect(inf.source).toBe('WB'));
    incoming.forEach(inf => expect(inf.target).toBe('WB'));
  });

  it('extracts unique domains sorted alphabetically', () => {
    const uniqueDom = getUniqueDomains(influences);
    expect(uniqueDom.length).toBe(8);
    for (let i = 1; i < uniqueDom.length; i++) {
      expect(uniqueDom[i - 1].localeCompare(uniqueDom[i])).toBeLessThanOrEqual(0);
    }
  });

  it('extracts unique regions', () => {
    const regions = getUniqueRegions(states);
    expect(regions.length).toBeGreaterThan(0);
    expect(regions).toContain('East');
    expect(regions).toContain('South');
    expect(regions).toContain('West');
    expect(regions).toContain('North');
  });
});
