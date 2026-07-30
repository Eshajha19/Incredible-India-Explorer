/* Issue #864 — Preference Dashboard logic */

import { InteractionTracker } from '../../js-modules/interaction-tracker.js';
import { AdaptivePreferenceEngine } from '../../js-modules/adaptive-preference-engine.js';
import { AdaptiveRecommender } from '../../js-modules/adaptive-recommend.js';

const tracker = new InteractionTracker();

// Falls back to an empty catalog if the travel dataset script hasn't been
// included on this page — the dashboard should still render (with a cold
// start message) rather than throw.
const destinations = (typeof window !== 'undefined' && window.TRAVEL_DESTINATIONS) || [];

const engine = new AdaptivePreferenceEngine({ destinations });
const recommender = new AdaptiveRecommender(destinations);

const confidenceFill = document.getElementById('confidence-fill');
const confidenceLabel = document.getElementById('confidence-label');
const topTagsList = document.getElementById('top-tags-list');
const budgetAffinityEl = document.getElementById('budget-affinity');
const signalCountEl = document.getElementById('signal-count');
const recommendationList = document.getElementById('recommendation-list');
const resetBtn = document.getElementById('reset-btn');

function render() {
  const events = tracker.getEvents();
  const profile = engine.buildProfile(events);

  const confidencePct = Math.round(profile.confidence * 100);
  confidenceFill.style.width = `${confidencePct}%`;
  confidenceLabel.textContent = AdaptivePreferenceEngine.isColdStart(profile)
    ? `Just getting started (${confidencePct}%) — browse, bookmark, or rate a few destinations to sharpen this.`
    : `${confidencePct}% confident — recommendations below are personalized to you.`;

  const topTags = AdaptivePreferenceEngine.getTopTags(profile, 5);
  topTagsList.innerHTML = topTags.length
    ? topTags.map((tag) => `<li class="tag-pill">${tag}</li>`).join('')
    : '<li class="tag-pill tag-pill--empty">No strong interests learned yet</li>';

  const preferredBudget = AdaptivePreferenceEngine.getPreferredBudget(profile);
  budgetAffinityEl.textContent = preferredBudget
    ? `You tend to plan ${preferredBudget}-tier trips.`
    : 'Not enough data yet.';

  signalCountEl.textContent = `${profile.eventCount} recorded interaction${profile.eventCount === 1 ? '' : 's'}.`;

  const recommendations = recommender.recommend({ profile, limit: 6 });
  recommendationList.innerHTML = recommendations
    .map(
      ({ dest, explanation }) => `
      <div class="rec-item">
        <h3>${dest.name}</h3>
        <p class="rec-item__tagline">${dest.tagline || ''}</p>
        <p class="rec-item__explanation">💡 ${explanation}</p>
      </div>`
    )
    .join('') || '<p>Add a few destinations to the travel dataset to see recommendations here.</p>';
}

resetBtn.addEventListener('click', () => {
  const confirmed = confirm('Reset your learned preference profile? This cannot be undone.');
  if (!confirmed) return;
  tracker.clearEvents();
  render();
});

render();
