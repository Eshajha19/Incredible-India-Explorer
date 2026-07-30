import { describe, it, expect } from 'vitest';
import { WETLANDS_DATA } from '../../frontend/wetlands/wetlands-data.js';
import { resolve } from 'path';
import { readFileSync } from 'fs';

describe('Wetlands of India Explorer Landing Page', () => {
    it('should have a comprehensive dataset for Wetlands of India', () => {
        expect(WETLANDS_DATA).toBeDefined();
        expect(Array.isArray(WETLANDS_DATA.stats)).toBe(true);
        expect(WETLANDS_DATA.stats.length).toBeGreaterThanOrEqual(4);

        expect(Array.isArray(WETLANDS_DATA.types)).toBe(true);
        expect(WETLANDS_DATA.types).toContain('Lagoon');
        expect(WETLANDS_DATA.types).toContain('Lake');
        expect(WETLANDS_DATA.types).toContain('Mangrove');

        expect(Array.isArray(WETLANDS_DATA.wetlands)).toBe(true);
        expect(WETLANDS_DATA.wetlands.length).toBeGreaterThanOrEqual(5);
    });

    it('every wetland entry should have required card properties', () => {
        WETLANDS_DATA.wetlands.forEach((wetland) => {
            expect(wetland.id).toBeDefined();
            expect(wetland.name).toBeDefined();
            expect(wetland.state).toBeDefined();
            expect(wetland.type).toBeDefined();
            expect(wetland.shortDesc).toBeDefined();
            expect(wetland.image).toBeDefined();
            expect(wetland.exploreUrl).toBeDefined();
        });
    });

    it('should be indexed in search-index.js', () => {
        const searchPath = resolve(__dirname, '../../search-index.js');
        const searchContent = readFileSync(searchPath, 'utf-8');
        expect(searchContent).toContain('frontend/wetlands/index.html');
        expect(searchContent).toContain('Wetlands of India Explorer');
    });
});
