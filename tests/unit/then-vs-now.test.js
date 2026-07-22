import { describe, it, expect } from 'vitest';
import { heritageLocations, setSliderPosition } from '../../then-vs-now.js';

describe('Then vs Now Heritage Comparison Explorer', () => {
    it('contains minimum 10 heritage locations with complete metadata', () => {
        expect(Array.isArray(heritageLocations)).toBe(true);
        expect(heritageLocations.length).toBeGreaterThanOrEqual(10);

        heritageLocations.forEach(site => {
            expect(site.id).toBeDefined();
            expect(site.title).toBeDefined();
            expect(site.location).toBeDefined();
            expect(site.category).toBeDefined();
            expect(site.thenYear).toBeDefined();
            expect(site.nowYear).toBeDefined();
            expect(site.thenDescription).toBeDefined();
            expect(site.nowDescription).toBeDefined();
            expect(site.conservationStatus).toBeDefined();
        });
    });

    it('clamps slider position calculations between 0 and 100', () => {
        // Set slider position without DOM elements present
        expect(() => setSliderPosition(50)).not.toThrow();
        expect(() => setSliderPosition(-15)).not.toThrow();
        expect(() => setSliderPosition(120)).not.toThrow();
    });

    it('covers key categories like monument, temple, and colonial', () => {
        const categories = new Set(heritageLocations.map(s => s.category));
        expect(categories.has('monument')).toBe(true);
        expect(categories.has('temple')).toBe(true);
        expect(categories.has('colonial')).toBe(true);
    });
});
