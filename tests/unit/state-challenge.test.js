/**
 * state-challenge.test.js
 * Unit tests for State Borders Challenge dataset integrity, border symmetry,
 * adjacency checking, quiz verification, and achievements milestones.
 */

import { describe, it, expect } from 'vitest';
import {
  statesData,
  checkAdjacency,
  verifyQuizAnswer,
  getAchievements,
  calculateJourneyPath,
  filterStatesList
} from '../../frontend/state-challenge/state-challenge.js';

const REQUIRED_STATE_FIELDS = [
  'id',
  'name',
  'capital',
  'neighbors',
  'quiz',
  'coords'
];

describe('State Challenge Dataset Integrity', () => {
  it('contains exactly 29 states in the dataset', () => {
    expect(statesData.length).toBe(29);
  });

  it('every state contains all required fields with non-empty values', () => {
    statesData.forEach((state, index) => {
      REQUIRED_STATE_FIELDS.forEach(field => {
        expect(state, `State at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'neighbors') {
          expect(Array.isArray(state.neighbors)).toBe(true);
          expect(state.neighbors.length).toBeGreaterThan(0);
        } else if (field === 'quiz') {
          expect(state.quiz).toHaveProperty('question');
          expect(state.quiz).toHaveProperty('answer');
          expect(typeof state.quiz.question).toBe('string');
          expect(typeof state.quiz.answer).toBe('string');
          expect(state.quiz.question.trim().length).toBeGreaterThan(0);
          expect(state.quiz.answer.trim().length).toBeGreaterThan(0);
        } else if (field === 'coords') {
          expect(typeof state.coords.x).toBe('number');
          expect(typeof state.coords.y).toBe('number');
        } else {
          expect(typeof state[field]).toBe('string');
          expect(state[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all state IDs and coordinates are unique', () => {
    const ids = statesData.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);

    const coordSet = new Set(statesData.map(s => `${s.coords.x},${s.coords.y}`));
    expect(coordSet.size).toBe(statesData.length);
  });

  it('verifies symmetry of neighbors (for every connection A -> B, there is B -> A)', () => {
    statesData.forEach(state => {
      state.neighbors.forEach(neighborId => {
        const neighbor = statesData.find(s => s.id === neighborId);
        expect(neighbor, `Neighbor ${neighborId} listed by ${state.id} does not exist in dataset`).toBeDefined();
        expect(neighbor.neighbors, `Symmetry failure: ${state.id} has ${neighborId} as neighbor, but ${neighborId} does not list ${state.id}`).toContain(state.id);
      });
    });
  });
});

describe('State Challenge Game Logic', () => {
  it('correctly checks adjacency between neighbors', () => {
    // JK and HP are neighbors
    expect(checkAdjacency('JK', 'HP')).toBe(true);
    // JK and TN are not neighbors
    expect(checkAdjacency('JK', 'TN')).toBe(false);
  });

  it('verifies quiz answers case-insensitively', () => {
    expect(verifyQuizAnswer('JK', 'dal lake')).toBe(true);
    expect(verifyQuizAnswer('JK', '  Dal Lake  ')).toBe(true);
    expect(verifyQuizAnswer('JK', 'Wular Lake')).toBe(false);
  });

  it('handles invalid inputs gracefully in checkAdjacency and verifyQuizAnswer', () => {
    expect(checkAdjacency(null, 'HP')).toBe(false);
    expect(checkAdjacency('JK', undefined)).toBe(false);
    expect(verifyQuizAnswer(null, 'answ')).toBe(false);
    expect(verifyQuizAnswer('JK', '')).toBe(false);
  });

  it('calculates the shortest journey path between states', () => {
    // Shortest path JK to PB: JK -> HP -> PB or JK -> PB
    const path = calculateJourneyPath('JK', 'PB');
    expect(path.length).toBeGreaterThan(0);
    expect(path[0]).toBe('JK');
    expect(path[path.length - 1]).toBe('PB');
  });

  it('filters states list by search query', () => {
    const hp = filterStatesList(statesData, 'himachal');
    expect(hp.length).toBe(1);
    expect(hp[0].id).toBe('HP');
  });
});

describe('State Challenge Achievements & Badges', () => {
  it('unlocks Border Crosser upon first crossing', () => {
    const achievements = getAchievements(['GJ', 'RJ']);
    const ids = achievements.map(a => a.id);
    expect(ids).toContain('bordercrosser');
  });

  it('unlocks Coastal Cruiser when crossing 4 coastal states', () => {
    const achievements = getAchievements(['MH', 'GA', 'KA', 'KL']);
    const ids = achievements.map(a => a.id);
    expect(ids).toContain('coastal');
  });

  it('unlocks Himalayan Explorer when crossing 3 Himalayan states', () => {
    const achievements = getAchievements(['JK', 'HP', 'UK']);
    const ids = achievements.map(a => a.id);
    expect(ids).toContain('himalayan');
  });

  it('unlocks Seven Sisters badge when crossing 4 Northeastern states', () => {
    const achievements = getAchievements(['AS', 'AR', 'NL', 'MN']);
    const ids = achievements.map(a => a.id);
    expect(ids).toContain('sevensisters');
  });

  it('unlocks The Great Traverse when path length is 8 or more', () => {
    const achievements = getAchievements(['JK', 'HP', 'PB', 'HR', 'UP', 'MP', 'MH', 'KA']);
    const ids = achievements.map(a => a.id);
    expect(ids).toContain('traverse');
  });

  it('returns empty array when journey is empty', () => {
    expect(getAchievements([])).toEqual([]);
    expect(getAchievements(null)).toEqual([]);
  });
});
