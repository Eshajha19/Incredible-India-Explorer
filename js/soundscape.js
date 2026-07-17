window.IIE = window.IIE || {};
(function() {
  'use strict';

  let audioCtx = null;
  let currentOscillators = [];
  let currentGains = [];
  let eidChimeIndex = 0;
  let eidChimeInterval = null;
  let eidDroneOsc = null;
  let eidDroneGain = null;
  let currentLoop = null;
  let isPlaying = false;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function stopAllSounds() {
    currentOscillators.forEach(osc => { try { osc.stop(); } catch(e) {} });
    currentGains.forEach(gain => { try { gain.disconnect(); } catch(e) {} });
    currentOscillators = [];
    currentGains = [];
    if (eidChimeInterval) { clearInterval(eidChimeInterval); eidChimeInterval = null; }
    if (eidDroneOsc) { try { eidDroneOsc.stop(); } catch(e) {} eidDroneOsc = null; }
    if (eidDroneGain) { try { eidDroneGain.disconnect(); } catch(e) {} eidDroneGain = null; }
    if (currentLoop) { clearInterval(currentLoop); currentLoop = null; }
    isPlaying = false;
  }

  function synthesizeDholStrike(ctx, time, gainValue) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(60, time + 0.1);
    gain.gain.setValueAtTime(gainValue, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.15);
  }

  function synthesizeClap(ctx, time, gainValue) {
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(gainValue, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(time);
  }

  function synthesizeBellChime(ctx, time, freq, gainValue) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(gainValue, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.8);
  }

  function initAudioSynth() {
    try { return getAudioContext(); } catch(e) { return null; }
  }

  function playStateSoundscape(stateName) {
    const ctx = getAudioContext();
    if (!ctx) return;
    stopAllSounds();
    isPlaying = true;

    const droneFreq = 80 + Math.random() * 40;
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    drone.type = 'sine';
    drone.frequency.setValueAtTime(droneFreq, ctx.currentTime);
    droneGain.gain.setValueAtTime(0.08, ctx.currentTime);
    drone.connect(droneGain);
    droneGain.connect(ctx.destination);
    drone.start();
    currentOscillators.push(drone);
    currentGains.push(droneGain);

    currentLoop = setInterval(() => {
      if (!isPlaying) return;
      const t = ctx.currentTime;
      const beat = Math.random();
      if (beat < 0.4) {
        synthesizeDholStrike(ctx, t, 0.15);
      } else if (beat < 0.7) {
        synthesizeClap(ctx, t, 0.1);
      } else {
        synthesizeBellChime(ctx, t, 220 + Math.random() * 440, 0.05);
      }
    }, 600);
  }

  function playDiwaliSoundscape() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    for (let i = 0; i < 20; i++) {
      const time = t + i * 0.3;
      synthesizeDholStrike(ctx, time, 0.2 - i * 0.005);
    }
    for (let i = 0; i < 15; i++) {
      const time = t + i * 0.4 + 0.1;
      synthesizeBellChime(ctx, time, 440 + Math.random() * 880, 0.08);
    }
    for (let i = 0; i < 10; i++) {
      const time = t + i * 0.5 + 0.2;
      synthesizeClap(ctx, time, 0.12);
    }
  }

  function playHoliSoundscape() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    for (let i = 0; i < 25; i++) {
      const time = t + i * 0.2;
      synthesizeDholStrike(ctx, time, 0.25);
      synthesizeClap(ctx, time + 0.1, 0.08);
    }
  }

  function playEidSoundscape() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    eidDroneOsc = ctx.createOscillator();
    eidDroneGain = ctx.createGain();
    eidDroneOsc.type = 'sine';
    eidDroneOsc.frequency.setValueAtTime(55, t);
    eidDroneGain.gain.setValueAtTime(0.06, t);
    eidDroneOsc.connect(eidDroneGain);
    eidDroneGain.connect(ctx.destination);
    eidDroneOsc.start();

    const pentatonic = [262, 294, 330, 392, 440];
    eidChimeInterval = setInterval(() => {
      if (!isPlaying) { clearInterval(eidChimeInterval); return; }
      const freq = pentatonic[eidChimeIndex % pentatonic.length];
      synthesizeBellChime(ctx, ctx.currentTime, freq, 0.1);
      eidChimeIndex++;
    }, 500);
  }

  function playPongalSoundscape() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    for (let i = 0; i < 30; i++) {
      const time = t + i * 0.15;
      synthesizeDholStrike(ctx, time, 0.18);
    }
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    drone.type = 'sine';
    drone.frequency.setValueAtTime(120, t);
    droneGain.gain.setValueAtTime(0.04, t);
    drone.connect(droneGain);
    droneGain.connect(ctx.destination);
    drone.start();
    currentOscillators.push(drone);
    currentGains.push(droneGain);
  }

  function playNavratriSoundscape() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    for (let i = 0; i < 40; i++) {
      const time = t + i * 0.12;
      const beat = i % 4;
      if (beat === 0) synthesizeDholStrike(ctx, time, 0.3);
      else if (beat === 2) synthesizeClap(ctx, time, 0.15);
      else synthesizeClap(ctx, time, 0.08);
    }
  }

  function playBihuSoundscape() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    for (let i = 0; i < 35; i++) {
      const time = t + i * 0.18;
      if (i % 3 === 0) synthesizeDholStrike(ctx, time, 0.22);
      else synthesizeBellChime(ctx, time, 330 + (i % 5) * 55, 0.06);
    }
  }

  function playSoundscape(festName, drumEl) {
    stopAllSounds();
    isPlaying = true;
    switch(festName) {
      case 'Diwali': playDiwaliSoundscape(); break;
      case 'Holi': playHoliSoundscape(); break;
      case 'Eid': playEidSoundscape(); break;
      case 'Pongal': playPongalSoundscape(); break;
      case 'Navratri': playNavratriSoundscape(); break;
      case 'Bihu': playBihuSoundscape(); break;
      default: playStateSoundscape(festName);
    }
  }

  function stopSoundscape() {
    stopAllSounds();
  }

  window.IIE.Soundscape = {
    initAudioSynth: initAudioSynth,
    playSoundscape: playSoundscape,
    stopSoundscape: stopSoundscape,
    playDiwaliSoundscape: playDiwaliSoundscape,
    playHoliSoundscape: playHoliSoundscape,
    playEidSoundscape: playEidSoundscape,
    playPongalSoundscape: playPongalSoundscape,
    playNavratriSoundscape: playNavratriSoundscape,
    playBihuSoundscape: playBihuSoundscape,
    playChimeLoop: function() {},
    synthesizeDholStrike: synthesizeDholStrike,
    synthesizeClap: synthesizeClap,
    synthesizeBellChime: synthesizeBellChime,
    playStateSoundscape: playStateSoundscape
  };
})();
