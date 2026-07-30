import { describe, it, expect } from 'vitest';
import { CHIEF_MINISTERS_DATA, filterCMData, getPartyClass } from '../../frontend/state-chief-ministers-explorer/script.js';

describe('State Chief Ministers Explorer', () => {
    it('should have a comprehensive dataset of Chief Ministers across states and UTs', () => {
        expect(Array.isArray(CHIEF_MINISTERS_DATA)).toBe(true);
        expect(CHIEF_MINISTERS_DATA.length).toBeGreaterThanOrEqual(30);

        CHIEF_MINISTERS_DATA.forEach(item => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('state');
            expect(item).toHaveProperty('cmName');
            expect(item).toHaveProperty('party');
            expect(item).toHaveProperty('capital');
            expect(item).toHaveProperty('region');
            expect(item).toHaveProperty('facts');
            expect(Array.isArray(item.facts)).toBe(true);
            expect(item.facts.length).toBeGreaterThan(0);
        });
    });

    it('should filter CM data by search term', () => {
        const upResults = filterCMData(CHIEF_MINISTERS_DATA, 'Uttar Pradesh');
        expect(upResults.length).toBe(1);
        expect(upResults[0].cmName).toBe('Yogi Adityanath');

        const cmSearch = filterCMData(CHIEF_MINISTERS_DATA, 'Stalin');
        expect(cmSearch.length).toBe(1);
        expect(cmSearch[0].state).toBe('Tamil Nadu');
    });

    it('should filter CM data by region', () => {
        const southCMs = filterCMData(CHIEF_MINISTERS_DATA, '', 'South', 'all');
        expect(southCMs.length).toBeGreaterThan(0);
        southCMs.forEach(c => expect(c.region).toBe('South'));
    });

    it('should filter CM data by party category', () => {
        const bjpCMs = filterCMData(CHIEF_MINISTERS_DATA, '', 'all', 'BJP');
        expect(bjpCMs.length).toBeGreaterThan(0);
        bjpCMs.forEach(c => expect(c.partyCategory).toBe('BJP'));

        const incCMs = filterCMData(CHIEF_MINISTERS_DATA, '', 'all', 'INC');
        expect(incCMs.length).toBeGreaterThan(0);
        incCMs.forEach(c => expect(c.partyCategory).toBe('INC'));
    });

    it('should return correct CSS classes for party categories', () => {
        expect(getPartyClass('BJP')).toBe('party-bjp');
        expect(getPartyClass('INC')).toBe('party-inc');
        expect(getPartyClass('AAP')).toBe('party-aap');
        expect(getPartyClass('Regional')).toBe('party-regional');
    });
});
