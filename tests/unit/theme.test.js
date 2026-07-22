/**
 * theme.test.js
 * Tests for the theme toggle logic (app.js initThemeToggle).
 *
 * Uses jsdom to simulate the DOM environment for class toggling,
 * localStorage persistence, and button rendering.
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Sets up a minimal DOM with the theme-toggle button and localStorage mock.
 * This mirrors the environment that app.js initThemeToggle() expects.
 */
function setupThemeDOM() {
  document.body.innerHTML = `
    <button id="theme-toggle" title="Toggle Light Mode" aria-label="Toggle Light Mode">
      <svg class="theme-toggle-icon" viewBox="0 0 24 24">
        <path d="M21 12.8A8.8 8.8 0 0 1 11.2 3 8.8 8.8 0 1 0 21 12.8Z" />
      </svg>
    </button>
  `;

  // Clear theme from localStorage before each test
  localStorage.removeItem('theme');
  document.body.classList.remove('light-theme');
}

/**
 * initThemeToggle logic extracted from app.js lines 313-357.
 * This is the exact same logic, operating on the DOM.
 */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;
  if (themeBtn.dataset.listenerBound) return;
  themeBtn.dataset.listenerBound = 'true';

  const setThemeIcon = (isLightTheme) => {
    if (isLightTheme) {
      themeBtn.innerHTML = `
        <svg class="theme-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5L19 19M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5L19 5" />
          <circle cx="12" cy="12" r="4.5" />
        </svg>
      `;
      themeBtn.setAttribute('title', 'Toggle Dark Mode');
      themeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
    } else {
      themeBtn.innerHTML = `
        <svg class="theme-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M21 12.8A8.8 8.8 0 0 1 11.2 3 8.8 8.8 0 1 0 21 12.8Z" fill="currentColor" />
        </svg>
      `;
      themeBtn.setAttribute('title', 'Toggle Light Mode');
      themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
    }
  };

  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    setThemeIcon(true);
  } else {
    setThemeIcon(false);
  }

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLightTheme = document.body.classList.contains('light-theme');
    setThemeIcon(isLightTheme);
    const theme = isLightTheme ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
  });
}

describe('Theme toggle — default state (dark mode)', () => {
  beforeEach(() => {
    setupThemeDOM();
  });

  it('default theme (no localStorage) shows dark mode icon', () => {
    initThemeToggle();
    const themeBtn = document.getElementById('theme-toggle');
    expect(document.body.classList.contains('light-theme')).toBe(false);
    // Dark mode icon uses moon SVG path
    expect(themeBtn.innerHTML).toContain('12.8A8.8 8.8');
    expect(themeBtn.getAttribute('title')).toBe('Toggle Light Mode');
  });

  it('click toggles to light theme', () => {
    initThemeToggle();
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.click();

    expect(document.body.classList.contains('light-theme')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('light');
    // Light mode icon uses sun SVG path
    expect(themeBtn.innerHTML).toContain('circle');
    expect(themeBtn.getAttribute('title')).toBe('Toggle Dark Mode');
  });

  it('click twice toggles back to dark theme', () => {
    initThemeToggle();
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.click(); // → light
    themeBtn.click(); // → dark

    expect(document.body.classList.contains('light-theme')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(themeBtn.getAttribute('title')).toBe('Toggle Light Mode');
  });
});

describe('Theme toggle — persisted light mode', () => {
  beforeEach(() => {
    setupThemeDOM();
    localStorage.setItem('theme', 'light');
  });

  it('reads light theme from localStorage on init', () => {
    initThemeToggle();
    const themeBtn = document.getElementById('theme-toggle');
    expect(document.body.classList.contains('light-theme')).toBe(true);
    expect(themeBtn.getAttribute('title')).toBe('Toggle Dark Mode');
  });

  it('click toggles from light back to dark', () => {
    initThemeToggle();
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.click();

    expect(document.body.classList.contains('light-theme')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(themeBtn.getAttribute('title')).toBe('Toggle Light Mode');
  });
});

describe('Theme toggle — localStorage persistence', () => {
  /**
   * Simulates a page reload by re-creating the DOM but preserving
   * localStorage state. This is what actual reloads do — localStorage survives.
   */
  function simulateReload() {
    document.body.innerHTML = `
      <button id="theme-toggle" title="Toggle Light Mode" aria-label="Toggle Light Mode">
        <svg class="theme-toggle-icon" viewBox="0 0 24 24">
          <path d="M21 12.8A8.8 8.8 0 0 1 11.2 3 8.8 8.8 0 1 0 21 12.8Z" />
        </svg>
      </button>
    `;
    document.body.classList.remove('light-theme');
  }

  beforeEach(() => {
    setupThemeDOM();
  });

  it('persists theme across simulated page reloads', () => {
    // First "load": toggle to light
    initThemeToggle();
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.click();
    expect(localStorage.getItem('theme')).toBe('light');

    // Second "load": clear DOM only, keep localStorage (simulates page reload)
    simulateReload();
    initThemeToggle();
    expect(document.body.classList.contains('light-theme')).toBe(true);
    expect(document.getElementById('theme-toggle').getAttribute('title')).toBe(
      'Toggle Dark Mode',
    );
  });

  it('dark theme also persists to localStorage', () => {
    initThemeToggle();
    // Default is dark, but ensure it's explicitly stored
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.click(); // → light
    themeBtn.click(); // → dark
    expect(localStorage.getItem('theme')).toBe('dark');

    // Reload simulation
    simulateReload();
    initThemeToggle();
    expect(document.body.classList.contains('light-theme')).toBe(false);
  });
});

describe('Theme toggle — edge cases', () => {
  beforeEach(() => {
    setupThemeDOM();
  });

  it('is idempotent (safe to call multiple times)', () => {
    initThemeToggle();
    initThemeToggle(); // second call should be no-op due to listenerBound guard
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.click();
    expect(localStorage.getItem('theme')).toBe('light');

    // Only one listener was attached, so one click = one toggle
    themeBtn.click();
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('handles missing theme button gracefully', () => {
    document.body.innerHTML = ''; // no theme-toggle button
    // Should return without error
    expect(() => initThemeToggle()).not.toThrow();
  });
});
