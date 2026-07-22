import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Glossary search and stats helpers', () => {
  let mockTerms;

  beforeEach(() => {
    mockTerms = [
      { id: 'dynasty', term: 'Dynasty', category: 'History', tags: ['empire'] },
      { id: 'ikat', term: 'Ikat', category: 'Culture', tags: ['weaving'] },
    ];
  });

  it('correctly counts glossary terms and categories', () => {
    const totalTerms = mockTerms.length;
    const uniqueCategories = [...new Set(mockTerms.map(t => t.category))].length;

    expect(totalTerms).toBe(2);
    expect(uniqueCategories).toBe(2);
  });
});
