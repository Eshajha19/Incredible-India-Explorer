/* ==========================================================================
   NATIONAL AWARDS EXPLORER — DATA & INTERACTION MODULE
   Recipient data, search, filter, modal, and My Journey integration.
   ========================================================================== */

(function () {

    /* ---- Award metadata ---- */
    const AWARD_INFO = {
        'bharat-ratna': {
            name: 'Bharat Ratna',
            category: 'civilian',
            description: "India's highest civilian honour, awarded for exceptional service / performance of the highest order in any field of human endeavour.",
            yearEst: '1954'
        },
        'padma-vibhushan': {
            name: 'Padma Vibhushan',
            category: 'civilian',
            description: 'The second-highest civilian honour, awarded for exceptional and distinguished service in any field.',
            yearEst: '1954'
        },
        'padma-bhushan': {
            name: 'Padma Bhushan',
            category: 'civilian',
            description: 'The third-highest civilian honour, awarded for distinguished service of a high order in any field.',
            yearEst: '1954'
        },
        'padma-shri': {
            name: 'Padma Shri',
            category: 'civilian',
            description: 'The fourth-highest civilian honour, awarded for distinguished service in any field.',
            yearEst: '1954'
        },
        'param-vir-chakra': {
            name: 'Param Vir Chakra',
            category: 'gallantry',
            description: "India's highest military decoration, awarded for the most conspicuous acts of gallantry in the presence of the enemy.",
            yearEst: '1950'
        },
        'ashoka-chakra': {
            name: 'Ashoka Chakra',
            category: 'gallantry',
            description: "India's highest peacetime gallantry award, awarded for the most conspicuous acts of gallantry, pre-eminent valour, or self-sacrifice.",
            yearEst: '1952'
        },
        'maha-vir-chakra': {
            name: 'Maha Vir Chakra',
            category: 'gallantry',
            description: 'The second-highest military decoration, awarded for acts of gallantry in the presence of the enemy.',
            yearEst: '1950'
        },
        'kirti-chakra': {
            name: 'Kirti Chakra',
            category: 'gallantry',
            description: 'The second-highest peacetime gallantry award, awarded for conspicuous gallantry, self-sacrifice, or valour.',
            yearEst: '1952'
        },
        'shaurya-chakra': {
            name: 'Shaurya Chakra',
            category: 'gallantry',
            description: 'A peacetime gallantry award, awarded for gallantry not in the face of the enemy.',
            yearEst: '1952'
        }
    };

    /* ---- Recipient data ---- */
    const awardsData = [
        // =============== BHARAT RATNA ===============
        { id: 'br-gandhi', awardKey: 'bharat-ratna', name: 'Mahatma Gandhi', year: 1948, image: 'assets/Mahatma.png', description: 'Known as the Father of the Nation, Mohandas Karamchand Gandhi led India to independence through nonviolent civil disobedience. His philosophy of Satyagraha inspired civil rights movements across the globe.', highlights: ['Freedom Movement', 'Nonviolence', 'Civil Rights'] },
        { id: 'br-nehru', awardKey: 'bharat-ratna', name: 'Jawaharlal Nehru', year: 1955, image: 'assets/Mahatma.png', description: "India's first Prime Minister and a visionary architect of modern India. Nehru championed democracy, secularism, scientific temper, and non-alignment on the world stage.", highlights: ['First Prime Minister', 'Panchsheel', 'Modernization'] },
        { id: 'br-tagore', awardKey: 'bharat-ratna', name: 'Rabindranath Tagore', year: 1961, image: 'assets/literature/authors/Rabindranath%20Tagore.png', description: "A towering figure in Bengali literature and the first non-European Nobel laureate in Literature. Tagore composed India's national anthem and reshaped Indian poetry, music, and art.", highlights: ['Nobel Laureate', 'National Anthem', 'Bengal Renaissance'] },
        { id: 'br-ambedkar', awardKey: 'bharat-ratna', name: 'B. R. Ambedkar', year: 1990, image: 'assets/Abdul_kalam.png', description: 'Chief architect of the Indian Constitution, jurist, economist, and social reformer who fought against caste discrimination and championed the rights of the marginalized.', highlights: ['Constitution Architect', 'Social Justice', 'Dalit Rights'] },
        { id: 'br-teresa', awardKey: 'bharat-ratna', name: 'Mother Teresa', year: 1980, image: 'assets/Mahatma.png', description: 'A Catholic nun who devoted her life to serving the poorest of the poor in Kolkata. Founded the Missionaries of Charity and received the Nobel Peace Prize in 1979.', highlights: ['Missionaries of Charity', 'Nobel Peace Prize', 'Humanitarian Work'] },
        { id: 'br-kalam', awardKey: 'bharat-ratna', name: 'A. P. J. Abdul Kalam', year: 1997, image: 'assets/Abdul_kalam.png', description: "A visionary scientist and the 11th President of India. Known as the Missile Man of India, he inspired millions through his work in defence technology and youth outreach.", highlights: ['Missile Man', 'DRDO & ISRO', "People's President"] },

        // =============== PADMA VIBHUSHAN ===============
        { id: 'pv-sachin', awardKey: 'padma-vibhushan', name: 'Sachin Tendulkar', year: 2014, image: 'assets/Sachin.png', description: 'Arguably the greatest cricketer of all time, Sachin Tendulkar held numerous world records across formats. His humility and dedication made him a national icon.', highlights: ['International Cricket', 'World Records', 'National Icon'] },
        { id: 'pv-dhoni', awardKey: 'padma-vibhushan', name: 'M. S. Dhoni', year: 2018, image: 'assets/Sachin.png', description: "One of cricket's most successful captains, Dhoni led India to victories in the 2007 T20 World Cup, 2011 ODI World Cup, and 2013 Champions Trophy.", highlights: ['World Cup Winning Captain', 'Finisher', 'Leadership'] },
        { id: 'pv-amitabh', awardKey: 'padma-vibhushan', name: 'Amitabh Bachchan', year: 2015, image: 'assets/culture_default.png', description: 'The legendary actor whose baritone voice and commanding screen presence redefined Indian cinema across five decades. Also a television host and philanthropist.', highlights: ['Bollywood Legend', 'Versatile Actor', 'Philanthropist'] },
        { id: 'pv-lata', awardKey: 'padma-vibhushan', name: 'Lata Mangeshkar', year: 1999, image: 'assets/literature/authors/Rabindranath%20Tagore.png', description: 'The Nightingale of India whose ethereal voice graced over 30,000 songs in multiple languages across seven decades.', highlights: ['Playback Legend', '30,000+ Songs', 'National Treasure'] },
        { id: 'pv-raman', awardKey: 'padma-vibhushan', name: 'C. V. Raman', year: 1954, image: 'assets/science/cv-raman.png', description: 'Nobel Prize-winning physicist who discovered the Raman Effect. His work placed Indian science on the global stage.', highlights: ['Nobel Prize Physics', 'Raman Effect', 'Indian Science Pioneer'] },
        { id: 'pv-sarabhai', awardKey: 'padma-vibhushan', name: 'Vikram Sarabhai', year: 1966, image: 'assets/science/vikram-sarabhai.png', description: 'The father of the Indian space program. Founded ISRO and established India as a spacefaring nation with a focus on applied technology for national development.', highlights: ['ISRO Founder', 'Space Pioneer', 'Institution Builder'] },

        // =============== PADMA BHUSHAN ===============
        { id: 'pb-rk-narayan', awardKey: 'padma-bhushan', name: 'R. K. Narayan', year: 2000, image: 'assets/literature/authors/R.%20K.%20Narayan.png', description: "One of India's greatest English-language writers, known for his fictional town of Malgudi and gentle, insightful storytelling about everyday Indian life.", highlights: ['Malgudi Days', 'Indian English Literature', 'Sahitya Akademi Fellow'] },
        { id: 'pb-pritam', awardKey: 'padma-bhushan', name: 'Amrita Pritam', year: 2005, image: 'assets/culture_default.png', description: 'A pioneering Punjabi poet and novelist whose work explored love, Partition, and womanhood with profound emotional depth.', highlights: ['Punjabi Literature', 'Partition Poetry', 'Sahitya Akademi Award'] },
        { id: 'pb-narayana-murthy', awardKey: 'padma-bhushan', name: 'N. R. Narayana Murthy', year: 2008, image: 'assets/Narayan.png', description: 'Co-founder of Infosys, a visionary IT entrepreneur whose values-driven leadership helped establish India as a global technology hub.', highlights: ['Infosys Co-founder', 'IT Revolution', 'Philanthropy'] },
        { id: 'pb-vishwanathan-anand', awardKey: 'padma-bhushan', name: 'Viswanathan Anand', year: 2001, image: 'assets/Sachin.png', description: "India's first chess Grandmaster and five-time World Chess Champion. Anand put Indian chess on the global map with his tactical brilliance.", highlights: ['World Chess Champion', 'GM Title', 'Chess Legend'] },

        // =============== PADMA SHRI ===============
        { id: 'ps-sundar-pichai', awardKey: 'padma-shri', name: 'Sundar Pichai', year: 2022, image: 'assets/Narayan.png', description: "CEO of Google and Alphabet, whose modest beginnings in Chennai led to leading one of the world's most influential technology companies.", highlights: ['Google CEO', 'Technology Leader', 'Global Indian'] },
        { id: 'ps-swaminathan', awardKey: 'padma-shri', name: 'M. S. Swaminathan', year: 1967, image: 'assets/science/ms-swaminathan.png', description: "Agricultural scientist who led India's Green Revolution, transforming the nation from food scarcity to self-sufficiency.", highlights: ['Green Revolution', 'Food Security', 'Agricultural Science'] },
        { id: 'ps-sudha-murty', awardKey: 'padma-shri', name: 'Sudha Murty', year: 2006, image: 'assets/culture_default.png', description: 'A respected author, philanthropist, and chairperson of the Infosys Foundation. Known for her simple storytelling and extensive social work.', highlights: ['Philanthropy', 'Author', 'Social Work'] },
        { id: 'ps-mary-kom', awardKey: 'padma-shri', name: 'Mary Kom', year: 2014, image: 'assets/Sachin.png', description: "A legendary boxer and six-time World Champion. Mary Kom overcame enormous odds to become one of India's most decorated sportswomen.", highlights: ['Six-time World Champion', 'Olympic Medallist', 'Women in Sports'] },

        // =============== PARAM VIR CHAKRA ===============
        { id: 'pvc-somnath', awardKey: 'param-vir-chakra', name: 'Major Somnath Sharma', year: 1947, image: 'assets/Mahatma.png', description: 'Awarded the first Param Vir Chakra posthumously for his gallantry during the Indo-Pakistani War of 1947. He fought till his last breath defending Srinagar.', highlights: ['1947 War', 'First PVC Recipient', 'Supreme Sacrifice'] },
        { id: 'pvc-batra', awardKey: 'param-vir-chakra', name: 'Captain Vikram Batra', year: 1999, image: 'assets/Abdul_kalam.png', description: 'Known for his iconic words "Yeh Dil Mange More!", Captain Batra displayed extraordinary bravery during the Kargil War, capturing Point 4875.', highlights: ['Kargil War', 'Point 4875', 'Battle Cry'] },
        { id: 'pvc-pandey', awardKey: 'param-vir-chakra', name: 'Lt. Manoj Pandey', year: 1999, image: 'assets/Mahatma.png', description: 'Awarded posthumously for his courage during the Kargil War. He single-handedly neutralized multiple enemy positions before making the supreme sacrifice.', highlights: ['Kargil Hero', 'Single-handed Assault', 'Supreme Sacrifice'] },
        { id: 'pvc-sekhon', awardKey: 'param-vir-chakra', name: 'Nirmal Jit Singh Sekhon', year: 1971, image: 'assets/Abdul_kalam.png', description: 'The only Indian Air Force officer to receive the Param Vir Chakra, for his gallantry during the 1971 Indo-Pakistani War.', highlights: ['IAF Gallantry', '1971 War', 'Aerial Combat'] },

        // =============== ASHOKA CHAKRA ===============
        { id: 'ac-neerja', awardKey: 'ashoka-chakra', name: 'Neerja Bhanot', year: 1987, image: 'assets/culture_default.png', description: 'A flight attendant who sacrificed her life saving passengers from terrorists on Pan Am Flight 73. She was the youngest Ashoka Chakra awardee.', highlights: ['Pan Am Flight 73', 'Bravery', 'Youngest Awardee'] },
        { id: 'ac-walve', awardKey: 'ashoka-chakra', name: 'Major Sudhir Walve', year: 2020, image: 'assets/Abdul_kalam.png', description: 'Awarded posthumously for his gallantry during an anti-terrorist operation in Jammu and Kashmir. Displayed exceptional leadership and valour.', highlights: ['Counter-terrorism', 'Leadership', 'J&K Operations'] },
        { id: 'ac-krishnan', awardKey: 'ashoka-chakra', name: 'Capt. Radha Krishnan', year: 1952, image: 'assets/Mahatma.png', description: 'One of the earliest recipients of the Ashoka Chakra for outstanding gallantry during a peacekeeping operation.', highlights: ['Peacekeeping', 'Early Recipient', 'Gallantry'] },

        // =============== MAHA VIR CHAKRA ===============
        { id: 'mvc-manekshaw', awardKey: 'maha-vir-chakra', name: 'Field Marshal Sam Manekshaw', year: 1971, image: 'assets/Abdul_kalam.png', description: "India's first Field Marshal, who led the Indian Army to victory in the 1971 war. Known for his sharp wit and exceptional military leadership.", highlights: ['1971 War', 'First Field Marshal', 'Military Strategy'] },
        { id: 'mvc-singh', awardKey: 'maha-vir-chakra', name: 'General Arvind Singh', year: 1999, image: 'assets/Mahatma.png', description: 'Awarded for his distinguished leadership and gallantry during Operation Vijay in Kargil.', highlights: ['Kargil Leadership', 'Operation Vijay', 'Army Commander'] },
        { id: 'mvc-ahuja', awardKey: 'maha-vir-chakra', name: 'Group Capt. Ajay Ahuja', year: 1999, image: 'assets/Abdul_kalam.png', description: 'A brave IAF pilot who displayed exceptional courage during the Kargil War before being captured and martyred.', highlights: ['IAF Kargil', 'Pilot Valour', 'Supreme Sacrifice'] },

        // =============== KIRTI CHAKRA ===============
        { id: 'kc-joshi', awardKey: 'kirti-chakra', name: 'Capt. Jayant Joshi', year: 2020, image: 'assets/culture_default.png', description: 'Awarded for displaying conspicuous gallantry and valour during counter-insurgency operations in Jammu and Kashmir.', highlights: ['Counter-insurgency', 'Valour', 'J&K Operations'] },
        { id: 'kc-rai', awardKey: 'kirti-chakra', name: 'Naik Pradeep Rai', year: 2019, image: 'assets/Mahatma.png', description: 'Awarded for his extraordinary courage and sacrifice during an anti-terrorist operation in the northern sector.', highlights: ['Anti-terror Op', 'Bravery', 'Sacrifice'] },

        // =============== SHAURYA CHAKRA ===============
        { id: 'sc-basu', awardKey: 'shaurya-chakra', name: 'Sepoy Mahesh Basu', year: 2021, image: 'assets/culture_default.png', description: 'Awarded for gallantry displayed during a counter-terrorist operation in the Kashmir Valley.', highlights: ['Counter-terror', 'Kashmir Valley', 'Gallantry'] },
        { id: 'sc-kumar', awardKey: 'shaurya-chakra', name: 'Havildar Ram Kumar', year: 2020, image: 'assets/Mahatma.png', description: 'Displayed conspicuous courage and selfless devotion to duty during an anti-militancy operation.', highlights: ['Anti-militancy', 'Courage', 'Devotion to Duty'] }
    ];

    /* ---- DOM references ---- */
    let searchInput, catFilterBtns, awardFilterBtns, cards, status, emptyState, grid;
    let modal, modalClose, modalImg, modalBadge, modalTitle, modalSubtitle, modalAward, modalYear, modalDesc, modalHighlights, modalAwardDesc;
    let menuToggle;

    let activeCategory = 'all';
    let activeAward = 'all';
    let lastFocusedElement = null;

    /* ---- Image fallback helper ---- */
    function getFallbackImage() {
        return 'assets/culture_default.png';
    }

    /* ---- Build card HTML ---- */
    function createCardHTML(item) {
        const awardInfo = AWARD_INFO[item.awardKey];
        const catClass = awardInfo.category;
        const awardLabel = awardInfo.name;

        return '<article class="awards-card ' + catClass + '" data-id="' + item.id + '" data-category="' + catClass + '" data-award="' + item.awardKey + '" data-search="' + item.name.toLowerCase() + ' ' + awardLabel.toLowerCase() + ' ' + item.year + ' ' + item.description.toLowerCase() + ' ' + item.highlights.join(' ').toLowerCase() + '">' +
            '<div class="awards-card-media">' +
            '<img src="' + (item.image || getFallbackImage()) + '" alt="' + item.name + '" loading="lazy">' +
            '<span class="awards-card-badge ' + catClass + '">' + awardLabel + '</span>' +
            '<button class="journey-bookmark-btn" type="button" data-bookmark-id="award-' + item.id + '" aria-pressed="false" aria-label="Save ' + item.name + ' to My Journey">♡</button>' +
            '</div>' +
            '<div class="awards-card-body">' +
            '<span class="awards-card-award-name">' + awardLabel + '</span>' +
            '<h3>' + item.name + '</h3>' +
            '<p class="awards-card-year">' + item.year + '</p>' +
            '<p class="awards-card-description">' + item.description + '</p>' +
            '<div class="awards-card-footer">' +
            '<button class="awards-card-btn" type="button" data-details-id="' + item.id + '">View Details</button>' +
            '</div>' +
            '</div>' +
            '</article>';
    }

    /* ---- Get item by ID ---- */
    function getItemById(id) {
        return awardsData.find(function (item) {
            return item.id === id;
        });
    }

    /* ---- Render all cards ---- */
    function renderCards() {
        grid.innerHTML = awardsData.map(createCardHTML).join('');
        cards = [...document.querySelectorAll('.awards-card')];
        bindBookmarkButtons();
        bindDetailButtons();
        applyFilters();
    }

    /* ---- Filter logic ---- */
    function applyFilters() {
        var searchTerm = searchInput.value.trim().toLowerCase();
        var visibleCount = 0;

        cards.forEach(function (card) {
            var searchText = (card.dataset.search || '').toLowerCase();
            var category = card.dataset.category;
            var award = card.dataset.award;

            var matchesSearch = !searchTerm || searchText.indexOf(searchTerm) !== -1;
            var matchesCategory = activeCategory === 'all' || category === activeCategory;
            var matchesAward = activeAward === 'all' || award === activeAward;

            var visible = matchesSearch && matchesCategory && matchesAward;
            card.hidden = !visible;
            if (visible) visibleCount++;
        });

        var filtersApplied = searchTerm || activeCategory !== 'all' || activeAward !== 'all';
        status.textContent = filtersApplied
            ? 'Found ' + visibleCount + ' recipient' + (visibleCount === 1 ? '' : 's')
            : 'Showing all ' + visibleCount + ' recipients';

        emptyState.classList.toggle('visible', visibleCount === 0);
    }

    /* ---- Category filter buttons ---- */
    function initCategoryFilters() {
        catFilterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                activeCategory = btn.dataset.category;
                activeAward = 'all';
                updateAwardFilterButtons();
                catFilterBtns.forEach(function (b) {
                    var active = b === btn;
                    b.classList.toggle('active', active);
                    b.setAttribute('aria-pressed', active);
                });
                applyFilters();
            });
        });
    }

    /* ---- Award type filter buttons ---- */
    function initAwardFilters() {
        awardFilterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var awardVal = btn.dataset.award;
                if (activeAward === awardVal && awardVal === 'all') return;

                activeAward = awardVal;

                if (awardVal !== 'all') {
                    var awardCat = AWARD_INFO[awardVal] ? AWARD_INFO[awardVal].category : null;
                    if (awardCat) {
                        activeCategory = awardCat;
                        catFilterBtns.forEach(function (b) {
                            var active = b.dataset.category === awardCat;
                            b.classList.toggle('active', active);
                            b.setAttribute('aria-pressed', active);
                        });
                    }
                }

                updateAwardFilterButtons();
                applyFilters();
            });
        });
    }

    function updateAwardFilterButtons() {
        awardFilterBtns.forEach(function (btn) {
            var awardVal = btn.dataset.award;
            var visible = awardVal === 'all';

            if (awardVal !== 'all' && activeCategory !== 'all') {
                var info = AWARD_INFO[awardVal];
                if (info && info.category === activeCategory) {
                    visible = true;
                }
            } else if (awardVal !== 'all') {
                visible = true;
            }

            btn.hidden = !visible;
            var active = awardVal === activeAward;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active);
        });
    }

    /* ---- Bookmark / My Journey integration ---- */
    function bindBookmarkButtons() {
        var bookmarkBtns = [...document.querySelectorAll('.awards-card .journey-bookmark-btn')];
        if (!window.Journey) return;

        bookmarkBtns.forEach(function (btn) {
            var card = btn.closest('.awards-card');
            var id = btn.dataset.bookmarkId;
            var title = card ? card.querySelector('h3').textContent.trim() : 'Recipient';
            var img = card ? card.querySelector('img').getAttribute('src') : '';
            var cat = card ? (card.dataset.category || 'award') : 'award';

            function setPressed() {
                var saved = window.Journey.isSaved(id);
                btn.classList.toggle('is-saved', saved);
                btn.setAttribute('aria-pressed', String(saved));
                btn.textContent = saved ? '\u2665' : '\u2661';
            }

            setPressed();

            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                window.Journey.toggle({
                    id: id,
                    explorerPage: 'national-awards.html',
                    title: title,
                    thumbnail: img,
                    category: cat
                });
                setPressed();
            });
        });
    }

    /* ---- Detail modal logic ---- */
    function bindDetailButtons() {
        var detailBtns = [...document.querySelectorAll('.awards-card-btn[data-details-id]')];
        detailBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var id = btn.dataset.detailsId;
                var item = getItemById(id);
                if (item) openModal(item, btn);
            });
        });
    }

    function openModal(item, trigger) {
        lastFocusedElement = trigger || document.activeElement;

        var awardInfo = AWARD_INFO[item.awardKey];
        var catClass = awardInfo.category;

        modalBadge.className = 'awards-modal-badge ' + catClass;
        modalBadge.textContent = catClass === 'civilian' ? 'Civilian Honour' : 'Gallantry Award';

        modalImg.src = item.image || getFallbackImage();
        modalImg.alt = item.name;
        modalTitle.textContent = item.name;
        modalSubtitle.textContent = item.description;
        modalAward.textContent = awardInfo.name;
        modalYear.textContent = item.year;
        modalDesc.textContent = item.description;
        modalAwardDesc.textContent = awardInfo.description;

        modalHighlights.innerHTML = item.highlights.map(function (h) {
            return '<li>' + h + '</li>';
        }).join('');

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    /* ==========================================================================
       INIT — called on page load via app:route-changed or direct script execution
       ========================================================================== */
    function initNationalAwardsPage() {
        // Grab DOM refs
        searchInput = document.getElementById('awards-search');
        catFilterBtns = [...document.querySelectorAll('.awards-cat-filter')];
        awardFilterBtns = [...document.querySelectorAll('.awards-type-filter')];
        status = document.getElementById('awards-status');
        emptyState = document.getElementById('awards-empty');
        grid = document.getElementById('awards-grid');
        menuToggle = document.getElementById('menu-toggle');

        modal = document.getElementById('awards-modal');
        modalClose = document.getElementById('awards-modal-close');
        modalImg = document.getElementById('awards-modal-img');
        modalBadge = document.getElementById('awards-modal-badge');
        modalTitle = document.getElementById('awards-modal-title');
        modalSubtitle = document.getElementById('awards-modal-subtitle');
        modalAward = document.getElementById('awards-modal-award');
        modalYear = document.getElementById('awards-modal-year');
        modalDesc = document.getElementById('awards-modal-description');
        modalHighlights = document.getElementById('awards-modal-highlights');
        modalAwardDesc = document.getElementById('awards-modal-award-desc');

        if (!grid) return; // not on awards page

        // Render
        renderCards();
        initCategoryFilters();
        initAwardFilters();

        // Search listener
        searchInput.addEventListener('input', applyFilters);

        // Modal listeners
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('open')) {
                closeModal();
            }
        });

        // Menu toggle for mobile
        if (menuToggle) {
            menuToggle.addEventListener('click', function () {
                var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !expanded);
            });
        }

        // My Journey integration for search
        if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
            window.Journey.registerSearchItems(
                'national-awards.html',
                awardsData.map(function (item) {
                    return {
                        id: 'award-' + item.id,
                        title: item.name + ' (' + AWARD_INFO[item.awardKey].name + ')',
                        description: item.description,
                        link: 'national-awards.html'
                    };
                })
            );
        }
    }

    /* ---- Hook into route system ---- */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initNationalAwardsPage();
        });
    } else {
        initNationalAwardsPage();
    }

    /* Also listen for route changes (SPA) */
    document.addEventListener('app:route-changed', function () {
        initNationalAwardsPage();
    });

})();
