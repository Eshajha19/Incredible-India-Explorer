/* ==========================================================================
   Ganpatipule Components
   Safe DOM rendering functions for all beach sections.
   ========================================================================== */

/**
 * Renders the heritage timeline.
 */
function renderHeritageTimeline() {
    const container = document.getElementById('heritage-timeline');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    heritageTimeline.forEach(event => {
        const item = document.createElement('div');
        item.className = 'timeline-item animate-on-scroll';

        const year = document.createElement('div');
        year.className = 'timeline-year';
        year.textContent = event.year;

        const title = document.createElement('div');
        title.className = 'timeline-title';
        title.textContent = event.title;

        const desc = document.createElement('div');
        desc.className = 'timeline-desc';
        desc.textContent = event.desc;

        item.appendChild(year);
        item.appendChild(title);
        item.appendChild(desc);
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}

/**
 * Renders a generic feature grid.
 */
function renderFeatureGrid(containerId, data, cardClass = 'heritage-card', iconClass = 'heritage-icon') {
    const container = document.getElementById(containerId);
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    data.forEach(item => {
        const card = document.createElement('article');
        card.className = `${cardClass} animate-on-scroll`;

        const icon = document.createElement('div');
        icon.className = iconClass;
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

/**
 * Renders the food list.
 */
function renderFoodList() {
    const container = document.getElementById('food-list');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    konkanFoods.forEach(food => {
        const item = document.createElement('div');
        item.className = 'food-item animate-on-scroll';

        const h5 = document.createElement('h5');
        h5.textContent = food.name;

        const p = document.createElement('p');
        p.textContent = food.desc;

        item.appendChild(h5);
        item.appendChild(p);
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}

/**
 * Renders the tradition list.
 */
function renderTraditionList() {
    const container = document.getElementById('tradition-list');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    culturalTraditions.forEach(tradition => {
        const item = document.createElement('div');
        item.className = 'tradition-item animate-on-scroll';

        const h5 = document.createElement('h5');
        h5.textContent = tradition.name;

        const p = document.createElement('p');
        p.textContent = tradition.desc;

        item.appendChild(h5);
        item.appendChild(p);
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}

/**
 * Renders the image gallery.
 */
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
