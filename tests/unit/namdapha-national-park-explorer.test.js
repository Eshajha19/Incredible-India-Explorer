import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadNamdaphaData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/namdapha-national-park-explorer/namdapha-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { NAMDAPHA_INFO, ALTITUDE_ZONES, FOUR_BIG_CATS, RARE_MAMMALS, BIRDLIFE, TREKKING_ROUTES, HISTORY_TIMELINE, MAP_HOTSPOTS, GALLERY_IMAGES };'
    );
    return fn();
}

function loadNationalParksData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/national-parks-explorer/data.js'),
        'utf-8'
    );
    const fn = new Function(code + '\nreturn { NATIONAL_PARKS };');
    return fn();
}

function loadSearchIndex() {
    const code = readFileSync(
        resolve(__dirname, '../../search-index.js'),
        'utf-8'
    );
    const window = {};
    const fn = new Function('window', code + '\nreturn window.indiaSearchIndex;');
    return fn(window);
}

describe('Namdapha National Park Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadNamdaphaData();
    });

    describe('NAMDAPHA_INFO metadata', () => {
        it('contains correct park metadata for Namdapha', () => {
            expect(data.NAMDAPHA_INFO.id).toBe('namdapha');
            expect(data.NAMDAPHA_INFO.name).toBe('Namdapha National Park');
            expect(data.NAMDAPHA_INFO.state).toBe('Arunachal Pradesh');
            expect(data.NAMDAPHA_INFO.establishedYear).toBe(1983);
            expect(data.NAMDAPHA_INFO.coordinates.lat).toBeCloseTo(27.4917, 2);
            expect(data.NAMDAPHA_INFO.coordinates.lng).toBeCloseTo(96.3833, 2);
        });

        it('has quickStats array with 6 entries', () => {
            expect(Array.isArray(data.NAMDAPHA_INFO.quickStats)).toBe(true);
            expect(data.NAMDAPHA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ALTITUDE_ZONES & FOUR_BIG_CATS', () => {
        it('contains 4 altitude zones from 200m to 4,571m', () => {
            expect(Array.isArray(data.ALTITUDE_ZONES)).toBe(true);
            expect(data.ALTITUDE_ZONES.length).toBe(4);
            const alpine = data.ALTITUDE_ZONES.find(z => z.id === 'zone-alpine');
            expect(alpine).toBeDefined();
            expect(alpine.range).toContain('4,571 m');
        });

        it('contains all 4 feline big cat species', () => {
            expect(Array.isArray(data.FOUR_BIG_CATS)).toBe(true);
            expect(data.FOUR_BIG_CATS.length).toBe(4);
            const ids = data.FOUR_BIG_CATS.map(c => c.id);
            expect(ids).toContain('snow-leopard');
            expect(ids).toContain('clouded-leopard');
            expect(ids).toContain('common-leopard');
            expect(ids).toContain('bengal-tiger');
        });
    });

    describe('RARE_MAMMALS & BIRDLIFE', () => {
        it('contains Red Panda and Hoolock Gibbon in RARE_MAMMALS', () => {
            expect(Array.isArray(data.RARE_MAMMALS)).toBe(true);
            expect(data.RARE_MAMMALS.length).toBeGreaterThanOrEqual(4);
            const redPanda = data.RARE_MAMMALS.find(m => m.id === 'red-panda');
            const hoolock = data.RARE_MAMMALS.find(m => m.id === 'hoolock-gibbon');
            expect(redPanda).toBeDefined();
            expect(hoolock).toBeDefined();
        });

        it('every bird species has required properties', () => {
            expect(Array.isArray(data.BIRDLIFE)).toBe(true);
            expect(data.BIRDLIFE.length).toBeGreaterThanOrEqual(5);

            data.BIRDLIFE.forEach(bird => {
                expect(bird).toHaveProperty('id');
                expect(bird).toHaveProperty('name');
                expect(bird).toHaveProperty('scientificName');
                expect(bird).toHaveProperty('category');
                expect(bird).toHaveProperty('status');
                expect(bird).toHaveProperty('image');
                expect(bird).toHaveProperty('description');
            });
        });
    });

    describe('TREKKING_ROUTES & MAP_HOTSPOTS', () => {
        it('contains 4 wilderness trekking routes', () => {
            expect(Array.isArray(data.TREKKING_ROUTES)).toBe(true);
            expect(data.TREKKING_ROUTES.length).toBe(4);
            data.TREKKING_ROUTES.forEach(route => {
                expect(route).toHaveProperty('id');
                expect(route).toHaveProperty('title');
                expect(route).toHaveProperty('distance');
                expect(route).toHaveProperty('terrain');
                expect(Array.isArray(route.camps)).toBe(true);
            });
        });

        it('MAP_HOTSPOTS has valid percentage coordinates (0-100)', () => {
            expect(Array.isArray(data.MAP_HOTSPOTS)).toBe(true);
            expect(data.MAP_HOTSPOTS.length).toBeGreaterThanOrEqual(5);

            data.MAP_HOTSPOTS.forEach(spot => {
                expect(spot.x).toBeGreaterThanOrEqual(0);
                expect(spot.x).toBeLessThanOrEqual(100);
                expect(spot.y).toBeGreaterThanOrEqual(0);
                expect(spot.y).toBeLessThanOrEqual(100);
            });
        });
    });

    describe('Landing Page & Search Index Integration', () => {
        it('Namdapha entry in NATIONAL_PARKS has explorerUrl', () => {
            const npData = loadNationalParksData();
            const namdapha = npData.NATIONAL_PARKS.find(p => p.id === 'namdapha');
            expect(namdapha).toBeDefined();
            expect(namdapha.explorerUrl).toBe('../namdapha-national-park-explorer/index.html');
            expect(namdapha.state).toBe('Arunachal Pradesh');
        });

        it('Search Index registers Namdapha National Park Explorer', () => {
            const index = loadSearchIndex();
            const entry = index.find(item => item.title === 'Namdapha National Park Explorer');
            expect(entry).toBeDefined();
            expect(entry.url).toBe('frontend/namdapha-national-park-explorer/index.html');
        });
    });
});
