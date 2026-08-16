/**
 * kannada-language-explorer.test.js
 * Verifies the Kannada language explorer page exists and includes the key required sections.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/kannada-explorer', file),
        'utf-8'
    );
}

describe('Kannada Language Explorer — File Integrity & HTML Markup', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('kannada.css');
        js = readExplorerFile('kannada.js');
    });

    it('contains page title, meta description, and Kannada greeting', () => {
        expect(html).toContain('Kannada: ಕನ್ನಡ & Its Literary Heritage');
        expect(html).toContain('description');
        expect(html).toContain('ನಮಸ್ಕಾರ');
    });

    it('contains script, words, family, region, and references sections', () => {
        expect(html).toContain('id="greeting-devanagari"');
        expect(html).toContain('id="words-grid"');
        expect(html).toContain('id="classification-family"');
        expect(html).toContain('id="district-chips"');
        expect(html).toContain('id="references-list"');
    });

    it('includes pronunciation audio logic and data-driven rendering', () => {
        expect(js).toContain('speechSynthesis');
        expect(js).toContain('renderGreeting');
        expect(js).toContain('KANNADA_WORDS');
        expect(js).toContain('renderReferences');
    });

    it('contains styling for the Kannada explorer layout', () => {
        expect(css).toContain('.kannada-hero');
        expect(css).toContain('.words-grid');
        expect(css).toContain('.greeting-card');
        expect(css).toContain('@media (max-width: 700px)');
    });
});
