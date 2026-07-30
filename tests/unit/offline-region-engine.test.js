import { describe, it, expect } from 'vitest';
import { OfflineRegionEngine } from '../../js-modules/offline-region-engine.js';

const catalog = [
  { id: 'rajasthan', state: 'Rajasthan', version: '2026.1', destinationCount: 5, heroImage: 'assets/Hawa_Mahal.png', url: 'data/regions/rajasthan.json' },
  { id: 'goa', state: 'Goa', version: '2026.1', destinationCount: 1, heroImage: 'assets/Basilica_of_Bom_Jesus.png', url: 'data/regions/goa.json' }
];

function buildEngine() {
  return new OfflineRegionEngine({ catalog });
}

describe('OfflineRegionEngine.listRegions / getCatalogEntry', () => {
  it('lists regions sorted alphabetically by state', () => {
    const engine = buildEngine();
    const regions = engine.listRegions();
    expect(regions.map((r) => r.state)).toEqual(['Goa', 'Rajasthan']);
  });

  it('returns null for an unknown region', () => {
    expect(buildEngine().getCatalogEntry('atlantis')).toBeNull();
  });
});

describe('OfflineRegionEngine.buildDownloadManifest', () => {
  it('includes the data file and hero image for a known region', () => {
    const engine = buildEngine();
    const manifest = engine.buildDownloadManifest('rajasthan');
    expect(manifest).toEqual([
      { url: 'data/regions/rajasthan.json', type: 'data' },
      { url: 'assets/Hawa_Mahal.png', type: 'image' }
    ]);
  });

  it('returns null for an unknown region', () => {
    expect(buildEngine().buildDownloadManifest('atlantis')).toBeNull();
  });
});

describe('OfflineRegionEngine.getRegionStatus', () => {
  it('is "unavailable" for a region not in the catalog', () => {
    expect(buildEngine().getRegionStatus('atlantis', null)).toBe('unavailable');
  });

  it('is "not-downloaded" when there is no stored record', () => {
    expect(buildEngine().getRegionStatus('rajasthan', null)).toBe('not-downloaded');
  });

  it('is "downloaded" when the stored version matches the catalog version', () => {
    const stored = { regionId: 'rajasthan', version: '2026.1', files: [], downloadedAt: Date.now() };
    expect(buildEngine().getRegionStatus('rajasthan', stored)).toBe('downloaded');
  });

  it('is "update-available" when the stored version is stale', () => {
    const stored = { regionId: 'rajasthan', version: '2025.9', files: [], downloadedAt: Date.now() };
    expect(buildEngine().getRegionStatus('rajasthan', stored)).toBe('update-available');
  });
});

describe('OfflineRegionEngine.diffForUpdate', () => {
  it('proposes fetching everything when nothing is stored yet', () => {
    const engine = buildEngine();
    const diff = engine.diffForUpdate('rajasthan', null);
    expect(diff.toFetch).toHaveLength(2);
    expect(diff.toRemove).toEqual([]);
  });

  it('only re-fetches files that changed, keeping unchanged files in place', () => {
    const engine = buildEngine();
    const stored = {
      regionId: 'rajasthan',
      version: '2025.9',
      files: ['data/regions/rajasthan.json', 'assets/Hawa_Mahal.png'],
      downloadedAt: Date.now()
    };
    const diff = engine.diffForUpdate('rajasthan', stored);
    // Same manifest URLs as before -> nothing new to fetch, nothing to remove.
    expect(diff.toFetch).toEqual([]);
    expect(diff.toRemove).toEqual([]);
  });

  it('flags stale files for removal when a manifest entry disappears', () => {
    const engine = new OfflineRegionEngine({
      catalog: [{ id: 'goa', state: 'Goa', version: '2026.2', destinationCount: 1, heroImage: null, url: 'data/regions/goa.json' }]
    });
    const stored = {
      regionId: 'goa',
      version: '2026.1',
      files: ['data/regions/goa.json', 'assets/old-hero.png'],
      downloadedAt: Date.now()
    };
    const diff = engine.diffForUpdate('goa', stored);
    expect(diff.toRemove).toEqual(['assets/old-hero.png']);
    expect(diff.toFetch).toEqual([]);
  });

  it('returns null for an unknown region', () => {
    expect(buildEngine().diffForUpdate('atlantis', null)).toBeNull();
  });
});

describe('OfflineRegionEngine.formatBytes', () => {
  it('formats zero/negative as "0 KB"', () => {
    expect(OfflineRegionEngine.formatBytes(0)).toBe('0 KB');
    expect(OfflineRegionEngine.formatBytes(-5)).toBe('0 KB');
  });

  it('formats bytes, KB, and MB appropriately', () => {
    expect(OfflineRegionEngine.formatBytes(500)).toBe('500 B');
    expect(OfflineRegionEngine.formatBytes(2048)).toBe('2.0 KB');
    expect(OfflineRegionEngine.formatBytes(20480)).toBe('20 KB');
    expect(OfflineRegionEngine.formatBytes(1_500_000)).toBe('1.4 MB');
  });
});

describe('OfflineRegionEngine.totalStorageUsed', () => {
  it('sums sizeBytes across records, defaulting missing values to 0', () => {
    const total = OfflineRegionEngine.totalStorageUsed([{ sizeBytes: 1000 }, {}, { sizeBytes: 2000 }]);
    expect(total).toBe(3000);
  });
});

describe('OfflineRegionEngine.searchDownloaded', () => {
  const downloadedRegionData = {
    rajasthan: {
      destinations: [
        { id: 'jaipur', name: 'Jaipur', description: 'The Pink City, gateway to royal Rajasthan.', highlights: ['Amber Fort', 'City Palace', 'Hawa Mahal'] },
        { id: 'jodhpur', name: 'Jodhpur', description: 'The Blue City beneath a dramatic hilltop fort.', highlights: ['Mehrangarh Fort'] }
      ]
    }
  };

  it('returns an empty array for a blank query', () => {
    expect(OfflineRegionEngine.searchDownloaded('  ', downloadedRegionData)).toEqual([]);
  });

  it('matches on destination name case-insensitively', () => {
    const results = OfflineRegionEngine.searchDownloaded('jaipur', downloadedRegionData);
    expect(results).toHaveLength(1);
    expect(results[0].destination.id).toBe('jaipur');
  });

  it('matches on highlights and description text', () => {
    const results = OfflineRegionEngine.searchDownloaded('Amber Fort', downloadedRegionData);
    expect(results).toHaveLength(1);
    expect(results[0].destination.id).toBe('jaipur');
  });

  it('only searches regions present in downloadedRegionData (not the full catalog)', () => {
    const results = OfflineRegionEngine.searchDownloaded('Basilica', downloadedRegionData);
    expect(results).toEqual([]);
  });
});
