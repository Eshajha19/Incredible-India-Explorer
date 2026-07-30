import { describe, it, expect } from 'vitest';
import { FREEDOM_FIGHTERS_DATA, filterFreedomFighters } from '../../frontend/freedom-fighters-hub/script.js';

describe('Freedom Fighters Knowledge Hub', () => {
    it('should contain a complete dataset of prominent freedom fighters', () => {
        expect(Array.isArray(FREEDOM_FIGHTERS_DATA)).toBe(true);
        expect(FREEDOM_FIGHTERS_DATA.length).toBeGreaterThanOrEqual(8);

        FREEDOM_FIGHTERS_DATA.forEach(ff => {
            expect(ff).toHaveProperty('id');
            expect(ff).toHaveProperty('name');
            expect(ff).toHaveProperty('title');
            expect(ff).toHaveProperty('lifespan');
            expect(ff).toHaveProperty('era');
            expect(ff).toHaveProperty('region');
            expect(ff).toHaveProperty('birthplace');
            expect(ff).toHaveProperty('movements');
            expect(Array.isArray(ff.movements)).toBe(true);
            expect(ff).toHaveProperty('biography');
            expect(ff).toHaveProperty('timeline');
            expect(Array.isArray(ff.timeline)).toBe(true);
            expect(ff).toHaveProperty('contributions');
            expect(ff).toHaveProperty('rareFacts');
            expect(ff).toHaveProperty('quote');
        });
    });

    it('should filter freedom fighters by search term', () => {
        const netajiResults = filterFreedomFighters(FREEDOM_FIGHTERS_DATA, 'Subhas');
        expect(netajiResults.length).toBe(1);
        expect(netajiResults[0].title).toBe('Netaji');

        const movementResults = filterFreedomFighters(FREEDOM_FIGHTERS_DATA, 'Quit India');
        expect(movementResults.length).toBeGreaterThan(0);
    });

    it('should filter freedom fighters by era', () => {
        const revolutionaryList = filterFreedomFighters(FREEDOM_FIGHTERS_DATA, '', 'Revolutionary', 'all');
        expect(revolutionaryList.length).toBeGreaterThan(0);
        revolutionaryList.forEach(ff => expect(ff.era).toBe('Revolutionary'));
    });

    it('should filter freedom fighters by region', () => {
        const eastList = filterFreedomFighters(FREEDOM_FIGHTERS_DATA, '', 'all', 'East');
        expect(eastList.length).toBeGreaterThan(0);
        eastList.forEach(ff => expect(ff.region).toBe('East'));
    });
});
