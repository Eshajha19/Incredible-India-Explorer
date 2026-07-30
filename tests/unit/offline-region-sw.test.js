import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('sw.js Offline Region Download Manager', () => {
  const swContent = fs.readFileSync(path.resolve(__dirname, '../../sw.js'), 'utf8');

  it('defines a dedicated, unversioned cache for downloaded regions', () => {
    expect(swContent).toContain("const CACHE_NAME_REGIONS = 'india-explorer-regions'");
  });

  it('exempts the region cache from the activate handler\'s version cleanup', () => {
    expect(swContent).toContain('isRegionCache');
    expect(swContent).toContain('name === CACHE_NAME_REGIONS');
  });

  it('handles DOWNLOAD_REGION, DELETE_REGION, GET_REGION_STATUS, and GET_ALL_REGION_STATUSES messages', () => {
    expect(swContent).toContain("case 'DOWNLOAD_REGION'");
    expect(swContent).toContain("case 'DELETE_REGION'");
    expect(swContent).toContain("case 'GET_REGION_STATUS'");
    expect(swContent).toContain("case 'GET_ALL_REGION_STATUSES'");
  });

  it('persists region manifests in a dedicated IndexedDB database', () => {
    expect(swContent).toContain("indexedDB.open('IndiaExplorerOfflineRegions'");
    expect(swContent).toContain("db.createObjectStore('regions'");
  });

  it('reports per-file download progress back to the requesting client', () => {
    expect(swContent).toContain('REGION_DOWNLOAD_PROGRESS');
    expect(swContent).toContain('REGION_DOWNLOAD_COMPLETE');
  });

  it('deletes both cached files and the manifest record when a region is removed', () => {
    expect(swContent).toContain('async function deleteRegion(regionId)');
    expect(swContent).toContain('cache.delete(url)');
    expect(swContent).toContain('deleteRegionRecord(regionId)');
  });
});
