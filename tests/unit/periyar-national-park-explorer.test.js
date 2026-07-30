import { describe, it, expect } from 'vitest';
import { PERIYAR_DATA } from '../../frontend/periyar-national-park-explorer/periyar-data.js';
import { resolve } from 'path';
import { readFileSync } from 'fs';

describe('Periyar National Park Explorer', () => {
    it('should have a comprehensive dataset for Periyar National Park', () => {
        expect(PERIYAR_DATA).toBeDefined();
        expect(PERIYAR_DATA.id).toBe('periyar');
        expect(PERIYAR_DATA.name).toContain('Periyar National Park');
        expect(PERIYAR_DATA.location).toContain('Kerala');
        expect(PERIYAR_DATA.established).toBe(1982);
        expect(PERIYAR_DATA.totalArea).toBe('925 km²');
    });

    it('should contain quick stats, fauna, safari zones, and map hotspots', () => {
        expect(Array.isArray(PERIYAR_DATA.quickStats)).toBe(true);
        expect(PERIYAR_DATA.quickStats.length).toBeGreaterThanOrEqual(4);

        expect(Array.isArray(PERIYAR_DATA.elephantsAndFauna)).toBe(true);
        expect(PERIYAR_DATA.elephantsAndFauna.length).toBeGreaterThanOrEqual(5);

        expect(Array.isArray(PERIYAR_DATA.safariZones)).toBe(true);
        expect(PERIYAR_DATA.safariZones.length).toBeGreaterThanOrEqual(4);

        expect(Array.isArray(PERIYAR_DATA.mapHotspots)).toBe(true);
        expect(PERIYAR_DATA.mapHotspots.length).toBeGreaterThanOrEqual(4);

        expect(Array.isArray(PERIYAR_DATA.gallery)).toBe(true);
        expect(PERIYAR_DATA.gallery.length).toBeGreaterThanOrEqual(4);
    });

    it('should be integrated into national-parks-explorer data.js', () => {
        const npDataPath = resolve(__dirname, '../../frontend/national-parks-explorer/data.js');
        const npDataContent = readFileSync(npDataPath, 'utf-8');
        expect(npDataContent).toContain("id: 'periyar'");
        expect(npDataContent).toContain("explorerUrl: '../periyar-national-park-explorer/index.html'");
    });

    it('should be indexed in search-index.js', () => {
        const searchPath = resolve(__dirname, '../../search-index.js');
        const searchContent = readFileSync(searchPath, 'utf-8');
        expect(searchContent).toContain('frontend/periyar-national-park-explorer/index.html');
        expect(searchContent).toContain('Periyar National Park Explorer');
    });
});
