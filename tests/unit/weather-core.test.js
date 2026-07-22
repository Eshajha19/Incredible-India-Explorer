/**
 * weather-core.test.js
 * Tests for js-modules/weather-core.js — the pure rule-based weather
 * suitability, alternative-recommendation, and reorder-suggestion logic
 * behind the Weather-Aware Itinerary Adjustment feature (issue #286).
 */

import { describe, it, expect } from 'vitest';
import Core from '../../js-modules/weather-core.js';

function forecastDay(overrides) {
    return Object.assign({
        date: '2026-08-01',
        weatherCode: 0,
        tempMaxC: 28,
        tempMinC: 20,
        precipProbability: 5
    }, overrides);
}

describe('weather-core: classifyWeatherCode', () => {
    it('classifies a clear-sky code as no severity', () => {
        expect(Core.classifyWeatherCode(0).severity).toBe('none');
    });

    it('classifies heavy rain as severe', () => {
        expect(Core.classifyWeatherCode(65).severity).toBe('severe');
    });

    it('classifies thunderstorm with hail as severe', () => {
        expect(Core.classifyWeatherCode(99).severity).toBe('severe');
    });

    it('falls back to "Unknown" for an unrecognized code', () => {
        const result = Core.classifyWeatherCode(12345);
        expect(result.label).toBe('Unknown');
        expect(result.severity).toBe('none');
    });
});

describe('weather-core: destinationOutdoorSensitivity', () => {
    it('rates beach/adventure/wildlife destinations as high sensitivity', () => {
        expect(Core.destinationOutdoorSensitivity(['beaches'])).toBe('high');
        expect(Core.destinationOutdoorSensitivity(['adventure'])).toBe('high');
        expect(Core.destinationOutdoorSensitivity(['wildlife'])).toBe('high');
    });

    it('rates city-only destinations as low sensitivity', () => {
        expect(Core.destinationOutdoorSensitivity(['city'])).toBe('low');
    });

    it('treats mixed categories as high if any category is high', () => {
        expect(Core.destinationOutdoorSensitivity(['city', 'beaches'])).toBe('high');
    });

    it('defaults to moderate for an empty category list', () => {
        expect(Core.destinationOutdoorSensitivity([])).toBe('moderate');
    });
});

describe('weather-core: computeDaySuitability', () => {
    it('rates a clear, mild day as good regardless of category', () => {
        const result = Core.computeDaySuitability(forecastDay(), ['beaches']);
        expect(result.status).toBe('good');
    });

    it('rates heavy rain as poor for an outdoor-heavy (beach) destination', () => {
        const result = Core.computeDaySuitability(
            forecastDay({ weatherCode: 65, precipProbability: 90 }),
            ['beaches']
        );
        expect(result.status).toBe('poor');
        expect(result.reasons.length).toBeGreaterThan(0);
    });

    it('rates the same heavy rain as less severe for a low-sensitivity (city) destination', () => {
        const beach = Core.computeDaySuitability(forecastDay({ weatherCode: 65, precipProbability: 90 }), ['beaches']);
        const city = Core.computeDaySuitability(forecastDay({ weatherCode: 65, precipProbability: 90 }), ['city']);
        expect(city.riskScore).toBeLessThan(beach.riskScore);
    });

    it('flags extreme heat', () => {
        const result = Core.computeDaySuitability(forecastDay({ tempMaxC: 44 }), ['desert']);
        expect(result.status).not.toBe('good');
        expect(result.reasons.some((r) => r.includes('heat'))).toBe(true);
    });

    it('flags near-freezing temperatures', () => {
        const result = Core.computeDaySuitability(forecastDay({ tempMinC: -2 }), ['mountains']);
        expect(result.reasons.some((r) => r.includes('freezing'))).toBe(true);
    });

    it('returns status "unknown" when no forecast is available', () => {
        const result = Core.computeDaySuitability(null, ['heritage']);
        expect(result.status).toBe('unknown');
    });

    it('moderate precipitation probability nudges status to caution, not poor', () => {
        const result = Core.computeDaySuitability(forecastDay({ precipProbability: 40 }), ['heritage']);
        expect(['good', 'caution']).toContain(result.status);
    });
});

describe('weather-core: evaluateItineraryWeather', () => {
    const destinationsById = {
        goa: { id: 'goa', categories: ['beaches'] },
        jaipur: { id: 'jaipur', categories: ['heritage', 'historical'] }
    };

    const schedule = [
        { day: 1, type: 'stay', destId: 'goa', city: 'Goa', state: 'Goa', activity: 'Arrive & explore Beaches' },
        { day: 2, type: 'stay', destId: 'goa', city: 'Goa', state: 'Goa', activity: 'Explore Old Goa' },
        { day: 3, type: 'travel', from: 'Goa', to: 'Jaipur', distanceKm: 1500, hours: 20, cost: 5000 },
        { day: 4, type: 'stay', destId: 'jaipur', city: 'Jaipur', state: 'Rajasthan', activity: 'Arrive & explore Amber Fort' }
    ];

    const forecastsByDestId = {
        goa: [
            forecastDay({ date: '2026-08-01', weatherCode: 65, precipProbability: 95 }),
            forecastDay({ date: '2026-08-02' })
        ],
        jaipur: [forecastDay({ date: '2026-08-04', tempMaxC: 45 })]
    };

    it('maps schedule day numbers to real calendar dates from the trip start date', () => {
        const result = Core.evaluateItineraryWeather(schedule, destinationsById, forecastsByDestId, '2026-08-01');
        expect(result[0].date).toBe('2026-08-01');
        expect(result[1].date).toBe('2026-08-02');
        expect(result[3].date).toBe('2026-08-04');
    });

    it('evaluates suitability only for "stay" items, passing through "travel" items unchanged otherwise', () => {
        const result = Core.evaluateItineraryWeather(schedule, destinationsById, forecastsByDestId, '2026-08-01');
        expect(result[0].suitability).toBeDefined();
        expect(result[2].suitability).toBeUndefined();
        expect(result[2].type).toBe('travel');
    });

    it('flags the rainy beach day as poor and the clear day as good', () => {
        const result = Core.evaluateItineraryWeather(schedule, destinationsById, forecastsByDestId, '2026-08-01');
        expect(result[0].suitability.status).toBe('poor');
        expect(result[1].suitability.status).toBe('good');
    });

    it('throws on an invalid trip start date', () => {
        expect(() => Core.evaluateItineraryWeather(schedule, destinationsById, forecastsByDestId, 'not-a-date')).toThrow();
    });
});

describe('weather-core: findAlternativeDestinations', () => {
    const origin = { id: 'goa', lat: 15.2993, lng: 74.1240, categories: ['beaches'] };
    const pool = [
        { id: 'goa', lat: 15.2993, lng: 74.1240, categories: ['beaches'] },
        { id: 'hampi', lat: 15.335, lng: 76.46, categories: ['historical', 'heritage'] }, // ~230km, good weather
        { id: 'gokarna', lat: 14.548, lng: 74.317, categories: ['beaches'] }, // close, poor weather
        { id: 'delhi', lat: 28.6139, lng: 77.209, categories: ['city'] } // far away
    ];
    const forecastsByDestId = {
        hampi: [forecastDay({ date: '2026-08-01', weatherCode: 1 })],
        gokarna: [forecastDay({ date: '2026-08-01', weatherCode: 65, precipProbability: 95 })],
        delhi: [forecastDay({ date: '2026-08-01', weatherCode: 0 })]
    };

    it('excludes the origin destination itself', () => {
        const result = Core.findAlternativeDestinations({
            origin, pool, forecastsByDestId, date: '2026-08-01', tier: 'mid',
            haversineDistanceKm: simpleHaversine
        });
        expect(result.some((r) => r.destination.id === 'goa')).toBe(false);
    });

    it('excludes candidates with poor weather that day', () => {
        const result = Core.findAlternativeDestinations({
            origin, pool, forecastsByDestId, date: '2026-08-01', tier: 'mid',
            haversineDistanceKm: simpleHaversine
        });
        expect(result.some((r) => r.destination.id === 'gokarna')).toBe(false);
    });

    it('excludes candidates outside maxDistanceKm', () => {
        const result = Core.findAlternativeDestinations({
            origin, pool, forecastsByDestId, date: '2026-08-01', tier: 'mid', maxDistanceKm: 300,
            haversineDistanceKm: simpleHaversine
        });
        expect(result.some((r) => r.destination.id === 'delhi')).toBe(false);
    });

    it('prioritizes category-matching candidates over non-matching ones', () => {
        const poolWithBeachAlt = pool.concat([{ id: 'gokarna2', lat: 15.0, lng: 74.2, categories: ['beaches'] }]);
        const forecasts2 = Object.assign({}, forecastsByDestId, { gokarna2: [forecastDay({ date: '2026-08-01', weatherCode: 1 })] });
        const result = Core.findAlternativeDestinations({
            origin, pool: poolWithBeachAlt, forecastsByDestId: forecasts2, date: '2026-08-01', tier: 'mid',
            preferredCategories: ['beaches'], haversineDistanceKm: simpleHaversine
        });
        expect(result[0].destination.id).toBe('gokarna2');
        expect(result[0].categoryMatch).toBe(true);
    });

    it('respects the limit option', () => {
        const result = Core.findAlternativeDestinations({
            origin, pool, forecastsByDestId, date: '2026-08-01', tier: 'mid', limit: 1,
            haversineDistanceKm: simpleHaversine
        });
        expect(result.length).toBeLessThanOrEqual(1);
    });
});

function simpleHaversine(lat1, lng1, lat2, lng2) {
    const toRad = (d) => (d * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

describe('weather-core: suggestReorder + applyReorder', () => {
    it('suggests no reorder when a city only has one day', () => {
        const evaluated = [
            { day: 1, type: 'stay', destId: 'a', city: 'A', activity: 'X', suitability: { status: 'poor' } }
        ];
        expect(Core.suggestReorder(evaluated)).toEqual([]);
    });

    it('suggests no reorder when days are already best-weather-first', () => {
        const evaluated = [
            { day: 1, type: 'stay', destId: 'a', city: 'A', activity: 'X', suitability: { status: 'good' } },
            { day: 2, type: 'stay', destId: 'a', city: 'A', activity: 'Y', suitability: { status: 'poor' } }
        ];
        expect(Core.suggestReorder(evaluated)).toEqual([]);
    });

    it('suggests a swap when a poor day precedes a good day for the same city', () => {
        const evaluated = [
            { day: 1, type: 'stay', destId: 'a', city: 'A', activity: 'Outdoor thing', suitability: { status: 'poor' } },
            { day: 2, type: 'stay', destId: 'a', city: 'A', activity: 'Indoor thing', suitability: { status: 'good' } }
        ];
        const suggestions = Core.suggestReorder(evaluated);
        expect(suggestions.length).toBe(1);
        expect(suggestions[0].destId).toBe('a');
        expect(suggestions[0].moves.length).toBeGreaterThan(0);
    });

    it('applyReorder swaps activity text between the affected days without touching other fields', () => {
        const evaluated = [
            { day: 1, type: 'stay', destId: 'a', city: 'A', activity: 'Outdoor thing', suitability: { status: 'poor' } },
            { day: 2, type: 'stay', destId: 'a', city: 'A', activity: 'Indoor thing', suitability: { status: 'good' } }
        ];
        const suggestion = Core.suggestReorder(evaluated)[0];
        const applied = Core.applyReorder(evaluated, suggestion);
        expect(applied.find((d) => d.day === 1).activity).toBe('Indoor thing');
        expect(applied.find((d) => d.day === 2).activity).toBe('Outdoor thing');
        expect(applied.find((d) => d.day === 1).destId).toBe('a'); // unrelated fields untouched
    });

    it('does not propose a reorder unless it actually improves a poor day', () => {
        // Both days are "caution" — reordering wouldn't fix a "poor" day, so no suggestion.
        const evaluated = [
            { day: 1, type: 'stay', destId: 'a', city: 'A', activity: 'X', suitability: { status: 'caution' } },
            { day: 2, type: 'stay', destId: 'a', city: 'A', activity: 'Y', suitability: { status: 'caution' } }
        ];
        expect(Core.suggestReorder(evaluated)).toEqual([]);
    });
});

describe('weather-core: buildWeatherSummary', () => {
    it('includes only "stay" days, in order', () => {
        const evaluated = [
            { day: 1, type: 'stay', date: '2026-08-01', city: 'A', suitability: { status: 'good', weather: null, reasons: [] } },
            { day: 2, type: 'travel', from: 'A', to: 'B' },
            { day: 3, type: 'stay', date: '2026-08-03', city: 'B', suitability: { status: 'poor', weather: null, reasons: ['heavy rain expected'] } }
        ];
        const summary = Core.buildWeatherSummary(evaluated);
        expect(summary.length).toBe(2);
        expect(summary[0].city).toBe('A');
        expect(summary[1].status).toBe('poor');
        expect(summary[1].reasons).toContain('heavy rain expected');
    });
});