/**
 * interaction-tracker.js
 * Issue #864 — AI-Powered Personalized Travel Companion.
 *
 * Records the raw behavioral signals the recommendation engine learns from:
 * views, bookmarks/unbookmarks, searches, ratings, and planned trips
 * (budget/duration/month). Kept DOM-free and storage-injectable, same
 * convention as EventRecommendationEngine, so it's directly unit-testable.
 *
 * This does NOT wire itself into Journey, search, or trip-planner — see
 * docs/ADAPTIVE_TRAVEL_COMPANION.md for the ~1-line hook to add at each of
 * those three call sites. Keeping the tracker decoupled means it has no
 * risk of breaking those existing, already-shipped features.
 */

export const INTERACTION_STORAGE_KEY = 'incredible-india-interactions';
export const MAX_EVENTS = 300; // bounded log so localStorage never grows unbounded

export const EVENT_TYPES = Object.freeze({
  VIEW: 'view',
  BOOKMARK: 'bookmark',
  UNBOOKMARK: 'unbookmark',
  SEARCH: 'search',
  RATING: 'rating',
  TRIP_PLANNED: 'trip_planned',
});

function memoryStorage() {
  const store = new Map();
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, value),
  };
}

function safeLocalStorage() {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

export class InteractionTracker {
  /**
   * @param {object} [options]
   * @param {{getItem:Function,setItem:Function}} [options.storage] injectable store (defaults to localStorage, falls back to an in-memory Map)
   */
  constructor(options = {}) {
    this.storage = options.storage || safeLocalStorage() || memoryStorage();
  }

  _read() {
    try {
      const raw = this.storage.getItem(INTERACTION_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  _write(events) {
    const trimmed = events.slice(-MAX_EVENTS); // keep only the most recent MAX_EVENTS
    this.storage.setItem(INTERACTION_STORAGE_KEY, JSON.stringify(trimmed));
    return trimmed;
  }

  /**
   * @param {object} event
   * @param {string} event.type one of EVENT_TYPES
   * @param {string} [event.destinationId]
   * @param {string} [event.query] for type 'search'
   * @param {number} [event.rating] 1-5, for type 'rating'
   * @param {number} [event.budget] total trip budget (INR), for type 'trip_planned'
   * @param {number} [event.days] trip length, for type 'trip_planned'
   * @param {number} [event.month] 1-12, for type 'trip_planned'
   * @param {number} [event.timestamp] defaults to Date.now()
   */
  track(event) {
    if (!event || !Object.values(EVENT_TYPES).includes(event.type)) {
      throw new Error(`InteractionTracker.track: unknown event type "${event && event.type}"`);
    }
    const record = { timestamp: Date.now(), ...event };
    const events = this._read();
    events.push(record);
    return this._write(events);
  }

  getEvents() {
    return this._read();
  }

  /** Acceptance criterion: users can reset their preference profile. */
  clearEvents() {
    return this._write([]);
  }
}

export default InteractionTracker;
