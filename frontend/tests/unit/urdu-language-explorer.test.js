import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadUrduData() {
    const code = readFileSync(
        resolve(__dirname, '../../urdu-language-explorer/urdu-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { URDU_INFO, VOCABULARY, LITERARY_LEGENDS, REFERENCES };'
    );
    return fn();
}

describe('Urdu Language Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadUrduData();
    });

    describe('URDU_INFO metadata', () => {
        it('contains correct Urdu metadata, Nastaliq script, and greeting', () => {
            expect(data.URDU_INFO.id).toBe('urdu-language');
            expect(data.URDU_INFO.name).toBe('Urdu');
            expect(data.URDU_INFO.nativeName).toBe('اردو');
            expect(data.URDU_INFO.script).toContain('Nastaliq');
            expect(data.URDU_INFO.greeting).toContain('آداب');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.URDU_INFO.quickStats)).toBe(true);
            expect(data.URDU_INFO.quickStats.length).toBe(6);
        });
    });

    describe('VOCABULARY & LITERARY_LEGENDS', () => {
        it('contains at least 10 vocabulary words with transliteration and IPA', () => {
            expect(Array.isArray(data.VOCABULARY)).toBe(true);
            expect(data.VOCABULARY.length).toBeGreaterThanOrEqual(10);

            const shukriya = data.VOCABULARY.find(v => v.translit === 'Shukriya');
            expect(shukriya).toBeDefined();
            expect(shukriya.native).toBe('شکریہ');

            expect(Array.isArray(data.LITERARY_LEGENDS)).toBe(true);
            const ghalib = data.LITERARY_LEGENDS.find(l => l.poet.includes('Ghalib'));
            expect(ghalib).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains official language council and Rekhta repository citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
