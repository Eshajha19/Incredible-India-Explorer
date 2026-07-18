window.IIE = window.IIE || {};
(function() {
  'use strict';

  const festivalHighlights = {
    "Diwali": [
      { icon: "\u{1F6AA}", text: "Clay Diyas & Lighting" },
      { icon: "\u{1F3A8}", text: "Flower & Powder Rangoli" },
      { icon: "\u{1F36C}", text: "Sharing Mithai (Sweets)" },
      { icon: "\u{1F386}", text: "Night Sparklers & Fireworks" }
    ],
    "Holi": [
      { icon: "\u{1F3A8}", text: "Organic Colors (Gulal)" },
      { icon: "\u{1F4A6}", text: "Pichkaris & Water Balloons" },
      { icon: "\u{1F95B}", text: "Thandai & Gujiya Sweets" },
      { icon: "\u{1F525}", text: "Holika Dahan Bonfires" }
    ],
    "Eid": [
      { icon: "\u{1F319}", text: "Crescent Moon Sighting" },
      { icon: "\u{1F56C}", text: "Congregational Prayers" },
      { icon: "\u{1F963}", text: "Sweet Sheer Khurma Feast" },
      { icon: "\u{1F381}", text: "Eidi (Gift-Giving)" }
    ],
    "Pongal": [
      { icon: "\u{1F33E}", text: "Harvest Sugarcane Stalks" },
      { icon: "\u{1F3FA}", text: "Decorated Clay Boiling Pots" },
      { icon: "\u2600\uFE0F", text: "Surya (Sun God) Worship" },
      { icon: "\u{1F404}", text: "Decorating Cattle (Mattu)" }
    ],
    "Navratri": [
      { icon: "\u{1F483}", text: "Garba & Dandiya Dances" },
      { icon: "\u{1F97B}", text: "Chaniya Choli Dressups" },
      { icon: "\u{1F6EF}\uFE0F", text: "Ghatasthapana (Holy Jar)" },
      { icon: "\u{1F531}", text: "Dussehra Effigy Burning" }
    ],
    "Bihu": [
      { icon: "\u{1F941}", text: "Dhol & Pepa Music" },
      { icon: "\u{1F33E}", text: "Rongali Spring Dance" },
      { icon: "\u{1F95E}", text: "Pitha Rice Cake Feasts" },
      { icon: "\u{1F403}", text: "Community Bonfires" }
    ]
  };

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

        const paragraphs = (fest.story || fest.description)
          .split('\n\n')
          .map(pText => `<p class="story-paragraph">${pText}</p>`)
          .join('');
        storyMainText.innerHTML = paragraphs;

        const firstPara = storyMainText.querySelector('.story-paragraph');
        if (firstPara) firstPara.classList.add('drop-cap');

        overlay.className = `story-overlay theme-${fest.name.toLowerCase()}`;

        highlightsGrid.innerHTML = '';
        const highlights = festivalHighlights[fest.name] || [
          { icon: "\u{1F389}", text: "Traditional Customs" },
          { icon: "\u{1F963}", text: "Festive Meals" },
          { icon: "\u2728", text: "Joyous Decorations" },
          { icon: "\u{1FAC2}", text: "Community Gatherings" }
        ];

        highlights.forEach(hl => {
          const div = document.createElement('div');
          div.className = 'highlight-bullet';
          div.innerHTML = `<span class="bullet-icon">${hl.icon}</span><span>${hl.text}</span>`;
          highlightsGrid.appendChild(div);
        });

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

        overlay.classList.add('open');

        (window.IIE.Soundscape && window.IIE.Soundscape.setupScrollReveals
          ? window.IIE.Nav.setupScrollReveals()
          : (typeof setupScrollReveals === 'function' && setupScrollReveals()));

        spawnThemedParticles(fest.name, particlesContainer);

        audioBtn.classList.remove('playing');
        audioBtn.innerHTML = '<span class="audio-icon">\u{1F50A}</span> Listen to Soundscape';
        (window.IIE.Soundscape && window.IIE.Soundscape.stopSoundscape());

        audioBtn.onclick = () => {
          if (audioBtn.classList.contains('playing')) {
            audioBtn.classList.remove('playing');
            audioBtn.innerHTML = '<span class="audio-icon">\u{1F50A}</span> Listen to Soundscape';
            (window.IIE.Soundscape && window.IIE.Soundscape.stopSoundscape());
          } else {
            audioBtn.classList.add('playing');
            audioBtn.innerHTML = '<span class="audio-icon">\u{1F507}</span> Stop Soundscape';

            let drumEl = null;
            if (fest.name === "Bihu") {
              drumEl = document.getElementById('bihu-dhol-drum');
            } else if (fest.name === "Navratri") {
              drumEl = document.getElementById('navratri-dandiya-sticks');
            } else if (fest.name === "Diwali") {
              drumEl = document.getElementById('diya-flame-obj');
            }
            (window.IIE.Soundscape && window.IIE.Soundscape.playSoundscape(fest.name, drumEl));
          }
        };
      });

      festivalTimeline.appendChild(card);
    });

    backBtn.addEventListener('click', () => {
      overlay.classList.remove('open');
      particlesContainer.innerHTML = '';
      shapeContainer.innerHTML = '';
      (window.IIE.Soundscape && window.IIE.Soundscape.stopSoundscape());
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
        p.innerText = '\u2605';
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
        p.innerText = festName === "Bihu" ? '\u{1F343}' : '\u{1F338}';
        p.style.left = Math.random() * 100 + '%';
        p.style.setProperty('--x', (Math.random() * 80 - 40) + 'px');
        p.style.animationDelay = Math.random() * 5 + 's';
        p.style.animationDuration = (Math.random() * 4 + 5) + 's';
        container.appendChild(p);
      }
    }
  }

  window.IIE.FestivalsPage = { init: initFestivalsPage, spawnThemedParticles: spawnThemedParticles };
})();
