/**
 * empires-timeline.test.js
 * Unit Tests for "Every Major Empire of India" Interactive Timeline module.
 */

import { describe, it, expect } from 'vitest';
import {
  indianEmpiresData,
  getEmpireById,
  filterEmpires,
  getEmpireStageMapData,
  filterEmpiresByEra
} from '../../frontend/indian-empires-explorer/empires-timeline.js';

const REQUIRED_EMPIRE_FIELDS = [
  'id',
  'name',
  'period',
  'era',
  'region',
  'capital',
  'peakAreaKm',
  'keyRulers',
  'expansionDetails',
  'declineFactors',
  'mapStages'
];

describe('Indian Empires Dataset Integrity', () => {
  it('contains exactly 10 major empires/civilizations as specified', () => {
    expect(indianEmpiresData.length).toBe(10);
    const names = indianEmpiresData.map(e => e.name);
    expect(names).toContain('Indus Valley Civilization');
    expect(names).toContain('Mahajanapadas');
    expect(names).toContain('Maurya Empire');
    expect(names).toContain('Gupta Empire');
    expect(names).toContain('Chalukya Dynasty');
    expect(names).toContain('Chola Empire');
    expect(names).toContain('Vijayanagara Empire');
    expect(names).toContain('Mughal Empire');
    expect(names).toContain('Maratha Empire');
    expect(names).toContain('Sikh Empire');
  });

  it('every empire entry contains required fields with valid content', () => {
    indianEmpiresData.forEach((empire, index) => {
      REQUIRED_EMPIRE_FIELDS.forEach(field => {
        expect(empire, `Empire at index ${index} missing field ${field}`).toHaveProperty(field);
      });
      expect(empire.keyRulers.length).toBeGreaterThan(0);
      expect(empire.expansionDetails.length).toBeGreaterThan(15);
      expect(empire.declineFactors.length).toBeGreaterThan(15);
      expect(empire.mapStages).toHaveProperty('foundation');
      expect(empire.mapStages).toHaveProperty('peak');
      expect(empire.mapStages).toHaveProperty('decline');
    });
  });

  it('all empire IDs are unique', () => {
    const ids = indianEmpiresData.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Empire Query Helpers & Search Engine', () => {
  it('retrieves an empire by ID or name', () => {
    const maurya = getEmpireById('empire-maurya');
    expect(maurya).toBeDefined();
    expect(maurya.name).toBe('Maurya Empire');

    const chola = getEmpireById('Chola');
    expect(chola).toBeDefined();
    expect(chola.capital).toContain('Thanjavur');
  });

  it('filters empires by era', () => {
    const ancientEmpires = filterEmpiresByEra('Ancient');
    expect(ancientEmpires.length).toBeGreaterThan(0);
    expect(ancientEmpires.every(e => e.era === 'Ancient')).toBe(true);
  });

  it('filters empires by search query (e.g. Akbar, Harappa, Hampi, Panipat)', () => {
    const akbar = filterEmpires('Akbar');
    expect(akbar.length).toBe(1);
    expect(akbar[0].name).toBe('Mughal Empire');

    const hampi = filterEmpires('Hampi');
    expect(hampi.length).toBe(1);
    expect(hampi[0].name).toBe('Vijayanagara Empire');
  });

  it('returns empty array when search query matches nothing', () => {
    const res = filterEmpires('NonExistentEmpireXYZ');
    expect(res).toEqual([]);
  });
});

describe('Territorial Map Stage Data Generator', () => {
  it('returns valid SVG map path data for foundation, peak, and decline stages', () => {
    const peakMap = getEmpireStageMapData('empire-maurya', 'peak');
    expect(peakMap).toBeDefined();
    expect(peakMap.stage).toBe('peak');
    expect(peakMap.path).toContain('M');

    const declineMap = getEmpireStageMapData('empire-maratha', 'decline');
    expect(declineMap).toBeDefined();
    expect(declineMap.stage).toBe('decline');
    expect(declineMap.path).toContain('M');
  });

  it('defaults to peak stage if an invalid stage is passed', () => {
    const defaultMap = getEmpireStageMapData('empire-gupta', 'invalidStage');
    expect(defaultMap.stage).toBe('peak');
  });
});
