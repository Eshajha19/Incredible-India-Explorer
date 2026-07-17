// guides.js
//
// UI wiring for the Community Travel Guides feature (issue #187).
// Vanilla JS, no framework/build step — matches the rest of this repo.
// Reads `document.body.dataset.page` to decide which screen to render:
//   "guides"      -> browse list + guide detail (community-guides.html)
//   "editor"      -> create/edit form (guide-editor.html)
//   "moderation"  -> admin/moderator dashboard (guide-moderation.html)

import { authApi } from './auth-core.mjs';
import * as Guides from './guides-core.mjs';

// ---------------------------------------------------------------------
// small shared helpers
// ---------------------------------------------------------------------

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value == null ? '' : String(value);
  return div.innerHTML;
}

/**
 * Very small HTML allowlist sanitizer for guide content coming out of the
 * contenteditable editor. There is no server in this project to sanitize
 * on the way in, so we do it here before ever writing content to
 * localStorage or back into innerHTML.
 */
function sanitizeGuideHtml(dirtyHtml) {
  const allowedTags = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'UL', 'OL', 'LI', 'BR', 'P', 'H3', 'A', 'DIV']);
  const template = document.createElement('template');
  template.innerHTML = dirtyHtml || '';

  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        if (!allowedTags.has(child.tagName)) {
          const text = document.createTextNode(child.textContent);
          child.replaceWith(text);
          return;
        }
        [...child.attributes].forEach((attr) => {
          if (child.tagName === 'A' && attr.name === 'href') {
            if (!/^https?:\/\//i.test(attr.value)) child.removeAttribute('href');
            else child.setAttribute('rel', 'noopener noreferrer');
          } else {
            child.removeAttribute(attr.name);
          }
        });
        walk(child);
      } else if (child.nodeType !== Node.TEXT_NODE) {
        child.remove();
      }
    });
  };

  walk(template.content);
  return template.innerHTML.trim();
}

function toPlainExcerpt(html, maxLength = 140) {
  const div = document.createElement('div');
  div.innerHTML = html || '';
  const text = (div.textContent || '').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  } catch (error) {
    return iso;
  }
}

function statusLabel(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

let currentUser = authApi.getStoredAuthUser();
authApi.subscribeToAuthChanges((user) => { currentUser = user; });

function requireSignedIn() {
  if (!currentUser) {
    showToast('Please sign in to do that.', true);
    return false;
  }
  return true;
}

function showToast(message, isError = false) {
  document.querySelectorAll('.toast').forEach((el) => el.remove());
  const toast = document.createElement('div');
  toast.className = `toast${isError ? ' error' : ''}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ---------------------------------------------------------------------
// page: community-guides.html (list + detail)
// ---------------------------------------------------------------------

function renderGuidesPage() {
  const root = document.getElementById('guides-root');
  if (!root) return;

  const hashMatch = window.location.hash.match(/^#\/guide\/(.+)$/);
  if (hashMatch) {
    renderGuideDetail(root, hashMatch[1]);
  } else {
    renderGuideList(root);
  }
}

function renderGuideList(root) {
  const guides = Guides.listGuides({ status: Guides.GUIDE_STATUS.PUBLISHED });

  root.innerHTML = `
    <div class="guides-header">
      <div>
        <h1>Community Travel Guides</h1>
        <p class="guides-subtitle">Local tips and destination guides written by fellow travellers.</p>
      </div>
      <div class="guides-toolbar">
        <input type="text" id="guide-search" placeholder="Search guides…" />
        <a class="btn-guide btn-guide-primary" href="guide-editor.html">+ Write a guide</a>
      </div>
    </div>
    <div class="guides-grid" id="guides-grid"></div>
  `;

  const grid = root.querySelector('#guides-grid');
  const searchInput = root.querySelector('#guide-search');

  function paint(filterText = '') {
    const filtered = guides.filter((guide) => {
      const haystack = `${guide.title} ${guide.destinationName}`.toLowerCase();
      return haystack.includes(filterText.toLowerCase());
    });

    if (!filtered.length) {
      grid.innerHTML = '<p class="guides-empty">No published guides yet — be the first to write one!</p>';
      return;
    }

    grid.innerHTML = filtered.map((guide) => {
      const summary = Guides.getRatingSummary(guide);
      return `
        <article class="guide-card" data-guide-id="${escapeHtml(guide.id)}">
          <span class="guide-destination">${escapeHtml(guide.destinationName)}</span>
          <h3>${escapeHtml(guide.title)}</h3>
          <p class="guide-excerpt">${escapeHtml(toPlainExcerpt(guide.content))}</p>
          <div class="guide-meta-row">
            <span>By ${escapeHtml(guide.authorName)}</span>
            <span>${summary.count ? `★ ${summary.average} (${summary.count})` : 'No ratings yet'}</span>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('.guide-card').forEach((card) => {
      card.addEventListener('click', () => {
        window.location.hash = `#/guide/${card.dataset.guideId}`;
      });
    });
  }

  paint();
  searchInput.addEventListener('input', (event) => paint(event.target.value));
}

function renderGuideDetail(root, guideId) {
  const guide = Guides.getGuide(guideId);

  if (!guide) {
    root.innerHTML = '<p class="guides-empty">This guide could not be found. <a href="community-guides.html">Back to guides</a></p>';
    return;
  }
  if (guide.status !== Guides.GUIDE_STATUS.PUBLISHED && guide.authorId !== currentUser?.uid && !Guides.isModeratorOrAdmin(currentUser?.uid)) {
    root.innerHTML = '<p class="guides-empty">This guide is not published yet.</p>';
    return;
  }

  const summary = Guides.getRatingSummary(guide);
  const userRating = currentUser ? (guide.ratings[currentUser.uid] || 0) : 0;
  const canEdit = currentUser && (guide.authorId === currentUser.uid || Guides.isModeratorOrAdmin(currentUser.uid));

  root.innerHTML = `
    <a href="community-guides.html" class="btn-guide btn-guide-secondary" style="margin-bottom:20px;">← Back to guides</a>
    <div class="guide-detail-header">
      <span class="guide-status-badge status-${guide.status}">${escapeHtml(statusLabel(guide.status))}</span>
      <span class="guide-destination">${escapeHtml(guide.destinationName)}</span>
      <h1>${escapeHtml(guide.title)}</h1>
      <p class="version-meta">By ${escapeHtml(guide.authorName)} · Updated ${formatDate(guide.updatedAt)}</p>
    </div>
    <div class="guide-detail-body">${sanitizeGuideHtml(guide.content)}</div>

    <div class="guide-actions-row">
      <div class="guide-rating" id="guide-rating" data-guide-id="${escapeHtml(guide.id)}">
        ${[1, 2, 3, 4, 5].map((n) => `<span class="star${n <= userRating ? ' filled' : ''}" data-value="${n}">★</span>`).join('')}
        <span class="version-meta">${summary.count ? `${summary.average} average (${summary.count} ratings)` : 'No ratings yet'}</span>
      </div>
      <button class="btn-guide btn-guide-secondary" id="report-btn">🚩 Report this guide</button>
      ${canEdit ? `<a class="btn-guide btn-guide-primary" href="guide-editor.html?id=${escapeHtml(guide.id)}">Edit guide</a>` : ''}
      ${canEdit ? `<a class="btn-guide btn-guide-secondary" href="#/guide/${escapeHtml(guide.id)}/history" id="history-link">Version history</a>` : ''}
    </div>

    ${window.location.hash.endsWith('/history') ? renderHistorySection(guide) : ''}
  `;

  root.querySelector('#guide-rating').addEventListener('click', (event) => {
    const star = event.target.closest('.star');
    if (!star) return;
    if (!requireSignedIn()) return;
    try {
      Guides.rateGuide(guide.id, currentUser.uid, Number(star.dataset.value));
      renderGuideDetail(root, guideId);
      showToast('Thanks for rating this guide!');
    } catch (error) {
      showToast(error.message, true);
    }
  });

  root.querySelector('#report-btn').addEventListener('click', () => {
    if (!requireSignedIn()) return;
    openReportModal(guide.id);
  });

  const historyLink = root.querySelector('#history-link');
  if (historyLink) {
    historyLink.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.hash = window.location.hash.endsWith('/history')
        ? `#/guide/${guide.id}`
        : `#/guide/${guide.id}/history`;
      renderGuideDetail(root, guideId);
    });
  }

  root.querySelectorAll('.restore-btn').forEach((button) => {
    button.addEventListener('click', () => {
      if (!requireSignedIn()) return;
      try {
        Guides.restoreVersion(guide.id, button.dataset.versionId, currentUser.uid);
        showToast('Version restored.');
        renderGuideDetail(root, guideId);
      } catch (error) {
        showToast(error.message, true);
      }
    });
  });
}

function renderHistorySection(guide) {
  const history = Guides.getVersionHistory(guide.id);
  return `
    <h2 class="guide-section-title">Version history</h2>
    <div class="version-list">
      ${history.map((version) => `
        <div class="version-item">
          <div class="version-item-row">
            <strong>${escapeHtml(version.title)}</strong>
            ${version.id !== guide.currentVersionId ? `<button class="btn-guide btn-guide-secondary restore-btn" data-version-id="${escapeHtml(version.id)}">Restore this version</button>` : '<span class="guide-status-badge status-published">Current</span>'}
          </div>
          <span class="version-meta">Edited by ${escapeHtml(version.editedBy)} on ${formatDate(version.editedAt)}${version.note ? ` — ${escapeHtml(version.note)}` : ''}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function openReportModal(guideId) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <h3>Report this guide</h3>
      <select id="report-reason">
        <option value="Outdated information">Outdated information</option>
        <option value="Inaccurate / misleading">Inaccurate / misleading</option>
        <option value="Spam or promotional">Spam or promotional</option>
        <option value="Offensive content">Offensive content</option>
        <option value="Other">Other</option>
      </select>
      <textarea id="report-note" placeholder="Add any details that would help a moderator (optional)"></textarea>
      <div class="modal-actions">
        <button class="btn-guide btn-guide-secondary" id="report-cancel">Cancel</button>
        <button class="btn-guide btn-guide-primary" id="report-submit">Submit report</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#report-cancel').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#report-submit').addEventListener('click', () => {
    const reason = overlay.querySelector('#report-reason').value;
    const note = overlay.querySelector('#report-note').value;
    try {
      Guides.reportGuide(guideId, currentUser.uid, reason, note);
      showToast('Thanks — a moderator will take a look.');
    } catch (error) {
      showToast(error.message, true);
    }
    overlay.remove();
  });
}

// ---------------------------------------------------------------------
// page: guide-editor.html
// ---------------------------------------------------------------------

function renderEditorPage() {
  const root = document.getElementById('editor-root');
  if (!root) return;

  if (!currentUser) {
    root.innerHTML = '<p class="guides-empty">Please <a href="login.html">sign in</a> to write or edit a guide.</p>';
    return;
  }

  const guideId = qs('id');
  const existing = guideId ? Guides.getGuide(guideId) : null;

  if (guideId && !existing) {
    root.innerHTML = '<p class="guides-empty">Guide not found.</p>';
    return;
  }
  if (existing && !(existing.authorId === currentUser.uid || Guides.isModeratorOrAdmin(currentUser.uid))) {
    root.innerHTML = '<p class="guides-empty">You do not have permission to edit this guide.</p>';
    return;
  }

  root.innerHTML = `
    <div class="guides-header">
      <div>
        <h1>${existing ? 'Edit guide' : 'Write a new guide'}</h1>
        <p class="guides-subtitle">${existing ? 'Changes are saved as a new version and reviewed before going live.' : 'Share a destination tip — it will be reviewed by a moderator before publishing.'}</p>
      </div>
    </div>
    <form class="guide-editor-form" id="guide-form">
      <div>
        <label for="guide-destination">Destination</label>
        <input type="text" id="guide-destination" placeholder="e.g. Jaipur, Rajasthan" value="${escapeHtml(existing?.destinationName || '')}" required />
      </div>
      <div>
        <label for="guide-title">Guide title</label>
        <input type="text" id="guide-title" placeholder="e.g. A first-timer's guide to the Pink City" value="${escapeHtml(existing?.title || '')}" required />
      </div>
      <div>
        <label for="guide-content-area">Content</label>
        <div class="editor-toolbar">
          <button type="button" data-cmd="bold"><b>B</b></button>
          <button type="button" data-cmd="italic"><i>I</i></button>
          <button type="button" data-cmd="insertUnorderedList">• List</button>
          <button type="button" data-cmd="insertOrderedList">1. List</button>
        </div>
        <div class="editor-content-area" id="guide-content-area" contenteditable="true">${sanitizeGuideHtml(existing?.content || '')}</div>
        <p class="form-hint">Tip: select text and use the toolbar for basic formatting.</p>
      </div>
      <p class="form-error" id="form-error"></p>
      <div class="editor-actions">
        <a class="btn-guide btn-guide-secondary" href="community-guides.html">Cancel</a>
        <button type="button" class="btn-guide btn-guide-secondary" id="save-draft-btn">Save as draft</button>
        <button type="button" class="btn-guide btn-guide-primary" id="submit-btn">${existing ? 'Save & submit for review' : 'Submit for review'}</button>
      </div>
    </form>
  `;

  root.querySelectorAll('.editor-toolbar button').forEach((button) => {
    button.addEventListener('click', () => {
      document.execCommand(button.dataset.cmd, false, null);
      root.querySelector('#guide-content-area').focus();
    });
  });

  function readForm() {
    return {
      destinationName: root.querySelector('#guide-destination').value.trim(),
      title: root.querySelector('#guide-title').value.trim(),
      content: sanitizeGuideHtml(root.querySelector('#guide-content-area').innerHTML)
    };
  }

  function slugify(value) {
    return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'general';
  }

  root.querySelector('#save-draft-btn').addEventListener('click', () => {
    const form = readForm();
    const errorEl = root.querySelector('#form-error');
    errorEl.textContent = '';
    try {
      if (existing) {
        Guides.updateGuide(existing.id, { title: form.title, content: form.content, note: 'Draft update' }, currentUser.uid);
        Guides.unpublishToDraft(existing.id, currentUser.uid);
        showToast('Draft saved.');
      } else {
        const guide = Guides.createGuide({
          destinationSlug: slugify(form.destinationName),
          destinationName: form.destinationName,
          title: form.title,
          content: form.content,
          authorId: currentUser.uid,
          authorName: currentUser.displayName
        });
        window.location.href = `guide-editor.html?id=${guide.id}`;
        return;
      }
    } catch (error) {
      errorEl.textContent = error.message;
    }
  });

  root.querySelector('#submit-btn').addEventListener('click', () => {
    const form = readForm();
    const errorEl = root.querySelector('#form-error');
    errorEl.textContent = '';
    try {
      let guide = existing;
      if (guide) {
        guide = Guides.updateGuide(guide.id, { title: form.title, content: form.content, note: 'Submitted for review' }, currentUser.uid);
        if (guide.status === Guides.GUIDE_STATUS.DRAFT) {
          guide = Guides.submitForReview(guide.id, currentUser.uid);
        }
      } else {
        guide = Guides.createGuide({
          destinationSlug: slugify(form.destinationName),
          destinationName: form.destinationName,
          title: form.title,
          content: form.content,
          authorId: currentUser.uid,
          authorName: currentUser.displayName
        });
        guide = Guides.submitForReview(guide.id, currentUser.uid);
      }
      showToast('Guide submitted for review!');
      window.location.hash = `#/guide/${guide.id}`;
      window.location.href = 'community-guides.html#/guide/' + guide.id;
    } catch (error) {
      errorEl.textContent = error.message;
    }
  });
}

// ---------------------------------------------------------------------
// page: guide-moderation.html
// ---------------------------------------------------------------------

function renderModerationPage() {
  const root = document.getElementById('moderation-root');
  if (!root) return;

  if (!currentUser) {
    root.innerHTML = '<p class="moderation-guard">Please <a href="login.html">sign in</a> to access moderation.</p>';
    return;
  }

  // Demo bootstrap: the first person to visit this page with no admin
  // configured yet becomes the admin, so the workflow is testable without
  // a real backend. See guides-core.mjs -> bootstrapFirstAdmin().
  Guides.bootstrapFirstAdmin(currentUser.uid);

  if (!Guides.isModeratorOrAdmin(currentUser.uid)) {
    root.innerHTML = '<p class="moderation-guard">You need moderator or admin access to view this page.</p>';
    return;
  }

  root.innerHTML = `
    <div class="guides-header">
      <div>
        <h1>Guide moderation</h1>
        <p class="guides-subtitle">Review pending guides and open reports.</p>
      </div>
    </div>
    <div class="moderation-tabs">
      <button class="moderation-tab active" data-tab="pending">Pending guides</button>
      <button class="moderation-tab" data-tab="reports">Reports</button>
    </div>
    <div id="moderation-content"></div>
  `;

  const content = root.querySelector('#moderation-content');

  function paintPending() {
    const pending = Guides.listPendingGuides();
    if (!pending.length) {
      content.innerHTML = '<p class="guides-empty">Nothing waiting for review 🎉</p>';
      return;
    }
    content.innerHTML = `<div class="moderation-list">${pending.map((guide) => `
      <div class="moderation-item" data-guide-id="${escapeHtml(guide.id)}">
        <div class="moderation-item-row">
          <strong>${escapeHtml(guide.title)}</strong>
          <span class="guide-status-badge status-pending">Pending</span>
        </div>
        <span class="version-meta">${escapeHtml(guide.destinationName)} · by ${escapeHtml(guide.authorName)} · updated ${formatDate(guide.updatedAt)}</span>
        <p class="guide-excerpt">${escapeHtml(toPlainExcerpt(guide.content, 220))}</p>
        <div class="moderation-item-row">
          <a class="btn-guide btn-guide-secondary" href="community-guides.html#/guide/${escapeHtml(guide.id)}">Preview</a>
          <div style="display:flex;gap:10px;">
            <button class="btn-guide btn-guide-danger reject-btn">Reject</button>
            <button class="btn-guide btn-guide-primary approve-btn">Approve</button>
          </div>
        </div>
      </div>
    `).join('')}</div>`;

    content.querySelectorAll('.approve-btn').forEach((button) => {
      button.addEventListener('click', (event) => {
        const guideId = event.target.closest('.moderation-item').dataset.guideId;
        Guides.approveGuide(guideId, currentUser.uid);
        showToast('Guide approved and published.');
        paintPending();
      });
    });
    content.querySelectorAll('.reject-btn').forEach((button) => {
      button.addEventListener('click', (event) => {
        const guideId = event.target.closest('.moderation-item').dataset.guideId;
        const note = window.prompt('Reason for rejecting (shown to the author):', '') || '';
        Guides.rejectGuide(guideId, currentUser.uid, note);
        showToast('Guide rejected.');
        paintPending();
      });
    });
  }

  function paintReports() {
    const reports = Guides.listOpenReports();
    if (!reports.length) {
      content.innerHTML = '<p class="guides-empty">No open reports.</p>';
      return;
    }
    content.innerHTML = `<div class="moderation-list">${reports.map((report) => `
      <div class="moderation-item" data-guide-id="${escapeHtml(report.guideId)}" data-report-id="${escapeHtml(report.id)}">
        <div class="moderation-item-row">
          <strong>${escapeHtml(report.guideTitle)}</strong>
          <span class="guide-status-badge status-rejected">${escapeHtml(report.reason)}</span>
        </div>
        <span class="version-meta">Reported ${formatDate(report.createdAt)}${report.note ? ` — ${escapeHtml(report.note)}` : ''}</span>
        <div class="moderation-item-row">
          <a class="btn-guide btn-guide-secondary" href="community-guides.html#/guide/${escapeHtml(report.guideId)}">View guide</a>
          <div style="display:flex;gap:10px;">
            <button class="btn-guide btn-guide-secondary dismiss-btn">Dismiss</button>
            <button class="btn-guide btn-guide-danger unpublish-btn">Unpublish guide</button>
          </div>
        </div>
      </div>
    `).join('')}</div>`;

    content.querySelectorAll('.dismiss-btn').forEach((button) => {
      button.addEventListener('click', (event) => {
        const item = event.target.closest('.moderation-item');
        Guides.resolveReport(item.dataset.guideId, item.dataset.reportId, currentUser.uid, 'dismissed');
        showToast('Report dismissed.');
        paintReports();
      });
    });
    content.querySelectorAll('.unpublish-btn').forEach((button) => {
      button.addEventListener('click', (event) => {
        const item = event.target.closest('.moderation-item');
        Guides.unpublishToDraft(item.dataset.guideId, currentUser.uid);
        Guides.resolveReport(item.dataset.guideId, item.dataset.reportId, currentUser.uid, 'guide-unpublished');
        showToast('Guide unpublished and report resolved.');
        paintReports();
      });
    });
  }

  root.querySelectorAll('.moderation-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      root.querySelectorAll('.moderation-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.dataset.tab === 'pending') paintPending();
      else paintReports();
    });
  });

  paintPending();
}

// ---------------------------------------------------------------------
// boot
// ---------------------------------------------------------------------

function boot() {
  const page = document.body.dataset.page;
  if (page === 'guides') {
    renderGuidesPage();
    window.addEventListener('hashchange', renderGuidesPage);
  } else if (page === 'editor') {
    renderEditorPage();
  } else if (page === 'moderation') {
    renderModerationPage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
