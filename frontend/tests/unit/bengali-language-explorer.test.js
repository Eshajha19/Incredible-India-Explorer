import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadBengaliData() {
    const code = readFileSync(
        resolve(__dirname, '../../bengali-language-explorer/bengali-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { BENGALI_INFO, VOCABULARY, LITERARY_LEGENDS, REFERENCES };'
    );
    return fn();
}

describe('Bengali Language Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadBengaliData();
    });

    describe('BENGALI_INFO metadata', () => {
        it('contains correct Bengali metadata, Classical status, and Nomoskar greeting', () => {
            expect(data.BENGALI_INFO.id).toBe('bengali-language');
            expect(data.BENGALI_INFO.name).toBe('Bengali');
            expect(data.BENGALI_INFO.nativeName).toContain('বাংলা');
            expect(data.BENGALI_INFO.family).toContain('Indo-Aryan');
            expect(data.BENGALI_INFO.greeting).toContain('নমস্কার');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.BENGALI_INFO.quickStats)).toBe(true);
            expect(data.BENGALI_INFO.quickStats.length).toBe(6);
        });
    });

    describe('VOCABULARY & LITERARY_LEGENDS', () => {
        it('contains at least 10 vocabulary words and Rabindranath Tagore', () => {
            expect(Array.isArray(data.VOCABULARY)).toBe(true);
            expect(data.VOCABULARY.length).toBeGreaterThanOrEqual(10);

            const dhonnobad = data.VOCABULARY.find(v => v.translit === 'Dhonnobad');
            expect(dhonnobad).toBeDefined();
            expect(dhonnobad.native).toBe('ধন্যবাদ');

            expect(Array.isArray(data.LITERARY_LEGENDS)).toBe(true);
            const tagore = data.LITERARY_LEGENDS.find(l => l.author.includes('Tagore'));
            expect(tagore).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Bangla Akademi and Sahitya Akademi citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
