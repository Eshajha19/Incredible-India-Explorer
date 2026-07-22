# Smart Budget Planner

Resolves #284 — AI-Powered Smart Budget Planner for Trip Cost Estimation.

A fully client-side, rule-based budget estimator: no backend, no ML model
("AI-powered" here means algorithmic/heuristic personalization, consistent
with the rest of the site's rule-based Trip Planner). Users enter a
destination, trip duration, number of travelers, accommodation preference,
transportation mode, and their own food/sightseeing/shopping/misc
allowances, and get back a full category-wise cost estimate, a comparison
across travel styles, a daily spending guide, and cost-optimization
suggestions. Plans can be saved, edited, and exported as a text report, all
via `localStorage` — no account required.

## Files added

| File | Purpose |
|---|---|
| `js-modules/smart-budget-planner.js` | All budget-calculation logic, plus the page's UI wiring (`initBudgetPlannerPage`). |
| `budget-planner.html` | The page shell (header/nav/footer match the rest of the site), the planner form, results, and saved-plans sections. |
| `budget-planner.css` | Dedicated stylesheet, reusing the site's existing design tokens (`--saffron`, `--gold`, `--green`, glass-panel vars) and print styles for exported reports. |
| `tests/unit/smart-budget-planner.test.js` | Vitest unit tests for the calculation/comparison/recommendation/persistence logic. |
| `js-modules/router-init.js` (modified) | One new entry in `ROUTE_INIT_MAP`, registering the `budget-planner.html` route. |
| `trip-planner.html`, `india-3d-map.html` (modified) | Added a "💰 Budget Planner" nav-dropdown and footer link next to the existing Trip Planner link. |

It reuses `trip-data.js` (added for the existing Trip Planner, issue #184)
for destination-specific accommodation rates, but does not modify that file.

## How it fits into the existing architecture

This site is a fetch-based SPA: `router.js` intercepts internal link
clicks, fetches the target `.html` file, swaps the `<main id="app-root">`
content, and dispatches `app:route-changed`. `js-modules/router-init.js`
listens for that event and, based on `pathname`, looks up the route in
`ROUTE_INIT_MAP`, lazy-loads the right script(s), and calls the page's
`init...Page()` function.

The Smart Budget Planner follows that pattern exactly:

```js
// js-modules/router-init.js
'budget-planner.html': {
    scripts: ['trip-data.js', 'js-modules/smart-budget-planner.js'],
    initName: 'initBudgetPlannerPage',
    useSafeInit: true,
    name: 'Smart Budget Planner'
},
```

`trip-data.js` is loaded first (for destination lookups) and explicitly
awaited before `smart-budget-planner.js` runs, and `useSafeInit: true`
wraps initialization in a try/catch so a failure here can't break
navigation to other pages.

## Budgeting algorithm

All of the logic below lives in `js-modules/smart-budget-planner.js` and is
exposed as `window.SmartBudgetPlanner` (and via `new Function(...)`
evaluation for the unit tests, matching the existing `trip-planner.test.js`
convention).

1. **Accommodation.** `accommodationRate(tier, destination)` starts from a
   flat per-person-per-night rate for the chosen tier (`budget` / `standard`
   / `luxury`). If the destination is recognized in `trip-data.js`, the rate
   is scaled by the destination's cost index relative to a national-average
   mid-tier rate (`Math.sqrt(destination.costPerDay.mid / 3500)` — the
   square root dampens the swing so very cheap or very expensive
   destinations don't distort the estimate too aggressively). Cost is then
   `rate × nights × rooms`, where `rooms = ceil(travelers / 2)` assumes
   double occupancy.
2. **Transport.** Each transport mode (`flight`, `train`, `bus`,
   `car_rental`, `own_vehicle`) has a flat trip-level "base" fare plus a
   small per-day local-transport component; total is
   `travelers × (base + perDay × days)`. These are editorial planning
   estimates, not live fares — no destination-to-destination routing is
   attempted here (that's the existing Trip Planner's job); this feature
   estimates a *single* destination trip's cost.
3. **Food.** `dailyFoodBudget × days × travelers`. If the user leaves the
   field blank, a sane per-tier default is used (₹400 budget / ₹800
   standard / ₹1,500 luxury per person per day).
4. **Sightseeing / Shopping / Misc.** Taken directly as user-entered totals
   for the whole trip (clamped to ≥ 0).
5. **Contingency.** 8% of the subtotal is added as a buffer for
   unplanned/surge costs.
6. **Category breakdown & percentages.** The final `categories` object
   (accommodation, transport, food, sightseeing, shopping, misc,
   contingency) and each category's share of the total are returned
   together, ready for the UI's progress-bar rendering.

### Cost comparison (travel styles)

`compareTiers(input)` re-runs `calculateBudget()` once per accommodation
tier (holding every other input constant) and returns the three totals side
by side, so the UI can show a Budget vs Standard vs Luxury comparison at a
glance.

### Recommendations (cost optimization)

`getRecommendations(plan)` is a small rule engine over the computed
breakdown:

- Accommodation > 45% of total *and* not already on the cheapest tier →
  suggests downgrading, with the actual ₹ saving computed by re-running
  `calculateBudget()` at the `budget` tier.
- Flight + trip ≤ 3 days → suggests train as a cheaper, comparably fast
  alternative for short hops.
- Food > 25% of total → suggests mixing in local eateries.
- Shopping > 20% of total → suggests setting a firm spending cap.
- 3+ travelers → suggests shared/homestay-style lodging to reduce
  per-person accommodation cost.
- Always includes one general suggestion about booking accommodation/
  transport 3-4 weeks ahead to avoid surge pricing.

Each suggestion includes a `potentialSaving` figure (₹) where one can be
computed, so the user can weigh which trade-offs are worth making.

### Daily spending plan

`getDailySpendingPlan(plan)` divides every category evenly across the trip
length, giving a simple per-day pacing guide (not a day-by-day itinerary —
that level of detail is the existing Trip Planner's responsibility).

### Saving, editing, and exporting

- **Save** (`savePlan`) / **edit** (`updateSavedPlan`, which recalculates
  the whole plan from new inputs while keeping the same `id`) / **delete**
  (`deleteSavedPlan`) / **list** (`getSavedPlans`) persist plan objects to
  `localStorage['smartBudgetPlannerSavedPlans']`.
- **Export** (`exportReportText`) builds a plain-text report (destination,
  trip details, full category breakdown with percentages, total/per-person/
  per-day figures, and the recommendation list) which the page downloads as
  a `.txt` file via a `Blob` + temporary `<a download>` element. The page
  also has dedicated `@media print` styles in `budget-planner.css` so the
  results card alone (no nav/footer/buttons) prints cleanly.

## Known limitations / good follow-ups

- Costs are editorial planning estimates, not live pricing — same caveat as
  the existing Trip Planner.
- Sightseeing/shopping/misc are entered as trip-total figures rather than
  per-day, since the issue describes them as configurable allowances rather
  than daily rates; this is called out in the form's field labels.
- The nav link was only added to the two pages that already link to Trip
  Planner (`trip-planner.html`, `india-3d-map.html`). Every page's header is
  a separate static copy in this codebase, so surfacing the link sitewide
  means adding the same `<a>` to every page, or — better — extracting the
  header into a shared include/template in a follow-up PR (same limitation
  noted in `docs/TRIP_PLANNER.md`).
- A natural next step is letting the Trip Planner and Budget Planner share
  data: e.g. jumping from a generated itinerary straight into a prefilled
  Budget Planner comparison for that itinerary's destinations.

## Testing

```bash
npx vitest run tests/unit/smart-budget-planner.test.js
```

15 unit tests cover: category totals and percentage sums, destination
lookup and its cost-index fallback, input clamping, multi-traveler
room-sharing math, tier comparison ordering, each recommendation rule,
daily-plan division, exported report content, and the full
save/edit/delete persistence cycle (using an in-memory `localStorage`
polyfill, since vitest's default `node` environment has none).

The full suite (`npm test`) passes at 282/282 with this feature added, with
no changes to any pre-existing test file.
