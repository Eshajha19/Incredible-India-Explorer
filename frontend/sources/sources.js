// sources.js

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('source-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.source-card');
    const noResults = document.getElementById('no-results');

    let currentFilter = 'all';
    let searchQuery = '';

    // Function to filter cards
    function filterCards() {
        let visibleCount = 0;
        
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('.card-body p').textContent.toLowerCase();
            
            // Check category match
            const matchesCategory = currentFilter === 'all' || currentFilter === cardCategory;
            
            // Check search match
            const matchesSearch = cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }

    // Search event listener
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterCards();
    });

    // Filter buttons event listener
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active states and aria-pressed attributes
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            
            const currentBtn = e.target;
            currentBtn.classList.add('active');
            currentBtn.setAttribute('aria-pressed', 'true');
            
            // Update filter value and process
            currentFilter = currentBtn.getAttribute('data-filter');
            filterCards();
        });
    });
});
