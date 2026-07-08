/* ==========================================================================
   NEW PAGES - SHARED APPLICATION LOGIC
   Common to: rivers.html, currency-history.html, tribes.html
   Pure Vanilla JavaScript - no external dependencies.
   ========================================================================== */

document.addEventListener('app:route-changed', () => {
    initSiteChrome();

    const page = document.body.dataset.page;

    if (page === 'tribes') {
        initTribesPage();
    } else if (page === 'rivers') {
        // initRiversPage(); // added when rivers.html is built
    } else if (page === 'currency') {
        // initCurrencyPage(); // added when currency-history.html is built
    }
});

/* ==========================================================================
   0. SITE CHROME - Navbar, Mobile Menu, Theme Toggle, Scroll-To-Top
   (Re-implemented locally so these new pages don't depend on app.js)
   ========================================================================== */
function initSiteChrome() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const btnScrollTop = document.getElementById('btn-scroll-top');
    const themeBtn = document.getElementById('theme-toggle');

    // Sticky navbar shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
            btnScrollTop?.classList.add('visible');
        } else {
            btnScrollTop?.classList.remove('visible');
        }
    });

    // Mobile hamburger toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // Scroll to top
    if (btnScrollTop) {
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Theme toggle (dark/light) - persisted via localStorage, same key as main site
    if (themeBtn) {
        const setThemeIcon = (isLightTheme) => {
            themeBtn.innerHTML = isLightTheme ? '🌙' : '☀️';
            themeBtn.setAttribute('title', isLightTheme ? 'Toggle Dark Mode' : 'Toggle Light Mode');
        };

        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.body.classList.add('light-theme');
            setThemeIcon(true);
        } else {
            setThemeIcon(false);
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLightTheme = document.body.classList.contains('light-theme');
            setThemeIcon(isLightTheme);
            localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
        });
    }
}

/* ==========================================================================
   1. TRIBES & INDIGENOUS CULTURE PAGE
   ========================================================================== */

const REGION_LABELS = {
    north: 'North India',
    northeast: 'Northeast India',
    central: 'Central India',
    east: 'East India',
    west: 'West India',
    south: 'South India'
};

const REGIONS_DATA = [
    { key: 'north', name: 'North India', img: 'assets/North_India.png' },
    { key: 'northeast', name: 'Northeast India', img: 'assets/Northeast_India.png' },
    { key: 'central', name: 'Central India', img: 'assets/Central_India.png' },
    { key: 'east', name: 'East India', img: 'assets/East_India.png' },
    { key: 'west', name: 'West India', img: 'assets/West_India.png' },
    { key: 'south', name: 'South India', img: 'assets/South_India.png' }
];

const TRIBES_DATA = [
    {
        id: 'gond',
        name: 'Gond',
        region: 'central',
        image: 'assets/Gondtr.png',
        detailImage: 'assets/Gondtr.png',
        cardDesc: 'One of the largest tribal communities, known for their rich art, folklore and agricultural traditions.',
        states: ['Madhya Pradesh', 'Maharashtra', 'Chhattisgarh'],
        population: '13+ Million',
        language: 'Gondi',
        occupation: 'Agriculture, Forest Produce, Handicrafts',
        overview: 'The Gond community is one of the largest tribal groups in India. They are known for their deep connection with nature, rich oral traditions, unique art forms like Gond painting and their agricultural practices.',
        tabs: {
            traditions: { text: 'Gonds believe in harmony with nature and ancestors. Their traditions include clan systems, nature worship, folk songs, dances and storytelling passed down through generations.', list: ['Nature Worship', 'Clan System', 'Folk Songs & Dances', 'Storytelling Tradition'] },
            festivals: { text: 'The Gond calendar revolves around agricultural cycles and ancestor worship, celebrated with communal feasting, drumming and dance.', list: ['Madai Festival', 'Bij Pandum (Seed Festival)', 'Jawara Harvest Rites', 'Nagpanchami'] },
            attire: { text: 'Traditional Gond attire uses handwoven cotton with bold geometric borders, complemented by silver and bead jewellery.', list: ['Dhoti & Angocha for Men', 'Lugda Saree for Women', 'Silver Torque Necklaces', 'Bead & Coin Jewellery'] },
            art: { text: 'Gond painting, a UNESCO-recognised art form, uses dots and lines to depict flora, fauna and folk deities in vivid natural pigments.', list: ['Gond Painting', 'Wood Carving', 'Bamboo Craft', 'Terracotta Figurines'] },
            food: { text: 'The Gond diet is forest and farm based - millets, wild greens, mahua flowers and seasonal produce cooked with minimal spice.', list: ['Kodo-Kutki Millets', 'Mahua Flower Dishes', 'Bamboo Shoot Curry', 'Forest Greens (Bhaji)'] },
            beliefs: { text: 'Gonds follow an animistic faith centred on Bara Deo and clan deities, with sacred groves protected as living shrines.', list: ['Worship of Bara Deo', 'Sacred Groves (Dev Van)', 'Ancestor Veneration', 'Shamanic Healing Rites'] }
        }
    },
    {
        id: 'santhal',
        name: 'Santhal',
        region: 'east',
        image: 'assets/Santhaltr.png',
        detailImage: 'assets/Santhaltr.png',
        cardDesc: 'Known for vibrant festivals, music, dance and a strong sense of community and nature worship.',
        states: ['Jharkhand', 'West Bengal', 'Odisha'],
        population: '7+ Million',
        language: 'Santali',
        occupation: 'Agriculture, Forestry, Handicrafts',
        overview: 'The Santhal are one of the largest indigenous communities in India, celebrated for their music, dance and deep-rooted connection to sacred groves known as Jaher.',
        tabs: {
            traditions: { text: 'Santhal life is organised around village councils and seasonal rites, with music and dance central to nearly every gathering.', list: ['Village Council (Manjhi System)', 'Sacred Grove Worship', 'Community Dance Circles', 'Oral Epics'] },
            festivals: { text: 'Sohrai and Baha are the great Santhal festivals, honouring cattle and the flowering season respectively with song and dance.', list: ['Sohrai (Harvest Festival)', 'Baha (Flower Festival)', 'Karam Festival', 'Sendra Hunting Festival'] },
            attire: { text: 'Santhal women wear the distinctive Panchi saree with red borders, while men traditionally wear the dhoti with a turban.', list: ['Panchi Saree', 'Red-Bordered Cotton Weaves', 'Comb & Flower Hair Ornaments', 'Brass Jewellery'] },
            art: { text: 'Santhal art includes intricate wall murals for Sohrai and rhythmic folk instruments crafted from local wood and hide.', list: ['Sohrai Wall Painting', 'Tamak & Dhol Drums', 'Bamboo Flutes', 'Terracotta Craft'] },
            food: { text: 'Rice beer (Handia), forest greens and rice form the backbone of Santhal cuisine, often shared communally during festivals.', list: ['Handia (Rice Beer)', 'Rice with Forest Greens', 'Dried Fish Curry', 'Bamboo Shoot Dishes'] },
            beliefs: { text: 'Santhals worship Marang Buru, the mountain god, alongside a pantheon of nature spirits honoured in sacred Jaher groves.', list: ['Marang Buru Worship', 'Jaher Sacred Grove', 'Bonga Spirit Veneration', 'Shamanic Ojha Healers'] }
        }
    },
    {
        id: 'naga',
        name: 'Naga',
        region: 'northeast',
        image: 'assets/Nagatr.png',
        detailImage: 'assets/Nagatr.png',
        cardDesc: 'Fiercely proud tribes known for their warrior heritage, colourful attire and vibrant festivals.',
        states: ['Nagaland', 'Arunachal Pradesh', 'Manipur'],
        population: '7+ Million',
        language: 'Various Naga Languages (Ao, Angami, Konyak, etc.)',
        occupation: 'Terrace Farming, Weaving, Hunting',
        overview: 'The Naga comprise dozens of distinct tribes, each with its own dialect, attire and customs, united by a strong warrior heritage and vibrant community festivals like the Hornbill Festival.',
        tabs: {
            traditions: { text: 'Naga society is built around the morung (bachelor dormitory), where oral history, skills and community values are passed to the young.', list: ['Morung Dormitory System', 'Headhunting Legacy & Lore', 'Log Drum Ceremonies', 'Oral Storytelling'] },
            festivals: { text: 'The Hornbill Festival brings together every Naga tribe for a week of dance, music, sport and craft, showcasing shared heritage.', list: ['Hornbill Festival', 'Sekrenyi (Angami)', 'Aoling Festival (Konyak)', 'Moatsu Festival (Ao)'] },
            attire: { text: 'Naga warrior attire features feathered headgear, boar tusks and hand-woven shawls, each pattern denoting tribe and status.', list: ['Feathered Headgear', 'Woven Tribal Shawls', 'Boar Tusk Ornaments', 'Beaded Necklaces'] },
            art: { text: 'Naga craftsmanship spans wood carving, cane and bamboo work, and richly patterned handwoven textiles unique to each tribe.', list: ['Naga Shawl Weaving', 'Wood & Horn Carving', 'Cane & Bamboo Craft', 'Bead Work'] },
            food: { text: 'Smoked meats, fermented bamboo shoot and the fiery Raja Mircha chilli define the bold flavours of Naga cuisine.', list: ['Smoked Pork with Bamboo Shoot', 'Axone (Fermented Soybean)', 'Raja Mircha Chutney', 'Rice Beer (Zutho)'] },
            beliefs: { text: 'Traditional Naga belief centred on ancestor spirits and nature deities, though most communities today blend this with Christianity.', list: ['Ancestor Spirit Worship', 'Nature Deities', 'Christian Missionary Influence', 'Genna (Ritual Taboo Days)'] }
        }
    },
    {
        id: 'toda',
        name: 'Toda',
        region: 'south',
        image: 'assets/Todatr.png',
        detailImage: 'assets/Todatr.png',
        cardDesc: 'A pastoral tribe known for unique embroidery, dairy traditions and harmonious living.',
        states: ['Tamil Nadu (Nilgiris)'],
        population: '1,600+',
        language: 'Toda',
        occupation: 'Buffalo Herding, Dairy, Embroidery',
        overview: 'The Toda are a small pastoral community of the Nilgiri hills, renowned for their distinctive barrel-vaulted huts, sacred buffalo herds and intricate red-and-black embroidery.',
        tabs: {
            traditions: { text: 'Toda life revolves around their sacred buffalo herds and dairy temples, with rituals marking every stage of milk production.', list: ['Sacred Buffalo Herding', 'Dairy Temple Rituals', 'Barrel-Vaulted Hut Building', 'Communal Land Stewardship'] },
            festivals: { text: 'Toda festivals are tied to the dairy calendar and hut construction, marked with chants, offerings and communal feasting.', list: ['Poy (New Dairy Rituals)', 'Hut-Warming Ceremony', 'Funeral "Green Feast" Rites', 'Seasonal Buffalo Rituals'] },
            attire: { text: 'The iconic Toda shawl (Puthukuli) with red and black embroidery on white cotton is worn by both men and women.', list: ['Puthukuli Embroidered Shawl', 'Silver Jewellery', 'Traditional Hair Styling', 'Handwoven White Cotton'] },
            art: { text: 'Toda embroidery, done without a knot on either side of the cloth, is a GI-tagged craft admired for its precision.', list: ['Toda Embroidery (GI Tagged)', 'Barrel Hut Architecture', 'Cane Craft', 'Ceremonial Buffalo Horn Art'] },
            food: { text: 'A largely dairy-based diet of buffalo milk, ghee and grains reflects the community\'s deep pastoral roots.', list: ['Buffalo Milk & Ghee', 'Millet Porridge', 'Wild Honey', 'Seasonal Hill Produce'] },
            beliefs: { text: 'Toda spirituality centres on the sacred buffalo and dairy-temple priesthood, alongside reverence for Nilgiri deities.', list: ['Sacred Buffalo Worship', 'Dairy-Temple Priesthood', 'Nilgiri Nature Deities', 'Ancestral Land Reverence'] }
        }
    },
    {
        id: 'bhil',
        name: 'Bhil',
        region: 'west',
        image: 'assets/Bhiltr.png',
        detailImage: 'assets/Bhiltr.png',
        cardDesc: 'One of the oldest tribes, known for their archery skills, craftsmanship and nature reverence.',
        states: ['Rajasthan', 'Gujarat', 'Madhya Pradesh'],
        population: '16+ Million',
        language: 'Bhili',
        occupation: 'Agriculture, Archery, Handicrafts',
        overview: 'The Bhil are among India\'s oldest and largest tribal communities, historically famed as skilled archers and today celebrated for their vivid Pithora paintings and forest-based way of life.',
        tabs: {
            traditions: { text: 'Bhil traditions are steeped in archery skill, oral epics and forest wisdom passed through generations of clan elders.', list: ['Archery Heritage', 'Clan Elder Councils', 'Forest Foraging Knowledge', 'Oral Epics & Ballads'] },
            festivals: { text: 'The Bhagoria festival is the community\'s most vibrant celebration, blending harvest joy, music and traditional matchmaking fairs.', list: ['Bhagoria Festival', 'Holi Celebrations', 'Baneshwar Fair', 'Diwasa Festival'] },
            attire: { text: 'Bhil attire is bright and layered - vivid tie-dye skirts, turbans and heavy silver jewellery worn during festivals.', list: ['Tie-Dye (Bandhani) Skirts', 'Colourful Turbans', 'Silver Anklets & Necklaces', 'Bead Ornamentation'] },
            art: { text: 'Pithora painting, a ritual art form using natural pigments, is the Bhil\'s most celebrated contribution to Indian folk art.', list: ['Pithora Painting', 'Bamboo & Wood Craft', 'Bow & Arrow Making', 'Terracotta Figurines'] },
            food: { text: 'A simple, hearty diet of maize, millet rotis and forest produce sustains the community\'s agrarian and foraging lifestyle.', list: ['Maize Rotla (Flatbread)', 'Mahua Flower Dishes', 'Forest Tubers & Greens', 'Millet Porridge'] },
            beliefs: { text: 'Bhils worship nature spirits and ancestral deities, with sacred groves and hilltop shrines central to community faith.', list: ['Nature Spirit Worship', 'Sacred Grove Shrines', 'Ancestor Veneration', 'Folk Deity Baba Dev'] }
        }
    },
    {
        id: 'khasi',
        name: 'Khasi',
        region: 'northeast',
        image: 'assets/Khasitr.png',
        detailImage: 'assets/Khasitr.png',
        cardDesc: 'A matrilineal society famed for living root bridges and rich choral music traditions.',
        states: ['Meghalaya'],
        population: '1.4+ Million',
        language: 'Khasi',
        occupation: 'Agriculture, Horticulture, Trade',
        overview: 'The Khasi of Meghalaya follow one of the world\'s few surviving matrilineal systems, celebrated for their living root bridges, sacred forests and choral traditions.',
        tabs: {
            traditions: { text: 'Lineage and property pass through the youngest daughter in Khasi society, with clan councils guiding community life.', list: ['Matrilineal Inheritance', 'Clan Council (Durbar)', 'Living Root Bridge Building', 'Sacred Forest Stewardship'] },
            festivals: { text: 'Shad Suk Mynsiem, the "dance of peaceful hearts," is the Khasi\'s grandest festival, giving thanks for the harvest.', list: ['Shad Suk Mynsiem', 'Nongkrem Dance Festival', 'Behdeinkhlam Festival', 'Seng Kut Snem'] },
            attire: { text: 'Khasi women wear the elegant Jainsem, a layered ensemble often paired with silver crowns during festival dances.', list: ['Jainsem Ensemble', 'Silver Crown (Ki Khadu)', 'Coral Bead Necklaces', 'Handwoven Shawls'] },
            art: { text: 'Khasi craftsmanship includes bamboo and cane weaving alongside the extraordinary bio-engineering of root bridges.', list: ['Living Root Bridges', 'Bamboo & Cane Weaving', 'Bow Making', 'Choral Folk Music'] },
            food: { text: 'Khasi cuisine centres on rice and pork, flavoured with black sesame and local herbs unique to the Meghalaya hills.', list: ['Jadoh (Rice & Pork)', 'Tungrymbai (Fermented Soybean)', 'Black Sesame Chutney', 'Local Rice Beer'] },
            beliefs: { text: 'Traditional Khasi faith, Niam Khasi, reveres a supreme creator alongside nature spirits, though many today follow Christianity.', list: ['Niam Khasi Faith', 'Sacred Grove Worship', 'Ancestral Spirit Reverence', 'Christian Missionary Influence'] }
        }
    },
    {
        id: 'warli',
        name: 'Warli',
        region: 'west',
        image: 'assets/Warlitr.png',
        detailImage: 'assets/Warlitr.png',
        cardDesc: 'World-renowned for their minimalist white-on-mud mural art depicting everyday rural life.',
        states: ['Maharashtra', 'Gujarat', 'Dadra & Nagar Haveli'],
        population: '1.2+ Million',
        language: 'Warli, Marathi',
        occupation: 'Agriculture, Fishing, Art & Craft',
        overview: 'The Warli are best known worldwide for their distinctive geometric mural art, painted in white rice paste on mud walls, depicting harvests, weddings and daily rural life.',
        tabs: {
            traditions: { text: 'Warli life follows the agricultural calendar, with the sacred Tarpa dance performed in circles to celebrate harvests and unity.', list: ['Tarpa Circle Dance', 'Harvest Rituals', 'Community Wall Painting', 'Oral Folk Tales'] },
            festivals: { text: 'Warli weddings and harvest festivals are marked with fresh mural paintings, the Tarpa instrument and all-night dancing.', list: ['Lagna (Wedding) Rituals', 'Harvest Festival', 'Holi Celebrations', 'Tarpa Dance Nights'] },
            attire: { text: 'Simple cotton wraps and minimal jewellery reflect the Warli\'s understated, nature-close lifestyle.', list: ['Cotton Dhoti & Saree', 'Bead Necklaces', 'Brass Bangles', 'Minimalist Ornamentation'] },
            art: { text: 'Warli painting uses simple geometric shapes - circles, triangles and squares - to depict nature, deities and village life.', list: ['Warli Mural Painting', 'Tarpa Instrument Making', 'Bamboo Craft', 'Rice-Paste Wall Art'] },
            food: { text: 'A diet of rice, ragi and forest greens, supplemented with fish from local streams, defines Warli cuisine.', list: ['Ragi Bhakri (Flatbread)', 'Rice & Forest Greens', 'Freshwater Fish Curry', 'Wild Berries & Tubers'] },
            beliefs: { text: 'The Warli worship Palghat, the mother goddess, alongside spirits of the forest, sun and moon central to their painted stories.', list: ['Palghat Mother Goddess', 'Nature Spirit Worship', 'Sun & Moon Reverence', 'Ancestral Spirit Rites'] }
        }
    },
    {
        id: 'bhutia',
        name: 'Bhutia',
        region: 'north',
        image: 'assets/Bhutiatr.png',
        detailImage: 'assets/Bhutiatr.png',
        cardDesc: 'Himalayan highlanders known for Buddhist monastic traditions and vibrant thangka art.',
        states: ['Sikkim', 'North Bengal', 'Ladakh region'],
        population: '2+ Lakh',
        language: 'Sikkimese Bhutia, Tibetan',
        occupation: 'Yak Herding, Trade, Monastic Craft',
        overview: 'The Bhutia are Himalayan highlanders of Tibetan origin, whose life is deeply woven with Vajrayana Buddhism, monastery festivals and high-altitude herding traditions.',
        tabs: {
            traditions: { text: 'Monastery life, prayer wheels and seasonal transhumance with yak herds shape the rhythm of Bhutia mountain communities.', list: ['Monastery (Gompa) Life', 'Prayer Wheel Rituals', 'Yak Herding Migration', 'Lama-Led Ceremonies'] },
            festivals: { text: 'Losoong and the Cham mask dances mark the Bhutia New Year, filling monastery courtyards with colour and ritual.', list: ['Losoong (New Year)', 'Cham Mask Dance', 'Pang Lhabsol Festival', 'Saga Dawa'] },
            attire: { text: 'The Bakhu, a loose woollen robe tied at the waist, is the signature Bhutia garment suited to the cold Himalayan climate.', list: ['Bakhu Robe', 'Woollen Boots', 'Turquoise & Coral Jewellery', 'Silk Honggay Sash'] },
            art: { text: 'Thangka scroll painting and intricate wood carving decorate Bhutia monasteries with vivid Buddhist iconography.', list: ['Thangka Scroll Painting', 'Monastery Wood Carving', 'Prayer Flag Printing', 'Carpet Weaving'] },
            food: { text: 'Warming, hearty fare like thukpa noodle soup and momos sustain communities through the high-altitude winters.', list: ['Thukpa Noodle Soup', 'Momos', 'Butter Tea', 'Fermented Millet Drink (Chhaang)'] },
            beliefs: { text: 'Vajrayana Buddhism anchors Bhutia spiritual life, layered with reverence for mountain guardian spirits and local deities.', list: ['Vajrayana Buddhism', 'Mountain Guardian Spirits', 'Monastic Pilgrimage', 'Prayer Flag Offerings'] }
        }
    }
];

const TAB_ORDER = [
    { key: 'traditions', label: 'Traditions', icon: '<i class="fa-solid fa-feather" style="color: rgb(255, 208, 0);"></i>' },
    { key: 'festivals', label: 'Festivals', icon: '<i class="fa-solid fa-masks-theater" style="color: rgb(255, 208, 0);"></i>' },
    { key: 'attire', label: 'Attire', icon: '<i class="fa-solid fa-shirt" style="color: rgb(255, 208, 0);"></i>' },
    { key: 'art', label: 'Art & Craft', icon: '<i class="fa-solid fa-palette" style="color: rgb(255, 208, 0);"></i>' },
    { key: 'food', label: 'Food', icon: '<i class="fa-solid fa-bowl-food" style="color: rgb(255, 208, 0);"></i>' },
    { key: 'beliefs', label: 'Beliefs', icon: '<i class="fa-solid fa-place-of-worship" style="color: rgb(255, 208, 0);"></i>' }
];

const CAROUSEL_VISIBLE_COUNT = 5;

function initTribesPage() {
    const regionGrid = document.getElementById('tribes-region-grid');
    const cardsRow = document.getElementById('tribes-cards-row');
    const detailPanel = document.getElementById('tribes-detail-panel');
    const modalBackdrop = document.getElementById('tribes-modal-backdrop');
    const searchInput = document.getElementById('tribes-search-input');
    const regionSelect = document.getElementById('tribes-region-select');
    const sortSelect = document.getElementById('tribes-sort-select');
    const resetBtn = document.getElementById('tribes-reset-btn');
    const rowArrow = document.getElementById('tribes-row-arrow');

    if (!regionGrid || !cardsRow || !detailPanel) return;

    let currentList = [...TRIBES_DATA];
    let windowStart = 0;
    let activeTab = 'traditions';

    function renderRegions() {
        regionGrid.innerHTML = REGIONS_DATA.map(r => `
            <div class="tribes-region-card" data-region="${r.key}">
                <img src="${r.img}" alt="${r.name}">
            </div>
        `).join('');

        regionGrid.querySelectorAll('.tribes-region-card').forEach(card => {
            card.addEventListener('click', () => {
                const region = card.dataset.region;
                regionSelect.value = region;
                applyFilters();
                document.getElementById('tribes-cards-row').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function updateActiveRegionCard() {
        const current = regionSelect.value;
        regionGrid.querySelectorAll('.tribes-region-card').forEach(card => {
            card.classList.toggle('active', card.dataset.region === current);
        });
    }

    /* ---------- Render: Fixed 5-Card Carousel Window ---------- */
    function renderWindow(animateLast) {
        if (!currentList.length) {
            cardsRow.innerHTML = `<p style="color:var(--text-muted); font-family:var(--font-body); padding:20px; grid-column: 1 / -1;">No tribes match your filters. Try resetting them.</p>`;
            rowArrow?.classList.add('disabled');
            return;
        }

        const total = currentList.length;
        const count = Math.min(CAROUSEL_VISIBLE_COUNT, total);
        const items = [];
        for (let i = 0; i < count; i++) {
            items.push(currentList[(windowStart + i) % total]);
        }

        cardsRow.innerHTML = items.map((t, idx) => {
            const enter = animateLast && idx === count - 1 ? ' card-enter' : '';
            return `
            <div class="tribe-card${enter}" data-id="${t.id}">
                <div class="tribe-card-img-wrap">
                    <img src="${t.image}" alt="${t.name} tribe">
                    <button class="tribe-card-fav" data-fav="${t.id}" aria-label="Save ${t.name}">♡</button>
                </div>
                <div class="tribe-card-body">
                    <div class="tribe-card-title-row">
                        <h3>${t.name}</h3>
                    </div>
                    <p class="tribe-card-desc">${t.cardDesc}</p>
                    <div class="tribe-card-meta">
                        <div class="tribe-card-meta-row"><span class="meta-icon"><i class="fa-solid fa-earth-asia" style="color: rgb(255, 208, 0);"></i></span><span>${t.states.join(', ')}</span></div>
                        <div class="tribe-card-meta-row"><span class="meta-icon"><i class="fa-solid fa-user" style="color: rgb(255, 208, 0);"></i></span><span>Population: ${t.population}</span></div>
                    </div>
                    <button class="tribe-card-view-btn" data-view="${t.id}">View More ›</button>
                </div>
            </div>
        `;
        }).join('');

        if (total <= CAROUSEL_VISIBLE_COUNT) {
            rowArrow?.classList.add('disabled');
        } else {
            rowArrow?.classList.remove('disabled');
        }

        // Open detail popup when clicking anywhere on the card
        cardsRow.querySelectorAll('.tribe-card').forEach(card => {
            card.addEventListener('click', () => {
                openTribeDetail(card.dataset.id);
            });
        });

        // Favorite heart toggle (stop propagation so it doesn't open the popup)
        cardsRow.querySelectorAll('[data-fav]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                btn.classList.toggle('active');
                btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
            });
        });
    }

    /* ---------- Detail Popup ---------- */
    function openTribeDetail(tribeId) {
        const t = TRIBES_DATA.find(tr => tr.id === tribeId);
        if (!t) return;

        activeTab = 'traditions';

        const tabButtons = TAB_ORDER.map(tab => `
            <button class="tribes-tab-btn ${tab.key === activeTab ? 'active' : ''}" data-tab="${tab.key}">
                <span>${tab.icon}</span> ${tab.label}
            </button>
        `).join('');

        const tabPanels = TAB_ORDER.map(tab => {
            const data = t.tabs[tab.key];
            return `
                <div class="tribes-tab-panel ${tab.key === activeTab ? 'active' : ''}" data-panel="${tab.key}">
                    <p class="tribes-tab-text">${data.text}</p>
                    <ul class="tribes-tab-checklist">
                        ${data.list.map(item => `<li><span class="check-icon"><i class="fa-regular fa-circle-check" style="color: rgb(255, 208, 0);"></i></span>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }).join('');

        detailPanel.innerHTML = `
            <div class="tribes-detail-img-col">
                <img src="${t.detailImage}" alt="${t.name} tribe culture">
            </div>
            <div class="tribes-detail-content-col">
                <button class="tribes-detail-close" id="tribes-detail-close" aria-label="Close">✕</button>
                <div class="tribes-detail-title-row">
                    <h2>${t.name} Tribe</h2>
                </div>
                <p class="tribes-detail-desc">${t.overview}</p>
                <div class="tribes-detail-stats">
                    <div class="tribes-detail-stat">
                        <span class="stat-icon"><i class="fa-solid fa-location-dot"></i></span>
                        <div>
                            <div class="tribes-detail-stat-label">States</div>
                            <div class="tribes-detail-stat-value">${t.states.join(', ')}</div>
                        </div>
                    </div>
                    <div class="tribes-detail-stat">
                        <span class="stat-icon"><i class="fa-solid fa-comment"></i></span>
                        <div>
                            <div class="tribes-detail-stat-label">Language</div>
                            <div class="tribes-detail-stat-value">${t.language}</div>
                        </div>
                    </div>
                    <div class="tribes-detail-stat">
                        <span class="stat-icon"><i class="fa-solid fa-users"></i></span>
                        <div>
                            <div class="tribes-detail-stat-label">Population</div>
                            <div class="tribes-detail-stat-value">${t.population}</div>
                        </div>
                    </div>
                    <div class="tribes-detail-stat">
                        <span class="stat-icon"><i class="fa-solid fa-basket-shopping"></i></span>
                        <div>
                            <div class="tribes-detail-stat-label">Main Occupation</div>
                            <div class="tribes-detail-stat-value">${t.occupation}</div>
                        </div>
                    </div>
                </div>
                <div class="tribes-detail-tabs">${tabButtons}</div>
                ${tabPanels}
            </div>
        `;

        // Tab switching
        detailPanel.querySelectorAll('.tribes-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                activeTab = btn.dataset.tab;
                detailPanel.querySelectorAll('.tribes-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === activeTab));
                detailPanel.querySelectorAll('.tribes-tab-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === activeTab));
            });
        });

        document.getElementById('tribes-detail-close')?.addEventListener('click', closeTribeDetail);

        modalBackdrop.classList.add('open');
        detailPanel.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeTribeDetail() {
        modalBackdrop.classList.remove('open');
        detailPanel.classList.remove('open');
        document.body.style.overflow = '';
    }

    modalBackdrop?.addEventListener('click', closeTribeDetail);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeTribeDetail();
    });

    /* ---------- Filtering ---------- */
    function applyFilters() {
        const query = (searchInput?.value || '').trim().toLowerCase();
        const region = regionSelect?.value || 'all';
        let list = TRIBES_DATA.filter(t => {
            const matchesRegion = region === 'all' || t.region === region;
            const matchesQuery = !query ||
                t.name.toLowerCase().includes(query) ||
                t.states.join(' ').toLowerCase().includes(query) ||
                REGION_LABELS[t.region].toLowerCase().includes(query) ||
                Object.values(t.tabs).some(tab => tab.text.toLowerCase().includes(query) || tab.list.join(' ').toLowerCase().includes(query));
            return matchesRegion && matchesQuery;
        });

        currentList = sortList(list, sortSelect?.value || 'popular');
        windowStart = 0;
        renderWindow(false);
        updateActiveRegionCard();
    }

    function sortList(list, mode) {
        const copy = [...list];
        if (mode === 'az') {
            copy.sort((a, b) => a.name.localeCompare(b.name));
        } else if (mode === 'population') {
            const num = (s) => parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
            copy.sort((a, b) => num(b.population) - num(a.population));
        }
        return copy;
    }

    /* ---------- Events ---------- */
    searchInput?.addEventListener('input', applyFilters);
    regionSelect?.addEventListener('change', applyFilters);
    sortSelect?.addEventListener('change', applyFilters);

    resetBtn?.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (regionSelect) regionSelect.value = 'all';
        if (sortSelect) sortSelect.value = 'popular';
        applyFilters();
    });

    rowArrow?.addEventListener('click', () => {
        if (currentList.length <= CAROUSEL_VISIBLE_COUNT) return;
        windowStart = (windowStart + 1) % currentList.length;
        renderWindow(true);
    });

    /* ---------- Init ---------- */
    renderRegions();
    applyFilters();
}
