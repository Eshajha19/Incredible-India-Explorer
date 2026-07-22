/**
 * map3d-core.test.js
 * Tests for js-modules/map3d-core.js — the projection math, haversine
 * distance, clustering, and filter helpers behind the 3D India map
 * (india-3d-map.html / india-3d-map.js). These are pure functions with
 * no DOM/WebGL dependency, so they're tested directly rather than via
 * simulation.
 */

import { describe, it, expect } from 'vitest';
import Core from '../../js-modules/map3d-core.js';

describe('map3d-core: projection', () => {
    it('projects the reference origin to [0, 0]', () => {
        const [x, y] = Core.project(Core.PROJECTION_ORIGIN.lng, Core.PROJECTION_ORIGIN.lat);
        expect(x).toBeCloseTo(0, 6);
        expect(y).toBeCloseTo(0, 6);
    });

    it('project/unproject round-trips for a real city coordinate', () => {
        const lng = 77.209, lat = 28.6139; // Delhi
        const [x, y] = Core.project(lng, lat);
        const [lng2, lat2] = Core.unproject(x, y);
        expect(lng2).toBeCloseTo(lng, 6);
        expect(lat2).toBeCloseTo(lat, 6);
    });

    it('moves east/north consistently in sign', () => {
        const [xEast] = Core.project(Core.PROJECTION_ORIGIN.lng + 1, Core.PROJECTION_ORIGIN.lat);
        const [, yNorth] = Core.project(Core.PROJECTION_ORIGIN.lng, Core.PROJECTION_ORIGIN.lat + 1);
        expect(xEast).toBeGreaterThan(0);
        expect(yNorth).toBeGreaterThan(0);
    });
});

describe('map3d-core: haversineKm', () => {
    it('returns 0 for identical points', () => {
        expect(Core.haversineKm(28.6139, 77.209, 28.6139, 77.209)).toBeCloseTo(0, 6);
    });

    it('returns a realistic distance between Delhi and Agra (~190-240km)', () => {
        const d = Core.haversineKm(28.6139, 77.209, 27.1767, 78.0081);
        expect(d).toBeGreaterThan(150);
        expect(d).toBeLessThan(260);
    });

    it('is symmetric', () => {
        const a = Core.haversineKm(28.6139, 77.209, 27.1767, 78.0081);
        const b = Core.haversineKm(27.1767, 78.0081, 28.6139, 77.209);
        expect(a).toBeCloseTo(b, 9);
    });
});

describe('map3d-core: nearestDestinations', () => {
    const dests = [
        { id: 'a', lat: 28.6139, lng: 77.209 },  // Delhi
        { id: 'b', lat: 27.1767, lng: 78.0081 }, // Agra
        { id: 'c', lat: 26.9124, lng: 75.7873 }, // Jaipur
        { id: 'd', lat: 15.2993, lng: 74.1240 }, // Goa (far)
    ];

    it('excludes the origin itself', () => {
        const result = Core.nearestDestinations(dests[0], dests, 3);
        expect(result.some(r => r.destination.id === 'a')).toBe(false);
    });

    it('sorts nearest-first', () => {
        const result = Core.nearestDestinations(dests[0], dests, 3);
        const distances = result.map(r => r.distanceKm);
        expect(distances).toEqual([...distances].sort((x, y) => x - y));
    });

    it('respects the count limit', () => {
        const result = Core.nearestDestinations(dests[0], dests, 2);
        expect(result.length).toBe(2);
    });

    it('defaults to 5 when count is omitted', () => {
        const many = Array.from({ length: 8 }, (_, i) => ({ id: `x${i}`, lat: 20 + i, lng: 70 + i }));
        const result = Core.nearestDestinations({ id: 'origin', lat: 20, lng: 70 }, many, undefined);
        expect(result.length).toBe(5);
    });
});

describe('map3d-core: clusterDestinations', () => {
    const dests = [
        { id: 'a', lat: 28.61, lng: 77.20 },
        { id: 'b', lat: 28.62, lng: 77.21 }, // very close to a
        { id: 'c', lat: 15.29, lng: 74.12 }, // far away (Goa)
    ];

    it('with cellSize 0 returns one cluster per destination', () => {
        const clusters = Core.clusterDestinations(dests, 0);
        expect(clusters.length).toBe(3);
        expect(clusters.every(c => c.count === 1)).toBe(true);
    });

    it('with a large cellSize, groups nearby points together', () => {
        const clusters = Core.clusterDestinations(dests, 10);
        // a and b should merge; c (Goa) is far enough to stay separate in most cases
        const totalItems = clusters.reduce((sum, c) => sum + c.count, 0);
        expect(totalItems).toBe(3);
        expect(clusters.some(c => c.count >= 2)).toBe(true);
    });

    it('cluster centroid is the average position of its members', () => {
        const close = [
            { id: 'a', lat: 28.60, lng: 77.20 },
            { id: 'b', lat: 28.60, lng: 77.22 },
        ];
        const clusters = Core.clusterDestinations(close, 50);
        expect(clusters.length).toBe(1);
        const [pa, pb] = close.map(d => Core.project(d.lng, d.lat));
        expect(clusters[0].x).toBeCloseTo((pa[0] + pb[0]) / 2, 6);
        expect(clusters[0].y).toBeCloseTo((pa[1] + pb[1]) / 2, 6);
    });
});

describe('map3d-core: cellSizeForZoom', () => {
    it('returns 0 (no clustering) when fully zoomed in', () => {
        expect(Core.cellSizeForZoom(10)).toBe(0);
    });

    it('increases cell size as camera distance grows', () => {
        const near = Core.cellSizeForZoom(20);
        const mid = Core.cellSizeForZoom(45);
        const far = Core.cellSizeForZoom(60);
        expect(mid).toBeGreaterThan(near);
        expect(far).toBeGreaterThan(mid);
    });
});

describe('map3d-core: filterByCategory', () => {
    const dests = [
        { id: 'a', categories: ['beaches', 'adventure'] },
        { id: 'b', categories: ['mountains'] },
        { id: 'c', categories: ['heritage', 'historical'] },
    ];

    it('returns all destinations when no categories are active', () => {
        expect(Core.filterByCategory(dests, new Set())).toEqual(dests);
    });

    it('filters to destinations matching any active category', () => {
        const result = Core.filterByCategory(dests, new Set(['mountains']));
        expect(result.map(d => d.id)).toEqual(['b']);
    });

    it('matches on OR semantics across multiple active categories', () => {
        const result = Core.filterByCategory(dests, new Set(['mountains', 'beaches']));
        expect(result.map(d => d.id).sort()).toEqual(['a', 'b']);
    });
});

describe('map3d-core: filterByBookmarks', () => {
    const dests = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

    it('returns only bookmarked destinations', () => {
        const result = Core.filterByBookmarks(dests, new Set(['b']));
        expect(result.map(d => d.id)).toEqual(['b']);
    });

    it('returns an empty array when nothing is bookmarked', () => {
        expect(Core.filterByBookmarks(dests, new Set())).toEqual([]);
    });
});
