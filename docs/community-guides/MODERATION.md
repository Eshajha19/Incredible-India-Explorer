# Moderating Community Travel Guides

This describes the moderation workflow implemented in `guides-core.mjs` and
the `guide-moderation.html` dashboard.

## Roles

| Role        | Can do |
|-------------|--------|
| `user`      | Create/edit their own guides, rate, report |
| `moderator` | Everything a user can, plus approve/reject any guide, resolve reports, unpublish a guide |
| `admin`     | Everything a moderator can, plus grant/change roles |

Roles are stored per user id in `localStorage` under
`incredible-india-user-roles` (see `getUserRole`, `setUserRole` in
`guides-core.mjs`).

### Bootstrapping the first admin

Since this project has no server-side user database, the **first person to
open `guide-moderation.html`** on a given browser automatically becomes the
admin for that browser/demo instance (`bootstrapFirstAdmin`). This only fires
once — as soon as any admin exists, nobody else can self-promote. A real
deployment with a backend should replace this with a proper server-assigned
role instead.

To manually promote someone else once you're an admin:

```js
import { setUserRole, USER_ROLES } from './guides-core.mjs';
setUserRole(myAdminUid, otherUserUid, USER_ROLES.MODERATOR);
```

## Guide lifecycle

```
 draft --submit--> pending --approve--> published
   ^                  |  \
   |               reject  (edit on published guide)
   |                  |         |
   +---(resubmit)-----+         v
                             pending (again)
```

- **draft** — only visible to the author (and moderators/admins).
- **pending** — in the review queue; not visible to the public.
- **published** — visible on the public Community Guides page.
- **rejected** — sent back to the author with a note; can be edited and
  resubmitted.

Editing a **published** guide does not change what's public immediately — it
creates a new version and moves the guide back to `pending`. The
`publishedVersionId` field keeps pointing at the last-approved version until
the new edit is approved, so nothing goes live without review.

## Reviewing pending guides

1. Open `guide-moderation.html` → **Pending guides** tab.
2. Use **Preview** to open the guide as a reader would see it.
3. **Approve** — publishes the current version immediately.
4. **Reject** — prompts for a short note explaining what to fix. This note is
   stored on `guide.moderation.note` and is meant to be shown to the author.

## Handling reports

1. Open `guide-moderation.html` → **Reports** tab.
2. Each open report shows the guide, the reason selected by the reporter, and
   any free-text note.
3. **Dismiss** — marks the report resolved with no action against the guide.
4. **Unpublish guide** — moves the guide back to `draft` (so it disappears
   from the public page) and resolves the report as `guide-unpublished`. The
   author can fix the guide and resubmit it.

## Restoring versions

Moderators/admins can restore any prior version of a guide directly from its
**Version history** panel. Doing so as a moderator republishes that version
immediately (no additional review needed) — useful for quickly reverting
vandalism or a bad edit.

## API surface used by the dashboard

See [`API.md`](./API.md) for the full function reference. The dashboard only
uses: `listPendingGuides`, `approveGuide`, `rejectGuide`, `listOpenReports`,
`resolveReport`, `unpublishToDraft`, `isModeratorOrAdmin`, `bootstrapFirstAdmin`.
