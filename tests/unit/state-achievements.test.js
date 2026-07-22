/**
 * state-achievements.test.js
 * Unit tests for State Achievement Timeline dataset integrity,
 * search queries, multi-filtering, sorting algorithms, and bookmark storage.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  achievements,
  categories,
  filterAchievements,
  sortAchievementsByYear,
  getUniqueStates,
  getUniqueCategories,
  toggleBookmark,
  getBookmarkedIds
} from '../../state-achievements.js';

const REQUIRED_ACHIEVEMENT_FIELDS = [
  'id',
  'year',
  'title',
  'state',
  'stateCode',
  'region',
  'category',
  'description',
  'significance',
  'icon'
];

describe('State Achievements Dataset Integrity', () => {
  it('contains at least 25 landmark achievements in the dataset', () => {
    expect(achievements.length).toBeGreaterThanOrEqual(25);
  });

  it('every achievement contains all required fields with valid types', () => {
    achievements.forEach((ach, index) => {
      REQUIRED_ACHIEVEMENT_FIELDS.forEach(field => {
        expect(ach, `Achievement at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'year') {
          expect(typeof ach.year).toBe('number');
          expect(ach.year).toBeGreaterThanOrEqual(1900);
          expect(ach.year).toBeLessThanOrEqual(2030);
        } else {
          expect(typeof ach[field]).toBe('string');
          expect(ach[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all achievement IDs are unique', () => {
    const ids = achievements.map(a => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('covers all 7 core achievement categories', () => {
    const activeCategories = new Set(achievements.map(a => a.category));
    expect(activeCategories.size).toBe(7);
    expect(activeCategories.has('sports')).toBe(true);
    expect(activeCategories.has('science')).toBe(true);
    expect(activeCategories.has('education')).toBe(true);
    expect(activeCategories.has('economy')).toBe(true);
    expect(activeCategories.has('literature')).toBe(true);
    expect(activeCategories.has('technology')).toBe(true);
    expect(activeCategories.has('environment')).toBe(true);
  });
});

describe('State Achievements Filtering & Search', () => {
  it('returns all achievements when query, state, and category are default', () => {
    const result = filterAchievements(achievements);
    expect(result.length).toBe(achievements.length);
  });

  it('filters achievements by search query (e.g. Nobel or Olympic)', () => {
    const result = filterAchievements(achievements, { search: 'Nobel' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(ach => {
      const match = [
        ach.title,
        ach.state,
        ach.category,
        ach.description,
        ach.significance,
        String(ach.year)
      ].some(f => f && f.toLowerCase().includes('nobel'));
      expect(match).toBe(true);
    });
  });

  it('filters achievements by state (e.g. WB or Kerala)', () => {
    const result = filterAchievements(achievements, { state: 'WB' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(ach => {
      expect(ach.stateCode.toLowerCase()).toBe('wb');
    });
  });

  it('filters achievements by category (e.g. science)', () => {
    const result = filterAchievements(achievements, { category: 'science' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(ach => {
      expect(ach.category.toLowerCase()).toBe('science');
    });
  });

  it('filters by bookmarked items correctly', () => {
    const bookmarkedIds = ['ach-1', 'ach-5'];
    const result = filterAchievements(achievements, { bookmarkedOnly: true, bookmarkedIds });
    expect(result.length).toBe(2);
    result.forEach(ach => {
      expect(bookmarkedIds).toContain(ach.id);
    });
  });

  it('handles invalid inputs gracefully', () => {
    expect(filterAchievements(null)).toEqual([]);
    expect(filterAchievements([])).toEqual([]);
  });
});

describe('State Achievements Sorting & Lookups', () => {
  it('sorts achievements by year ascending (earliest first)', () => {
    const sorted = sortAchievementsByYear(achievements, 'asc');
    expect(sorted.length).toBe(achievements.length);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].year).toBeLessThanOrEqual(sorted[i].year);
    }
  });

  it('sorts achievements by year descending (latest first)', () => {
    const sorted = sortAchievementsByYear(achievements, 'desc');
    expect(sorted.length).toBe(achievements.length);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].year).toBeGreaterThanOrEqual(sorted[i].year);
    }
  });

  it('extracts unique states sorted alphabetically', () => {
    const statesList = getUniqueStates(achievements);
    expect(statesList.length).toBeGreaterThan(0);
    for (let i = 1; i < statesList.length; i++) {
      expect(statesList[i - 1].name.localeCompare(statesList[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('extracts unique categories', () => {
    const cats = getUniqueCategories(achievements);
    expect(cats.length).toBe(7);
  });
});

describe('Bookmark Management Helpers', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  it('returns empty array when no bookmarks saved', () => {
    expect(getBookmarkedIds()).toEqual([]);
  });

  it('handles toggle bookmark when localStorage is present or absent', () => {
    expect(typeof toggleBookmark('ach-1')).toBe('boolean');
  });
});
