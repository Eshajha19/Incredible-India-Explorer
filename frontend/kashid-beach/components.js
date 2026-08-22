/* ==========================================================================
   Kashid Components - Safe DOM rendering
   ========================================================================== */

function renderFeatureGrid(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    data.forEach(item => {
        const card = document.createElement('article');
        card.className = 'feature-card animate-on-scroll';

        const icon = document.createElement('div');
        icon.className = 'feature-icon';
        icon.textContent = item.icon;

        const h4 = document.createElement('h4');
        h4.textContent = item.title;

        const p = document.createElement('p');
        p.textContent = item.desc;

        card.appendChild(icon);
        card.appendChild(h4);
        card.appendChild(p);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    galleryData.forEach(img => {
        const item = document.createElement('div');
        item.className = 'gallery-item animate-on-scroll';
        item.tabIndex = 0;
        item.dataset.img = img.src;
        item.dataset.caption = img.caption;
        item.setAttribute('role', 'listitem');

        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.alt = img.alt;
        imgEl.loading = 'lazy';

        item.appendChild(imgEl);
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}
