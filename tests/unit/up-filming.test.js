/**
 * up-filming.test.js
 * Unit tests for Uttar Pradesh Filming Locations Explorer dataset integrity,
 * location profiles, movie filters, behind-the-scenes trivia, and gallery helpers.
 */

import { describe, it, expect } from 'vitest';
import {
  locations,
  movies,
  btsTriviaList,
  galleryItems,
  getLocationById,
  getMovieById,
  getMoviesByLocation,
  getTriviaByLocation,
  filterMovies,
  filterGallery
} from '../../frontend/up-filming/up-filming.js';

const REQUIRED_LOCATION_FIELDS = [
  'id',
  'name',
  'city',
  'tagline',
  'description',
  'famousMovies',
  'highlights',
  'btsFact',
  'coords',
  'icon',
  'colorTheme'
];

const REQUIRED_MOVIE_FIELDS = [
  'id',
  'title',
  'year',
  'director',
  'cast',
  'locationIds',
  'genre',
  'description',
  'btsTrivia',
  'posterIcon',
  'rating'
];

const MANDATORY_LOCATION_IDS = [
  'varanasi_ghats',
  'taj_mahal',
  'lucknow',
  'agra',
  'jhansi',
  'prayagraj'
];

describe('UP Filming Locations Dataset Integrity', () => {
  it('contains all 6 mandatory UP filming locations', () => {
    expect(locations.length).toBe(6);
    const ids = locations.map(l => l.id.toLowerCase());
    MANDATORY_LOCATION_IDS.forEach(expectedId => {
      expect(ids).toContain(expectedId);
    });
  });

  it('every location profile contains all required fields with valid types', () => {
    locations.forEach((loc, index) => {
      REQUIRED_LOCATION_FIELDS.forEach(field => {
        expect(loc, `Location at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'famousMovies' || field === 'highlights') {
          expect(Array.isArray(loc[field])).toBe(true);
          expect(loc[field].length).toBeGreaterThan(0);
        } else if (field === 'coords') {
          expect(typeof loc.coords.x).toBe('number');
          expect(typeof loc.coords.y).toBe('number');
        } else {
          expect(typeof loc[field]).toBe('string');
          expect(loc[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all location IDs are unique', () => {
    const ids = locations.map(l => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Movies Dataset Integrity', () => {
  it('contains at least 10 blockbuster movies filmed in UP', () => {
    expect(movies.length).toBeGreaterThanOrEqual(10);
  });

  it('every movie contains all required fields with valid types', () => {
    const validLocationIds = new Set(locations.map(l => l.id));

    movies.forEach((movie, index) => {
      REQUIRED_MOVIE_FIELDS.forEach(field => {
        expect(movie, `Movie at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'cast' || field === 'locationIds') {
          expect(Array.isArray(movie[field])).toBe(true);
          expect(movie[field].length).toBeGreaterThan(0);
        } else if (field === 'year') {
          expect(typeof movie.year).toBe('number');
          expect(movie.year).toBeGreaterThan(1950);
        } else {
          expect(typeof movie[field]).toBe('string');
          expect(movie[field].trim().length).toBeGreaterThan(0);
        }
      });

      // Verify locationIds reference valid locations
      movie.locationIds.forEach(locId => {
        expect(validLocationIds.has(locId), `Movie ${movie.title} has invalid locationId ${locId}`).toBe(true);
      });
    });
  });

  it('retrieves movie by ID correctly', () => {
    const movie = getMovieById('m-1');
    expect(movie).toBeDefined();
    expect(movie.title).toBe('Raanjhanaa');
  });
});

describe('BTS Trivia & Gallery Items', () => {
  it('contains BTS trivia items for every mandatory location', () => {
    expect(btsTriviaList.length).toBeGreaterThanOrEqual(6);
    const coveredLocations = new Set(btsTriviaList.map(t => t.locationId));
    MANDATORY_LOCATION_IDS.forEach(locId => {
      expect(coveredLocations.has(locId)).toBe(true);
    });
  });

  it('contains gallery items for locations', () => {
    expect(galleryItems.length).toBeGreaterThanOrEqual(6);
    galleryItems.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('locationId');
      expect(item).toHaveProperty('category');
    });
  });
});

describe('Search & Filter Helpers', () => {
  it('filters movies by search query (e.g., Raanjhanaa or Dhanush)', () => {
    const results = filterMovies('Dhanush');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toBe('Raanjhanaa');
  });

  it('filters movies by location ID (e.g., lucknow)', () => {
    const results = filterMovies('', 'lucknow');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(m => {
      expect(m.locationIds).toContain('lucknow');
    });
  });

  it('filters movies by genre (e.g., romance)', () => {
    const results = filterMovies('', 'all', 'romance');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(m => {
      expect(m.genre.toLowerCase()).toContain('romance');
    });
  });

  it('filters gallery items by location and category', () => {
    const results = filterGallery('varanasi_ghats', 'all');
    expect(results.length).toBeGreaterThan(0);
    results.forEach(item => {
      expect(item.locationId).toBe('varanasi_ghats');
    });
  });

  it('retrieves movies filmed at a specific location', () => {
    const agraMovies = getMoviesByLocation('taj_mahal');
    expect(agraMovies.length).toBeGreaterThan(0);
  });
});
