/* ==========================================================================
   INTERACTIVE INDIA MAP MODULE
   ========================================================================== */

function initInteractiveMap() {
    const mapContainer = document.getElementById('map-container');
    const tooltip = document.getElementById('map-tooltip');
    const infoPanel = document.getElementById('quick-info-panel');
    const randomBtn = document.getElementById('btn-random-state');
    const viewMoreBtn = document.getElementById('btn-sidebar-view-more');

    if (!mapContainer || typeof mapData === 'undefined') return;

    // Guard against duplicate binding
    if (mapContainer.dataset.listenerBound === "true") return;
    mapContainer.dataset.listenerBound = "true";

    // Overlay Selectors
    const storyOverlay = document.getElementById('state-story-overlay');
    const overlayBackBtn = document.getElementById('state-story-back-btn');
    const overlayAudioBtn = document.getElementById('state-story-audio-btn');
    const overlayTitle = document.getElementById('state-story-title');
    const overlayCapital = document.getElementById('state-story-capital');
    const overlayMainText = document.getElementById('state-story-main-text');
    const highlightsGrid = document.getElementById('state-story-highlights-grid');
    const svgContainer = document.getElementById('state-svg-container');

    let storyOverlayFocusTrap = null;
    let comparisonOverlayFocusTrap = null;

    // State Regions Map
    const stateRegions = {
        "an": "south", "ap": "south", "ar": "northeast", "as": "northeast", "br": "east",
        "ch": "north", "ct": "central", "dd": "west", "dl": "north", "dn": "west",
        "ga": "west", "gj": "west", "hp": "north", "hr": "north", "jh": "east",
        "jk": "north", "ka": "south", "kl": "south", "ld": "south", "mh": "west",
        "ml": "northeast", "mn": "northeast", "mp": "central", "mz": "northeast",
        "nl": "northeast", "or": "east", "pb": "north", "py": "south", "rj": "west",
        "sk": "northeast", "tg": "south", "tn": "south", "tr": "northeast", "up": "north",
        "ut": "north", "wb": "east"
    };

    // Clear loader
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

        // Keyboard Accessibility attributes
        pathElement.setAttribute('tabindex', '0');
        pathElement.setAttribute('role', 'button');
        pathElement.setAttribute('aria-label', loc.name);

        const showTooltip = () => {
            if (!tooltip) return;
            const tooltipStateName = document.getElementById('tooltip-state-name');
            const tooltipCapital = document.getElementById('tooltip-capital');
            const tooltipFood = document.getElementById('tooltip-food');
            const tooltipFestival = document.getElementById('tooltip-festival');
            const tooltipDesc = document.getElementById('tooltip-description');

            if (tooltipStateName) tooltipStateName.innerText = loc.name;
            if (tooltipCapital) tooltipCapital.innerText = loc.capital;
            if (tooltipFood) tooltipFood.innerText = loc.food;
            if (tooltipFestival) tooltipFestival.innerText = loc.festival;
            if (tooltipDesc) {
                tooltipDesc.innerText = loc.description.substring(0, 120) + (loc.description.length > 120 ? '…' : '');
            }
            tooltip.style.opacity = '1';
        };

        const hideTooltip = () => {
            if (tooltip) tooltip.style.opacity = '0';
        };

        // Hover effect listeners — rich tooltip
        pathElement.addEventListener('mouseenter', showTooltip);

        pathElement.addEventListener('mousemove', (e) => {
            if (!tooltip) return;
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

        pathElement.addEventListener('mouseleave', hideTooltip);

        // Keyboard focus and blur listeners
        pathElement.addEventListener('focus', () => {
            showTooltip();
            if (!tooltip) return;
            const rect = pathElement.getBoundingClientRect();
            const tooltipW = 300;
            const tooltipH = tooltip.offsetHeight || 220;
            let x = rect.left + window.scrollX + rect.width / 2;
            let y = rect.top + window.scrollY + rect.height / 2;
            if (x + tooltipW > window.innerWidth) x = rect.left + window.scrollX - tooltipW - 12;
            if (y + tooltipH > window.innerHeight) y = rect.top + window.scrollY - tooltipH - 12;
            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
        });

        pathElement.addEventListener('blur', hideTooltip);

        // Click interaction listener
        pathElement.addEventListener('click', () => {
            document.querySelectorAll('.india-svg-map path').forEach(p => {
                p.classList.remove('highlighted-active');
            });
            pathElement.classList.add('highlighted-active');
            showStateDetails(loc);
        });

        // Keydown listener for space/enter keys
        pathElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                pathElement.click();
            }
        });

        gElement.appendChild(pathElement);
    });

    svgElement.appendChild(gElement);
    mapContainer.appendChild(svgElement);

    // Bind Regional Filter Highlight events
    const filterButtons = document.querySelectorAll('#map-region-filter .map-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedRegion = btn.dataset.region;
            const paths = document.querySelectorAll('.india-svg-map path');

            paths.forEach(path => {
                const stateId = path.dataset.id;
                const region = stateRegions[stateId];

                if (selectedRegion === 'all') {
                    path.classList.remove('dimmed', 'highlighted-region');
                } else if (region === selectedRegion) {
                    path.classList.remove('dimmed');
                    path.classList.add('highlighted-region');
                } else {
                    path.classList.remove('highlighted-region');
                    path.classList.add('dimmed');
                }
            });
        });
    });

    // Populate State Comparison selectors
    const compareA = document.getElementById('compare-state-a');
    const compareB = document.getElementById('compare-state-b');
    const compareBtn = document.getElementById('btn-compare-states');
    const comparisonOverlay = document.getElementById('state-comparison-overlay');
    const comparisonBackBtn = document.getElementById('comparison-back-btn');

    if (compareA && compareB) {
        compareA.innerHTML = '<option value="" disabled selected>Select First State</option>';
        compareB.innerHTML = '<option value="" disabled selected>Select Second State</option>';

        const sortedLocations = [...mapData.locations].sort((a, b) => a.name.localeCompare(b.name));
        sortedLocations.forEach(loc => {
            const optA = document.createElement('option');
            optA.value = loc.id;
            optA.textContent = loc.name;
            compareA.appendChild(optA);

            const optB = document.createElement('option');
            optB.value = loc.id;
            optB.textContent = loc.name;
            compareB.appendChild(optB);
        });
    }

    if (compareBtn) {
        compareBtn.addEventListener('click', () => {
            const idA = compareA.value;
            const idB = compareB.value;

            if (!idA || !idB) {
                alert('Please select two states to compare!');
                return;
            }

            const stateA = mapData.locations.find(loc => loc.id === idA);
            const stateB = mapData.locations.find(loc => loc.id === idB);

            if (stateA && stateB) {
                showComparison(stateA, stateB);
            }
        });
    }

    if (comparisonBackBtn) {
        comparisonBackBtn.addEventListener('click', () => {
            if (comparisonOverlay) comparisonOverlay.classList.remove('open');
            if (comparisonOverlayFocusTrap) {
                comparisonOverlayFocusTrap.deactivate();
                comparisonOverlayFocusTrap = null;
            }
        });
    }

    const comparisonMetrics = {
        "an": { heritage: 7, cuisine: 8, access: 6, art: 7, fact: "Home to the historic British-era Cellular Jail and pristine Radhanagar Beach." },
        "ap": { heritage: 9, cuisine: 9, access: 8, art: 8, fact: "Famous for the richest temple in the world, Tirumala Venkateswara in Tirupati." },
        "ar": { heritage: 6, cuisine: 7, access: 5, art: 9, fact: "Houses India's largest Buddhist monastery in the high-altitude town of Tawang." },
        "as": { heritage: 8, cuisine: 8, access: 7, art: 8, fact: "Home of the endangered one-horned rhinoceros in Kaziranga National Park." },
        "br": { heritage: 10, cuisine: 7, access: 8, art: 9, fact: "The birthplace of Buddhism and the ancient international seat of Nalanda University." },
        "ch": { heritage: 7, cuisine: 8, access: 9, art: 6, fact: "India's first planned modernist city designed by architect Le Corbusier." },
        "ct": { heritage: 7, cuisine: 7, access: 6, art: 9, fact: "Known for the spectacular Chitrakote Falls, often called the Niagara of India." },
        "dd": { heritage: 7, cuisine: 8, access: 7, art: 6, fact: "Blends coastal Portuguese forts with modern beach tourism enclaves." },
        "dl": { heritage: 10, cuisine: 10, access: 10, art: 8, fact: "The historic capital of empires, containing Red Fort, Qutub Minar, and India Gate." },
        "dn": { heritage: 6, cuisine: 7, access: 7, art: 8, fact: "Known for scenic tribal enclaves and quiet Daman Ganga river walks." },
        "ga": { heritage: 8, cuisine: 9, access: 9, art: 7, fact: "World-famous for its golden sand beaches and UNESCO-listed Portuguese-era churches." },
        "gj": { heritage: 9, cuisine: 9, access: 9, art: 9, fact: "Features the world's tallest statue, Statue of Unity, and Gir Forest wildlife sanctuaries." },
        "hp": { heritage: 7, cuisine: 7, access: 7, art: 8, fact: "Known for breathtaking snowcapped valleys and Dharamshala, home of the Dalai Lama." },
        "hr": { heritage: 7, cuisine: 8, access: 9, art: 7, fact: "Mentioned heavily in ancient texts; contains the historic battlefield of Kurukshetra." },
        "jh": { heritage: 7, cuisine: 7, access: 7, art: 8, fact: "The mineral capital of India, rich in waterfalls and tribal traditions." },
        "jk": { heritage: 8, cuisine: 9, access: 7, art: 9, fact: "Often called 'Paradise on Earth', famous for Dal Lake houseboats and apple orchards." },
        "ka": { heritage: 10, cuisine: 9, access: 9, art: 9, fact: "Home to the glorious ruins of the Vijayanagara Empire in Hampi." },
        "kl": { heritage: 8, cuisine: 9, access: 8, art: 10, fact: "Called 'God's Own Country', famous for backwaters, Ayurveda, and Kathakali." },
        "ld": { heritage: 5, cuisine: 8, access: 5, art: 6, fact: "A coral archipelago featuring rich marine life and blue lagoons." },
        "mh": { heritage: 10, cuisine: 10, access: 10, art: 9, fact: "Home to the rock-cut masterpiece Ajanta and Ellora Caves." },
        "ml": { heritage: 6, cuisine: 8, access: 6, art: 8, fact: "Home of the cleanest village in Asia (Mawlynnong) and living root bridges." },
        "mn": { heritage: 6, cuisine: 7, access: 6, art: 9, fact: "Birthplace of Polo and home to Loktak, the world's only floating lake." },
        "mp": { heritage: 9, cuisine: 8, access: 8, art: 9, fact: "Known as the heart of India, featuring Khajuraho temples and tiger reserves." },
        "mz": { heritage: 5, cuisine: 7, access: 5, art: 8, fact: "Known for mist-covered hills and Bamboo Dance (Cheraw)." },
        "nl": { heritage: 6, cuisine: 7, access: 6, art: 9, fact: "Host of the world-famous Hornbill Festival, showcasing diverse tribal heritage." },
        "or": { heritage: 9, cuisine: 8, access: 8, art: 9, fact: "Famous for the Sun Temple in Konark and Jagannath Rath Yatra." },
        "pb": { heritage: 8, cuisine: 10, access: 9, art: 8, fact: "Contains the magnificent Golden Temple, the spiritual center of Sikhism." },
        "py": { heritage: 7, cuisine: 9, access: 8, art: 7, fact: "A scenic French-heritage enclave and home of the utopian city Auroville." },
        "rj": { heritage: 10, cuisine: 10, access: 9, art: 10, fact: "The land of kings, famous for massive desert hillforts and grand palaces." },
        "sk": { heritage: 7, cuisine: 8, access: 6, art: 8, fact: "India's first organic state, offering panoramic views of Mount Kanchenjunga." },
        "tg": { heritage: 9, cuisine: 9, access: 9, art: 8, fact: "Famous for Charminar, Hyderabadi Biryani, and Kakatiya architecture." },
        "tn": { heritage: 10, cuisine: 9, access: 9, art: 10, fact: "Home to the oldest surviving classical language, Tamil, and massive Gopuram temples." },
        "tr": { heritage: 7, cuisine: 7, access: 6, art: 8, fact: "Known for Neermahal, a spectacular water palace built in the center of Lake Rudrasagar." },
        "up": { heritage: 10, cuisine: 10, access: 9, art: 9, fact: "Contains the Taj Mahal, one of the Seven Wonders of the World, and holy Varanasi." },
        "ut": { heritage: 8, cuisine: 7, access: 8, art: 8, fact: "The Land of Gods, containing the Himalayan Valley of Flowers." },
        "wb": { heritage: 9, cuisine: 10, access: 9, art: 10, fact: "The cultural capital, home to Nobel laureate Rabindranath Tagore and Sundarbans." }
    };

    function showComparison(stateA, stateB) {
        const colA = document.getElementById('comparison-column-a');
        const colB = document.getElementById('comparison-column-b');

        const metricsA = comparisonMetrics[stateA.id] || { heritage: 7, cuisine: 7, access: 7, art: 7, fact: "" };
        const metricsB = comparisonMetrics[stateB.id] || { heritage: 7, cuisine: 7, access: 7, art: 7, fact: "" };

        function makeMeters(metrics) {
            return `
                <div style="margin-top:20px;">
                    <div style="margin-bottom:12px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px; font-weight:600; color:var(--muted-text);">
                            <span>Heritage Richness</span>
                            <span>${metrics.heritage}/10</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:var(--saffron); width:${metrics.heritage * 10}%; height:100%; border-radius:3px;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom:12px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px; font-weight:600; color:var(--muted-text);">
                            <span>Culinary Diversity</span>
                            <span>${metrics.cuisine}/10</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:var(--primary-gold); width:${metrics.cuisine * 10}%; height:100%; border-radius:3px;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom:12px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px; font-weight:600; color:var(--muted-text);">
                            <span>Tourist Access & Transit</span>
                            <span>${metrics.access}/10</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:#00f2fe; width:${metrics.access * 10}%; height:100%; border-radius:3px;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom:20px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px; font-weight:600; color:var(--muted-text);">
                            <span>Artistic Traditions</span>
                            <span>${metrics.art}/10</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:var(--green); width:${metrics.art * 10}%; height:100%; border-radius:3px;"></div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (colA && colB) {
            colA.innerHTML = `
                <h2 style="color:var(--primary-gold); margin-bottom:5px;">${stateA.name}</h2>
                <p style="color:var(--saffron); font-weight:600; margin-top:0; font-size:1.1rem;">🏛️ Capital: ${stateA.capital}</p>
                <div style="margin:20px 0; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:15px;">
                    <p style="color:var(--text-color); line-height:1.6; font-size: 0.95rem;">${stateA.description}</p>
                </div>
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">🍲 Famous Food</h4>
                <p style="margin-top:0; margin-bottom:20px; font-size: 0.95rem;">${stateA.food}</p>
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">🎉 Major Festival</h4>
                <p style="margin-top:0; margin-bottom:25px; font-size: 0.95rem;">${stateA.festival}</p>
                
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">📊 Metric Analysis</h4>
                ${makeMeters(metricsA)}
                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; margin-bottom:25px; font-size:0.9rem; line-height:1.5; color:var(--muted-text);">
                    <strong>Key Fact:</strong> ${metricsA.fact}
                </div>
                
                <button class="btn btn-primary" onclick="window.appRouter ? window.appRouter.handleRoute('state.html?state=${stateA.id}', true) : window.location.href='state.html?state=${stateA.id}'" style="font-size:0.9rem; padding:8px 18px;">Explore Full Page</button>
            `;

            colB.innerHTML = `
                <h2 style="color:var(--primary-gold); margin-bottom:5px;">${stateB.name}</h2>
                <p style="color:var(--saffron); font-weight:600; margin-top:0; font-size:1.1rem;">🏛️ Capital: ${stateB.capital}</p>
                <div style="margin:20px 0; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:15px;">
                    <p style="color:var(--text-color); line-height:1.6; font-size: 0.95rem;">${stateB.description}</p>
                </div>
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">🍲 Famous Food</h4>
                <p style="margin-top:0; margin-bottom:20px; font-size: 0.95rem;">${stateB.food}</p>
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">🎉 Major Festival</h4>
                <p style="margin-top:0; margin-bottom:25px; font-size: 0.95rem;">${stateB.festival}</p>
                
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">📊 Metric Analysis</h4>
                ${makeMeters(metricsB)}
                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; margin-bottom:25px; font-size:0.9rem; line-height:1.5; color:var(--muted-text);">
                    <strong>Key Fact:</strong> ${metricsB.fact}
                </div>
                
                <button class="btn btn-primary" onclick="window.appRouter ? window.appRouter.handleRoute('state.html?state=${stateB.id}', true) : window.location.href='state.html?state=${stateB.id}'" style="font-size:0.9rem; padding:8px 18px;">Explore Full Page</button>
            `;
        }

        if (comparisonOverlay) {
            comparisonOverlay.classList.add('open');
            if (typeof window.setupFocusTrap === 'function') {
                comparisonOverlayFocusTrap = window.setupFocusTrap(comparisonOverlay);
            }
        }
    }

    if (overlayBackBtn) overlayBackBtn.addEventListener('click', closeOverlay);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeOverlay();
            if (comparisonOverlay) comparisonOverlay.classList.remove('open');
            if (comparisonOverlayFocusTrap) {
                comparisonOverlayFocusTrap.deactivate();
                comparisonOverlayFocusTrap = null;
            }
        }
    });

    viewMoreBtn?.addEventListener('click', () => {
        const currentId = viewMoreBtn.getAttribute('data-active-id');
        const targetPath = `state.html?state=${currentId}`;
        if (window.appRouter && typeof window.appRouter.handleRoute === 'function') {
            window.appRouter.handleRoute(targetPath, true);
        } else {
            window.location.href = targetPath;
        }
    });

    function showStateDetails(loc) {
        if (overlayTitle) overlayTitle.innerText = loc.name;
        if (overlayCapital) overlayCapital.innerText = loc.capital;

        const storyRaw = loc.story || loc.description;
        const paragraphs = storyRaw.split('\\n\\n').map(pText => `<p class="story-paragraph">${pText}</p>`).join('');
        if (overlayMainText) {
            overlayMainText.innerHTML = paragraphs;
            const firstPara = overlayMainText.querySelector('.story-paragraph');
            if (firstPara) firstPara.classList.add('drop-cap');
        }

        if (highlightsGrid) {
            highlightsGrid.innerHTML = `
                <div class="highlight-bullet"><span class="bullet-icon">&#127963;</span><span>Capital: ${loc.capital}</span></div>
                <div class="highlight-bullet"><span class="bullet-icon">&#127835;</span><span>Famous Food: ${loc.food}</span></div>
                <div class="highlight-bullet"><span class="bullet-icon">&#127881;</span><span>Major Festival: ${loc.festival}</span></div>
            `;
        }

        if (svgContainer) {
            svgContainer.innerHTML = `
                 <svg viewBox="${mapData.viewBox}" style="width: 80%; height: auto; max-height: 50vh; filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.5)); fill: var(--primary-gold);">
                     <path d="${loc.path}"></path>
                 </svg>
             `;
        }

        if (storyOverlay) {
            storyOverlay.className = 'story-overlay theme-default';
            storyOverlay.classList.add('open');
            if (typeof window.setupFocusTrap === 'function') {
                storyOverlayFocusTrap = window.setupFocusTrap(storyOverlay);
            }
        }

        if (infoPanel) {
            infoPanel.className = "info-card active-state";
            const infoContent = document.getElementById('info-panel-content');
            if (infoContent) {
                infoContent.innerHTML = `
                    <div class="info-card-header">
                        <div class="icon-circle">IN</div>
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
        }

        if (viewMoreBtn) {
            viewMoreBtn.classList.remove('hidden');
            viewMoreBtn.setAttribute('data-active-id', loc.id);
        }

        if (overlayAudioBtn) {
            overlayAudioBtn.classList.remove('playing');
            overlayAudioBtn.innerHTML = '<span class="audio-icon">&#128266;</span> Listen to Soundscape';
            if (typeof window.stopSoundscape === 'function') window.stopSoundscape();

            overlayAudioBtn.onclick = () => {
                if (overlayAudioBtn.classList.contains('playing')) {
                    overlayAudioBtn.classList.remove('playing');
                    overlayAudioBtn.innerHTML = '<span class="audio-icon">&#128266;</span> Listen to Soundscape';
                    if (typeof window.stopSoundscape === 'function') window.stopSoundscape();
                } else {
                    overlayAudioBtn.classList.add('playing');
                    overlayAudioBtn.innerHTML = '<span class="audio-icon">&#128263;</span> Stop Soundscape';
                    if (typeof window.playStateSoundscape === 'function') window.playStateSoundscape(loc.name);
                }
            };
        }

        const tabButtons = document.querySelectorAll('#state-overlay-tabs .state-tab-btn');
        const tabPanels = document.querySelectorAll('.state-tab-panel');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => {
                    b.classList.remove('active');
                    b.style.color = 'var(--muted-text)';
                    b.style.fontWeight = 'normal';
                });
                btn.classList.add('active');
                btn.style.color = 'var(--primary-gold)';
                btn.style.fontWeight = 'bold';

                const targetTab = btn.dataset.tab;
                tabPanels.forEach(panel => {
                    if (panel.id === `state-tab-${targetTab}`) {
                        panel.classList.remove('hidden');
                    } else {
                        panel.classList.add('hidden');
                    }
                });
            });
        });

        const defaultTab = document.querySelector('#state-overlay-tabs .state-tab-btn[data-tab="overview"]');
        if (defaultTab) {
            defaultTab.click();
        }

        if (typeof setupScrollReveals === 'function') setupScrollReveals();
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
        if (storyOverlay) storyOverlay.classList.remove('open');
        if (typeof window.stopSoundscape === 'function') window.stopSoundscape();
        if (storyOverlayFocusTrap) {
            storyOverlayFocusTrap.deactivate();
            storyOverlayFocusTrap = null;
        }
    }

    if (randomBtn) {
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
}

window.initInteractiveMap = initInteractiveMap;
