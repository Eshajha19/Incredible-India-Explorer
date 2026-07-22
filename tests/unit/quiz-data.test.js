/**
 * quiz-data.test.js
 * Tests for quizQuestions data — validates all 8 food quiz questions
 * have correct structure and valid answer data.
 */

import { describe, it, expect } from 'vitest';

describe('quizQuestions — food quiz data integrity', () => {
  it('has exactly 8 questions', () => {
    expect(quizQuestions).toHaveLength(8);
  });

  it('each question has all required fields', () => {
    quizQuestions.forEach((q) => {
      expect(q).toHaveProperty('question');
      expect(q).toHaveProperty('options');
      expect(q).toHaveProperty('answer');
    });
  });

  it('each question has exactly 4 options', () => {
    quizQuestions.forEach((q) => {
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options).toHaveLength(4);
    });
  });

  it('each answer is one of the options for that question', () => {
    quizQuestions.forEach((q) => {
      expect(q.options).toContain(q.answer);
    });
  });

  it('every question string is non-empty', () => {
    quizQuestions.forEach((q) => {
      expect(typeof q.question).toBe('string');
      expect(q.question.trim().length).toBeGreaterThan(0);
    });
  });

  it('every option string is non-empty', () => {
    quizQuestions.forEach((q) => {
      q.options.forEach((opt) => {
        expect(typeof opt).toBe('string');
        expect(opt.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('all options within a question are unique', () => {
    quizQuestions.forEach((q) => {
      expect(new Set(q.options).size).toBe(q.options.length);
    });
  });

  it('no two questions are identical', () => {
    const questions = quizQuestions.map((q) => q.question);
    expect(new Set(questions).size).toBe(questions.length);
  });
});
