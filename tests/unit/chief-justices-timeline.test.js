import { describe, it, expect } from 'vitest';
import { CHIEF_JUSTICES_DATA, filterCJIData } from '../../frontend/chief-justices-timeline/script.js';

describe('Chief Justices of India Timeline', () => {
    it('should contain a complete dataset of Chief Justices across decades', () => {
        expect(Array.isArray(CHIEF_JUSTICES_DATA)).toBe(true);
        expect(CHIEF_JUSTICES_DATA.length).toBeGreaterThanOrEqual(8);

        CHIEF_JUSTICES_DATA.forEach(cji => {
            expect(cji).toHaveProperty('id');
            expect(cji).toHaveProperty('number');
            expect(cji).toHaveProperty('name');
            expect(cji).toHaveProperty('tenure');
            expect(cji).toHaveProperty('appointmentDate');
            expect(cji).toHaveProperty('retirementDate');
            expect(cji).toHaveProperty('tenureLength');
            expect(cji).toHaveProperty('decade');
            expect(cji).toHaveProperty('domain');
            expect(cji).toHaveProperty('landmarkJudgments');
            expect(Array.isArray(cji.landmarkJudgments)).toBe(true);
            expect(cji.landmarkJudgments.length).toBeGreaterThan(0);
            expect(cji).toHaveProperty('reforms');
        });
    });

    it('should filter CJI data by search term', () => {
        const kaniaResults = filterCJIData(CHIEF_JUSTICES_DATA, 'Kania');
        expect(kaniaResults.length).toBe(1);
        expect(kaniaResults[0].number).toBe('1st CJI');

        const kesavanandaSearch = filterCJIData(CHIEF_JUSTICES_DATA, 'Kesavananda');
        expect(kesavanandaSearch.length).toBe(1);
        expect(kesavanandaSearch[0].name).toBe('S. M. Sikri');
    });

    it('should filter CJI data by decade', () => {
        const seventiesCJIs = filterCJIData(CHIEF_JUSTICES_DATA, '', '1970s', 'all');
        expect(seventiesCJIs.length).toBeGreaterThan(0);
        seventiesCJIs.forEach(c => expect(c.decade).toBe('1970s'));
    });

    it('should filter CJI data by focus domain', () => {
        const pilCJIs = filterCJIData(CHIEF_JUSTICES_DATA, '', 'all', 'Judicial Activism & PIL');
        expect(pilCJIs.length).toBeGreaterThan(0);
        pilCJIs.forEach(c => expect(c.domain).toBe('Judicial Activism & PIL'));
    });
});
