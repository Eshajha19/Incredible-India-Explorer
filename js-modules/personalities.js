function initPersonalitiesPage() {
    const tabs = document.querySelectorAll('.category-tab');
    const cards = document.querySelectorAll('.person-card');

    function filterCards(category) {
        cards.forEach(card => {
            if (card.getAttribute('data-category') === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterCards(tab.getAttribute('data-category'));
        });
    });

    // Show only Historical Legends by default on page load
    filterCards('historical');
}
