/**
 * Audio Guide & Cultural Pronunciation System
 * Provides SpeechSynthesis audio guide playback, native language voice selection,
 * pronunciation lookup, rate controls, and UI binding for cultural sites.
 */

export class AudioGuideSystem {
  constructor(options = {}) {
    this.speechSynth = options.speechSynth || (typeof window !== 'undefined' ? window.speechSynthesis : null);
    this.currentUtterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.playbackRate = options.playbackRate || 1.0;
    this.selectedLang = options.selectedLang || 'en-IN';
    this.subscribers = new Set();

    this.pronunciationMap = {
      'Taj Mahal': { phonetic: 'Taaj Muh-hahl', lang: 'hi-IN' },
      'Qutub Minar': { phonetic: 'Koo-tub Mi-naar', lang: 'hi-IN' },
      'Konark Sun Temple': { phonetic: 'Ko-naark Sun Tem-pul', lang: 'or-IN' },
      'Hampi': { phonetic: 'Hum-pee', lang: 'kn-IN' },
      'Ajanta Caves': { phonetic: 'Uh-jun-tuh Caves', lang: 'hi-IN' },
      'Ellora Caves': { phonetic: 'El-lor-uh Caves', lang: 'hi-IN' },
      'Khajuraho': { phonetic: 'Khu-joo-raa-ho', lang: 'hi-IN' },
      'Meenakshi Temple': { phonetic: 'Mee-naak-shee Tem-pul', lang: 'ta-IN' }
    };
  }

  getPronunciation(name) {
    if (!name) return null;
    return this.pronunciationMap[name] || { phonetic: name, lang: this.selectedLang };
  }

  speakText(text, lang = this.selectedLang) {
    if (!this.speechSynth) {
      this.notifySubscribers({ status: 'unsupported', text });
      return false;
    }

    this.stop();

    const UtteranceClass = (typeof globalThis !== 'undefined' && globalThis.SpeechSynthesisUtterance)
      || (typeof window !== 'undefined' && window.SpeechSynthesisUtterance)
      || class { constructor(t) { this.text = t; } };

    const utterance = new UtteranceClass(text);
    utterance.rate = this.playbackRate;
    utterance.lang = lang;

    utterance.onstart = () => {
      if (this.currentUtterance !== utterance) return;
      this.isPlaying = true;
      this.isPaused = false;
      this.notifySubscribers({ status: 'playing', text, lang });
    };

    utterance.onend = () => {
      if (this.currentUtterance !== utterance) return;
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.notifySubscribers({ status: 'stopped', text });
    };

    utterance.onerror = (err) => {
      if (this.currentUtterance !== utterance) return;
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.notifySubscribers({ status: 'error', error: err });
    };

    this.currentUtterance = utterance;
    this.speechSynth.speak(utterance);
    return true;
  }

  pause() {
    if (this.speechSynth && this.isPlaying && !this.isPaused) {
      this.speechSynth.pause();
      this.isPaused = true;
      this.notifySubscribers({ status: 'paused' });
    }
  }

  resume() {
    if (this.speechSynth && this.isPaused) {
      this.speechSynth.resume();
      this.isPaused = false;
      this.notifySubscribers({ status: 'playing' });
    }
  }

  stop() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.notifySubscribers({ status: 'stopped' });
    }
  }

  setRate(rate) {
    this.playbackRate = Math.max(0.5, Math.min(2.0, rate));
    this.notifySubscribers({ status: 'rate_changed', rate: this.playbackRate });
  }

  subscribe(callback) {
    if (typeof callback === 'function') {
      this.subscribers.add(callback);
    }
  }

  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }

  notifySubscribers(data) {
    this.subscribers.forEach((cb) => cb(data));
  }
}

export const defaultAudioGuide = new AudioGuideSystem();
