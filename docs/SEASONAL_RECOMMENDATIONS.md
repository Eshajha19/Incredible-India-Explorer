# Seasonal Travel Recommendation Engine

Resolves #773 — AI-Powered Dynamic Seasonal Travel Recommendation Engine.

Ranks Indian destinations for a chosen travel month, surfaces festivals
happening at that time, and suggests same-category alternatives when a
destination is a poor fit for the requested month.

## Files added

| File | Purpose |
| ---- | ------- |
| `js-modules/seasonal-recommendation-engine.js` | Pure, DOM-free engine: `computeSeasonalFit`, `getFestivalsForMonth`, and the `SeasonalRecommendationEngine` class (`recommend`, `getAlternatives`). |
| `frontend/seasonal-recommendations/index.html` | Page shell (header/nav/footer match the rest of the site), month + interest filters, results grid. |
| `frontend/seasonal-recommendations/style.css` | Dedicated stylesheet, adapted from `frontend/event-discovery/style.css`, reusing the site's design tokens. |
| `frontend/seasonal-recommendations/script.js` | DOM wiring: reads `window.tripDestinations` / `window.eventData.events`, calls the engine, renders cards, persists the last search to `localStorage`. |
| `tests/unit/seasonal-recommendation-engine.test.js` | Vitest unit tests for the engine. |

## Why this reuses existing datasets instead of new ones

This project (per the README) runs purely client-side with curated,
hand-maintained datasets rather than live backend services. Three
datasets already existing in this repo cover almost everything the issue
asks for:

| Issue's technical consideration | Implementation here |
| -------------------------------- | -------------------- |
| Seasonal metadata management | `trip-data.js`'s existing `bestSeason` field per destination (e.g. `"Oct-Mar"`, or multiple ranges like `"Mar-Jun, Sep-Dec"`) |
| Weather API integration | **Not implemented as a live API call.** Real forecasts (see `weather-core.js` / `weather-service.js`, Open-Meteo) only cover ~2 weeks out, which doesn't fit "which month should I visit" planning. `bestSeason` is used as the weather-awareness signal instead — see below. |
| Festival and event datasets | `event-data.js`'s existing recurring festival windows (`startMonth`/`endMonth`, cross-referenced by `destinationId`/`state`) |
| Ranking algorithm | `SeasonalRecommendationEngine.recommend()` — weighted combination of seasonal fit, interest match, festival presence, and popularity (see below) |
| Recommendation caching | Not needed — computation is a synchronous, in-memory pass over ~50 destinations; the last search's month/interests are persisted to `localStorage` so returning users see their last result immediately |
| Backend recommendation APIs | None — same client-side pattern as `js-modules/travel/travel-recommend.js` (issue #185) and `travel-timeline.js` |
| Analytics for recommendation effectiveness | Out of scope for this PR — flagged below as a fast-follow |

If/when this project adds a real backend, the engine's constructor
(`{ destinations, events }`) is the seam to swap in a fetched dataset or a
real weather/festival API without touching the rendering code in
`script.js`.

## How seasonal fit is scored

`computeSeasonalFit(destination, month)` parses `bestSeason` into one or
more month ranges (handling both comma-separated multiple ranges and
ranges that wrap across the year boundary, e.g. `"Nov-Feb"`), then buckets
the requested month into:

- **ideal** (score 1.0) — inside a best-season window
- **shoulder** (score 0.55) — one month outside a window (expect mixed
  conditions)
- **off-season** (score 0.15) — two or more months outside every window
- **unknown** (score 0.5, neutral) — destination has no `bestSeason` data
  yet, so it's neither penalized nor favored

## How destinations are ranked

`SeasonalRecommendationEngine.recommend({ month, interests, limit })`
scores every destination as:

```
score = seasonalFit.score * 0.55       // seasonal fit dominates
      + interestMatchRatio * 0.25      // fraction of requested interests matched
      + festivalBonus (up to 0.15)     // +0.05 per matching festival, capped
      + popularityBonus (up to 0.10)   // tie-breaker, from trip-data.js's popularity field
```

When `interests` is provided, destinations matching none of them are
excluded entirely rather than just down-ranked (matching how the existing
`js-modules/travel/travel-recommend.js` interest filter behaves). Each
result includes a human-readable `explanation` combining the seasonal-fit
reason, matched interests, and the top matching festival, satisfying the
"recommendation explanations are displayed" acceptance criterion.

## Alternative destinations

`getAlternatives(destination, month, limit)` returns same-category
destinations that ARE an "ideal" fit for the requested month, ranked by
shared-category count then popularity. Returns an empty array when the
destination is already ideal (or has no season data), so the "see
alternatives" UI only appears when it's actually useful.

## What's intentionally out of scope for this change

- **Live weather conditions.** As above — month-ahead planning and
  live/short-range forecasts are different problems; wiring in
  `weather-service.js`'s Open-Meteo integration for a "closer to your
  travel date" refinement is a reasonable fast-follow.
- **Seasonal travel insights dashboard.** The scoring breakdown
  (`seasonalFit`, `matchedInterests`, `festivals`, numeric `score`) is
  already returned per destination by `recommend()`; aggregating that
  into a dedicated analytics view is a natural follow-up rather than part
  of the core recommendation mechanism.
- **Recommendation-effectiveness analytics** (e.g. click-through
  tracking) — no analytics infrastructure exists elsewhere in this
  client-side-only project to hook into yet.
