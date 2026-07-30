import { describe, it, expect } from 'vitest';
import { KOLLERU_DATA } from '../../frontend/kolleru-lake/kolleru-data.js';
import { resolve } from 'path';
import { readFileSync } from 'fs';

describe('Kolleru Lake Explorer', () => {
    it('should have comprehensive dataset for Kolleru Lake', () => {
        expect(KOLLERU_DATA).toBeDefined();
        expect(KOLLERU_DATA.id).toBe('kolleru-lake');
        expect(KOLLERU_DATA.name).toContain('Kolleru Lake Explorer');
        expect(KOLLERU_DATA.location).toContain('Andhra Pradesh');
        expect(KOLLERU_DATA.ramsarSiteNo).toBe(1209);
    });

    it('should contain stats, geography, sanctuary, fish diversity, migratory birds, and hotspots', () => {
        expect(Array.isArray(KOLLERU_DATA.stats)).toBe(true);
        expect(KOLLERU_DATA.stats.length).toBeGreaterThanOrEqual(4);

        expect(KOLLERU_DATA.geography).toBeDefined();
        expect(KOLLERU_DATA.birdSanctuary).toBeDefined();
        expect(KOLLERU_DATA.fishDiversity).toBeDefined();

        expect(Array.isArray(KOLLERU_DATA.migratoryBirds)).toBe(true);
        expect(KOLLERU_DATA.migratoryBirds.length).toBeGreaterThanOrEqual(4);

        expect(Array.isArray(KOLLERU_DATA.hotspots)).toBe(true);
        expect(KOLLERU_DATA.hotspots.length).toBeGreaterThanOrEqual(4);
    });

    it('should be indexed in search-index.js', () => {
        const searchPath = resolve(__dirname, '../../search-index.js');
        const searchContent = readFileSync(searchPath, 'utf-8');
        expect(searchContent).toContain('frontend/kolleru-lake/index.html');
        expect(searchContent).toContain('Kolleru Lake Explorer');
    });
});
