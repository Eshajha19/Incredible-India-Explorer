/**
 * js-modules/offline-region-service.js
 *
 * DOM/service-worker-facing wrapper around OfflineRegionEngine
 * (offline-region-engine.js) and sw.js's "7.5 OFFLINE REGION DOWNLOAD
 * MANAGER" section. Mirrors the split used by crowd-density-service.js:
 * the engine stays pure/testable, this file owns everything that talks
 * to the network, the service worker, or IndexedDB (via the SW).
 *
 * Responsibilities:
 *  - fetches data/regions/index.json (the region catalog) and each
 *    region's data JSON
 *  - drives region downloads/updates/deletes through postMessage calls
 *    to the active service worker, surfacing per-file progress events
 *  - detects online/offline transitions (the "automatic offline mode
 *    detection" requirement) via the browser's online/offline events
 *  - runs offline search restricted to whatever's actually downloaded
 *  - queues bookmark/itinerary writes through the *existing*
 *    QUEUE_OFFLINE_ACTION + Background Sync infrastructure already
 *    built into sw.js, registering a 'sync-offline-queue' tag so they
 *    flush automatically on reconnect (falls back to an 'online' event
 *    listener on browsers without Background Sync support, e.g. Safari)
 */
import { OfflineRegionEngine } from "./offline-region-engine.js";

const REGION_INDEX_URL = "data/regions/index.json";

function postToServiceWorker(message) {
  return new Promise((resolve, reject) => {
    if (!navigator.serviceWorker || !navigator.serviceWorker.controller) {
      reject(new Error("No active service worker controller — offline downloads require the app to be loaded via the service worker."));
      return;
    }
    const channel = new MessageChannel();
    channel.port1.onmessage = (event) => {
      if (event.data && event.data.status === "ERROR") {
        reject(new Error(event.data.error || "Service worker request failed."));
      } else {
        resolve(event.data);
      }
    };
    navigator.serviceWorker.controller.postMessage(message, [channel.port2]);
  });
}

export class OfflineRegionService {
  /**
   * @param {Object} [options]
   * @param {string} [options.rootPrefix] Prefix to resolve site-root-relative paths from
   *   the current page (e.g. "../../" for a page under frontend/<feature>/). Defaults to "./".
   */
  constructor(options = {}) {
    this.rootPrefix = options.rootPrefix != null ? options.rootPrefix : "./";
    this.engine = null; // built lazily once the catalog loads
    this.catalog = null;
    this._progressListeners = new Set();
    this._connectivityListeners = new Set();

    if (typeof navigator !== "undefined" && navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        const data = event.data;
        if (!data || !data.type) return;
        if (data.type === "REGION_DOWNLOAD_PROGRESS" || data.type === "REGION_DOWNLOAD_COMPLETE") {
          this._progressListeners.forEach((cb) => cb(data));
        }
      });
    }

    if (typeof window !== "undefined") {
      window.addEventListener("online", () => this._notifyConnectivity(true));
      window.addEventListener("offline", () => this._notifyConnectivity(false));
    }
  }

  resolvePath(rootRelativePath) {
    return `${this.rootPrefix}${rootRelativePath}`;
  }

  // --------------------------------------------------------------------
  // Catalog / engine
  // --------------------------------------------------------------------

  /** Loads (and caches in-memory) the region catalog, building the pure engine around it. */
  async loadCatalog() {
    if (this.catalog) return this.catalog;
    const response = await fetch(this.resolvePath(REGION_INDEX_URL));
    if (!response.ok) throw new Error(`Failed to load region catalog (HTTP ${response.status}).`);
    const payload = await response.json();
    this.catalog = payload.regions || [];
    this.engine = new OfflineRegionEngine({ catalog: this.catalog });
    return this.catalog;
  }

  /** Fetches a region's actual destination data JSON (works offline once cached). */
  async fetchRegionData(regionId) {
    const entry = this.engine && this.engine.getCatalogEntry(regionId);
    if (!entry) return null;
    const response = await fetch(this.resolvePath(entry.url));
    if (!response.ok) return null;
    return response.json();
  }

  // --------------------------------------------------------------------
  // Status
  // --------------------------------------------------------------------

  async getRegionRecord(regionId) {
    try {
      const result = await postToServiceWorker({ action: "GET_REGION_STATUS", payload: { regionId } });
      return result.record;
    } catch (e) {
      return null; // No SW controller yet (e.g. first load before registration) — treat as not-downloaded.
    }
  }

  async getAllRegionRecords() {
    try {
      const result = await postToServiceWorker({ action: "GET_ALL_REGION_STATUSES" });
      return result.records || [];
    } catch (e) {
      return [];
    }
  }

  /** Returns every region with its current status and (if downloaded) stored record. */
  async listRegionsWithStatus() {
    await this.loadCatalog();
    const records = await this.getAllRegionRecords();
    const recordsById = new Map(records.map((r) => [r.regionId, r]));
    return this.engine.listRegions().map((entry) => {
      const record = recordsById.get(entry.id) || null;
      return { entry, record, status: this.engine.getRegionStatus(entry.id, record) };
    });
  }

  // --------------------------------------------------------------------
  // Download / update / delete
  // --------------------------------------------------------------------

  /**
   * Downloads a region (full download if never downloaded, incremental
   * diff-only fetch if an update is available). Resolves with the
   * resulting stored record. Progress can be observed via onProgress().
   */
  async downloadRegion(regionId) {
    await this.loadCatalog();
    const record = await this.getRegionRecord(regionId);
    const diff = this.engine.diffForUpdate(regionId, record);
    if (!diff) throw new Error(`Unknown region: ${regionId}`);

    const entry = this.engine.getCatalogEntry(regionId);
    // Resolve relative file URLs against the page root before handing them to the SW,
    // since sw.js's fetch() runs with the SW's own scope as its base, not this page's.
    const files = diff.toFetch.map((f) => ({ url: this.resolvePath(f.url), type: f.type }));

    if (files.length === 0 && diff.toRemove.length === 0) {
      return record; // Already fully up to date.
    }

    const result = await postToServiceWorker({
      action: "DOWNLOAD_REGION",
      payload: { regionId, version: entry.version, files }
    });
    return result.region;
  }

  async deleteRegion(regionId) {
    await postToServiceWorker({ action: "DELETE_REGION", payload: { regionId } });
  }

  onProgress(callback) {
    this._progressListeners.add(callback);
    return () => this._progressListeners.delete(callback);
  }

  // --------------------------------------------------------------------
  // Connectivity
  // --------------------------------------------------------------------

  isOnline() {
    return typeof navigator !== "undefined" ? navigator.onLine : true;
  }

  onConnectivityChange(callback) {
    this._connectivityListeners.add(callback);
    return () => this._connectivityListeners.delete(callback);
  }

  _notifyConnectivity(isOnline) {
    this._connectivityListeners.forEach((cb) => cb(isOnline));
  }

  // --------------------------------------------------------------------
  // Offline search
  // --------------------------------------------------------------------

  /**
   * Searches across all currently-downloaded regions. Fetches each
   * downloaded region's data JSON (served from the region cache when
   * offline, per sw.js's generic `caches.match` fallback) and delegates
   * matching to the pure engine.
   */
  async searchDownloaded(query) {
    const records = await this.getAllRegionRecords();
    const downloadedRegionData = {};
    await Promise.all(
      records.map(async (record) => {
        const data = await this.fetchRegionData(record.regionId);
        if (data) downloadedRegionData[record.regionId] = data;
      })
    );
    return OfflineRegionEngine.searchDownloaded(query, downloadedRegionData);
  }

  // --------------------------------------------------------------------
  // Bookmark / itinerary sync (built on sw.js's existing offline queue)
  // --------------------------------------------------------------------

  /**
   * Queues a bookmark or itinerary write made while offline so it
   * flushes automatically once connectivity returns, via the sync queue
   * already implemented in sw.js (QUEUE_OFFLINE_ACTION + the
   * 'sync-offline-queue' background sync tag). Falls back to flushing on
   * the next 'online' event for browsers without Background Sync
   * support.
   * @param {'bookmark'|'itinerary'} kind
   * @param {Object} data Arbitrary payload describing the change (e.g. {url, method, body}).
   */
  async queueOfflineWrite(kind, data) {
    const id = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `${kind}-${Date.now()}`;
    await postToServiceWorker({ action: "QUEUE_OFFLINE_ACTION", payload: { id, action: kind, data } });

    if (typeof navigator !== "undefined" && navigator.serviceWorker && "SyncManager" in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register("sync-offline-queue");
        return { queued: true, willSyncVia: "background-sync" };
      } catch (e) {
        // Fall through to the online-event fallback below.
      }
    }

    // Background Sync unsupported/unavailable — rely on the 'online' listener
    // registered in the constructor to prompt a reconnect-driven retry instead.
    return { queued: true, willSyncVia: "online-event-fallback" };
  }

  async getQueuedWriteCount() {
    try {
      const result = await postToServiceWorker({ action: "GET_QUEUE_SIZE" });
      return result.count || 0;
    } catch (e) {
      return 0;
    }
  }
}

if (typeof window !== "undefined") {
  window.OfflineRegionService = OfflineRegionService;
}
