window.IIE = window.IIE || {};
(function() {
  'use strict';

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
      }, 3500);
    });
  }

  function initCuisineExplorer() {
    const cuisineGrid = document.getElementById('cuisine-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (!cuisineGrid) return;
    renderCuisines('all');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const region = btn.getAttribute('data-region');

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

      card.addEventListener('click', () => {
        window.location.href = 'festivals.html';
      });

      festivalTimeline.appendChild(card);
    });
  }

  function initCultureSlider() {
    const track = document.getElementById('slider-track');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');

    let currentSlide = 0;

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

    dotsContainer.innerHTML = '';
    const totalCards = cultureData.length;

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
      const maxSlides = getMaxSlides();
      if (currentSlide < 0) currentSlide = 0;
      if (currentSlide > maxSlides) currentSlide = maxSlides;

      const cardWidthPercent = 100 / getVisibleSlidesCount();

      const percentTranslation = currentSlide * cardWidthPercent;

      track.style.transform = `translateX(calc(-${percentTranslation}% - ${currentSlide * 20}px))`;

      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    nextBtn.addEventListener('click', () => {
      currentSlide++;
      moveSlider();
    });

    prevBtn.addEventListener('click', () => {
      currentSlide--;
      moveSlider();
    });

    const sliderContainer = document.getElementById('slider-container');
    if (!sliderContainer) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      isSwiping = false;
    }, { passive: true });

    sliderContainer.addEventListener('touchmove', (e) => {
      const deltaX = e.changedTouches[0].screenX - touchStartX;
      const deltaY = e.changedTouches[0].screenY - touchStartY;

      if (!isSwiping && Math.abs(deltaX) > Math.abs(deltaY)) {
        isSwiping = true;
      }

      if (isSwiping) {
        e.preventDefault();
      }
    }, { passive: false });

    sliderContainer.addEventListener('touchend', (e) => {
      if (!isSwiping) return;

      const deltaX = e.changedTouches[0].screenX - touchStartX;
      const SWIPE_THRESHOLD = 50;

      if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
        if (deltaX < 0) {
          currentSlide++;
        } else {
          currentSlide--;
        }
        moveSlider();
      }

      isSwiping = false;
    }, { passive: true });

    updateDots();

    window.addEventListener('resize', () => {
      const max = getMaxSlides();
      if (currentSlide > max) {
        currentSlide = max;
      }
      updateDots();
      moveSlider();
    });
  }

  window.IIE.Home = {
    initRotatingText: initRotatingText,
    initCuisineExplorer: initCuisineExplorer,
    initFestivals: initFestivals,
    initCultureSlider: initCultureSlider
  };
})();
