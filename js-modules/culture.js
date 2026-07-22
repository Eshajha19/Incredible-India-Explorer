function initCulturePage() {
    const gridContainer = document.getElementById('culture-grid-container');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const modal = document.getElementById('culture-modal');
    const modalClose = document.getElementById('culture-modal-close');
    const mBadge = document.getElementById('culture-modal-badge');
    const mTitle = document.getElementById('culture-modal-title');
    const mImg = document.getElementById('culture-modal-img');
    const mDesc = document.getElementById('culture-modal-description');
const mState = document.getElementById('culture-modal-state');
    let currentCategory = 'all';

    render();

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');

            gridContainer.style.opacity = '0';
            gridContainer.style.transform = 'translateY(15px)';
            gridContainer.style.transition = 'opacity 0.25s, transform 0.25s';

            setTimeout(() => {
                render();
                gridContainer.style.opacity = '1';
                gridContainer.style.transform = 'translateY(0)';
            }, 200);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
        modal.classList.remove('open');
    }

    function render() {
        gridContainer.innerHTML = '';

        const filtered = currentCategory === 'all'
            ? cultureData
            : cultureData.filter(item => item.category === currentCategory);

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'culture-card-standalone glass-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="cuisine-card-body">
                    <span class="cuisine-origin">${item.category}</span>
                    <span class="culture-card-state">📍 ${item.state || 'All India'}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description.substring(0, 120)}...</p>
                </div>
            `;

            card.addEventListener('click', () => {
                mBadge.innerText = item.category;
                mBadge.className = `modal-badge ${item.category === 'dance' ? 'green-bg' : item.category === 'music' ? 'gold-bg' : 'saffron-bg'}`;
                mTitle.innerText = item.title;
                mState.innerText = `📍 ${item.state || 'All India'}`;
                mImg.src = item.image;
                mImg.alt = item.title;
                mDesc.innerText = item.description;

                modal.classList.add('open');
            });

            gridContainer.appendChild(card);
        });
    }
}
