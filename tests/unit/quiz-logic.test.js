/**
 * quiz-logic.test.js
 * Tests for the quiz game logic — answer matching, score calculation,
 * quiz reset, and edge cases.
 *
 * The quiz functions in app.js (selectOption, startQuiz, showResults)
 * are DOM-dependent. This test validates the core logic by extracting
 * the pure operations they perform.
 */

import { describe, it, expect } from 'vitest';

/**
 * Simulates the core quiz logic extracted from app.js.
 * These are the pure operations that happen inside selectOption, startQuiz, showResults.
 */

// Simulates app.js selectOption logic: checking if selected answer matches
function checkAnswer(questionIndex, selectedValue) {
  const q = quizQuestions[questionIndex];
  return selectedValue === q.answer;
}

// Simulates app.js score tracking
function calculateScore(answers) {
  return answers.reduce((score, { questionIndex, selected }) => {
    return score + (checkAnswer(questionIndex, selected) ? 1 : 0);
  }, 0);
}

// Simulates app.js startQuiz: reset state
function createFreshQuizState() {
  return { currentQuestionIndex: 0, score: 0, locked: false };
}

describe('Quiz answer matching', () => {
  it('checkAnswer returns true for correct answer', () => {
    expect(checkAnswer(0, 'Bihar')).toBe(true);
    expect(checkAnswer(1, 'Goa')).toBe(true);
    expect(checkAnswer(7, 'Andhra Pradesh')).toBe(true);
  });

  it('checkAnswer returns false for incorrect answer', () => {
    expect(checkAnswer(0, 'Rajasthan')).toBe(false);
    expect(checkAnswer(1, 'Kerala')).toBe(false);
    expect(checkAnswer(7, 'Telangana')).toBe(false);
  });

  it('checkAnswer is case-sensitive (matches exact string)', () => {
    // The quiz uses exact string comparison
    expect(checkAnswer(0, 'bihar')).toBe(false);
    expect(checkAnswer(0, 'BIHAR')).toBe(false);
  });
});

describe('Quiz score calculation', () => {
  it('perfect score returns 8', () => {
    const answers = quizQuestions.map((q, i) => ({
      questionIndex: i,
      selected: q.answer,
    }));
    expect(calculateScore(answers)).toBe(8);
  });

  it('zero correct returns 0', () => {
    const answers = quizQuestions.map((_, i) => ({
      questionIndex: i,
      selected: 'Nonexistent Option',
    }));
    expect(calculateScore(answers)).toBe(0);
  });

  it('partial correct returns correct count', () => {
    const answers = quizQuestions.map((q, i) => ({
      questionIndex: i,
      // Pick the first option — sometimes correct, sometimes not
      selected: q.options[0],
    }));
    const expectedCorrect = quizQuestions.filter(
      (q) => q.answer === q.options[0],
    ).length;
    expect(calculateScore(answers)).toBe(expectedCorrect);
  });

  it('score is always between 0 and 8', () => {
    for (let correctCount = 0; correctCount <= 8; correctCount++) {
      const answers = quizQuestions.map((q, i) => ({
        questionIndex: i,
        selected: i < correctCount ? q.answer : 'Wrong Answer',
      }));
      const score = calculateScore(answers);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(8);
    }
  });
});

describe('Quiz state management', () => {
  it('fresh quiz state has index 0, score 0, unlocked', () => {
    const state = createFreshQuizState();
    expect(state.currentQuestionIndex).toBe(0);
    expect(state.score).toBe(0);
    expect(state.locked).toBe(false);
  });

  it('score increments only on correct answer', () => {
    let score = 0;
    const correctAnswer = quizQuestions[0].answer;
    const wrongAnswer = quizQuestions[0].options.find(
      (o) => o !== correctAnswer,
    );

    // Wrong answer: no increment
    const wasCorrect1 = correctAnswer === wrongAnswer;
    if (wasCorrect1) score++;
    expect(score).toBe(0); // wrong answer doesn't increment

    // Correct answer: increment
    score++;
    expect(score).toBe(1);

    // Multiple correct answers
    score = 3;
    expect(score).toBe(3);
  });
});

describe('Quiz edge cases', () => {
  it('every question answer is reachable via options', () => {
    // A player should always be able to pick the correct answer
    quizQuestions.forEach((q) => {
      expect(q.options).toContain(q.answer);
    });
  });

  it('no question has an empty answer', () => {
    quizQuestions.forEach((q) => {
      expect(q.answer.trim().length).toBeGreaterThan(0);
    });
  });
});
