/**
 * space.test.js
 * Unit tests for Indian Space Heritage Explorer data structure, filtering,
 * search algorithms, category/state grouping, and helper utilities.
 */

import { describe, it, expect } from 'vitest';
import {
  spaceData,
  filterSpaceItems,
  groupSpaceItemsByCategory,
  groupSpaceItemsByState,
  getUniqueStates,
  getUniqueCategories
} from '../../space.js';

const REQUIRED_FIELDS = [
  'id',
  'title',
  'state',
  'stateCode',
  'location',
  'category',
  'yearEstablishedOrLaunched',
  'type',
  'description',
  'keyContributions',
  'launchVehicleOrRocket',
  'image',
  'tags'
];

describe('Indian Space Heritage Data Integrity', () => {
  it('contains at least 25 space entries in the dataset', () => {
    expect(spaceData.length).toBeGreaterThanOrEqual(25);
  });

  it('every space entry contains all required fields with non-empty values', () => {
    spaceData.forEach((item, index) => {
      REQUIRED_FIELDS.forEach(field => {
        expect(item, `Space item at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'tags') {
          expect(Array.isArray(item.tags)).toBe(true);
          expect(item.tags.length).toBeGreaterThan(0);
        } else if (field === 'yearEstablishedOrLaunched') {
          expect(typeof item[field]).toBe('number');
          expect(item[field]).toBeGreaterThan(1950);
        } else {
          expect(typeof item[field]).toBe('string');
          expect(item[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all space item IDs are unique', () => {
    const ids = spaceData.map(i => i.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all space item titles are unique', () => {
    const titles = spaceData.map(i => i.title);
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  it('covers ISRO launch sites, research centres, tracking centres, satellites, and deep space missions', () => {
    const categories = new Set(spaceData.map(i => i.category));
    expect(categories.has('Launch Sites')).toBe(true);
    expect(categories.has('Research Centres')).toBe(true);
    expect(categories.has('Tracking Centres')).toBe(true);
    expect(categories.has('Historic Satellites')).toBe(true);
    expect(categories.has('Deep Space & Solar')).toBe(true);
  });

  it('covers multiple Indian states/UTs (Andhra Pradesh, Kerala, Karnataka, Gujarat, Telangana, Tamil Nadu, Odisha, etc.)', () => {
    const states = new Set(spaceData.map(i => i.state));
    expect(states.size).toBeGreaterThanOrEqual(6);
  });
});

describe('Space Heritage Filtering & Search Algorithms', () => {
  it('returns all space items when search query and filters are default', () => {
    const result = filterSpaceItems(spaceData);
    expect(result.length).toBe(spaceData.length);
  });

  it('filters space items by search query (e.g. Chandrayaan)', () => {
    const result = filterSpaceItems(spaceData, { search: 'Chandrayaan' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(item => {
      const match = [
        item.title,
        item.location,
        item.state,
        item.category,
        item.type,
        item.description,
        item.keyContributions,
        item.launchVehicleOrRocket,
        ...(item.tags || [])
      ].some(f => f && f.toLowerCase().includes('chandrayaan'));
      expect(match).toBe(true);
    });
  });

  it('filters space items by state code (e.g. ap for Andhra Pradesh)', () => {
    const result = filterSpaceItems(spaceData, { state: 'ap' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(item => {
      expect(item.stateCode).toBe('ap');
    });
  });

  it('filters space items by category (e.g. Launch Sites)', () => {
    const result = filterSpaceItems(spaceData, { category: 'launch sites' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(item => {
      expect(item.category.toLowerCase()).toBe('launch sites');
    });
  });

  it('combines search, state, and category filters correctly', () => {
    const result = filterSpaceItems(spaceData, {
      search: 'sriharikota',
      state: 'ap',
      category: 'launch sites'
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(item => {
      expect(item.stateCode).toBe('ap');
      expect(item.category.toLowerCase()).toBe('launch sites');
    });
  });

  it('returns empty array when search query matches no item', () => {
    const result = filterSpaceItems(spaceData, { search: 'nonexistentspaceitem999' });
    expect(result.length).toBe(0);
  });

  it('handles invalid or empty inputs gracefully', () => {
    expect(filterSpaceItems(null)).toEqual([]);
    expect(filterSpaceItems(undefined)).toEqual([]);
    expect(filterSpaceItems([])).toEqual([]);
  });
});

describe('Space Heritage Grouping & Helper Functions', () => {
  it('groups space items correctly by category', () => {
    const grouped = groupSpaceItemsByCategory(spaceData);
    expect(grouped['Launch Sites']).toBeDefined();
    expect(grouped['Research Centres']).toBeDefined();
    expect(grouped['Deep Space & Solar']).toBeDefined();
  });

  it('groups space items correctly by state', () => {
    const grouped = groupSpaceItemsByState(spaceData);
    expect(grouped['Andhra Pradesh']).toBeDefined();
    expect(grouped['Kerala']).toBeDefined();
    expect(grouped['Karnataka']).toBeDefined();
  });

  it('extracts unique states sorted alphabetically', () => {
    const states = getUniqueStates(spaceData);
    expect(states.length).toBeGreaterThanOrEqual(6);
    expect(states[0]).toHaveProperty('code');
    expect(states[0]).toHaveProperty('name');
    for (let i = 1; i < states.length; i++) {
      expect(states[i - 1].name.localeCompare(states[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('extracts unique categories sorted alphabetically', () => {
    const categories = getUniqueCategories(spaceData);
    expect(categories.length).toBeGreaterThan(0);
    expect(categories).toContain('Launch Sites');
    expect(categories).toContain('Research Centres');
  });
});
