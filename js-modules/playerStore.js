/**
 * playerStore.js
 * Vanilla JS state manager for Passport Quest player progress
 */

export class PlayerStore {
  constructor() {
    this.storageKey = 'passportQuestProgress';
    this.listeners = [];
    
    // Default state
    this.state = {
      xp: 0,
      coins: 0,
      stamps: [],
      completedMissions: [],
      unlockedItems: []
    };

    this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        this.state = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load player progress", e);
      }
    }
  }

  saveState() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  completeMission(mission) {
    if (this.state.completedMissions.includes(mission.id)) {
      return { success: false, message: "Mission already completed!" };
    }

    this.state.completedMissions.push(mission.id);
    this.state.stamps.push(mission.stamp);
    this.state.xp += mission.xp;
    this.state.coins += mission.coins;

    const newUnlocks = this.checkUnlocks();
    this.saveState();

    return {
      success: true,
      mission,
      newUnlocks
    };
  }

  checkUnlocks() {
    // Dynamic import to avoid circular dependencies if unlock.js needs this
    // But we'll just implement the logic here or call a static helper
    const unlocks = [
      { required: 3, reward: "Traveler Badge" },
      { required: 5, reward: "Traditional Outfit" },
      { required: 10, reward: "Golden Passport" },
      { required: 15, reward: "Explorer Avatar" }
    ];

    const newlyUnlocked = [];
    const count = this.state.stamps.length;

    unlocks.forEach(item => {
      if (count >= item.required) {
        if (!this.state.unlockedItems.includes(item.reward)) {
          this.state.unlockedItems.push(item.reward);
          newlyUnlocked.push(item.reward);
        }
      }
    });

    return newlyUnlocked;
  }
}

// Singleton instance
export const playerStore = new PlayerStore();
