/**
 * excavations.test.js
 * Unit tests for Archaeological Excavation Explorer dataset, search matching,
 * period/state filtering, sorting algorithms, and grouping functions.
 */

import { describe, it, expect } from 'vitest';
import {
  excavationsData,
  filterExcavations,
  sortExcavations,
  groupExcavationsByPeriod,
  groupExcavationsByState,
  getUniqueStates,
  getUniquePeriods
} from '../../excavations.js';

const REQUIRED_FIELDS = [
  'id',
  'title',
  'state',
  'stateCode',
  'location',
  'period',
  'discoveryYear',
  'archaeologistOrAgency',
  'artifactsDiscovered',
  'image',
  'description',
  'significance',
  'tags'
];

describe('Archaeological Excavation Data Integrity', () => {
  it('contains at least 25 excavation site entries in the dataset', () => {
    expect(excavationsData.length).toBeGreaterThanOrEqual(25);
  });

  it('every excavation site contains all required fields with non-empty values', () => {
    excavationsData.forEach((item, index) => {
      REQUIRED_FIELDS.forEach(field => {
        expect(item, `Excavation site at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'tags') {
          expect(Array.isArray(item.tags)).toBe(true);
          expect(item.tags.length).toBeGreaterThan(0);
        } else if (field === 'discoveryYear') {
          expect(typeof item[field]).toBe('number');
          expect(item[field]).toBeGreaterThan(1800);
        } else {
          expect(typeof item[field]).toBe('string');
          expect(item[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all excavation site IDs are unique', () => {
    const ids = excavationsData.map(i => i.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all excavation site titles are unique', () => {
    const titles = excavationsData.map(i => i.title);
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  it('includes key archaeological excavation sites mentioned in requirements (Dholavira, Lothal, Rakhigarhi, Kalibangan, Keezhadi, Sinauli)', () => {
    const siteIds = new Set(excavationsData.map(i => i.id));
    expect(siteIds.has('dholavira')).toBe(true);
    expect(siteIds.has('lothal')).toBe(true);
    expect(siteIds.has('rakhigarhi')).toBe(true);
    expect(siteIds.has('kalibangan')).toBe(true);
    expect(siteIds.has('keezhadi')).toBe(true);
    expect(siteIds.has('sinauli')).toBe(true);
  });

  it('spans multiple historical eras (Prehistoric, Neolithic, Indus Valley, Iron Age/Sangam, Early Historic)', () => {
    const periods = new Set(excavationsData.map(i => i.period));
    expect(periods.has('Indus Valley Civilisation')).toBe(true);
    expect(periods.has('Iron Age & Sangam Era')).toBe(true);
    expect(periods.has('Early Historic & Classical Era')).toBe(true);
    expect(periods.has('Neolithic & Chalcolithic Era')).toBe(true);
    expect(periods.has('Prehistoric & Paleolithic Era')).toBe(true);
  });
});

describe('Archaeological Excavation Search & Filtering Algorithms', () => {
  it('returns all excavation sites when search query and filters are default', () => {
    const result = filterExcavations(excavationsData);
    expect(result.length).toBe(excavationsData.length);
  });

  it('filters excavations by search query (e.g. dockyard or Dholavira)', () => {
    const result = filterExcavations(excavationsData, { search: 'dockyard' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(item => {
      const matches = [
        item.title,
        item.location,
        item.state,
        item.period,
        item.archaeologistOrAgency,
        item.artifactsDiscovered,
        item.description,
        item.significance,
        ...(item.tags || [])
      ].some(f => f && f.toLowerCase().includes('dockyard'));
      expect(matches).toBe(true);
    });
  });

  it('filters excavations by state code (e.g. gj for Gujarat)', () => {
    const result = filterExcavations(excavationsData, { state: 'gj' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(item => {
      expect(item.stateCode).toBe('gj');
    });
  });

  it('filters excavations by historical period', () => {
    const result = filterExcavations(excavationsData, { period: 'indus valley civilisation' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(item => {
      expect(item.period.toLowerCase()).toBe('indus valley civilisation');
    });
  });

  it('combines search, state, and period filters correctly', () => {
    const result = filterExcavations(excavationsData, {
      search: 'signboard',
      state: 'gj',
      period: 'indus valley civilisation'
    });
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('dholavira');
  });

  it('returns empty array when search query matches no item', () => {
    const result = filterExcavations(excavationsData, { search: 'nonexistentexcavationsite999' });
    expect(result.length).toBe(0);
  });

  it('handles invalid or empty inputs gracefully', () => {
    expect(filterExcavations(null)).toEqual([]);
    expect(filterExcavations(undefined)).toEqual([]);
    expect(filterExcavations([])).toEqual([]);
  });
});

describe('Archaeological Excavation Sorting & Grouping Utilities', () => {
  it('sorts excavations by discovery year ascending', () => {
    const sorted = sortExcavations(excavationsData, 'year-asc');
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].discoveryYear).toBeLessThanOrEqual(sorted[i].discoveryYear);
    }
  });

  it('sorts excavations by discovery year descending', () => {
    const sorted = sortExcavations(excavationsData, 'year-desc');
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].discoveryYear).toBeGreaterThanOrEqual(sorted[i].discoveryYear);
    }
  });

  it('sorts excavations alphabetically by title name', () => {
    const sorted = sortExcavations(excavationsData, 'name-asc');
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].title.localeCompare(sorted[i].title)).toBeLessThanOrEqual(0);
    }
  });

  it('groups excavations by period correctly', () => {
    const grouped = groupExcavationsByPeriod(excavationsData);
    expect(grouped['Indus Valley Civilisation']).toBeDefined();
    expect(grouped['Iron Age & Sangam Era']).toBeDefined();
    expect(grouped['Prehistoric & Paleolithic Era']).toBeDefined();
  });

  it('groups excavations by state correctly', () => {
    const grouped = groupExcavationsByState(excavationsData);
    expect(grouped['Gujarat']).toBeDefined();
    expect(grouped['Tamil Nadu']).toBeDefined();
    expect(grouped['Haryana']).toBeDefined();
  });

  it('extracts unique states sorted alphabetically', () => {
    const states = getUniqueStates(excavationsData);
    expect(states.length).toBeGreaterThanOrEqual(6);
    expect(states[0]).toHaveProperty('code');
    expect(states[0]).toHaveProperty('name');
    for (let i = 1; i < states.length; i++) {
      expect(states[i - 1].name.localeCompare(states[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('extracts unique periods sorted alphabetically', () => {
    const periods = getUniquePeriods(excavationsData);
    expect(periods.length).toBeGreaterThan(0);
    expect(periods).toContain('Indus Valley Civilisation');
    expect(periods).toContain('Iron Age & Sangam Era');
  });
});
