# Destination Comparison Tool

Resolves #863 — Implement Intelligent Destination Comparison Tool with
Personalized Recommendations.

## What it does

At `frontend/destination-comparison/destination-comparison.html`: pick up
to four destinations from the existing `trip-data.js` dataset, set how much
you care about budget / adventure / family-friendliness / accessibility and
your trip-length limit, and get:

- A side-by-side comparison card per destination (best time to visit,
  weather, budget/day, ideal duration, adventure level, family
  friendliness, accessibility, popular attractions, nearby destinations,
  traveler popularity).
- A personalized recommendation naming a winner and explaining *why*, in
  plain language tied to your stated preferences.
- Export as a downloadable `.txt` report, or save the comparison (by
  destination selection) to `localStorage` for later.

Everything recalculates live — changing a preference slider, the cost
tier, or the destination list re-runs the comparison immediately.

## "AI-powered" — what's actually happening

The issue calls for "AI-powered recommendations." This is implemented as
transparent, deterministic weighted scoring, not a model call — consistent
with `trip-data.js`'s own description of itself as "rule-based, client-side
only, no backend," which every feature built on that dataset in this
project follows. Each compared destination gets a score built from:

- **Budget fit** — cheaper destinations score higher when budget priority
  is set high, normalized against a configurable daily budget ceiling.
- **Adventure level, family-friendliness, accessibility** — the
  destination's derived score (see below) multiplied by how much you said
  that factor matters (0-5).
- **Trip-length fit** — a penalty if the destination typically needs more
  days than your stated limit.
- **A small popularity tie-breaker** so close scores don't feel arbitrary.

The recommendation explanation is built directly from which of these
factors actually pushed the winner ahead — every claim in the explanation
traces back to a specific score component, which is also why this is
fully unit-testable (`tests/unit/destination-comparison-engine.test.js`)
without any network call or fixture recording.

## Derived attributes — and their honest limits

`trip-data.js` has `bestSeason`, `costPerDay`, `highlights`, `minDays`/
`maxDays`, `categories`, and `popularity` for ~96 destinations, but no
explicit weather, adventure-level, family-friendliness, accessibility, or
review-based rating fields. Rather than hand-curating a large new dataset
across all 96 entries (a huge, hard-to-verify lift), these are computed
with transparent heuristics from the fields that already exist:

| Attribute | Derived from | Range |
| --------- | ------------- | ----- |
| Weather | `categories` (desert/mountains/beaches/etc.) | Text description |
| Adventure level | `categories` (adventure/mountains/desert/wildlife push it up) | 1-5 |
| Family friendliness | `categories` (historical/heritage/city/spiritual/beaches push up, adventure/desert push down) | 1-5 |
| Accessibility | `popularity` and `minDays` as a proxy for how well-connected a destination tends to be | 1-5 |
| Nearby destinations | Haversine distance to every other destination in the dataset, within 200km | Up to 3 |
| User rating | `popularity` field, relabeled honestly as "traveler popularity" | 1-10 |

These are documented here and in the module's own comments as **editorial
heuristics, not measured or crowd-sourced data**. If this dataset later
gains real per-destination weather/accessibility/review data, the derived
functions in `destination-comparison-engine.js` are the only place that
would need to change — the comparison and recommendation logic around them
stays the same.

## Architecture

- `js-modules/destination-comparison-engine.js` — pure logic, no DOM
  dependency, depends only on the shared `tripDestinations` global from
  `trip-data.js` (same dependency `js-modules/trip-planner.js` already
  has). Exposes `window.DestinationComparison`.
- `frontend/destination-comparison/destination-comparison.html` +
  `destination-comparison-ui.js` — a standalone page (same pattern as
  `route-planner.html`/`island-explorer/index.html`: shared `styles.css`,
  direct `<script>` includes, `DOMContentLoaded` wiring) rather than the
  SPA router (`js-modules/router-init.js`) that `trip-planner.html` uses.
  Both patterns already coexist in this codebase; the standalone pattern
  was chosen here to keep the page self-contained and easy to verify in
  isolation.
- `tests/unit/destination-comparison-engine.test.js` — 20 vitest tests,
  following the exact pattern `tests/unit/trip-planner.test.js` already
  uses (load `trip-data.js` and the engine source via `readFileSync` +
  `new Function()`, exercise the resulting global).

## Testing

```bash
npx vitest run tests/unit/destination-comparison-engine.test.js
```

Covers: derived-attribute ranges and category sensitivity, nearby-search
correctness (sorted, radius-bounded, excludes self), the 4-destination cap
and other input validation, cost-tier sensitivity, live recalculation on
a changed destination set, preference-driven recommendation correctness
(budget-only and adventure-only cases produce the expected winner),
trip-length penalty behavior, graceful handling of an empty comparison,
export text/JSON completeness, and save/load/delete against `localStorage`.

## Known limitations / future work

- Derived attributes (weather, adventure, family, accessibility) are
  heuristics from existing categorical data, not verified per-destination
  data — see the table above.
- "Nearby destinations" only searches within this project's existing
  ~96-destination `trip-data.js` list, not all of India.
- No backend means no real user-review aggregation for the "user ratings"
  field — it's `trip-data.js`'s existing editorial `popularity` score,
  relabeled honestly rather than presented as crowd-sourced.
- Saved comparisons store only the destination-id selection, not a
  point-in-time snapshot of the comparison output — if `trip-data.js`
  changes later, a loaded saved comparison reflects current data, not
  what was on screen when it was saved.
