/**
 * Cultural Quiz & Gamification Engine
 * Handles interactive trivia quizzes, score multipliers, streaks, badge unlocks,
 * and state persistence.
 */

export class CulturalQuizEngine {
  constructor(options = {}) {
    this.currentCategory = options.category || 'general';
    this.score = 0;
    this.streak = 0;
    this.unlockedBadges = new Set(options.initialBadges || []);
    this.questionIndex = 0;

    this.badges = {
      HERITAGE_EXPLORER: { id: 'HERITAGE_EXPLORER', name: 'Heritage Explorer', minScore: 50 },
      CULTURE_MAESTRO: { id: 'CULTURE_MAESTRO', name: 'Culture Maestro', minScore: 100 },
      STREAK_CHAMPION: { id: 'STREAK_CHAMPION', name: 'Streak Champion', minStreak: 5 }
    };
  }

  submitAnswer(isCorrect, points = 10) {
    if (isCorrect) {
      this.streak += 1;
      const multiplier = this.streak >= 3 ? 1.5 : 1.0;
      this.score += Math.round(points * multiplier);
      this.checkBadgeEligibility();
      return { correct: true, addedPoints: Math.round(points * multiplier), streak: this.streak };
    } else {
      this.streak = 0;
      return { correct: false, addedPoints: 0, streak: 0 };
    }
  }

  checkBadgeEligibility() {
    const newlyUnlocked = [];
    if (this.score >= 50 && !this.unlockedBadges.has('HERITAGE_EXPLORER')) {
      this.unlockedBadges.add('HERITAGE_EXPLORER');
      newlyUnlocked.push(this.badges.HERITAGE_EXPLORER);
    }
    if (this.score >= 100 && !this.unlockedBadges.has('CULTURE_MAESTRO')) {
      this.unlockedBadges.add('CULTURE_MAESTRO');
      newlyUnlocked.push(this.badges.CULTURE_MAESTRO);
    }
    if (this.streak >= 5 && !this.unlockedBadges.has('STREAK_CHAMPION')) {
      this.unlockedBadges.add('STREAK_CHAMPION');
      newlyUnlocked.push(this.badges.STREAK_CHAMPION);
    }
    return newlyUnlocked;
  }

  resetQuiz() {
    this.score = 0;
    this.streak = 0;
    this.questionIndex = 0;
  }

  serializeState() {
    return JSON.stringify({
      score: this.score,
      streak: this.streak,
      unlockedBadges: Array.from(this.unlockedBadges)
    });
  }
}
