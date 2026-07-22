import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AudioGuideSystem } from '../../js-modules/audio-guide-system.js';

describe('AudioGuideSystem', () => {
  let mockSynth;
  let audioGuide;

  beforeEach(() => {
    if (typeof globalThis.SpeechSynthesisUtterance === 'undefined') {
      globalThis.SpeechSynthesisUtterance = class {
        constructor(text) {
          this.text = text;
          this.rate = 1.0;
          this.lang = 'en-IN';
        }
      };
    }
    mockSynth = {
      speak: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
      cancel: vi.fn()
    };
    audioGuide = new AudioGuideSystem({ speechSynth: mockSynth });
  });

  it('should initialize with default parameters', () => {
    expect(audioGuide.isPlaying).toBe(false);
    expect(audioGuide.playbackRate).toBe(1.0);
    expect(audioGuide.selectedLang).toBe('en-IN');
  });

  it('should retrieve phonetic pronunciations for monuments', () => {
    const tajInfo = audioGuide.getPronunciation('Taj Mahal');
    expect(tajInfo).toEqual({ phonetic: 'Taaj Muh-hahl', lang: 'hi-IN' });

    const unknownInfo = audioGuide.getPronunciation('Unknown Monument');
    expect(unknownInfo).toEqual({ phonetic: 'Unknown Monument', lang: 'en-IN' });
  });

  it('should trigger speech synthesis on speakText', () => {
    const success = audioGuide.speakText('Welcome to Taj Mahal');
    expect(success).toBe(true);
    expect(mockSynth.speak).toHaveBeenCalledOnce();
  });

  it('should adjust playback rate within bounds [0.5, 2.0]', () => {
    audioGuide.setRate(1.5);
    expect(audioGuide.playbackRate).toBe(1.5);

    audioGuide.setRate(3.0);
    expect(audioGuide.playbackRate).toBe(2.0);

    audioGuide.setRate(0.1);
    expect(audioGuide.playbackRate).toBe(0.5);
  });

  it('should notify subscribers on state changes', () => {
    const subscriber = vi.fn();
    audioGuide.subscribe(subscriber);

    audioGuide.speakText('Hampi Guide');
    expect(subscriber).toHaveBeenCalled();
  });

  it('should handle pause, resume, and stop operations', () => {
    audioGuide.isPlaying = true;
    audioGuide.pause();
    expect(mockSynth.pause).toHaveBeenCalledOnce();
    expect(audioGuide.isPaused).toBe(true);

    audioGuide.resume();
    expect(mockSynth.resume).toHaveBeenCalledOnce();

    audioGuide.stop();
    expect(mockSynth.cancel).toHaveBeenCalledOnce();
    expect(audioGuide.isPlaying).toBe(false);
  });
});
