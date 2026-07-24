/**
 * up-pilgrimage.test.js
 * Unit tests for Uttar Pradesh Pilgrimage Circuit Planner dataset integrity,
 * route calculations, distance matrix, duration estimations, favorites, and filters.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  destinations,
  presetCircuits,
  distanceMatrix,
  getDestinationById,
  getDistance,
  calculateRouteDistance,
  calculateTravelDuration,
  calculateTotalDuration,
  getFavorites,
  toggleFavorite,
  isFavorite,
  filterDestinations,
  getPresetCircuit
} from '../../frontend/up-pilgrimage/up-pilgrimage.js';

const REQUIRED_DEST_FIELDS = [
  'id',
  'name',
  'code',
  'tradition',
  'category',
  'rivers',
  'description',
  'keySites',
  'recommendedStayDays',
  'bestSeason',
  'coords',
  'icon',
  'colorTheme'
];

const SUPPORTED_DESTINATION_IDS = [
  'ayodhya',
  'varanasi',
  'mathura',
  'vrindavan',
  'prayagraj',
  'chitrakoot',
  'kushinagar',
  'sarnath'
];

describe('UP Pilgrimage Destinations Dataset Integrity', () => {
  it('contains exactly the 8 supported UP pilgrimage destinations', () => {
    expect(destinations.length).toBe(8);
    const ids = destinations.map(d => d.id.toLowerCase());
    SUPPORTED_DESTINATION_IDS.forEach(expectedId => {
      expect(ids).toContain(expectedId);
    });
  });

  it('every destination contains all required fields with valid types', () => {
    destinations.forEach((dest, index) => {
      REQUIRED_DEST_FIELDS.forEach(field => {
        expect(dest, `Destination at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'rivers' || field === 'keySites') {
          expect(Array.isArray(dest[field])).toBe(true);
          expect(dest[field].length).toBeGreaterThan(0);
        } else if (field === 'recommendedStayDays') {
          expect(typeof dest.recommendedStayDays).toBe('number');
          expect(dest.recommendedStayDays).toBeGreaterThan(0);
        } else if (field === 'coords') {
          expect(typeof dest.coords.x).toBe('number');
          expect(typeof dest.coords.y).toBe('number');
        } else {
          expect(typeof dest[field]).toBe('string');
          expect(dest[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all destination IDs and codes are unique', () => {
    const ids = destinations.map(d => d.id);
    const codes = destinations.map(d => d.code);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(codes).size).toBe(codes.length);
  });
});

describe('Preset Circuits', () => {
  it('defines at least 5 preset circuits', () => {
    expect(presetCircuits.length).toBeGreaterThanOrEqual(5);
  });

  it('every preset circuit references valid destination IDs', () => {
    const validIds = new Set(destinations.map(d => d.id));
    presetCircuits.forEach(circuit => {
      expect(circuit).toHaveProperty('id');
      expect(circuit).toHaveProperty('name');
      expect(Array.isArray(circuit.destinations)).toBe(true);
      expect(circuit.destinations.length).toBeGreaterThan(0);
      circuit.destinations.forEach(destId => {
        expect(validIds.has(destId), `Circuit ${circuit.id} contains invalid destId ${destId}`).toBe(true);
      });
    });
  });

  it('retrieves preset circuit by ID', () => {
    const circuit = getPresetCircuit('ramayana_circuit');
    expect(circuit).toBeDefined();
    expect(circuit.destinations).toContain('ayodhya');
  });
});

describe('Distance Calculator & Matrix', () => {
  it('returns 0 distance when origin and destination are the same', () => {
    expect(getDistance('ayodhya', 'ayodhya')).toBe(0);
    expect(getDistance('varanasi', 'varanasi')).toBe(0);
  });

  it('returns symmetric distance values regardless of order', () => {
    const d1 = getDistance('ayodhya', 'prayagraj');
    const d2 = getDistance('prayagraj', 'ayodhya');
    expect(d1).toBe(165);
    expect(d2).toBe(165);
  });

  it('calculates total route distance for an itinerary sequence', () => {
    // Ayodhya -> Prayagraj (165km) + Prayagraj -> Varanasi (120km) = 285km
    const totalKm = calculateRouteDistance(['ayodhya', 'prayagraj', 'varanasi']);
    expect(totalKm).toBe(285);
  });

  it('returns 0 for route distance with less than 2 stops', () => {
    expect(calculateRouteDistance([])).toBe(0);
    expect(calculateRouteDistance(['ayodhya'])).toBe(0);
  });
});

describe('Duration Estimation', () => {
  it('calculates travel duration for car, bus, and train modes', () => {
    const dist = 300;
    expect(calculateTravelDuration(dist, 'car')).toBe(5); // 300/60
    expect(calculateTravelDuration(dist, 'bus')).toBe(6.7); // 300/45
    expect(calculateTravelDuration(dist, 'train')).toBe(4); // 300/75
  });

  it('calculates total duration breakdown for a multi-stop circuit', () => {
    const circuitStops = ['ayodhya', 'prayagraj', 'varanasi'];
    const duration = calculateTotalDuration(circuitStops, 'car');
    expect(duration.distanceKm).toBe(285);
    expect(duration.travelHours).toBe(4.8);
    expect(duration.stayDays).toBe(2 + 2 + 3); // Ayodhya (2) + Prayagraj (2) + Varanasi (3) = 7
    expect(duration.totalDays).toBeGreaterThanOrEqual(7);
  });
});

describe('Favorites Management', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  it('returns empty array when no favorites saved', () => {
    expect(getFavorites()).toEqual([]);
  });

  it('toggles favorite status and checks persistence helper', () => {
    if (typeof localStorage !== 'undefined') {
      expect(isFavorite('ayodhya')).toBe(false);
      const added = toggleFavorite('ayodhya');
      expect(added).toBe(true);
      expect(isFavorite('ayodhya')).toBe(true);
      const removed = toggleFavorite('ayodhya');
      expect(removed).toBe(false);
      expect(isFavorite('ayodhya')).toBe(false);
    }
  });
});

describe('Search & Filter Helpers', () => {
  it('filters destinations by query string', () => {
    const results = filterDestinations('Saryu');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('ayodhya');
  });

  it('filters destinations by category', () => {
    const results = filterDestinations('', 'buddhist');
    expect(results.length).toBe(2); // Kushinagar and Sarnath
    const ids = results.map(r => r.id);
    expect(ids).toContain('kushinagar');
    expect(ids).toContain('sarnath');
  });

  it('finds destination profile by ID', () => {
    const dest = getDestinationById('varanasi');
    expect(dest).toBeDefined();
    expect(dest.name).toBe('Varanasi (Kashi)');
    expect(dest.code).toBe('VA');
  });
});
