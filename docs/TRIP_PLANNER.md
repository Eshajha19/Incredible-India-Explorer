# Trip Planner

Resolves #184 — Advanced Trip Planner with Budget Optimization & Multi-City
Itinerary Generation.

A fully client-side, rule-based trip planner: no backend, no ML model. Users
enter a total budget, a number of days, and (optionally) preferred
destination types, and get a complete multi-city itinerary with an estimated
cost breakdown and day-by-day schedule. Trips can be edited (remove a city),
regenerated for a different combination, and saved to the browser via
`localStorage`.

## Files added

| File | Purpose |
|---|---|
| `trip-data.js` | Curated dataset of ~48 Indian destinations: category tags, coordinates, cost-per-day by tier, stay-length guidance. |
| `js-modules/trip-planner.js` | All generation/selection/budget logic, plus the page's UI wiring (`initTripPlannerPage`). |
| `trip-planner.html` | The page shell (header/nav/footer match the rest of the site), the planning form, results, and saved-trips sections. |
| `trip-planner.css` | Dedicated stylesheet for the page, reusing the site's existing design tokens (`--saffron`, `--gold`, `--green`, glass-panel vars). |
| `trip-planner.test.js` | Node-runnable unit tests for the generation logic (`node trip-planner.test.js`). |
| `app.js` (modified) | One new `else if` branch in the `app:route-changed` handler, registering the `trip-planner.html` route. |

## How it fits into the existing architecture

This site is a fetch-based SPA: `router.js` intercepts internal link clicks,
fetches the target `.html` file, swaps the `<main id="app-root">` content,
and dispatches `app:route-changed`. `app.js` listens for that event and,
based on `pathname`, lazy-loads the right `js-modules/*.js` file and calls
its `init...Page()` function — the same pattern used by `cuisine.html`,
`travel.html`, etc.

Trip Planner follows that pattern exactly:

```js
// app.js
} else if (pathname.includes('trip-planner.html')) {
    window.lazyLoadScript('trip-data.js')
        .then(() => window.lazyLoadScript('js-modules/trip-planner.js'))
        .then(() => initTripPlannerPage());
```

`trip-data.js` is loaded first and explicitly awaited before
`trip-planner.js` runs, rather than relying on a static `<script>` tag in
the page head — dynamically-inserted `<script>` elements don't honor
`defer`, so sequencing it through the same promise chain avoids a
load-order race.

## Itinerary generation ("optimization logic")

All of the logic below lives in `js-modules/trip-planner.js` and is exposed
as `window.TripPlanner` (and via `module.exports` for the unit tests).

1. **Cost tier.** `chooseCostTier(perPersonBudget, days)` picks
   `budget` / `mid` / `luxury` from the average per-day-per-person spend.
2. **Filtering & scoring.** Destinations are filtered to the requested
   categories (falling back to the full list if nothing matches — the UI
   surfaces a note when this happens) and scored: category match count is
   weighted far above popularity, so popularity only breaks ties.
3. **Greedy multi-city selection with nearest-neighbor chaining.**
   Starting from the highest-scored destination, each subsequent pick is
   the *geographically nearest* candidate among the next few top-scored
   ones (`NEAREST_NEIGHBOR_POOL = 6`) — this keeps the route relevant to
   preferences while avoiding a zig-zag itinerary. A candidate is only
   added if it fits both the remaining days and the budget ceiling.
4. **Travel cost/time estimation.** `estimateTravelLeg(distanceKm, tier)`
   uses a haversine great-circle distance, a per-km rate, and a flat
   per-hop fee to estimate cost; hops over 400 km consume a dedicated
   travel day in the schedule.
5. **Leftover-day distribution.** Any days left after the initial pass are
   given to the highest-popularity chosen cities (up to their `maxDays`),
   without exceeding the budget ceiling.
6. **Budget math.** `accommodation + travel`, plus a 10% contingency, times
   the number of travelers, compared against the requested budget.
7. **Daily schedule.** `buildDailySchedule(itinerary)` turns the chosen
   cities + travel legs into a flat, sequential day-by-day list.

### Editing and regenerating

- **Regenerate** (`regenerateItinerary`) excludes the previous itinerary's
  first (anchor) destination and re-runs generation, producing a
  meaningfully different combination rather than a cosmetic reshuffle.
- **Remove a city** (`removeDestinationFromItinerary`) drops one
  destination, recomputes the travel legs between its former neighbors, and
  redistributes its freed days to the remaining cities.
- **Save** (`saveTrip`) / **delete** (`deleteSavedTrip`) / **list**
  (`getSavedTrips`) persist full itinerary objects to
  `localStorage['tripPlannerSavedTrips']`. No account or backend required —
  consistent with the "rule-based, no backend needed" decision for this
  feature.

## Known limitations / good follow-ups

- Costs and travel estimates are editorial approximations for planning
  purposes, not live pricing — this should be stated clearly in the UI
  (already included as a footnote-style estimate, not a quote).
- The destination dataset (`trip-data.js`) is a curated ~48-place starter
  set, not the full breadth of the site's existing `states/`,
  `forts/`, etc. content. Extending it with more granular per-state
  destinations (and wiring in real accommodation-cost data, if the project
  ever adds a backend) is the natural next step.
- The nav link was only added to `trip-planner.html`'s own header dropdown
  (`Explore More ▾ → 🧳 Trip Planner`). Every other page's header is a
  separate static copy in this codebase, so surfacing the link sitewide
  means adding the same `<a>` to each page's dropdown, or — better —
  extracting the header into a shared include/template in a follow-up PR.

## Testing

```bash
node trip-planner.test.js
```

24 unit tests cover distance/cost math, tier selection, scoring, budget
adherence, category fallback, multi-traveler scaling, regenerate/remove
behavior, and schedule generation. A separate fuzz run (1,500+
budget/day/category combinations) found no crashes, negative costs, empty
itineraries, or day-count overruns.
