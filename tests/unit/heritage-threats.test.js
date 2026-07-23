import { describe, it, expect } from 'vitest';
import { heritageThreats, getFilteredThreats } from '../../frontend/heritage-threats/heritage-threats.js';

describe('Heritage Threat Monitor', () => {
    it('contains minimum 10 endangered heritage sites with complete fields', () => {
        expect(Array.isArray(heritageThreats)).toBe(true);
        expect(heritageThreats.length).toBeGreaterThanOrEqual(10);

        heritageThreats.forEach(site => {
            expect(site.id).toBeDefined();
            expect(site.siteName).toBeDefined();
            expect(site.location).toBeDefined();
            expect(site.category).toBeDefined();
            expect(site.severity).toBeDefined();
            expect(site.description).toBeDefined();
            expect(site.conservationEfforts).toBeDefined();
        });
    });

    it('filters threats by category correctly', () => {
        const pollutionThreats = getFilteredThreats("", "pollution", "all");
        expect(pollutionThreats.length).toBeGreaterThan(0);
        pollutionThreats.forEach(t => expect(t.category).toBe("pollution"));
    });

    it('filters threats by severity level correctly', () => {
        const criticalThreats = getFilteredThreats("", "all", "critical");
        expect(criticalThreats.length).toBeGreaterThan(0);
        criticalThreats.forEach(t => expect(t.severity).toBe("critical"));
    });

    it('filters threats by search query string correctly', () => {
        const results = getFilteredThreats("Taj Mahal");
        expect(results.length).toBeGreaterThan(0);
        expect(results[0].siteName).toContain("Taj Mahal");
    });
});
