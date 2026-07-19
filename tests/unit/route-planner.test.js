/**
 * route-planner.test.js
 * Tests for the client-side route caching, LRU eviction, and error recovery.
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import RoutePlanner from '../../route-planner.js';

describe('Route Planner Caching', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('buildCacheKey formats correctly', () => {
    const key = RoutePlanner.buildCacheKey(['delhi', 'agra'], 'road');
    expect(key).toBe('iie_route_cache_v1:road:delhi>agra');
  });

  it('readCache returns null when entry does not exist', async () => {
    const route = await RoutePlanner.getRoute(
      [
        { id: 'delhi', lat: 28.6139, lng: 77.209 },
        { id: 'agra', lat: 27.1767, lng: 78.0081 }
      ],
      'rail'
    );
    // This call should fetch/estimate and write to cache
    expect(route.fromCache).toBe(false);

    // Second call should return from cache
    const route2 = await RoutePlanner.getRoute(
      [
        { id: 'delhi', lat: 28.6139, lng: 77.209 },
        { id: 'agra', lat: 27.1767, lng: 78.0081 }
      ],
      'rail'
    );
    expect(route2.fromCache).toBe(true);
  });

  it('evicts cache entries older than TTL', async () => {
    const stops = [
      { id: 'delhi', lat: 28.6139, lng: 77.209 },
      { id: 'agra', lat: 27.1767, lng: 78.0081 }
    ];
    
    // First write to cache
    await RoutePlanner.getRoute(stops, 'rail');
    
    const key = RoutePlanner.buildCacheKey(['delhi', 'agra'], 'rail');
    const raw = localStorage.getItem(key);
    expect(raw).toBeTruthy();
    
    // Artificially modify the saved timestamp to be 8 days ago
    const entry = JSON.parse(raw);
    entry.savedAt = Date.now() - (1000 * 60 * 60 * 24 * 8);
    localStorage.setItem(key, JSON.stringify(entry));
    
    // Next getRoute should result in cache miss and rewrite it
    const route = await RoutePlanner.getRoute(stops, 'rail');
    expect(route.fromCache).toBe(false);
  });

  it('enforces maximum cache entries limit of 20 using LRU policy', async () => {
    const limit = RoutePlanner.MAX_CACHE_ENTRIES;
    expect(limit).toBe(20);

    // Fill the cache with 20 entries
    for (let i = 0; i < limit; i++) {
      const stops = [
        { id: `stop_start_${i}`, lat: 28.6, lng: 77.2 },
        { id: `stop_end_${i}`, lat: 27.1, lng: 78.0 }
      ];
      await RoutePlanner.getRoute(stops, 'rail');
    }

    // Check localStorage contains exactly 20 cache entries
    let cacheKeys = Object.keys(localStorage).filter(k => k.startsWith('iie_route_cache_v1:'));
    expect(cacheKeys.length).toBe(20);

    // Let's access the first item to update its lastAccessedAt time (make it MRU)
    const mruStops = [
      { id: 'stop_start_0', lat: 28.6, lng: 77.2 },
      { id: 'stop_end_0', lat: 27.1, lng: 78.0 }
    ];
    // This read should hit cache and update lastAccessedAt
    const mruRoute = await RoutePlanner.getRoute(mruStops, 'rail');
    expect(mruRoute.fromCache).toBe(true);

    // Let's write the 21st item, which should trigger eviction of the oldest (which should be index 1, not index 0 because 0 was just accessed)
    const newStops = [
      { id: 'stop_start_new', lat: 28.6, lng: 77.2 },
      { id: 'stop_end_new', lat: 27.1, lng: 78.0 }
    ];
    await RoutePlanner.getRoute(newStops, 'rail');

    // Total cache size should still be 20
    cacheKeys = Object.keys(localStorage).filter(k => k.startsWith('iie_route_cache_v1:'));
    expect(cacheKeys.length).toBe(20);

    // The first item (index 0) should still be in cache because it was recently accessed
    const key0 = RoutePlanner.buildCacheKey(['stop_start_0', 'stop_end_0'], 'rail');
    expect(localStorage.getItem(key0)).toBeTruthy();

    // The second item (index 1) was the oldest non-accessed item, so it should be evicted
    const key1 = RoutePlanner.buildCacheKey(['stop_start_1', 'stop_end_1'], 'rail');
    expect(localStorage.getItem(key1)).toBeNull();
  });

  it('purges all route caches when QuotaExceededError is thrown on setItem', async () => {
    // Write other persistent key not matching route cache prefix
    localStorage.setItem('theme', 'dark');

    // Spy/mock localStorage.setItem to throw QuotaExceededError once
    const originalSetItem = localStorage.setItem;
    let throwError = false;

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (key, value) {
      if (throwError && key.startsWith('iie_route_cache_v1:')) {
        throwError = false; // Only throw once to allow retry logic to succeed
        const err = new Error('Mock Storage Quota Exceeded');
        err.name = 'QuotaExceededError';
        throw err;
      }
      return originalSetItem.call(this, key, value);
    });

    // Populate some route cache items
    const stops1 = [{ id: 's1', lat: 28, lng: 77 }, { id: 's2', lat: 27, lng: 78 }];
    const stops2 = [{ id: 's3', lat: 28, lng: 77 }, { id: 's4', lat: 27, lng: 78 }];
    
    // Put one in cache first
    await RoutePlanner.getRoute(stops1, 'rail');
    expect(Object.keys(localStorage).filter(k => k.startsWith('iie_route_cache_v1:')).length).toBe(1);

    // Set throwing to true before writing the second route
    throwError = true;

    // Writing the second route will throw QuotaExceededError, triggering purge of route caches, then succeeds on retry
    await RoutePlanner.getRoute(stops2, 'rail');

    // Only stops2 should be in cache now, stops1 (the old route cache) is purged
    const routeKeys = Object.keys(localStorage).filter(k => k.startsWith('iie_route_cache_v1:'));
    expect(routeKeys.length).toBe(1);
    expect(routeKeys[0]).toContain('s3>s4');

    // Make sure other persistent data (like theme) is unaffected!
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('sweepExpiredCache purges all expired keys', () => {
    const keyActive = 'iie_route_cache_v1:rail:active1>active2';
    const keyExpired = 'iie_route_cache_v1:rail:exp1>exp2';
    const keyOther = 'theme';

    localStorage.setItem(keyActive, JSON.stringify({ savedAt: Date.now(), data: {} }));
    localStorage.setItem(keyExpired, JSON.stringify({ savedAt: Date.now() - (1000 * 60 * 60 * 24 * 8), data: {} }));
    localStorage.setItem(keyOther, 'light');

    RoutePlanner.sweepExpiredCache();

    expect(localStorage.getItem(keyActive)).toBeTruthy();
    expect(localStorage.getItem(keyExpired)).toBeNull();
    expect(localStorage.getItem(keyOther)).toBe('light');
  });
});
