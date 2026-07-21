/* ==========================================================================
   WEB AUDIO API SOUNDSCAPE SYNTHESIZER MODULE
   ========================================================================== */

var audioCtx = null;
var soundscapeActive = false;
var audioTimeout = null;
var currentFestivalPlaying = '';
var activeAudioNodes = [];

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
    activeAudioNodes.forEach(node => {
        try {
            node.stop();
        } catch (e) {
            // Already stopped or not started
        }
    });
    activeAudioNodes = [];
}

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

function playStateSoundscape(stateName) {
    initAudioSynth();
    stopSoundscape();

    soundscapeActive = true;
    currentFestivalPlaying = "State";

    const drone1 = audioCtx.createOscillator();
    const drone2 = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();

    drone1.type = "sine";
    drone1.frequency.value = 146.83;
    drone2.type = "triangle";
    drone2.frequency.value = 220.00;

    droneGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 2);

    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(audioCtx.destination);

    drone1.start();
    drone2.start();

    activeAudioNodes.push(drone1, drone2);

    function playStateChime() {
        if (!soundscapeActive || currentFestivalPlaying !== "State") return;

        const scale = [587.33, 659.25, 739.99, 880.00, 987.77];
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

window.initAudioSynth = initAudioSynth;
window.playSoundscape = playSoundscape;
window.stopSoundscape = stopSoundscape;
window.playStateSoundscape = playStateSoundscape;
