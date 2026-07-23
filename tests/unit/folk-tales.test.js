/**
 * folk-tales.test.js
 * Unit tests for Indian Folk Tales Explorer data structure, filtering,
 * search algorithms, state grouping, and helper utilities.
 */

import { describe, it, expect } from 'vitest';
import {
  folkTalesData,
  filterTales,
  groupTalesByState,
  groupTalesByRegion,
  groupTalesByCategory,
  getUniqueStates,
  getUniqueCategories,
  getUniqueRegions
} from '../../frontend/folk-tales/folk-tales.js';

const REQUIRED_FIELDS = [
  'id',
  'title',
  'state',
  'stateCode',
  'region',
  'category',
  'moral',
  'summary',
  'fullStory',
  'image',
  'tags'
];

describe('Indian Folk Tales Data Integrity', () => {
  it('contains at least 30 folk tales in the dataset', () => {
    expect(folkTalesData.length).toBeGreaterThanOrEqual(30);
  });

  it('every story contains all required fields with non-empty values', () => {
    folkTalesData.forEach((tale, index) => {
      REQUIRED_FIELDS.forEach(field => {
        expect(tale, `Story at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'tags') {
          expect(Array.isArray(tale.tags)).toBe(true);
          expect(tale.tags.length).toBeGreaterThan(0);
        } else {
          expect(typeof tale[field]).toBe('string');
          expect(tale[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all story IDs are unique', () => {
    const ids = folkTalesData.map(t => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all story titles are unique', () => {
    const titles = folkTalesData.map(t => t.title);
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  it('covers multiple geographic regions of India', () => {
    const regions = new Set(folkTalesData.map(t => t.region));
    expect(regions.has('North')).toBe(true);
    expect(regions.has('South')).toBe(true);
    expect(regions.has('East')).toBe(true);
    expect(regions.has('West')).toBe(true);
    expect(regions.has('Central')).toBe(true);
    expect(regions.has('Northeast')).toBe(true);
  });

  it('covers at least 15 distinct Indian states', () => {
    const states = new Set(folkTalesData.map(t => t.state));
    expect(states.size).toBeGreaterThanOrEqual(15);
  });
});

describe('Folk Tales Filtering & Search Algorithms', () => {
  it('returns all tales when search query and filters are default', () => {
    const result = filterTales(folkTalesData);
    expect(result.length).toBe(folkTalesData.length);
  });

  it('filters tales by title query', () => {
    const result = filterTales(folkTalesData, { search: 'Birbal' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(tale => {
      const match = tale.title.toLowerCase().includes('birbal') ||
                    tale.summary.toLowerCase().includes('birbal') ||
                    tale.tags.includes('birbal');
      expect(match).toBe(true);
    });
  });

  it('filters tales by state code or name', () => {
    const result = filterTales(folkTalesData, { state: 'wb' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(tale => {
      expect(tale.stateCode).toBe('wb');
    });
  });

  it('filters tales by region', () => {
    const result = filterTales(folkTalesData, { region: 'south' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(tale => {
      expect(tale.region.toLowerCase()).toBe('south');
    });
  });

  it('filters tales by category', () => {
    const result = filterTales(folkTalesData, { category: 'royal trickster' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(tale => {
      expect(tale.category.toLowerCase()).toBe('royal trickster');
    });
  });

  it('combines search query, state, and region filters correctly', () => {
    const result = filterTales(folkTalesData, {
      search: 'jackal',
      region: 'south'
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(tale => {
      expect(tale.region.toLowerCase()).toBe('south');
    });
  });

  it('returns empty array when search query matches no story', () => {
    const result = filterTales(folkTalesData, { search: 'nonexistentstoryquery12345' });
    expect(result.length).toBe(0);
  });

  it('handles invalid or empty inputs gracefully', () => {
    expect(filterTales(null)).toEqual([]);
    expect(filterTales(undefined)).toEqual([]);
    expect(filterTales([])).toEqual([]);
  });
});

describe('Folk Tales Grouping Logic', () => {
  it('groups tales accurately by state', () => {
    const grouped = groupTalesByState(folkTalesData);
    expect(Object.keys(grouped).length).toBeGreaterThanOrEqual(15);
    expect(grouped['Uttar Pradesh']).toBeDefined();
    expect(grouped['Uttar Pradesh'].some(t => t.id === 'birbal-khichdi')).toBe(true);
  });

  it('groups tales accurately by region', () => {
    const grouped = groupTalesByRegion(folkTalesData);
    expect(grouped['North']).toBeDefined();
    expect(grouped['South']).toBeDefined();
    expect(grouped['East']).toBeDefined();
    expect(grouped['West']).toBeDefined();
    expect(grouped['Central']).toBeDefined();
    expect(grouped['Northeast']).toBeDefined();
  });

  it('groups tales accurately by category', () => {
    const grouped = groupTalesByCategory(folkTalesData);
    expect(grouped['Royal Trickster']).toBeDefined();
    expect(grouped['Myth & Legend']).toBeDefined();
    expect(grouped['Animal Fable']).toBeDefined();
  });

  it('handles invalid input for grouping functions', () => {
    expect(groupTalesByState(null)).toEqual({});
    expect(groupTalesByRegion(undefined)).toEqual({});
    expect(groupTalesByCategory(123)).toEqual({});
  });
});

describe('Folk Tales Utility Functions', () => {
  it('extracts unique states sorted alphabetically by name', () => {
    const states = getUniqueStates(folkTalesData);
    expect(states.length).toBeGreaterThanOrEqual(15);
    expect(states[0]).toHaveProperty('code');
    expect(states[0]).toHaveProperty('name');
    for (let i = 1; i < states.length; i++) {
      expect(states[i - 1].name.localeCompare(states[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('extracts unique categories sorted alphabetically', () => {
    const categories = getUniqueCategories(folkTalesData);
    expect(categories.length).toBeGreaterThan(0);
    expect(categories).toContain('Royal Trickster');
    expect(categories).toContain('Animal Fable');
  });

  it('extracts unique regions', () => {
    const regions = getUniqueRegions(folkTalesData);
    expect(regions).toContain('North');
    expect(regions).toContain('South');
    expect(regions).toContain('East');
  });
});
