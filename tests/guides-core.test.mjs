// tests/guides-core.test.mjs
//
// Zero-dependency test suite for guides-core.mjs.
// The repo has no test framework installed (package-lock.json has no
// packages), so this file provides its own tiny runner + localStorage
// shim and can be run directly with:
//
//   node tests/guides-core.test.mjs
//
// It exits with a non-zero code if any assertion fails, so it's CI-friendly.

import assert from 'node:assert/strict';

// ---- minimal localStorage shim for Node ----
class MemoryStorage {
  constructor() { this._data = new Map(); }
  getItem(key) { return this._data.has(key) ? this._data.get(key) : null; }
  setItem(key, value) { this._data.set(key, String(value)); }
  removeItem(key) { this._data.delete(key); }
  clear() { this._data.clear(); }
}

globalThis.window = globalThis.window || {};
globalThis.window.localStorage = new MemoryStorage();

const guides = await import('../guides-core.mjs');

const tests = [];
function test(name, fn) { tests.push({ name, fn }); }

function resetStorage() {
  globalThis.window.localStorage.clear();
}

// ---------------------------------------------------------------------
// CRUD
// ---------------------------------------------------------------------

test('createGuide requires an author, title, and content', () => {
  resetStorage();
  assert.throws(() => guides.createGuide({ title: 'x', content: 'y', authorId: null }));
  assert.throws(() => guides.createGuide({ title: '', content: 'y', authorId: 'u1' }));
  assert.throws(() => guides.createGuide({ title: 'x', content: '', authorId: 'u1' }));
});

test('createGuide starts as a draft with one version', () => {
  resetStorage();
  const guide = guides.createGuide({
    destinationSlug: 'goa', destinationName: 'Goa',
    title: 'Beaches of Goa', content: 'Visit Baga beach at sunset.',
    authorId: 'u1', authorName: 'Alice'
  });
  assert.equal(guide.status, guides.GUIDE_STATUS.DRAFT);
  assert.equal(guide.versions.length, 1);
  assert.equal(guide.currentVersionId, guide.versions[0].id);
  assert.equal(guide.publishedVersionId, null);
});

test('listGuides filters by status and destination', () => {
  resetStorage();
  guides.createGuide({ destinationSlug: 'goa', title: 'A', content: 'a', authorId: 'u1' });
  guides.createGuide({ destinationSlug: 'kerala', title: 'B', content: 'b', authorId: 'u1' });
  assert.equal(guides.listGuides({ destinationSlug: 'goa' }).length, 1);
  assert.equal(guides.listGuides({ status: guides.GUIDE_STATUS.DRAFT }).length, 2);
  assert.equal(guides.listGuides({ status: guides.GUIDE_STATUS.PUBLISHED }).length, 0);
});

// ---------------------------------------------------------------------
// permissions
// ---------------------------------------------------------------------

test('only the author or a moderator/admin can edit a guide', () => {
  resetStorage();
  const guide = guides.createGuide({ title: 'A', content: 'a', authorId: 'u1' });
  assert.throws(() => guides.updateGuide(guide.id, { content: 'hacked' }, 'u2'), { code: 'guides/permission-denied' });

  guides.bootstrapFirstAdmin('mod1');
  const updated = guides.updateGuide(guide.id, { content: 'edited by mod' }, 'mod1');
  assert.equal(updated.content, 'edited by mod');
});

test('bootstrapFirstAdmin only works once', () => {
  resetStorage();
  assert.equal(guides.bootstrapFirstAdmin('admin1'), true);
  assert.equal(guides.bootstrapFirstAdmin('admin2'), false);
  assert.equal(guides.getUserRole('admin1'), guides.USER_ROLES.ADMIN);
  assert.equal(guides.getUserRole('admin2'), guides.USER_ROLES.USER);
});

test('only admins can change roles', () => {
  resetStorage();
  guides.bootstrapFirstAdmin('admin1');
  assert.throws(() => guides.setUserRole('u2', 'u3', guides.USER_ROLES.MODERATOR), { code: 'guides/permission-denied' });
  guides.setUserRole('admin1', 'u3', guides.USER_ROLES.MODERATOR);
  assert.equal(guides.getUserRole('u3'), guides.USER_ROLES.MODERATOR);
});

// ---------------------------------------------------------------------
// moderation workflow
// ---------------------------------------------------------------------

test('submit -> approve moves a draft to published', () => {
  resetStorage();
  guides.bootstrapFirstAdmin('admin1');
  const guide = guides.createGuide({ title: 'A', content: 'a', authorId: 'u1' });

  guides.submitForReview(guide.id, 'u1');
  assert.equal(guides.getGuide(guide.id).status, guides.GUIDE_STATUS.PENDING);

  assert.throws(() => guides.approveGuide(guide.id, 'u1'), { code: 'guides/permission-denied' }); // non-moderator

  const approved = guides.approveGuide(guide.id, 'admin1', 'looks good');
  assert.equal(approved.status, guides.GUIDE_STATUS.PUBLISHED);
  assert.equal(approved.publishedVersionId, approved.currentVersionId);
});

test('submit -> reject moves a draft to rejected, and it can be resubmitted', () => {
  resetStorage();
  guides.bootstrapFirstAdmin('admin1');
  const guide = guides.createGuide({ title: 'A', content: 'a', authorId: 'u1' });

  guides.submitForReview(guide.id, 'u1');
  const rejected = guides.rejectGuide(guide.id, 'admin1', 'needs more detail');
  assert.equal(rejected.status, guides.GUIDE_STATUS.REJECTED);

  const resubmitted = guides.submitForReview(guide.id, 'u1');
  assert.equal(resubmitted.status, guides.GUIDE_STATUS.PENDING);
});

test('editing a published guide sends it back to pending without losing the live version', () => {
  resetStorage();
  guides.bootstrapFirstAdmin('admin1');
  const guide = guides.createGuide({ title: 'A', content: 'a', authorId: 'u1' });
  guides.submitForReview(guide.id, 'u1');
  const approved = guides.approveGuide(guide.id, 'admin1');
  const publishedVersionId = approved.publishedVersionId;

  const edited = guides.updateGuide(guide.id, { content: 'a new paragraph' }, 'u1');
  assert.equal(edited.status, guides.GUIDE_STATUS.PENDING);
  assert.equal(edited.publishedVersionId, publishedVersionId); // unchanged until re-approved
  assert.equal(edited.versions.length, 2);
});

// ---------------------------------------------------------------------
// version history / restore
// ---------------------------------------------------------------------

test('version history records every edit, most recent first', () => {
  resetStorage();
  const guide = guides.createGuide({ title: 'A', content: 'v1', authorId: 'u1' });
  guides.updateGuide(guide.id, { content: 'v2' }, 'u1');
  guides.updateGuide(guide.id, { content: 'v3' }, 'u1');

  const history = guides.getVersionHistory(guide.id);
  assert.equal(history.length, 3);
  assert.equal(history[0].content, 'v3');
  assert.equal(history[2].content, 'v1');
});

test('restoreVersion by the author re-queues the guide for moderation', () => {
  resetStorage();
  const guide = guides.createGuide({ title: 'A', content: 'v1', authorId: 'u1' });
  guides.updateGuide(guide.id, { content: 'v2' }, 'u1');
  const history = guides.getVersionHistory(guide.id);
  const v1 = history.find((version) => version.content === 'v1');

  const restored = guides.restoreVersion(guide.id, v1.id, 'u1');
  assert.equal(restored.content, 'v1');
  assert.equal(restored.status, guides.GUIDE_STATUS.PENDING);
  assert.equal(restored.versions.length, 3); // original two + the restore-as-new-version
});

test('restoreVersion by a moderator republishes immediately', () => {
  resetStorage();
  guides.bootstrapFirstAdmin('admin1');
  const guide = guides.createGuide({ title: 'A', content: 'v1', authorId: 'u1' });
  guides.updateGuide(guide.id, { content: 'v2' }, 'u1');
  const v1 = guides.getVersionHistory(guide.id).find((version) => version.content === 'v1');

  const restored = guides.restoreVersion(guide.id, v1.id, 'admin1');
  assert.equal(restored.status, guides.GUIDE_STATUS.PUBLISHED);
  assert.equal(restored.publishedVersionId, restored.currentVersionId);
});

// ---------------------------------------------------------------------
// ratings
// ---------------------------------------------------------------------

test('rateGuide validates range and averages correctly', () => {
  resetStorage();
  const guide = guides.createGuide({ title: 'A', content: 'a', authorId: 'u1' });
  assert.throws(() => guides.rateGuide(guide.id, 'u2', 0));
  assert.throws(() => guides.rateGuide(guide.id, 'u2', 6));

  guides.rateGuide(guide.id, 'u2', 4);
  guides.rateGuide(guide.id, 'u3', 5);
  const summary = guides.getRatingSummary(guides.getGuide(guide.id));
  assert.equal(summary.count, 2);
  assert.equal(summary.average, 4.5);

  // a user re-rating updates their existing rating rather than adding a new one
  guides.rateGuide(guide.id, 'u2', 2);
  const summary2 = guides.getRatingSummary(guides.getGuide(guide.id));
  assert.equal(summary2.count, 2);
  assert.equal(summary2.average, 3.5);
});

// ---------------------------------------------------------------------
// reporting
// ---------------------------------------------------------------------

test('reportGuide + resolveReport workflow', () => {
  resetStorage();
  guides.bootstrapFirstAdmin('admin1');
  const guide = guides.createGuide({ title: 'A', content: 'a', authorId: 'u1' });

  const report = guides.reportGuide(guide.id, 'u2', 'Outdated info', 'The temple closed in 2024');
  assert.equal(guides.listOpenReports().length, 1);

  assert.throws(() => guides.resolveReport(guide.id, report.id, 'u2', 'dismissed'), { code: 'guides/permission-denied' });

  guides.resolveReport(guide.id, report.id, 'admin1', 'edited');
  assert.equal(guides.listOpenReports().length, 0);
});

// ---------------------------------------------------------------------
// runner
// ---------------------------------------------------------------------

let passed = 0;
let failed = 0;

for (const { name, fn } of tests) {
  try {
    fn();
    passed += 1;
    console.log(`\u2713 ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`\u2717 ${name}`);
    console.error(`  ${error.message}`);
  }
}

console.log(`\n${passed} passed, ${failed} failed, ${tests.length} total`);
if (failed > 0) {
  process.exitCode = 1;
}
