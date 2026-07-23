import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('ISRO Satellite Mission Simulator', () => {
  let jsContent;
  let htmlContent;

  beforeEach(() => {
    jsContent = fs.readFileSync(
      path.resolve(__dirname, '../../frontend/satellite-mission/script.js'),
      'utf-8'
    );
    htmlContent = fs.readFileSync(
      path.resolve(__dirname, '../../frontend/satellite-mission/index.html'),
      'utf-8'
    );
  });

  it('contains famous ISRO mission datasets including Chandrayaan, Mangalyaan, Aditya-L1, Gaganyaan', () => {
    expect(jsContent).toContain('MISSIONS_DATA');
    expect(jsContent).toContain('Chandrayaan-3');
    expect(jsContent).toContain('Mangalyaan (Mars Orbiter Mission)');
    expect(jsContent).toContain('Aditya-L1');
    expect(jsContent).toContain('Gaganyaan (Crewed Spaceflight)');
  });

  it('contains ISRO launch vehicles for rocket selection challenge', () => {
    expect(jsContent).toContain('ROCKETS_DATA');
    expect(jsContent).toContain('PSLV-XL');
    expect(jsContent).toContain('LVM3-M4');
    expect(jsContent).toContain('PSLV-C57');
    expect(jsContent).toContain('LVM3-Gaganyaan');
  });

  it('includes mission sequence, difficulty levels, and educational facts UI', () => {
    expect(htmlContent).toContain('id="mission-select"');
    expect(htmlContent).toContain('id="difficulty-select"');
    expect(htmlContent).toContain('id="rocket-options-grid"');
    expect(htmlContent).toContain('id="educational-facts-box"');
  });
});
