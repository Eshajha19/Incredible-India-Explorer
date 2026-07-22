import { describe, it, expect } from 'vitest';
import { photographyLocations, getFilteredLocations } from '../../photography-locations.js';

describe('Photography Locations Explorer', () => {
    it('has minimum 10 locations with required metadata fields', () => {
        expect(Array.isArray(photographyLocations)).toBe(true);
        expect(photographyLocations.length).toBeGreaterThanOrEqual(10);
        photographyLocations.forEach(loc => {
            expect(loc.id).toBeDefined();
            expect(loc.name).toBeDefined();
            expect(loc.location).toBeDefined();
            expect(loc.season).toBeDefined();
            expect(loc.timeOfDay).toBeDefined();
            expect(loc.tip).toBeDefined();
            expect(Array.isArray(loc.gear)).toBe(true);
        });
    });

    it('filters by season correctly', () => {
        const winter = getFilteredLocations("", "winter", "all");
        expect(winter.length).toBeGreaterThan(0);
        winter.forEach(l => expect(l.season).toBe("winter"));
    });

    it('filters by time of day correctly', () => {
        const sunriseSpots = getFilteredLocations("", "all", "sunrise");
        expect(sunriseSpots.length).toBeGreaterThan(0);
        sunriseSpots.forEach(l => expect(l.timeOfDay).toBe("sunrise"));
    });

    it('searches by location name', () => {
        const results = getFilteredLocations("Varanasi");
        expect(results.length).toBeGreaterThan(0);
        expect(results[0].name.toLowerCase()).toContain("varanasi");
    });

    it('covers all four season categories', () => {
        const seasons = new Set(photographyLocations.map(l => l.season));
        expect(seasons.has("winter")).toBe(true);
        expect(seasons.has("monsoon")).toBe(true);
        expect(seasons.has("spring")).toBe(true);
        expect(seasons.has("autumn")).toBe(true);
    });
});
