/**
 * frontend/offline-regions/script.js
 * UI layer for the Offline Region Downloads page. Talks only to
 * OfflineRegionService (js-modules/offline-region-service.js) — the
 * scoring-free manifest/diff/search logic lives in
 * js-modules/offline-region-engine.js.
 */
import { OfflineRegionService } from "../../js-modules/offline-region-service.js";
import { OfflineRegionEngine } from "../../js-modules/offline-region-engine.js";

const service = new OfflineRegionService({ rootPrefix: "../../" });

const grid = document.getElementById("region-grid");
const storageSummary = document.getElementById("offline-storage-summary");
const connectivityBadge = document.getElementById("offline-connectivity");
const connectivityLabel = document.getElementById("offline-connectivity-label");
const searchInput = document.getElementById("offline-search-input");
const searchResultsEl = document.getElementById("offline-search-results");

const inProgress = new Set();

function renderConnectivity(isOnline) {
  connectivityBadge.classList.toggle("offline", !isOnline);
  connectivityLabel.textContent = isOnline ? "Online" : "Offline — showing downloaded regions";
}

function statusLabel(status) {
  return { "not-downloaded": "Not downloaded", downloaded: "Downloaded", "update-available": "Update available", unavailable: "Unavailable" }[status] || status;
}

function actionButtonsFor(entry, status) {
  if (status === "not-downloaded") {
    return `<button class="primary" data-action="download" data-region="${entry.id}">Download</button>`;
  }
  if (status === "update-available") {
    return `
      <button class="primary" data-action="download" data-region="${entry.id}">Update</button>
      <button data-action="delete" data-region="${entry.id}">Delete</button>`;
  }
  if (status === "downloaded") {
    return `<button data-action="delete" data-region="${entry.id}">Delete</button>`;
  }
  return "";
}

function renderRegionCard({ entry, record, status }) {
  const card = document.createElement("div");
  card.className = "region-card";
  card.dataset.regionId = entry.id;

  const highlightList = record
    ? "" // Full destination list rendered after loading region JSON (see hydrateDownloadedDetails).
    : "";

  card.innerHTML = `
    <img src="${service.resolvePath(entry.heroImage)}" alt="${entry.state}" loading="lazy" />
    <div class="region-card-body">
      <span class="region-status-badge ${status}" data-status-badge>${statusLabel(status)}</span>
      <div class="region-card-title">${entry.state}</div>
      <div class="region-card-meta">${entry.destinationCount} destination${entry.destinationCount === 1 ? "" : "s"}${record ? ` · ${OfflineRegionEngine.formatBytes(record.sizeBytes)}` : ""}</div>
      <div class="region-progress-track" data-progress-track><div class="region-progress-fill" data-progress-fill></div></div>
      <ul class="region-destination-list" data-destination-list>${highlightList}</ul>
      <div class="region-card-actions" data-actions>${actionButtonsFor(entry, status)}</div>
    </div>
  `;
  return card;
}

async function hydrateDownloadedDetails(card, entry) {
  const data = await service.fetchRegionData(entry.id);
  if (!data) return;
  const list = card.querySelector("[data-destination-list]");
  list.innerHTML = data.destinations.slice(0, 4).map((d) => `<li>${d.name}</li>`).join("");
}

async function renderAllRegions() {
  const regions = await service.listRegionsWithStatus();
  grid.innerHTML = "";
  for (const region of regions) {
    const card = renderRegionCard(region);
    grid.appendChild(card);
    if (region.status === "downloaded" || region.status === "update-available") {
      hydrateDownloadedDetails(card, region.entry);
    }
  }
  await renderStorageSummary(regions);
}

async function renderStorageSummary(regions) {
  const records = regions.map((r) => r.record).filter(Boolean);
  const total = OfflineRegionEngine.totalStorageUsed(records);
  storageSummary.textContent = `${OfflineRegionEngine.formatBytes(total)} used across ${records.length} region${records.length === 1 ? "" : "s"}`;
}

function setCardStatus(regionId, status, extraLabel) {
  const card = grid.querySelector(`[data-region-id="${regionId}"]`);
  if (!card) return;
  const badge = card.querySelector("[data-status-badge]");
  badge.className = `region-status-badge ${status}`;
  badge.textContent = extraLabel || statusLabel(status);
}

function setCardProgress(regionId, completed, total) {
  const card = grid.querySelector(`[data-region-id="${regionId}"]`);
  if (!card) return;
  const track = card.querySelector("[data-progress-track]");
  const fill = card.querySelector("[data-progress-fill]");
  track.classList.add("active");
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  fill.style.width = `${pct}%`;
}

async function handleDownload(regionId) {
  if (inProgress.has(regionId)) return;
  inProgress.add(regionId);
  setCardStatus(regionId, "downloading", "Downloading…");
  try {
    await service.downloadRegion(regionId);
  } catch (err) {
    setCardStatus(regionId, "not-downloaded", "Download failed — tap to retry");
    console.error(err);
  } finally {
    inProgress.delete(regionId);
    await renderAllRegions();
  }
}

async function handleDelete(regionId) {
  await service.deleteRegion(regionId);
  await renderAllRegions();
}

grid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const regionId = button.getAttribute("data-region");
  const action = button.getAttribute("data-action");
  if (action === "download") handleDownload(regionId);
  if (action === "delete") handleDelete(regionId);
});

service.onProgress((event) => {
  if (event.type === "REGION_DOWNLOAD_PROGRESS") {
    setCardProgress(event.regionId, event.completed, event.total);
  }
  if (event.type === "REGION_DOWNLOAD_COMPLETE") {
    setCardStatus(event.regionId, "downloaded");
  }
});

service.onConnectivityChange(renderConnectivity);

// --------------------------------------------------------------------
// Offline search
// --------------------------------------------------------------------

let searchDebounce = null;
searchInput.addEventListener("input", () => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(runSearch, 250);
});

async function runSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    searchResultsEl.innerHTML = "";
    return;
  }
  const results = await service.searchDownloaded(query);
  if (results.length === 0) {
    searchResultsEl.innerHTML = '<p class="offline-empty-note" style="padding:12px 0;">No matches in your downloaded regions.</p>';
    return;
  }
  searchResultsEl.innerHTML = results
    .map(
      (r) => `
      <div class="offline-search-result">
        <div>${r.destination.name}</div>
        <div class="osr-region">${r.regionId}</div>
      </div>`
    )
    .join("");
}

// --------------------------------------------------------------------
// Init
// --------------------------------------------------------------------

renderConnectivity(service.isOnline());
renderAllRegions();
