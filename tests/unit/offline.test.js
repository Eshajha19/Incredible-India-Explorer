import { describe, it, expect } from 'vitest';

describe('Offline trivia pool', () => {
  const TRIVIA = [
    "India is the only country in the world that is home to both tigers and lions.",
    "The Jantar Mantar observatory in Jaipur features the world's largest stone sundial.",
  ];

  it('picks a random trivia item within bounds', () => {
    const index = Math.floor(Math.random() * TRIVIA.length);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(TRIVIA.length);
    expect(TRIVIA[index]).toBeTruthy();
  });

  it('cycles through trivia correctly', () => {
    let currentIndex = 0;
    const next = () => { currentIndex = (currentIndex + 1) % TRIVIA.length; };
    next(); expect(currentIndex).toBe(1);
    next(); expect(currentIndex).toBe(0); // wraps
  });
});

describe('Service Worker Precaching', () => {
  it('all files defined in STATIC_ASSETS_TO_PRECACHE exist in the repository', () => {
    const fs = require('fs');
    const path = require('path');
    const swPath = path.resolve(__dirname, '../../sw.js');
    const swContent = fs.readFileSync(swPath, 'utf8');

    // Extract the STATIC_ASSETS_TO_PRECACHE array using regex
    const match = swContent.match(/const STATIC_ASSETS_TO_PRECACHE = \[\s*([\s\S]*?)\s*\];/);
    expect(match).toBeTruthy();

    const assetsStr = match[1];
    // Split by comma and clean up quotes/whitespace
    const assets = assetsStr
      .split(',')
      .map(item => {
        let clean = item.trim();
        if ((clean.startsWith("'") && clean.endsWith("'")) || (clean.startsWith('"') && clean.endsWith('"'))) {
          clean = clean.slice(1, -1);
        }
        if (clean.startsWith('./')) {
          clean = clean.slice(2);
        }
        return clean;
      })
      .filter(item => item.length > 0 && item !== '.');

    expect(assets.length).toBeGreaterThan(0);

    // Verify each asset exists in the workspace
    assets.forEach(asset => {
      const assetPath = path.resolve(__dirname, '../../', asset);
      const exists = fs.existsSync(assetPath);
      expect(exists).toBe(true);
    });
  });
});
