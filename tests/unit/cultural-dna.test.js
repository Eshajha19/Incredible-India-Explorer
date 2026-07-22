/**
 * cultural-dna.test.js
 * Unit tests for Indian Cultural DNA Explorer dataset, search matching,
 * category/region filtering, connection traversal, and journey generation.
 */

import { describe, it, expect } from 'vitest';
import {
  nodes,
  links,
  filterNodes,
  getConnectedNodes,
  findNodeById,
  getUniqueCategories,
  getUniqueRegions,
  buildJourneyFlow,
  presetJourneys
} from '../../cultural-dna.js';

const REQUIRED_NODE_FIELDS = [
  'id',
  'name',
  'category',
  'region',
  'description',
  'significance',
  'icon',
  'tags'
];

const REQUIRED_LINK_FIELDS = [
  'source',
  'target',
  'relationship',
  'strength',
  'description'
];

describe('Cultural DNA Nodes Integrity', () => {
  it('contains at least 30 cultural nodes in the dataset', () => {
    expect(nodes.length).toBeGreaterThanOrEqual(30);
  });

  it('every node contains all required fields with non-empty values', () => {
    nodes.forEach((node, index) => {
      REQUIRED_NODE_FIELDS.forEach(field => {
        expect(node, `Node at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'tags') {
          expect(Array.isArray(node.tags)).toBe(true);
          expect(node.tags.length).toBeGreaterThan(0);
        } else {
          expect(typeof node[field]).toBe('string');
          expect(node[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all node IDs are unique', () => {
    const ids = nodes.map(n => n.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all node names are unique', () => {
    const names = nodes.map(n => n.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it('covers all 7 core categories', () => {
    const categories = new Set(nodes.map(n => n.category));
    expect(categories.size).toBe(7);
    expect(categories.has('Languages')).toBe(true);
    expect(categories.has('Architecture')).toBe(true);
    expect(categories.has('Cuisine')).toBe(true);
    expect(categories.has('Music & Dance')).toBe(true);
    expect(categories.has('Clothing & Textiles')).toBe(true);
    expect(categories.has('Festivals')).toBe(true);
    expect(categories.has('Traditions & Philosophy')).toBe(true);
  });
});

describe('Cultural DNA Links & Network Integrity', () => {
  it('contains at least 30 influence links in the network', () => {
    expect(links.length).toBeGreaterThanOrEqual(30);
  });

  it('every link contains all required fields with valid types', () => {
    links.forEach((link, index) => {
      REQUIRED_LINK_FIELDS.forEach(field => {
        expect(link, `Link at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'strength') {
          expect(typeof link[field]).toBe('number');
          expect(link[field]).toBeGreaterThanOrEqual(1);
        } else {
          expect(typeof link[field]).toBe('string');
          expect(link[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('every link references existing node IDs for both source and target', () => {
    const nodeIds = new Set(nodes.map(n => n.id));
    links.forEach((link, index) => {
      expect(nodeIds.has(link.source), `Link at index ${index} source "${link.source}" does not exist`).toBe(true);
      expect(nodeIds.has(link.target), `Link at index ${index} target "${link.target}" does not exist`).toBe(true);
    });
  });
});

describe('Cultural DNA Search & Filtering', () => {
  it('returns all nodes when search query and filters are default', () => {
    const result = filterNodes(nodes);
    expect(result.length).toBe(nodes.length);
  });

  it('filters nodes by search query (e.g. Biryani)', () => {
    const result = filterNodes(nodes, { search: 'Biryani' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(node => {
      const match = [
        node.name,
        node.category,
        node.region,
        node.description,
        node.significance,
        ...(node.tags || [])
      ].some(f => f && f.toLowerCase().includes('biryani'));
      expect(match).toBe(true);
    });
  });

  it('filters nodes by category (e.g. Cuisine)', () => {
    const result = filterNodes(nodes, { category: 'cuisine' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(node => {
      expect(node.category.toLowerCase()).toBe('cuisine');
    });
  });

  it('filters nodes by region (e.g. South)', () => {
    const result = filterNodes(nodes, { region: 'South' });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(node => {
      expect(node.region.toLowerCase().includes('south')).toBe(true);
    });
  });

  it('combines search, category, and region filters correctly', () => {
    const result = filterNodes(nodes, {
      search: 'saree',
      category: 'Clothing & Textiles',
      region: 'all'
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach(node => {
      expect(node.category).toBe('Clothing & Textiles');
      expect(node.name.toLowerCase().includes('saree') || node.description.toLowerCase().includes('saree')).toBe(true);
    });
  });
});

describe('Cultural DNA Traversal & Journey Generation', () => {
  it('finds node by ID correctly', () => {
    const node = findNodeById('sanskrit');
    expect(node).toBeDefined();
    expect(node.name).toBe('Sanskrit');
  });

  it('returns connected nodes showing direct incoming/outgoing influences', () => {
    const connections = getConnectedNodes('sufi-qawwali', links, nodes);
    expect(connections.length).toBeGreaterThan(0);
    connections.forEach(conn => {
      expect(conn).toHaveProperty('node');
      expect(conn).toHaveProperty('type');
      expect(conn).toHaveProperty('relationship');
      expect(conn).toHaveProperty('strength');
      expect(conn).toHaveProperty('description');
    });
  });

  it('extracts unique categories sorted alphabetically', () => {
    const categories = getUniqueCategories(nodes);
    expect(categories.length).toBe(7);
    for (let i = 1; i < categories.length; i++) {
      expect(categories[i - 1].localeCompare(categories[i])).toBeLessThanOrEqual(0);
    }
  });

  it('extracts unique regions', () => {
    const regions = getUniqueRegions(nodes);
    expect(regions.length).toBeGreaterThan(0);
    expect(regions).toContain('North');
    expect(regions).toContain('South');
  });

  it('builds detailed step-by-step journey flow paths', () => {
    const path = ['sufism-bhakti', 'sufi-qawwali', 'spring-holi'];
    const flow = buildJourneyFlow(path, links, nodes);
    expect(flow.length).toBe(2);
    expect(flow[0].source.id).toBe('sufism-bhakti');
    expect(flow[0].target.id).toBe('sufi-qawwali');
    expect(flow[0].linked).toBe(true);
    expect(flow[1].source.id).toBe('sufi-qawwali');
    expect(flow[1].target.id).toBe('spring-holi');
  });

  it('verifies preset journeys configuration', () => {
    Object.keys(presetJourneys).forEach(key => {
      const preset = presetJourneys[key];
      expect(preset).toHaveProperty('name');
      expect(preset).toHaveProperty('description');
      expect(preset).toHaveProperty('steps');
      expect(preset.steps.length).toBeGreaterThanOrEqual(3);
    });
  });
});
