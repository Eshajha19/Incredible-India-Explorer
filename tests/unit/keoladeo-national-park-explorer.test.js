import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadKeoladeoData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/keoladeo-national-park-explorer/keoladeo-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { KEOLADEO_INFO, WETLAND_HYDROLOGY, FLYWAY_INFO, BIRD_SPECIES, CYCLING_ROUTES, HISTORY_TIMELINE, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Keoladeo National Park Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadKeoladeoData();
    });

    describe('KEOLADEO_INFO metadata', () => {
        it('contains correct park metadata and status', () => {
            expect(data.KEOLADEO_INFO.id).toBe('keoladeo');
            expect(data.KEOLADEO_INFO.name).toBe('Keoladeo National Park');
            expect(data.KEOLADEO_INFO.unescoYear).toBe(1985);
            expect(data.KEOLADEO_INFO.ramsarYear).toBe(1981);
            expect(data.KEOLADEO_INFO.coordinates.lat).toBeCloseTo(27.1583, 2);
            expect(data.KEOLADEO_INFO.coordinates.lng).toBeCloseTo(77.5222, 2);
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.KEOLADEO_INFO.quickStats)).toBe(true);
            expect(data.KEOLADEO_INFO.quickStats.length).toBe(6);
        });
    });

    describe('WETLAND_HYDROLOGY & FLYWAY_INFO', () => {
        it('has overview and 4 seasonal cycle phases', () => {
            expect(data.WETLAND_HYDROLOGY.overview).toBeDefined();
            expect(Array.isArray(data.WETLAND_HYDROLOGY.seasons)).toBe(true);
            expect(data.WETLAND_HYDROLOGY.seasons.length).toBe(4);
        });

        it('FLYWAY_INFO contains Siberian Crane history and origin regions', () => {
            expect(data.FLYWAY_INFO.name).toContain('Central Asian Flyway');
            expect(data.FLYWAY_INFO.siberianCraneStory).toBeDefined();
            expect(Array.isArray(data.FLYWAY_INFO.keyOriginRegions)).toBe(true);
            expect(data.FLYWAY_INFO.keyOriginRegions.length).toBeGreaterThan(0);
        });
    });

    describe('BIRD_SPECIES catalog', () => {
        it('is a non-empty array of bird species', () => {
            expect(Array.isArray(data.BIRD_SPECIES)).toBe(true);
            expect(data.BIRD_SPECIES.length).toBeGreaterThanOrEqual(10);
        });

        it('every bird has required properties and unique id', () => {
            const required = ['id', 'name', 'scientificName', 'category', 'status', 'season', 'diet', 'wingspan', 'image', 'description'];
            const ids = data.BIRD_SPECIES.map(b => b.id);
            expect(new Set(ids).size).toBe(ids.length);

            data.BIRD_SPECIES.forEach(bird => {
                required.forEach(prop => {
                    expect(bird).toHaveProperty(prop);
                    expect(bird[prop]).toBeTruthy();
                });
            });
        });

        it('includes Siberian Crane and Painted Stork', () => {
            const siberianCrane = data.BIRD_SPECIES.find(b => b.id === 'siberian-crane');
            const paintedStork = data.BIRD_SPECIES.find(b => b.id === 'painted-stork');
            expect(siberianCrane).toBeDefined();
            expect(paintedStork).toBeDefined();
            expect(siberianCrane.status).toBe('Critically Endangered');
        });
    });

    describe('CYCLING_ROUTES', () => {
        it('contains 4 cycling routes with distances and landmarks', () => {
            expect(Array.isArray(data.CYCLING_ROUTES)).toBe(true);
            expect(data.CYCLING_ROUTES.length).toBe(4);

            data.CYCLING_ROUTES.forEach(route => {
                expect(route).toHaveProperty('id');
                expect(route).toHaveProperty('title');
                expect(route).toHaveProperty('distance');
                expect(route).toHaveProperty('duration');
                expect(Array.isArray(route.highlights)).toBe(true);
                expect(route.highlights.length).toBeGreaterThan(0);
            });
        });
    });

    describe('HISTORY_TIMELINE & MAP_HOTSPOTS', () => {
        it('HISTORY_TIMELINE spans from 1760s Ajan Bund to UNESCO and present', () => {
            expect(Array.isArray(data.HISTORY_TIMELINE)).toBe(true);
            expect(data.HISTORY_TIMELINE.length).toBeGreaterThanOrEqual(6);
            const first = data.HISTORY_TIMELINE[0];
            expect(first.year).toBe('1760s');
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
        it('Keoladeo entry in NATIONAL_PARKS has explorerUrl', () => {
            const npData = loadNationalParksData();
            const keoladeo = npData.NATIONAL_PARKS.find(p => p.id === 'keoladeo');
            expect(keoladeo).toBeDefined();
            expect(keoladeo.explorerUrl).toBe('../keoladeo-national-park-explorer/index.html');
        });

        it('Search Index registers Keoladeo National Park Explorer', () => {
            const index = loadSearchIndex();
            const entry = index.find(item => item.title === 'Keoladeo National Park Explorer');
            expect(entry).toBeDefined();
            expect(entry.url).toBe('frontend/keoladeo-national-park-explorer/index.html');
        });
    });
});
