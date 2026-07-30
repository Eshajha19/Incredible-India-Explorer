// ============ Wular Lake Explorer — page script ============
// Standalone page script (no dependency on app.js/journey.js,
// since those are scoped to the main homepage).

document.addEventListener('DOMContentLoaded', () => {
  // Scroll progress bar
  const progressFill = document.getElementById('wl-progress-fill');
  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressFill) progressFill.style.width = `${pct}%`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth scroll for section-nav links
  document.querySelectorAll('.wl-toc a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});