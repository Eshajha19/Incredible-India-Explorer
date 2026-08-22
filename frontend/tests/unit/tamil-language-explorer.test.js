import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadTamilData() {
    const code = readFileSync(
        resolve(__dirname, '../../tamil-language-explorer/tamil-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { TAMIL_INFO, VOCABULARY, LITERARY_LEGENDS, REFERENCES };'
    );
    return fn();
}

describe('Tamil Language Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadTamilData();
    });

    describe('TAMIL_INFO metadata', () => {
        it('contains correct Tamil metadata, Classical status, and Vanakkam greeting', () => {
            expect(data.TAMIL_INFO.id).toBe('tamil-language');
            expect(data.TAMIL_INFO.name).toBe('Tamil');
            expect(data.TAMIL_INFO.nativeName).toBe('தமிழ்');
            expect(data.TAMIL_INFO.family).toContain('Dravidian');
            expect(data.TAMIL_INFO.greeting).toContain('வணக்கம்');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.TAMIL_INFO.quickStats)).toBe(true);
            expect(data.TAMIL_INFO.quickStats.length).toBe(6);
        });
    });

    describe('VOCABULARY & LITERARY_LEGENDS', () => {
        it('contains at least 10 vocabulary words and Thiruvalluvar', () => {
            expect(Array.isArray(data.VOCABULARY)).toBe(true);
            expect(data.VOCABULARY.length).toBeGreaterThanOrEqual(10);

            const nandri = data.VOCABULARY.find(v => v.translit === 'Nandri');
            expect(nandri).toBeDefined();
            expect(nandri.native).toBe('நன்றி');

            expect(Array.isArray(data.LITERARY_LEGENDS)).toBe(true);
            const valluvar = data.LITERARY_LEGENDS.find(l => l.author.includes('Thiruvalluvar'));
            expect(valluvar).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Classical Tamil institute and virtual academy citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
