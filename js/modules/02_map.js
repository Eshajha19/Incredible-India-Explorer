import { mapData } from '../data/mapData.js';

/* ==========================================================================
   2. INTERACTIVE INDIA MAP
   ========================================================================== */

export function initInteractiveMap() {
    const mapContainer = document.getElementById('map-container');
    const tooltip = document.getElementById('map-tooltip');
    const infoPanel = document.getElementById('quick-info-panel');
    const randomBtn = document.getElementById('btn-random-state');
    const viewMoreBtn = document.getElementById('btn-sidebar-view-more');

    // Overlay Selectors
    const storyOverlay = document.getElementById('state-story-overlay');
    const overlayBackBtn = document.getElementById('state-story-back-btn');
    const overlayAudioBtn = document.getElementById('state-story-audio-btn');
    const overlayTitle = document.getElementById('state-story-title');
    const overlayCapital = document.getElementById('state-story-capital');
    const overlayMainText = document.getElementById('state-story-main-text');
    const highlightsGrid = document.getElementById('state-story-highlights-grid');
    const svgContainer = document.getElementById('state-svg-container');

    // Clear loader
    if (!mapContainer) return;
    mapContainer.innerHTML = '';

    // Create SVG element
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgNamespace, 'svg');
    svgElement.setAttribute('viewBox', mapData.viewBox);
    svgElement.setAttribute('class', 'india-svg-map');

    // Create group for paths
    const gElement = document.createElementNS(svgNamespace, 'g');

    // Render paths
    mapData.locations.forEach(loc => {
        const pathElement = document.createElementNS(svgNamespace, 'path');
        pathElement.setAttribute('d', loc.path);
        pathElement.setAttribute('id', `state-${loc.id}`);
        pathElement.setAttribute('data-id', loc.id);
        pathElement.setAttribute('data-name', loc.name);

        // Hover effect listeners — rich tooltip
        pathElement.addEventListener('mouseenter', (e) => {
            document.getElementById('tooltip-state-name').innerText = loc.name;
            document.getElementById('tooltip-capital').innerText = loc.capital;
            document.getElementById('tooltip-food').innerText = loc.food;
            document.getElementById('tooltip-festival').innerText = loc.festival;
            document.getElementById('tooltip-description').innerText = loc.description.substring(0, 120) + (loc.description.length > 120 ? '…' : '');
            tooltip.style.opacity = '1';
        });

        pathElement.addEventListener('mousemove', (e) => {
            const tooltipW = 300;
            const tooltipH = tooltip.offsetHeight || 220;
            let x = e.clientX + 18;
            let y = e.clientY + 18;
            // Keep tooltip within viewport bounds
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

        // Click interaction listener
        pathElement.addEventListener('click', () => {
            // Remove highlight from other paths
            document.querySelectorAll('.india-svg-map path').forEach(p => {
                p.classList.remove('highlighted-active');
            });

            // Highlight current
            pathElement.classList.add('highlighted-active');

            // Open state modal
            showStateDetails(loc);
        });

        gElement.appendChild(pathElement);
    });

    svgElement.appendChild(gElement);
    mapContainer.appendChild(svgElement);

    // Overlay Close Triggers
    overlayBackBtn.addEventListener('click', closeOverlay);

    // ESC key closes overlay
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeOverlay();
    });

    // View More Button Trigger - Navigate to individual state page
    viewMoreBtn?.addEventListener('click', () => {
        const currentId = viewMoreBtn.getAttribute('data-active-id');
        window.location.href = `states/${currentId}.html`;
    });

    // Helper functions
    function showStateDetails(loc) {
        // Set Details
        overlayTitle.innerText = loc.name;
        overlayCapital.innerText = loc.capital;

        // Format story text as paragraph lines
        const storyRaw = loc.story || loc.description;
        const paragraphs = storyRaw.split('\\n\\n').map(pText => `<p class="story-paragraph">${pText}</p>`).join('');
        overlayMainText.innerHTML = paragraphs;

        // Reapply Drop Cap on first paragraph
        const firstPara = overlayMainText.querySelector('.story-paragraph');
        if (firstPara) firstPara.classList.add('drop-cap');

        // Set up highlights
        highlightsGrid.innerHTML = `
            <div class="highlight-bullet"><span class="bullet-icon">ðŸ“</span><span>Capital: ${loc.capital}</span></div>
            <div class="highlight-bullet"><span class="bullet-icon">ðŸ›</span><span>Famous Food: ${loc.food}</span></div>
            <div class="highlight-bullet"><span class="bullet-icon">ðŸŽ‰</span><span>Major Festival: ${loc.festival}</span></div>
        `;

        // Render SVG in canvas
        svgContainer.innerHTML = `
             <svg viewBox="${mapData.viewBox}" style="width: 80%; height: auto; max-height: 50vh; filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.5)); fill: var(--primary-gold);">
                 <path d="${loc.path}"></path>
             </svg>
         `;

        // Set dynamic theme class based on region or just a default vibrant state theme
        storyOverlay.className = 'story-overlay theme-default';

        // Open Overlay
        storyOverlay.classList.add('open');

        // Update Quick Info Sidebar Panel
        infoPanel.className = "info-card active-state";
        const infoContent = document.getElementById('info-panel-content');
        if (infoContent) {
            infoContent.innerHTML = `
                <div class="info-card-header">
                    <div class="icon-circle">ðŸ“</div>
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

        // Bind audio button
        overlayAudioBtn.classList.remove('playing');
        overlayAudioBtn.innerHTML = '<span class="audio-icon">ðŸ”Š</span> Listen to Soundscape';
        stopSoundscape();

        overlayAudioBtn.onclick = () => {
            if (overlayAudioBtn.classList.contains('playing')) {
                overlayAudioBtn.classList.remove('playing');
                overlayAudioBtn.innerHTML = '<span class="audio-icon">ðŸ”Š</span> Listen to Soundscape';
                stopSoundscape();
            } else {
                overlayAudioBtn.classList.add('playing');
                overlayAudioBtn.innerHTML = '<span class="audio-icon">ðŸ”‡</span> Stop Soundscape';
                playStateSoundscape(loc.name);
            }
        };

        setupScrollReveals();
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
        stopSoundscape();
    }

    // Explore Random State Action
    randomBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * mapData.locations.length);
        const randomLoc = mapData.locations[randomIndex];

        // Remove previous highlight
        document.querySelectorAll('.india-svg-map path').forEach(p => {
            p.classList.remove('highlighted-active');
        });

        // Trigger path element selection
        const pathEl = document.getElementById(`state-${randomLoc.id}`);
        if (pathEl) {
            pathEl.classList.add('highlighted-active');
            pathEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Show details
        showStateDetails(randomLoc);
    });
}



// Attach to window for global inline HTML handlers
window.initInteractiveMap = initInteractiveMap;
