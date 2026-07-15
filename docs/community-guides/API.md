# Community Guides — API Reference (`guides-core.mjs`)

This project doesn't run an application server (see the architecture note at
the top of `guides-core.mjs`), so there's no REST API to document in the
traditional sense. Instead, `guides-core.mjs` **is** the API: a small set of
functions with the same shape a real backend endpoint would have, backed by
`localStorage` today and swappable for real network calls later without
touching any calling code.

Import it as an ES module:

```js
import * as Guides from './guides-core.mjs';
```

## Data models

### Guide

| Field                | Type                | Notes |
|----------------------|---------------------|-------|
| `id`                 | string              | |
| `destinationSlug`     | string              | URL/filter-friendly key |
| `destinationName`     | string              | Display name |
| `title`               | string              | Current title (matches current version) |
| `content`             | string (sanitized HTML) | Current content |
| `status`              | `draft \| pending \| published \| rejected` | |
| `authorId` / `authorName` | string          | |
| `createdAt` / `updatedAt` | ISO date string | |
| `versions`            | `GuideVersion[]`    | Full history, oldest first |
| `currentVersionId`    | string              | Points into `versions` |
| `publishedVersionId`  | string \| null      | The version currently live to the public |
| `moderation`          | `{ reviewerId, reviewedAt, note }` | Last moderation action |
| `ratings`             | `{ [userId]: 1-5 }` | One rating per user |
| `reports`             | `Report[]`          | |

### GuideVersion

| Field       | Type   |
|-------------|--------|
| `id`        | string |
| `title`     | string |
| `content`   | string |
| `editedBy`  | string (user id) |
| `editedAt`  | ISO date string |
| `note`      | string |

### Report

| Field        | Type    |
|--------------|---------|
| `id`         | string  |
| `reporterId` | string  |
| `reason`     | string  |
| `note`       | string  |
| `createdAt`  | ISO date string |
| `resolved`   | boolean |
| `resolution` | string \| null |

## Functions

### CRUD

- **`createGuide({ destinationSlug, destinationName, title, content, authorId, authorName })`**
  → `Guide`. Creates a draft with one initial version. Throws if `authorId`,
  `title`, or `content` is missing.
- **`listGuides({ status?, destinationSlug? })`** → `Guide[]`, newest-updated
  first.
- **`getGuide(guideId)`** → `Guide | null`.
- **`updateGuide(guideId, { title?, content?, note? }, editorId)`** → `Guide`.
  Appends a new version. If the guide was `published` or `rejected`, it moves
  back to `pending`. Throws `guides/permission-denied` unless `editorId` is
  the author or a moderator/admin.
- **`submitForReview(guideId, actorId)`** → `Guide`. Moves `draft`/`rejected`
  → `pending`.
- **`unpublishToDraft(guideId, actorId)`** → `Guide`. Moves any status back to
  `draft` (used by moderators when acting on a report).
- **`deleteGuide(guideId, actorId)`** → `boolean`.

### Version history

- **`getVersionHistory(guideId)`** → `GuideVersion[]`, newest first.
- **`restoreVersion(guideId, versionId, actorId)`** → `Guide`. Creates a *new*
  version with the restored content (history is never deleted). Republishes
  immediately if `actorId` is a moderator/admin; otherwise queues for review.

### Moderation

- **`listPendingGuides()`** → `Guide[]`.
- **`approveGuide(guideId, reviewerId, note?)`** → `Guide`. Requires
  moderator/admin. Only valid from `pending`.
- **`rejectGuide(guideId, reviewerId, note?)`** → `Guide`. Requires
  moderator/admin. Only valid from `pending`.

### Roles / permissions

- **`getUserRole(userId)`** → `'user' | 'moderator' | 'admin'`.
- **`bootstrapFirstAdmin(userId)`** → `boolean`. One-time bootstrap; see
  [MODERATION.md](./MODERATION.md).
- **`setUserRole(actingUserId, targetUserId, role)`** → `role`. Admin-only.
- **`isModeratorOrAdmin(userId)`** → `boolean`.

### Ratings

- **`rateGuide(guideId, userId, stars)`** → `{ average, count }`. `stars` must
  be an integer 1–5. Re-rating replaces the user's previous rating rather
  than adding a duplicate.
- **`getRatingSummary(guide)`** → `{ average, count }`.

### Reporting

- **`reportGuide(guideId, reporterId, reason, note?)`** → `Report`.
- **`listOpenReports()`** → unresolved reports across all guides, newest
  first, each annotated with `guideId` and `guideTitle`.
- **`resolveReport(guideId, reportId, reviewerId, resolution?)`** → `Report`.
  Requires moderator/admin.

## Errors

Thrown errors are plain `Error` objects with a `.code` string where relevant,
so callers can branch on it instead of parsing messages:

- `guides/permission-denied`
- `guides/not-found`
- `guides/version-not-found`
- `guides/report-not-found`

## Migrating to a real backend later

If this project adds a server (e.g. Firestore, since Firebase Auth is already
wired up), the recommended migration path is:

1. Keep this exact function API (`createGuide`, `listGuides`, …) as the
   contract the UI code (`guides.js`) depends on.
2. Replace the localStorage reads/writes inside each function with Firestore
   calls (`getDocs`, `addDoc`, `updateDoc`, etc.), keeping the same
   input/output shapes.
3. Enforce the permission checks (`canEditGuide`, `isModeratorOrAdmin`) as
   Firestore Security Rules as well, since a client-only check can't stop a
   malicious client from calling Firestore directly.
