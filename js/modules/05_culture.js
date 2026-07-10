import { cultureData } from '../data/cultureData.js';

/* ==========================================================================
   5. CULTURE SLIDER (CAROUSEL)
   ========================================================================== */

export function initCultureSlider() {
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



// Attach to window for global inline HTML handlers
window.initCultureSlider = initCultureSlider;
