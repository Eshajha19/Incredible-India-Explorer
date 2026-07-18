window.IIE = window.IIE || {};
(function() {
  'use strict';

  function initPersonalitiesPage() {
    const filterButtons = document.querySelectorAll('[data-personality-filter]');
    const cards = document.querySelectorAll('.personality-card');

    if (!filterButtons.length || !cards.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-personality-filter') || 'historical';

        cards.forEach(card => {
          const category = card.getAttribute('data-category') || 'historical';
          if (filter === 'all' || category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  window.IIE.PersonalitiesPage = { init: initPersonalitiesPage };
})();
