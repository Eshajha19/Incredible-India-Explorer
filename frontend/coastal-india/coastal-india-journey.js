// coastal-india-journey.js — wires "coastal-card" cards into the shared My Journey bookmark + search system
document.addEventListener('app:route-changed', () => {
  const cards = [...document.querySelectorAll(".coastal-card")];
  const bookmarkButtons = [...document.querySelectorAll('.journey-bookmark-btn')];

  function initJourneyIntegration() {
    if (!window.Journey) return;

    bookmarkButtons.forEach((btn) => {
      const card = btn.closest(".coastal-card");
      if (!card) return;
      const id = btn.dataset.bookmarkId;
      const title = card.querySelector('h2, h3, h4')?.textContent.trim() || 'Item';
      const thumbnail = card.querySelector('img')?.getAttribute('src') || '';
      const category = "coastal-india";

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
          id, explorerPage: 'coastal-india.html', title, thumbnail, category
        });
        setPressed();
      });
    });

    window.Journey.registerSearchItems('coastal-india.html', cards.map((card) => ({
      id: card.dataset.id,
      title: card.querySelector('h2, h3, h4')?.textContent.trim() || 'Item',
      description: card.querySelector('p')?.textContent.trim() || '',
      link: 'coastal-india.html'
    })));
  }

  initJourneyIntegration();
});
