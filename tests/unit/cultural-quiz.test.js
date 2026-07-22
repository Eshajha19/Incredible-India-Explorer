import { describe, it, expect, beforeEach } from 'vitest';
import { CulturalQuizEngine } from '../../js-modules/cultural-quiz-engine.js';

describe('CulturalQuizEngine', () => {
  let engine;

  beforeEach(() => {
    engine = new CulturalQuizEngine();
  });

  it('should initialize with zero score and streak', () => {
    expect(engine.score).toBe(0);
    expect(engine.streak).toBe(0);
  });

  it('should calculate points with multiplier on streaks', () => {
    engine.submitAnswer(true, 10);
    expect(engine.score).toBe(10);
    expect(engine.streak).toBe(1);

    engine.submitAnswer(true, 10);
    engine.submitAnswer(true, 10); // 3rd streak -> 1.5x
    expect(engine.streak).toBe(3);
    expect(engine.score).toBe(35); // 10 + 10 + 15
  });

  it('should reset streak on incorrect answer', () => {
    engine.submitAnswer(true, 10);
    const result = engine.submitAnswer(false, 10);
    expect(result.streak).toBe(0);
    expect(engine.streak).toBe(0);
  });

  it('should unlock badges when meeting eligibility thresholds', () => {
    engine.score = 55;
    const badges = engine.checkBadgeEligibility();
    expect(badges.length).toBe(1);
    expect(badges[0].name).toBe('Heritage Explorer');
  });

  it('should serialize state accurately', () => {
    engine.score = 100;
    engine.streak = 5;
    const stateStr = engine.serializeState();
    expect(stateStr).toContain('"score":100');
    expect(stateStr).toContain('"streak":5');
  });
});
