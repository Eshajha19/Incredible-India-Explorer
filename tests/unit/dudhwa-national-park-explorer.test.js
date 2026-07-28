import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadDudhwaData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/dudhwa-national-park-explorer/dudhwa-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { DUDHWA_INFO, TERAI_ECOSYSTEM, SWAMP_DEER_INFO, RHINO_CONSERVATION, TIGERS_WILDLIFE, SAFARI_ZONES, HISTORY_TIMELINE, MAP_HOTSPOTS, GALLERY_IMAGES };'
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

describe('Dudhwa National Park Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadDudhwaData();
    });

    describe('DUDHWA_INFO metadata & TERAI_ECOSYSTEM', () => {
        it('contains correct park metadata for Dudhwa', () => {
            expect(data.DUDHWA_INFO.id).toBe('dudhwa');
            expect(data.DUDHWA_INFO.name).toBe('Dudhwa National Park');
            expect(data.DUDHWA_INFO.state).toBe('Uttar Pradesh');
            expect(data.DUDHWA_INFO.establishedYear).toBe(1977);
            expect(data.DUDHWA_INFO.rhinoReintroducedYear).toBe(1984);
            expect(data.DUDHWA_INFO.coordinates.lat).toBeCloseTo(28.4917, 2);
            expect(data.DUDHWA_INFO.coordinates.lng).toBeCloseTo(80.6500, 2);
        });

        it('TERAI_ECOSYSTEM details Sal forests, grasslands and oxbow lakes', () => {
            expect(data.TERAI_ECOSYSTEM.title).toContain('Terai');
            expect(data.TERAI_ECOSYSTEM.salForests).toBeDefined();
            expect(data.TERAI_ECOSYSTEM.wetlandsAndLakes).toContain('Bankey Taal');
        });
    });

    describe('SWAMP_DEER_INFO & RHINO_CONSERVATION', () => {
        it('SWAMP_DEER_INFO details Barasingha population and adaptations', () => {
            expect(data.SWAMP_DEER_INFO.name).toContain('Barasingha');
            expect(data.SWAMP_DEER_INFO.significance).toContain('50%');
            expect(data.SWAMP_DEER_INFO.adaptation).toBeDefined();
        });

        it('RHINO_CONSERVATION covers 1984 translocation project', () => {
            expect(data.RHINO_CONSERVATION.title).toContain('1984');
            expect(data.RHINO_CONSERVATION.translocationDetails).toContain('Kaziranga');
            expect(data.RHINO_CONSERVATION.currentStatus).toBeDefined();
        });
    });

    describe('SAFARI_ZONES & TIGERS_WILDLIFE', () => {
        it('contains 4 safari zones', () => {
            expect(Array.isArray(data.SAFARI_ZONES)).toBe(true);
            expect(data.SAFARI_ZONES.length).toBe(4);
            const sonaripur = data.SAFARI_ZONES.find(z => z.id === 'sonaripur');
            expect(sonaripur).toBeDefined();
            expect(sonaripur.type).toContain('Elephant');
        });

        it('TIGERS_WILDLIFE includes Bengal Tiger and Gangetic Dolphin', () => {
            expect(Array.isArray(data.TIGERS_WILDLIFE)).toBe(true);
            expect(data.TIGERS_WILDLIFE.length).toBeGreaterThanOrEqual(4);
            const tiger = data.TIGERS_WILDLIFE.find(w => w.id === 'bengal-tiger');
            expect(tiger).toBeDefined();
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

        it('HISTORY_TIMELINE includes 1958 sanctuary and 1977 national park', () => {
            expect(Array.isArray(data.HISTORY_TIMELINE)).toBe(true);
            expect(data.HISTORY_TIMELINE.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('Landing Page & Search Index Integration', () => {
        it('Dudhwa entry in NATIONAL_PARKS has explorerUrl', () => {
            const npData = loadNationalParksData();
            const dudhwa = npData.NATIONAL_PARKS.find(p => p.id === 'dudhwa');
            expect(dudhwa).toBeDefined();
            expect(dudhwa.explorerUrl).toBe('../dudhwa-national-park-explorer/index.html');
            expect(dudhwa.state).toBe('Uttar Pradesh');
        });

        it('Search Index registers Dudhwa National Park Explorer', () => {
            const index = loadSearchIndex();
            const entry = index.find(item => item.title === 'Dudhwa National Park Explorer');
            expect(entry).toBeDefined();
            expect(entry.url).toBe('frontend/dudhwa-national-park-explorer/index.html');
        });
    });
});
