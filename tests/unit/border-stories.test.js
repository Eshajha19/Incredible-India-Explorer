/**
 * border-stories.test.js
 * Unit tests for Border Stories Explorer dataset integrity,
 * search queries, state/region filters, and state-pair lookups.
 */

import { describe, it, expect } from 'vitest';
import {
  borderStories,
  filterBorderStories,
  findStoryById,
  findStoryByStates,
  getUniqueRegions,
  getUniqueBorderStates
} from '../../border-stories.js';

const REQUIRED_STORY_FIELDS = [
  'id',
  'states',
  'borderName',
  'region',
  'riverBoundary',
  'dialect',
  'borderFood',
  'borderMarket',
  'tradition',
  'summary',
  'coords'
];

describe('Border Stories Dataset Integrity', () => {
  it('contains at least 15 inter-state border stories in the dataset', () => {
    expect(borderStories.length).toBeGreaterThanOrEqual(15);
  });

  it('every border story contains all required fields with non-empty values', () => {
    borderStories.forEach((story, index) => {
      REQUIRED_STORY_FIELDS.forEach(field => {
        expect(story, `Story at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'states') {
          expect(Array.isArray(story.states)).toBe(true);
          expect(story.states.length).toBe(2);
          expect(story.states[0]).not.toBe(story.states[1]);
        } else if (field === 'coords') {
          expect(typeof story.coords.x).toBe('number');
          expect(typeof story.coords.y).toBe('number');
          expect(story.coords.x).toBeGreaterThanOrEqual(0);
          expect(story.coords.x).toBeLessThanOrEqual(900);
          expect(story.coords.y).toBeGreaterThanOrEqual(0);
          expect(story.coords.y).toBeLessThanOrEqual(600);
        } else {
          expect(typeof story[field]).toBe('string');
          expect(story[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all story IDs and state pairs are unique', () => {
    const ids = borderStories.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);

    const pairSet = new Set(borderStories.map(s => [...s.states].sort().join('-')));
    expect(pairSet.size).toBe(borderStories.length);
  });
});

describe('Border Stories Filtering & Search', () => {
  it('returns all stories when search query, state, and region are default', () => {
    const result = filterBorderStories(borderStories);
    expect(result.length).toBe(borderStories.length);
  });

  it('filters border stories by search query (e.g. Palakkad or Ganga)', () => {
    const result = filterBorderStories(borderStories, { search: 'Palakkad' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(story => {
      const match = [
        story.borderName,
        story.region,
        story.riverBoundary,
        story.dialect,
        story.borderFood,
        story.borderMarket,
        story.tradition,
        story.summary,
        ...story.states
      ].some(f => f && f.toLowerCase().includes('palakkad'));
      expect(match).toBe(true);
    });
  });

  it('filters border stories by state code (e.g. WB)', () => {
    const result = filterBorderStories(borderStories, { state: 'WB' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(story => {
      expect(story.states).toContain('WB');
    });
  });

  it('filters border stories by region (e.g. South)', () => {
    const result = filterBorderStories(borderStories, { region: 'South' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(story => {
      expect(story.region.toLowerCase()).toBe('south');
    });
  });

  it('handles invalid inputs gracefully', () => {
    expect(filterBorderStories(null)).toEqual([]);
    expect(filterBorderStories([])).toEqual([]);
  });
});

describe('Border Stories Traversal & Lookups', () => {
  it('finds story by ID correctly', () => {
    const story = findStoryById('b-2');
    expect(story).toBeDefined();
    expect(story.borderName).toContain('Palakkad Gap');
  });

  it('finds story by two states in order-independent manner', () => {
    const story1 = findStoryByStates('KL', 'TN');
    const story2 = findStoryByStates('TN', 'KL');
    expect(story1).toBeDefined();
    expect(story2).toBeDefined();
    expect(story1.id).toBe(story2.id);
  });

  it('returns undefined when no border story connects given states', () => {
    const story = findStoryByStates('JK', 'TN');
    expect(story).toBeUndefined();
  });

  it('extracts unique regions sorted alphabetically', () => {
    const regions = getUniqueRegions(borderStories);
    expect(regions.length).toBeGreaterThan(0);
    for (let i = 1; i < regions.length; i++) {
      expect(regions[i - 1].localeCompare(regions[i])).toBeLessThanOrEqual(0);
    }
  });

  it('extracts unique state codes involved in border stories', () => {
    const stateCodes = getUniqueBorderStates(borderStories);
    expect(stateCodes.length).toBeGreaterThan(0);
    expect(stateCodes).toContain('WB');
    expect(stateCodes).toContain('TN');
    expect(stateCodes).toContain('KL');
    expect(stateCodes).toContain('PB');
  });
});
