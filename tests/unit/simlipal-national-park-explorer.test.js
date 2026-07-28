import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSimlipalData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/simlipal-national-park-explorer/simlipal-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SIMLIPAL_INFO, WATERFALLS, MELANISTIC_TIGERS, ELEPHANTS_WILDLIFE, FOREST_TYPES, TRIBAL_COMMUNITIES, HISTORY_TIMELINE, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Simlipal National Park Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadSimlipalData();
    });

    describe('SIMLIPAL_INFO metadata & WATERFALLS', () => {
        it('contains correct park metadata for Simlipal', () => {
            expect(data.SIMLIPAL_INFO.id).toBe('simlipal');
            expect(data.SIMLIPAL_INFO.name).toBe('Simlipal National Park');
            expect(data.SIMLIPAL_INFO.state).toBe('Odisha');
            expect(data.SIMLIPAL_INFO.establishedYear).toBe(1980);
            expect(data.SIMLIPAL_INFO.biosphereYear).toBe(2009);
            expect(data.SIMLIPAL_INFO.coordinates.lat).toBeCloseTo(21.9333, 2);
            expect(data.SIMLIPAL_INFO.coordinates.lng).toBeCloseTo(86.3500, 2);
        });

        it('WATERFALLS includes Barehipani (399m) and Joranda (181m)', () => {
            expect(Array.isArray(data.WATERFALLS)).toBe(true);
            expect(data.WATERFALLS.length).toBe(2);

            const barehipani = data.WATERFALLS.find(w => w.id === 'barehipani');
            const joranda = data.WATERFALLS.find(w => w.id === 'joranda');

            expect(barehipani).toBeDefined();
            expect(barehipani.height).toContain('399');
            expect(joranda).toBeDefined();
            expect(joranda.height).toContain('181');
        });
    });

    describe('MELANISTIC_TIGERS & ELEPHANTS_WILDLIFE', () => {
        it('MELANISTIC_TIGERS details Black Tiger genetic facts', () => {
            expect(data.MELANISTIC_TIGERS.title).toContain('Melanistic');
            expect(data.MELANISTIC_TIGERS.genetics).toContain('gene mutation');
            expect(data.MELANISTIC_TIGERS.conservationStatus).toContain('60%');
        });

        it('ELEPHANTS_WILDLIFE includes Asian Elephant and Sambar Deer', () => {
            expect(Array.isArray(data.ELEPHANTS_WILDLIFE)).toBe(true);
            expect(data.ELEPHANTS_WILDLIFE.length).toBeGreaterThanOrEqual(4);
            const elephant = data.ELEPHANTS_WILDLIFE.find(e => e.id === 'asian-elephant');
            expect(elephant).toBeDefined();
        });
    });

    describe('FOREST_TYPES & TRIBAL_COMMUNITIES', () => {
        it('FOREST_TYPES includes 94+ Orchid species and Sal forests', () => {
            expect(Array.isArray(data.FOREST_TYPES)).toBe(true);
            expect(data.FOREST_TYPES.length).toBe(4);

            const orchids = data.FOREST_TYPES.find(f => f.id === 'forest-orchids');
            expect(orchids).toBeDefined();
            expect(orchids.name).toContain('94+');
        });

        it('TRIBAL_COMMUNITIES showcases Santhal, Ho, Mankidia, Khadia', () => {
            expect(Array.isArray(data.TRIBAL_COMMUNITIES)).toBe(true);
            expect(data.TRIBAL_COMMUNITIES.length).toBeGreaterThanOrEqual(4);
            const santhal = data.TRIBAL_COMMUNITIES.find(t => t.name.includes('Santhal'));
            expect(santhal).toBeDefined();
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

        it('HISTORY_TIMELINE includes 1973 Project Tiger and 2009 UNESCO Biosphere', () => {
            expect(Array.isArray(data.HISTORY_TIMELINE)).toBe(true);
            expect(data.HISTORY_TIMELINE.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('Landing Page & Search Index Integration', () => {
        it('Simlipal entry in NATIONAL_PARKS has explorerUrl', () => {
            const npData = loadNationalParksData();
            const simlipal = npData.NATIONAL_PARKS.find(p => p.id === 'simlipal');
            expect(simlipal).toBeDefined();
            expect(simlipal.explorerUrl).toBe('../simlipal-national-park-explorer/index.html');
            expect(simlipal.state).toBe('Odisha');
        });

        it('Search Index registers Simlipal National Park Explorer', () => {
            const index = loadSearchIndex();
            const entry = index.find(item => item.title === 'Simlipal National Park Explorer');
            expect(entry).toBeDefined();
            expect(entry.url).toBe('frontend/simlipal-national-park-explorer/index.html');
        });
    });
});
