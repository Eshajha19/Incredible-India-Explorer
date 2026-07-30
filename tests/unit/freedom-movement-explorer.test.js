/**
 * freedom-movement-explorer.test.js
 * Unit Tests for "The Complete Indian Freedom Movement Explorer" module.
 */

import { describe, it, expect } from 'vitest';
import {
  freedomTimeline,
  revolutionaryOrganizations,
  freedomLeaders,
  historicalDocuments,
  getEventById,
  filterTimelineEvents,
  filterRevolutionaryOrgs,
  filterLeaders,
  getDocumentById,
  filterDocuments
} from '../../frontend/freedom-movement-explorer/freedom-movement.js';

const REQUIRED_TIMELINE_FIELDS = [
  'id',
  'year',
  'date',
  'title',
  'movement',
  'phase',
  'location',
  'description',
  'historicalImpact'
];

describe('Freedom Movements Timeline Dataset Integrity', () => {
  it('contains at least 15 verified events from early uprisings to 1947 independence', () => {
    expect(freedomTimeline.length).toBeGreaterThanOrEqual(15);
    expect(freedomTimeline[0].year).toBe(1770);
    expect(freedomTimeline[freedomTimeline.length - 1].year).toBe(1947);
  });

  it('every timeline event contains required properties with valid text', () => {
    freedomTimeline.forEach((evt, index) => {
      REQUIRED_TIMELINE_FIELDS.forEach(field => {
        expect(evt, `Timeline event at index ${index} missing field ${field}`).toHaveProperty(field);
        if (typeof evt[field] === 'string') {
          expect(evt[field].trim().length).toBeGreaterThan(0);
        } else if (typeof evt[field] === 'number') {
          expect(evt[field]).toBeGreaterThan(1700);
        }
      });
    });
  });

  it('all timeline event IDs are unique', () => {
    const ids = freedomTimeline.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Timeline Query Helpers', () => {
  it('retrieves timeline event by ID', () => {
    const swadeshi = getEventById('evt-1905-swadeshi');
    expect(swadeshi).toBeDefined();
    expect(swadeshi.title).toContain('Swadeshi');
  });

  it('filters timeline events by movement category', () => {
    const quitIndia = filterTimelineEvents('', 'Quit India');
    expect(quitIndia.length).toBeGreaterThan(0);
    expect(quitIndia.every(e => e.movement === 'Quit India')).toBe(true);
  });

  it('filters timeline events by search query (e.g. Salt or Bose or Kakori)', () => {
    const saltEvents = filterTimelineEvents('Salt');
    expect(saltEvents.length).toBeGreaterThan(0);

    const boseEvents = filterTimelineEvents('Bose');
    expect(boseEvents.length).toBeGreaterThan(0);
  });

  it('returns empty array when search query matches nothing', () => {
    const res = filterTimelineEvents('NonExistentFreedomEventXYZ');
    expect(res).toEqual([]);
  });
});

describe('Revolutionary Organizations Catalog', () => {
  it('contains major revolutionary groups (Anushilan, Jugantar, Abhinav Bharat, Ghadar, HSRA, INA)', () => {
    expect(revolutionaryOrganizations.length).toBeGreaterThanOrEqual(6);
    const names = revolutionaryOrganizations.map(o => o.name);
    expect(names.some(n => n.includes('Anushilan'))).toBe(true);
    expect(names.some(n => n.includes('Ghadar'))).toBe(true);
    expect(names.some(n => n.includes('HSRA') || n.includes('Hindustan'))).toBe(true);
  });

  it('filters revolutionary organizations by keyword', () => {
    const hsra = filterRevolutionaryOrgs('Socialist');
    expect(hsra.length).toBe(1);
    expect(hsra[0].name).toContain('HSRA');
  });
});

describe('Freedom Leaders Catalog', () => {
  it('contains comprehensive leader profiles across all freedom struggle categories', () => {
    expect(freedomLeaders.length).toBeGreaterThanOrEqual(15);
    const names = freedomLeaders.map(l => l.name);
    expect(names).toContain('Mahatma Gandhi');
    expect(names).toContain('Netaji Subhas Chandra Bose');
    expect(names).toContain('Bhagat Singh');
    expect(names).toContain('Sarojini Naidu');
    expect(names).toContain('Aruna Asaf Ali');
  });

  it('filters leaders by category', () => {
    const revolutionaries = filterLeaders('Revolutionary');
    expect(revolutionaries.length).toBeGreaterThan(0);
    expect(revolutionaries.some(l => l.category === 'Revolutionary')).toBe(true);
  });
});

describe('Primary Historical Documents Archive', () => {
  it('contains landmark speeches and declarations (Poorna Swaraj, Tryst with Destiny, etc.)', () => {
    expect(historicalDocuments.length).toBeGreaterThanOrEqual(8);
    const poorna = getDocumentById('doc-poorna-swaraj');
    expect(poorna).toBeDefined();
    expect(poorna.title).toContain('Poorna Swaraj');
  });

  it('filters historical documents by search query', () => {
    const tryst = filterDocuments('destiny');
    expect(tryst.length).toBe(1);
    expect(tryst[0].author).toContain('Nehru');
  });
});
