import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadManasData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/manas-national-park-explorer/manas-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { MANAS_INFO, FIVE_STATUSES, MANAS_RIVER_INFO, SPECIES_SPOTLIGHT, BIRDLIFE, HISTORY_TIMELINE, INTERESTING_FACTS, MAP_HOTSPOTS, GALLERY_IMAGES };'
    );
    return fn();
}

function loadNationalParksData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/national-parks-explorer/data.js'),
        'utf-8'
    );
    const fn = new Function(code + '\nreturn { NATIONAL_PARKS, STATES };');
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

describe('Manas National Park Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadManasData();
    });

    describe('MANAS_INFO metadata & FIVE_STATUSES', () => {
        it('contains correct park metadata for Manas', () => {
            expect(data.MANAS_INFO.id).toBe('manas');
            expect(data.MANAS_INFO.name).toBe('Manas National Park');
            expect(data.MANAS_INFO.state).toBe('Assam');
            expect(data.MANAS_INFO.unescoYear).toBe(1985);
            expect(data.MANAS_INFO.coordinates.lat).toBeCloseTo(26.65, 2);
            expect(data.MANAS_INFO.coordinates.lng).toBeCloseTo(91.0, 2);
        });

        it('FIVE_STATUSES contains 5 conservation designations', () => {
            expect(Array.isArray(data.FIVE_STATUSES)).toBe(true);
            expect(data.FIVE_STATUSES.length).toBe(5);
            const unesco = data.FIVE_STATUSES.find(s => s.title.includes('UNESCO'));
            expect(unesco).toBeDefined();
        });
    });

    describe('SPECIES_SPOTLIGHT & MANAS_RIVER_INFO', () => {
        it('SPECIES_SPOTLIGHT includes Golden Langur, Pygmy Hog, and Bengal Tiger', () => {
            expect(Array.isArray(data.SPECIES_SPOTLIGHT)).toBe(true);
            expect(data.SPECIES_SPOTLIGHT.length).toBeGreaterThanOrEqual(6);

            const goldenLangur = data.SPECIES_SPOTLIGHT.find(s => s.id === 'golden-langur');
            const pygmyHog = data.SPECIES_SPOTLIGHT.find(s => s.id === 'pygmy-hog');
            const tiger = data.SPECIES_SPOTLIGHT.find(s => s.id === 'bengal-tiger');

            expect(goldenLangur).toBeDefined();
            expect(pygmyHog).toBeDefined();
            expect(tiger).toBeDefined();
            expect(pygmyHog.status).toContain('Critically Endangered');
        });

        it('MANAS_RIVER_INFO details transboundary hydrology', () => {
            expect(data.MANAS_RIVER_INFO.name).toContain('Manas River');
            expect(data.MANAS_RIVER_INFO.origin).toContain('Bhutan');
            expect(Array.isArray(data.MANAS_RIVER_INFO.keyFeatures)).toBe(true);
        });
    });

    describe('BIRDLIFE & INTERESTING_FACTS', () => {
        it('BIRDLIFE has required properties and includes Bengal Florican', () => {
            expect(Array.isArray(data.BIRDLIFE)).toBe(true);
            expect(data.BIRDLIFE.length).toBeGreaterThanOrEqual(4);
            const florican = data.BIRDLIFE.find(b => b.id === 'bengal-florican');
            expect(florican).toBeDefined();

            data.BIRDLIFE.forEach(bird => {
                expect(bird).toHaveProperty('id');
                expect(bird).toHaveProperty('name');
                expect(bird).toHaveProperty('scientificName');
                expect(bird).toHaveProperty('status');
                expect(bird).toHaveProperty('image');
                expect(bird).toHaveProperty('description');
            });
        });

        it('INTERESTING_FACTS contains 6 cards', () => {
            expect(Array.isArray(data.INTERESTING_FACTS)).toBe(true);
            expect(data.INTERESTING_FACTS.length).toBe(6);
        });
    });

    describe('MAP_HOTSPOTS & HISTORY_TIMELINE', () => {
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

        it('HISTORY_TIMELINE includes 2011 UNESCO Danger List removal', () => {
            expect(Array.isArray(data.HISTORY_TIMELINE)).toBe(true);
            const recovery = data.HISTORY_TIMELINE.find(item => item.year.includes('2011'));
            expect(recovery).toBeDefined();
        });
    });

    describe('Landing Page & Search Index Integration', () => {
        it('Manas entry in NATIONAL_PARKS has explorerUrl', () => {
            const npData = loadNationalParksData();
            const manas = npData.NATIONAL_PARKS.find(p => p.id === 'manas');
            expect(manas).toBeDefined();
            expect(manas.explorerUrl).toBe('../manas-national-park-explorer/index.html');
            expect(manas.state).toBe('Assam');
        });

        it('Search Index registers Manas National Park Explorer', () => {
            const index = loadSearchIndex();
            const entry = index.find(item => item.title === 'Manas National Park Explorer');
            expect(entry).toBeDefined();
            expect(entry.url).toBe('frontend/manas-national-park-explorer/index.html');
        });
    });
});
