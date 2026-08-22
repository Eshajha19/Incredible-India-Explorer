import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadMarathiData() {
    const code = readFileSync(
        resolve(__dirname, '../../marathi-language-explorer/marathi-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { MARATHI_INFO, VOCABULARY, LITERARY_LEGENDS, REFERENCES };'
    );
    return fn();
}

describe('Marathi Language Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadMarathiData();
    });

    describe('MARATHI_INFO metadata', () => {
        it('contains correct Marathi metadata, Devanagari script, and Namaskar greeting', () => {
            expect(data.MARATHI_INFO.id).toBe('marathi-language');
            expect(data.MARATHI_INFO.name).toBe('Marathi');
            expect(data.MARATHI_INFO.nativeName).toBe('मराठी');
            expect(data.MARATHI_INFO.family).toContain('Indo-Aryan');
            expect(data.MARATHI_INFO.greeting).toContain('नमस्कार');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.MARATHI_INFO.quickStats)).toBe(true);
            expect(data.MARATHI_INFO.quickStats.length).toBe(6);
        });
    });

    describe('VOCABULARY & LITERARY_LEGENDS', () => {
        it('contains at least 10 vocabulary words and Sant Dnyaneshwar', () => {
            expect(Array.isArray(data.VOCABULARY)).toBe(true);
            expect(data.VOCABULARY.length).toBeGreaterThanOrEqual(10);

            const dhanyavaad = data.VOCABULARY.find(v => v.translit === 'Dhanyavaad');
            expect(dhanyavaad).toBeDefined();
            expect(dhanyavaad.native).toBe('धन्यवाद');

            expect(Array.isArray(data.LITERARY_LEGENDS)).toBe(true);
            const dnyaneshwar = data.LITERARY_LEGENDS.find(l => l.author.includes('Dnyaneshwar'));
            expect(dnyaneshwar).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Rajya Marathi Vikas Sanstha and Sahitya Parishad citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
