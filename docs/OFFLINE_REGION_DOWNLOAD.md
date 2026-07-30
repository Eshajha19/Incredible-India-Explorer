# Offline Region Download for Destination Exploration

Resolves #862 — Implement Offline Region Download for Destination
Exploration.

## What it does

Adds an Offline Downloads page (`frontend/offline-regions/index.html`)
where users can:

- **Download a complete destination package per state** — every
  destination's details, highlights, best season, and a representative
  hero image.
- **See download progress** live (per-file progress bar) and **storage
  used**, both per-region and as a running total.
- **Get incremental updates** — re-downloading a region only fetches the
  files that actually changed, not the whole package again.
- **Delete downloaded regions** to reclaim storage.
- **Search offline** — the search box only ever searches the regions
  actually downloaded, so results are guaranteed to load with no
  connection.
- See an **automatic online/offline indicator** that reflects the
  browser's real connectivity state.

Bookmark/itinerary sync-after-reconnect is implemented at the
infrastructure level (`OfflineRegionService.queueOfflineWrite`) on top of
sw.js's pre-existing offline action queue — see "Bookmark/itinerary sync"
below for how another feature (e.g. Trip Planner) wires into it.

## Why this builds on existing infrastructure instead of a new one

This repo already ships a fairly complete PWA offline layer in `sw.js`:
multi-strategy caching (network-first for pages, cache-first for images,
stale-while-revalidate for static assets and navigations), an
`offline.html` fallback, a `PREFETCH_URLS` message action, and a full
IndexedDB-backed **offline action sync queue** with a `sync-offline-queue`
Background Sync tag already wired to process it on reconnect. Rather than
build a parallel offline system, this feature adds only what was
missing: a way to explicitly download/track/delete a *named package* of
content (as opposed to whatever pages happen to get visited), because
`caches.match()` alone can't tell you "what did the user intentionally
download for Rajasthan" or let them delete just that.

## Architecture

```
data/regions/index.json          Region catalog: one entry per state,
data/regions/<state>.json          {id, state, version, destinationCount,
                                     heroImage, url}. Per-region JSON
                                     holds the full destination records
                                     (generated from trip-data.js).
        │
        ▼
js-modules/offline-region-engine.js   Pure logic: builds download
                                        manifests, diffs stored vs.
                                        catalog versions for incremental
                                        updates, classifies region status,
                                        formats storage sizes, and runs
                                        offline search restricted to
                                        downloaded regions. No network,
                                        no Cache API, no IndexedDB —
                                        directly unit tested (see
                                        tests/unit/offline-region-engine.test.js).
        │
        ▼
js-modules/offline-region-service.js  DOM/service-worker-facing wrapper:
                                        loads the catalog, talks to sw.js
                                        via postMessage, exposes progress/
                                        connectivity events, and queues
                                        offline bookmark/itinerary writes
                                        onto the existing sync queue.
        │
        ▼
sw.js "7.5 OFFLINE REGION DOWNLOAD       New message actions:
MANAGER" section                          DOWNLOAD_REGION, DELETE_REGION,
                                           GET_REGION_STATUS,
                                           GET_ALL_REGION_STATUSES.
                                           Caches files into a dedicated,
                                           UNVERSIONED cache
                                           ('india-explorer-regions') so
                                           downloads survive app updates,
                                           and keeps a per-region
                                           manifest in a new IndexedDB
                                           database
                                           (IndiaExplorerOfflineRegions).
        │
        ▼
frontend/offline-regions/script.js    UI layer — region cards, progress
                                        bars, storage summary, search box.
```

This mirrors the pure-engine/DOM-service split already used for Crowd
Density Prediction (`crowd-density-engine.js` vs.
`crowd-density-service.js`) and Route Planner
(`sustainability-engine.js` vs. `route-planner-ui.js`).

## Why a dedicated cache instead of the existing runtime caches

`sw.js`'s regular runtime caches (`CACHE_NAME_PAGES`, `CACHE_NAME_IMAGES`)
are versioned by `CACHE_VERSION` and get wiped on every service worker
update, and are also subject to `CACHE_LIMITS`/`CACHE_MAX_AGE_MS`
pruning — appropriate for opportunistic "whatever the user happened to
browse" caching, but wrong for content the user explicitly asked to keep
offline. `CACHE_NAME_REGIONS` (`'india-explorer-regions'`, deliberately
**not** suffixed with `CACHE_VERSION`) is:
- exempted from the `activate` handler's stale-cache cleanup, so
  downloads survive app updates
- exempted from `CACHE_LIMITS`/`CACHE_MAX_AGE_MS`, so downloads aren't
  silently evicted
- only ever cleared by an explicit `DELETE_REGION` message

Because `sw.js`'s existing fetch strategies fall back to a scope-wide
`caches.match(request)` (not a specific cache name) when the network
fails, anything cached here is automatically served offline by the
*existing* fetch handler — no changes to the request router were needed.

## Content versioning & incremental updates

Each region catalog entry carries a `version` string (currently
`"2026.1"` for all regions, bumped project-wide when the underlying
`trip-data.js` content changes — see the generation note below). When a
user downloads a region, the resulting IndexedDB record stores the
version that was actually fetched. `getRegionStatus()` compares that
against the catalog's current version to classify the region as
`not-downloaded` / `downloaded` / `update-available`.

`diffForUpdate()` compares the *files* a fresh download would need
against what's already stored, returning `{toFetch, toRemove}` — so an
update only re-fetches files that are new or changed, and cleans up
files a new manifest no longer references, rather than deleting and
re-downloading the whole package. Today each region's manifest is small
(one data JSON + one hero image), but the diffing is generic, so
regions with more files later don't need this logic to change.

### Regenerating region packages

`data/regions/*.json` are generated from `trip-data.js`, grouped by
state, with a hero image mapped from `assets/`. If `trip-data.js`
changes, regenerate the packages and bump `version` in the generation
script so `offline-region-engine.js` correctly flags existing downloads
as `update-available`.

## Bookmark/itinerary sync after reconnecting

Rather than duplicate sync machinery, `OfflineRegionService.queueOfflineWrite(kind, data)`
wraps `sw.js`'s existing `QUEUE_OFFLINE_ACTION` message and IndexedDB
sync queue (`IndiaExplorerSyncQueue`), then registers the
`'sync-offline-queue'` Background Sync tag (already handled by `sw.js`'s
`sync` event listener, which calls `processSyncQueue()` and notifies open
tabs via a `BACKGROUND_SYNC_COMPLETE` message). On browsers without
Background Sync support (e.g. Safari), it falls back to the service's
`online` event listener as the reconnect trigger. Any feature that saves
bookmarks or itineraries (e.g. Trip Planner) can call this method when a
write happens while offline instead of building its own retry queue.

## Automatic offline mode detection

`OfflineRegionService` listens for the browser's native `online`/`offline`
events and exposes `isOnline()`/`onConnectivityChange()`; the page uses
this to show a live connectivity badge and to explain why some content
may be unavailable. `sw-register.js`'s pre-existing offline banner
(`#offline-status-banner`) is also included on the page for
service-worker-level connectivity messaging.

## Testing

- `tests/unit/offline-region-engine.test.js` — manifest building, status
  classification, incremental diffing, byte formatting, and offline
  search, all against small inline fixtures.
- `tests/unit/offline-region-sw.test.js` — content-level assertions on
  `sw.js` (matching the existing `tests/unit/offline-cache.test.js`
  convention, since `sw.js` only truly runs in a service worker context)
  confirming the dedicated cache, message actions, IndexedDB store, and
  progress/completion messages are present.

Run with:

```
npm run test:unit
```

## Limitations & future work

- Region packages currently cover the 23 states represented in
  `trip-data.js`; a state not in that dataset simply won't appear in the
  catalog.
- "Maps (where supported)" from the original request isn't implemented —
  there's no offline map tile provider wired into this project yet. The
  manifest format (`buildDownloadManifest`) is generic enough to add a
  `type: 'tile'` or similar entry later without changing the diffing or
  status logic.
- Bookmark/itinerary sync here provides the *infrastructure*
  (`queueOfflineWrite`); a feature like Trip Planner needs to call it
  from its own save/bookmark actions to actually benefit — it isn't
  automatically intercepting those writes today.
