/* ==========================================================================
   INCREDIBLE INDIA EXPLORER - APPLICATION LOGIC
   Pure Vanilla JavaScript for dynamic content, modals, sliders, and games.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initThemeToggle();
    initRotatingText();

    // Page detection routing
    const pathname = window.location.pathname;

    if (pathname.includes('cuisine.html')) {
        initCuisinePage();
    } else if (pathname.includes('festivals.html')) {
        initFestivalsPage();
    } else if (pathname.includes('culture.html')) {
        initCulturePage();
    } else if (pathname.includes('dance.html')) {
        initDancePage();
    } else if (pathname.includes('music.html')) {
        initMusicPage();
    } else if (pathname.includes('sports.html')) {
        initSportsPage();
    } else if (pathname.includes('science.html')) {
        initSciencePage();
    } else if (pathname.includes('personalities.html')) { 
        initScrollEffects();    
        initPersonalitiesPage();
    } else if (pathname.includes('spiritual.html')) {
        initScrollEffects();
        initSpiritualCarousel();  
    } else if (pathname.includes('startup.html')) {
        initStartupPage();
    } else if (pathname.includes('heritage.html')) {
        console.log('âœ… Heritage page loaded successfully');
    } else if (pathname.includes('monuments.html')) {
        console.log('âœ… Monuments page loaded successfully');
    } else if (pathname.includes('hidden-gems.html')) {
        console.log('âœ… Hidden Gems page loaded successfully');
    } else if (pathname.includes('railways.html')) {
        console.log('âœ… Railways Explorer page loaded successfully');
    } else if (pathname.includes('adventure.html')) {
        console.log('Adventure page loaded successfully');
    } else {
        // Main landing page (index.html or root)
        initScrollEffects();
        initInteractiveMap();
        initCuisineExplorer();
        initFestivals();
        initCultureSlider();
        initQuiz();
        initBharatGuide();
    }
});

/* ==========================================================================
   1. NAVIGATION & SCROLL EVENTS
   ========================================================================== */   

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const btnScrollTop = document.getElementById('btn-scroll-top');
    const exploreDropdown = navMenu?.querySelector('.nav-dropdown .dropdown-menu');
    const currentPath = window.location.pathname;

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (btnScrollTop) btnScrollTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            if (btnScrollTop) btnScrollTop.classList.remove('visible');
        }
    });

    // Keep the sports, science, music, and dance pages available across the shared navigation pattern.
    if (exploreDropdown && !exploreDropdown.querySelector('a[href="dance.html"]')) {
        const danceLink = document.createElement('a');
        danceLink.href = 'dance.html';
        danceLink.className = 'dropdown-item';
        danceLink.textContent = 'Dance';
        if (currentPath.includes('dance.html')) {
            danceLink.classList.add('active');
        }
        exploreDropdown.appendChild(danceLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="sports.html"]')) {
        const sportsLink = document.createElement('a');
        sportsLink.href = 'sports.html';
        sportsLink.className = 'dropdown-item';
        sportsLink.textContent = 'Sports';
        if (currentPath.includes('sports.html')) {
            sportsLink.classList.add('active');
        }
        exploreDropdown.appendChild(sportsLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="science.html"]')) {
        const scienceLink = document.createElement('a');
        scienceLink.href = 'science.html';
        scienceLink.className = 'dropdown-item';
        scienceLink.textContent = 'Science';
        if (currentPath.includes('science.html')) {
            scienceLink.classList.add('active');
        }
        exploreDropdown.appendChild(scienceLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="music.html"]')) {
        const musicLink = document.createElement('a');
        musicLink.href = 'music.html';
        musicLink.className = 'dropdown-item';
        musicLink.textContent = 'Music';
        if (currentPath.includes('music.html')) {
            musicLink.classList.add('active');
        }
        exploreDropdown.appendChild(musicLink);
    }

    // Mobile Hamburger Toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // Scroll to Top action
    if (btnScrollTop) {
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    const setThemeIcon = (isLightTheme) => {
        if (isLightTheme) {
            themeBtn.innerHTML = `
                <svg class="theme-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5L19 19M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5L19 5" />
                    <circle cx="12" cy="12" r="4.5" />
                </svg>
            `;
            themeBtn.setAttribute('title', 'Toggle Dark Mode');
            themeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
        } else {
            themeBtn.innerHTML = `
                <svg class="theme-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M21 12.8A8.8 8.8 0 0 1 11.2 3 8.8 8.8 0 1 0 21 12.8Z" fill="currentColor" />
                </svg>
            `;
            themeBtn.setAttribute('title', 'Toggle Light Mode');
            themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
        }
    };

    // Check localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        setThemeIcon(true);
    } else {
        setThemeIcon(false);
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLightTheme = document.body.classList.contains('light-theme');
        setThemeIcon(isLightTheme);
        const theme = isLightTheme ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

function initRotatingText() {
    const rotators = document.querySelectorAll('.rotating-text-wrapper');
    rotators.forEach(wrapper => {
        const wordsStr = wrapper.getAttribute('data-words');
        if (!wordsStr) return;

        const words = wordsStr.split(',').map(w => w.trim());
        if (words.length === 0) return;

        let currentIndex = 0;
        wrapper.innerHTML = `<span class="rotating-text">${words[0]}</span>`;

        setInterval(() => {
            const currentSpan = wrapper.querySelector('.rotating-text');
            currentSpan.style.animation = 'slideOutFade 0.5s ease-in forwards';

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % words.length;
                wrapper.innerHTML = `<span class="rotating-text">${words[currentIndex]}</span>`;
            }, 500);
        }, 3500); // Rotate every 3.5 seconds
    });
}

function initScrollEffects() {
    const fadeSections = document.querySelectorAll('.fade-in-section, .story-step');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.scroll-section');

    // Section entry animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Unobserve after showing
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeSections.forEach(section => {
        fadeObserver.observe(section);
    });

    // Active link highlighting on scroll
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/* ==========================================================================
   2. INTERACTIVE INDIA MAP
   ========================================================================== */

function initInteractiveMap() {
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

/* ==========================================================================
   3. CUISINE EXPLORER
   ========================================================================== */

function initCuisineExplorer() {
    const cuisineGrid = document.getElementById('cuisine-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Initial render
    if (!cuisineGrid) return;
    renderCuisines('all');

    // Filter Trigger click
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active status
            tabBtns.forEach(b => b.classList.remove('active'));
            // Set current active
            btn.classList.add('active');

            const region = btn.getAttribute('data-region');

            // Fading grid animation
            cuisineGrid.style.opacity = '0';
            cuisineGrid.style.transform = 'translateY(15px)';
            cuisineGrid.style.transition = 'opacity 0.25s, transform 0.25s';

            setTimeout(() => {
                renderCuisines(region);
                cuisineGrid.style.opacity = '1';
                cuisineGrid.style.transform = 'translateY(0)';
            }, 250);
        });
    });

    function renderCuisines(regionFilter) {
        cuisineGrid.innerHTML = '';

        const filteredList = regionFilter === 'all'
            ? cuisinesData
            : cuisinesData.filter(item => item.region === regionFilter);

        filteredList.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'cuisine-card glass-card';

            // Determine region badge color
            let badgeClass = 'saffron-bg';
            if (dish.region === 'south') badgeClass = 'gold-bg';
            if (dish.region === 'east') badgeClass = 'green-bg';
            if (dish.region === 'west') badgeClass = 'saffron-bg';
            if (dish.region === 'northeast') badgeClass = 'gold-bg';

            card.innerHTML = `
                <div class="cuisine-card-image">
                    <img src="${dish.image}" alt="${dish.name}" loading="lazy">
                    <span class="cuisine-region-badge ${badgeClass}">${dish.region} India</span>
                </div>
                <div class="cuisine-card-body">
                    <span class="cuisine-origin">${dish.state}</span>
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                </div>
            `;

            cuisineGrid.appendChild(card);
        });
    }
}

/* ==========================================================================
   4. FESTIVALS TIMELINE
   ========================================================================== */

function initFestivals() {
    const festivalTimeline = document.getElementById('festival-timeline');
    const stateModal = document.getElementById('state-modal');

    if (!festivalTimeline) return;
    festivalTimeline.innerHTML = '';

    festivalsData.forEach(fest => {
        const card = document.createElement('div');
        card.className = 'festival-card glass-card';
        card.innerHTML = `
            <img class="festival-card-img" src="${fest.image}" alt="${fest.name}" loading="lazy">
            <div class="festival-card-content">
                <span class="subtitle">${fest.subtitle}</span>
                <h3>${fest.name}</h3>
                <p>${fest.description}</p>
            </div>
        `;

        // Click festival to navigate to the detailed festivals page
        card.addEventListener('click', () => {
            window.location.href = 'festivals.html';
        });

        festivalTimeline.appendChild(card);
    });
}

/* ==========================================================================
   5. CULTURE SLIDER (CAROUSEL)
   ========================================================================== */

function initCultureSlider() {
    const track = document.getElementById('slider-track');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');

    let currentSlide = 0;

    // Render Culture Items
    if (!track) return;
    track.innerHTML = '';
    cultureData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'slider-card';
        card.innerHTML = `
            <img class="slider-card-img" src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="slider-card-body">
                <span class="slider-card-category">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        track.appendChild(card);
    });

    // Render Navigation Dots
    dotsContainer.innerHTML = '';
    const totalCards = cultureData.length;

    // Determine responsive slide count limits
    function getVisibleSlidesCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function getMaxSlides() {
        return Math.max(0, totalCards - getVisibleSlidesCount());
    }

    function updateDots() {
        dotsContainer.innerHTML = '';
        const dotsCount = getMaxSlides() + 1;

        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('span');
            dot.className = `dot ${i === currentSlide ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                currentSlide = i;
                moveSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function moveSlider() {
        // Limit slide bounds
        const maxSlides = getMaxSlides();
        if (currentSlide < 0) currentSlide = 0;
        if (currentSlide > maxSlides) currentSlide = maxSlides;

        const cardWidthPercent = 100 / getVisibleSlidesCount();
        const gapOffset = 30 * currentSlide / getVisibleSlidesCount(); // 30px is gap in CSS

        // Dynamic track translation calculation
        const percentTranslation = currentSlide * cardWidthPercent;

        // Apply styling transform
        track.style.transform = `translateX(calc(-${percentTranslation}% - ${currentSlide * 20}px))`;

        // Update dot highlights
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Button controls click listeners
    nextBtn.addEventListener('click', () => {
        currentSlide++;
        moveSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide--;
        moveSlider();
    });

    // ------------------------------------------------------------------
    // TOUCH SWIPE SUPPORT (mobile)
    // Uses touchstart / touchmove / touchend â€” no external libraries.
    // Minimum threshold of 50px filters out accidental micro-drags.
    // The vertical guard prevents stealing vertical page-scroll gestures.
    // { passive: false } on touchmove lets us call preventDefault() to
    // stop page judder when a horizontal swipe is confirmed.
    // ------------------------------------------------------------------
    const sliderContainer = document.getElementById('slider-container');
    if (!sliderContainer) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false; // true once we've committed to a horizontal drag

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isSwiping = false;
    }, { passive: true });

    sliderContainer.addEventListener('touchmove', (e) => {
        const deltaX = e.changedTouches[0].screenX - touchStartX;
        const deltaY = e.changedTouches[0].screenY - touchStartY;

        // Commit to horizontal swipe only when horizontal movement is dominant
        if (!isSwiping && Math.abs(deltaX) > Math.abs(deltaY)) {
            isSwiping = true;
        }

        // Once committed to horizontal swipe, block vertical page scroll
        if (isSwiping) {
            e.preventDefault();
        }
    }, { passive: false });

    sliderContainer.addEventListener('touchend', (e) => {
        if (!isSwiping) return; // was a vertical scroll â€” do nothing

        const deltaX = e.changedTouches[0].screenX - touchStartX;
        const SWIPE_THRESHOLD = 50; // px â€” ignore accidental micro-drags

        if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
            if (deltaX < 0) {
                // Swiped left â†’ advance to next slide
                currentSlide++;
            } else {
                // Swiped right â†’ go back to previous slide
                currentSlide--;
            }
            moveSlider();
        }

        isSwiping = false;
    }, { passive: true });
    // ------------------------------------------------------------------

    // Initialize layout dots
    updateDots();

    // Re-adjust slider items on resize
    window.addEventListener('resize', () => {
        const max = getMaxSlides();
        if (currentSlide > max) {
            currentSlide = max;
        }
        updateDots();
        moveSlider();
    });
}

/* ==========================================================================
   6. FOOD QUIZ GAME
   ========================================================================== */

function initQuiz() {
    // Screen containers
    const introScreen = document.getElementById('quiz-intro-screen');
    const questionScreen = document.getElementById('quiz-question-screen');
    const resultScreen = document.getElementById('quiz-result-screen');

    // Buttons
    const startBtn = document.getElementById('btn-start-quiz');
    const restartBtn = document.getElementById('btn-restart-quiz');
    const heroStartBtn = document.getElementById('btn-start-quiz-hero');

    // Gameplay fields
    const currentQNum = document.getElementById('current-q-num');
    const progressFill = document.getElementById('quiz-progress-fill');
    const questionText = document.getElementById('quiz-question-text');
    const optionsGrid = document.getElementById('quiz-options-grid');
    const feedback = document.getElementById('quiz-feedback');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    const finalScore = document.getElementById('quiz-final-score');
    const resultMsg = document.getElementById('quiz-result-message');

    let currentQuestionIndex = 0;
    let score = 0;
    let locked = false;

    // Start triggers
    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (restartBtn) restartBtn.addEventListener('click', startQuiz);

    if (heroStartBtn) {
        heroStartBtn.addEventListener('click', () => {
            // Scroll to quiz and start
            document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
            startQuiz();
        });
    }

    function startQuiz() {
        if (!introScreen) return;
        currentQuestionIndex = 0;
        score = 0;
        locked = false;

        introScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        questionScreen.classList.remove('hidden');

        loadQuestion();
    }

    function loadQuestion() {
        locked = false;
        feedback.classList.add('hidden');

        const q = quizQuestions[currentQuestionIndex];
        const shuffledOptions = [...q.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }

        // Set texts and fills
        currentQNum.innerText = currentQuestionIndex + 1;
        progressFill.style.width = ((currentQuestionIndex + 1) / 8 * 100) + '%';
        questionText.innerText = q.question;

        // Load Options buttons
        optionsGrid.innerHTML = '';
        shuffledOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.addEventListener('click', () => selectOption(btn, opt));
            optionsGrid.appendChild(btn);
        });
    }

    function selectOption(clickedBtn, selectedVal) {
        if (locked) return;
        locked = true;

        const q = quizQuestions[currentQuestionIndex];
        const isCorrect = (selectedVal === q.answer);

        const optionBtns = optionsGrid.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.classList.add('disabled');
            // Show correct solution regardless
            if (btn.innerText === q.answer) {
                btn.classList.add('correct');
            }
        });

        if (isCorrect) {
            clickedBtn.classList.add('correct');
            score++;
            showFeedback(true);
        } else {
            clickedBtn.classList.add('wrong');
            showFeedback(false, q.answer);
        }

        // Delay loading next stage
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }, 1800);
    }

    function showFeedback(isCorrect, correctAnswer) {
        feedback.classList.remove('hidden', 'correct', 'wrong');

        if (isCorrect) {
            feedback.classList.add('correct');
            feedbackIcon.innerText = 'âœ…';
            feedbackText.innerText = 'Correct! Great job!';
        } else {
            feedback.classList.add('wrong');
            feedbackIcon.innerText = 'âŒ';
            feedbackText.innerText = `Incorrect. The answer is ${correctAnswer}`;
        }
    }

    function showResults() {
        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        finalScore.innerText = score;

        // Select message matching rank
        if (score === 8) {
            resultMsg.innerText = "Incredible Mastermind! ðŸ† You scored a perfect 8/8! You are an expert on India's vast culinary heritage!";
            document.getElementById('quiz-result-icon').innerText = 'ðŸ†';
        } else if (score >= 5) {
            resultMsg.innerText = `Great score! ðŸŒŸ You got ${score}/8 correct. You have a solid grasp of Indian cuisine!`;
            document.getElementById('quiz-result-icon').innerText = 'ðŸŒŸ';
        } else {
            resultMsg.innerText = `You scored ${score}/8. Keep exploring the interactive map and food lists to discover more flavors! ðŸ›`;
            document.getElementById('quiz-result-icon').innerText = 'ðŸ›';
        }
    }
}

/* ==========================================================================
   SUB-PAGES INITIALIZATION LOGIC & MAPPINGS
   ========================================================================== */

const cuisineDetails = {
    "c1": {
        spice: 45, richness: 90, sweetness: 40,
        ingredients: ["Boneless Chicken", "Fresh Tomato Puree", "Butter & Fresh Cream", "Kashmiri Lal Mirch", "Garam Masala", "Kasuri Methi"],
        story: "Originating in the 1950s at the Moti Mahal restaurant in Delhi, Butter Chicken was created by Kundan Lal Gujral. He cleverly mixed leftover tandoori chicken juices with a rich, buttery tomato gravy to keep the chicken moist, creating a global phenomenon."
    },
    "c2": {
        spice: 80, richness: 70, sweetness: 10,
        ingredients: ["Kabuli Chana (Chickpeas)", "Maida Flatbreads", "Pomegranate Seed Powder", "Amchoor (Mango Powder)", "Green Chiles & Ginger", "Carom Seeds"],
        story: "A beloved classic born in the streets of Punjab, Chole Bhature is the ultimate indulgence. The chickpeas are slow-simmered in a dark, tea-infused spice blend, while the bhature dough is fermented to puff up into massive, golden, cloud-like balloons."
    },
    "c3": {
        spice: 75, richness: 85, sweetness: 10,
        ingredients: ["Mutton (Lamb Shoulder)", "Kashmiri Dry Red Chilies", "Fennel Powder", "Ginger Powder", "Maval (Cockscomb flower)", "Asafoetida"],
        story: "Introduced to Kashmir by the Mughals, Rogan Josh is a staple of the royal Kashmiri Wazwan feast. The dish gets its signature crimson color not from hot heat, but from mild Kashmiri red chilies and cockscomb flower petals."
    },
    "c4": {
        spice: 50, richness: 60, sweetness: 15,
        ingredients: ["Fermented Rice Batter", "Mashed Potatoes", "Mustard Seeds & Curry Leaves", "Chana Dal", "Turmeric & Onion", "Coconut Chutney"],
        story: "Originating in the temple city of Udupi, Karnataka, Masala Dosa is a masterpiece of textures. The paper-thin fermented rice crepe is roasted in ghee until crispy outside, wrapping around a soft, seasoned potato-onion mash."
    },
    "c5": {
        spice: 90, richness: 85, sweetness: 10,
        ingredients: ["Basmati Rice", "Marinated Meat (Chicken/Goat)", "Saffron Milk", "Fried Onions (Biryanis)", "Mint & Coriander Leaves", "Rose Water"],
        story: "Perfected in the kitchens of the Nizams of Hyderabad, this legendary dish uses the raw (Kacchi) biryani method. Raw marinated meat is cooked in layers under seal ('Dum') with long-grain Basmati rice, infusing the rice with pure meat juices."
    },
    "c6": {
        spice: 40, richness: 30, sweetness: 10,
        ingredients: ["Parboiled Rice", "Urad Dal", "Toor Dal (Lentils)", "Tamarind Pulp", "Drumstick & Shallots", "Sambar Powder"],
        story: "Idlis are ancient steamed cakes whose origins trace back to Southern India or Indonesia. Fermenting the black lentils and rice batter breaks down nutrients, making Idli and Sambar one of the healthiest and most digestible breakfasts globally."
    },
    "c7": {
        spice: 65, richness: 50, sweetness: 5,
        ingredients: ["Whole Wheat Flour", "Sattu (Roasted Chickpea)", "Roasted Eggplant", "Mustard Oil", "Garlic & Green Chiles", "Ajwain (Carom)"],
        story: "Litti Chokha was once the survival food for peasant armies and revolutionaries in Bihar because of its long shelf-life. The dough balls stuffed with spiced sattu are slow-baked over dung fires, cracked open, dipped in ghee, and eaten with rustic chokha mash."
    },
    "c8": {
        spice: 70, richness: 40, sweetness: 15,
        ingredients: ["Rahu Fish Pieces", "Mustard Oil & Paste", "Panch Phoron (Five-spice)", "Turmeric & Ginger", "Potatoes & Cauliflower", "Green Chiles"],
        story: "Machher Jhol is the ultimate comfort food for every Bengali home. It is a light, spicy fish stew that balances the pungency of mustard oil with fresh green chilies and a digestive blend of five spices, representing Bengal's riverine heritage."
    },
    "c9": {
        spice: 0, richness: 30, sweetness: 95,
        ingredients: ["Chhena (Fresh Milk Curds)", "Sugar Syrup", "Rose Water", "Semolina (Rava)", "Saffron Strands", "Cardamom Powder"],
        story: "The origin of Rasgulla is a famous historical debate between Bengal and Odisha. In Bengal, Nobin Chandra Das popularized the soft, spongy variant in 1868, while in Odisha, the sweet has been offered to Goddess Lakshmi at Jagannath Temple for centuries."
    },
    "c10": {
        spice: 55, richness: 30, sweetness: 35,
        ingredients: ["Gram Flour (Besan)", "Citric Acid & Baking Soda", "Mustard Seeds", "Curry Leaves & Sesame", "Green Chilies", "Grated Coconut"],
        story: "Khaman Dhokla is a steamed, airy, savory snack from Gujarat. The key is fermenting the gram flour batter and steaming it to perfection, followed by a hot tempering of mustard seeds, green chilies, and sugar water that keeps the cake moist."
    },
    "c11": {
        spice: 85, richness: 60, sweetness: 5,
        ingredients: ["Boiled Potatoes", "Gram Flour Batter", "Pav (Bread Roll)", "Dry Garlic-Coconut Chutney", "Salted Green Chili", "Mint-Coriander Chutney"],
        story: "Invented in 1966 by Ashok Vaidya outside Mumbai's Dadar Station, Vada Pav was designed as a cheap, grab-and-go meal for textile mill workers. Today, it is Mumbai's iconic culinary identity, eaten by millions daily across all social classes."
    },
    "c12": {
        spice: 0, richness: 90, sweetness: 80,
        ingredients: ["Egg Yolks", "Thick Coconut Milk", "Pure Ghee", "Sugar", "Flour", "Nutmeg Grating"],
        story: "Bebinca is a classic Indo-Portuguese dessert, often called the 'Queen of Goan Desserts'. Legend says it was invented by a nun named Bebiana at the Santa Monica Convent, who made layers to symbolize the seven hills of Lisbon or Goa."
    },
    "c13": {
        spice: 60, richness: 35, sweetness: 10,
        ingredients: ["Refined Flour Dough", "Minced Vegetables/Meat", "Soy Sauce & Ginger", "Szechuan Pepper", "Garlic & Chilies", "Sesame Oil"],
        story: "Momos entered the culinary fabric of Sikkim and Northeast India through Tibetan traders and refugees. These steamed delicacies have adapted to local palates, featuring spicy red chutneys made from hot local 'Dalle Khursani' chilies."
    },
    "c14": {
        spice: 95, richness: 50, sweetness: 0,
        ingredients: ["Smoked Pork Pieces", "Anishi (Fermented Yam Leaves)", "Fermented Bamboo Shoots", "Raja Mircha (Ghost Pepper)", "Ginger-Garlic", "Local Herbs"],
        story: "A core staple of the Naga tribal hearth, this dish features pork that is slow-smoked over kitchen woodfires for weeks. It is simmered with pungent, sour fermented bamboo shoots and seasoned with Raja Mircha, one of the spiciest chilies in the world."
    },
    "c15": {
        spice: 70, richness: 45, sweetness: 5,
        ingredients: ["Red Hill Rice", "Pork/Chicken Stock", "Ginger Paste", "Black Pepper", "Local Sesame Seeds", "Aromatic Khasi Herbs"],
        story: "Jadoh is a highly sacred and popular rice dish of the Khasi tribe of Meghalaya. Cooked traditionally with red hill rice and pork or chicken, it is served during important festivals and family reunions as a mark of Khasi heritage and hospitality."
    }
};

const festivalHighlights = {
    "Diwali": [
        { icon: "ðŸª”", text: "Clay Diyas & Lighting" },
        { icon: "ðŸŽ¨", text: "Flower & Powder Rangoli" },
        { icon: "ðŸ¬", text: "Sharing Mithai (Sweets)" },
        { icon: "ðŸŽ†", text: "Night Sparklers & Fireworks" }
    ],
    "Holi": [
        { icon: "ðŸŽ¨", text: "Organic Colors (Gulal)" },
        { icon: "ðŸ’¦", text: "Pichkaris & Water Balloons" },
        { icon: "ðŸ¥›", text: "Thandai & Gujiya Sweets" },
        { icon: "ðŸ”¥", text: "Holika Dahan Bonfires" }
    ],
    "Eid": [
        { icon: "ðŸŒ™", text: "Crescent Moon Sighting" },
        { icon: "ðŸ•Œ", text: "Congregational Prayers" },
        { icon: "ðŸ¥£", text: "Sweet Sheer Khurma Feast" },
        { icon: "ðŸŽ", text: "Eidi (Gift-Giving)" }
    ],
    "Pongal": [
        { icon: "ðŸŒ¾", text: "Harvest Sugarcane Stalks" },
        { icon: "ðŸº", text: "Decorated Clay Boiling Pots" },
        { icon: "â˜€ï¸", text: "Surya (Sun God) Worship" },
        { icon: "ðŸ„", text: "Decorating Cattle (Mattu)" }
    ],
    "Navratri": [
        { icon: "ðŸ’ƒ", text: "Garba & Dandiya Dances" },
        { icon: "ðŸ¥»", text: "Chaniya Choli Dressups" },
        { icon: "ðŸ•¯ï¸", text: "Ghatasthapana (Holy Jar)" },
        { icon: "ðŸ”±", text: "Dussehra Effigy Burning" }
    ],
    "Bihu": [
        { icon: "ðŸ¥", text: "Dhol & Pepa Music" },
        { icon: "ðŸŒ¾", text: "Rongali Spring Dance" },
        { icon: "ðŸ¥ž", text: "Pitha Rice Cake Feasts" },
        { icon: "ðŸƒ", text: "Community Bonfires" }
    ]
};

function initCuisinePage() {
    const cuisineGrid = document.getElementById('cuisine-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchInput = document.getElementById('cuisine-search-input');

    const drawer = document.getElementById('cuisine-drawer');
    const drawerClose = document.getElementById('drawer-close');
    const dRegion = document.getElementById('drawer-region-text');
    const dTitle = document.getElementById('drawer-title');
    const dState = document.getElementById('drawer-state-text');
    const dImg = document.getElementById('drawer-img');
    const dDesc = document.getElementById('drawer-description');
    const dSpice = document.getElementById('fill-spice');
    const dRich = document.getElementById('fill-richness');
    const dSweet = document.getElementById('fill-sweetness');
    const dIngredients = document.getElementById('drawer-ingredients');

    let currentRegion = 'all';
    let searchQuery = '';

    render();

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentRegion = btn.getAttribute('data-region');
            animateRender();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        animateRender();
    });

    drawerClose.addEventListener('click', closeDrawer);
    drawer.addEventListener('click', (e) => {
        if (e.target === drawer) closeDrawer();
    });

    function closeDrawer() {
        drawer.classList.remove('open');
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
    }

    function animateRender() {
        cuisineGrid.style.opacity = '0';
        cuisineGrid.style.transform = 'translateY(15px)';
        cuisineGrid.style.transition = 'opacity 0.25s, transform 0.25s';

        setTimeout(() => {
            render();
            cuisineGrid.style.opacity = '1';
            cuisineGrid.style.transform = 'translateY(0)';
        }, 200);
    }

    function render() {
        cuisineGrid.innerHTML = '';

        let filtered = cuisinesData;
        if (currentRegion !== 'all') {
            filtered = filtered.filter(item => item.region === currentRegion);
        }
        if (searchQuery !== '') {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchQuery) ||
                item.state.toLowerCase().includes(searchQuery) ||
                item.description.toLowerCase().includes(searchQuery)
            );
        }

        if (filtered.length === 0) {
            cuisineGrid.innerHTML = `<div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); font-size: 1.1rem;">No cuisines match your criteria. Try adjusting the filter or search word.</div>`;
            return;
        }

        filtered.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'cuisine-card glass-card';

            let badgeClass = 'saffron-bg';
            if (dish.region === 'south') badgeClass = 'gold-bg';
            if (dish.region === 'east') badgeClass = 'green-bg';
            if (dish.region === 'northeast') badgeClass = 'gold-bg';

            card.innerHTML = `
                <div class="cuisine-card-image">
                    <img src="${dish.image}" alt="${dish.name}" loading="lazy">
                    <span class="cuisine-region-badge ${badgeClass}">${dish.region} India</span>
                </div>
                <div class="cuisine-card-body">
                    <span class="cuisine-origin">${dish.state}</span>
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                </div>
            `;

            card.addEventListener('click', () => {
                const details = cuisineDetails[dish.id] || {
                    spice: 50, richness: 50, sweetness: 50,
                    ingredients: ["Local spices", "Regional vegetables", "Traditional grains"],
                    story: dish.description
                };

                dRegion.innerText = `${dish.region} India`;
                dRegion.className = `drawer-badge ${badgeClass}`;
                dTitle.innerText = dish.name;
                dState.innerText = `Origin: ${dish.state}`;
                dImg.src = dish.image;
                dImg.alt = dish.name;
                dDesc.innerText = details.story;

                dSpice.style.width = details.spice + '%';
                dRich.style.width = details.richness + '%';
                dSweet.style.width = details.sweetness + '%';

                dIngredients.innerHTML = '';
                details.ingredients.forEach(ing => {
                    const li = document.createElement('li');
                    li.innerText = ing;
                    dIngredients.appendChild(li);
                });

                drawer.classList.add('open');
                document.body.classList.add('no-scroll');
                document.documentElement.classList.add('no-scroll');
            });

            cuisineGrid.appendChild(card);
        });

        // Try Recipe Mode Logic
        const btnTryRecipe = document.getElementById('btn-try-recipe');
        const recipeOverlay = document.getElementById('recipe-mode-overlay');
        const btnExitRecipe = document.getElementById('btn-exit-recipe');
        const recipeTitle = document.getElementById('recipe-title');
        const progressFill = document.getElementById('recipe-progress-fill');
        const stepIndicator = document.getElementById('recipe-step-indicator');
        const stepTitle = document.getElementById('step-title');
        const stepInstruction = document.getElementById('step-instruction');
        const btnPrevStep = document.getElementById('btn-prev-step');
        const btnNextStep = document.getElementById('btn-next-step');

        let currentRecipeSteps = [];
        let currentStepIndex = 0;

        if (btnTryRecipe) {
            btnTryRecipe.onclick = () => {
                recipeTitle.innerText = dTitle.innerText;

                // Generate pseudo-steps based on ingredients
                const ingredientsList = Array.from(dIngredients.querySelectorAll('li')).map(li => li.innerText);
                currentRecipeSteps = [
                    { title: "1. Preparation", text: `Gather and prepare the following ingredients: ${ingredientsList.slice(0, 2).join(', ')}.` },
                    { title: "2. Marination & SautÃ©", text: `Mix the spices with the base ingredients. Slowly cook the ${ingredientsList.length > 2 ? ingredientsList[2] : "spices"} to release the aromas.` },
                    { title: "3. Simmer & Cook", text: `Add the main elements and let the dish simmer on low heat until fully cooked. Let the flavors meld.` },
                    { title: "4. Garnish & Serve", text: `Finish off with ${ingredientsList.length > 3 ? ingredientsList[3] : "fresh herbs"} and serve hot! Enjoy your authentic meal.` }
                ];

                currentStepIndex = 0;
                updateRecipeUI();
                recipeOverlay.classList.add('active');
            };

            btnExitRecipe.onclick = () => {
                recipeOverlay.classList.remove('active');
            };

            btnPrevStep.onclick = () => {
                if (currentStepIndex > 0) {
                    currentStepIndex--;
                    updateRecipeUI();
                }
            };

            btnNextStep.onclick = () => {
                if (currentStepIndex < currentRecipeSteps.length - 1) {
                    currentStepIndex++;
                    updateRecipeUI();
                } else {
                    // Finished
                    recipeOverlay.classList.remove('active');
                }
            };

            function updateRecipeUI() {
                const step = currentRecipeSteps[currentStepIndex];
                stepTitle.innerText = step.title;
                stepInstruction.innerText = step.text;

                const progress = ((currentStepIndex + 1) / currentRecipeSteps.length) * 100;
                progressFill.style.width = `${progress}%`;
                stepIndicator.innerText = `Step ${currentStepIndex + 1} of ${currentRecipeSteps.length}`;

                btnPrevStep.disabled = currentStepIndex === 0;

                if (currentStepIndex === currentRecipeSteps.length - 1) {
                    btnNextStep.innerText = "Finish ðŸŽ‰";
                } else {
                    btnNextStep.innerHTML = "Next Step &rarr;";
                }

                // Re-trigger animation
                const card = document.getElementById('recipe-step-card');
                card.classList.remove('animate-slide-up');
                void card.offsetWidth; // trigger reflow
                card.classList.add('animate-slide-up');
            }
        }
    }
}

function initFestivalsPage() {
    const festivalTimeline = document.getElementById('festival-timeline');
    const overlay = document.getElementById('story-overlay');
    const backBtn = document.getElementById('story-back-btn');
    const audioBtn = document.getElementById('story-audio-btn');

    const storyImg = document.getElementById('story-img');
    const particlesContainer = document.getElementById('canvas-particles');
    const shapeContainer = document.getElementById('canvas-shape-container');
    const storySubtitle = document.getElementById('story-subtitle');
    const storyTitle = document.getElementById('story-title');
    const storyMainText = document.getElementById('story-main-text');
    const highlightsGrid = document.getElementById('story-highlights-grid');

    festivalTimeline.innerHTML = '';

    festivalsData.forEach(fest => {
        const card = document.createElement('div');
        card.className = 'festival-card glass-card';
        card.innerHTML = `
            <img class="festival-card-img" src="${fest.image}" alt="${fest.name}" loading="lazy">
            <div class="festival-card-content">
                <span class="subtitle">${fest.subtitle}</span>
                <h3>${fest.name}</h3>
                <p>${fest.description}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            storyImg.src = fest.image;
            storyImg.alt = fest.name;
            storySubtitle.innerText = fest.subtitle;
            storyTitle.innerText = fest.name;

            // Format story text as paragraph lines
            const paragraphs = (fest.story || fest.description)
                .split('\n\n')
                .map(pText => `<p class="story-paragraph">${pText}</p>`)
                .join('');
            storyMainText.innerHTML = paragraphs;

            // Reapply Drop Cap on first paragraph
            const firstPara = storyMainText.querySelector('.story-paragraph');
            if (firstPara) firstPara.classList.add('drop-cap');

            // Set dynamic background color transition class
            overlay.className = `story-overlay theme-${fest.name.toLowerCase()}`;

            // Load highlights
            highlightsGrid.innerHTML = '';
            const highlights = festivalHighlights[fest.name] || [
                { icon: "ðŸŽ‰", text: "Traditional Customs" },
                { icon: "ðŸ¥£", text: "Festive Meals" },
                { icon: "âœ¨", text: "Joyous Decorations" },
                { icon: "ðŸ«‚", text: "Community Gatherings" }
            ];

            highlights.forEach(hl => {
                const div = document.createElement('div');
                div.className = 'highlight-bullet';
                div.innerHTML = `<span class="bullet-icon">${hl.icon}</span><span>${hl.text}</span>`;
                highlightsGrid.appendChild(div);
            });

            // Spawns custom CSS-animated shapes
            shapeContainer.innerHTML = '';
            if (fest.name === "Diwali") {
                shapeContainer.innerHTML = `
                    <div class="diya-graphic animate-slide-up">
                        <div class="diya-flame" id="diya-flame-obj"></div>
                        <div class="diya-body"></div>
                    </div>
                `;
            } else if (fest.name === "Holi") {
                let html = '<div class="holi-powders">';
                const offsets = [
                    { x: -70, y: -60, color: 'rgba(239, 68, 68, 0.65)', dx: -40, dy: -30 },
                    { x: 70, y: -50, color: 'rgba(59, 130, 246, 0.65)', dx: 30, dy: -40 },
                    { x: -50, y: 60, color: 'rgba(16, 185, 129, 0.65)', dx: -30, dy: 40 },
                    { x: 50, y: 50, color: 'rgba(236, 72, 153, 0.65)', dx: 40, dy: 30 }
                ];
                offsets.forEach(offset => {
                    html += `
                        <div class="color-cloud" style="
                            left: calc(50% + ${offset.x}px); 
                            top: calc(50% + ${offset.y}px); 
                            background: ${offset.color};
                            width: ${Math.random() * 50 + 90}px;
                            height: ${Math.random() * 50 + 90}px;
                            --dx: ${offset.dx}px;
                            --dy: ${offset.dy}px;
                        "></div>
                    `;
                });
                html += '</div>';
                shapeContainer.innerHTML = html;
            } else if (fest.name === "Eid") {
                shapeContainer.innerHTML = `
                    <div class="eid-lantern">
                        <div class="lantern-cord"></div>
                        <div class="lantern-body"></div>
                    </div>
                `;
            } else if (fest.name === "Pongal") {
                shapeContainer.innerHTML = `
                    <div class="pongal-pot-graphic animate-slide-up">
                        <div class="pongal-foam">
                            <div class="foam-bubble"></div>
                            <div class="foam-bubble"></div>
                            <div class="foam-bubble"></div>
                        </div>
                        <div class="pongal-neck"></div>
                        <div class="pongal-pot"></div>
                    </div>
                `;
            } else if (fest.name === "Navratri") {
                shapeContainer.innerHTML = `
                    <div class="navratri-dandiya animate-slide-up" id="navratri-dandiya-sticks">
                        <div class="dandiya-stick left"></div>
                        <div class="dandiya-stick right"></div>
                    </div>
                `;
            } else if (fest.name === "Bihu") {
                shapeContainer.innerHTML = `
                    <div class="bihu-dhol animate-slide-up">
                        <div class="dhol-drum" id="bihu-dhol-drum"></div>
                    </div>
                `;
            }

            // Open overlay with animations
            overlay.classList.add('open');

            // Trigger scroll triggers
            setupScrollReveals();

            // Trigger themed particles spawning
            spawnThemedParticles(fest.name, particlesContainer);

            // Bind soundscape controllers
            audioBtn.classList.remove('playing');
            audioBtn.innerHTML = '<span class="audio-icon">ðŸ”Š</span> Listen to Soundscape';
            stopSoundscape();

            audioBtn.onclick = () => {
                if (audioBtn.classList.contains('playing')) {
                    audioBtn.classList.remove('playing');
                    audioBtn.innerHTML = '<span class="audio-icon">ðŸ”Š</span> Listen to Soundscape';
                    stopSoundscape();
                } else {
                    audioBtn.classList.add('playing');
                    audioBtn.innerHTML = '<span class="audio-icon">ðŸ”‡</span> Stop Soundscape';

                    let drumEl = null;
                    if (fest.name === "Bihu") {
                        drumEl = document.getElementById('bihu-dhol-drum');
                    } else if (fest.name === "Navratri") {
                        drumEl = document.getElementById('navratri-dandiya-sticks');
                    } else if (fest.name === "Diwali") {
                        drumEl = document.getElementById('diya-flame-obj');
                    }
                    playSoundscape(fest.name, drumEl);
                }
            };
        });

        festivalTimeline.appendChild(card);
    });

    backBtn.addEventListener('click', () => {
        overlay.classList.remove('open');
        particlesContainer.innerHTML = '';
        shapeContainer.innerHTML = '';
        stopSoundscape();
    });
}

function setupScrollReveals() {
    const paragraphs = document.querySelectorAll('.story-paragraph');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    paragraphs.forEach(p => {
        p.classList.remove('reveal');
        observer.observe(p);
    });
}

function spawnThemedParticles(festName, container) {
    container.innerHTML = '';

    if (festName === "Diwali") {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'diya-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.bottom = Math.random() * 50 + '%';
            p.style.animationDelay = Math.random() * 5 + 's';
            p.style.animationDuration = (Math.random() * 4 + 4) + 's';
            container.appendChild(p);
        }
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'sparkle-particle';
            p.style.left = Math.random() * 80 + 10 + '%';
            p.style.top = Math.random() * 80 + 10 + '%';
            p.style.setProperty('--x', (Math.random() * 100 - 50) + 'px');
            p.style.setProperty('--y', (Math.random() * 100 - 50) + 'px');
            p.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(p);
        }
    } else if (festName === "Holi") {
        const colors = ['#ef4444', '#3b82f6', '#10b981', '#ec4899', '#f59e0b', '#8b5cf6'];
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'splash-particle';
            p.style.left = Math.random() * 80 + 10 + '%';
            p.style.top = Math.random() * 80 + 10 + '%';
            const size = Math.random() * 30 + 15;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.setProperty('--x', (Math.random() * 160 - 80) + 'px');
            p.style.setProperty('--y', (Math.random() * 160 - 80) + 'px');
            p.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(p);
        }
    } else if (festName === "Eid") {
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'star-particle';
            p.innerText = 'â˜…';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 3 + 's';
            p.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(p);
        }
    } else if (festName === "Pongal") {
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'steam-particle';
            p.style.left = (Math.random() * 40 + 30) + '%';
            p.style.bottom = '10%';
            p.style.setProperty('--x', (Math.random() * 40 - 20) + 'px');
            p.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(p);
        }
    } else if (festName === "Navratri" || festName === "Bihu") {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'leaf-particle';
            p.innerText = festName === "Bihu" ? 'ðŸƒ' : 'ðŸŒ¸';
            p.style.left = Math.random() * 100 + '%';
            p.style.setProperty('--x', (Math.random() * 80 - 40) + 'px');
            p.style.animationDelay = Math.random() * 5 + 's';
            p.style.animationDuration = (Math.random() * 4 + 5) + 's';
            container.appendChild(p);
        }
    }
}

/* ==========================================================================
   WEB AUDIO API SOUNDSCAPE SYNTHESIZER
   ========================================================================== */
let audioCtx = null;
let soundscapeActive = false;
let audioTimeout = null;
let currentFestivalPlaying = '';
let activeAudioNodes = [];

function initAudioSynth() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSoundscape(festName, drumElement) {
    initAudioSynth();
    stopSoundscape();

    soundscapeActive = true;
    currentFestivalPlaying = festName;

    if (festName === "Diwali") {
        playDiwaliSoundscape(drumElement);
    } else if (festName === "Holi") {
        playHoliSoundscape();
    } else if (festName === "Eid") {
        playEidSoundscape();
    } else if (festName === "Pongal") {
        playPongalSoundscape();
    } else if (festName === "Navratri") {
        playNavratriSoundscape(drumElement);
    } else if (festName === "Bihu") {
        playBihuSoundscape(drumElement);
    }
}

function stopSoundscape() {
    soundscapeActive = false;
    currentFestivalPlaying = '';
    if (audioTimeout) {
        clearTimeout(audioTimeout);
        audioTimeout = null;
    }
    // Stop all active running nodes to prevent leaks (especially Eid drone)
    activeAudioNodes.forEach(node => {
        try {
            node.stop();
        } catch (e) {
            // Already stopped or not started
        }
    });
    activeAudioNodes = [];
}

// 1. Diwali Sparkler crackles & dynamic flame flickers
function playDiwaliSoundscape(flameElement) {
    if (!soundscapeActive || currentFestivalPlaying !== "Diwali") return;

    const time = audioCtx.currentTime;
    const bufferSize = audioCtx.sampleRate * 0.08;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() > 0.985 ? (Math.random() * 2 - 1) : 0;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 5000;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.06, time);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();

    // Sparkle flicker visual sync
    if (flameElement && Math.random() > 0.5) {
        flameElement.style.transform = `scale(${Math.random() * 0.2 + 0.95}) rotate(${Math.random() * 4 - 2}deg)`;
        setTimeout(() => {
            if (flameElement) flameElement.style.transform = '';
        }, 100);
    }

    audioTimeout = setTimeout(() => playDiwaliSoundscape(flameElement), 80 + Math.random() * 150);
}

// 2. Holi Dhol strike rhythm
function playHoliSoundscape() {
    let beatIndex = 0;
    const tempo = 120;
    const beatDuration = 60 / tempo;

    function playBeatLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Holi") return;

        const pattern = [1, 0, 0.6, 1, 1, 0, 0.6, 0.4];
        const strength = pattern[beatIndex % pattern.length];

        if (strength > 0) {
            synthesizeDholStrike(strength);
        }

        beatIndex++;
        audioTimeout = setTimeout(playBeatLoop, (beatDuration * 1000) / 2);
    }
    playBeatLoop();
}

function synthesizeDholStrike(strength) {
    const time = audioCtx.currentTime;

    // Low drum body
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(strength >= 1 ? 65 : 85, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.35);

    gain.gain.setValueAtTime(strength * 0.45, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.4);

    // High head snap
    const snapOsc = audioCtx.createOscillator();
    const snapGain = audioCtx.createGain();
    snapOsc.type = "triangle";
    snapOsc.frequency.setValueAtTime(280, time);
    snapOsc.frequency.exponentialRampToValueAtTime(80, time + 0.07);

    snapGain.gain.setValueAtTime(strength * 0.1, time);
    snapGain.gain.exponentialRampToValueAtTime(0.01, time + 0.07);

    snapOsc.connect(snapGain);
    snapGain.connect(audioCtx.destination);
    snapOsc.start(time);
    snapOsc.stop(time + 0.08);
}

// 3. Eid Serene ambient drone & hanging chimes
function playEidSoundscape() {
    let chimeIndex = 0;

    // Continuous ambient drone oscillators
    const drone1 = audioCtx.createOscillator();
    const drone2 = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();

    drone1.type = "sine";
    drone1.frequency.value = 110; // A2
    drone2.type = "triangle";
    drone2.frequency.value = 165; // E3
    droneGain.gain.value = 0.035;

    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(audioCtx.destination);

    drone1.start();
    drone2.start();

    activeAudioNodes.push(drone1, drone2);

    function playChimeLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Eid") {
            try { drone1.stop(); } catch (e) { }
            try { drone2.stop(); } catch (e) { }
            return;
        }

        const scale = [440, 494, 554, 659, 740]; // Pentatonic Major
        const freq = scale[chimeIndex % scale.length];

        const time = audioCtx.currentTime;
        const chime = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        chime.type = "sine";
        chime.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 1.5);

        chime.connect(gain);
        gain.connect(audioCtx.destination);
        chime.start(time);
        chime.stop(time + 1.6);

        chimeIndex++;
        audioTimeout = setTimeout(playChimeLoop, 1500 + Math.random() * 2000);
    }
    playChimeLoop();
}

// 4. Pongal Harvest syncopations
function playPongalSoundscape() {
    let beatIndex = 0;
    const tempo = 96;
    const beatDuration = 60 / tempo;

    function playPongalLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Pongal") return;

        const pattern = [1, 0, 0, 1, 0.5, 0, 1, 0.4];
        const strength = pattern[beatIndex % pattern.length];

        if (strength > 0) {
            synthesizeClap(strength);
        }

        beatIndex++;
        audioTimeout = setTimeout(playPongalLoop, (beatDuration * 1000) / 2);
    }
    playPongalLoop();
}

function synthesizeClap(strength) {
    const time = audioCtx.currentTime;
    const bufferSize = audioCtx.sampleRate * 0.08;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1100;
    filter.Q.value = 3;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(strength * 0.16, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start(time);
}

// 5. Navratri Dandiya tapping sticks
function playNavratriSoundscape(sticksElement) {
    let beatIndex = 0;
    const tempo = 124;
    const beatDuration = 60 / tempo;

    function playNavratriLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Navratri") return;

        const pattern = [1, 1, 0.6, 1, 0, 1, 1, 0.6];
        const strength = pattern[beatIndex % pattern.length];

        if (strength > 0) {
            synthesizeDandiyaStrike(strength);
            if (sticksElement) {
                sticksElement.classList.add('beat-pulse');
                setTimeout(() => sticksElement.classList.remove('beat-pulse'), 150);
            }
        }

        beatIndex++;
        audioTimeout = setTimeout(playNavratriLoop, (beatDuration * 1000) / 2);
    }
    playNavratriLoop();
}

function synthesizeDandiyaStrike(strength) {
    const time = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1350, time);
    osc.frequency.exponentialRampToValueAtTime(750, time + 0.04);

    gain.gain.setValueAtTime(strength * 0.14, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.05);
}

// 6. Bihu High-tempo Assamese Dhol beat
function playBihuSoundscape(drumElement) {
    let beatIndex = 0;
    const tempo = 142;
    const beatDuration = 60 / tempo;

    function playBihuLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Bihu") return;

        const pattern = [1, 0.5, 1, 0.5, 1, 1, 0.5, 1];
        const strength = pattern[beatIndex % pattern.length];

        if (strength > 0) {
            synthesizeDholStrike(strength * 1.1);
            if (drumElement) {
                drumElement.classList.add('beat-pulse');
                setTimeout(() => drumElement.classList.remove('beat-pulse'), 150);
            }
        }

        beatIndex++;
        audioTimeout = setTimeout(playBihuLoop, (beatDuration * 1000) / 2);
    }
    playBihuLoop();
}

// 7. Generic State Ambient Drone
function playStateSoundscape(stateName) {
    initAudioSynth();
    stopSoundscape();

    soundscapeActive = true;
    currentFestivalPlaying = "State";

    // Play a mystical sitar/flute-like ambient drone
    const drone1 = audioCtx.createOscillator();
    const drone2 = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();

    drone1.type = "sine";
    drone1.frequency.value = 146.83; // D3
    drone2.type = "triangle";
    drone2.frequency.value = 220.00; // A3

    droneGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 2); // Fade in

    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(audioCtx.destination);

    drone1.start();
    drone2.start();

    activeAudioNodes.push(drone1, drone2);

    // Add occasional wind chimes/bells
    function playStateChime() {
        if (!soundscapeActive || currentFestivalPlaying !== "State") return;

        const scale = [587.33, 659.25, 739.99, 880.00, 987.77]; // D Major Pentatonic
        const freq = scale[Math.floor(Math.random() * scale.length)];

        const time = audioCtx.currentTime;
        const chime = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        chime.type = "sine";
        chime.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 2);

        chime.connect(gain);
        gain.connect(audioCtx.destination);
        chime.start(time);
        chime.stop(time + 2.1);

        audioTimeout = setTimeout(playStateChime, 2000 + Math.random() * 4000);
    }
    playStateChime();
}

function initCulturePage() {
    const gridContainer = document.getElementById('culture-grid-container');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const modal = document.getElementById('culture-modal');
    const modalClose = document.getElementById('culture-modal-close');
    const mBadge = document.getElementById('culture-modal-badge');
    const mTitle = document.getElementById('culture-modal-title');
    const mImg = document.getElementById('culture-modal-img');
    const mDesc = document.getElementById('culture-modal-description');

    let currentCategory = 'all';

    render();

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');

            gridContainer.style.opacity = '0';
            gridContainer.style.transform = 'translateY(15px)';
            gridContainer.style.transition = 'opacity 0.25s, transform 0.25s';

            setTimeout(() => {
                render();
                gridContainer.style.opacity = '1';
                gridContainer.style.transform = 'translateY(0)';
            }, 200);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
        modal.classList.remove('open');
    }

    function render() {
        gridContainer.innerHTML = '';

        const filtered = currentCategory === 'all'
            ? cultureData
            : cultureData.filter(item => item.category === currentCategory);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'culture-card-standalone glass-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="cuisine-card-body">
                    <span class="cuisine-origin">${item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description.substring(0, 120)}...</p>
                </div>
            `;

            card.addEventListener('click', () => {
                mBadge.innerText = item.category;
                mBadge.className = `modal-badge ${item.category === 'dance' ? 'green-bg' : item.category === 'music' ? 'gold-bg' : 'saffron-bg'}`;
                mTitle.innerText = item.title;
                mImg.src = item.image;
                mImg.alt = item.title;
                mDesc.innerText = item.description;

                modal.classList.add('open');
            });

            gridContainer.appendChild(card);
        });
    }
}

function initSportsPage() {
    const athleteGrid = document.getElementById('sports-athlete-grid');
    const searchInput = document.getElementById('sports-search-input');
    const filterButtons = document.querySelectorAll('[data-sports-filter]');
    const timelineGrid = document.getElementById('sports-timeline');
    const timelineDetail = document.getElementById('sports-timeline-detail');
    const modal = document.getElementById('sports-modal');
    const modalClose = document.getElementById('sports-modal-close');
    const modalAvatar = document.getElementById('sports-modal-avatar');
    const modalCategory = document.getElementById('sports-modal-category');
    const modalTitle = document.getElementById('sports-modal-title');
    const modalSubtitle = document.getElementById('sports-modal-subtitle');
    const modalStory = document.getElementById('sports-modal-story');
    const modalHighlights = document.getElementById('sports-modal-highlights');
    const modalStats = document.getElementById('sports-modal-stats');
    const sportsSection = document.getElementById('sports-athletes-section');

    if (!athleteGrid || !searchInput || !filterButtons.length || !timelineGrid || !timelineDetail || !modal || !modalClose) {
        return;
    }

    // Sports page uses the same fade-in class as the homepage, but it does
    // not run the homepage scroll observer. Reveal those sections immediately.
    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const athleteData = [
        {
            id: 'sachin-tendulkar',
            category: 'cricket',
            name: 'Sachin Tendulkar',
            subtitle: 'Master Blaster',
            image: 'assets/sports/sachin-tendulkar.png',
            summary: 'A benchmark for longevity, timing, and calm under pressure.',
            story: 'Sachin Tendulkar became the face of Indian batting for more than two decades. His records, consistency, and composure helped turn cricket into a shared national passion.',
            highlights: ['200 Test matches', '2011 World Cup winner', 'Most international runs'],
            stats: [
                { label: 'Role', value: 'Top-order batter' },
                { label: 'Legacy', value: 'Cricket icon' },
                { label: 'Era', value: '1989-2013' }
            ]
        },
        {
            id: 'ms-dhoni',
            category: 'cricket',
            name: 'M. S. Dhoni',
            subtitle: 'Captain Cool',
            image: 'assets/sports/ms-dhoni.png',
            summary: 'A calm leader who delivered India across formats.',
            story: 'M. S. Dhoni guided India to major white-ball titles and became known for sharp decision-making, calm finishing, and a fearless approach to leadership.',
            highlights: ['2007 T20 World Cup', '2011 ODI World Cup', '2013 Champions Trophy'],
            stats: [
                { label: 'Role', value: 'Wicketkeeper-captain' },
                { label: 'Leadership', value: 'Title-winning captain' },
                { label: 'Style', value: 'Finisher' }
            ]
        },
        {
            id: 'harmanpreet-kaur',
            category: 'cricket',
            name: 'Harmanpreet Kaur',
            subtitle: 'Modern match-winner',
            image: 'assets/sports/harmanpreet-kaur.png',
            summary: 'An aggressive leader shaping the next era of Indian womenâ€™s cricket.',
            story: 'Harmanpreet Kaur is one of the most influential voices in Indian womenâ€™s cricket. Her power hitting and leadership have helped expand the sportâ€™s visibility and ambition.',
            highlights: ['ICC tournament standout', 'India captain', 'Big-match temperament'],
            stats: [
                { label: 'Role', value: 'Batting all-rounder' },
                { label: 'Focus', value: 'Power play leader' },
                { label: 'Impact', value: 'Womenâ€™s cricket growth' }
            ]
        },
        {
            id: 'abhinav-bindra',
            category: 'olympics',
            name: 'Abhinav Bindra',
            image: 'assets/sports/abhinav-bindra.png',
            subtitle: 'Indiaâ€™s first individual Olympic gold medalist',
            summary: 'A milestone figure in Indiaâ€™s Olympic story.',
            story: 'At Beijing 2008, Abhinav Bindra won Indiaâ€™s first individual Olympic gold in shooting. That achievement changed the countryâ€™s expectations of what was possible in precision sport.',
            highlights: ['2008 Olympic gold', 'World champion shooter', 'Enduring sporting benchmark'],
            stats: [
                { label: 'Sport', value: 'Shooting' },
                { label: 'Gold', value: 'Olympic champion' },
                { label: 'Era', value: '2000s' }
            ]
        },
        {
            id: 'pv-sindhu',
            category: 'olympics',
            name: 'P. V. Sindhu',
            subtitle: 'Badminton trailblazer',
            image: 'assets/sports/pv-sindhu.png',
            summary: 'A consistent medal contender who raised the bar for Indian badminton.',
            story: 'P. V. Sindhu became the first Indian woman to win two Olympic medals. Her speed, discipline, and clutch play turned badminton into a major national success story.',
            highlights: ['Olympic silver and bronze', 'World Championships medalist', 'Elite badminton standard'],
            stats: [
                { label: 'Sport', value: 'Badminton' },
                { label: 'Signature', value: 'Explosive rallies' },
                { label: 'Legacy', value: 'Two-time Olympic medallist' }
            ]
        },
        {
            id: 'neeraj-chopra',
            category: 'olympics',
            name: 'Neeraj Chopra',
            subtitle: 'Javelin pioneer',
            image: 'assets/sports/neeraj-chopra.png',
            summary: 'The athlete who opened a new chapter for Indian athletics.',
            story: 'Neeraj Chopra won Olympic gold in javelin throw and inspired a wave of interest in track and field. His success showed that Indian athletes could dominate in throwing events on the world stage.',
            highlights: ['2021 Olympic gold', 'World championship medal', 'Athletics breakthrough'],
            stats: [
                { label: 'Sport', value: 'Javelin throw' },
                { label: 'Strength', value: 'Explosive power' },
                { label: 'Impact', value: 'Athletics landmark' }
            ]
        },
        {
            id: 'anup-kumar',
            category: 'indigenous',
            name: 'Anup Kumar',
            subtitle: 'Kabaddi leader',
            image: 'assets/sports/anup-kumar.png',
            summary: 'A composed raider and captain who defined modern kabaddi leadership.',
            story: 'Anup Kumar helped kabaddi move from local grounds to national spotlight. His technique, reading of the mat, and leadership made him a reference point for the sport.',
            highlights: ['Pro Kabaddi era star', 'National captain', 'Kabaddi strategist'],
            stats: [
                { label: 'Sport', value: 'Kabaddi' },
                { label: 'Role', value: 'Raider-captain' },
                { label: 'Legacy', value: 'Modern kabaddi icon' }
            ]
        },
        {
            id: 'pardeep-narwal',
            category: 'indigenous',
            name: 'Pardeep Narwal',
            subtitle: 'Record-setting raider',
            image: 'assets/sports/pradeep-narwal.png',
            summary: 'One of kabaddiâ€™s most feared scorers in the league era.',
            story: 'Pardeep Narwal became a symbol of kabaddiâ€™s fast, tactical evolution. His pace and scoring record helped the sport reach a wider audience through televised league play.',
            highlights: ['Record raid totals', 'League standout', 'High-pressure scorer'],
            stats: [
                { label: 'Sport', value: 'Kabaddi' },
                { label: 'Style', value: 'Explosive raids' },
                { label: 'Impact', value: 'Fan favorite' }
            ]
        },
        {
            id: 'uday-deshpande',
            category: 'indigenous',
            name: 'Uday Deshpande',
            subtitle: 'Mallakhamb revivalist',
            image: 'assets/sports/uday-deshpande.png',
            summary: 'A major figure in preserving and promoting mallakhamb.',
            story: 'Uday Deshpande has been central to the modern revival of mallakhamb, the traditional strength-and-gymnastics discipline. His work kept a historic indigenous practice visible for new generations.',
            highlights: ['Mallakhamb coach', 'Heritage revival', 'Strength and balance expert'],
            stats: [
                { label: 'Sport', value: 'Mallakhamb' },
                { label: 'Focus', value: 'Heritage training' },
                { label: 'Legacy', value: 'Living tradition' }
            ]
        }
    ];

    const timelineData = [
        {
            id: 'all',
            category: 'all',
            year: '1928',
            title: 'India begins its hockey dynasty',
            summary: 'A gold-medal run in Amsterdam helped establish India as a global hockey force and laid early Olympic sporting pride.',
            detail: 'The 1928 Olympic gold in hockey became an early symbol of Indian sporting excellence. It set the tone for future Olympic ambition and gave the country a durable international identity in team sport.'
        },
        {
            id: 'cricket-1983',
            category: 'cricket',
            year: '1983',
            title: 'World Cup triumph at Lordâ€™s',
            summary: 'Indiaâ€™s first Cricket World Cup win transformed cricket into a national obsession.',
            detail: 'The 1983 World Cup victory under Kapil Dev reshaped Indian cricket forever. It proved that India could beat the best on the world stage and inspired a generation of players and fans.'
        },
        {
            id: 'olympics-2008',
            category: 'olympics',
            year: '2008',
            title: 'First individual Olympic gold',
            summary: 'Abhinav Bindraâ€™s shooting gold in Beijing became a defining Olympic breakthrough.',
            detail: 'Bindraâ€™s gold medal in 2008 changed the emotional ceiling of Indian sport. It showed that an individual Indian athlete could deliver gold at the highest level of global competition.'
        },
        {
            id: 'indigenous-2014',
            category: 'indigenous',
            year: '2014',
            title: 'Kabaddi returns to the mainstream',
            summary: 'The league era brought indigenous sports like kabaddi into living rooms across the country.',
            detail: 'Televised league competition gave kabaddi a fresh audience, bigger stages, and stronger youth participation. The format helped connect a traditional game to a modern sports ecosystem.'
        },
        {
            id: 'olympics-2021',
            category: 'olympics',
            year: '2021',
            title: 'Neeraj Chopra wins javelin gold',
            summary: 'Indiaâ€™s first Olympic athletics gold became a landmark moment for track and field.',
            detail: 'Neeraj Chopraâ€™s gold in javelin throw turned athletics into a real medal pathway for India. The victory inspired broader investment and interest in field events.'
        }
    ];

    let activeFilter = 'all';
    let activeTimelineId = 'all';
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    renderTimeline();
    renderTimelineDetail(timelineData[0]);
    setActiveTimelineButton(timelineGrid.querySelector('[data-timeline-id="all"]'));
    renderAthletes();
    setActiveFilterButton(activeFilter);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.getAttribute('data-sports-filter') || 'all';
            setActiveFilterButton(activeFilter);

            const matchingMilestone = timelineData.find(item => item.category === activeFilter) || timelineData[0];
            activeTimelineId = matchingMilestone.id;
            setActiveTimelineButton(timelineGrid.querySelector(`[data-timeline-id="${matchingMilestone.id}"]`));
            renderTimelineDetail(matchingMilestone);
            renderAthletes();
        });
    });

    searchInput.addEventListener('input', () => {
        renderAthletes();
    });

    timelineGrid.addEventListener('click', (event) => {
        const button = event.target.closest('[data-timeline-filter]');
        if (!button) return;

        const filter = button.getAttribute('data-timeline-filter') || 'all';
        activeTimelineId = button.getAttribute('data-timeline-id') || 'all';
        activeFilter = filter;
        setActiveFilterButton(filter);
        setActiveTimelineButton(button);

        const milestone = timelineData.find(item => item.id === activeTimelineId) || timelineData[0];
        renderTimelineDetail(milestone);
        renderAthletes();
        sportsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            trapModalFocus(event);
        }
    });

    function setActiveFilterButton(filterValue) {
        filterButtons.forEach(btn => {
            const isActive = (btn.getAttribute('data-sports-filter') || 'all') === filterValue;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function setActiveTimelineButton(activeButton) {
        const buttons = timelineGrid.querySelectorAll('[data-timeline-filter]');
        buttons.forEach(btn => {
            const isActive = activeButton ? btn === activeButton : false;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function renderAthletes() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredAthletes = athleteData.filter(athlete => {
            const matchesFilter = activeFilter === 'all' || athlete.category === activeFilter;
            const matchesSearch = !query || [
                athlete.name,
                athlete.subtitle,
                athlete.summary,
                athlete.story,
                athlete.category,
                ...(athlete.highlights || [])
            ].join(' ').toLowerCase().includes(query);
            return matchesFilter && matchesSearch;
        });

        athleteGrid.innerHTML = '';

        if (filteredAthletes.length === 0) {
            athleteGrid.innerHTML = `
                <div class="sports-empty-state glass-card">
                    <h3>No athletes found</h3>
                    <p>Try a different search term or switch back to All categories.</p>
                    <button type="button" class="btn btn-primary" id="sports-reset-filters">Show All Athletes</button>
                </div>
            `;

            const resetBtn = document.getElementById('sports-reset-filters');
            resetBtn?.addEventListener('click', () => {
                searchInput.value = '';
                activeFilter = 'all';
                activeTimelineId = 'all';
                setActiveFilterButton('all');
                setActiveTimelineButton(timelineGrid.querySelector('[data-timeline-id="all"]'));
                renderTimelineDetail(timelineData[0]);
                renderAthletes();
            });
            return;
        }

        filteredAthletes.forEach(athlete => {
            const card = document.createElement('article');
            card.className = 'athlete-card glass-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${athlete.name}`);
            card.setAttribute('data-category', athlete.category);

            card.innerHTML = `
                <div class="athlete-card-header">
                    <div class="athlete-media ${athlete.category}">
                        <img src="${athlete.image}" alt="${athlete.name}" loading="lazy">
                    </div>
                    <div class="athlete-card-title">
                        <span class="sports-badge ${athlete.category}">${getCategoryLabel(athlete.category)}</span>
                        <h3>${athlete.name}</h3>
                        <p>${athlete.subtitle}</p>
                    </div>
                </div>
                <p class="athlete-summary">${athlete.summary}</p>
                <div class="achievement-chip-row">
                    ${athlete.highlights.map(item => `<span class="achievement-chip">${item}</span>`).join('')}
                </div>
                <div class="athlete-card-footer">
                    <span class="card-sport-note">Click to explore career highlights</span>
                    <button type="button" class="btn btn-secondary athlete-view-btn">View Details</button>
                </div>
            `;

            card.addEventListener('click', () => openModal(athlete, card));
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(athlete, card);
                }
            });

            athleteGrid.appendChild(card);
        });
    }

    function renderTimeline() {
        timelineGrid.innerHTML = '';

        timelineData.forEach(item => {
            const timelineButton = document.createElement('button');
            timelineButton.type = 'button';
            timelineButton.className = `sports-timeline-item glass-card ${item.category}`;
            timelineButton.setAttribute('data-timeline-filter', item.category);
            timelineButton.setAttribute('data-timeline-id', item.id);
            timelineButton.setAttribute('aria-pressed', 'false');
            timelineButton.innerHTML = `
                <span class="timeline-year">${item.year}</span>
                <span class="sports-badge ${item.category}">${getCategoryLabel(item.category)}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
            `;

            timelineGrid.appendChild(timelineButton);
        });
    }

    function renderTimelineDetail(item) {
        timelineDetail.innerHTML = `
            <div class="timeline-detail-head">
                <span class="sports-badge ${item.category}">${getCategoryLabel(item.category)}</span>
                <span class="timeline-detail-year">${item.year}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
        `;
    }

    function openModal(athlete, trigger) {
        lastFocusedTrigger = trigger || document.activeElement;
        isModalOpen = true;

        modalCategory.className = `sports-badge ${athlete.category}`;
        modalCategory.textContent = getCategoryLabel(athlete.category);
        modalTitle.textContent = athlete.name;
        modalSubtitle.textContent = athlete.subtitle;
        modalStory.textContent = athlete.story;

        modalHighlights.innerHTML = athlete.highlights.map(item => `<li>${item}</li>`).join('');
        modalStats.innerHTML = athlete.stats.map(stat => `
            <div class="modal-stat">
                <span class="modal-stat-label">${stat.label}</span>
                <span class="modal-stat-value">${stat.value}</span>
            </div>
        `).join('');

        modalAvatar.className = `sports-modal-avatar ${athlete.category}`;
        modalAvatar.innerHTML = `<img src="${athlete.image}" alt="${athlete.name}" loading="lazy">`;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modalClose.focus();
        });
    }

    function closeModal() {
        if (!isModalOpen) return;

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;

        if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
            lastFocusedTrigger.focus();
        }
    }

    function trapModalFocus(event) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements.length) return;

        const focusable = Array.from(focusableElements).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function getCategoryLabel(category) {
        if (category === 'cricket') return 'Cricket';
        if (category === 'olympics') return 'Olympics';
        if (category === 'indigenous') return 'Indigenous Sports';
        return 'All';
    }
}

function initSciencePage() {
    const scienceAsset = fileName => `assets/science/${encodeURIComponent(fileName)}`;
    const statsGrid = document.getElementById('science-stats-grid');
    const isroGrid = document.getElementById('science-isro-grid');
    const scientistGrid = document.getElementById('science-scientist-grid');
    const searchInput = document.getElementById('science-search-input');
    const filterButtons = document.querySelectorAll('[data-science-filter]');
    const timelineGrid = document.getElementById('science-timeline');
    const timelineDetail = document.getElementById('science-timeline-detail');
    const modal = document.getElementById('science-modal');
    const modalClose = document.getElementById('science-modal-close');
    const modalAvatar = document.getElementById('science-modal-avatar');
    const modalCategory = document.getElementById('science-modal-category');
    const modalTitle = document.getElementById('science-modal-title');
    const modalSubtitle = document.getElementById('science-modal-subtitle');
    const modalStory = document.getElementById('science-modal-story');
    const modalHighlights = document.getElementById('science-modal-highlights');
    const modalStats = document.getElementById('science-modal-stats');

    if (!statsGrid || !isroGrid || !scientistGrid || !searchInput || !filterButtons.length || !timelineGrid || !timelineDetail || !modal || !modalClose) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const statsData = [
        {
            label: 'Space missions',
            value: '100+',
            detail: 'India has built a deep track record across Earth orbit, lunar, Mars, and solar science missions.'
        },
        {
            label: 'Nobel-winning discovery',
            value: 'Raman Effect',
            detail: "C. V. Raman's 1928 discovery reshaped physics and earned the 1930 Nobel Prize."
        },
        {
            label: 'Satellites launched',
            value: '400+',
            detail: 'Indian launch systems have carried domestic and international payloads into orbit for decades.'
        },
        {
            label: 'Research institutions',
            value: '70+',
            detail: 'Premier labs, councils, and universities continue to power discovery across the country.'
        }
    ];

    const isroData = [
        { id: 'chandrayaan-3', year: '2023', title: 'Chandrayaan-3', type: 'Lunar Mission', category: 'space', image: scienceAsset('chandrayaan-3.png'), summary: "India achieved a historic soft landing near the Moon's south polar region.", contribution: 'Precision landing, rover operations, and reusable landing systems.', highlights: ['South polar region', 'Pragyan rover', 'Soft landing milestone'] },
        { id: 'mangalyaan', year: '2013', title: 'Mangalyaan', type: 'Mars Mission', category: 'space', image: scienceAsset('mangalyaan.png'), summary: 'The Mars Orbiter Mission proved India could reach another planet on a disciplined budget.', contribution: 'Reliable interplanetary navigation and deep-space operations.', highlights: ['Mars orbit insertion', 'Low-cost engineering', 'Global recognition'] },
        { id: 'aryabhata', year: '1975', title: 'Aryabhata', type: 'First Satellite', category: 'space', image: scienceAsset('aryabhata.png'), summary: "India's first satellite opened the country's space era.", contribution: 'A foundation for later launch, communications, and observation programs.', highlights: ['First Indian satellite', '1975 launch', 'Space age milestone'] },
        { id: 'aditya-l1', year: '2023', title: 'Aditya-L1', type: 'Solar Mission', category: 'space', image: scienceAsset('aditya-l1.png'), summary: "India's solar observatory studies the Sun from the L1 vantage point.", contribution: 'Solar corona, winds, and space-weather observations.', highlights: ['Sun monitoring', 'L1 halo orbit', 'Space weather'] }
    ];

    const scientistData = [
        { id: 'cv-raman', category: 'physics', image: scienceAsset('cv-raman.png'), name: 'C. V. Raman', subtitle: 'Physics pioneer', achievement: 'Discovered the Raman Effect.', contribution: 'Showed how light changes wavelength while scattering through matter.', story: 'C. V. Raman transformed Indian science with the Raman Effect, a discovery that became one of the most famous results in modern physics. His work placed India on the global scientific map and inspired generations of researchers.', highlights: ['1930 Nobel Prize', 'Raman spectroscopy', 'Foundational physics'], stats: [{ label: 'Field', value: 'Physics' }, { label: 'Legacy', value: 'Light scattering' }, { label: 'Era', value: '1920s-1950s' }] },
        { id: 'apj-abdul-kalam', category: 'space', image: scienceAsset('apj-abudal kalam.png'), name: 'A. P. J. Abdul Kalam', subtitle: 'Missile scientist and teacher', achievement: "Helped lead India's launch and missile programs.", contribution: 'Connected engineering, space systems, and national ambition.', story: "A. P. J. Abdul Kalam became one of India's most admired science leaders. His work in rockets, missile development, and public science communication made him a symbol of aspiration and possibility.", highlights: ['Launch systems', 'Missile development', 'Public science leader'], stats: [{ label: 'Field', value: 'Space' }, { label: 'Known for', value: 'Guiding large systems' }, { label: 'Legacy', value: "People's President" }] },
        { id: 'vikram-sarabhai', category: 'space', image: scienceAsset('vikram-sarabhai.png'), name: 'Vikram Sarabhai', subtitle: 'Father of Indian space program', achievement: 'Built the vision that became ISRO.', contribution: 'Championed satellites, applications, and scientific institutions.', story: "Vikram Sarabhai argued that space technology should solve real problems on Earth. That vision shaped India's space program into a practical national platform for communication, weather, and science.", highlights: ['ISRO inspiration', 'Space applications', 'Institution builder'], stats: [{ label: 'Field', value: 'Space' }, { label: 'Role', value: 'Visionary' }, { label: 'Legacy', value: 'Institution builder' }] },
        { id: 'homi-bhabha', category: 'physics', image: scienceAsset('homi-bhabha.png'), name: 'Homi J. Bhabha', subtitle: 'Architect of nuclear science', achievement: 'Founded major Indian research institutions.', contribution: 'Built long-term scientific capacity in physics and atomic research.', story: "Homi J. Bhabha helped establish a strong scientific foundation through TIFR and other research efforts. His work strengthened India's capacity in physics, energy, and advanced research.", highlights: ['TIFR founder', 'Atomic research', 'Scientific institution builder'], stats: [{ label: 'Field', value: 'Physics' }, { label: 'Focus', value: 'Research ecosystem' }, { label: 'Legacy', value: 'Foundational leader' }] },
        { id: 'janaki-ammal', category: 'biology', image: scienceAsset('janaki-ammal.png'), name: 'Janaki Ammal', subtitle: 'Botanist and cytogeneticist', achievement: 'Advanced plant breeding and biodiversity research.', contribution: 'Improved understanding of Indian flora and agricultural genetics.', story: 'Janaki Ammal became a pioneering voice in botany and cytogenetics. Her work on plants, chromosomes, and biodiversity helped frame a more scientific approach to agriculture and conservation.', highlights: ['Botany pioneer', 'Plant genetics', 'Biodiversity research'], stats: [{ label: 'Field', value: 'Biology' }, { label: 'Focus', value: 'Plants' }, { label: 'Legacy', value: 'Trailblazing researcher' }] },
        { id: 'ms-swaminathan', category: 'agriculture', image: scienceAsset('ms-swaminathan.png'), name: 'M. S. Swaminathan', subtitle: 'Green Revolution leader', achievement: 'Helped transform food security in India.', contribution: 'Improved crop productivity and agricultural resilience.', story: "M. S. Swaminathan played a defining role in India's Green Revolution. His research and advocacy improved agricultural output and made food security a central national priority.", highlights: ['Green Revolution', 'Food security', 'Crop science'], stats: [{ label: 'Field', value: 'Agriculture' }, { label: 'Focus', value: 'Crop systems' }, { label: 'Legacy', value: 'Food security' }] },
        { id: 'srinivasa-ramanujan', category: 'mathematics', image: scienceAsset('srinivas-ramanujan.png'), name: 'Srinivasa Ramanujan', subtitle: 'Mathematical prodigy', achievement: 'Expanded number theory with deep new identities.', contribution: 'Left a lasting mark on pure mathematics and analytic number theory.', story: "Srinivasa Ramanujan's formulas and insights continue to influence mathematics worldwide. His work remains a reminder that original thinking can emerge far from established centers of power.", highlights: ['Number theory', 'Infinite series', 'Global mathematics icon'], stats: [{ label: 'Field', value: 'Mathematics' }, { label: 'Style', value: 'Pure insight' }, { label: 'Legacy', value: 'International influence' }] }
    ];

    const timelineData = [
        { id: 'raman-effect', category: 'physics', year: '1928', title: 'Raman Effect discovered', summary: 'A landmark physics breakthrough in light scattering.', detail: 'C. V. Raman and K. S. Krishnan showed that light can change wavelength when it scatters through a medium. The result became a defining achievement for Indian science and a foundation for spectroscopy.' },
        { id: 'tifr-founded', category: 'physics', year: '1945', title: 'TIFR is founded', summary: 'A leading center for advanced Indian research takes shape.', detail: 'Homi J. Bhabha helped establish the Tata Institute of Fundamental Research, creating a long-term home for physics, mathematics, and broader scientific inquiry.' },
        { id: 'isro-founded', category: 'space', year: '1969', title: 'ISRO is founded', summary: 'India organizes a national space program for satellites and launch systems.', detail: "The Indian Space Research Organisation brought together launch, satellite, and research efforts under one national mission. It became the backbone of India's modern space capability." },
        { id: 'aryabhata-launch', category: 'space', year: '1975', title: 'Aryabhata enters orbit', summary: 'India launches its first satellite and steps into the space age.', detail: "Aryabhata marked the country's first successful satellite mission and proved that India could design, build, and launch hardware for space exploration." },
        { id: 'mangalyaan-launch', category: 'space', year: '2013', title: 'Mangalyaan launches', summary: 'The Mars Orbiter Mission earns global attention.', detail: 'Mangalyaan demonstrated precise interplanetary engineering and efficient mission design. Its success became a symbol of Indian scientific discipline and ambition.' },
        { id: 'chandrayaan-3-landing', category: 'space', year: '2023', title: 'Chandrayaan-3 lands on the Moon', summary: 'India completes a historic soft landing near the lunar south pole.', detail: 'Chandrayaan-3’s landing created a defining scientific moment. The mission combined robotics, navigation, and lander control to achieve a feat that resonated across the world.' },
        { id: 'aditya-l1-orbit', category: 'space', year: '2024', title: 'Aditya-L1 reaches orbit', summary: 'India turns its focus toward the Sun and space weather.', detail: "Aditya-L1 helps study the Sun's corona, winds, and solar activity from the L1 vantage point. It expanded India's portfolio from planetary exploration to solar science." }
    ];

    const categoryLabels = {
        all: 'All',
        space: 'Space',
        physics: 'Physics',
        medicine: 'Medicine',
        agriculture: 'Agriculture',
        mathematics: 'Mathematics',
        biology: 'Biology'
    };

    let activeFilter = 'all';
    let activeTimelineId = timelineData[0].id;
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    renderStats();
    renderIsroCards();
    renderTimeline();
    renderTimelineDetail(timelineData[0]);
    setActiveTimelineButton(timelineGrid.querySelector(`[data-science-timeline-id="${timelineData[0].id}"]`));
    renderScientists();
    setActiveFilterButton(activeFilter);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.getAttribute('data-science-filter') || 'all';
            setActiveFilterButton(activeFilter);
            renderScientists();
        });
    });

    searchInput.addEventListener('input', () => {
        renderScientists();
    });

    timelineGrid.addEventListener('click', event => {
        const button = event.target.closest('[data-science-timeline-id]');
        if (!button) return;

        activeTimelineId = button.getAttribute('data-science-timeline-id') || timelineData[0].id;
        const milestone = timelineData.find(item => item.id === activeTimelineId) || timelineData[0];
        setActiveTimelineButton(button);
        renderTimelineDetail(milestone);
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', event => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            trapModalFocus(event);
        }
    });

    function renderStats() {
        statsGrid.innerHTML = statsData.map(stat => `
            <article class="science-stat-card glass-card">
                <span class="science-stat-label">${stat.label}</span>
                <strong class="science-stat-value">${stat.value}</strong>
                <p class="science-stat-detail">${stat.detail}</p>
            </article>
        `).join('');
    }

    function renderIsroCards() {
        isroGrid.innerHTML = isroData.map(item => `
            <article class="science-isro-card glass-card" data-mission-type="${item.category}">
                <div class="science-isro-card-top">
                    <div class="science-mission-avatar science-avatar-frame" aria-hidden="true">
                        <img class="science-avatar-image science-avatar-image-contain" src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
                    </div>
                    <div class="science-isro-card-head">
                        <span class="science-badge ${item.category}">${categoryLabels[item.category] || 'Space'}</span>
                        <span class="science-mission-year">${item.year}</span>
                    </div>
                </div>
                <h3>${item.title}</h3>
                <p class="science-mission-summary">${item.summary}</p>
                <p class="science-mission-contribution">${item.contribution}</p>
                <div class="science-chip-row">${item.highlights.map(highlight => `<span class="science-chip">${highlight}</span>`).join('')}</div>
            </article>
        `).join('');
    }

    function renderScientists() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredScientists = scientistData.filter(scientist => {
            const matchesFilter = activeFilter === 'all' || scientist.category === activeFilter;
            const matchesSearch = !query || [scientist.name, scientist.subtitle, scientist.achievement, scientist.contribution, scientist.story, scientist.category, ...(scientist.highlights || [])].join(' ').toLowerCase().includes(query);
            return matchesFilter && matchesSearch;
        });

        scientistGrid.innerHTML = '';

        if (filteredScientists.length === 0) {
            scientistGrid.innerHTML = `
                <div class="science-empty-state glass-card">
                    <h3>No scientists found</h3>
                    <p>Try a different search term or switch back to All Fields.</p>
                    <button type="button" class="btn btn-primary" id="science-reset-filters">Show All Scientists</button>
                </div>
            `;

            document.getElementById('science-reset-filters')?.addEventListener('click', () => {
                searchInput.value = '';
                activeFilter = 'all';
                setActiveFilterButton('all');
                renderScientists();
            });
            return;
        }

        filteredScientists.forEach(scientist => {
            const card = document.createElement('article');
            card.className = 'science-scientist-card glass-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${scientist.name}`);
            card.setAttribute('data-category', scientist.category);
            card.setAttribute('data-scientist-id', scientist.id);

            card.innerHTML = `
                <div class="science-scientist-card-head">
                    <div class="science-scientist-avatar science-avatar-frame ${scientist.category} ${scientist.id}" aria-hidden="true">
                        <img class="science-avatar-image science-avatar-image-cover" src="${scientist.image}" alt="${scientist.name}" loading="lazy" decoding="async">
                    </div>
                    <div class="science-scientist-title">
                        <span class="science-badge ${scientist.category}">${categoryLabels[scientist.category] || scientist.category}</span>
                        <h3>${scientist.name}</h3>
                        <p>${scientist.subtitle}</p>
                    </div>
                </div>
                <p class="science-scientist-achievement">${scientist.achievement}</p>
                <p class="science-scientist-contribution">${scientist.contribution}</p>
                <div class="science-chip-row">${scientist.highlights.map(item => `<span class="science-chip">${item}</span>`).join('')}</div>
                <div class="science-scientist-footer">
                    <span class="science-card-note">Click to explore achievements</span>
                    <button type="button" class="btn btn-secondary science-view-btn">Open Details</button>
                </div>
            `;

            card.addEventListener('click', () => openModal(scientist, card));
            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(scientist, card);
                }
            });

            scientistGrid.appendChild(card);
        });
    }

    function renderTimeline() {
        timelineGrid.innerHTML = timelineData.map(item => `
            <button type="button" class="science-timeline-item glass-card ${item.category}" data-science-timeline-id="${item.id}" aria-pressed="false">
                <span class="timeline-year">${item.year}</span>
                <span class="science-badge ${item.category}">${categoryLabels[item.category] || 'Science'}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
            </button>
        `).join('');
    }

    function renderTimelineDetail(item) {
        timelineDetail.innerHTML = `
            <div class="timeline-detail-head">
                <span class="science-badge ${item.category}">${categoryLabels[item.category] || 'Science'}</span>
                <span class="timeline-detail-year">${item.year}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
        `;
    }

    function setActiveFilterButton(filterValue) {
        filterButtons.forEach(btn => {
            const isActive = (btn.getAttribute('data-science-filter') || 'all') === filterValue;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function setActiveTimelineButton(activeButton) {
        const buttons = timelineGrid.querySelectorAll('[data-science-timeline-id]');
        buttons.forEach(btn => {
            const isActive = activeButton ? btn === activeButton : false;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function openModal(scientist, trigger) {
        lastFocusedTrigger = trigger || document.activeElement;
        isModalOpen = true;

        modalCategory.className = `science-badge ${scientist.category}`;
        modalCategory.textContent = categoryLabels[scientist.category] || scientist.category;
        modalTitle.textContent = scientist.name;
        modalSubtitle.textContent = scientist.subtitle;
        modalStory.textContent = scientist.story;

        modalHighlights.innerHTML = scientist.highlights.map(item => `<li>${item}</li>`).join('');
        modalStats.innerHTML = scientist.stats.map(stat => `
            <div class="modal-stat">
                <span class="modal-stat-label">${stat.label}</span>
                <span class="modal-stat-value">${stat.value}</span>
            </div>
        `).join('');

        modalAvatar.className = `science-modal-avatar science-avatar-frame ${scientist.category} ${scientist.id}`;
        modalAvatar.innerHTML = `<img class="science-avatar-image science-avatar-image-cover" src="${scientist.image}" alt="${scientist.name}" loading="lazy" decoding="async">`;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modalClose.focus();
        });
    }

    function closeModal() {
        if (!isModalOpen) return;

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;

        if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
            lastFocusedTrigger.focus();
        }
    }

    function trapModalFocus(event) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusableElements.length) return;

        const focusable = Array.from(focusableElements).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
}

function initMusicPage() {
    const musicAsset = fileName => `assets/music/${encodeURI(fileName)}`;
    const artistGrid = document.getElementById('music-artist-grid');
    const summaryPanel = document.getElementById('music-genre-summary');
    const searchInput = document.getElementById('music-search-input');
    const tabButtons = document.querySelectorAll('[data-music-tab]');
    const instrumentGrid = document.getElementById('music-instrument-grid');
    const modal = document.getElementById('music-modal');
    const modalClose = document.getElementById('music-modal-close');
    const modalAvatar = document.getElementById('music-modal-avatar');
    const modalBadge = document.getElementById('music-modal-badge');
    const modalTitle = document.getElementById('music-modal-title');
    const modalSubtitle = document.getElementById('music-modal-subtitle');
    const modalContribution = document.getElementById('music-modal-contribution');
    const modalRegion = document.getElementById('music-modal-region');
    const modalInstruments = document.getElementById('music-modal-instruments');
    const modalHighlights = document.getElementById('music-modal-highlights');

    if (!artistGrid || !summaryPanel || !searchInput || !tabButtons.length || !instrumentGrid || !modal || !modalClose) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const genreData = {
        classical: {
            label: 'Classical',
            badge: 'Classical lineages',
            title: 'Ragas, gharanas, and temple traditions',
            description: 'Indian classical music carries rigorous melodic and rhythmic systems that reward patience, improvisation, and deep listening. From khayal and dhrupad to Carnatic kritis, the tradition is defined by disciplined expression and living transmission.',
            accent: 'classical',
            chips: ['Raga structure', 'Concert discipline', 'Guru-shishya lineages']
        },
        folk: {
            label: 'Folk',
            badge: 'Community sound',
            title: 'Songs rooted in seasons, labor, and ritual',
            description: 'Folk music keeps everyday memory alive through harvest songs, devotional choruses, wedding pieces, and oral storytelling. It is direct, regional, and deeply tied to local identity.',
            accent: 'folk',
            chips: ['Oral tradition', 'Festival rhythm', 'Regional voices']
        },
        modern: {
            label: 'Modern',
            badge: 'Contemporary sound',
            title: 'Film, fusion, indie, and global reach',
            description: 'Modern Indian music blends cinema, pop, electronica, and crossover sounds. It connects old melodies to new production, widening the audience for Indian voices across languages and platforms.',
            accent: 'modern',
            chips: ['Film music', 'Fusion bands', 'Streaming culture']
        }
    };

    const artistData = [
        {
            id: 'ravi-shankar',
            genre: 'classical',
            name: 'Ravi Shankar',
            subtitle: 'Sitar maestro and global ambassador',
            image: musicAsset('ravi-shankar.png'),
            region: 'Bengal / Pan-Indian',
            contribution: 'Brought Hindustani classical music to world stages and inspired cross-cultural collaborations.',
            highlights: ['Sitar recital', 'Global concert tours', 'Bridge between traditions'],
            instruments: ['Sitar', 'Tanpura'],
            listeningNote: 'A luminous string tone with spacious improvisation and strong melodic arcs.'
        },
        {
            id: 'ms-subbulakshmi',
            genre: 'classical',
            name: 'M. S. Subbulakshmi',
            subtitle: 'Carnatic vocal legend',
            image: musicAsset('ms-subbulakshmi.png'),
            region: 'Tamil Nadu',
            contribution: 'Turned Carnatic music into a cultural beacon through devotional concerts and precise artistry.',
            highlights: ['Vocal purity', 'Devotional repertoire', 'International acclaim'],
            instruments: ['Voice', 'Veena'],
            listeningNote: 'A devotional clarity that makes every phrase feel serene and exact.'
        },
        {
            id: 'bhimsen-joshi',
            genre: 'classical',
            name: 'Bhimsen Joshi',
            subtitle: 'Khayal master of the Kirana gharana',
            image: musicAsset('bhimsen-joshi.png'),
            region: 'Karnataka / Maharashtra',
            contribution: 'Known for expansive ragas, emotional intensity, and a commanding concert presence.',
            highlights: ['Khayal form', 'Kirana gharana', 'Powerful alaap'],
            instruments: ['Voice', 'Harmonium'],
            listeningNote: 'Long, soaring phrases that build from stillness into thrilling melodic movement.'
        },
        {
            id: 'lalgudi-jayaraman',
            genre: 'classical',
            name: 'Lalgudi Jayaraman',
            subtitle: 'Violin innovator',
            image: musicAsset('lalgudi-jayaraman.png'),
            region: 'Tamil Nadu',
            contribution: 'Reimagined Carnatic violin performance with lyrical phrasing and refined accompaniment.',
            highlights: ['Violin technique', 'Carnatic concerts', 'Composer and teacher'],
            instruments: ['Violin', 'Voice'],
            listeningNote: 'Elegant bowing and ornamentation that make the violin sing like a human voice.'
        },
        {
            id: 'zakir-hussain',
            genre: 'classical',
            name: 'Zakir Hussain',
            subtitle: 'Tabla virtuoso',
            image: musicAsset('zakir-hussain.png'),
            region: 'Mumbai / Global',
            contribution: 'Expanded tabla into both classical and crossover spaces with dazzling rhythmic command.',
            highlights: ['Tabla recitals', 'Rhythmic improvisation', 'Cross-genre collaborations'],
            instruments: ['Tabla', 'Percussion'],
            listeningNote: 'Fast, precise tabla language that turns rhythm into a storytelling art form.'
        },
        {
            id: 'baul-tradition',
            genre: 'folk',
            name: 'Baul voices',
            subtitle: 'Mystic Bengali folk tradition',
            image: musicAsset('baul-voices.png'),
            region: 'West Bengal',
            contribution: 'Carried spiritual poetry and portable instruments across villages and gatherings.',
            highlights: ['Ektara and dotara', 'Mystic lyrics', 'Traveling performers'],
            instruments: ['Ektara', 'Dotara'],
            listeningNote: 'Open-throated, wandering songs built around devotion and philosophical longing.'
        },
        {
            id: 'bihu-ensemble',
            genre: 'folk',
            name: 'Bihu ensembles',
            subtitle: 'Assamese harvest music',
            image: musicAsset('bihu-ensembles.png'),
            region: 'Assam',
            contribution: 'Celebrates spring, community, and the energy of the Bihu festival through dance and song.',
            highlights: ['Harvest celebration', 'Community chorus', 'Dance-driven rhythm'],
            instruments: ['Dhol', 'Pepa'],
            listeningNote: 'Bright percussion and celebratory movement that feels alive from the first beat.'
        },
        {
            id: 'lavani-performers',
            genre: 'folk',
            name: 'Lavani performers',
            subtitle: 'Expressive Marathi folk stagecraft',
            image: musicAsset('lavani-performers.png'),
            region: 'Maharashtra',
            contribution: 'Blends fast rhythms, narrative lyrics, and dramatic performance into a vibrant folk form.',
            highlights: ['Taal-heavy rhythms', 'Story-driven lyrics', 'Stage presence'],
            instruments: ['Dholki', 'Manjira'],
            listeningNote: 'A quick pulse with expressive vocals that keep the performance theatrical and direct.'
        },
        {
            id: 'rajasthani-manganiyar',
            genre: 'folk',
            name: 'Rajasthani Manganiyar',
            subtitle: 'Desert ballad tradition',
            image: musicAsset('Rajasthani-Manganiyar.png'),
            region: 'Rajasthan',
            contribution: 'Preserves devotional, heroic, and pastoral songs through richly ornamented vocal style.',
            highlights: ['Desert ballads', 'Wedding songs', 'Oral heritage'],
            instruments: ['Kamaicha', 'Khartal'],
            listeningNote: 'A resonant, earthy sound shaped by the open desert and the pulse of community gatherings.'
        },
        {
            id: 'pandavani',
            genre: 'folk',
            name: 'Pandavani storytellers',
            subtitle: 'Epic narration from Chhattisgarh',
            image: musicAsset('Pandavani-storytellers.png'),
            region: 'Chhattisgarh',
            contribution: 'Performs Mahabharata episodes through song, gesture, and dramatic oral storytelling.',
            highlights: ['Epic narration', 'Stage storytelling', 'Community memory'],
            instruments: ['Tambura', 'Manjira'],
            listeningNote: 'Narrative singing that moves like theatre, carrying myth, memory, and moral reflection.'
        },
        {
            id: 'ar-rahman',
            genre: 'modern',
            name: 'A. R. Rahman',
            subtitle: 'Composer of a new Indian sound',
            image: musicAsset('ar-rahman.png'),
            region: 'Tamil Nadu / Global',
            contribution: 'Reframed film music with layered production, emotional themes, and global collaborators.',
            highlights: ['Film scoring', 'Fusion textures', 'Award-winning soundtracks'],
            instruments: ['Synths', 'Orchestration'],
            listeningNote: 'Polished, cinematic arrangements that travel from intimate melody to huge emotional release.'
        },
        {
            id: 'lata-mangeshkar',
            genre: 'modern',
            name: 'Lata Mangeshkar',
            subtitle: 'Voice of generations',
            image: musicAsset('Lata-Mangeshkar.png'),
            region: 'Maharashtra / Pan-Indian',
            contribution: 'Defined playback singing for decades with unmatched range, clarity, and emotional reach.',
            highlights: ['Playback era', 'National icon', 'Iconic film songs'],
            instruments: ['Voice', 'Orchestral playback'],
            listeningNote: 'A clear, pure voice that made film melodies feel timeless and intimate.'
        },
        {
            id: 'kishore-kumar',
            genre: 'modern',
            name: 'Kishore Kumar',
            subtitle: 'Playful playback legend',
            image: musicAsset('kishore-kumar.png'),
            region: 'Madhya Pradesh / Mumbai',
            contribution: 'Brought spontaneity, humor, and emotional elasticity to Hindi film music.',
            highlights: ['Expressive playback', 'Versatile performer', 'Era-defining hits'],
            instruments: ['Voice', 'Film arrangement'],
            listeningNote: 'Effortless phrasing and playful tone shifts that make every song feel alive.'
        },
        {
            id: 'shreya-ghoshal',
            genre: 'modern',
            name: 'Shreya Ghoshal',
            subtitle: 'Contemporary playback favorite',
            image: musicAsset('shreya-goshal.png'),
            region: 'West Bengal / Mumbai',
            contribution: 'Represents a new generation of film vocals with precision, warmth, and versatility.',
            highlights: ['Multi-language singing', 'Live performances', 'Modern playback standard'],
            instruments: ['Voice', 'Studio arrangement'],
            listeningNote: 'Controlled, expressive singing that moves cleanly through contemporary film textures.'
        },
        {
            id: 'amit-trivedi',
            genre: 'modern',
            name: 'Amit Trivedi',
            subtitle: 'Indie-fusion composer',
            image: musicAsset('amit-trivedi.png'),
            region: 'Gujarat / Mumbai',
            contribution: 'Bridges indie sensibility and film composition with inventive instrumentation.',
            highlights: ['Indie fusion', 'Fresh arrangements', 'Young audience appeal'],
            instruments: ['Guitar', 'Electronics'],
            listeningNote: 'A hybrid sound that feels experimental while staying deeply melodic.'
        }
    ];

    const instrumentData = [
        {
            name: 'Sitar',
            category: 'String',
            description: 'A resonant long-necked lute associated with Hindustani classical performance and meditative melodic flights.',
            image: musicAsset('sitar.png'),
            accent: 'classical'
        },
        {
            name: 'Tabla',
            category: 'Percussion',
            description: 'A pair of tuned drums that can articulate complex rhythmic cycles with remarkable precision.',
            image: musicAsset('tabla.png'),
            accent: 'folk'
        },
        {
            name: 'Veena',
            category: 'String',
            description: 'A sacred and expressive plucked instrument closely tied to Carnatic music and temple aesthetics.',
            image: musicAsset('veena.png'),
            accent: 'modern'
        },
        {
            name: 'Bansuri',
            category: 'Wind',
            description: 'A bamboo flute whose breathy tone is central to many devotional and classical soundscapes.',
            image: musicAsset('bansuri.png'),
            accent: 'classical'
        },
        {
            name: 'Mridangam',
            category: 'Percussion',
            description: 'The foundational drum of Carnatic ensembles, known for its rich tonal range and speed.',
            image: musicAsset('Mridangam.png'),
            accent: 'folk'
        },
        {
            name: 'Sarangi',
            category: 'String',
            description: 'A bowed instrument admired for its close vocal resemblance and emotional depth in North Indian traditions.',
            image: musicAsset('sarangi.png'),
            accent: 'modern'
        }
    ];

    let activeGenre = 'classical';
    let activeAudioId = null;
    let lastFocusedArtistId = null;
    let lastFocusedTriggerKind = 'card';
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    renderInstruments();
    renderArtists();
    setActiveTab(activeGenre);

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            activeGenre = button.getAttribute('data-music-tab') || 'classical';
            setActiveTab(activeGenre);
            renderArtists();
        });
    });

    searchInput.addEventListener('input', () => {
        renderArtists();
    });

    artistGrid.addEventListener('click', event => {
        const playButton = event.target.closest('[data-music-play]');
        if (playButton) {
            event.stopPropagation();
            const card = playButton.closest('[data-artist-id]');
            const artistId = card?.getAttribute('data-artist-id');
            if (!artistId) return;
            activeAudioId = activeAudioId === artistId ? null : artistId;
            renderArtists();
            return;
        }

        const detailsButton = event.target.closest('[data-music-details]');
        const card = event.target.closest('[data-artist-id]');

        if (detailsButton && card) {
            event.stopPropagation();
            openModal(card.getAttribute('data-artist-id'), detailsButton);
            return;
        }

        if (card) {
            openModal(card.getAttribute('data-artist-id'), card);
        }
    });

    artistGrid.addEventListener('keydown', event => {
        const card = event.target.closest('[data-artist-id]');
        if (!card) return;

        if (event.key === 'Enter' || event.key === ' ') {
            const target = event.target;
            if (target.matches('button, a, input, [role="button"]')) {
                return;
            }

            event.preventDefault();
            openModal(card.getAttribute('data-artist-id'), card);
        }
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            trapModalFocus(event);
        }
    });

    function setActiveTab(tabName) {
        tabButtons.forEach(button => {
            const isActive = (button.getAttribute('data-music-tab') || 'classical') === tabName;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function renderInstruments() {
        instrumentGrid.innerHTML = instrumentData.map(instrument => `
            <article class="music-instrument-card glass-card ${instrument.accent}">
                <div class="music-instrument-visual ${instrument.accent}" aria-hidden="true">
                    <img src="${instrument.image}" alt="${instrument.name}" loading="lazy" decoding="async" class="music-instrument-image">
                </div>
                <div class="music-instrument-body">
                    <span class="music-instrument-badge">${instrument.category}</span>
                    <h3>${instrument.name}</h3>
                    <p>${instrument.description}</p>
                </div>
            </article>
        `).join('');
    }

    function renderArtists() {
        const query = searchInput.value.trim().toLowerCase();
        const activeGenreConfig = genreData[activeGenre];
        const filteredArtists = artistData.filter(artist => {
            const matchesGenre = artist.genre === activeGenre;
            const haystack = [
                artist.name,
                artist.subtitle,
                artist.region,
                artist.contribution,
                artist.listeningNote,
                artist.genre,
                ...(artist.highlights || []),
                ...(artist.instruments || [])
            ].join(' ').toLowerCase();
            const matchesSearch = !query || haystack.includes(query);
            return matchesGenre && matchesSearch;
        });

        summaryPanel.innerHTML = `
            <div class="music-genre-summary-copy">
                <span class="section-badge music-summary-badge">${activeGenreConfig.badge}</span>
                <h3>${activeGenreConfig.title}</h3>
                <p>${activeGenreConfig.description}</p>
                <div class="music-chips">
                    ${activeGenreConfig.chips.map(chip => `<span class="music-chip">${chip}</span>`).join('')}
                </div>
            </div>
            <div class="music-summary-stats" aria-label="Genre summary">
                <div class="music-summary-stat">
                    <strong>${filteredArtists.length}</strong>
                    <span>matching artists</span>
                </div>
                <div class="music-summary-stat">
                    <strong>${artistData.filter(item => item.genre === activeGenre).length}</strong>
                    <span>genre profiles</span>
                </div>
                <div class="music-summary-stat">
                    <strong>${activeGenreConfig.label}</strong>
                    <span>current tab</span>
                </div>
            </div>
        `;

        if (filteredArtists.length === 0) {
            artistGrid.innerHTML = `
                <div class="music-empty-state glass-card">
                    <h3>No artists found</h3>
                    <p>Try a different search term or switch to another music tab.</p>
                    <button type="button" class="btn btn-primary" id="music-reset-search">Show All Artists</button>
                </div>
            `;

            document.getElementById('music-reset-search')?.addEventListener('click', () => {
                searchInput.value = '';
                renderArtists();
            });
            return;
        }

        artistGrid.innerHTML = filteredArtists.map(artist => {
            const isPlaying = activeAudioId === artist.id;

            return `
                <article class="music-artist-card glass-card ${artist.genre} ${isPlaying ? 'is-playing' : ''}" tabindex="0" role="button" data-artist-id="${artist.id}" aria-label="View details for ${artist.name}">
                    <div class="music-artist-card-top">
                        <div class="music-avatar ${artist.genre}" aria-hidden="true">
                            <img src="${artist.image}" alt="${artist.name}" loading="lazy" decoding="async" class="music-avatar-image">
                        </div>
                        <div class="music-artist-title">
                            <span class="music-badge ${artist.genre}">${activeGenreConfig.label}</span>
                            <h3>${artist.name}</h3>
                            <p>${artist.subtitle}</p>
                        </div>
                    </div>
                    <p class="music-artist-contribution">${artist.contribution}</p>
                    <div class="music-meta-row">
                        <span class="music-meta-label">Region / style</span>
                        <span class="music-meta-value">${artist.region}</span>
                    </div>
                    <div class="music-chip-row">
                        ${artist.highlights.map(item => `<span class="music-chip">${item}</span>`).join('')}
                    </div>
                    <div class="music-audio-placeholder" data-audio-state="${isPlaying ? 'playing' : 'paused'}">
                        <button type="button" class="music-play-btn" data-music-play aria-pressed="${isPlaying ? 'true' : 'false'}" aria-label="${isPlaying ? 'Pause sample preview for ' + artist.name : 'Play sample preview for ' + artist.name}">
                            <span class="music-play-icon" aria-hidden="true">${isPlaying ? '❚❚' : '▶'}</span>
                            <span>${isPlaying ? 'Pause preview' : 'Play preview'}</span>
                        </button>
                        <div class="music-audio-copy">
                            <span class="music-audio-label">Audio placeholder</span>
                            <span class="music-audio-status">${isPlaying ? 'Sample preview playing' : artist.listeningNote}</span>
                        </div>
                        <div class="music-audio-bars" aria-hidden="true">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="music-card-footer">
                        <span class="music-card-note">Click for more about the artist</span>
                        <button type="button" class="btn btn-secondary music-details-btn" data-music-details>View Details</button>
                    </div>
                </article>
            `;
        }).join('');

        artistGrid.querySelectorAll('.music-artist-card').forEach(card => {
            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    const target = event.target;
                    if (target.matches('button, a, input, [role="button"]')) {
                        return;
                    }

                    event.preventDefault();
                    openModal(card.getAttribute('data-artist-id'), card);
                }
            });
        });
    }

    function openModal(artistId, trigger) {
        const artist = artistData.find(item => item.id === artistId);
        if (!artist) return;

        const activeGenreConfig = genreData[artist.genre];
        lastFocusedArtistId = artistId;
        lastFocusedTrigger = trigger || document.activeElement;
        lastFocusedTriggerKind = trigger?.matches?.('[data-music-details]') ? 'details' : 'card';
        isModalOpen = true;

        modalAvatar.className = `music-modal-avatar ${artist.genre}`;
        modalAvatar.innerHTML = `<img src="${artist.image}" alt="${artist.name}" loading="lazy" decoding="async" class="music-modal-image">`;
        modalBadge.className = `music-badge ${artist.genre}`;
        modalBadge.textContent = activeGenreConfig.label;
        modalTitle.textContent = artist.name;
        modalSubtitle.textContent = artist.subtitle;
        modalContribution.textContent = artist.contribution;
        modalRegion.textContent = artist.region;
        modalInstruments.innerHTML = artist.instruments.map(item => `<span class="music-chip">${item}</span>`).join('');
        modalHighlights.innerHTML = artist.highlights.map(item => `<li>${item}</li>`).join('');

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modalClose.focus();
        });
    }

    function closeModal() {
        if (!isModalOpen) return;

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;
        renderArtists();
        restoreFocus();
    }

    function trapModalFocus(event) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusableElements.length) return;

        const focusable = Array.from(focusableElements).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function restoreFocus() {
        let focusTarget = null;

        if (lastFocusedArtistId) {
            const selector = lastFocusedTriggerKind === 'details'
                ? `[data-artist-id="${lastFocusedArtistId}"] [data-music-details]`
                : `[data-artist-id="${lastFocusedArtistId}"]`;
            focusTarget = document.querySelector(selector);
        }

        if (!focusTarget && lastFocusedTrigger && document.contains(lastFocusedTrigger)) {
            focusTarget = lastFocusedTrigger;
        }

        if (focusTarget && typeof focusTarget.focus === 'function') {
            requestAnimationFrame(() => {
                focusTarget.focus();
            });
        }
    }
}

function initDancePage() {
    const danceAsset = fileName => `assets/dances/${encodeURI(fileName)}`;
    const danceGrid = document.getElementById('dance-grid');
    const searchInput = document.getElementById('dance-search-input');
    const stateSelect = document.getElementById('dance-state-filter');
    const typeButtons = document.querySelectorAll('[data-dance-filter]');
    const videoGrid = document.getElementById('dance-video-grid');
    const quizForm = document.getElementById('dance-quiz-form');
    const quizQuestionsGrid = document.getElementById('dance-quiz-questions');
    const quizResult = document.getElementById('dance-quiz-result');
    const quizReset = document.getElementById('dance-quiz-reset');
    const modal = document.getElementById('dance-modal');
    const modalClose = document.getElementById('dance-modal-close');
    const modalVisual = document.getElementById('dance-modal-visual');
    const modalBadge = document.getElementById('dance-modal-badge');
    const modalTitle = document.getElementById('dance-modal-title');
    const modalSubtitle = document.getElementById('dance-modal-subtitle');
    const modalOrigin = document.getElementById('dance-modal-origin');
    const modalMovement = document.getElementById('dance-modal-movement');
    const modalCostume = document.getElementById('dance-modal-costume');
    const modalFeatures = document.getElementById('dance-modal-features');
    const modalNotes = document.getElementById('dance-modal-notes');

    if (!danceGrid || !searchInput || !stateSelect || !typeButtons.length || !videoGrid || !quizForm || !quizQuestionsGrid || !quizResult || !quizReset || !modal || !modalClose) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const danceTypeConfig = {
        classical: {
            label: 'Classical',
            badge: 'Classical heritage',
            accent: 'classical'
        },
        folk: {
            label: 'Folk',
            badge: 'Folk celebration',
            accent: 'folk'
        }
    };

    const danceData = [
        {
            id: 'bharatanatyam',
            type: 'classical',
            name: 'Bharatanatyam',
            state: 'Tamil Nadu',
            region: 'Tamil temple tradition',
            image: danceAsset('bharatanatyam.png'),
            monogram: 'BN',
            description: 'A precise classical form rooted in temple heritage, sculpture-like poses, and rhythmic footwork.',
            features: ['Anga shuddha', 'Temple devotion', 'Hand gestures'],
            movement: 'Sharp lines, sculpted poses, and fast rhythmic passages.',
            costume: 'Silk sari costumes, pleated fans, temple jewelry, and expressive eye makeup.',
            music: 'Nattuvangam, mridangam, and Carnatic vocal accompaniment.',
            significance: 'One of India\'s most recognized classical dance traditions and a global symbol of Indian performance art.'
        },
        {
            id: 'kathak',
            type: 'classical',
            name: 'Kathak',
            state: 'Uttar Pradesh / North India',
            region: 'Court and temple storytelling',
            image: danceAsset('kathak.jpg'),
            monogram: 'KT',
            description: 'A graceful storytelling dance known for pirouettes, rhythmic patterns, and dramatic abhinaya.',
            features: ['Gat-bhav', 'Chakkars', 'Storytelling'],
            movement: 'Spins, intricate footwork, and fluid gestures that move from lyric to percussive.',
            costume: 'Anarkali-style costumes, ankle bells, and jewelry that highlight turning movement.',
            music: 'Tabla, sarangi, and khayal or thumri melodies.',
            significance: 'A bridge between temple storytelling and north Indian court aesthetics.'
        },
        {
            id: 'odissi',
            type: 'classical',
            name: 'Odissi',
            state: 'Odisha',
            region: 'Jagannath temple culture',
            image: danceAsset('odissi.png'),
            monogram: 'OD',
            description: 'A lyrical dance famous for its curved torso, devotional mood, and statuesque elegance.',
            features: ['Tribhangi stance', 'Temple imagery', 'Lyrical grace'],
            movement: 'Soft torso bends, expressive wrists, and flowing transitions between stillness and motion.',
            costume: 'Silver jewelry, woven silk, and a distinctive waist belt and headpiece.',
            music: 'Odissi percussion and melodic vocal support with strong devotional cadence.',
            significance: 'A deeply devotional classical form with a distinctive sculptural profile.'
        },
        {
            id: 'kathakali',
            type: 'classical',
            name: 'Kathakali',
            state: 'Kerala',
            region: 'Story drama theatre',
            image: danceAsset('kathakali.png'),
            monogram: 'KK',
            description: 'A dramatic classical dance-theatre tradition known for painted faces, bold gestures, and epic stories.',
            features: ['Face paint', 'Mudras', 'Epic narration'],
            movement: 'Powerful, controlled gestures and expressive eye work that reads like living theatre.',
            costume: 'Layered skirts, towering headgear, and elaborate green or red facial makeup.',
            music: 'Chenda and maddalam percussion with vocal narration.',
            significance: 'One of the most theatrical forms in India, combining dance, drama, and ritual display.'
        },
        {
            id: 'kuchipudi',
            type: 'classical',
            name: 'Kuchipudi',
            state: 'Andhra Pradesh',
            region: 'Village performance tradition',
            image: danceAsset('kuchipudi.png'),
            monogram: 'KU',
            description: 'A brisk classical form that blends speed, expressiveness, and dramatic stage presence.',
            features: ['Fast transitions', 'Dance-drama', 'Expressive face work'],
            movement: 'Quick footwork, light leaps, and lively storytelling with comic and devotional threads.',
            costume: 'Bright silk outfits with ornamented pleats and expressive stage makeup.',
            music: 'Carnatic music with percussion and vocal support.',
            significance: 'Known for its lively theatricality and the balance between grace and tempo.'
        },
        {
            id: 'manipuri',
            type: 'classical',
            name: 'Manipuri',
            state: 'Manipur',
            region: 'Vaishnav devotional tradition',
            image: danceAsset('manipuri.png'),
            monogram: 'MA',
            description: 'A gentle and devotional classical style with circular movement and restrained elegance.',
            features: ['Circular patterns', 'Soft steps', 'Devotional mood'],
            movement: 'Floating, circular phrases and restrained upper-body motion.',
            costume: 'Cylindrical skirts, translucent fabrics, and floral crowns in performance pieces.',
            music: 'Pung percussion, vocals, and devotional melodies.',
            significance: 'A tranquil classical tradition shaped by devotion and community ritual.'
        },
        {
            id: 'mohiniyattam',
            type: 'classical',
            name: 'Mohiniyattam',
            state: 'Kerala',
            region: 'Temple and court heritage',
            image: danceAsset('mohiniyattam.png'),
            monogram: 'MO',
            description: 'A lyrical dance form associated with soft swaying motion and feminine elegance.',
            features: ['Soft sways', 'Lasya', 'Temple grace'],
            movement: 'Wave-like torso motion, gentle footwork, and composed facial expression.',
            costume: 'White and gold kasavu sarees with jasmine flowers and subtle jewelry.',
            music: 'Carnatic music with soft percussion and melodic support.',
            significance: 'Celebrated for its flowing beauty and serene classical expression.'
        },
        {
            id: 'sattriya',
            type: 'classical',
            name: 'Sattriya',
            state: 'Assam',
            region: 'Monastic tradition',
            image: danceAsset('sattriya.png'),
            monogram: 'SA',
            description: 'A classical form from Assamese monasteries that combines devotion, narrative, and disciplined rhythm.',
            features: ['Monastic roots', 'Devotional storytelling', 'Rhythmic discipline'],
            movement: 'Structured steps, devotional gestures, and controlled storytelling sequences.',
            costume: 'Assamese traditional drapes, ornate jewelry, and stage-specific fabrics.',
            music: 'Khol percussion, cymbals, and Vaishnav devotional song.',
            significance: 'A living classical heritage linked to Assamese religious and cultural institutions.'
        },
        {
            id: 'bihu',
            type: 'folk',
            name: 'Bihu',
            state: 'Assam',
            region: 'Spring harvest celebration',
            image: danceAsset('bihu.png'),
            monogram: 'BI',
            description: 'An energetic folk dance that celebrates harvest, youth, and the arrival of spring.',
            features: ['Harvest joy', 'Fast rhythm', 'Community chorus'],
            movement: 'Quick steps, hip-driven rhythm, and joyful partner movement.',
            costume: 'Bright mekhela chadors with red accents and festival ornaments.',
            music: 'Dhol, pepa, and lively Assamese songs.',
            significance: 'A beloved Assamese festival dance that brings villages and cities into the same celebration.'
        },
        {
            id: 'garba',
            type: 'folk',
            name: 'Garba',
            state: 'Gujarat',
            region: 'Navratri circles',
            image: danceAsset('garba.png'),
            monogram: 'GA',
            description: 'A devotional circle dance performed during Navratri with graceful turns and collective rhythm.',
            features: ['Circular patterns', 'Festival devotion', 'Hand claps'],
            movement: 'Rhythmic steps around a center point with coordinated claps and turns.',
            costume: 'Colorful chaniya cholis, embroidered mirrors, and festive jewelry.',
            music: 'Dhol, percussion, and devotional songs.',
            significance: 'One of the most recognizable festival dances in western India.'
        },
        {
            id: 'ghoomar',
            type: 'folk',
            name: 'Ghoomar',
            state: 'Rajasthan',
            region: 'Desert palace and village tradition',
            image: danceAsset('ghoomar.png'),
            monogram: 'GH',
            description: 'A swirling folk dance known for wide spins, elegant lines, and celebratory motion.',
            features: ['Spins', 'Festive grace', 'Palace heritage'],
            movement: 'Circular spinning and graceful arm movement that creates a flowing silhouette.',
            costume: 'Flared ghagras with mirror work, veils, and elaborate jewelry.',
            music: 'Folk songs and percussion with a regal celebratory tone.',
            significance: 'A strong emblem of Rajasthani identity and festive ceremony.'
        },
        {
            id: 'lavani',
            type: 'folk',
            name: 'Lavani',
            state: 'Maharashtra',
            region: 'Performance and storytelling stage',
            image: danceAsset('lavani.png'),
            monogram: 'LA',
            description: 'A fast folk form that blends powerful rhythm, dramatic expression, and social commentary.',
            features: ['Strong rhythm', 'Expressive performance', 'Powada energy'],
            movement: 'Quick footwork and lively expression with direct audience connection.',
            costume: 'Nauvari sarees, bold jewelry, and stage-ready movement-friendly draping.',
            music: 'Dholki, taal, and energetic sung verses.',
            significance: 'A high-energy Marathi performance tradition with both entertainment and commentary.'
        },
        {
            id: 'bhangra',
            type: 'folk',
            name: 'Bhangra',
            state: 'Punjab',
            region: 'Harvest celebration',
            image: danceAsset('bhangra.png'),
            monogram: 'BH',
            description: 'A high-energy harvest dance defined by jumps, shoulder lifts, and exuberant group rhythm.',
            features: ['Jumps', 'Harvest joy', 'Group energy'],
            movement: 'Explosive jumps, joyful arm patterns, and powerful synchronized steps.',
            costume: 'Vibrant kurta pajamas, phulkari accents, and festive turbans.',
            music: 'Dhol beats and call-and-response celebration songs.',
            significance: 'A global symbol of Punjabi energy and celebratory movement.'
        },
        {
            id: 'chhau',
            type: 'folk',
            name: 'Chhau',
            state: 'Odisha / Jharkhand / West Bengal',
            region: 'Masked martial storytelling',
            image: danceAsset('chhau.png'),
            monogram: 'CH',
            description: 'A powerful dance-theatre form that combines martial movement, masks, and mythic narratives.',
            features: ['Masks', 'Martial movement', 'Mythic stories'],
            movement: 'Acrobatic leaps, stylized combat, and expansive body lines.',
            costume: 'Masks, headgear, and dramatic costumes that support larger-than-life storytelling.',
            music: 'Percussion-led rhythm and village performance ensembles.',
            significance: 'A spectacular regional form that joins ritual, athletics, and folklore.'
        },
        {
            id: 'kalbelia',
            type: 'folk',
            name: 'Kalbelia',
            state: 'Rajasthan',
            region: 'Nomadic desert communities',
            image: danceAsset('kalbelia.png'),
            monogram: 'KA',
            description: 'A serpentine dance famous for its flowing spins and snake-like arm and torso movement.',
            features: ['Snake-like flow', 'Nomadic roots', 'Quick spins'],
            movement: 'Wave-like torso motion, sudden turns, and continuous flowing steps.',
            costume: 'Black flowing skirts embroidered with mirror work and silver ornaments.',
            music: 'Pungi, khanjari, and desert folk melodies.',
            significance: 'A vivid folk tradition tied to Rajasthan\'s nomadic heritage.'
        },
        {
            id: 'pandavani',
            type: 'folk',
            name: 'Pandavani',
            state: 'Chhattisgarh',
            region: 'Epic storytelling performance',
            image: danceAsset('pandavani.png'),
            monogram: 'PA',
            description: 'A narrative folk performance that retells Mahabharata episodes through song, gesture, and drama.',
            features: ['Epic narration', 'Solo storytelling', 'Community memory'],
            movement: 'Narrative gestures, dramatic pauses, and forceful vocal delivery.',
            costume: 'Simple performance dress with accessories that support storytelling presence.',
            music: 'Tambura, manjira, and sung narration.',
            significance: 'A strong oral tradition that keeps epic literature alive in village performance spaces.'
        }
    ];

    function getDanceFallbackLabel(dance) {
        return dance.type === 'classical' ? 'Classical' : 'Folk';
    }

    function getDanceMediaMarkup(dance, variant) {
        const fallbackMarkup = `
            <div class="dance-image-fallback" aria-hidden="true">
                <span class="dance-fallback-monogram">${dance.monogram}</span>
                <span class="dance-fallback-label">${getDanceFallbackLabel(dance)}</span>
            </div>
        `;

        if (!dance.image) {
            return fallbackMarkup;
        }

        const imageClass = variant === 'modal' ? 'dance-modal-image' : 'dance-card-image';
        return `
            <img src="${dance.image}" alt="${dance.name}" loading="lazy" decoding="async" class="${imageClass}">
            ${fallbackMarkup}
        `;
    }

    function syncDanceMediaState(scope) {
        const root = scope || document;
        const mediaContainers = root.querySelectorAll('.dance-card-media, .dance-modal-visual');

        mediaContainers.forEach(container => {
            const img = container.querySelector('img');
            if (!img) {
                container.classList.add('is-missing');
                container.classList.remove('is-loaded');
                return;
            }

            const markLoaded = () => {
                if (img.naturalWidth > 0) {
                    container.classList.add('is-loaded');
                    container.classList.remove('is-missing');
                } else {
                    container.classList.add('is-missing');
                    container.classList.remove('is-loaded');
                }
            };

            if (img.complete) {
                markLoaded();
            } else {
                img.addEventListener('load', markLoaded, { once: true });
                img.addEventListener('error', () => {
                    container.classList.add('is-missing');
                    container.classList.remove('is-loaded');
                }, { once: true });
            }
        });
    }

    const quizQuestions = [
        {
            prompt: 'Which state is Bharatanatyam associated with?',
            options: ['Tamil Nadu', 'Punjab', 'Gujarat'],
            answer: 'Tamil Nadu'
        },
        {
            prompt: 'Is Bihu classical or folk?',
            options: ['Classical', 'Folk', 'Modern'],
            answer: 'Folk'
        },
        {
            prompt: 'Which dance is famous for elaborate makeup and epic storytelling from Kerala?',
            options: ['Kathakali', 'Odissi', 'Lavani'],
            answer: 'Kathakali'
        },
        {
            prompt: 'Garba is most closely associated with which state?',
            options: ['Rajasthan', 'Assam', 'Gujarat'],
            answer: 'Gujarat'
        }
    ];

    const uniqueStates = Array.from(new Set(danceData.map(item => item.state))).sort((a, b) => a.localeCompare(b));

    let activeType = 'all';
    let activeState = 'all';
    let selectedPreviewId = null;
    let quizAnswers = {};
    let quizSubmitted = false;
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    populateStateOptions();
    renderDanceCards();
    renderVideoPreviews();
    renderQuiz();
    setActiveTypeButton('all');

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            activeType = button.getAttribute('data-dance-filter') || 'all';
            setActiveTypeButton(activeType);
            renderDanceCards();
        });
    });

    searchInput.addEventListener('input', () => {
        renderDanceCards();
    });

    stateSelect.addEventListener('change', () => {
        activeState = stateSelect.value || 'all';
        renderDanceCards();
    });

    danceGrid.addEventListener('click', event => {
        const detailsButton = event.target.closest('[data-dance-details]');
        const card = event.target.closest('[data-dance-id]');

        if (detailsButton && card) {
            event.stopPropagation();
            openModal(card.getAttribute('data-dance-id'), detailsButton);
            return;
        }

        if (card) {
            openModal(card.getAttribute('data-dance-id'), card);
        }
    });

    danceGrid.addEventListener('keydown', event => {
        const card = event.target.closest('[data-dance-id]');
        if (!card) return;

        if (event.key === 'Enter' || event.key === ' ') {
            const target = event.target;
            if (target.matches('button, a, input, [role="button"], select')) {
                return;
            }

            event.preventDefault();
            openModal(card.getAttribute('data-dance-id'), card);
        }
    });

    videoGrid.addEventListener('click', event => {
        const previewButton = event.target.closest('[data-dance-preview]');
        if (!previewButton) return;

        const previewId = previewButton.getAttribute('data-dance-preview');
        selectedPreviewId = selectedPreviewId === previewId ? null : previewId;
        renderVideoPreviews();
    });

        quizForm.addEventListener('submit', event => {
            event.preventDefault();
            quizSubmitted = true;

        const score = quizQuestions.reduce((total, question, index) => {
            return total + (quizAnswers[index] === question.answer ? 1 : 0);
        }, 0);

        const total = quizQuestions.length;
            quizResult.innerHTML = `
                <strong>Your score: ${score} / ${total}</strong>
                <p>${score === total ? 'Perfect score. You know your dance heritage beautifully.' : score >= 3 ? 'Strong recall. A quick review will make it even better.' : 'Good start. Revisit the cards above and try again.'}</p>
            `;
            renderQuiz();
        });

    quizReset.addEventListener('click', () => {
        quizAnswers = {};
        quizSubmitted = false;
        quizResult.innerHTML = '';
        renderQuiz();
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            trapModalFocus(event);
        }
    });

    function populateStateOptions() {
        stateSelect.innerHTML = [
            '<option value="all">All States & Regions</option>',
            ...uniqueStates.map(state => `<option value="${state}">${state}</option>`)
        ].join('');
    }

    function setActiveTypeButton(typeValue) {
        typeButtons.forEach(button => {
            const isActive = (button.getAttribute('data-dance-filter') || 'all') === typeValue;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function renderDanceCards() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredDances = danceData.filter(dance => {
            const matchesType = activeType === 'all' || dance.type === activeType;
            const matchesState = activeState === 'all' || dance.state === activeState;
            const matchesSearch = !query || [
                dance.name,
                dance.state,
                dance.region,
                dance.description,
                dance.movement,
                dance.costume,
                dance.music,
                dance.significance,
                dance.type,
                ...(dance.features || [])
            ].join(' ').toLowerCase().includes(query);

            return matchesType && matchesState && matchesSearch;
        });

        if (filteredDances.length === 0) {
            danceGrid.innerHTML = `
                <div class="dance-empty-state glass-card">
                    <h3>No dances found</h3>
                    <p>Try a different search term or reset the type and state filters.</p>
                    <button type="button" class="btn btn-primary" id="dance-reset-filters">Show All Dances</button>
                </div>
            `;

            document.getElementById('dance-reset-filters')?.addEventListener('click', () => {
                activeType = 'all';
                activeState = 'all';
                searchInput.value = '';
                stateSelect.value = 'all';
                setActiveTypeButton('all');
                renderDanceCards();
            });
            return;
        }

        danceGrid.innerHTML = filteredDances.map(dance => {
            const typeConfig = danceTypeConfig[dance.type];
            return `
                <article class="dance-card glass-card ${dance.type}" tabindex="0" role="button" data-dance-id="${dance.id}" aria-label="View details for ${dance.name}">
                    <div class="dance-card-media ${dance.type}">
                        ${getDanceMediaMarkup(dance, 'card')}
                    </div>
                    <div class="dance-card-body">
                        <div class="dance-card-topline">
                            <span class="dance-badge ${dance.type}">${typeConfig.label}</span>
                            <span class="dance-state-chip">${dance.state}</span>
                        </div>
                        <h3>${dance.name}</h3>
                        <p class="dance-card-region">${dance.region}</p>
                        <p class="dance-card-description">${dance.description}</p>
                        <div class="dance-feature-chip-row">
                            ${dance.features.map(feature => `<span class="dance-chip">${feature}</span>`).join('')}
                        </div>
                        <div class="dance-card-footer">
                            <span class="dance-card-note">Open for costume and movement details</span>
                            <button type="button" class="btn btn-secondary dance-details-btn" data-dance-details>View Details</button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        syncDanceMediaState(danceGrid);
    }

    function renderVideoPreviews() {
        const previewData = [
            {
                id: 'bharatanatyam',
                title: 'Bharatanatyam Adavu Sequence',
                type: 'classical',
                note: 'Video preview placeholder',
                description: 'Footwork and mudra practice from the Tamil classical tradition.'
            },
            {
                id: 'garba',
                title: 'Garba Circle Preview',
                type: 'folk',
                note: 'Video preview placeholder',
                description: 'A festive circle pattern built around hand-claps and rhythmic turns.'
            },
            {
                id: 'bihu',
                title: 'Bihu Festival Motion',
                type: 'folk',
                note: 'Video preview placeholder',
                description: 'Spring energy from Assam with quick steps and bright percussion.'
            }
        ];

        videoGrid.innerHTML = previewData.map(preview => {
            const isSelected = selectedPreviewId === preview.id;

            return `
                <article class="dance-video-card glass-card ${preview.type} ${isSelected ? 'is-selected' : ''}">
                    <div class="dance-video-stage ${preview.type}" aria-hidden="true">
                        <span class="dance-video-label">${preview.note}</span>
                        <strong>${preview.title}</strong>
                        <p>${preview.description}</p>
                    </div>
                    <div class="dance-video-meta">
                        <span class="dance-badge ${preview.type}">${danceTypeConfig[preview.type].label}</span>
                        <button type="button" class="dance-preview-btn" data-dance-preview="${preview.id}" aria-pressed="${String(isSelected)}" aria-label="${isSelected ? 'Remove preview selection for ' + preview.title : 'Select preview for ' + preview.title}">
                            <span class="dance-preview-icon" aria-hidden="true">${isSelected ? '❚❚' : '▶'}</span>
                            <span>${isSelected ? 'Preview selected' : 'Play preview'}</span>
                        </button>
                    </div>
                    <div class="dance-video-status" aria-live="polite">${isSelected ? 'Preview selected' : 'Tap play to highlight this video placeholder'}</div>
                </article>
            `;
        }).join('');
    }

    function renderQuiz() {
        quizQuestionsGrid.innerHTML = quizQuestions.map((question, index) => {
            const selectedAnswer = quizAnswers[index];
            const questionClass = quizSubmitted
                ? (selectedAnswer === question.answer ? 'is-correct' : 'is-incorrect')
                : '';

            return `
                <fieldset class="dance-quiz-question glass-card ${questionClass}">
                    <legend>
                        <span class="dance-quiz-number">0${index + 1}</span>
                        <span>${question.prompt}</span>
                    </legend>
                    <div class="dance-quiz-options" role="radiogroup" aria-label="${question.prompt}">
                        ${question.options.map(option => {
                            const optionId = `dance-quiz-${index}-${option.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                            const isSelected = selectedAnswer === option;
                            const isCorrect = quizSubmitted && option === question.answer;
                            const isWrong = quizSubmitted && isSelected && option !== question.answer;
                            return `
                                <label class="dance-quiz-option ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-incorrect' : ''}" for="${optionId}">
                                    <input type="radio" id="${optionId}" name="dance-question-${index}" value="${option}" ${isSelected ? 'checked' : ''}>
                                    <span>${option}</span>
                                </label>
                            `;
                        }).join('')}
                    </div>
                    ${quizSubmitted ? `<p class="dance-question-feedback">${selectedAnswer === question.answer ? 'Correct answer picked.' : `Correct answer: ${question.answer}`}</p>` : ''}
                </fieldset>
            `;
        }).join('');

        quizQuestionsGrid.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', event => {
                const match = event.target.name.match(/dance-question-(\d+)/);
                if (!match) return;

                quizAnswers[Number(match[1])] = event.target.value;
                if (quizSubmitted) {
                    const score = quizQuestions.reduce((total, question, index) => {
                        return total + (quizAnswers[index] === question.answer ? 1 : 0);
                    }, 0);
                    const total = quizQuestions.length;
                    quizResult.innerHTML = `
                        <strong>Your score: ${score} / ${total}</strong>
                        <p>${score === total ? 'Perfect score. You know your dance heritage beautifully.' : score >= 3 ? 'Strong recall. A quick review will make it even better.' : 'Good start. Revisit the cards above and try again.'}</p>
                    `;
                    renderQuiz();
                }
            });
        });
    }

    function openModal(danceId, trigger) {
        const dance = danceData.find(item => item.id === danceId);
        if (!dance) return;

        lastFocusedTrigger = trigger || document.activeElement;
        isModalOpen = true;

        modalVisual.className = `dance-modal-visual ${dance.type}`;
        modalVisual.innerHTML = getDanceMediaMarkup(dance, 'modal');
        modalBadge.className = `dance-badge ${dance.type}`;
        modalBadge.textContent = danceTypeConfig[dance.type].label;
        modalTitle.textContent = dance.name;
        modalSubtitle.textContent = `${dance.state} | ${dance.region}`;
        modalOrigin.textContent = dance.significance;
        modalMovement.textContent = dance.movement;
        modalCostume.textContent = `${dance.costume} Music and stage rhythm: ${dance.music}`;
        modalFeatures.innerHTML = dance.features.map(feature => `<span class="dance-chip">${feature}</span>`).join('');
        modalNotes.textContent = dance.description;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        syncDanceMediaState(modalVisual);

        requestAnimationFrame(() => {
            modalClose.focus();
        });
    }

    function closeModal() {
        if (!isModalOpen) return;

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;

        if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
            requestAnimationFrame(() => {
                lastFocusedTrigger.focus();
            });
        }
    }

    function trapModalFocus(event) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusableElements.length) return;

        const focusable = Array.from(focusableElements).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
}

const startupCategoryThemes = {
    tech: {
        label: 'Tech',
        accent: '#FF9933',
        soft: 'rgba(255, 153, 51, 0.18)'
    },
    fintech: {
        label: 'Fintech',
        accent: '#128807',
        soft: 'rgba(18, 136, 7, 0.18)'
    },
    edtech: {
        label: 'Edtech',
        accent: '#FFB01F',
        soft: 'rgba(255, 176, 31, 0.18)'
    }
};

const startupData = [
    {
        id: 'zerodha',
        name: 'Zerodha',
        category: 'fintech',
        logo: 'assets/images/startups/zerodha.png',
        logoAlt: 'Zerodha logo',
        founders: ['Nithin Kamath', 'Nikhil Kamath'],
        founded: 2010,
        city: 'Bengaluru',
        description: 'A lean discount brokerage that helped make retail investing more approachable, low-cost, and digital-first in India.',
        focus: 'Retail investing platform',
        unicorn: true
    },
    {
        id: 'flipkart',
        name: 'Flipkart',
        category: 'tech',
        logo: 'assets/images/startups/flipkart.png',
        logoAlt: 'Flipkart logo',
        founders: ['Sachin Bansal', 'Binny Bansal'],
        founded: 2007,
        city: 'Bengaluru',
        description: 'One of Indiaâ€™s original e-commerce giants, known for scaling online shopping, logistics, and product discovery at national scale.',
        focus: 'E-commerce marketplace',
        unicorn: true
    },
    {
        id: 'paytm',
        name: 'Paytm',
        category: 'fintech',
        logo: 'assets/images/startups/paytm.png',
        logoAlt: 'Paytm logo',
        founders: ['Vijay Shekhar Sharma'],
        founded: 2010,
        city: 'Noida',
        description: 'A consumer payments and financial services platform that helped normalize QR payments, wallets, and merchant acceptance.',
        focus: 'Digital payments',
        unicorn: true
    },
    {
        id: 'nykaa',
        name: 'Nykaa',
        category: 'tech',
        logo: 'assets/images/startups/nykaa.png',
        logoAlt: 'Nykaa logo',
        founders: ['Falguni Nayar'],
        founded: 2012,
        city: 'Mumbai',
        description: 'A beauty and lifestyle commerce platform that blended content, commerce, and premium discovery for modern shoppers.',
        focus: 'Beauty commerce',
        unicorn: true
    },
    {
        id: 'swiggy',
        name: 'Swiggy',
        category: 'tech',
        logo: 'assets/images/startups/swiggy.png',
        logoAlt: 'Swiggy logo',
        founders: ['Sriharsha Majety', 'Nandan Reddy', 'Rahul Jaimini'],
        founded: 2014,
        city: 'Bengaluru',
        description: 'An on-demand delivery and food commerce platform that turned convenience into a habit for millions of Indian households.',
        focus: 'Food delivery',
        unicorn: true
    },
    {
        id: 'zomato',
        name: 'Zomato',
        category: 'tech',
        logo: 'assets/images/startups/zomato.png',
        logoAlt: 'Zomato logo',
        founders: ['Deepinder Goyal', 'Pankaj Chaddah'],
        founded: 2008,
        city: 'Gurugram',
        description: 'A food discovery and delivery company that evolved from restaurant listings into a broader consumer internet brand.',
        focus: 'Food discovery',
        unicorn: true
    },
    {
        id: 'byjus',
        name: "Byju's",
        category: 'edtech',
        logo: 'assets/images/startups/byju-s.png',
        logoAlt: "Byju's logo",
        founders: ['Byju Raveendran'],
        founded: 2011,
        city: 'Bengaluru',
        description: 'A learning platform that popularized app-led education, test prep, and digital lessons for students across age groups.',
        focus: 'Learning platform',
        unicorn: true
    },
    {
        id: 'razorpay',
        name: 'Razorpay',
        category: 'fintech',
        logo: 'assets/images/startups/razorpay.png',
        logoAlt: 'Razorpay logo',
        founders: ['Harshil Mathur', 'Shashank Kumar'],
        founded: 2014,
        city: 'Bengaluru',
        description: 'A business payments stack used by startups and enterprises for checkout, payouts, subscriptions, and banking workflows.',
        focus: 'Payments infrastructure',
        unicorn: true
    },
    {
        id: 'phonepe',
        name: 'PhonePe',
        category: 'fintech',
        logo: 'assets/images/startups/phonepe.png',
        logoAlt: 'PhonePe logo',
        founders: ['Sameer Nigam', 'Rahul Chari', 'Burzin Engineer'],
        founded: 2015,
        city: 'Bengaluru',
        description: 'A UPI and financial services app that became a mainstream payment habit for consumers and merchants alike.',
        focus: 'UPI payments',
        unicorn: true
    },
    {
        id: 'meesho',
        name: 'Meesho',
        category: 'tech',
        logo: 'assets/images/startups/meesho.png',
        logoAlt: 'Meesho logo',
        founders: ['Vidit Aatrey', 'Sanjeev Barnwal'],
        founded: 2015,
        city: 'Bengaluru',
        description: 'A social commerce platform that helped small sellers and first-time buyers discover value-led online retail.',
        focus: 'Social commerce',
        unicorn: true
    }
];

const startupFounderProfiles = [
    {
        name: 'Nithin Kamath',
        startup: 'Zerodha',
        founderImage: 'assets/images/founders/nithin-kamath.png',
        founderImageAlt: 'Portrait photo of Nithin Kamath',
        detail: 'Focused on simplifying investing and keeping the brokerage model efficient, transparent, and low cost.'
    },
    {
        name: 'Falguni Nayar',
        startup: 'Nykaa',
        founderImage: 'assets/images/founders/falguni-nayar.png',
        founderImageAlt: 'Portrait photo of Falguni Nayar',
        detail: 'Built a category-defining consumer brand around beauty discovery, trust, and premium retail experiences.'
    },
    {
        name: 'Vijay Shekhar Sharma',
        startup: 'Paytm',
        founderImage: 'assets/images/founders/vijay-shekhar-sharma.png',
        founderImageAlt: 'Portrait photo of Vijay Shekhar Sharma',
        detail: 'Pushed digital payments into daily life with a product strategy built around scale and ease of use.'
    },
    {
        name: 'Sriharsha Majety',
        startup: 'Swiggy',
        founderImage: 'assets/images/founders/sriharsha-majety.png',
        founderImageAlt: 'Portrait photo of Sriharsha Majety',
        detail: 'Helped shape convenience-led commerce with fast delivery, logistics execution, and strong consumer trust.'
    },
    {
        name: 'Deepinder Goyal',
        startup: 'Zomato',
        founderImage: 'assets/images/founders/deepinder-goyal.png',
        founderImageAlt: 'Portrait photo of Deepinder Goyal',
        detail: 'Turned restaurant discovery into a consumer platform that later expanded into delivery and subscriptions.'
    },
    {
        name: 'Byju Raveendran',
        startup: "Byju's",
        founderImage: 'assets/images/founders/byju-raveendran.png',
        founderImageAlt: 'Portrait photo of Byju Raveendran',
        detail: 'Brought a mobile-first learning style to the center of Indiaâ€™s edtech boom.'
    },
    {
        name: 'Harshil Mathur',
        startup: 'Razorpay',
        founderImage: 'assets/images/founders/harshil-mathur.png',
        founderImageAlt: 'Portrait photo of Harshil Mathur',
        detail: 'Focused on payments infrastructure that lets businesses move money with fewer operational headaches.'
    },
    {
        name: 'Sameer Nigam',
        startup: 'PhonePe',
        founderImage: 'assets/images/founders/sameer-nigam.png',
        founderImageAlt: 'Portrait photo of Sameer Nigam',
        detail: 'Built a large-scale payments habit around UPI, merchant acceptance, and financial services.'
    }
];

function initStartupPage() {
    const startupGrid = document.getElementById('startup-grid');
    const founderGrid = document.getElementById('startup-founder-grid');
    const searchInput = document.getElementById('startup-search-input');
    const clearBtn = document.getElementById('startup-clear-search');
    const filterBtns = document.querySelectorAll('.startup-filter-btn');
    const resultsText = document.getElementById('startup-results-text');
    const savedSummary = document.getElementById('startup-saved-summary');
    const savedList = document.getElementById('startup-favorites-list');
    const statVisible = document.getElementById('startup-stat-visible');
    const statUnicorn = document.getElementById('startup-stat-unicorn');
    const statYear = document.getElementById('startup-stat-year');
    const statSaved = document.getElementById('startup-stat-saved');
    const heroTotal = document.getElementById('startup-hero-total');
    const heroSectors = document.getElementById('startup-hero-sectors');
    const heroUnicorns = document.getElementById('startup-hero-unicorns');

    if (!startupGrid || !founderGrid || !searchInput) return;

    const favorites = new Set(loadFavorites());
    let currentCategory = 'all';
    let searchQuery = '';

    renderAll();

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-startup-category') || 'all';
            animateRender();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        animateRender();
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchQuery = '';
            animateRender();
        }
    });

    clearBtn?.addEventListener('click', () => {
        currentCategory = 'all';
        searchQuery = '';
        searchInput.value = '';
        filterBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-startup-category') === 'all'));
        animateRender();
        searchInput.focus();
    });

    function animateRender() {
        startupGrid.style.opacity = '0';
        startupGrid.style.transform = 'translateY(14px)';
        startupGrid.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

        setTimeout(() => {
            renderAll();
            startupGrid.style.opacity = '1';
            startupGrid.style.transform = 'translateY(0)';
        }, 180);
    }

    function renderAll() {
        const visibleStartups = getFilteredStartups();
        renderStats(visibleStartups);
        renderStartupCards(visibleStartups);
        renderFounderCards();
        renderSavedSummary(visibleStartups);
    }

    function getFilteredStartups() {
        return startupData.filter(item => {
            const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
            const searchableText = [
                item.name,
                item.category,
                item.city,
                item.focus,
                item.description,
                item.founders.join(' ')
            ].join(' ').toLowerCase();
            const matchesSearch = searchQuery === '' || searchableText.includes(searchQuery);
            return matchesCategory && matchesSearch;
        });
    }

    function renderStartupCards(items) {
        startupGrid.innerHTML = '';

        if (items.length === 0) {
            startupGrid.innerHTML = `
                <div class="startup-empty-state glass-card">
                    <h3>No startups match this view</h3>
                    <p>Try a different category or search term to explore another part of the Indian startup landscape.</p>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const theme = startupCategoryThemes[item.category];
            const card = document.createElement('article');
            card.className = 'startup-card glass-card';
            card.dataset.category = item.category;
            card.style.setProperty('--startup-accent', theme.accent);
            card.style.setProperty('--startup-accent-soft', theme.soft);

            const isFavorite = favorites.has(item.id);
            const foundersText = item.founders.join(', ');
            const initials = getStartupInitials(item.name);

            card.innerHTML = `
                <div class="startup-card-top">
                    <div class="startup-brand-badge" aria-label="${item.logoAlt || `${item.name} logo`}">
                        <img class="startup-brand-image" src="${item.logo || ''}" alt="${item.logoAlt || `${item.name} logo`}" loading="lazy">
                        <span class="startup-brand-fallback">${initials}</span>
                    </div>
                    <button class="startup-favorite-btn ${isFavorite ? 'is-favorite' : ''}" type="button"
                        aria-pressed="${isFavorite}" aria-label="${isFavorite ? 'Remove' : 'Add'} ${item.name} to favorites"
                        data-startup-id="${item.id}">
                        <span class="favorite-icon" aria-hidden="true">â¤</span>
                    </button>
                </div>
                <div class="startup-card-body">
                    <div class="startup-card-badges">
                        <span class="startup-badge startup-badge-category">${theme.label}</span>
                        <span class="startup-badge startup-badge-unicorn">Unicorn</span>
                    </div>
                    <h3>${item.name}</h3>
                    <p class="startup-card-description">${item.description}</p>
                    <dl class="startup-meta-list">
                        <div>
                            <dt>Founders</dt>
                            <dd>${foundersText}</dd>
                        </div>
                        <div>
                            <dt>Founded</dt>
                            <dd>${item.founded}</dd>
                        </div>
                        <div>
                            <dt>City</dt>
                            <dd>${item.city}</dd>
                        </div>
                        <div>
                            <dt>Focus</dt>
                            <dd>${item.focus}</dd>
                        </div>
                    </dl>
                </div>
            `;

            card.querySelector('.startup-favorite-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
            });

            setupCompactBadge(
                card.querySelector('.startup-brand-image'),
                card.querySelector('.startup-brand-badge'),
                card.querySelector('.startup-brand-fallback'),
                { transparentOnly: true }
            );

            startupGrid.appendChild(card);
        });
    }

    function renderFounderCards() {
        founderGrid.innerHTML = '';

        startupFounderProfiles.forEach((founder, index) => {
            const profile = startupData.find(item => item.name === founder.startup) || startupData[index % startupData.length];
            const theme = startupCategoryThemes[profile.category];
            const card = document.createElement('article');
            card.className = 'founder-card glass-card';
            card.style.setProperty('--startup-accent', theme.accent);
            card.style.setProperty('--startup-accent-soft', theme.soft);
            const initials = getFounderInitials(founder.name);

            card.innerHTML = `
                <div class="founder-card-top">
                    <div class="founder-avatar-badge" aria-label="${founder.founderImageAlt || `Portrait photo of ${founder.name}`}">
                        <img class="founder-card-image" src="${founder.founderImage || ''}" alt="${founder.founderImageAlt || `Portrait photo of ${founder.name}`}" loading="lazy">
                        <span class="founder-image-fallback">${initials}</span>
                    </div>
                    <span class="founder-pill">${founder.startup}</span>
                </div>
                <div class="founder-card-body">
                    <h3>${founder.name}</h3>
                    <p>${founder.detail}</p>
                </div>
            `;
            setupCompactBadge(
                card.querySelector('.founder-card-image'),
                card.querySelector('.founder-avatar-badge'),
                card.querySelector('.founder-image-fallback'),
                { transparentOnly: false }
            );
            founderGrid.appendChild(card);
        });
    }

    function renderStats(items) {
        const unicornCount = items.filter(item => item.unicorn).length;
        const savedCount = items.filter(item => favorites.has(item.id)).length;
        const averageYear = items.length
            ? Math.round(items.reduce((sum, item) => sum + item.founded, 0) / items.length)
            : null;
        const sectorCount = new Set(items.map(item => item.category)).size;

        statVisible.textContent = items.length;
        statUnicorn.textContent = unicornCount;
        statYear.textContent = averageYear || 'â€”';
        statSaved.textContent = savedCount;

        if (heroTotal) heroTotal.textContent = startupData.length;
        if (heroSectors) heroSectors.textContent = Object.keys(startupCategoryThemes).length;
        if (heroUnicorns) heroUnicorns.textContent = startupData.filter(item => item.unicorn).length;

        if (resultsText) {
            resultsText.textContent = items.length === 0
                ? 'No startups match the current view.'
                : `${items.length} startup${items.length === 1 ? '' : 's'} visible across ${sectorCount} ${sectorCount === 1 ? 'category' : 'categories'}.`;
        }
    }

    function renderSavedSummary(items) {
        const savedItems = items.filter(item => favorites.has(item.id));

        if (savedSummary) {
            savedSummary.textContent = savedItems.length
                ? `${savedItems.length} favorite${savedItems.length === 1 ? '' : 's'} in this view`
                : 'No saved startups in the current view.';
        }

        if (savedList) {
            savedList.innerHTML = savedItems.length
                ? savedItems.map(item => `<li><span class="saved-dot"></span>${item.name}</li>`).join('')
                : '<li class="saved-empty">Tap the heart icon on any card to save it here.</li>';
        }
    }

    function toggleFavorite(startupId) {
        if (favorites.has(startupId)) {
            favorites.delete(startupId);
        } else {
            favorites.add(startupId);
        }

        saveFavorites(Array.from(favorites));
        renderAll();
    }

    function loadFavorites() {
        try {
            const stored = JSON.parse(localStorage.getItem('startup-favorites') || '[]');
            if (Array.isArray(stored)) {
                return stored;
            }
        } catch (error) {
            // Ignore malformed storage and fall back to an empty set.
        }
        return [];
    }

    function saveFavorites(items) {
        localStorage.setItem('startup-favorites', JSON.stringify(items));
    }

    function setupCompactBadge(imgEl, mediaEl, fallbackEl, options = {}) {
        if (!imgEl || !mediaEl || !fallbackEl) return;

        const { transparentOnly = false } = options;

        const setLoaded = async () => {
            if (transparentOnly) {
                const keep = await shouldKeepBrandImage(imgEl, { requireTransparency: true });
                if (!keep) {
                    mediaEl.classList.remove('image-loaded');
                    mediaEl.classList.add('image-error');
                    imgEl.style.display = 'none';
                    fallbackEl.style.display = 'flex';
                    return;
                }
            }
            mediaEl.classList.add('image-loaded');
            mediaEl.classList.remove('image-error');
            imgEl.style.display = 'block';
            fallbackEl.style.display = 'none';
        };

        const setError = () => {
            mediaEl.classList.remove('image-loaded');
            mediaEl.classList.add('image-error');
            imgEl.style.display = 'none';
            fallbackEl.style.display = 'flex';
        };

        if (imgEl.complete && imgEl.naturalWidth > 0) {
            setLoaded();
            return;
        }

        imgEl.addEventListener('load', setLoaded, { once: true });
        imgEl.addEventListener('error', setError, { once: true });
    }

    function shouldKeepBrandImage(imgEl, options = {}) {
        return new Promise((resolve) => {
            try {
                const { requireTransparency = false } = options;
                const canvas = document.createElement('canvas');
                const size = 24;
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                if (!ctx) {
                    resolve(true);
                    return;
                }

                const sourceWidth = imgEl.naturalWidth || 1;
                const sourceHeight = imgEl.naturalHeight || 1;
                const scale = Math.min(size / sourceWidth, size / sourceHeight);
                const drawWidth = sourceWidth * scale;
                const drawHeight = sourceHeight * scale;
                const offsetX = (size - drawWidth) / 2;
                const offsetY = (size - drawHeight) / 2;

                ctx.clearRect(0, 0, size, size);
                ctx.drawImage(imgEl, offsetX, offsetY, drawWidth, drawHeight);
                const data = ctx.getImageData(0, 0, size, size).data;

                let edgePixels = 0;
                let transparentEdges = 0;
                let opaqueEdges = 0;

                for (let y = 0; y < size; y++) {
                    for (let x = 0; x < size; x++) {
                        const isEdge = x < 2 || y < 2 || x >= size - 2 || y >= size - 2;
                        if (!isEdge) continue;
                        edgePixels += 1;
                        const idx = (y * size + x) * 4;
                        const a = data[idx + 3];

                        if (a < 250) {
                            transparentEdges += 1;
                        } else {
                            opaqueEdges += 1;
                        }
                    }
                }

                const transparentRatio = edgePixels ? transparentEdges / edgePixels : 0;

                if (requireTransparency) {
                    resolve(transparentRatio > 0.05);
                } else {
                    resolve(opaqueEdges > 0);
                }
            } catch (error) {
                resolve(true);
            }
        });
    }

    function getStartupInitials(name) {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .slice(0, 3)
            .toUpperCase();
    }

    function getFounderInitials(name) {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .slice(0, 2)
            .toUpperCase();
    }
}

/* ==========================================================================
   BHARAT GUIDE AI LOGIC
   ========================================================================== */

function initBharatGuide() {
    const fabGuide = document.getElementById('fab-guide');
    const chatWindow = document.getElementById('guide-chat-window');
    const btnCloseChat = document.getElementById('btn-close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const btnSendMsg = document.getElementById('btn-send-msg');

    if (!fabGuide) return; // Not on this page

    // Knowledge Graph is now loaded from chatbot-data.js

    let isSynthesizing = false;

    // Toggle Chat
    fabGuide.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            chatInput.focus();
        }
    });

    btnCloseChat.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        if (isSynthesizing) {
            window.speechSynthesis.cancel();
            isSynthesizing = false;
        }
    });

    // Send Message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user-message');
        chatInput.value = '';

        // Determine bot response using external knowledge base
        let response = "I'm sorry, I seem to be having trouble accessing my knowledge base. Let's try again later.";
        if (typeof findBestResponse === 'function') {
            response = findBestResponse(text);
        }

        // Show typing indicator
        const typingId = showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator(typingId);
            addMessage(response, 'bot-message');
            speakResponse(response);
        }, 1200 + Math.random() * 800);
    }

    btnSendMsg.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Chat UI helpers
    function addMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message';
        msgDiv.id = id;
        msgDiv.innerHTML = `
            <div class="message-content typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Web Speech API (Text-to-Speech)
    function speakResponse(text) {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel(); // Cancel any ongoing speech

        const utterance = new SpeechSynthesisUtterance(text);

        // Try to find an Indian English voice for authenticity
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));

        if (indianVoice) {
            utterance.voice = indianVoice;
        }

        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        isSynthesizing = true;
        utterance.onend = () => { isSynthesizing = false; };

        window.speechSynthesis.speak(utterance);
    }

    // Ensure voices are loaded (Chrome issue)
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
}

    
/* ==========================================================================
   PERSONALITIES TYPE CHANGE FUNC
   ========================================================================== */
function initPersonalitiesPage() {
    const tabs = document.querySelectorAll('.category-tab');
    const cards = document.querySelectorAll('.person-card');

    function filterCards(category) {
        cards.forEach(card => {
            if (card.getAttribute('data-category') === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterCards(tab.getAttribute('data-category'));
        });
    });

    // Show only Historical Legends by default on page load
    filterCards('historical');
}


/* ==========================================================================
   SPIRITUAL CARDS ANIMATION CARSOUL
   ========================================================================== */

const spiritualData = [
    
    {
        id: "s2",
        name: "Taj Mahal",
        location: "Agra, Uttar Pradesh",
        rating: 4.9,
        image: "assets/Taj_Mahal.png",
        description: "An ivory-marble mausoleum built by Shah Jahan for Mumtaz Mahal — a monument to love recognized as one of the world's most extraordinary architectural achievements."
    },
    {
        id: "s3",
        name: "Golden Temple",
        location: "Amritsar, Punjab",
        rating: 4.9,
        image: "assets/Golden_Temple.png",
        description: "A spiritual sanctuary and one of the holiest Sikh shrines, symbolizing equality, devotion and human brotherhood."
    },
    {
        id: "s6",
        name: "Meenakshi Temple",
        location: "Madurai, Tamil Nadu",
        rating: 4.8,
        image: "assets/Meenakshi_Temple.png",
        description: "A Dravidian temple crowned with towering, painted gopurams depicting thousands of sculpted deities — a living center of worship for centuries."
    },
    {
        id: "s7",
        name: "Jama Masjid",
        location: "New Delhi",
        rating: 4.7,
        image: "assets/Jama_Masjid.png",
        description: "Commissioned by Shah Jahan, one of India's largest mosques, its red sandstone courtyard holding tens of thousands at Friday prayer."
    },
    {
        id: "s8",
        name: "Basilica of Bom Jesus",
        location: "Old Goa",
        rating: 4.6,
        image: "assets/Basilica_of_Bom_Jesus.png",
        description: "A UNESCO World Heritage Baroque church holding the mortal remains of St. Francis Xavier, its facade unplastered by design."
    },
    {
        id: "s9",
        name: "Kedarnath Temple",
        location: "Uttarakhand",
        rating: 4.9,
        image: "assets/Kedarnath.png",
        description: "Perched at 3,583m in the Garhwal Himalayas, one of the twelve Jyotirlingas — reached only on foot, mule, or by helicopter."
    },
    {
        id: "s10",
        name: "Hemis Monastery",
        location: "Ladakh",
        rating: 4.7,
        image: "assets/Hemis_Monastery.png",
        description: "The largest and wealthiest monastery in Ladakh, home to a masked Cham dance festival held once every twelve years."
    }
];   

function initSpiritualCarousel() {
    const carousel = document.getElementById('spiritual-carousel');
    const dotsContainer = document.getElementById('spiritual-dots');
    const prevBtn = document.getElementById('spiritual-prev');
    const nextBtn = document.getElementById('spiritual-next');
    const detailTitle = document.getElementById('spiritual-detail-title');
    const detailLoc = document.getElementById('spiritual-detail-location');
    const detailDesc = document.getElementById('spiritual-detail-desc');
    const exploreBtn = document.getElementById('spiritual-explore-btn');

    if (!carousel) return;

    const total = spiritualData.length;
    let activeIndex = 2; // start on Golden Temple, matching the reference image
    const VISIBLE_RANGE = 2; // shows activeIndex -2 ... +2 (5 cards)

    // Build all card elements once; visibility/position is handled in render()
    carousel.innerHTML = '';
    spiritualData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'spiritual-card';
        card.setAttribute('data-index', index);
        card.style.backgroundImage = `url(${item.image})`;
        card.innerHTML = `
            <div class="spiritual-card-rating">★ ${item.rating}</div>
            <div class="spiritual-card-overlay">
                <h4>${item.name}</h4>
                <div class="spiritual-card-loc">📍 ${item.location}</div>
            </div>
        `;
        card.addEventListener('click', () => {
            activeIndex = index;
            render();
        });
        carousel.appendChild(card);
    });

    // Circular distance from activeIndex, shortest path around the loop
    function getCircularOffset(index) {
        let diff = index - activeIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        return diff;
    }

    function render() {
    const panel = document.querySelector('.spiritual-detail-panel');
    panel.classList.add('updating');

    const cards = carousel.querySelectorAll('.spiritual-card');

    cards.forEach((card, index) => {
        const offset = getCircularOffset(index);
        const absOffset = Math.abs(offset);

        card.classList.remove('is-active');

        if (absOffset > VISIBLE_RANGE) {
            card.style.display = 'none';
            return;
        }

        card.style.display = 'block';

        const spacing = 200;
        const scale = offset === 0 ? 1 : absOffset === 1 ? 0.8 : 0.62;
        const opacity = offset === 0 ? 1 : absOffset === 1 ? 0.7 : 0.35;
        const zIndex = 10 - absOffset;
        const translateX = offset * spacing;

        card.style.zIndex = zIndex;
        card.style.opacity = opacity;
        card.style.transform =
            `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`;

        if (offset === 0) card.classList.add('is-active');
    });

    const activeItem = spiritualData[activeIndex];
    detailTitle.innerText = activeItem.name; // confirm you want this back
    detailDesc.innerText = activeItem.description;

    requestAnimationFrame(() => {
        panel.classList.remove('updating');
    });
}

    function goNext() {
        activeIndex = (activeIndex + 1) % total; // wraps to 0 at the end
        render();
    }

    function goPrev() {
        activeIndex = (activeIndex - 1 + total) % total; // wraps to last at the start
        render();
    }

    nextBtn.addEventListener('click', goNext);
    prevBtn.addEventListener('click', goPrev);

    render();
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
