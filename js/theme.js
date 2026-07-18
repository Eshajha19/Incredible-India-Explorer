window.IIE = window.IIE || {};
(function() {
  'use strict';

  function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

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

  window.IIE.Theme = {
    init: initThemeToggle
  };
})();
