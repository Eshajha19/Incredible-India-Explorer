const startupCategoryThemes = {
    tech: {
        label: 'Tech',
        accent: '#FF9933',
        soft: 'rgba(255, 153, 51, 0.18)'
    },
    fintech: {
        label: 'Fintech',
        accent: '#128807',
        soft: 'rgba(18, 136, 7, 0.18)'
    },
    edtech: {
        label: 'Edtech',
        accent: '#FFB01F',
        soft: 'rgba(255, 176, 31, 0.18)'
    }
};

const startupData = [
    {
        id: 'zerodha',
        name: 'Zerodha',
        category: 'fintech',
        logo: 'assets/images/startups/zerodha.png',
        logoAlt: 'Zerodha logo',
        founders: ['Nithin Kamath', 'Nikhil Kamath'],
        founded: 2010,
        city: 'Bengaluru',
        description: 'A lean discount brokerage that helped make retail investing more approachable, low-cost, and digital-first in India.',
        focus: 'Retail investing platform',
        unicorn: true
    },
    {
        id: 'flipkart',
        name: 'Flipkart',
        category: 'tech',
        logo: 'assets/images/startups/flipkart.png',
        logoAlt: 'Flipkart logo',
        founders: ['Sachin Bansal', 'Binny Bansal'],
        founded: 2007,
        city: 'Bengaluru',
        description: 'One of India’s original e-commerce giants, known for scaling online shopping, logistics, and product discovery at national scale.',
        focus: 'E-commerce marketplace',
        unicorn: true
    },
    {
        id: 'paytm',
        name: 'Paytm',
        category: 'fintech',
        logo: 'assets/images/startups/paytm.png',
        logoAlt: 'Paytm logo',
        founders: ['Vijay Shekhar Sharma'],
        founded: 2010,
        city: 'Noida',
        description: 'A consumer payments and financial services platform that helped normalize QR payments, wallets, and merchant acceptance.',
        focus: 'Digital payments',
        unicorn: true
    },
    {
        id: 'nykaa',
        name: 'Nykaa',
        category: 'tech',
        logo: 'assets/images/startups/nykaa.png',
        logoAlt: 'Nykaa logo',
        founders: ['Falguni Nayar'],
        founded: 2012,
        city: 'Mumbai',
        description: 'A beauty and lifestyle commerce platform that blended content, commerce, and premium discovery for modern shoppers.',
        focus: 'Beauty commerce',
        unicorn: true
    },
    {
        id: 'swiggy',
        name: 'Swiggy',
        category: 'tech',
        logo: 'assets/images/startups/swiggy.png',
        logoAlt: 'Swiggy logo',
        founders: ['Sriharsha Majety', 'Nandan Reddy', 'Rahul Jaimini'],
        founded: 2014,
        city: 'Bengaluru',
        description: 'An on-demand delivery and food commerce platform that turned convenience into a habit for millions of Indian households.',
        focus: 'Food delivery',
        unicorn: true
    },
    {
        id: 'zomato',
        name: 'Zomato',
        category: 'tech',
        logo: 'assets/images/startups/zomato.png',
        logoAlt: 'Zomato logo',
        founders: ['Deepinder Goyal', 'Pankaj Chaddah'],
        founded: 2008,
        city: 'Gurugram',
        description: 'A food discovery and delivery company that evolved from restaurant listings into a broader consumer internet brand.',
        focus: 'Food discovery',
        unicorn: true
    },
    {
        id: 'byjus',
        name: "Byju's",
        category: 'edtech',
        logo: 'assets/images/startups/byju-s.png',
        logoAlt: "Byju's logo",
        founders: ['Byju Raveendran'],
        founded: 2011,
        city: 'Bengaluru',
        description: 'A learning platform that popularized app-led education, test prep, and digital lessons for students across age groups.',
        focus: 'Learning platform',
        unicorn: true
    },
    {
        id: 'razorpay',
        name: 'Razorpay',
        category: 'fintech',
        logo: 'assets/images/startups/razorpay.png',
        logoAlt: 'Razorpay logo',
        founders: ['Harshil Mathur', 'Shashank Kumar'],
        founded: 2014,
        city: 'Bengaluru',
        description: 'A business payments stack used by startups and enterprises for checkout, payouts, subscriptions, and banking workflows.',
        focus: 'Payments infrastructure',
        unicorn: true
    },
    {
        id: 'phonepe',
        name: 'PhonePe',
        category: 'fintech',
        logo: 'assets/images/startups/phonepe.png',
        logoAlt: 'PhonePe logo',
        founders: ['Sameer Nigam', 'Rahul Chari', 'Burzin Engineer'],
        founded: 2015,
        city: 'Bengaluru',
        description: 'A UPI and financial services app that became a mainstream payment habit for consumers and merchants alike.',
        focus: 'UPI payments',
        unicorn: true
    },
    {
        id: 'meesho',
        name: 'Meesho',
        category: 'tech',
        logo: 'assets/images/startups/meesho.png',
        logoAlt: 'Meesho logo',
        founders: ['Vidit Aatrey', 'Sanjeev Barnwal'],
        founded: 2015,
        city: 'Bengaluru',
        description: 'A social commerce platform that helped small sellers and first-time buyers discover value-led online retail.',
        focus: 'Social commerce',
        unicorn: true
    }
];

const startupFounderProfiles = [
    {
        name: 'Nithin Kamath',
        startup: 'Zerodha',
        founderImage: 'assets/images/founders/nithin-kamath.png',
        founderImageAlt: 'Portrait photo of Nithin Kamath',
        detail: 'Focused on simplifying investing and keeping the brokerage model efficient, transparent, and low cost.'
    },
    {
        name: 'Falguni Nayar',
        startup: 'Nykaa',
        founderImage: 'assets/images/founders/falguni-nayar.png',
        founderImageAlt: 'Portrait photo of Falguni Nayar',
        detail: 'Built a category-defining consumer brand around beauty discovery, trust, and premium retail experiences.'
    },
    {
        name: 'Vijay Shekhar Sharma',
        startup: 'Paytm',
        founderImage: 'assets/images/founders/vijay-shekhar-sharma.png',
        founderImageAlt: 'Portrait photo of Vijay Shekhar Sharma',
        detail: 'Pushed digital payments into daily life with a product strategy built around scale and ease of use.'
    },
    {
        name: 'Sriharsha Majety',
        startup: 'Swiggy',
        founderImage: 'assets/images/founders/sriharsha-majety.png',
        founderImageAlt: 'Portrait photo of Sriharsha Majety',
        detail: 'Helped shape convenience-led commerce with fast delivery, logistics execution, and strong consumer trust.'
    },
    {
        name: 'Deepinder Goyal',
        startup: 'Zomato',
        founderImage: 'assets/images/founders/deepinder-goyal.png',
        founderImageAlt: 'Portrait photo of Deepinder Goyal',
        detail: 'Turned restaurant discovery into a consumer platform that later expanded into delivery and subscriptions.'
    },
    {
        name: 'Byju Raveendran',
        startup: "Byju's",
        founderImage: 'assets/images/founders/byju-revendran.png',
        founderImageAlt: 'Portrait photo of Byju Raveendran',
        detail: 'Brought a mobile-first learning style to the center of India’s edtech boom.'
    },
    {
        name: 'Harshil Mathur',
        startup: 'Razorpay',
        founderImage: 'assets/images/founders/harshil-mathur.png',
        founderImageAlt: 'Portrait photo of Harshil Mathur',
        detail: 'Focused on payments infrastructure that lets businesses move money with fewer operational headaches.'
    },
    {
        name: 'Sameer Nigam',
        startup: 'PhonePe',
        founderImage: 'assets/images/founders/sameer-nigam.png',
        founderImageAlt: 'Portrait photo of Sameer Nigam',
        detail: 'Built a large-scale payments habit around UPI, merchant acceptance, and financial services.'
    }
];

function initStartupPage() {
    const startupGrid = document.getElementById('startup-grid');
    const founderGrid = document.getElementById('startup-founder-grid');
    const searchInput = document.getElementById('startup-search-input');
    const clearBtn = document.getElementById('startup-clear-search');
    const filterBtns = document.querySelectorAll('.startup-filter-btn');
    const resultsText = document.getElementById('startup-results-text');
    const savedSummary = document.getElementById('startup-saved-summary');
    const savedList = document.getElementById('startup-favorites-list');
    const statVisible = document.getElementById('startup-stat-visible');
    const statUnicorn = document.getElementById('startup-stat-unicorn');
    const statYear = document.getElementById('startup-stat-year');
    const statSaved = document.getElementById('startup-stat-saved');
    const heroTotal = document.getElementById('startup-hero-total');
    const heroSectors = document.getElementById('startup-hero-sectors');
    const heroUnicorns = document.getElementById('startup-hero-unicorns');

    if (!startupGrid || !founderGrid || !searchInput) return;

    const favorites = new Set(loadFavorites());
    let currentCategory = 'all';
    let searchQuery = '';

    renderAll();
    registerStartupSearchIndex();

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-startup-category') || 'all';
            animateRender();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        animateRender();
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchQuery = '';
            animateRender();
        }
    });

    clearBtn?.addEventListener('click', () => {
        currentCategory = 'all';
        searchQuery = '';
        searchInput.value = '';
        filterBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-startup-category') === 'all'));
        animateRender();
        searchInput.focus();
    });

    function animateRender() {
        startupGrid.style.opacity = '0';
        startupGrid.style.transform = 'translateY(14px)';
        startupGrid.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

        setTimeout(() => {
            renderAll();
            startupGrid.style.opacity = '1';
            startupGrid.style.transform = 'translateY(0)';
        }, 180);
    }

    function renderAll() {
        const visibleStartups = getFilteredStartups();
        renderStats(visibleStartups);
        renderStartupCards(visibleStartups);
        renderFounderCards();
        renderSavedSummary(visibleStartups);
    }

    function getFilteredStartups() {
        return startupData.filter(item => {
            const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
            const searchableText = [
                item.name,
                item.category,
                item.city,
                item.focus,
                item.description,
                item.founders.join(' ')
            ].join(' ').toLowerCase();
            const matchesSearch = searchQuery === '' || searchableText.includes(searchQuery);
            return matchesCategory && matchesSearch;
        });
    }

    function renderStartupCards(items) {
        startupGrid.innerHTML = '';

        if (items.length === 0) {
            startupGrid.innerHTML = `
                <div class="startup-empty-state glass-card">
                    <h3>No startups match this view</h3>
                    <p>Try a different category or search term to explore another part of the Indian startup landscape.</p>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const theme = startupCategoryThemes[item.category];
            const card = document.createElement('article');
            card.className = 'startup-card glass-card';
            card.dataset.category = item.category;
            card.style.setProperty('--startup-accent', theme.accent);
            card.style.setProperty('--startup-accent-soft', theme.soft);

            const isFavorite = favorites.has(item.id);
            const foundersText = item.founders.join(', ');
            const initials = getStartupInitials(item.name);

            card.innerHTML = `
                <div class="startup-card-top">
                    <div class="startup-brand-badge" aria-label="${item.logoAlt || `${item.name} logo`}">
                        <img class="startup-brand-image" src="${item.logo || ''}" alt="${item.logoAlt || `${item.name} logo`}" loading="lazy">
                        <span class="startup-brand-fallback">${initials}</span>
                    </div>
                    <button class="startup-favorite-btn ${isFavorite ? 'is-favorite' : ''}" type="button"
                        aria-pressed="${isFavorite}" aria-label="${isFavorite ? 'Remove' : 'Add'} ${item.name} to favorites"
                        data-startup-id="${item.id}">
                        <span class="favorite-icon" aria-hidden="true">❤</span>
                    </button>
                </div>
                <div class="startup-card-body">
                    <div class="startup-card-badges">
                        <span class="startup-badge startup-badge-category">${theme.label}</span>
                        <span class="startup-badge startup-badge-unicorn">Unicorn</span>
                    </div>
                    <h3>${item.name}</h3>
                    <p class="startup-card-description">${item.description}</p>
                    <dl class="startup-meta-list">
                        <div>
                            <dt>Founders</dt>
                            <dd>${foundersText}</dd>
                        </div>
                        <div>
                            <dt>Founded</dt>
                            <dd>${item.founded}</dd>
                        </div>
                        <div>
                            <dt>City</dt>
                            <dd>${item.city}</dd>
                        </div>
                        <div>
                            <dt>Focus</dt>
                            <dd>${item.focus}</dd>
                        </div>
                    </dl>
                </div>
            `;

            card.querySelector('.startup-favorite-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
            });

            setupCompactBadge(
                card.querySelector('.startup-brand-image'),
                card.querySelector('.startup-brand-badge'),
                card.querySelector('.startup-brand-fallback'),
                { transparentOnly: true }
            );

            startupGrid.appendChild(card);
        });
    }

    function renderFounderCards() {
        founderGrid.innerHTML = '';

        startupFounderProfiles.forEach((founder, index) => {
            const profile = startupData.find(item => item.name === founder.startup) || startupData[index % startupData.length];
            const theme = startupCategoryThemes[profile.category];
            const card = document.createElement('article');
            card.className = 'founder-card glass-card';
            card.style.setProperty('--startup-accent', theme.accent);
            card.style.setProperty('--startup-accent-soft', theme.soft);
            const initials = getFounderInitials(founder.name);

            card.innerHTML = `
                <div class="founder-card-top">
                    <div class="founder-avatar-badge" aria-label="${founder.founderImageAlt || `Portrait photo of ${founder.name}`}">
                        <img class="founder-card-image" src="${founder.founderImage || ''}" alt="${founder.founderImageAlt || `Portrait photo of ${founder.name}`}" loading="lazy">
                        <span class="founder-image-fallback">${initials}</span>
                    </div>
                    <span class="founder-pill">${founder.startup}</span>
                </div>
                <div class="founder-card-body">
                    <h3>${founder.name}</h3>
                    <p>${founder.detail}</p>
                </div>
            `;
            setupCompactBadge(
                card.querySelector('.founder-card-image'),
                card.querySelector('.founder-avatar-badge'),
                card.querySelector('.founder-image-fallback'),
                { transparentOnly: false }
            );
            founderGrid.appendChild(card);
        });
    }

    function renderStats(items) {
        const unicornCount = items.filter(item => item.unicorn).length;
        const savedCount = items.filter(item => favorites.has(item.id)).length;
        const averageYear = items.length
            ? Math.round(items.reduce((sum, item) => sum + item.founded, 0) / items.length)
            : null;
        const sectorCount = new Set(items.map(item => item.category)).size;

        statVisible.textContent = items.length;
        statUnicorn.textContent = unicornCount;
        statYear.textContent = averageYear || '—';
        statSaved.textContent = savedCount;

        if (heroTotal) heroTotal.textContent = startupData.length;
        if (heroSectors) heroSectors.textContent = Object.keys(startupCategoryThemes).length;
        if (heroUnicorns) heroUnicorns.textContent = startupData.filter(item => item.unicorn).length;

        if (resultsText) {
            resultsText.textContent = items.length === 0
                ? 'No startups match the current view.'
                : `${items.length} startup${items.length === 1 ? '' : 's'} visible across ${sectorCount} ${sectorCount === 1 ? 'category' : 'categories'}.`;
        }
    }

    function renderSavedSummary(items) {
        const savedItems = items.filter(item => favorites.has(item.id));

        if (savedSummary) {
            savedSummary.textContent = savedItems.length
                ? `${savedItems.length} favorite${savedItems.length === 1 ? '' : 's'} in this view`
                : 'No saved startups in the current view.';
        }

        if (savedList) {
            savedList.innerHTML = savedItems.length
                ? savedItems.map(item => `<li><span class="saved-dot"></span>${item.name}</li>`).join('')
                : '<li class="saved-empty">Tap the heart icon on any card to save it here.</li>';
        }
    }

    function toggleFavorite(startupId) {
        if (favorites.has(startupId)) {
            favorites.delete(startupId);
            window.Journey?.removeFromJourney(`startup-${startupId}`);
        } else {
            favorites.add(startupId);
            const item = startupData.find((s) => s.id === startupId);
            window.Journey?.saveToJourney({
                id: `startup-${startupId}`,
                explorerPage: 'startup.html',
                title: item ? item.name : `Startup #${startupId}`,
                thumbnail: item ? (item.logo || '') : '',
                category: item ? (item.category || 'startup') : 'startup'
            });
        }

        renderAll();
    }

    function loadFavorites() {
        if (!window.Journey) return [];
        return window.Journey.getJourney()
            .filter((item) => item.explorerPage === 'startup.html')
            .map((item) => item.id.replace(/^startup-/, ''));
    }

    function registerStartupSearchIndex() {
        if (!window.Journey) return;
        window.Journey.registerSearchItems('startup.html', startupData.map((item) => ({
            id: `startup-${item.id}`,
            title: item.name,
            description: item.description || item.focus || '',
            link: 'startup.html'
        })));
    }

    function setupCompactBadge(imgEl, mediaEl, fallbackEl, options = {}) {
        if (!imgEl || !mediaEl || !fallbackEl) return;

        const { transparentOnly = false } = options;

        const setLoaded = async () => {
            if (transparentOnly) {
                const keep = await shouldKeepBrandImage(imgEl, { requireTransparency: true });
                if (!keep) {
                    mediaEl.classList.remove('image-loaded');
                    mediaEl.classList.add('image-error');
                    imgEl.style.display = 'none';
                    fallbackEl.style.display = 'flex';
                    return;
                }
            }
            mediaEl.classList.add('image-loaded');
            mediaEl.classList.remove('image-error');
            imgEl.style.display = 'block';
            fallbackEl.style.display = 'none';
        };

        const setError = () => {
            mediaEl.classList.remove('image-loaded');
            mediaEl.classList.add('image-error');
            imgEl.style.display = 'none';
            fallbackEl.style.display = 'flex';
        };

        if (imgEl.complete && imgEl.naturalWidth > 0) {
            setLoaded();
            return;
        }

        imgEl.addEventListener('load', setLoaded, { once: true });
        imgEl.addEventListener('error', setError, { once: true });
    }

    function shouldKeepBrandImage(imgEl, options = {}) {
        return new Promise((resolve) => {
            try {
                const { requireTransparency = false } = options;
                const canvas = document.createElement('canvas');
                const size = 24;
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                if (!ctx) {
                    resolve(true);
                    return;
                }

                const sourceWidth = imgEl.naturalWidth || 1;
                const sourceHeight = imgEl.naturalHeight || 1;
                const scale = Math.min(size / sourceWidth, size / sourceHeight);
                const drawWidth = sourceWidth * scale;
                const drawHeight = sourceHeight * scale;
                const offsetX = (size - drawWidth) / 2;
                const offsetY = (size - drawHeight) / 2;

                ctx.clearRect(0, 0, size, size);
                ctx.drawImage(imgEl, offsetX, offsetY, drawWidth, drawHeight);
                const data = ctx.getImageData(0, 0, size, size).data;

                let edgePixels = 0;
                let transparentEdges = 0;
                let opaqueEdges = 0;

                for (let y = 0; y < size; y++) {
                    for (let x = 0; x < size; x++) {
                        const isEdge = x < 2 || y < 2 || x >= size - 2 || y >= size - 2;
                        if (!isEdge) continue;
                        edgePixels += 1;
                        const idx = (y * size + x) * 4;
                        const a = data[idx + 3];

                        if (a < 250) {
                            transparentEdges += 1;
                        } else {
                            opaqueEdges += 1;
                        }
                    }
                }

                const transparentRatio = edgePixels ? transparentEdges / edgePixels : 0;

                if (requireTransparency) {
                    resolve(transparentRatio > 0.05);
                } else {
                    resolve(opaqueEdges > 0);
                }
            } catch (error) {
                resolve(true);
            }
        });
    }

    function getStartupInitials(name) {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .slice(0, 3)
            .toUpperCase();
    }

    function getFounderInitials(name) {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .slice(0, 2)
            .toUpperCase();
    }
}
