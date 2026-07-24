/**
 * up-district-explorer.test.js
 * Unit tests for Uttar Pradesh District Explorer dataset completeness (75 districts),
 * division & region distributions, district profiles, search filters, and query helpers.
 */

import { describe, it, expect } from 'vitest';
import {
  districts,
  divisions,
  regions,
  getDistrictById,
  getDistrictsByDivision,
  getDistrictsByRegion,
  filterDistricts
} from '../../frontend/up-district-explorer/up-district-explorer.js';

const REQUIRED_DISTRICT_FIELDS = [
  'id',
  'name',
  'division',
  'region',
  'headquarters',
  'population',
  'attractions',
  'industries',
  'cuisine',
  'festivals',
  'coords'
];

describe('UP District Explorer Dataset Completeness & Integrity', () => {
  it('contains exactly all 75 districts of Uttar Pradesh', () => {
    expect(districts.length).toBe(75);
  });

  it('contains all 18 administrative divisions of Uttar Pradesh', () => {
    expect(divisions.length).toBe(18);
    const coveredDivisions = new Set(districts.map(d => d.division));
    divisions.forEach(div => {
      expect(coveredDivisions.has(div), `Division ${div} has no districts`).toBe(true);
    });
  });

  it('contains all 4 geographic regions of Uttar Pradesh', () => {
    expect(regions.length).toBe(4);
    const coveredRegions = new Set(districts.map(d => d.region));
    regions.forEach(reg => {
      expect(coveredRegions.has(reg), `Region ${reg} has no districts`).toBe(true);
    });
  });

  it('every district profile contains all required fields with valid types', () => {
    districts.forEach((d, index) => {
      REQUIRED_DISTRICT_FIELDS.forEach(field => {
        expect(d, `District at index ${index} missing field ${field}`).toHaveProperty(field);
        if (['attractions', 'industries', 'cuisine', 'festivals'].includes(field)) {
          expect(Array.isArray(d[field])).toBe(true);
          expect(d[field].length).toBeGreaterThan(0);
        } else if (field === 'coords') {
          expect(typeof d.coords.x).toBe('number');
          expect(typeof d.coords.y).toBe('number');
        } else {
          expect(typeof d[field]).toBe('string');
          expect(d[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all district IDs and names are unique across all 75 items', () => {
    const ids = districts.map(d => d.id);
    const names = districts.map(d => d.name);
    expect(new Set(ids).size).toBe(75);
    expect(new Set(names).size).toBe(75);
  });
});

describe('District Query Helpers', () => {
  it('retrieves district profile by ID or name', () => {
    const d1 = getDistrictById('varanasi');
    expect(d1).toBeDefined();
    expect(d1.name).toBe('Varanasi');
    expect(d1.headquarters).toBe('Varanasi');

    const d2 = getDistrictById('Taj Mahal');
    expect(d2).toBeUndefined();

    const d3 = getDistrictById('Lucknow');
    expect(d3).toBeDefined();
    expect(d3.id).toBe('lucknow');
  });

  it('retrieves all districts in a specific division (e.g. Agra Division)', () => {
    const agraDivDistricts = getDistrictsByDivision('Agra');
    expect(agraDivDistricts.length).toBe(4); // Agra, Firozabad, Mainpuri, Mathura
    const ids = agraDivDistricts.map(d => d.id);
    expect(ids).toContain('agra');
    expect(ids).toContain('mathura');
  });

  it('retrieves all districts in a specific region (e.g. Bundelkhand)', () => {
    const bundelkhandDistricts = getDistrictsByRegion('Bundelkhand');
    expect(bundelkhandDistricts.length).toBeGreaterThanOrEqual(7);
  });
});

describe('Search & Filter Helpers', () => {
  it('filters districts by search query (e.g. Petha or Taj Mahal)', () => {
    const searchRes = filterDistricts('Petha');
    expect(searchRes.length).toBeGreaterThan(0);
    expect(searchRes[0].id).toBe('agra');
  });

  it('filters districts by division and region combined', () => {
    const res = filterDistricts('', 'Lucknow', 'Awadh');
    expect(res.length).toBe(6); // Lucknow, Hardoi, Lakhimpur Kheri, Rae Bareli, Sitapur, Unnao
  });

  it('returns empty array when search query matches nothing', () => {
    const res = filterDistricts('NonExistentPlaceXYZ');
    expect(res).toEqual([]);
  });
});
