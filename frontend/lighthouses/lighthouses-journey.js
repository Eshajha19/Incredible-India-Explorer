// lighthouses-journey.js — wires "lighthouse-card" cards into the shared My Journey bookmark + search system
document.addEventListener('app:route-changed', () => {
  const cards = [...document.querySelectorAll(".lighthouse-card")];
  const bookmarkButtons = [...document.querySelectorAll('.journey-bookmark-btn')];

  function initJourneyIntegration() {
    if (!window.Journey) return;

    bookmarkButtons.forEach((btn) => {
      const card = btn.closest(".lighthouse-card");
      if (!card) return;
      const id = btn.dataset.bookmarkId;
      const title = card.querySelector('h2, h3, h4')?.textContent.trim() || 'Item';
      const thumbnail = card.querySelector('img')?.getAttribute('src') || '';
      const category = "lighthouses";

      const setPressed = () => {
        const saved = window.Journey.isSaved(id);
        btn.classList.toggle('is-saved', saved);
        btn.setAttribute('aria-pressed', String(saved));
        btn.textContent = saved ? '♥' : '♡';
      };
      setPressed();

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.Journey.toggle({
          id, explorerPage: 'lighthouses.html', title, thumbnail, category
        });
        setPressed();
      });
    });

    window.Journey.registerSearchItems('lighthouses.html', cards.map((card) => ({
      id: card.dataset.id,
      title: card.querySelector('h2, h3, h4')?.textContent.trim() || 'Item',
      description: card.querySelector('p')?.textContent.trim() || '',
      link: 'lighthouses.html'
    })));
  }

  initJourneyIntegration();
});
