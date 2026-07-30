import { describe, it, expect, beforeEach } from 'vitest';
import { InteractionTracker, EVENT_TYPES, MAX_EVENTS } from '../../js-modules/interaction-tracker.js';

function fakeStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, v),
  };
}

describe('InteractionTracker', () => {
  let storage;
  let tracker;

  beforeEach(() => {
    storage = fakeStorage();
    tracker = new InteractionTracker({ storage });
  });

  it('starts empty', () => {
    expect(tracker.getEvents()).toEqual([]);
  });

  it('records a valid event with an auto-assigned timestamp', () => {
    tracker.track({ type: EVENT_TYPES.VIEW, destinationId: 'rec-goa' });
    const events = tracker.getEvents();
    expect(events).toHaveLength(1);
    expect(events[0].destinationId).toBe('rec-goa');
    expect(typeof events[0].timestamp).toBe('number');
  });

  it('preserves an explicitly provided timestamp', () => {
    tracker.track({ type: EVENT_TYPES.VIEW, destinationId: 'rec-goa', timestamp: 12345 });
    expect(tracker.getEvents()[0].timestamp).toBe(12345);
  });

  it('rejects unknown event types', () => {
    expect(() => tracker.track({ type: 'not_a_real_type' })).toThrow();
  });

  it('persists across tracker instances sharing the same storage', () => {
    tracker.track({ type: EVENT_TYPES.BOOKMARK, destinationId: 'rec-ladakh' });
    const secondTracker = new InteractionTracker({ storage });
    expect(secondTracker.getEvents()).toHaveLength(1);
  });

  it('bounds the log to MAX_EVENTS, dropping the oldest first', () => {
    for (let i = 0; i < MAX_EVENTS + 10; i++) {
      tracker.track({ type: EVENT_TYPES.VIEW, destinationId: `dest-${i}` });
    }
    const events = tracker.getEvents();
    expect(events).toHaveLength(MAX_EVENTS);
    // the first 10 should have been dropped, so the oldest remaining is dest-10
    expect(events[0].destinationId).toBe('dest-10');
  });

  it('clearEvents empties the log (reset preference profile)', () => {
    tracker.track({ type: EVENT_TYPES.RATING, destinationId: 'rec-goa', rating: 5 });
    tracker.clearEvents();
    expect(tracker.getEvents()).toEqual([]);
  });
});
