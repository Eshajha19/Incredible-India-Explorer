# Trip Expense Splitter & Group Expense Management

Resolves #866 — Smart Trip Cost Splitter and Group Expense Management.

Lets a group traveling together log shared expenses, split them equally,
by percentage, or by custom amount, and see exactly who owes whom —
settled in the fewest possible payments.

## Files added

| File | Purpose |
| ---- | ------- |
| `js-modules/expense-splitter-engine.js` | Pure, DOM-free engine: `computeShares`, `computeBalances`, `simplifySettlements`, `getCategoryBreakdown`, `generateReport`, `reportToCSV`, and the `ExpenseSplitterEngine` class. |
| `frontend/trip-expense-splitter/index.html` | Page shell (shared header/nav/footer), trip + participant setup, add-expense form, expense list, balances/settlement/category summary. |
| `frontend/trip-expense-splitter/style.css` | Dedicated stylesheet reusing the site's design tokens (same approach as `frontend/seasonal-recommendations/style.css`), plus a `@media print` block for PDF export. |
| `frontend/trip-expense-splitter/script.js` | DOM wiring: manages an `ExpenseSplitterEngine` instance, persists the group to `localStorage`, renders balances/settlements/categories, handles CSV/PDF export. |
| `tests/unit/expense-splitter-engine.test.js` | 23 Vitest unit tests covering split math, balances, settlement minimization, and the engine's validation. |

## Split methods

`computeShares(expense)` supports three `splitType`s:

- **equal** — total divided evenly across the selected participants. Any
  rounding remainder (e.g. ₹100 ÷ 3 = ₹33.33 + ₹33.33 + ₹33.34) is given to
  the last participant, so shares always sum exactly to the original
  amount — no silently "missing" paise.
- **percentage** — each participant's `splitDetails[id]` is a percentage
  share; must sum to 100% (±0.5% tolerance for rounding). Rejected with a
  clear error otherwise.
- **custom** — each participant's `splitDetails[id]` is an exact amount;
  must sum to the expense total (±₹0.01 tolerance). Rejected otherwise.

Validation happens in `computeShares()` itself and is re-run by
`ExpenseSplitterEngine.addExpense()` before the expense is stored, so bad
data can never enter a group's expense list in the first place.

## Balances and settlement minimization

`computeBalances(group)` nets out, per participant, how much they've
**paid** across all expenses vs. how much they **owe** (their summed
shares), giving a `net` figure: positive means the group owes them money,
negative means they owe the group.

`simplifySettlements(balances)` turns that into the minimum number of
payments using the standard greedy debt-simplification approach: repeatedly
match the current largest creditor with the current largest debtor,
settle the smaller of the two amounts, and repeat. This is the same
heuristic used by tools like Splitwise — it's not formally proven optimal
for every possible combination of balances, but it reliably produces at
most `participants - 1` transactions and avoids the naive "everyone pays
everyone" explosion of pairwise IOUs.

## Why this is `localStorage`-based rather than "true" offline sync

This project is client-side only (confirmed while working on #773's
seasonal recommendations — no backend exists anywhere in the codebase).
The issue's "offline expense recording with automatic synchronization"
acceptance criterion assumes a server to eventually sync to, which isn't
this project's architecture.

What's implemented instead: every change (participants, expenses, trip
name) is saved to `localStorage` immediately, so the app works fully
offline and a returning visitor sees their in-progress trip exactly as
they left it — no data is ever lost to a dropped connection, because
nothing depends on a connection in the first place. This mirrors how
`smart-budget-planner.js` (`SAVED_PLANS_KEY`) and the seasonal
recommendations page (`PREFS_KEY`) already persist state in this repo.

If a real backend is added to this project later, `ExpenseSplitterEngine`
takes a plain `group` object and exposes `toJSON()` — that's the natural
seam to swap `localStorage` for a real sync call without touching the
split-math logic.

## Export

- **CSV** — `reportToCSV()` is a pure function (fully unit-tested); the
  DOM layer wraps it in a `Blob` and triggers a download, the same pattern
  already used by `frontend/travel-timeline/travel-timeline.js`.
- **PDF** — no PDF-generation library was added. Instead, an `@media
  print` stylesheet hides everything except the report panels, and the
  "Export / Print PDF" button calls `window.print()`, letting the
  browser's own "Save as PDF" print destination produce the file. This is
  the same approach already used in `js-modules/trip-planner.js` and
  `frontend/compare-states-data/compare.js` — no new dependency, and it
  works completely offline.

## What's intentionally out of scope for this change

- **Expense analytics dashboard** and **notification service for pending
  settlements** — the underlying data (`generateReport()`'s category
  breakdown, per-participant balances, and settlement list) is already
  computed and available; a dedicated analytics view or reminder system is
  a reasonable fast-follow rather than part of the core splitting
  mechanism.
- **True server-side offline sync** — see above; there's no backend in
  this project for expenses to sync to yet.
