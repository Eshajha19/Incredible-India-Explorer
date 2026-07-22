import { describe, it, expect } from 'vitest';
import { geologicalFormations, getFilteredFormations } from '../../volcanoes-geology.js';

describe('Volcanoes & Geological Formations Explorer', () => {
    it('has minimum 10 formations with complete required fields', () => {
        expect(Array.isArray(geologicalFormations)).toBe(true);
        expect(geologicalFormations.length).toBeGreaterThanOrEqual(10);
        geologicalFormations.forEach(f => {
            expect(f.id).toBeDefined();
            expect(f.name).toBeDefined();
            expect(f.location).toBeDefined();
            expect(f.type).toBeDefined();
            expect(f.description).toBeDefined();
            expect(f.rockType).toBeDefined();
        });
    });

    it('filters by geological category type', () => {
        const volcanic = getFilteredFormations("", "volcanic");
        expect(volcanic.length).toBeGreaterThan(0);
        volcanic.forEach(f => expect(f.type).toBe("volcanic"));

        const karst = getFilteredFormations("", "karst");
        expect(karst.length).toBeGreaterThan(0);
        karst.forEach(f => expect(f.type).toBe("karst"));
    });

    it('covers all four geological categories', () => {
        const types = new Set(geologicalFormations.map(f => f.type));
        expect(types.has("volcanic")).toBe(true);
        expect(types.has("crater")).toBe(true);
        expect(types.has("basaltic")).toBe(true);
        expect(types.has("karst")).toBe(true);
    });

    it('searches by name and description', () => {
        const results = getFilteredFormations("Lonar");
        expect(results.length).toBeGreaterThan(0);
        expect(results[0].name.toLowerCase()).toContain("lonar");
    });
});
