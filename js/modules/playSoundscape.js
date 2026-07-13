import { currentFestivalPlaying } from './currentFestivalPlaying.js';
import { initAudioSynth } from './initAudioSynth.js';
import { playBihuSoundscape } from './playBihuSoundscape.js';
import { playDiwaliSoundscape } from './playDiwaliSoundscape.js';
import { playEidSoundscape } from './playEidSoundscape.js';
import { playHoliSoundscape } from './playHoliSoundscape.js';
import { playNavratriSoundscape } from './playNavratriSoundscape.js';
import { playPongalSoundscape } from './playPongalSoundscape.js';
import { soundscapeActive } from './soundscapeActive.js';
import { stopSoundscape } from './stopSoundscape.js';

export function playSoundscape(festName, drumElement) {
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
