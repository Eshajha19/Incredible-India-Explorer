window.AppConfig = {
    // Theme
    THEME_STORAGE_KEY: 'theme',
    THEME_LIGHT: 'light',
    THEME_DARK: 'dark',
    THEME_CLASS_LIGHT: 'light-theme',

    // CSS class constants
    CLASS_ACTIVE: 'active',
    CLASS_OPEN: 'open',
    CLASS_HIDDEN: 'hidden',
    CLASS_VISIBLE: 'visible',
    CLASS_IS_VISIBLE: 'is-visible',
    CLASS_SCROLLED: 'scrolled',
    CLASS_NO_SCROLL: 'no-scroll',
    CLASS_DROP_CAP: 'drop-cap',
    CLASS_REVEAL: 'reveal',
    CLASS_PLAYING: 'playing',
    CLASS_BEAT_PULSE: 'beat-pulse',
    CLASS_DIMMED: 'dimmed',
    CLASS_DISABLED: 'disabled',
    CLASS_CORRECT: 'correct',
    CLASS_WRONG: 'wrong',
    CLASS_LISTENING: 'listening',

    // Timing (ms)
    FOCUS_TRAP_DELAY: 50,
    BEAT_PULSE_DELAY: 150,
    TOAST_DURATION: 4000,
    LOADING_OVERLAY_TIMEOUT: 8000,
    ROUTE_TRANSITION_DURATION: 250,
    SCROLL_ANIMATION_DURATION: 500,
    MODAL_SHOW_DELAY: 300,

    // Animation
    ROTATING_TEXT_INTERVAL: 3500,

    // Navigation
    NAV_PATHS: {
        DANCE: 'frontend/dance/dance.html',
        SPORTS: 'frontend/sports/sports.html',
        SCIENCE: 'frontend/science/science.html',
        MUSIC: 'frontend/music/music.html',
        LITERATURE: 'frontend/literature/literature.html',
    },

    // Cache
    CACHE_TTL_SHORT: 15 * 60 * 1000,
    CACHE_TTL_MEDIUM: 30 * 60 * 1000,
    CACHE_TTL_LONG: 3 * 60 * 60 * 1000,

    // Limits
    RECENTLY_VIEWED_MAX: 10,
    TRANSLATION_CACHE_LIMIT: 500,

    // Routes (pages in command palette)
    CMD_PALETTE_ROUTES: [
        'index.html',
        'monuments.html',
        'culture.html',
        'festivals.html',
        'itinery-generator.html',
        'india-3d-map.html',
    ],
};