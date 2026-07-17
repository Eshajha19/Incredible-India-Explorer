window.IIE = window.IIE || {};
(function() {
  'use strict';

  function initInteractiveMap() {
    const mapContainer = document.getElementById('map-container');
    const tooltip = document.getElementById('map-tooltip');
    const infoPanel = document.getElementById('quick-info-panel');
    const randomBtn = document.getElementById('btn-random-state');
    const viewMoreBtn = document.getElementById('btn-sidebar-view-more');

    const storyOverlay = document.getElementById('state-story-overlay');
    const overlayBackBtn = document.getElementById('state-story-back-btn');
    const overlayAudioBtn = document.getElementById('state-story-audio-btn');
    const overlayTitle = document.getElementById('state-story-title');
    const overlayCapital = document.getElementById('state-story-capital');
    const overlayMainText = document.getElementById('state-story-main-text');
    const highlightsGrid = document.getElementById('state-story-highlights-grid');
    const svgContainer = document.getElementById('state-svg-container');

    if (!mapContainer) return;
    mapContainer.innerHTML = '';

    const svgNamespace = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgNamespace, 'svg');
    svgElement.setAttribute('viewBox', mapData.viewBox);
    svgElement.setAttribute('class', 'india-svg-map');

    const gElement = document.createElementNS(svgNamespace, 'g');

    mapData.locations.forEach(loc => {
      const pathElement = document.createElementNS(svgNamespace, 'path');
      pathElement.setAttribute('d', loc.path);
      pathElement.setAttribute('id', `state-${loc.id}`);
      pathElement.setAttribute('data-id', loc.id);
      pathElement.setAttribute('data-name', loc.name);

      pathElement.addEventListener('mouseenter', (e) => {
        document.getElementById('tooltip-state-name').innerText = loc.name;
        document.getElementById('tooltip-capital').innerText = loc.capital;
        document.getElementById('tooltip-food').innerText = loc.food;
        document.getElementById('tooltip-festival').innerText = loc.festival;
        document.getElementById('tooltip-description').innerText = loc.description.substring(0, 120) + (loc.description.length > 120 ? '\u2026' : '');
        tooltip.style.opacity = '1';
      });

      pathElement.addEventListener('mousemove', (e) => {
        const tooltipW = 300;
        const tooltipH = tooltip.offsetHeight || 220;
        let x = e.clientX + 18;
        let y = e.clientY + 18;
        if (x + tooltipW > window.innerWidth) x = e.clientX - tooltipW - 12;
        if (y + tooltipH > window.innerHeight) y = e.clientY - tooltipH - 12;
        if (x < 4) x = 4;
        if (y < 4) y = 4;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
      });

      pathElement.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
      });

      pathElement.addEventListener('click', () => {
        document.querySelectorAll('.india-svg-map path').forEach(p => {
          p.classList.remove('highlighted-active');
        });
        pathElement.classList.add('highlighted-active');
        showStateDetails(loc);
      });

      gElement.appendChild(pathElement);
    });

    svgElement.appendChild(gElement);
    mapContainer.appendChild(svgElement);

    overlayBackBtn.addEventListener('click', closeOverlay);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeOverlay();
    });

    viewMoreBtn?.addEventListener('click', () => {
      const currentId = viewMoreBtn.getAttribute('data-active-id');
      window.location.href = `state.html?state=${currentId}`;
    });

    function showStateDetails(loc) {
      overlayTitle.innerText = loc.name;
      overlayCapital.innerText = loc.capital;

      const storyRaw = loc.story || loc.description;
      const paragraphs = storyRaw.split('\n\n').map(pText => `<p class="story-paragraph">${pText}</p>`).join('');
      overlayMainText.innerHTML = paragraphs;

      const firstPara = overlayMainText.querySelector('.story-paragraph');
      if (firstPara) firstPara.classList.add('drop-cap');

      highlightsGrid.innerHTML = `
              <div class="highlight-bullet"><span class="bullet-icon">\uD83D\uDCCD</span><span>Capital: ${loc.capital}</span></div>
              <div class="highlight-bullet"><span class="bullet-icon">\uD83C\uDF5B</span><span>Famous Food: ${loc.food}</span></div>
              <div class="highlight-bullet"><span class="bullet-icon">\uD83C\uDF89</span><span>Major Festival: ${loc.festival}</span></div>
          `;

      svgContainer.innerHTML = `
               <svg viewBox="${mapData.viewBox}" style="width: 80%; height: auto; max-height: 50vh; filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.5)); fill: var(--primary-gold);">
                   <path d="${loc.path}"></path>
               </svg>
           `;

      storyOverlay.className = 'story-overlay theme-default';
      storyOverlay.classList.add('open');

      infoPanel.className = "info-card active-state";
      const infoContent = document.getElementById('info-panel-content');
      if (infoContent) {
        infoContent.innerHTML = `
                  <div class="info-card-header">
                      <div class="icon-circle">\uD83D\uDCCD</div>
                      <h3>${loc.name}</h3>
                  </div>
                  <p class="info-card-text">
                      <strong>Capital:</strong> ${loc.capital}<br>
                      <strong>Famous Food:</strong> ${loc.food}<br>
                      <strong>Festival:</strong> ${loc.festival}
                  </p>
                  <p class="info-card-text" style="font-size: 0.95rem; margin-top: -15px;">
                      ${loc.description.substring(0, 110)}...
                  </p>
              `;
      }

      if (viewMoreBtn) {
        viewMoreBtn.classList.remove('hidden');
        viewMoreBtn.setAttribute('data-active-id', loc.id);
      }

      overlayAudioBtn.classList.remove('playing');
      overlayAudioBtn.innerHTML = '<span class="audio-icon">\uD83D\uDD0A</span> Listen to Soundscape';
      (window.IIE.Soundscape && window.IIE.Soundscape.stopSoundscape());

      overlayAudioBtn.onclick = () => {
        if (overlayAudioBtn.classList.contains('playing')) {
          overlayAudioBtn.classList.remove('playing');
          overlayAudioBtn.innerHTML = '<span class="audio-icon">\uD83D\uDD0A</span> Listen to Soundscape';
          (window.IIE.Soundscape && window.IIE.Soundscape.stopSoundscape());
        } else {
          overlayAudioBtn.classList.add('playing');
          overlayAudioBtn.innerHTML = '<span class="audio-icon">\uD83D\uDD07</span> Stop Soundscape';
          (window.IIE.Soundscape && window.IIE.Soundscape.playStateSoundscape(loc.name));
        }
      };

      (window.IIE.Nav && window.IIE.Nav.setupScrollReveals());
      spawnStateParticles();
    }

    function spawnStateParticles() {
      const particlesContainer = document.getElementById('state-canvas-particles');
      if (!particlesContainer) return;
      particlesContainer.innerHTML = '';
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'canvas-particle';
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = (Math.random() * 2) + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.background = 'rgba(255, 255, 255, 0.4)';
        particlesContainer.appendChild(particle);
      }
    }

    function closeOverlay() {
      storyOverlay.classList.remove('open');
      (window.IIE.Soundscape && window.IIE.Soundscape.stopSoundscape());
    }

    randomBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * mapData.locations.length);
      const randomLoc = mapData.locations[randomIndex];

      document.querySelectorAll('.india-svg-map path').forEach(p => {
        p.classList.remove('highlighted-active');
      });

      const pathEl = document.getElementById(`state-${randomLoc.id}`);
      if (pathEl) {
        pathEl.classList.add('highlighted-active');
        pathEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      showStateDetails(randomLoc);
    });
  }

  window.IIE.Map = { init: initInteractiveMap };
})();
