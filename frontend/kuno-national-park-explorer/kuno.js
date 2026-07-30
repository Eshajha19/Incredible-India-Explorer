/**
 * Kuno National Park Explorer — Interactive Logic
 * Handles DOM rendering, theme toggling, and interactive map/gallery features.
 * Uses an IIFE to prevent global scope pollution.
 */

(function() {
  'use strict';

  // Wait for DOM to be fully loaded before executing
  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    renderQuickStats();
    renderHistory();
    renderCheetahProject();
    renderWildlife();
    renderHabitat();
    renderInteractiveMap();
    renderGalleryGrid();
    bindEvents();
  });

  /**
   * Initializes the theme based on localStorage or defaults to dark mode.
   */
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }
  }

  /**
   * Binds event listeners for theme toggle, lightbox, and keyboard navigation.
   */
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
    if (!container || typeof KUNO_INFO === 'undefined') return;

    let html = '';
    KUNO_INFO.quickStats.forEach(function(st) {
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
    if (!container || typeof KUNO_INFO === 'undefined') return;

    // Using KUNO_INFO for basic history since it's a newer park, focusing on establishment
    const historyData = [
      { year: "1981", title: "Sanctuary Notified", description: "Declared a wildlife sanctuary to protect the dry deciduous forests and prey base." },
      { year: "2018", title: "National Park", description: "Upgraded to a National Park, paving the way for its selection as the cheetah reintroduction site." }
    ];

    let html = '';
    historyData.forEach(function(item) {
      html += `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="glass-card">
            <div style="font-weight:800; font-size:1.2rem; color:var(--kuno-accent-bright); margin-bottom:0.4rem;">${item.year}</div>
            <h4 style="margin-bottom:0.5rem;">${item.title}</h4>
            <p style="font-size:0.92rem; color:var(--kuno-muted); line-height:1.6;">${item.description}</p>
          </div>
        </div>`;
    });
    container.innerHTML = html;
  }

  function renderCheetahProject() {
    const container = document.getElementById('conservation-box');
    if (!container || typeof CHEETAH_PROJECT === 'undefined') return;

    const milestonesHtml = CHEETAH_PROJECT.milestones.map(m => `<li><strong>${m.year}:</strong> ${m.event}</li>`).join('');

    container.innerHTML = `
      <h3 style="font-size:1.5rem; color:var(--kuno-accent-bright); margin-bottom:0.5rem;">${CHEETAH_PROJECT.title}</h3>
      <p style="line-height:1.7; margin-bottom:1rem;">${CHEETAH_PROJECT.description}</p>
      <h4 style="margin-top:1.5rem; margin-bottom:0.5rem;">Key Milestones:</h4>
      <ul class="milestones-list">${milestonesHtml}</ul>
    `;
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
          <div style="font-style:italic; font-size:0.85rem; color:var(--kuno-accent-bright); margin-bottom:0.8rem;">${w.scientificName}</div>
          <span style="display:inline-block; padding:0.2rem 0.6rem; background:rgba(220,38,38,0.2); color:#f87171; border-radius:999px; font-size:0.75rem; font-weight:700; margin-bottom:0.8rem;">${w.status}</span>
          <p style="font-size:0.9rem; color:var(--kuno-muted); line-height:1.5;">${w.description}</p>
        </div>`;
    });
    container.innerHTML = html;
  }

  function renderHabitat() {
    const container = document.getElementById('habitat-grid');
    if (!container || typeof HABITAT === 'undefined') return;

    let html = '';
    HABITAT.forEach(function(h) {
      html += `
        <div class="glass-card habitat-card" style="border-left: 4px solid var(--kuno-accent);">
          <h3 style="font-size:1.2rem; margin-bottom:0.5rem; color:var(--kuno-accent-bright);">🌾 ${h.type}</h3>
          <p style="font-size:0.9rem; color:var(--kuno-muted); line-height:1.5;">${h.description}</p>
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
          infoPopup.innerHTML = `<h4 style="color:var(--kuno-accent-bright); margin-bottom:0.3rem;">${spot.name}</h4><p style="font-size:0.85rem; color:var(--kuno-muted);">${spot.description}</p>`;
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
