import { describe, it, expect } from 'vitest';
import { fortStyles, FEATURES, renderColumn } from '../../frontend/fort-architecture/fort-architecture.js';

describe('Indian Fort Architecture Comparison Explorer', () => {
    it('contains all 4 architectural styles (Rajput, Mughal, Maratha, European)', () => {
        expect(fortStyles).toBeDefined();
        expect(fortStyles.rajput).toBeDefined();
        expect(fortStyles.mughal).toBeDefined();
        expect(fortStyles.maratha).toBeDefined();
        expect(fortStyles.european).toBeDefined();
    });

    it('has complete metadata for each style', () => {
        Object.values(fortStyles).forEach(style => {
            expect(style.id).toBeDefined();
            expect(style.name).toBeDefined();
            expect(style.era).toBeDefined();
            expect(style.defenseStrategy).toBeDefined();
            expect(style.materials).toBeDefined();
            expect(style.artisticStyle).toBeDefined();
            expect(style.waterSystems).toBeDefined();
            expect(Array.isArray(style.highlights)).toBe(true);
            expect(Array.isArray(style.landmarks)).toBe(true);
        });
    });

    it('defines comparison features list', () => {
        expect(Array.isArray(FEATURES)).toBe(true);
        expect(FEATURES.length).toBeGreaterThanOrEqual(5);
    });

    it('renders comparison column without throwing error', () => {
        expect(() => renderColumn("rajput")).not.toThrow();
        const html = renderColumn("rajput");
        expect(html).toContain("Rajput Forts");
    });
});
