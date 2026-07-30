/**
 * js-modules/offline-region-engine.js
 *
 * Pure, DOM-free logic for the Offline Region Download feature. Consumes
 * the region index (data/regions/index.json, shaped like
 * { version, regions: [{id, state, version, destinationCount, heroImage, url}] })
 * plus locally-stored download records, and:
 *  - builds the concrete download manifest (files to fetch+cache) for a region
 *  - diffs a stored manifest against the current catalog to support
 *    incremental updates (only re-download what changed) instead of a
 *    full re-download
 *  - classifies each region's status (not-downloaded / downloaded /
 *    update-available) from stored version vs. catalog version
 *  - formats byte counts for storage-usage UI
 *  - runs offline search restricted to the regions actually downloaded
 *
 * Kept network/Cache-API/IndexedDB-free so it's directly unit testable
 * (see tests/unit/offline-region-engine.test.js). The service layer
 * (js-modules/offline-region-service.js) is responsible for the actual
 * fetch/cache/IndexedDB work and for driving the service worker.
 */

/**
 * @typedef {Object} RegionCatalogEntry
 * @property {string} id
 * @property {string} state
 * @property {string} version
 * @property {number} destinationCount
 * @property {string} heroImage
 * @property {string} url  Path (relative to site root) to the region's data JSON.
 */

/**
 * @typedef {Object} StoredRegionRecord
 * @property {string} regionId
 * @property {string} version    Version that was actually downloaded.
 * @property {string[]} files    Site-root-relative paths cached for this region.
 * @property {number} downloadedAt  Epoch ms.
 * @property {number} [sizeBytes]   Approximate total size, if known.
 */

export class OfflineRegionEngine {
  /**
   * @param {Object} [options]
   * @param {RegionCatalogEntry[]} [options.catalog] The current region catalog (data/regions/index.json's `regions`).
   */
  constructor(options = {}) {
    this.catalog = options.catalog || [];
    this.catalogById = new Map(this.catalog.map((r) => [r.id, r]));
  }

  getCatalogEntry(regionId) {
    return this.catalogById.get(regionId) || null;
  }

  /** All catalog regions, alphabetical by state name. */
  listRegions() {
    return [...this.catalog].sort((a, b) => a.state.localeCompare(b.state));
  }

  // --------------------------------------------------------------------
  // Download manifests
  // --------------------------------------------------------------------

  /**
   * Builds the concrete list of files a region download needs: the
   * region's data JSON plus its hero image. (Per-destination detail
   * content lives inside the data JSON itself — see
   * docs/OFFLINE_REGION_DOWNLOAD.md — so no per-destination page fetches
   * are required.)
   * @param {string} regionId
   * @returns {Array<{url:string,type:'data'|'image'}>|null}
   */
  buildDownloadManifest(regionId) {
    const entry = this.getCatalogEntry(regionId);
    if (!entry) return null;
    const files = [{ url: entry.url, type: "data" }];
    if (entry.heroImage) files.push({ url: entry.heroImage, type: "image" });
    return files;
  }

  // --------------------------------------------------------------------
  // Status & incremental updates
  // --------------------------------------------------------------------

  /**
   * Classifies a region's local status by comparing a stored record (or
   * null, if never downloaded) against the current catalog entry.
   * @param {string} regionId
   * @param {StoredRegionRecord|null} storedRecord
   * @returns {'unavailable'|'not-downloaded'|'downloaded'|'update-available'}
   */
  getRegionStatus(regionId, storedRecord) {
    const entry = this.getCatalogEntry(regionId);
    if (!entry) return "unavailable";
    if (!storedRecord) return "not-downloaded";
    return storedRecord.version === entry.version ? "downloaded" : "update-available";
  }

  /**
   * Computes what an update needs to fetch/remove, comparing the files a
   * fresh download would need against what's already stored. Because
   * this project's region packages are small (one JSON + one hero image
   * per state), a version bump currently just means "re-fetch the JSON
   * and re-fetch the hero image if it changed" — but the diff is
   * computed generically so adding more files per region later doesn't
   * require changing this method.
   * @param {string} regionId
   * @param {StoredRegionRecord|null} storedRecord
   * @returns {{toFetch:Array<{url:string,type:string}>, toRemove:string[]}|null}
   */
  diffForUpdate(regionId, storedRecord) {
    const freshManifest = this.buildDownloadManifest(regionId);
    if (!freshManifest) return null;

    const freshUrls = new Set(freshManifest.map((f) => f.url));
    const storedUrls = new Set((storedRecord && storedRecord.files) || []);

    const toFetch = freshManifest.filter((f) => !storedUrls.has(f.url));
    const toRemove = [...storedUrls].filter((url) => !freshUrls.has(url));

    return { toFetch, toRemove };
  }

  // --------------------------------------------------------------------
  // Storage usage formatting
  // --------------------------------------------------------------------

  /** Formats a byte count as a human-readable string (e.g. "482 KB", "1.3 MB"). */
  static formatBytes(bytes) {
    if (!bytes || bytes <= 0) return "0 KB";
    const units = ["B", "KB", "MB", "GB"];
    let value = bytes;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }
    const precision = unitIndex === 0 ? 0 : value < 10 ? 1 : 0;
    return `${value.toFixed(precision)} ${units[unitIndex]}`;
  }

  /** Sums sizeBytes across a set of stored records, for a total-storage-used summary. */
  static totalStorageUsed(storedRecords) {
    return (storedRecords || []).reduce((sum, r) => sum + (r.sizeBytes || 0), 0);
  }

  // --------------------------------------------------------------------
  // Offline search (restricted to downloaded regions)
  // --------------------------------------------------------------------

  /**
   * Searches destination name/highlights/description across only the
   * regions the caller says are downloaded (so results are guaranteed
   * available offline). `downloadedRegionData` maps regionId -> the
   * region's cached JSON payload (as produced by data/regions/<id>.json).
   * @param {string} query
   * @param {Object<string, {destinations: Array}>} downloadedRegionData
   * @returns {Array<{regionId:string, destination:Object}>}
   */
  static searchDownloaded(query, downloadedRegionData) {
    const normalized = (query || "").trim().toLowerCase();
    if (!normalized) return [];

    const results = [];
    for (const [regionId, regionData] of Object.entries(downloadedRegionData || {})) {
      for (const destination of regionData.destinations || []) {
        const haystack = [
          destination.name,
          destination.description,
          ...(destination.highlights || [])
        ]
          .join(" ")
          .toLowerCase();
        if (haystack.includes(normalized)) {
          results.push({ regionId, destination });
        }
      }
    }
    return results;
  }
}
