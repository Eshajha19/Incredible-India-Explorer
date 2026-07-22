/**
 * trade-routes.test.js
 * Unit tests for Ancient Indian Trade Network Visualizer data structures,
 * search queries, route type filtering, region lookups, and boundary safety.
 */

import { describe, it, expect } from 'vitest';
import {
  routes,
  ports,
  goods,
  filterPorts,
  filterRoutes,
  findPortById,
  getUniquePortsByRegion,
  getUniqueGoodsByCategory
} from '../../trade-routes.js';

const REQUIRED_ROUTE_FIELDS = [
  'id',
  'name',
  'type',
  'color',
  'pathPoints',
  'description',
  'significance'
];

const REQUIRED_PORT_FIELDS = [
  'id',
  'name',
  'location',
  'region',
  'established',
  'majorTradeWith',
  'description',
  'archaeologyFinds',
  'image',
  'coords'
];

const REQUIRED_GOODS_FIELDS = [
  'id',
  'name',
  'type',
  'origin',
  'description',
  'icon'
];

describe('Trade Network Routes Data Integrity', () => {
  it('contains at least 5 routes in the dataset', () => {
    expect(routes.length).toBeGreaterThanOrEqual(5);
  });

  it('every route contains all required fields with non-empty values', () => {
    routes.forEach((route, index) => {
      REQUIRED_ROUTE_FIELDS.forEach(field => {
        expect(route, `Route at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'pathPoints') {
          expect(Array.isArray(route.pathPoints)).toBe(true);
          expect(route.pathPoints.length).toBeGreaterThanOrEqual(2);
          route.pathPoints.forEach(p => {
            expect(typeof p.x).toBe('number');
            expect(typeof p.y).toBe('number');
            expect(p.x).toBeGreaterThanOrEqual(0);
            expect(p.x).toBeLessThanOrEqual(900);
            expect(p.y).toBeGreaterThanOrEqual(0);
            expect(p.y).toBeLessThanOrEqual(600);
          });
        } else {
          expect(typeof route[field]).toBe('string');
          expect(route[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all route IDs are unique', () => {
    const ids = routes.map(r => r.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe('Trade Network Ports Data Integrity', () => {
  it('contains at least 7 ports in the dataset', () => {
    expect(ports.length).toBeGreaterThanOrEqual(7);
  });

  it('every port contains all required fields with non-empty values', () => {
    ports.forEach((port, index) => {
      REQUIRED_PORT_FIELDS.forEach(field => {
        expect(port, `Port at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'coords') {
          expect(typeof port.coords.x).toBe('number');
          expect(typeof port.coords.y).toBe('number');
          expect(port.coords.x).toBeGreaterThanOrEqual(0);
          expect(port.coords.x).toBeLessThanOrEqual(900);
          expect(port.coords.y).toBeGreaterThanOrEqual(0);
          expect(port.coords.y).toBeLessThanOrEqual(600);
        } else {
          expect(typeof port[field]).toBe('string');
          expect(port[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all port IDs and coordinates are unique', () => {
    const ids = ports.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);

    const coordSet = new Set(ports.map(p => `${p.coords.x},${p.coords.y}`));
    expect(coordSet.size).toBe(ports.length);
  });
});

describe('Trade Network Goods Data Integrity', () => {
  it('contains at least 8 trade goods in the dataset', () => {
    expect(goods.length).toBeGreaterThanOrEqual(8);
  });

  it('every trade good contains all required fields with valid values', () => {
    goods.forEach((good, index) => {
      REQUIRED_GOODS_FIELDS.forEach(field => {
        expect(good, `Trade good at index ${index} missing field ${field}`).toHaveProperty(field);
        expect(typeof good[field]).toBe('string');
        expect(good[field].trim().length).toBeGreaterThan(0);
      });
    });
  });
});

describe('Trade Network Filtering & Search', () => {
  it('returns all ports when search query and region are default', () => {
    const result = filterPorts(ports);
    expect(result.length).toBe(ports.length);
  });

  it('filters ports by search query (e.g. Rome or pepper)', () => {
    const result = filterPorts(ports, { search: 'Rome' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(port => {
      const match = [
        port.name,
        port.location,
        port.region,
        port.majorTradeWith,
        port.description,
        port.archaeologyFinds
      ].some(f => f && f.toLowerCase().includes('rome'));
      expect(match).toBe(true);
    });
  });

  it('filters ports by region (e.g. South)', () => {
    const result = filterPorts(ports, { region: 'South' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(port => {
      expect(port.region.toLowerCase()).toBe('south');
    });
  });

  it('filters routes by land/maritime type', () => {
    const maritime = filterRoutes(routes, 'maritime');
    expect(maritime.length).toBeGreaterThan(0);
    maritime.forEach(r => expect(r.type).toBe('maritime'));

    const land = filterRoutes(routes, 'land');
    expect(land.length).toBeGreaterThan(0);
    land.forEach(r => expect(r.type).toBe('land'));
  });

  it('returns empty array when search query matches no port', () => {
    const result = filterPorts(ports, { search: 'nonexistentport999' });
    expect(result.length).toBe(0);
  });

  it('handles invalid inputs gracefully', () => {
    expect(filterPorts(null)).toEqual([]);
    expect(filterPorts(undefined)).toEqual([]);
    expect(filterPorts([])).toEqual([]);

    expect(filterRoutes(null)).toEqual([]);
  });
});

describe('Trade Network Utilities & Lookups', () => {
  it('finds port by ID correctly', () => {
    const port = findPortById('muziris');
    expect(port).toBeDefined();
    expect(port.name).toContain('Muziris');
  });

  it('extracts unique regions from ports', () => {
    const regions = getUniquePortsByRegion(ports);
    expect(regions.length).toBeGreaterThan(0);
    expect(regions).toContain('South');
    expect(regions).toContain('West');
    expect(regions).toContain('East');
  });

  it('extracts unique categories from goods', () => {
    const categories = getUniqueGoodsByCategory(goods);
    expect(categories.length).toBeGreaterThan(0);
    expect(categories).toContain('export');
    expect(categories).toContain('import');
  });
});
