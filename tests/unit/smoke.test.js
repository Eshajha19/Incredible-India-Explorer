/**
 * smoke.test.js
 * Minimal smoke test to verify Vitest setup + data.js globals are working.
 */

import { describe, it, expect } from 'vitest';

describe('Test infrastructure', () => {
  it('vitest is running and assertions work', () => {
    expect(1 + 1).toBe(2);
  });

  it('data.js globals are accessible via setup', () => {
    expect(globalThis.mapData).toBeDefined();
    expect(globalThis.quizQuestions).toBeDefined();
  });

  it('mapData has locations array and viewBox', () => {
    expect(Array.isArray(mapData.locations)).toBe(true);
    expect(typeof mapData.viewBox).toBe('string');
  });

  it('quizQuestions is an array of 8 questions', () => {
    expect(Array.isArray(quizQuestions)).toBe(true);
    expect(quizQuestions).toHaveLength(8);
  });
});
