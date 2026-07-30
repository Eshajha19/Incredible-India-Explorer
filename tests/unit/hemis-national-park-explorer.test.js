import { describe, it, expect } from 'vitest';
import { HEMIS_DATA } from '../../frontend/hemis-national-park-explorer/hemis-data.js';
import { resolve } from 'path';
import { readFileSync } from 'fs';

describe('Hemis National Park Explorer', () => {
    it('should have a comprehensive dataset for Hemis National Park', () => {
        expect(HEMIS_DATA).toBeDefined();
        expect(HEMIS_DATA.id).toBe('hemis');
        expect(HEMIS_DATA.name).toContain('Hemis National Park');
        expect(HEMIS_DATA.location).toContain('Ladakh');
        expect(HEMIS_DATA.established).toBe(1981);
        expect(HEMIS_DATA.totalArea).toBe('4,400 km²');
    });

    it('should contain quick stats, snow leopard spotlight, wildlife, trekking routes, and map hotspots', () => {
        expect(Array.isArray(HEMIS_DATA.quickStats)).toBe(true);
        expect(HEMIS_DATA.quickStats.length).toBeGreaterThanOrEqual(4);

        expect(HEMIS_DATA.snowLeopardSpotlight).toBeDefined();
        expect(Array.isArray(HEMIS_DATA.snowLeopardSpotlight.adaptations)).toBe(true);
        expect(HEMIS_DATA.snowLeopardSpotlight.adaptations.length).toBeGreaterThanOrEqual(4);

        expect(Array.isArray(HEMIS_DATA.himalayanWildlife)).toBe(true);
        expect(HEMIS_DATA.himalayanWildlife.length).toBeGreaterThanOrEqual(5);

        expect(Array.isArray(HEMIS_DATA.trekkingRoutes)).toBe(true);
        expect(HEMIS_DATA.trekkingRoutes.length).toBeGreaterThanOrEqual(3);

        expect(Array.isArray(HEMIS_DATA.mapHotspots)).toBe(true);
        expect(HEMIS_DATA.mapHotspots.length).toBeGreaterThanOrEqual(5);

        expect(Array.isArray(HEMIS_DATA.gallery)).toBe(true);
        expect(HEMIS_DATA.gallery.length).toBeGreaterThanOrEqual(4);
    });

    it('should be integrated into national-parks-explorer data.js', () => {
        const npDataPath = resolve(__dirname, '../../frontend/national-parks-explorer/data.js');
        const npDataContent = readFileSync(npDataPath, 'utf-8');
        expect(npDataContent).toContain("id: 'hemis'");
        expect(npDataContent).toContain("explorerUrl: '../hemis-national-park-explorer/index.html'");
    });

    it('should be indexed in search-index.js', () => {
        const searchPath = resolve(__dirname, '../../search-index.js');
        const searchContent = readFileSync(searchPath, 'utf-8');
        expect(searchContent).toContain('frontend/hemis-national-park-explorer/index.html');
        expect(searchContent).toContain('Hemis National Park Explorer');
    });
});
