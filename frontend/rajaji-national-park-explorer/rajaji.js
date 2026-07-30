/**
 * Rajaji National Park Explorer — Interactive Logic
 * Handles DOM rendering, theme toggling, and interactive map/gallery features.
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    renderQuickStats();
    renderHistory();
    renderWildlife();
    renderBirdSpecies();
    renderRivers();
    renderSafariOptions();
    renderInteractiveMap();
    renderGalleryGrid();
    bindEvents();
  });

  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }
  }

  function bindEvents() {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeBtn.textContent = isLight ? '🌙' : '☀️';
      });
    }

    const lbClose = document.getElementById('lightbox-close');
    if (lbClose) lbClose.addEventListener('click', closeLightbox);

    const lbModal = document.getElementById('lightbox-modal');
    if (lbModal) {
      lbModal.addEventListener('click', function(e) {
        if (e.target === lbModal) closeLightbox();
      });
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function renderQuickStats() {
    const container = document.getElementById('stats-grid');
    if (!container || typeof RAJAJI_INFO === 'undefined') return;

    let html = '';
    RAJAJI_INFO.quickStats.forEach(function(st) {
      html += `
        <div class="glass-card stat-card">
          <div class="stat-icon">${st.icon}</div>
          <span class="stat-value">${st.value}</span>
          <span class="stat-label">${st.label}</span>
        </div>`;
    });
    container.innerHTML = html;
  }

  function renderHistory() {
    const container = document.getElementById('history-timeline');
    if (!container || typeof HISTORY === 'undefined') return;

    let html = '';
    HISTORY.forEach(function(item) {
      html += `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="glass-card">
            <div style="font-weight:800; font-size:1.2rem; color:var(--rajaji-accent-bright); margin-bottom:0.4rem;">${item.year}</div>
            <h4 style="margin-bottom:0.5rem;">${item.title}</h4>
            <p style="font-size:0.92rem; color:var(--rajaji-muted); line-height:1.6;">${item.description}</p>
          </div>
        </div>`;
    });
    container.innerHTML = html;
  }

  function renderWildlife() {
    const container = document.getElementById('wildlife-grid');
    if (!container || typeof WILDLIFE === 'undefined') return;

    let html = '';
    WILDLIFE.forEach(function(w) {
      html += `
        <div class="glass-card wildlife-card">
          <img src="${w.image}" alt="${w.name}" loading="lazy" onerror="this.style.display='none'">
          <h3 style="font-size:1.3rem; margin-bottom:0.2rem;">${w.icon} ${w.name}</h3>
          <div style="font-style:italic; font-size:0.85rem; color:var(--rajaji-accent-bright); margin-bottom:0.8rem;">${w.scientificName}</div>
          <span style="display:inline-block; padding:0.2rem 0.6rem; background:rgba(220,38,38,0.2); color:#f87171; border-radius:999px; font-size:0.75rem; font-weight:700; margin-bottom:0.8rem;">${w.status}</span>
          <p style="font-size:0.9rem; color:var(--rajaji-muted); line-height:1.5;">${w.description}</p>
        </div>`;
    });
    container.innerHTML = html;
  }

  function renderBirdSpecies() {
    const container = document.getElementById('birds-grid');
    if (!container || typeof BIRD_SPECIES === 'undefined') return;

    let html = '';
    BIRD_SPECIES.forEach(function(b) {
      html += `
        <div class="glass-card bird-card">
          <img src="${b.image}" alt="${b.name}" loading="lazy" onerror="this.style.display='none'">
          <h3 style="font-size:1.2rem; margin-bottom:0.2rem;">${b.icon} ${b.name}</h3>
          <div style="font-style:italic; font-size:0.82rem; color:var(--rajaji-accent-bright); margin-bottom:0.8rem;">${b.scientificName}</div>
          <p style="font-size:0.88rem; color:var(--rajaji-muted); line-height:1.5;">${b.description}</p>
        </div>`;
    });
    container.innerHTML = html;
  }

  function renderRivers() {
    const container = document.getElementById('rivers-grid');
    if (!container || typeof RIVERS === 'undefined') return;

    let html = '';
    RIVERS.forEach(function(r) {
      html += `
        <div class="glass-card" style="border-left: 4px solid var(--rajaji-accent);">
          <h3 style="font-size:1.2rem; margin-bottom:0.5rem; color:var(--rajaji-accent-bright);">💧 ${r.name}</h3>
          <p style="font-size:0.9rem; color:var(--rajaji-muted); line-height:1.5;">${r.description}</p>
        </div>`;
    });
    container.innerHTML = html;
  }

  function renderSafariOptions() {
    const container = document.getElementById('safari-grid');
    if (!container || typeof SAFARI_OPTIONS === 'undefined') return;

    let html = '';
    SAFARI_OPTIONS.forEach(function(s) {
      let highlightsHtml = s.highlights.map(h => `<li>✨ <span>${h}</span></li>`).join('');
      html += `
        <div class="glass-card">
          <h3 style="font-size:1.4rem; color:var(--rajaji-accent-bright); margin-bottom:0.5rem;">${s.title}</h3>
          <p style="font-size:0.9rem; color:var(--rajaji-muted); margin-bottom:1rem;">${s.description}</p>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:0.85rem;">
            <div><strong>⏱ Duration:</strong> ${s.duration}</div>
            <div><strong>🕐 Timings:</strong> ${s.timing}</div>
            <div><strong>💰 Cost:</strong> ${s.cost}</div>
            <div><strong>👥 Capacity:</strong> ${s.capacity}</div>
          </div>
          <ul style="list-style:none; padding:0; margin-top:1rem; font-size:0.85rem; color:var(--rajaji-muted);">
            ${highlightsHtml}
          </ul>
        </div>`;
    });
    container.innerHTML = html;
  }

  function renderInteractiveMap() {
    const container = document.getElementById('map-hotspots-layer');
    const infoPopup = document.getElementById('map-info-popup');
    if (!container || typeof MAP_HOTSPOTS === 'undefined') return;

    let html = '';
    MAP_HOTSPOTS.forEach(function(spot) {
      const icon = spot.category === 'gate' ? '🚪' : spot.category === 'water' ? '💧' : '📍';
      html += `<button type="button" class="map-hotspot-pin" style="left:${spot.x}%; top:${spot.y}%;" data-spot-id="${spot.id}" aria-label="${spot.name}">${icon}</button>`;
    });
    container.innerHTML = html;

    container.querySelectorAll('.map-hotspot-pin').forEach(function(pin) {
      pin.addEventListener('click', function() {
        const spot = MAP_HOTSPOTS.find(s => s.id === pin.dataset.spotId);
        if (spot && infoPopup) {
          infoPopup.innerHTML = `<h4 style="color:var(--rajaji-accent-bright); margin-bottom:0.3rem;">${spot.name}</h4><p style="font-size:0.85rem; color:var(--rajaji-muted);">${spot.description}</p>`;
          infoPopup.classList.remove('hidden');
        }
      });
    });
  }

  function renderGalleryGrid() {
    const container = document.getElementById('gallery-grid');
    if (!container || typeof GALLERY_IMAGES === 'undefined') return;

    let html = '';
    GALLERY_IMAGES.forEach(function(img, idx) {
      html += `
        <div class="gallery-item" data-idx="${idx}">
          <img class="gallery-img" src="${img.url}" alt="${img.title}" loading="lazy">
          <div class="gallery-overlay">
            <h4 style="margin-bottom:0.2rem;">${img.title}</h4>
            <p style="font-size:0.8rem; opacity:0.9;">${img.caption}</p>
          </div>
        </div>`;
    });
    container.innerHTML = html;

    container.querySelectorAll('.gallery-item').forEach(function(item) {
      item.addEventListener('click', function() {
        openLightbox(parseInt(item.dataset.idx, 10));
      });
    });
  }

  function openLightbox(idx) {
    if (typeof GALLERY_IMAGES === 'undefined' || !GALLERY_IMAGES[idx]) return;
    const modal = document.getElementById('lightbox-modal');
    const imgEl = document.getElementById('lightbox-img');
    const capEl = document.getElementById('lightbox-caption');
    if (!modal || !imgEl || !capEl) return;

    imgEl.src = GALLERY_IMAGES[idx].url;
    capEl.textContent = GALLERY_IMAGES[idx].title + ' — ' + GALLERY_IMAGES[idx].caption;
    modal.classList.remove('hidden');
  }

  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.classList.add('hidden');
  }
})();
