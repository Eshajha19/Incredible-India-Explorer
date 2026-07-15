const festivalHighlights = {
    "Diwali": [
        { icon: "&#127982;", text: "Clay Diyas & Lighting" },
        { icon: "&#127800;", text: "Flower & Powder Rangoli" },
        { icon: "&#127852;", text: "Sharing Mithai (Sweets)" },
        { icon: "&#127879;", text: "Night Sparklers & Fireworks" }
    ],
    "Holi": [
        { icon: "&#127912;", text: "Organic Colors (Gulal)" },
        { icon: "&#129767;", text: "Pichkaris & Water Balloons" },
        { icon: "&#129371;", text: "Thandai & Gujiya Sweets" },
        { icon: "&#128293;", text: "Holika Dahan Bonfires" }
    ],
    "Eid": [
        { icon: "&#127769;", text: "Crescent Moon Sighting" },
        { icon: "&#x1F54C;", text: "Congregational Prayers" },
        { icon: "&#127852;", text: "Sweet Sheer Khurma Feast" },
        { icon: "&#127873;", text: "Eidi (Gift-Giving)" }
    ],
    "Pongal": [
        { icon: "&#127806;", text: "Harvest Sugarcane Stalks" },
        { icon: "&#127982;", text: "Decorated Clay Boiling Pots" },
        { icon: "&#9728;&#65039;", text: "Surya (Sun God) Worship" },
        { icon: "&#128004;", text: "Decorating Cattle (Mattu)" }
    ],
    "Navratri": [
        { icon: "&#128131;", text: "Garba & Dandiya Dances" },
        { icon: "&#129535;", text: "Chaniya Choli Dressups" },
        { icon: "&#127982;", text: "Ghatasthapana (Holy Jar)" },
        { icon: "&#128293;", text: "Dussehra Effigy Burning" }
    ],
    "Bihu": [
        { icon: "&#129345;", text: "Dhol & Pepa Music" },
        { icon: "&#127806;", text: "Rongali Spring Dance" },
        { icon: "&#129366;", text: "Pitha Rice Cake Feasts" },
        { icon: "&#128293;", text: "Community Bonfires" }
    ],
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
                { icon: "&#127881;", text: "Traditional Customs" },     
                { icon: "&#127852;", text: "Festive Meals" },           
                { icon: "&#10024;", text: "Joyous Decorations" },       
                { icon: "&#129309;", text: "Community Gatherings" }    
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
            audioBtn.innerHTML = '<span class="audio-icon">&#128266;</span> Listen to Soundscape';
            stopSoundscape();

            audioBtn.onclick = () => {
                if (audioBtn.classList.contains('playing')) {
                    audioBtn.classList.remove('playing');
                    audioBtn.innerHTML = '<span class="audio-icon">&#128266;</span> Listen to Soundscape';
                    stopSoundscape();
                } else {
                    audioBtn.classList.add('playing');
                    audioBtn.innerHTML = '<span class="audio-icon">&#128263;</span> Stop Soundscape';

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
            p.innerText = '★';
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
            p.innerText = festName === "Bihu" ? '🍂' : '🌸';
            p.style.left = Math.random() * 100 + '%';
            p.style.setProperty('--x', (Math.random() * 80 - 40) + 'px');
            p.style.animationDelay = Math.random() * 5 + 's';
            p.style.animationDuration = (Math.random() * 4 + 5) + 's';
            container.appendChild(p);
        }
    }
}

// Web Audio API Festival-Specific Soundscapes
window.playFestivalSoundscape = function(festName, drumElement) {
    if (!audioCtx) return;

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
};

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

    if (flameElement && Math.random() > 0.5) {
        flameElement.style.transform = `scale(${Math.random() * 0.2 + 0.95}) rotate(${Math.random() * 4 - 2}deg)`;
        setTimeout(() => {
            if (flameElement) flameElement.style.transform = '';
        }, 100);
    }

    audioTimeout = setTimeout(() => playDiwaliSoundscape(flameElement), 80 + Math.random() * 150);
}

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

function playEidSoundscape() {
    let chimeIndex = 0;

    const drone1 = audioCtx.createOscillator();
    const drone2 = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();

    drone1.type = "sine";
    drone1.frequency.value = 110;
    drone2.type = "triangle";
    drone2.frequency.value = 165;
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

        const scale = [440, 494, 554, 659, 740];
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
