/* ==========================================================================
   STATE INDIVIDUAL PAGE - INTERACTIVE & ANIMATED EXPERIENCE
   ========================================================================== */

document.addEventListener('app:route-changed', () => {
    initNavigation();
    initStatePage();
});

function initStatePage() {
    const stateId = document.body.getAttribute('data-state-id');
    
    // Get map data from parent scope
    const mapDataLocations = window.mapData?.locations || [];
    
    // Try to parse from data.js if available
    let loc = mapDataLocations.find(l => l.id === stateId);
    
    if (!loc) {
        // Fallback: get from embedded data on the page
        const nameEl = document.querySelector('.sub-hero-content h1');
        const goldElements = document.querySelectorAll('.stat-content p.gold');
        
        if (nameEl) {
            const storyEl = document.querySelector('#state-story-main-text');
            loc = {
                id: stateId,
                name: nameEl.textContent || 'Unknown',
                capital: goldElements[0]?.textContent || 'Unknown',
                food: goldElements[1]?.textContent || 'Unknown',
                festival: goldElements[2]?.textContent || 'Unknown',
                description: 'Discover the beauty and culture of ' + (nameEl.textContent || 'this region'),
                story: storyEl?.textContent || 'Experience the unique heritage and traditions of ' + (nameEl.textContent || 'this state') + '.'
            };
        }
    }
    
    if (loc) {
        loadStoryTimeline(loc);
    }
    
    setupParticles();
    setupScrollEffects();
}

function loadStoryTimeline(loc) {
    const timeline = document.getElementById('state-story-timeline');
    if (!timeline) return;
    
    let paragraphs = [];
    
    // Get story from the page's embedded story text (already processed)
    const storyEl = document.querySelector('#state-story-main-text');
    const storyText = storyEl?.textContent || storyEl?.innerText || '';
    
    // Split by either actual newlines or literal \n\n in HTML
    const normalizedStory = storyText
        .split(/\n\n|\\n\\n/)
        .map(s => s.trim())
        .filter(s => s.length > 20);
    
    paragraphs = normalizedStory.length > 0 ? normalizedStory : [loc.description || 'Explore this beautiful state of India.'];
    
    timeline.innerHTML = '';
    paragraphs.forEach((p, index) => {
        const card = document.createElement('div');
        const delayClass = index === 0 ? 'animate-fade-in-delayed' : index === 1 ? 'animate-fade-in-delayed-2' : 'animate-fade-in-delayed-3';
        card.className = `story-timeline-card glass-card ${delayClass}`;
        card.innerHTML = `
            <div class="story-timeline-number">${index + 1}</div>
            <div class="story-timeline-content">
                <p>${p.substring(0, 120)}${p.length > 120 ? '...' : ''}</p>
                <button class="btn btn-gold" onclick="showFullStory()">Read More</button>
            </div>
        `;
        timeline.appendChild(card);
    });
}

function showFullStory() {
    const overlay = document.getElementById('state-story-overlay');
    if (overlay) {
        overlay.classList.add('open');
        spawnStateParticles();
    }
}

function spawnStateParticles() {
    const container = document.getElementById('state-canvas-particles');
    if (!container) return;
    
    container.innerHTML = '';
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
        container.appendChild(particle);
    }
}

function setupParticles() {
    const hero = document.querySelector('.state-hero');
    if (!hero) return;
    
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'hero-floating-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.width = (Math.random() * 8 + 4) + 'px';
        p.style.height = p.style.width;
        p.style.animationDelay = (Math.random() * 3) + 's';
        hero.appendChild(p);
    }
}

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const btnScrollTop = document.getElementById('btn-scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
            btnScrollTop?.classList.add('visible');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu?.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle?.classList.remove('open');
            navMenu?.classList.remove('open');
        });
    });

    btnScrollTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function setupScrollEffects() {
    const fadeSections = document.querySelectorAll('.fade-in-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    fadeSections.forEach(section => observer.observe(section));
}

// Audio toggle for story overlay
document.addEventListener('click', function(e) {
    if (e.target.id === 'state-story-audio-btn') {
        const btn = e.target;
        if (btn.classList.contains('playing')) {
            btn.classList.remove('playing');
            btn.innerHTML = '<span class="audio-icon">🔊</span> Listen to Soundscape';
        } else {
            btn.classList.add('playing');
            btn.innerHTML = '<span class="audio-icon">🔇</span> Stop Soundscape';
        }
    }
    
    if (e.target.id === 'state-story-back-btn') {
        document.getElementById('state-story-overlay')?.classList.remove('open');
    }
    
    if (e.target.id === 'btn-full-story') {
        document.getElementById('state-story-overlay')?.classList.add('open');
        spawnStateParticles();
    }
});