/**
 * guess-up-district.test.js
 * Unit tests for "Guess the Uttar Pradesh District" game engine, dataset integrity,
 * question generator, answer evaluator, badge unlocks, and high score storage.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  districts,
  achievementBadges,
  gameModes,
  getDistrictById,
  getRandomQuestion,
  evaluateAnswer,
  checkUnlockedBadges,
  getHighScores,
  saveHighScore
} from '../../frontend/guess-up-district/guess-up-district.js';

const REQUIRED_DISTRICT_FIELDS = [
  'id',
  'name',
  'division',
  'headquarters',
  'odop',
  'landmarks',
  'clues'
];

describe('UP District Dataset Integrity', () => {
  it('contains at least 20 prominent UP districts', () => {
    expect(districts.length).toBeGreaterThanOrEqual(20);
  });

  it('every district object contains all required fields with valid types', () => {
    districts.forEach((d, index) => {
      REQUIRED_DISTRICT_FIELDS.forEach(field => {
        expect(d, `District at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'landmarks' || field === 'clues') {
          expect(Array.isArray(d[field])).toBe(true);
          expect(d[field].length).toBeGreaterThan(0);
        } else {
          expect(typeof d[field]).toBe('string');
          expect(d[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all district IDs and names are unique', () => {
    const ids = districts.map(d => d.id);
    const names = districts.map(d => d.name);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it('retrieves district profile by ID or name', () => {
    const d1 = getDistrictById('varanasi');
    expect(d1).toBeDefined();
    expect(d1.name).toBe('Varanasi');

    const d2 = getDistrictById('Agra');
    expect(d2).toBeDefined();
    expect(d2.id).toBe('agra');
  });
});

describe('Game Modes Definition', () => {
  it('defines all 4 required game modes', () => {
    expect(gameModes).toHaveProperty('easy');
    expect(gameModes).toHaveProperty('medium');
    expect(gameModes).toHaveProperty('hard');
    expect(gameModes).toHaveProperty('timed');
  });

  it('easy mode presents 3 clues and no strict timer', () => {
    expect(gameModes.easy.cluesShown).toBe(3);
    expect(gameModes.easy.timePerQuestion).toBe(0);
  });

  it('hard mode presents 1 clue and a 15s timer', () => {
    expect(gameModes.hard.cluesShown).toBe(1);
    expect(gameModes.hard.timePerQuestion).toBe(15);
  });
});

describe('Question Generator Engine', () => {
  it('generates a question with 4 options and clues', () => {
    const q = getRandomQuestion('easy');
    expect(q).not.toBeNull();
    expect(q).toHaveProperty('correctDistrict');
    expect(q).toHaveProperty('options');
    expect(q.options.length).toBe(4);
    expect(q.options.map(o => o.id)).toContain(q.correctDistrict.id);
  });

  it('excludes specified district IDs when requested', () => {
    const excluded = ['varanasi', 'agra', 'lucknow'];
    const q = getRandomQuestion('easy', excluded);
    expect(excluded).not.toContain(q.correctDistrict.id);
  });
});

describe('Answer Evaluator Engine', () => {
  it('evaluates correct answer with score and bonus', () => {
    const correctDistrict = districts[0]; // Varanasi
    const result = evaluateAnswer('Varanasi', correctDistrict, 10, 'easy', false);
    expect(result.isCorrect).toBe(true);
    expect(result.scoreEarned).toBeGreaterThan(0);
  });

  it('deducts penalty when hint is used', () => {
    const correctDistrict = districts[0];
    const noHintRes = evaluateAnswer('Varanasi', correctDistrict, 0, 'easy', false);
    const hintRes = evaluateAnswer('Varanasi', correctDistrict, 0, 'easy', true);
    expect(hintRes.scoreEarned).toBeLessThan(noHintRes.scoreEarned);
  });

  it('evaluates incorrect answer with 0 score', () => {
    const correctDistrict = districts[0];
    const result = evaluateAnswer('Agra', correctDistrict, 10, 'easy', false);
    expect(result.isCorrect).toBe(false);
    expect(result.scoreEarned).toBe(0);
  });
});

describe('Achievement Badges Engine', () => {
  it('defines 6 unlockable achievement badges', () => {
    expect(achievementBadges.length).toBe(6);
  });

  it('unlocks UP Explorer badge on first correct answer', () => {
    const unlocked = checkUnlockedBadges({ correctCount: 1, streak: 1, score: 100, mode: 'easy' });
    const badgeIds = unlocked.map(b => b.id);
    expect(badgeIds).toContain('badge_first_correct');
  });

  it('unlocks Speed Demon badge in timed mode with 5+ correct', () => {
    const unlocked = checkUnlockedBadges({ correctCount: 5, streak: 2, score: 600, mode: 'timed' });
    const badgeIds = unlocked.map(b => b.id);
    expect(badgeIds).toContain('badge_timed_hero');
  });
});

describe('High Score Storage', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  it('returns default 0 high scores when empty', () => {
    const scores = getHighScores();
    expect(scores).toHaveProperty('easy', 0);
  });

  it('saves new high score record', () => {
    if (typeof localStorage !== 'undefined') {
      const isNew = saveHighScore('easy', 500);
      expect(isNew).toBe(true);
      const scores = getHighScores();
      expect(scores.easy).toBe(500);

      // Higher score overwrites
      const isHigher = saveHighScore('easy', 700);
      expect(isHigher).toBe(true);
      expect(getHighScores().easy).toBe(700);

      // Lower score does not overwrite
      const isLower = saveHighScore('easy', 300);
      expect(isLower).toBe(false);
      expect(getHighScores().easy).toBe(700);
    }
  });
});
