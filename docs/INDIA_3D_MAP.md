# 3D Map Explorer

Implements #288 — an interactive 3D map of India for exploring states and
destinations geographically instead of through text lists.

## What it does

Renders a low-poly 3D relief map of India in the browser. Users can rotate,
pan, and zoom; click a state to open its existing state page; click a
destination marker to see details, tags, and nearby recommendations; filter
by category; and bookmark places for later.

Files:

| File | Purpose |
| ---- | ------- |
| `india-3d-map.html` | Page shell: nav, controls UI, detail panel |
| `india-3d-map.css` | Styling, reusing the site's existing design tokens |
| `india-3d-map.js` | Three.js scene: terrain extrusion, markers, camera, interaction |
| `js-modules/map3d-core.js` | Pure projection/clustering/distance math — no DOM or WebGL, unit-tested |
| `india-map-data.js` | Simplified state/UT boundary polygons (lng/lat) |
| `tests/unit/map3d-core.test.js` | Vitest coverage for `map3d-core.js` |

## Data sources

- **State boundaries**: derived from a public India administrative-boundary
  dataset, simplified with Douglas-Peucker (≈0.02° tolerance) down to ~7,400
  points / ~118KB so the whole country loads as one script tag with no
  build step, consistent with the rest of this buildless site. Boundaries
  reflect pre-2014 state lines — see **Known limitations**.
- **Destinations**: reuses the site's existing `trip-data.js`
  (`window.tripDestinations`, 48 places with real lat/lng, categories,
  highlights, and descriptions) instead of introducing a second dataset.
  This keeps the map and the Trip Planner in sync automatically — adding a
  destination to one dataset makes it appear in both.

## Rendering approach: Three.js, no backend

Consistent with `docs/ROUTE_PLANNER.md`'s reasoning, this is a static,
buildless site with no server, so everything runs client-side:

- Three.js is loaded via an `importmap` pointing at jsdelivr (same CDN
  pattern already used for Chart.js in `data-india.html`), so no bundler is
  required.
- Each state's boundary ring is converted to a `THREE.Shape` and extruded
  into a flat-topped mesh (`ExtrudeGeometry`) with a small per-state height
  variation (hashed from the state id) purely for visual relief — it has no
  data meaning.
- Destination markers are `THREE.Sphere` meshes positioned via the same
  lng/lat → plane projection as the terrain, so markers line up with the
  state they belong to.
- Interaction (hover highlight, click-to-navigate, click-to-select) uses a
  single `THREE.Raycaster` against the state meshes and marker meshes each
  frame — no picking library needed at this scene scale (~35 state meshes +
  ≤48 markers).

## Projection

`map3d-core.js` uses a simple equirectangular projection with a
latitude-cosine correction (`project(lng, lat) → [x, y]`), centered on
mainland India (22.5°N, 80°E). This is not a true conformal projection —
it's intentionally simple, since the map is stylized/country-scale rather
than distance-critical. For anything distance-sensitive (nearby-attraction
ranking), the code uses real haversine distance on lat/lng directly rather
than measuring on the projected plane.

Keeping this math in a plain, framework-free module (rather than inline in
the Three.js renderer) is what makes it unit-testable without a WebGL
context or DOM — see `tests/unit/map3d-core.test.js`.

## Clustering

Clustering is grid-based, not hierarchical: destinations are bucketed into
square cells whose size is picked from the current camera distance
(`cellSizeForZoom`), and each non-empty cell becomes one cluster (or a
normal marker if it only contains one destination). This is recomputed
every time the camera zoom crosses a threshold rather than built once
up front, which is cheap at this dataset size (48 destinations) and keeps
the rendering code simple. A hierarchical/greedy clustering approach would
scale better for a much larger dataset — see **Known limitations**.

## Filtering & bookmarks

- Category chips are generated from whatever categories exist in
  `tripDestinations` at load time, so adding a new category to the shared
  dataset doesn't require touching this file.
- Bookmarks persist in `localStorage` under `map3d:bookmarks`, keyed by
  destination id — same mechanism the Trip Planner already uses for saved
  itineraries.

## Known limitations / future work

- **Telangana is not split out from Andhra Pradesh** in the boundary
  polygons — the public dataset used for simplification predates the 2014
  split. Destination markers themselves use accurate present-day lat/lng
  and `state` fields regardless, so only the underlying state *shape* for
  those two is affected (fill color/click-through). Swapping in an updated
  boundary file for just those two states is a contained follow-up.
- Clustering is grid-based rather than a proper hierarchical/greedy
  algorithm; fine at 48 destinations, would need revisiting if the dataset
  grows to hundreds+.
- No spatial index (e.g., k-d tree) for hit-testing — a linear raycast
  against all markers/states is used, which is fine at this scale
  (~35 state meshes, ≤48 markers) but would need one before adding, say,
  city-level or attraction-level markers on top of the current
  destination-level dataset.
- No lazy-loading of map "layers" — the whole boundary dataset (~118KB) and
  destination dataset load up front. Reasonable at current size; would be
  worth chunking by region if the boundary detail level increases.
- Not yet covered by integration/E2E tests — `tests/unit/map3d-core.test.js`
  covers the pure math (projection, clustering, filtering, distance), but
  there's no automated test driving the actual Three.js scene or DOM
  interactions yet.
