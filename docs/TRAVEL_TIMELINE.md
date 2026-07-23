# Travel Timeline

Resolves #285 — Interactive Travel Timeline with Trip Replay and Memories.

A client-side timeline engine that turns a user's completed trips into a
chronological, filterable, searchable history — with photos, notes,
ratings, and milestones per trip — plus a "replay" mode that steps through
trips in order like a slideshow.

## Files added

| File | Purpose |
| ---- | ------- |
| `travel-timeline.js` | The whole engine: storage/CRUD, validation, filtering/search, stats, export, and the page's UI wiring (`initTimelinePage`). Exposes `window.TravelTimeline`. |
| `travel-timeline.html` | The page shell (header/nav/footer match the rest of the site), toolbar (search/filters/export/replay), timeline list, and the add/detail/replay modals. |
| `travel-timeline.css` | Dedicated stylesheet reusing the site's existing design tokens (`--saffron`, `--gold`, `--glass-bg`, `--glass-border`, `--border-radius-lg`, etc.). |
| `tests/unit/travel-timeline.test.js` | Vitest unit tests for the engine: validation, CRUD, chronological ordering, filtering/search, stats, export. |
| `trip-planner.html`, `journey.html` (modified) | One new nav link each, pointing at `travel-timeline.html`, so the feature is discoverable from the two most related pages. |

## Why this is client-side only

Per the project README ("Getting Started"): *"This project uses no complex
build tools or backend frameworks. It runs purely in the browser."* There is
no application database — `trip-data.js` is a static destination catalog,
and the existing "My Journey" bookmark system (`journey.js`) is the closest
precedent: a single `localStorage` record, read/written through a small
public API, with a dedicated page that renders it.

Travel Timeline follows the same pattern: `localStorage` is the persistence
layer, `window.TravelTimeline` is the "service," and `travel-timeline.js`
owns both. The issue's "Technical Considerations" section (timeline
generation service, DB schema, export service, lazy loading) map onto this
architecture as follows:

| Issue's technical consideration | Implementation here |
| ------------------------------- | ------------------- |
| Timeline generation service | `getTrips()` — reads, sorts chronologically |
| DB schema for completed trip history | The trip object shape below, persisted as a JSON array under one `localStorage` key |
| Image and note association | `photos[]` and `notes` are fields on the trip record itself, not a separate join |
| Lazy loading for long timelines | `renderList()` paginates in batches of 10 with a "Load more" button |
| Optimized queries | `filterTrips()` runs in-memory over a single small array — no query layer needed at this scale |
| Responsive timeline UI | CSS Grid/Flexbox, mobile breakpoint in `travel-timeline.css` |
| Export service | `exportTimeline()` / `downloadExport()` — JSON and CSV |

If/when this project adds a real backend, the `window.TravelTimeline`
surface (`getTrips`, `addTrip`, `updateTrip`, `deleteTrip`, `filterTrips`,
`exportTimeline`) is the seam to swap `localStorage` reads/writes for
`fetch()` calls without touching `travel-timeline.html`'s rendering code.

## Data model

Each completed trip is stored as:

```js
{
  id: "uuid-or-generated-id",
  title: "Golden Triangle getaway",
  state: "Rajasthan",
  category: "heritage",          // one of trip-data.js's category tags, or "other"
  destinationNames: ["Agra", "Jaipur", "Delhi"],
  startDate: "2026-01-10",       // ISO date
  endDate: "2026-01-14",         // ISO date, optional
  durationDays: 5,                // derived, inclusive of both ends
  rating: 5,                      // 1-5, optional
  notes: "Free-text memories",
  photos: [{ url, caption }],
  milestones: [{ date, label }],  // memorable events along the trip
  createdAt: "ISO timestamp",
  updatedAt: "ISO timestamp"
}
```

All trips for the current browser live under a single `localStorage` key,
`india-explorer-travel-timeline`, as a JSON array — mirroring
`india-explorer-journey`'s single-array-under-one-key shape.

## How completed trips get onto the timeline

The issue asks for trips to "automatically appear" once completed. In a
backend-less, single-device app there's no server-side trip-completion
event to hook into, so the acceptance criterion is met the same way
"My Journey" handles bookmarking: a small, explicit action (here, "+ Log a
completed trip") writes the record, and it then appears automatically,
in order, everywhere the timeline is rendered or filtered — no separate
manual "refresh" or "sync" step. This keeps the feature usable today without
inventing a fake completion signal, while leaving `addTrip()` as a stable
integration point a future Trip Planner "mark itinerary as completed" button
could call directly.

## Page flow

`travel-timeline.js` listens for the same `app:route-changed` event every
other explorer page uses (dispatched by `router.js` after its SPA-style
content swap) and re-initializes the page each time, exactly like
`journey.js`. On `travel-timeline.html`:

1. `initTimelinePage()` populates the year/state/category filter dropdowns
   from the current data (`getYears()`, `getStates()`, `getCategories()`),
   renders the header stats (`getStats()`), and renders the timeline list.
2. The list is grouped by year, newest first, each year's trips laid out
   along a vertical line (`.timeline-track`) in chronological order within
   that year, batched 10 at a time with "Load more" for large histories.
3. Clicking (or pressing Enter/Space on) a trip card opens a detail modal
   with the full note, photo gallery, milestones, and a delete action.
4. Filters and the search box re-run `filterTrips()` on every change and
   re-render just the list (stats/filter options stay put).
5. "Replay journey" opens a modal that walks `getTrips()` in order — Prev /
   Next / Play (auto-advance every 3s) — for reliving the sequence of trips.
6. "Export JSON" / "Export CSV" call `downloadExport()`, which builds a
   `Blob` from `exportTimeline()` and triggers a browser download.

## Testing

`tests/unit/travel-timeline.test.js` loads `travel-timeline.js` as plain
script text and evaluates it (`new Function(code)()`), the same technique
`tests/unit/trip-planner.test.js` uses for `js-modules/trip-planner.js`,
since neither file is an ES module — both ship as plain `<script>` includes
so they work without a build step, per the project's "no complex build
tools" design. The suite runs under `@vitest-environment jsdom` (see
`tests/unit/theme.test.js` for the same pattern) so `localStorage` and
`document` are available, and covers:

- Validation (missing title/date, invalid date range, out-of-range rating)
- Duration calculation (single day vs. inclusive ranges)
- CRUD (add/update/delete, persistence to `localStorage`, chronological sort)
- Filtering and search (year, state, category, free-text, combinations)
- Stats (trip count, total days, states visited, average rating)
- Export (JSON round-trips to the original array; CSV has a header row, one
  row per trip, and correctly quotes values containing commas)

Run with:

```bash
npx vitest run tests/unit/travel-timeline.test.js
```
