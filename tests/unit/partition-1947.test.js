/**
 * partition-1947.test.js
 * Comprehensive Unit Tests for "The Partition of India (1947)" Interactive Explorer.
 */

import { describe, it, expect } from 'vitest';
import {
  editorialNote,
  demographicStats,
  radcliffeRegions,
  partitionTimeline,
  mountbattenPlanDetails,
  politicalLeaders,
  migrationCorridors,
  refugeeCampsData,
  archivalGallery,
  oralHistories,
  partitionQuiz,
  getTimelineEventById,
  filterTimelineEvents,
  filterLeaders,
  filterOralHistories,
  getCorridorById,
  evaluateQuiz,
  verifyNeutralityAndNonGraphicContent
} from '../../frontend/partition-1947/partition-1947.js';

const REQUIRED_TIMELINE_FIELDS = [
  'id',
  'date',
  'title',
  'phase',
  'description',
  'historicalSignificance'
];

describe('Editorial Framing & Neutrality Verification', () => {
  it('contains an official editorial note emphasizing factual & respectful framing', () => {
    expect(editorialNote).toBeDefined();
    expect(editorialNote.title).toContain('Editorial Note');
    expect(editorialNote.content).toContain('factual');
    expect(editorialNote.content).toContain('respectful');
  });

  it('scans all timeline content for absence of restricted graphic/sensational terms', () => {
    const check = verifyNeutralityAndNonGraphicContent(partitionTimeline);
    expect(check.isNeutral).toBe(true);
    expect(check.violations).toEqual([]);
  });
});

describe('Sourced Demographic & Migration Statistics', () => {
  it('contains verified population displacement figures', () => {
    expect(demographicStats.totalDisplaced).toContain('14');
    expect(demographicStats.totalDisplacedNumeric).toBeGreaterThan(10000000);
    expect(demographicStats.migratedToIndia).toContain('7.2');
    expect(demographicStats.migratedToPakistan).toContain('7.2');
  });

  it('provides official historical sources and census citations', () => {
    expect(Array.isArray(demographicStats.sources)).toBe(true);
    expect(demographicStats.sources.length).toBeGreaterThanOrEqual(3);
    const sourceText = demographicStats.sources.join(' ').toLowerCase();
    expect(sourceText).toContain('census of india 1951');
    expect(sourceText).toContain('unhcr');
  });
});

describe('Radcliffe Boundary Commission Regions', () => {
  it('covers Punjab and Bengal boundary commissions with economic impacts', () => {
    expect(radcliffeRegions.length).toBe(2);
    const names = radcliffeRegions.map(r => r.name.toLowerCase());
    expect(names.some(n => n.includes('punjab'))).toBe(true);
    expect(names.some(n => n.includes('bengal'))).toBe(true);
    radcliffeRegions.forEach(region => {
      expect(region.economicImpact).toBeDefined();
      expect(region.economicImpact.length).toBeGreaterThan(10);
    });
  });
});

describe('Mountbatten Plan Structure', () => {
  it('defines the 3rd June 1947 Plan with 4 key provisions', () => {
    expect(mountbattenPlanDetails).toBeDefined();
    expect(mountbattenPlanDetails.announcementDate).toBe('June 3, 1947');
    expect(mountbattenPlanDetails.keyProvisions.length).toBe(4);
  });
});

describe('Timeline Events Dataset Integrity (1905–1950)', () => {
  it('contains 14 chronological events spanning from 1905 to 1950', () => {
    expect(partitionTimeline.length).toBe(14);
    expect(partitionTimeline[0].date).toContain('1905');
    expect(partitionTimeline[partitionTimeline.length - 1].date).toContain('1950');
  });

  it('every timeline event contains required properties with valid text', () => {
    partitionTimeline.forEach((event, index) => {
      REQUIRED_TIMELINE_FIELDS.forEach(field => {
        expect(event, `Timeline event at index ${index} missing field ${field}`).toHaveProperty(field);
        expect(typeof event[field]).toBe('string');
        expect(event[field].trim().length).toBeGreaterThan(0);
      });
    });
  });

  it('all timeline event IDs are unique', () => {
    const ids = partitionTimeline.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Timeline Query Helpers', () => {
  it('retrieves timeline event by ID or date', () => {
    const event = getTimelineEventById('t-1947-06');
    expect(event).toBeDefined();
    expect(event.title).toContain('Mountbatten Plan');

    const indEvent = getTimelineEventById('August 14–15, 1947');
    expect(indEvent).toBeDefined();
    expect(indEvent.title).toContain('Independence');
  });

  it('filters timeline events by search query (e.g. Radcliffe or Resettlement or Swadeshi)', () => {
    const radcliffeRes = filterTimelineEvents('Radcliffe');
    expect(radcliffeRes.length).toBeGreaterThan(0);

    const swadeshiRes = filterTimelineEvents('Swadeshi');
    expect(swadeshiRes.length).toBeGreaterThan(0);

    const pactRes = filterTimelineEvents('Nehru-Liaquat');
    expect(pactRes.length).toBeGreaterThan(0);
  });

  it('returns empty array when search query matches nothing', () => {
    const res = filterTimelineEvents('NonExistentPartitionEventXYZ');
    expect(res).toEqual([]);
  });
});

describe('Political Leaders Dataset & Filtering', () => {
  it('contains major political figures across Indian, British, League, and Regional categories', () => {
    expect(politicalLeaders.length).toBeGreaterThanOrEqual(8);
    const names = politicalLeaders.map(l => l.name);
    expect(names).toContain('Lord Louis Mountbatten');
    expect(names).toContain('Jawaharlal Nehru');
    expect(names).toContain('Sardar Vallabhbhai Patel');
    expect(names).toContain('Mahatma Gandhi');
    expect(names).toContain('Muhammad Ali Jinnah');
    expect(names).toContain('Sir Cyril Radcliffe');
  });

  it('filters leaders correctly by category or search query', () => {
    const britishOnly = filterLeaders('British Official');
    expect(britishOnly.length).toBeGreaterThan(0);
    expect(britishOnly.every(l => l.category === 'British Official')).toBe(true);

    const patel = filterLeaders('Vallabhbhai');
    expect(patel.length).toBe(1);
    expect(patel[0].name).toContain('Patel');
  });
});

describe('Migration Corridors & Refugee Crisis', () => {
  it('defines 3 primary migration corridors (Punjab, Bengal, Sindh)', () => {
    expect(migrationCorridors.length).toBe(3);
    const punjabCorridor = getCorridorById('corridor-punjab');
    expect(punjabCorridor).toBeDefined();
    expect(punjabCorridor.name).toContain('Western Corridor');
  });

  it('includes records of major relief camps like Kurukshetra and Ranaghat', () => {
    expect(refugeeCampsData.length).toBeGreaterThanOrEqual(4);
    const kurukshetra = refugeeCampsData.find(c => c.id === 'camp-kurukshetra');
    expect(kurukshetra).toBeDefined();
    expect(kurukshetra.capacity || kurukshetra.peakCapacity).toContain('300,000');
  });
});

describe('Archival Gallery & Oral Histories', () => {
  it('contains archival media cards with valid historical citations', () => {
    expect(archivalGallery.length).toBeGreaterThanOrEqual(4);
    archivalGallery.forEach(photo => {
      expect(photo.title).toBeDefined();
      expect(photo.credit).toBeDefined();
    });
  });

  it('contains oral history survivor testimonies and filter function', () => {
    expect(oralHistories.length).toBeGreaterThanOrEqual(4);
    const filtered = filterOralHistories('Resilience');
    expect(filtered.length).toBeGreaterThan(0);
  });
});

describe('Knowledge Quiz Evaluation Engine', () => {
  it('has 10 educational questions with explanations', () => {
    expect(partitionQuiz.length).toBe(10);
    partitionQuiz.forEach(q => {
      expect(q.options.length).toBe(4);
      expect(q.explanation.length).toBeGreaterThan(5);
    });
  });

  it('evaluates perfect score and returns Master badge', () => {
    const perfectAnswers = {};
    partitionQuiz.forEach(q => {
      perfectAnswers[q.id] = q.correctIndex;
    });
    const result = evaluateQuiz(perfectAnswers);
    expect(result.score).toBe(10);
    expect(result.percentage).toBe(100);
    expect(result.badge).toBe('Master Historical Archivist');
  });

  it('handles partial or empty quiz answers gracefully', () => {
    const emptyResult = evaluateQuiz({});
    expect(emptyResult.score).toBe(0);
    expect(emptyResult.percentage).toBe(0);
    expect(emptyResult.badge).toBe('Historical Explorer');
  });
});
