/**
 * making-of-modern-india.test.js
 * Comprehensive Unit Tests for "The Making of Modern India (1757–1947)" Interactive Explorer.
 */

import { describe, it, expect } from 'vitest';
import {
  modernIndiaTimeline,
  governorsGeneralCatalog,
  britishActsCatalog,
  revoltsCatalog,
  reformsCatalog,
  nationalMovementsCatalog,
  historicCentersMapData,
  filterTimelineEvents,
  getEventById,
  filterGovernorsGeneral,
  filterBritishActs,
  filterRevolts,
  filterReforms,
  filterNationalMovements,
  getHistoricCenterById
} from '../../frontend/making-of-modern-india/modern-india-timeline.js';

const REQUIRED_TIMELINE_FIELDS = [
  'id',
  'year',
  'date',
  'title',
  'category',
  'era',
  'location',
  'description',
  'historicalSignificance'
];

describe('Timeline Dataset Integrity (1757–1947)', () => {
  it('contains at least 20 verified chronological events spanning from 1757 to 1947', () => {
    expect(modernIndiaTimeline.length).toBeGreaterThanOrEqual(20);
    expect(modernIndiaTimeline[0].year).toBe(1757);
    expect(modernIndiaTimeline[modernIndiaTimeline.length - 1].year).toBe(1947);
  });

  it('every timeline event contains required properties with non-empty text', () => {
    modernIndiaTimeline.forEach((event, index) => {
      REQUIRED_TIMELINE_FIELDS.forEach(field => {
        expect(event, `Timeline event at index ${index} missing field ${field}`).toHaveProperty(field);
        if (typeof event[field] === 'string') {
          expect(event[field].trim().length).toBeGreaterThan(0);
        } else if (typeof event[field] === 'number') {
          expect(event[field]).toBeGreaterThan(1700);
        }
      });
    });
  });

  it('all timeline event IDs are unique', () => {
    const ids = modernIndiaTimeline.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Timeline Filtering & Search Helpers', () => {
  it('retrieves timeline event by ID', () => {
    const plassey = getEventById('evt-1757-plassey');
    expect(plassey).toBeDefined();
    expect(plassey.title).toContain('Battle of Plassey');
  });

  it('filters timeline events by era correctly', () => {
    const eicEvents = filterTimelineEvents('', 'EIC Expansion (1757–1857)');
    expect(eicEvents.length).toBeGreaterThan(0);
    expect(eicEvents.every(e => e.era === 'EIC Expansion (1757–1857)')).toBe(true);
  });

  it('filters timeline events by category correctly', () => {
    const revolts = filterTimelineEvents('', 'all', 'Revolt');
    expect(revolts.length).toBeGreaterThan(0);
    expect(revolts.every(e => e.category === 'Revolt')).toBe(true);
  });

  it('filters timeline events by search query', () => {
    const bentinck = filterTimelineEvents('Bentinck');
    expect(bentinck.length).toBeGreaterThan(0);
    expect(bentinck[0].title).toContain('Sati');

    const quitIndia = filterTimelineEvents('Quit India');
    expect(quitIndia.length).toBeGreaterThan(0);
    expect(quitIndia[0].title).toContain('Quit India');
  });

  it('returns empty array when search query matches nothing', () => {
    const res = filterTimelineEvents('NonExistentModernIndiaEventXYZ');
    expect(res).toEqual([]);
  });
});

describe('Governors-General & Viceroys Catalogue', () => {
  it('contains entries for major Governors-General and Viceroys', () => {
    expect(governorsGeneralCatalog.length).toBeGreaterThanOrEqual(10);
    const names = governorsGeneralCatalog.map(g => g.name);
    expect(names).toContain('Warren Hastings');
    expect(names).toContain('Lord Cornwallis');
    expect(names).toContain('Lord William Bentinck');
    expect(names).toContain('Lord Dalhousie');
    expect(names).toContain('Lord Canning');
  });

  it('filters Governors-General by name or policy', () => {
    const dalhousie = filterGovernorsGeneral('Dalhousie');
    expect(dalhousie.length).toBe(1);
    expect(dalhousie[0].name).toContain('Dalhousie');
  });
});

describe('British Legislative Acts Catalogue', () => {
  it('defines major legislative acts from 1773 to 1947', () => {
    expect(britishActsCatalog.length).toBeGreaterThanOrEqual(8);
    const years = britishActsCatalog.map(a => a.year);
    expect(years).toContain(1773);
    expect(years).toContain(1858);
    expect(years).toContain(1919);
    expect(years).toContain(1935);
    expect(years).toContain(1947);
  });

  it('filters British Acts by search term', () => {
    const act1935 = filterBritishActs('1935');
    expect(act1935.length).toBe(1);
    expect(act1935[0].title).toContain('1935');
  });
});

describe('Revolts, Reforms, & Freedom Movements Catalogs', () => {
  it('contains historical revolts with leaders and regions', () => {
    expect(revoltsCatalog.length).toBeGreaterThanOrEqual(5);
    const paika = filterRevolts('Paika');
    expect(paika.length).toBe(1);
    expect(paika[0].leader).toContain('Bakshi');
  });

  it('contains social reform legislation and reformers', () => {
    expect(reformsCatalog.length).toBeGreaterThanOrEqual(4);
    const sati = filterReforms('Sati');
    expect(sati.length).toBe(1);
    expect(sati[0].reformer).toContain('Raja Ram Mohan Roy');
  });

  it('contains primary freedom movements and objectives', () => {
    expect(nationalMovementsCatalog.length).toBeGreaterThanOrEqual(4);
    const nonCoop = filterNationalMovements('Non-Cooperation');
    expect(nonCoop.length).toBe(1);
    expect(nonCoop[0].name).toContain('Non-Cooperation');
  });
});

describe('Interactive Historic Centers Map Data', () => {
  it('defines map coordinates and historical details for key epicenters', () => {
    expect(historicCentersMapData.length).toBeGreaterThanOrEqual(8);
    const plasseyNode = getHistoricCenterById('center-plassey');
    expect(plasseyNode).toBeDefined();
    expect(plasseyNode.name).toContain('Plassey');
    expect(plasseyNode.year).toBe('1757');
  });
});
