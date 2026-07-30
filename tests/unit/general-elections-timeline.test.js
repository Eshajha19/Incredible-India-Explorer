import { describe, it, expect } from 'vitest';
import { GENERAL_ELECTIONS_DATA, filterElectionsData } from '../../frontend/general-elections-timeline/script.js';

describe('Interactive General Elections Timeline', () => {
    it('should cover all 18 Lok Sabha elections from 1951 to 2024', () => {
        expect(Array.isArray(GENERAL_ELECTIONS_DATA)).toBe(true);
        expect(GENERAL_ELECTIONS_DATA.length).toBe(18);

        GENERAL_ELECTIONS_DATA.forEach(el => {
            expect(el).toHaveProperty('id');
            expect(el).toHaveProperty('year');
            expect(el).toHaveProperty('yearDisplay');
            expect(el).toHaveProperty('lokSabha');
            expect(el).toHaveProperty('decade');
            expect(el).toHaveProperty('winningParty');
            expect(el).toHaveProperty('pm');
            expect(el).toHaveProperty('turnout');
            expect(typeof el.turnout).toBe('number');
            expect(el).toHaveProperty('totalSeats');
            expect(el).toHaveProperty('seatsWon');
            expect(el).toHaveProperty('majorIssues');
            expect(el).toHaveProperty('coalitionDetails');
            expect(el).toHaveProperty('keyHighlights');
        });
    });

    it('should filter elections by search term', () => {
        const nehruElections = filterElectionsData(GENERAL_ELECTIONS_DATA, 'Nehru');
        expect(nehruElections.length).toBeGreaterThanOrEqual(3);

        const emergencyElection = filterElectionsData(GENERAL_ELECTIONS_DATA, 'Emergency');
        expect(emergencyElection.length).toBeGreaterThan(0);
        expect(emergencyElection[0].year).toBe(1977);
    });

    it('should filter elections by decade', () => {
        const ninetiesElections = filterElectionsData(GENERAL_ELECTIONS_DATA, '', '1990s', 'all');
        expect(ninetiesElections.length).toBe(4); // 1991, 1996, 1998, 1999
        ninetiesElections.forEach(e => expect(e.decade).toBe('1990s'));
    });

    it('should filter elections by winning party category', () => {
        const bjpElections = filterElectionsData(GENERAL_ELECTIONS_DATA, '', 'all', 'BJP / NDA');
        expect(bjpElections.length).toBeGreaterThan(0);
        bjpElections.forEach(e => expect(e.partyCategory).toBe('BJP / NDA'));
    });
});
