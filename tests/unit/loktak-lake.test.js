import { describe, it, expect } from 'vitest';
import { LOKTAK_DATA } from '../../frontend/loktak-lake/loktak-data.js';
import { resolve } from 'path';
import { readFileSync } from 'fs';

describe('Loktak Lake Explorer', () => {
    it('should have comprehensive dataset for Loktak Lake', () => {
        expect(LOKTAK_DATA).toBeDefined();
        expect(LOKTAK_DATA.id).toBe('loktak-lake');
        expect(LOKTAK_DATA.name).toContain('Loktak Lake Explorer');
        expect(LOKTAK_DATA.location).toContain('Manipur');
        expect(LOKTAK_DATA.ramsarSiteNo).toBe(463);
    });

    it('should contain stats, history, phumdis, Keibul Lamjao, sangai deer, and hotspots', () => {
        expect(Array.isArray(LOKTAK_DATA.stats)).toBe(true);
        expect(LOKTAK_DATA.stats.length).toBeGreaterThanOrEqual(4);

        expect(LOKTAK_DATA.history).toBeDefined();
        expect(LOKTAK_DATA.phumdis).toBeDefined();
        expect(LOKTAK_DATA.keibulLamjao).toBeDefined();
        expect(LOKTAK_DATA.sangaiDeer).toBeDefined();

        expect(Array.isArray(LOKTAK_DATA.hotspots)).toBe(true);
        expect(LOKTAK_DATA.hotspots.length).toBeGreaterThanOrEqual(4);
    });

    it('should be indexed in search-index.js', () => {
        const searchPath = resolve(__dirname, '../../search-index.js');
        const searchContent = readFileSync(searchPath, 'utf-8');
        expect(searchContent).toContain('frontend/loktak-lake/index.html');
        expect(searchContent).toContain('Loktak Lake Explorer');
    });
});
