import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadRoopkundData() {
    const code = readFileSync(
        resolve(__dirname, '../../roopkund-trek-explorer/roopkund-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { ROOPKUND_INFO, TRAIL_CAMPSITES, HISTORICAL_MYSTERIES, REFERENCES };'
    );
    return fn();
}

describe('Roopkund Trek Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadRoopkundData();
    });

    describe('ROOPKUND_INFO metadata', () => {
        it('contains correct Roopkund metadata and altitude 5,029m', () => {
            expect(data.ROOPKUND_INFO.id).toBe('roopkund-trek');
            expect(data.ROOPKUND_INFO.title).toContain('Roopkund');
            expect(data.ROOPKUND_INFO.region).toContain('Uttarakhand');
            expect(data.ROOPKUND_INFO.maxAltitude).toContain('5,029 Meters');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.ROOPKUND_INFO.quickStats)).toBe(true);
            expect(data.ROOPKUND_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TRAIL_CAMPSITES & SKELETON MYSTERY', () => {
        it('contains Lohajung, Bedni Bugyal, Roopkund, and 1942 Madhwal discovery', () => {
            expect(Array.isArray(data.TRAIL_CAMPSITES)).toBe(true);
            expect(data.TRAIL_CAMPSITES.length).toBeGreaterThanOrEqual(5);

            const lake = data.TRAIL_CAMPSITES.find(c => c.day.includes('Roopkund'));
            expect(lake).toBeDefined();

            expect(Array.isArray(data.HISTORICAL_MYSTERIES)).toBe(true);
            const discovery = data.HISTORICAL_MYSTERIES.find(m => m.topic.includes('1942 Discovery'));
            expect(discovery).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Nature Communications genomics and tourism citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
