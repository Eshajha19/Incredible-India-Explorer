# AI-Powered Personalized Travel Companion with Adaptive User Preferences

Resolves #864.

Extends the existing quiz-based "Recommended For You" feature
(`js-modules/travel/travel-recommend.js`, issue #185) with a **learning
layer**: a client-side interaction tracker + preference engine that builds
a per-visitor profile from real behavior (bookmarks, searches, ratings,
planned trips) and blends it with the explicit quiz answers already in
place, with recency decay so the profile keeps adapting over time.

## Why extend #185 instead of replacing it

`travel-recommend.js` already has almost everything issue #864 asks for at
the data layer: `TRAVEL_DESTINATIONS` is tagged with `tags`, `budget`, and
`seasons`, and `scoreDestination`/`buildReason` already do content-based
filtering with human-readable explanations. What's missing is exactly the
"Adaptive" half of the title — nothing persists or learns from behavior; a
visitor has to answer the same quiz chips every visit. This PR adds that
learning layer without duplicating or destabilizing the shipped #185 code.

## Files added

| File | Purpose |
| ---- | ------- |
| `js-modules/interaction-tracker.js` | `InteractionTracker`: records views, bookmarks/unbookmarks, searches, ratings, and planned-trip events into a bounded (300-event), storage-injectable log. |
| `js-modules/adaptive-preference-engine.js` | `AdaptivePreferenceEngine`: turns the raw event log into a decayed, weighted profile — top interest tags, budget affinity, season affinity, and a 0-1 confidence score used to detect cold start. |
| `js-modules/adaptive-recommend.js` | `AdaptiveRecommender`: ranks `TRAVEL_DESTINATIONS` by blending the learned profile with the existing explicit quiz prefs, generates a "why this was recommended" explanation, and falls back to a diverse/popular set when there's no signal yet. |
| `frontend/preference-dashboard/` | User-facing dashboard: profile-strength meter, top interests, budget affinity, live recommendations, and a **Reset my preference profile** button. |
| `tests/unit/interaction-tracker.test.js` | 7 Vitest cases: recording, timestamping, bounded trimming, persistence, reset. |
| `tests/unit/adaptive-preference-engine.test.js` | 10 Vitest cases: tag weighting per event type, bookmark/unbookmark cancellation, rating polarity, recency decay, cold-start confidence, budget-tier extraction, search-query tag matching. |
| `tests/unit/adaptive-recommend.test.js` | 6 Vitest cases: cold-start fallback, learned-preference ranking, explicit-preference ranking, budget bonus, exclusion/limit handling, and a 5,000-item performance check. |

All 23 tests pass locally via `npm run test:unit`.

## How the pieces fit together

```
User behavior (browser)
   │  bookmark / search / rate / plan a trip
   ▼
InteractionTracker.track(event)         // localStorage, bounded log
   │
   ▼
AdaptivePreferenceEngine.buildProfile() // recency-decayed tag/budget/season weights + confidence
   │
   ├──────────────────────────────┐
   ▼                              ▼
AdaptiveRecommender.recommend()   Preference Dashboard
   (blends profile with the        (renders profile + lets user reset it)
    #185 quiz prefs, ranks
    TRAVEL_DESTINATIONS,
    explains each pick)
```

### Integration points (what to add where)

This intentionally does **not** monkey-patch the existing, already-shipped
`Journey`, search, or `trip-planner.js` modules — that's riskier than a few
explicit one-line hooks at their existing call sites:

1. **Bookmarks** — wherever `Journey.saveToJourney(item)` / `removeFromJourney(id)`
   is called (currently in the bookmark button handlers across
   `frontend/*/script.js` files), add:
   ```js
   import { InteractionTracker, EVENT_TYPES } from '/js-modules/interaction-tracker.js';
   new InteractionTracker().track({ type: EVENT_TYPES.BOOKMARK, destinationId: item.id });
   ```
   (`EVENT_TYPES.UNBOOKMARK` on removal.)
2. **Search** — in the search input handler that calls `Journey.search(query)`,
   add a debounced `track({ type: EVENT_TYPES.SEARCH, query })` (debounce so
   every keystroke isn't logged — only the settled query).
3. **Planned trips** — at the end of `trip-planner.js`'s `generateItinerary()`
   success path, add
   `track({ type: EVENT_TYPES.TRIP_PLANNED, budget, days, month })`.
4. **Ratings** — once destination/review ratings exist (see issue #770,
   Community-Driven Destination Reviews), add
   `track({ type: EVENT_TYPES.RATING, destinationId, rating })` at the point
   a rating is submitted.

Each of these is a single import + one function call — no existing logic is
modified, so this PR ships the learning infrastructure now and the four
call-site hooks can land incrementally (including in the same PR that adds
ratings from #770) without merge conflicts.

## Acceptance criteria mapping

- **"Users receive personalized recommendations after sufficient
  interaction"** — `AdaptivePreferenceEngine.isColdStart(profile)` (confidence
  < 0.15) gates this explicitly; `AdaptiveRecommender` only claims a
  personalized reason once confidence clears that bar, otherwise it's
  honest about being a popularity/diversity fallback.
- **"Recommendations improve as additional user data becomes available"** —
  every event is recency-decayed (30-day half-life, configurable), so the
  profile keeps shifting as new bookmarks/ratings arrive and old ones fade.
- **"Users can manage or reset their preference profile"** — the Preference
  Dashboard's **Reset** button calls `InteractionTracker.clearEvents()`.
- **"AI-generated recommendation explanations are displayed"** —
  `AdaptiveRecommender` returns a `explanation` string per result, blending
  learned-tag and explicit-quiz reasoning (see `buildExplanation()`).
- **"Recommendation generation remains performant for large datasets"** —
  `recommend()` is a single O(n × avg_tags) pass with no nested loops over
  the event log at recommendation time (the event log is reduced to a
  profile once, upfront); the test suite includes a 5,000-destination
  benchmark completing in well under 200ms in CI.
- **Unit/integration tests validate recommendation accuracy** — see the
  three test files above.
- **Documentation** — this file.

## Scope and trade-offs (read before extending)

This is a static-site-appropriate implementation: everything lives in the
visitor's own `localStorage`, with no server-side profile store. That's a
deliberate, honest trade-off given the project's current architecture (no
database beyond Firebase Auth — see `docs/MULTILINGUAL_I18N.md` for the
same discussion in the i18n feature). Two things called out in the issue's
"Technical Considerations" are explicitly **not** included here:

- **"Backend recommendation APIs" / "user preference database schema"** —
  there is no backend. If one is added later (e.g. Firestore, given
  Firebase Auth already exists), `InteractionTracker`'s storage layer is
  built to be swapped for a remote store: its constructor already accepts
  an injectable `storage` object with `getItem`/`setItem`, so a Firestore-
  backed adapter is a drop-in replacement, not a rewrite.
- **"Recommendation caching" / "analytics for recommendation quality"** —
  out of scope for a single-visitor, client-only profile; these make more
  sense once there's a backend aggregating profiles across visitors.

The tag taxonomy is intentionally **not** reinvented — it reuses the exact
`tags`/`budget`/`seasons` fields already defined in
`js-modules/travel/travel-recommend-data.js`, so this feature and #185 stay
in sync automatically as that dataset grows.
