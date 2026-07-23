# Gamification System — Architecture & Scoring

Implements issue **#287**: XP, levels, badges/achievements, daily/weekly/monthly
challenges, travel streaks, and leaderboards.

## Why it's built this way

This project is a static site with no application server (see `README.md` /
`CONTRIBUTING.md`) — the only backend is a Vercel function that hands back
Firebase Auth config (`api/firebase-config.js`); Firebase itself is only used
for authentication, not data storage. Existing features that need "server-like"
behavior (Community Guides, My Journey bookmarks) solve this the same way:
a `*-core.mjs` module implements the full data model and business logic on
top of `localStorage`, behind a function API shaped like what a real REST
backend would expose. The gamification system follows that exact pattern so
it fits the rest of the codebase and doesn't require a new dependency,
build step, or hosting change.

```text
gamification-rules.mjs   "content": XP values, level titles, achievement
                          definitions, challenge templates. Pure data —
                          no logic. This is what issue #287 means by
                          "configurable reward rules": add a badge or
                          challenge by appending one object here.

gamification-core.mjs    "engine": profiles, XP math, streaks, a generic
                          rule evaluator that reads gamification-rules.mjs,
                          challenge rotation, notifications, leaderboard.
                          Zero-dependency, localStorage-backed, framework-free
                          — every function takes userId explicitly so it's
                          trivially unit-testable (see tests/).

gamification.js          UI glue (ES module, like guides.js). Resolves the
                          current user (signed-in uid, or a per-browser
                          guest id), exposes window.Gamification for any
                          page to call, renders achievements.html and
                          leaderboard.html, and surfaces new unlocks as
                          toasts via the existing window.ToastNotifier.

achievements.html/.css   Profile summary (level, XP, streak), active
                          challenges, and the badge grid.

leaderboard.html         Global / friends XP ranking.

tests/gamification-core.test.mjs
                          Zero-dependency test suite (mirrors
                          tests/guides-core.test.mjs), runnable with
                          `node tests/gamification-core.test.mjs`.
```

## Data model

Everything lives under one `localStorage` key,
`incredible-india-gamification-profiles`, mapping `userId -> profile`:

```js
{
  userId, displayName,
  xp, level,
  streak: { current, longest, lastActivityDate },
  stats: { destinationsVisited, statesExplored, tripsCompleted,
           itinerariesCreated, bookmarksSaved, reviewsWritten },
  visitedIds: [...],      // dedupe keys so repeat visits don't inflate stats
  statesVisited: [...],
  achievements: { [achievementId]: { unlockedAt } },
  challengeProgress: { "<templateId>:<periodKey>": { progress, completedAt } },
  activityLog: [...],     // capped at 200 entries, most recent first
  notifications: [...]    // capped at 100, most recent first
}
```

`userId` is resolved by `gamification.js`: a signed-in user's Firebase/local
`uid` (via `auth-session.mjs`) if present, otherwise a persistent per-browser
guest id (`getOrCreateGuestId()`), so progress works before sign-in — the
same anonymous-first approach `journey.js` and `guides-core.mjs` already use.

## Scoring

| Activity                                         | XP                       |
| ------------------------------------------------ | ------------------------ |
| Visit a destination                              | 10                       |
| Explore a new state                              | 25                       |
| Create an itinerary                              | 40                       |
| Save a bookmark                                  | 5                        |
| Write a review                                   | 20                       |
| Complete a trip                                  | 100                      |
| Daily login                                      | 5                        |
| Streak bonus (per consecutive day, capped at 30) | 2 × current streak       |

`visit_destination` and `explore_new_state` are deduplicated by an id you
pass in (`meta.dedupeId` / `meta.stateName`) — revisiting the same place
awards a streak/login credit but not repeat stat/XP credit, so badges reflect
distinct exploration rather than page-refresh spam.

### Levels

10 levels, XP thresholds on a super-linear curve (`60 × level^1.6`) so early
levels come quickly and later ones take meaningfully longer — see
`LEVELS` in `gamification-rules.mjs` for exact numbers and titles
(Village Wanderer → Incredible India Legend).

### Achievements (badges)

Rule-based and fully declarative. Each definition in `ACHIEVEMENTS`
(`gamification-rules.mjs`) is `{ id, category, tier, title, description,
icon, metric, threshold }`, where `metric` is a dot-path into the profile
(e.g. `destinationsVisited`, `streak.longest`, `level`). The engine's
`evaluateAchievements()` is completely generic — it just checks
`value >= threshold` for every locked achievement after each activity.
**Adding a new badge requires zero changes to `gamification-core.mjs`.**

### Challenges

`CHALLENGE_TEMPLATES` defines daily/weekly/monthly challenge templates.
For any given day/week/month, `ACTIVE_CHALLENGE_COUNT` templates per period
are selected **deterministically** (a hash of the period key picks and
orders them) so every browser sees the same rotation without a server
broadcasting it — no two people get a different daily challenge by chance,
and the same user sees a stable challenge for the whole day/week/month.

### Streaks

A "day" is the browser's local calendar date. Activity on a new consecutive
day increments `streak.current`; a missed day resets it to 1; `streak.longest`
tracks the best-ever streak (and feeds streak-based badges). Multiple
activities on the same day only count once toward the streak.

### Leaderboard

`getLeaderboard({ scope, friendIds })` ranks by XP descending. Because there
is no shared backend today, **"global" leaderboard means "every profile that
has been created in this browser" plus a small, explicitly-labeled
(`demo: true`) seed list** so the page isn't empty for a first-time visitor.
`friends` scope filters to caller-supplied ids (there's no social graph yet).
If/when the project adds Firestore (already available via the existing
Firebase project, currently used only for auth), `getLeaderboard()` is the
one function that needs to change from reading `localStorage` to querying
all users — its public signature can stay the same.

## Integrating a new activity type

Any page can award XP without importing `gamification-core.mjs` directly:

```js
// once gamification.js has loaded on the page (or via dynamic import):
window.Gamification.record('write_review', { dedupeId: reviewId });

// or, from a module script that may run before gamification.js has loaded:
import('./gamification.js').then(({ Gamification }) => {
  Gamification.record('complete_trip');
});
```

`journey.js`'s `saveToJourney()` does exactly this for `save_bookmark` as a
working example — see the `import('./gamification.js')` call after a new
bookmark is written. The same pattern applies to trip completion in
`trip-planner.js`/`route-planner.js`, itinerary creation, and review
submission wherever those land in the codebase; call `Gamification.record()`
right after the existing save succeeds. Valid activity type strings are the
keys of `ACTIVITY_XP` in `gamification-rules.mjs`; passing an unknown one
throws immediately so a typo fails loudly in development instead of silently
awarding nothing.

## Testing

```bash
node tests/gamification-core.test.mjs
```

19 tests cover profile creation, XP awarding, dedupe rules, level-up
detection, streak increment/reset, achievement unlocking (including
"only unlocks once"), deterministic challenge rotation, challenge
completion + bonus XP, leaderboard ranking/scoping, and notifications.
Add this to `package.json`'s `test` script alongside the other zero-dependency
suites:

```json
"test": "vitest run && node tests/auth.test.mjs && node tests/guides-core.test.mjs && node tests/gamification-core.test.mjs"
```

## Known limitations / follow-ups

- **Leaderboard is per-browser, not truly global**, until the project adds a
  shared data store (Firestore is the natural fit since Firebase is already
  configured for auth). This is called out in-code and in the UI copy so it
  isn't presented as more than it is.
- **Only bookmarking is wired up end-to-end** as a reference integration;
  trip completion, itinerary creation, and reviews need one `Gamification.record(...)`
  call added at their existing save points (see "Integrating a new activity
  type" above).
- **Notifications are polled on page load**, not pushed in real time across
  tabs. A `storage` event listener could be added if cross-tab live updates
  become a priority.
