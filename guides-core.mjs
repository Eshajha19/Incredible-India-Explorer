// guides-core.mjs
//
// Data layer for the Community Travel Guides feature (issue #187).
//
// This project is a static site with no application server — the only
// backend today is a Vercel function that hands back Firebase Auth config
// (see api/firebase-config.js), and auth itself already falls back to
// localStorage (see auth-core.mjs). To stay consistent with that pattern,
// this module implements the "Guide" and "GuideVersion" models and every
// CRUD / moderation / versioning operation on top of localStorage, behind
// a small function API that mirrors what a real REST backend would expose
// (create/list/get/update, moderate, restore, rate, report).
//
// If/when the project adds a real database (e.g. Firestore, since Firebase
// is already used for auth), everything that imports from this file can
// keep working unchanged — only the bodies of these functions need to
// change from localStorage reads/writes to network calls.

const GUIDES_KEY = 'incredible-india-guides';
const ROLES_KEY = 'incredible-india-user-roles';

const STATUS = Object.freeze({
  DRAFT: 'draft',
  PENDING: 'pending',
  PUBLISHED: 'published',
  REJECTED: 'rejected'
});

const ROLES = Object.freeze({
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
});

// ---------------------------------------------------------------------
// storage helpers
// ---------------------------------------------------------------------

function getStorage() {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
}

function readJson(key, fallback) {
  const storage = getStorage();
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(key, JSON.stringify(value));
}

function nowIso() {
  return new Date().toISOString();
}

function makeId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

// ---------------------------------------------------------------------
// roles / permissions
// ---------------------------------------------------------------------

function getRoleMap() {
  return readJson(ROLES_KEY, {});
}

function saveRoleMap(map) {
  writeJson(ROLES_KEY, map);
}

/** Returns the role for a user id/email, defaulting to 'user'. */
export function getUserRole(userId) {
  if (!userId) return ROLES.USER;
  const map = getRoleMap();
  return map[userId] || ROLES.USER;
}

/**
 * Bootstraps the very first admin account for this browser/demo instance.
 * Only works while no admin exists yet, so a stranger can't self-promote
 * once a real admin has been set up. Real deployments should replace this
 * with server-side role assignment.
 */
export function bootstrapFirstAdmin(userId) {
  const map = getRoleMap();
  const hasAdmin = Object.values(map).includes(ROLES.ADMIN);
  if (hasAdmin || !userId) return false;
  map[userId] = ROLES.ADMIN;
  saveRoleMap(map);
  return true;
}

/** Admin-only: change another user's role. */
export function setUserRole(actingUserId, targetUserId, role) {
  if (getUserRole(actingUserId) !== ROLES.ADMIN) {
    throw permissionError('Only admins can change user roles.');
  }
  if (!Object.values(ROLES).includes(role)) {
    throw new Error(`Unknown role: ${role}`);
  }
  const map = getRoleMap();
  map[targetUserId] = role;
  saveRoleMap(map);
  return role;
}

export function isModeratorOrAdmin(userId) {
  const role = getUserRole(userId);
  return role === ROLES.ADMIN || role === ROLES.MODERATOR;
}

function permissionError(message) {
  const error = new Error(message);
  error.code = 'guides/permission-denied';
  return error;
}

function canEditGuide(guide, userId) {
  if (!guide || !userId) return false;
  return guide.authorId === userId || isModeratorOrAdmin(userId);
}

// ---------------------------------------------------------------------
// guide storage
// ---------------------------------------------------------------------

function getAllGuides() {
  return readJson(GUIDES_KEY, []);
}

function saveAllGuides(guides) {
  writeJson(GUIDES_KEY, guides);
}

function findGuideIndex(guides, guideId) {
  return guides.findIndex((guide) => guide.id === guideId);
}

function requireGuide(guides, guideId) {
  const index = findGuideIndex(guides, guideId);
  if (index === -1) {
    const error = new Error(`Guide not found: ${guideId}`);
    error.code = 'guides/not-found';
    throw error;
  }
  return index;
}

/**
 * Builds a GuideVersion snapshot.
 */
function makeVersion({ title, content, editedBy, note }) {
  return {
    id: makeId('ver'),
    title,
    content,
    editedBy,
    editedAt: nowIso(),
    note: note || ''
  };
}

// ---------------------------------------------------------------------
// CRUD
// ---------------------------------------------------------------------

/**
 * Creates a new guide as a draft with an initial version.
 * @param {{destinationSlug: string, destinationName: string, title: string, content: string, authorId: string, authorName: string}} input
 */
export function createGuide({ destinationSlug, destinationName, title, content, authorId, authorName }) {
  if (!authorId) throw permissionError('You must be signed in to create a guide.');
  if (!title || !title.trim()) throw new Error('Guide title is required.');
  if (!content || !content.trim()) throw new Error('Guide content is required.');

  const guides = getAllGuides();
  const initialVersion = makeVersion({ title, content, editedBy: authorId, note: 'Initial draft' });

  const guide = {
    id: makeId('guide'),
    destinationSlug: destinationSlug || 'general',
    destinationName: destinationName || 'General',
    title,
    content,
    status: STATUS.DRAFT,
    authorId,
    authorName: authorName || authorId,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    versions: [initialVersion],
    currentVersionId: initialVersion.id,
    publishedVersionId: null,
    moderation: { reviewerId: null, reviewedAt: null, note: '' },
    ratings: {}, // userId -> 1..5
    reports: []  // { id, reporterId, reason, note, createdAt, resolved, resolution }
  };

  guides.push(guide);
  saveAllGuides(guides);
  return guide;
}

/** Lists guides, optionally filtered by status and/or destination. */
export function listGuides({ status, destinationSlug } = {}) {
  return getAllGuides()
    .filter((guide) => (status ? guide.status === status : true))
    .filter((guide) => (destinationSlug ? guide.destinationSlug === destinationSlug : true))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function getGuide(guideId) {
  return getAllGuides().find((guide) => guide.id === guideId) || null;
}

/**
 * Edits a guide's title/content. This appends a new version and, if the
 * guide was already published, moves it back to 'pending' so the edit can
 * be reviewed — the previously published version remains what's shown
 * publicly (via publishedVersionId) until the new one is approved.
 */
export function updateGuide(guideId, { title, content, note }, editorId) {
  const guides = getAllGuides();
  const index = requireGuide(guides, guideId);
  const guide = guides[index];

  if (!canEditGuide(guide, editorId)) {
    throw permissionError('You do not have permission to edit this guide.');
  }

  const nextTitle = title && title.trim() ? title : guide.title;
  const nextContent = content && content.trim() ? content : guide.content;

  const version = makeVersion({ title: nextTitle, content: nextContent, editedBy: editorId, note });

  guide.versions.push(version);
  guide.currentVersionId = version.id;
  guide.title = nextTitle;
  guide.content = nextContent;
  guide.updatedAt = nowIso();

  if (guide.status === STATUS.PUBLISHED) {
    guide.status = STATUS.PENDING;
  } else if (guide.status === STATUS.REJECTED) {
    guide.status = STATUS.PENDING;
  }

  guides[index] = guide;
  saveAllGuides(guides);
  return guide;
}

/** Author submits a draft (or rejected guide) for moderation. */
export function submitForReview(guideId, actorId) {
  const guides = getAllGuides();
  const index = requireGuide(guides, guideId);
  const guide = guides[index];

  if (!canEditGuide(guide, actorId)) {
    throw permissionError('You do not have permission to submit this guide.');
  }
  if (![STATUS.DRAFT, STATUS.REJECTED].includes(guide.status)) {
    throw new Error(`Guide must be a draft or rejected to submit, got '${guide.status}'.`);
  }

  guide.status = STATUS.PENDING;
  guide.updatedAt = nowIso();
  guides[index] = guide;
  saveAllGuides(guides);
  return guide;
}

/** Author (or moderator) can pull a guide back into drafting. */
export function unpublishToDraft(guideId, actorId) {
  const guides = getAllGuides();
  const index = requireGuide(guides, guideId);
  const guide = guides[index];

  if (!canEditGuide(guide, actorId)) {
    throw permissionError('You do not have permission to modify this guide.');
  }

  guide.status = STATUS.DRAFT;
  guide.updatedAt = nowIso();
  guides[index] = guide;
  saveAllGuides(guides);
  return guide;
}

export function deleteGuide(guideId, actorId) {
  const guides = getAllGuides();
  const index = requireGuide(guides, guideId);
  const guide = guides[index];

  if (!canEditGuide(guide, actorId)) {
    throw permissionError('You do not have permission to delete this guide.');
  }

  guides.splice(index, 1);
  saveAllGuides(guides);
  return true;
}

// ---------------------------------------------------------------------
// version history
// ---------------------------------------------------------------------

export function getVersionHistory(guideId) {
  const guide = getGuide(guideId);
  if (!guide) return [];
  // Versions are always appended in chronological order, so reversing
  // (rather than sorting by timestamp) gives correct newest-first order
  // even when two edits land in the same millisecond.
  return [...guide.versions].reverse();
}

/**
 * Restores a previous version as the current content of the guide.
 * This creates a *new* version (so history is never destroyed) whose
 * content matches the restored one. If the actor is a moderator/admin,
 * the guide is republished immediately; otherwise it goes to 'pending'
 * like any other edit.
 */
export function restoreVersion(guideId, versionId, actorId) {
  const guides = getAllGuides();
  const index = requireGuide(guides, guideId);
  const guide = guides[index];

  if (!canEditGuide(guide, actorId)) {
    throw permissionError('You do not have permission to restore versions on this guide.');
  }

  const target = guide.versions.find((version) => version.id === versionId);
  if (!target) {
    const error = new Error(`Version not found: ${versionId}`);
    error.code = 'guides/version-not-found';
    throw error;
  }

  const restored = makeVersion({
    title: target.title,
    content: target.content,
    editedBy: actorId,
    note: `Restored from version ${versionId}`
  });

  guide.versions.push(restored);
  guide.currentVersionId = restored.id;
  guide.title = restored.title;
  guide.content = restored.content;
  guide.updatedAt = nowIso();

  if (isModeratorOrAdmin(actorId)) {
    guide.status = STATUS.PUBLISHED;
    guide.publishedVersionId = restored.id;
    guide.moderation = { reviewerId: actorId, reviewedAt: nowIso(), note: 'Restored by moderator' };
  } else {
    guide.status = STATUS.PENDING;
  }

  guides[index] = guide;
  saveAllGuides(guides);
  return guide;
}

// ---------------------------------------------------------------------
// moderation
// ---------------------------------------------------------------------

export function listPendingGuides() {
  return listGuides({ status: STATUS.PENDING });
}

export function approveGuide(guideId, reviewerId, note = '') {
  const guides = getAllGuides();
  const index = requireGuide(guides, guideId);
  const guide = guides[index];

  if (!isModeratorOrAdmin(reviewerId)) {
    throw permissionError('Only moderators or admins can approve guides.');
  }
  if (guide.status !== STATUS.PENDING) {
    throw new Error(`Only pending guides can be approved, got '${guide.status}'.`);
  }

  guide.status = STATUS.PUBLISHED;
  guide.publishedVersionId = guide.currentVersionId;
  guide.moderation = { reviewerId, reviewedAt: nowIso(), note };
  guide.updatedAt = nowIso();

  guides[index] = guide;
  saveAllGuides(guides);
  return guide;
}

export function rejectGuide(guideId, reviewerId, note = '') {
  const guides = getAllGuides();
  const index = requireGuide(guides, guideId);
  const guide = guides[index];

  if (!isModeratorOrAdmin(reviewerId)) {
    throw permissionError('Only moderators or admins can reject guides.');
  }
  if (guide.status !== STATUS.PENDING) {
    throw new Error(`Only pending guides can be rejected, got '${guide.status}'.`);
  }

  guide.status = STATUS.REJECTED;
  guide.moderation = { reviewerId, reviewedAt: nowIso(), note };
  guide.updatedAt = nowIso();

  guides[index] = guide;
  saveAllGuides(guides);
  return guide;
}

// ---------------------------------------------------------------------
// ratings
// ---------------------------------------------------------------------

export function rateGuide(guideId, userId, stars) {
  const value = Number(stars);
  if (!userId) throw permissionError('You must be signed in to rate a guide.');
  if (!Number.isInteger(value) || value < 1 || value > 5) {
    throw new Error('Rating must be an integer between 1 and 5.');
  }

  const guides = getAllGuides();
  const index = requireGuide(guides, guideId);
  const guide = guides[index];

  guide.ratings[userId] = value;
  guides[index] = guide;
  saveAllGuides(guides);
  return getRatingSummary(guide);
}

export function getRatingSummary(guide) {
  const values = Object.values(guide.ratings || {});
  const count = values.length;
  const average = count ? values.reduce((sum, value) => sum + value, 0) / count : 0;
  return { average: Math.round(average * 10) / 10, count };
}

// ---------------------------------------------------------------------
// reporting
// ---------------------------------------------------------------------

export function reportGuide(guideId, reporterId, reason, note = '') {
  if (!reporterId) throw permissionError('You must be signed in to report a guide.');
  if (!reason || !reason.trim()) throw new Error('A reason is required to report a guide.');

  const guides = getAllGuides();
  const index = requireGuide(guides, guideId);
  const guide = guides[index];

  const report = {
    id: makeId('report'),
    reporterId,
    reason,
    note,
    createdAt: nowIso(),
    resolved: false,
    resolution: null
  };

  guide.reports.push(report);
  guides[index] = guide;
  saveAllGuides(guides);
  return report;
}

export function listOpenReports() {
  return getAllGuides()
    .flatMap((guide) => guide.reports
      .filter((report) => !report.resolved)
      .map((report) => ({ ...report, guideId: guide.id, guideTitle: guide.title })))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function resolveReport(guideId, reportId, reviewerId, resolution = 'dismissed') {
  if (!isModeratorOrAdmin(reviewerId)) {
    throw permissionError('Only moderators or admins can resolve reports.');
  }

  const guides = getAllGuides();
  const index = requireGuide(guides, guideId);
  const guide = guides[index];

  const report = guide.reports.find((item) => item.id === reportId);
  if (!report) {
    const error = new Error(`Report not found: ${reportId}`);
    error.code = 'guides/report-not-found';
    throw error;
  }

  report.resolved = true;
  report.resolution = resolution;
  report.reviewerId = reviewerId;
  report.reviewedAt = nowIso();

  guides[index] = guide;
  saveAllGuides(guides);
  return report;
}

// ---------------------------------------------------------------------
// exported constants
// ---------------------------------------------------------------------

export const GUIDE_STATUS = STATUS;
export const USER_ROLES = ROLES;
