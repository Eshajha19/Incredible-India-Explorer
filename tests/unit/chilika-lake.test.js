import { describe, it, expect } from 'vitest';
import { CHILIKA_DATA } from '../../frontend/chilika-lake/chilika-data.js';
import { resolve } from 'path';
import { readFileSync } from 'fs';

describe('Chilika Lake Explorer', () => {
    it('should have comprehensive data for Chilika Lake', () => {
        expect(CHILIKA_DATA).toBeDefined();
        expect(CHILIKA_DATA.id).toBe('chilika-lake');
        expect(CHILIKA_DATA.name).toContain('Chilika Lake Explorer');
        expect(CHILIKA_DATA.location).toContain('Odisha');
        expect(CHILIKA_DATA.ramsarSiteNo).toBe(229);
    });

    it('should contain stats, history, geography, dolphins, birds, and hotspots', () => {
        expect(Array.isArray(CHILIKA_DATA.stats)).toBe(true);
        expect(CHILIKA_DATA.stats.length).toBeGreaterThanOrEqual(4);

        expect(CHILIKA_DATA.history).toBeDefined();
        expect(CHILIKA_DATA.geography).toBeDefined();
        expect(CHILIKA_DATA.irrawaddyDolphins).toBeDefined();
        expect(CHILIKA_DATA.migratoryBirds).toBeDefined();

        expect(Array.isArray(CHILIKA_DATA.hotspots)).toBe(true);
        expect(CHILIKA_DATA.hotspots.length).toBeGreaterThanOrEqual(4);
    });

    it('should be indexed in search-index.js', () => {
        const searchPath = resolve(__dirname, '../../search-index.js');
        const searchContent = readFileSync(searchPath, 'utf-8');
        expect(searchContent).toContain('frontend/chilika-lake/index.html');
        expect(searchContent).toContain('Chilika Lake Explorer');
    });
});
