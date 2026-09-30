/**
 * River Names Decoder – Linguistic Explorer
 * Decode the linguistic, historical, and cultural meanings of Indian river names.
 */
(function () {
    'use strict';

    var RIVERS = [
        { name: 'Ganga', ancient: 'Gaṅgā (Sanskrit), Śrotāsī (Vedic)', meaning: 'The swift-flowing one', language: 'Sanskrit', origin: 'Sanskrit "gaṅg" (to go, flow)', region: 'North India', states: 'Uttarakhand, UP, Bihar, West Bengal', desc: 'From Sanskrit root "gaṅg" meaning "to go" or "to flow." In Vedic texts called "Śrotāsī" (the swift one). The name appears in the Rigveda over 30 times.', certain: true, langFamily: 'Indo-Aryan', mapX: 430, mapY: 300, mapColor: '#f59e0b' },
        { name: 'Yamunā', ancient: 'Yamunā (Sanskrit), Yamaññā (Pali)', meaning: 'Twin sister of Yama', language: 'Sanskrit', origin: 'From "Yama" (god of death) + "-unā" suffix', region: 'North India', states: 'Uttarakhand, UP, Delhi, Haryana', desc: 'Named after Yama, the god of death — Yamuna is his twin sister. The "-unā" feminine suffix makes her "the female twin of Yama."', certain: true, langFamily: 'Indo-Aryan', mapX: 410, mapY: 290, mapColor: '#f59e0b' },
        { name: 'Sarasvatī', ancient: 'Sarasvatī (Vedic), Haraхvatī (Avestan)', meaning: 'The one with plenty of pools', language: 'Sanskrit', origin: 'From "saras" (pool, lake) + "vatī" (possessing)', region: 'North India / Mythical', states: 'Haryana, Rajasthan (underground)', desc: 'From "saras" (lake, pool) + "vatī" (abounding in). Literally "she who has lakes." Also the name of the goddess of knowledge.', certain: true, langFamily: 'Indo-Aryan', mapX: 380, mapY: 270, mapColor: '#f59e0b' },
        { name: 'Narmadā', ancient: 'Narmadā (Sanskrit), Narmadā (Prakrit)', meaning: 'The pleasant one', language: 'Sanskrit', origin: 'From "narma" (pleasure, joy) + "-dā" (giving)', region: 'Central India', states: 'MP, Maharashtra, Gujarat', desc: 'From Sanskrit "narma" (pleasure) — she who gives joy. The river is called "Reva" in some texts, meaning "the leaping one."', certain: true, langFamily: 'Indo-Aryan', mapX: 310, mapY: 360, mapColor: '#f59e0b' },
        { name: 'Godāvarī', ancient: 'Godāvarī (Sanskrit), Gautamī (Telugu)', meaning: 'The cow-dung river / Gift of cow', language: 'Sanskrit', origin: 'Debated: "go" (cow) + "dāna" (gift) or "go" + "dhāra" (stream)', region: 'South India', states: 'Maharashtra, Telangana, AP', desc: 'Etymology debated. One theory: "go" (cow) + "dāna" (gift) = "gift of the cow." Another: from tribal word "god" (cooking pot).', certain: false, langFamily: 'Indo-Aryan / Dravidian', mapX: 350, mapY: 420, mapColor: '#8b5cf6' },
        { name: 'Krṣṇā', ancient: 'Krṣṇā (Sanskrit), Kṛṣṇā (Prakrit)', meaning: 'The dark one', language: 'Sanskrit', origin: 'From "kṛṣṇa" (black, dark)', region: 'South India', states: 'Maharashtra, Karnataka, AP, Telangana', desc: 'From Sanskrit "kṛṣṇa" meaning "black" or "dark." Named for the dark-colored waters or the dark basalt terrain it flows through.', certain: true, langFamily: 'Indo-Aryan', mapX: 330, mapY: 440, mapColor: '#f59e0b' },
        { name: 'Kāverī', ancient: 'Kāverī (Tamil), Kavari (Kannada)', meaning: 'She who bestows plenty', language: 'Dravidian', origin: 'From Tamil "kā" (to give, bestow) + "veru" (to flow)', region: 'South India', states: 'Karnataka, Tamil Nadu', desc: 'From Tamil root "kā" (to give) — she who gives abundantly. Some scholars link it to the sage Kavera, who prayed for the river.', certain: false, langFamily: 'Dravidian', mapX: 350, mapY: 490, mapColor: '#3b82f6' },
        { name: 'Tungā', ancient: 'Tungā (Kannada/Sanskrit)', meaning: 'The rapid/swift one', language: 'Kannada/Sanskrit', origin: 'From "tunga" (high, rapid, steep)', region: 'South India', states: 'Karnataka', desc: 'From Kannada/Sanskrit "tunga" meaning "rapid" or "steep." The Tunga and Bhadra rivers merge to form the Tungabhadra.', certain: true, langFamily: 'Dravidian / Indo-Aryan', mapX: 340, mapY: 470, mapColor: '#10b981' },
        { name: 'Bhadra', ancient: 'Bhadra (Sanskrit)', meaning: 'The auspicious/gentle one', language: 'Sanskrit', origin: 'From "bhadra" (auspicious, gentle, good)', region: 'South India', states: 'Karnataka', desc: 'From Sanskrit "bhadra" meaning "auspicious" or "gentle." When combined with Tunga, it forms the "Rapid and Auspicious" Tungabhadra.', certain: true, langFamily: 'Indo-Aryan', mapX: 345, mapY: 475, mapColor: '#f59e0b' },
        { name: 'Brahmaputrā', ancient: 'Brahmaputrā (Sanskrit), Lhā (Tibetan)', meaning: 'Son of Brahma', language: 'Sanskrit', origin: 'From "Brahma" (creator god) + "putra" (son)', region: 'Northeast India', states: 'Arunachal Pradesh, Assam', desc: 'From Sanskrit "Brahma" + "putra" (son) = "son of Brahma." In Tibet called "Tsangpo" (the Purifier). In Assamese "Brahmaputra."', certain: true, langFamily: 'Indo-Aryan', mapX: 480, mapY: 200, mapColor: '#f59e0b' },
        { name: 'Indus', ancient: 'Sindhu (Sanskrit), Hindu (Persian)', meaning: 'The great river / Sea', language: 'Sanskrit', origin: 'From "sindhu" (sea, great river)', region: 'Northwest India', states: 'Ladakh, J&K', desc: 'From Sanskrit "sindhu" meaning "sea" or "great body of water." The Persian form "Hindu" gave us "India" and "Hinduism."', certain: true, langFamily: 'Indo-Aryan', mapX: 240, mapY: 160, mapColor: '#f59e0b' },
        { name: 'Sutlej', ancient: 'Satadru (Sanskrit), Sutudrī (Vedic)', meaning: 'Hundred-streamed', language: 'Sanskrit', origin: 'From "śatadru" (hundred-streamed)', region: 'Northwest India', states: 'HP, Punjab', desc: 'From Sanskrit "śata" (hundred) + "dru" (flowing) = "hundred-streamed." The Vedic name "Sutudrī" appears in the Rigveda.', certain: true, langFamily: 'Indo-Aryan', mapX: 280, mapY: 180, mapColor: '#f59e0b' },
        { name: 'Chenab', ancient: 'Asiknī (Sanskrit), Vitastā nearby', meaning: 'The dark/black river', language: 'Sanskrit', origin: 'From "asiknī" (the dark one)', region: 'Northwest India', states: 'HP, Punjab', desc: 'From Sanskrit "asiknī" meaning "the dark one." The Persian form "Chandrabhaga" means "moon-shaped" due to its meandering course.', certain: true, langFamily: 'Indo-Aryan', mapX: 290, mapY: 175, mapColor: '#f59e0b' },
        { name: 'Ravi', ancient: 'Paruṣṇī (Sanskrit)', meaning: 'The shining/sun river', language: 'Sanskrit', origin: 'From "ravi" (sun) or "irāvatī" (abundant)', region: 'Northwest India', states: 'HP, Punjab', desc: 'Called "Paruṣṇī" in the Rigveda. Modern name from Sanskrit "ravi" (sun) or Prakrit "irāvatī" (abundant). Connected to the ancient Harappan site of Harappa.', certain: false, langFamily: 'Indo-Aryan', mapX: 285, mapY: 185, mapColor: '#8b5cf6' },
        { name: 'Jhelum', ancient: 'Vitastā (Sanskrit)', meaning: 'The outstretched one', language: 'Sanskrit', origin: 'From "vitastā" (outstretched, like a measuring rod)', region: 'Northwest India', states: 'J&K, Punjab', desc: 'The Vedic name "Vitastā" means "the one that stretches out" (like a measuring rod). The modern name "Jhelum" may come from a local Dravidian or Munda source.', certain: false, langFamily: 'Debated', mapX: 280, mapY: 170, mapColor: '#8b5cf6' },
        { name: 'Narmadā', ancient: 'Narmadā (Sanskrit), Rewā (alternate)', meaning: 'She who gives pleasure', language: 'Sanskrit', origin: 'From "narma" (pleasure, joy)', region: 'Central India', states: 'MP, Maharashtra', desc: 'Also called "Rewā" meaning "the leaping one." Sacred to both Hindus and Jains. The river flows west — unlike most Indian rivers flowing east.', certain: true, langFamily: 'Indo-Aryan', mapX: 315, mapY: 365, mapColor: '#f59e0b' },
        { name: 'Tāptī', ancient: 'Tāptī (Sanskrit), Tapi (Vedic)', meaning: 'The burning/hot river', language: 'Sanskrit', origin: 'From "tap" (to burn, heat)', region: 'Central India', states: 'MP, Maharashtra, Gujarat', desc: 'From Sanskrit root "tap" (to burn, heat) = "the hot one." She is considered the daughter of the Sun god Surya.', certain: true, langFamily: 'Indo-Aryan', mapX: 300, mapY: 390, mapColor: '#f59e0b' },
        { name: 'Mahanadī', ancient: 'Mahanadī (Sanskrit)', meaning: 'The great river', language: 'Sanskrit', origin: 'From "mahā" (great) + "nadī" (river)', region: 'East India', states: 'Chhattisgarh, Odisha', desc: 'Literally "the great river" from Sanskrit "mahā" (great) + "nadī" (river). One of the oldest river names with unchanged meaning across millennia.', certain: true, langFamily: 'Indo-Aryan', mapX: 420, mapY: 370, mapColor: '#f59e0b' },
        { name: 'Godāvarī', ancient: 'Godāvarī (Sanskrit)', meaning: 'Gift of the cow', language: 'Sanskrit / Dravidian', origin: 'Debated: "go" + "dāna" or tribal word', region: 'South India', states: 'Maharashtra, Telangana, AP', desc: 'Called "Dakshin Ganga" (Southern Ganga). Etymology debated between Sanskrit "cow gift" and local Dravidian origins.', certain: false, langFamily: 'Mixed', mapX: 355, mapY: 415, mapColor: '#8b5cf6' },
        { name: 'Sabarmatī', ancient: 'Sabarmatī (Sanskrit)', meaning: 'The swift-flowing / purity-bringer', language: 'Sanskrit', origin: 'From "sabara" (swift) + "matī" (having)', region: 'West India', states: 'Rajasthan, Gujarat', desc: 'From "sabara" (swift, impetuous) + "matī" (possessing). The river flows past Ahmedabad and is associated with Gandhi\'s Sabarmati Ashram.', certain: true, langFamily: 'Indo-Aryan', mapX: 280, mapY: 340, mapColor: '#f59e0b' },
        { name: 'Luni', ancient: 'Lavaṇā (Sanskrit)', meaning: 'The salty river', language: 'Sanskrit', origin: 'From "lavaṇa" (salty, saline)', region: 'West India', states: 'Rajasthan', desc: 'From Sanskrit "lavaṇa" (salty). The Luni is Rajasthan\'s only major river, flowing through the Thar Desert. Its waters are saline downstream.', certain: true, langFamily: 'Indo-Aryan', mapX: 260, mapY: 280, mapColor: '#f59e0b' },
        { name: 'Periyar', ancient: 'Periyar (Tamil)', meaning: 'The great/big one', language: 'Tamil', origin: 'From "periya" (great, big) + "-r" (river suffix)', region: 'South India', states: 'Kerala, Tamil Nadu', desc: 'From Tamil "periya" (great, big). The largest river in Kerala. Its name simply means "the great river" in Tamil.', certain: true, langFamily: 'Dravidian', mapX: 310, mapY: 500, mapColor: '#3b82f6' },
        { name: 'Brahmāputra', ancient: 'Lhā/Tsangpō (Tibetan)', meaning: 'Son of Brahma / The Purifier', language: 'Sanskrit / Tibetan', origin: 'Sanskrit "Brahma + putra"; Tibetan "Tsangpō" (purifier)', region: 'Northeast India', states: 'Arunachal, Assam', desc: 'In Tibet: "Tsangpō" (the Purifier). In Assamese: "Brahmaputra" (son of Brahma). One river, two entirely different naming traditions.', certain: true, langFamily: 'Indo-Aryan / Tibeto-Burman', mapX: 490, mapY: 210, mapColor: '#10b981' },
        { name: 'Teesta', ancient: 'Tīrthā (Sanskrit)', meaning: 'The sacred/purifying one', language: 'Sanskrit / Tibeto-Burman', origin: 'From "tīrtha" (sacred water crossing)', region: 'Northeast India', states: 'Sikkim, West Bengal', desc: 'From Sanskrit "tīrtha" (sacred ford, pilgrimage site). The Teesta flows from Sikkim through the Darjeeling hills. Some link it to Tibetan "rta" (horse).', certain: false, langFamily: 'Mixed', mapX: 470, mapY: 230, mapColor: '#8b5cf6' },
        { name: 'Gandak', ancient: 'Gaṇḍakī (Sanskrit)', meaning: 'The one with pebbles/stones', language: 'Sanskrit', origin: 'From "gaṇḍaka" (pebble, stone)', region: 'North India', states: 'Nepal, Bihar', desc: 'From "gaṇḍaka" meaning "pebble" or "gravel." The Gandak flows through a deep gorge in Nepal before entering the Gangetic plains of Bihar.', certain: true, langFamily: 'Indo-Aryan', mapX: 400, mapY: 270, mapColor: '#f59e0b' },
        { name: 'Kosi', ancient: 'Kauśikī (Sanskrit)', meaning: 'The roaring/turbulent one', language: 'Sanskrit', origin: 'From "kōs" (roar, rage) or sage Kauśika', region: 'North India', states: 'Nepal, Bihar', desc: 'Called "Kauśikī" in ancient texts (from sage Kauśika). Known as "Sorrow of Bihar" due to devastating floods. The name may also mean "the roarer."', certain: false, langFamily: 'Indo-Aryan', mapX: 410, mapY: 260, mapColor: '#8b5cf6' },
        { name: 'Chambal', ancient: 'Charmanvatī (Sanskrit)', meaning: 'The leather-producing river', language: 'Sanskrit', origin: 'From "charman" (skin, leather) + "-vatī" (having)', region: 'North India', states: 'MP, Rajasthan, UP', desc: 'From "charmanvatī" meaning "she who has skins/leather." The river was historically used for processing animal hides in tanning.', certain: true, langFamily: 'Indo-Aryan', mapX: 340, mapY: 280, mapColor: '#f59e0b' },
        { name: 'Son', ancient: 'Śoṇā (Sanskrit)', meaning: 'The golden/reddish river', language: 'Sanskrit', origin: 'From "śoṇa" (golden, red, copper-colored)', region: 'Central India', states: 'MP, UP, Bihar', desc: 'From Sanskrit "śoṇa" meaning "golden" or "reddish." Named for its golden-hued waters carrying mineral-rich alluvium from the Vindhyan Range.', certain: true, langFamily: 'Indo-Aryan', mapX: 380, mapY: 310, mapColor: '#f59e0b' },
        { name: 'Mahi', ancient: 'Mahī (Sanskrit)', meaning: 'The great one', language: 'Sanskrit', origin: 'From "mahī" (great, mighty)', region: 'West India', states: 'MP, Rajasthan, Gujarat', desc: 'From Sanskrit "mahī" (great). One of the few rivers that crosses the Tropic of Cancer twice. Flows through the Vindhyan and Aravalli ranges.', certain: true, langFamily: 'Indo-Aryan', mapX: 280, mapY: 320, mapColor: '#f59e0b' },
        { name: 'Betwa', ancient: 'Vetravatī (Sanskrit)', meaning: 'The reed-bearing river', language: 'Sanskrit', origin: 'From "vetra" (reed, cane) + "-vatī" (having)', region: 'Central India', states: 'MP, UP', desc: 'From "vetra" (reed, cane) = "she who has reeds." The Betwa flows through the heartland of the Bundelkhand region, historically significant for Chandelas.', certain: true, langFamily: 'Indo-Aryan', mapX: 360, mapY: 300, mapColor: '#f59e0b' }
    ];

    var PATTERNS = [
        { icon: '📖', name: '"nadī" / "nadi" = River', desc: 'The Sanskrit word "nadī" (नदी) is the most common root for river names. Many Indian rivers simply add a local suffix to this root. Examples: Mahanadī (great river), Narmadā.', tag: 'Sanskrit' },
        { icon: '🌿', name: 'Descriptive Adjectives', desc: 'Many rivers are named by their characteristics: Krishna (dark), Tunga (rapid), Bhadra (auspicious), Luni (salty), Son (golden). The adjective becomes the river\'s identity.', tag: 'Naming' },
        { icon: '🌊', name: '"Flowing" Pattern', desc: 'The suffix "-avatī" or "-vatā" in Sanskrit means "possessing" or "flowing with." Examples: Vetravatī (reedy), Paruṣṇī (shining), Vipāśā (abundant).', tag: 'Sanskrit' },
        { icon: '🏛️', name: 'Deity Names', desc: 'Some rivers are named after gods or sages: Yamunā (Yama\'s sister), Sarasvatī (goddess of knowledge), Gandakī (sage Kauśika). These reflect mythological origins.', tag: 'Mythology' },
        { icon: '🗣️', name: 'Dravidian vs Sanskrit', desc: 'South Indian rivers often have Dravidian names: Kāverī (Tamil "kā" = to give), Periyar (Tamil "periya" = great), Tungā (Kannada "tunga" = rapid). Different roots, same reverence.', tag: 'Linguistic' },
        { icon: '🌏', name: 'Tibeto-Burman Names', desc: 'Northeast rivers reflect Tibetan influence: Tsangpō (Brahmaputra = "purifier"), Teesta (from "tīrtha"). These names reflect Buddhist and pre-Buddhist Himalayan traditions.', tag: 'Tibeto-Burman' }
    ];

    var SOURCES = [
        { icon: '📚', name: 'Monier-Williams Sanskrit Dictionary', desc: 'The definitive Sanskrit-English dictionary providing etymologies for hundreds of river names found in Vedic and classical texts.', tag: 'Linguistic' },
        { icon: '📖', name: 'Rigveda (1500 BCE)', desc: 'The oldest Vedic text contains the earliest recorded names of Indian rivers: Gaṅgā, Yamunā, Sarasvatī, Sindhu, and many others.', tag: 'Ancient Text' },
        { icon: '🗺️', name: 'Survey of India Topographic Maps', desc: 'Official geographical data showing river courses, elevation profiles, and regional naming variations across Indian states.', tag: 'Mapping' },
        { icon: '🎓', name: 'University of Chicago Vedic Index', desc: 'Comprehensive index of Vedic place names and river names with linguistic analysis and cross-references to Avestan equivalents.', tag: 'Academic' },
        { icon: '📰', name: 'Linguistic Survey of India', desc: 'Sir George Grierson\'s monumental survey documenting regional language variations in river naming across India\'s linguistic zones.', tag: 'Research' },
        { icon: '🌐', name: 'Digital Dictionary of South Asia', desc: 'Online database of South Asian place names with etymologies, historical forms, and cross-references in multiple scripts.', tag: 'Digital' }
    ];

    document.addEventListener('DOMContentLoaded', function () {
        createParticles();
        renderRivers(RIVERS);
        renderMapMarkers();
        renderPatterns();
        renderSources();
        setupSearch();
        setupMapInfo();
        animateOnScroll();
    });

    function createParticles() {
        var c = document.getElementById('rndParticles');
        if (!c) return;
        for (var i = 0; i < 20; i++) {
            var p = document.createElement('div');
            p.className = 'rnd-particle';
            var s = Math.random() * 6 + 2;
            p.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (Math.random() * 100) + '%;animation-duration:' + (Math.random() * 10 + 8) + 's;animation-delay:' + (Math.random() * 8) + 's';
            c.appendChild(p);
        }
    }

    function renderRivers(rivers) {
        var g = document.getElementById('riverGrid');
        if (!g) return;
        var count = document.getElementById('searchCount');
        if (count) count.textContent = rivers.length + ' rivers';
        g.innerHTML = rivers.map(function (r) {
            var uncertain = r.certain ? '' : '<div class="rnd-uncertain-label">⚠️ Debated</div>';
            var langColors = { 'Sanskrit': '#f59e0b', 'Dravidian': '#3b82f6', 'Tamil': '#3b82f6', 'Kannada/Sanskrit': '#10b981', 'Sanskrit / Dravidian': '#8b5cf6', 'Sanskrit / Tibetan': '#10b981', 'Tibeto-Burman': '#10b981' };
            var langColor = langColors[r.language] || '#8b5cf6';
            return '<div class="rnd-card rnd-animate-in ' + (r.certain ? '' : 'rnd-uncertain') + '">' + uncertain +
                '<div class="rnd-card-icon">🌊</div>' +
                '<span class="rnd-card-tag" style="background:' + langColor + '20;color:' + langColor + '">' + r.language + '</span>' +
                '<div class="rnd-card-name">' + r.name + '</div>' +
                '<div class="rnd-card-ancient">Ancient: ' + r.ancient + '</div>' +
                '<div class="rnd-card-meaning">"' + r.meaning + '"</div>' +
                '<div class="rnd-card-desc">' + r.desc + '</div>' +
                '<div class="rnd-card-region">📍 ' + r.states + ' (' + r.region + ')</div>' +
            '</div>';
        }).join('');
        showVisible();
    }

    function renderMapMarkers() {
        var g = document.getElementById('rndMapMarkers');
        if (!g) return;
        var ns = 'http://www.w3.org/2000/svg';
        RIVERS.forEach(function (r) {
            var el = document.createElementNS(ns, 'g');
            el.setAttribute('class', 'rnd-map-marker');
            el.setAttribute('data-name', r.name);
            var circle = document.createElementNS(ns, 'circle');
            circle.setAttribute('cx', r.mapX); circle.setAttribute('cy', r.mapY);
            circle.setAttribute('r', '6'); circle.setAttribute('fill', r.mapColor);
            circle.setAttribute('stroke', '#fff'); circle.setAttribute('stroke-width', '2');
            el.appendChild(circle);
            var text = document.createElementNS(ns, 'text');
            text.setAttribute('x', r.mapX); text.setAttribute('y', r.mapY - 10);
            text.setAttribute('text-anchor', 'middle'); text.setAttribute('class', 'rnd-map-marker-text');
            text.textContent = r.name;
            el.appendChild(text);
            g.appendChild(el);
        });
    }

    function setupMapInfo() {
        document.querySelectorAll('.rnd-map-marker').forEach(function (m) {
            m.addEventListener('click', function () {
                var name = this.getAttribute('data-name');
                var river = RIVERS.find(function (r) { return r.name === name; });
                if (!river) return;
                document.getElementById('rndInfoDefault').style.display = 'none';
                document.getElementById('rndInfoContent').style.display = 'block';
                document.getElementById('rndInfoIcon').textContent = '🌊';
                document.getElementById('rndInfoTag').textContent = river.language;
                document.getElementById('rndInfoName').textContent = river.name;
                document.getElementById('rndInfoDesc').textContent = river.desc;
                document.getElementById('rndInfoEtymology').textContent = river.origin;
                document.getElementById('rndInfoAncient').textContent = river.ancient;
                document.getElementById('rndInfoLanguage').textContent = river.langFamily;
            });
        });
        document.getElementById('rndInfoClose').addEventListener('click', function () {
            document.getElementById('rndInfoDefault').style.display = 'block';
            document.getElementById('rndInfoContent').style.display = 'none';
        });
    }

    function setupSearch() {
        var input = document.getElementById('searchInput');
        if (!input) return;
        input.addEventListener('input', function () {
            var q = this.value.toLowerCase().trim();
            if (!q) { renderRivers(RIVERS); return; }
            var filtered = RIVERS.filter(function (r) {
                return r.name.toLowerCase().indexOf(q) !== -1 ||
                    r.meaning.toLowerCase().indexOf(q) !== -1 ||
                    r.region.toLowerCase().indexOf(q) !== -1 ||
                    r.states.toLowerCase().indexOf(q) !== -1 ||
                    r.ancient.toLowerCase().indexOf(q) !== -1 ||
                    r.language.toLowerCase().indexOf(q) !== -1 ||
                    r.desc.toLowerCase().indexOf(q) !== -1;
            });
            renderRivers(filtered);
        });
    }

    function renderPatterns() {
        var g = document.getElementById('patternGrid');
        if (!g) return;
        g.innerHTML = PATTERNS.map(function (p) {
            return '<div class="rnd-card rnd-animate-in"><span class="rnd-card-tag" style="background:var(--rnd-gold-dim);color:var(--rnd-gold-light)">' + p.tag + '</span><div class="rnd-card-icon">' + p.icon + '</div><div class="rnd-card-name">' + p.name + '</div><div class="rnd-card-desc">' + p.desc + '</div></div>';
        }).join('');
        showVisible();
    }

    function renderSources() {
        var g = document.getElementById('sourcesGrid');
        if (!g) return;
        g.innerHTML = SOURCES.map(function (s) {
            return '<div class="rnd-card rnd-animate-in"><span class="rnd-card-tag" style="background:var(--rnd-gold-dim);color:var(--rnd-gold-light)">' + s.tag + '</span><div class="rnd-card-icon">' + s.icon + '</div><div class="rnd-card-name">' + s.name + '</div><div class="rnd-card-desc">' + s.desc + '</div></div>';
        }).join('');
        showVisible();
    }

    function animateOnScroll() {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        function scan() { document.querySelectorAll('.rnd-animate-in:not(.visible)').forEach(function (el) { obs.observe(el); }); }
        scan();
        new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
    }

    function showVisible() {
        document.querySelectorAll('.rnd-animate-in').forEach(function (el) {
            if (el.getBoundingClientRect().top < window.innerHeight + 100) el.classList.add('visible');
        });
    }

    /* ============================================
       UTILITY: Get all river names
       ============================================ */
    function getAllRiverNames() {
        return RIVERS.map(function (r) { return r.name; });
    }

    /* ============================================
       UTILITY: Get rivers by language family
       ============================================ */
    function getRiversByLanguage(lang) {
        return RIVERS.filter(function (r) {
            return r.language.toLowerCase().indexOf(lang.toLowerCase()) !== -1;
        });
    }

    /* ============================================
       UTILITY: Get uncertain etymologies
       ============================================ */
    function getUncertainEtymologies() {
        return RIVERS.filter(function (r) { return !r.certain; });
    }

    /* ============================================
       UTILITY: Get certain etymologies
       ============================================ */
    function getCertainEtymologies() {
        return RIVERS.filter(function (r) { return r.certain; });
    }

    /* ============================================
       UTILITY: Get rivers by region
       ============================================ */
    function getRiversByRegion(region) {
        return RIVERS.filter(function (r) {
            return r.region.toLowerCase().indexOf(region.toLowerCase()) !== -1;
        });
    }

    /* ============================================
       UTILITY: Search rivers by meaning
       ============================================ */
    function searchByMeaning(query) {
        var q = query.toLowerCase();
        return RIVERS.filter(function (r) {
            return r.meaning.toLowerCase().indexOf(q) !== -1;
        });
    }

    /* ============================================
       UTILITY: Get river by name
       ============================================ */
    function getRiverByName(name) {
        return RIVERS.find(function (r) {
            return r.name.toLowerCase() === name.toLowerCase();
        }) || null;
    }

    /* ============================================
       UTILITY: Get ancient name lookup
       ============================================ */
    function getAncientName(modernName) {
        var r = getRiverByName(modernName);
        return r ? r.ancient : null;
    }

    /* ============================================
       UTILITY: Get modern name from ancient
       ============================================ */
    function getModernFromAncient(ancientName) {
        return RIVERS.find(function (r) {
            return r.ancient.toLowerCase().indexOf(ancientName.toLowerCase()) !== -1;
        }) || null;
    }

    /* ============================================
       UTILITY: Get all language families
       ============================================ */
    function getLanguageFamilies() {
        var families = {};
        RIVERS.forEach(function (r) { families[r.langFamily] = true; });
        return Object.keys(families);
    }

    /* ============================================
       UTILITY: Get all regions
       ============================================ */
    function getAllRegions() {
        var regions = {};
        RIVERS.forEach(function (r) { regions[r.region] = true; });
        return Object.keys(regions);
    }

    /* ============================================
       UTILITY: Get total count
       ============================================ */
    function getRiverCount() {
        return RIVERS.length;
    }

    /* ============================================
       UTILITY: Get pattern count
       ============================================ */
    function getPatternCount() {
        return PATTERNS.length;
    }

    /* ============================================
       UTILITY: Get source count
       ============================================ */
    function getSourceCount() {
        return SOURCES.length;
    }

    /* ============================================
       UTILITY: Full data summary
       ============================================ */
    function getDataSummary() {
        return {
            rivers: RIVERS.length,
            patterns: PATTERNS.length,
            sources: SOURCES.length,
            languages: getLanguageFamilies().length,
            regions: getAllRegions().length,
            certain: getCertainEtymologies().length,
            uncertain: getUncertainEtymologies().length
        };
    }

    /* ============================================
       UTILITY: Get rivers sorted alphabetically
       ============================================ */
    function getRiversSorted() {
        return RIVERS.slice().sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    /* ============================================
       UTILITY: Get rivers by state
       ============================================ */
    function getRiversByState(state) {
        return RIVERS.filter(function (r) {
            return r.states.toLowerCase().indexOf(state.toLowerCase()) !== -1;
        });
    }

    /* ============================================
       UTILITY: Get all states mentioned
       ============================================ */
    function getAllStates() {
        var states = {};
        RIVERS.forEach(function (r) {
            r.states.split(',').forEach(function (s) {
                states[s.trim()] = true;
            });
        });
        return Object.keys(states);
    }

    /* ============================================
       UTILITY: Get rivers with Sanskrit origin
       ============================================ */
    function getSanskritRivers() {
        return getRiversByLanguage('Sanskrit');
    }

    /* ============================================
       UTILITY: Get rivers with Dravidian origin
       ============================================ */
    function getDravidianRivers() {
        return RIVERS.filter(function (r) {
            return r.language.toLowerCase().indexOf('dravidian') !== -1 ||
                   r.language.toLowerCase().indexOf('tamil') !== -1 ||
                   r.language.toLowerCase().indexOf('kannada') !== -1;
        });
    }

    /* ============================================
       UTILITY: Get rivers with Tibeto-Burman origin
       ============================================ */
    function getTibetoBurmanRivers() {
        return RIVERS.filter(function (r) {
            return r.language.toLowerCase().indexOf('tibeto') !== -1;
        });
    }

    /* ============================================
       UTILITY: Get rivers named after deities
       ============================================ */
    function getDeityRivers() {
        var deityKeywords = ['yama', 'brahma', 'saras', 'shiva', 'vishnu', 'krishna'];
        return RIVERS.filter(function (r) {
            return deityKeywords.some(function (kw) {
                return r.name.toLowerCase().indexOf(kw) !== -1 ||
                       r.desc.toLowerCase().indexOf(kw) !== -1;
            });
        });
    }

    /* ============================================
       UTILITY: Get rivers named after colors
       ============================================ */
    function getColorRivers() {
        var colorKeywords = ['dark', 'black', 'golden', 'red', 'dark'];
        return RIVERS.filter(function (r) {
            return colorKeywords.some(function (kw) {
                return r.meaning.toLowerCase().indexOf(kw) !== -1;
            });
        });
    }

    /* ============================================
       UTILITY: Get rivers named after physical traits
       ============================================ */
    function getPhysicalRivers() {
        var traits = ['rapid', 'swift', 'great', 'salty', 'dark', 'golden', 'pleasant', 'reedy', 'hundred'];
        return RIVERS.filter(function (r) {
            return traits.some(function (t) {
                return r.meaning.toLowerCase().indexOf(t) !== -1;
            });
        });
    }

    /* ============================================
       UTILITY: Get river etymology word count
       ============================================ */
    function getAvgEtymologyLength() {
        var total = RIVERS.reduce(function (sum, r) { return sum + r.origin.length; }, 0);
        return Math.round(total / RIVERS.length);
    }

    /* ============================================
       UTILITY: Search all data
       ============================================ */
    function searchAll(query) {
        var q = query.toLowerCase();
        var results = [];
        RIVERS.forEach(function (r) {
            if (r.name.toLowerCase().indexOf(q) !== -1 ||
                r.meaning.toLowerCase().indexOf(q) !== -1 ||
                r.ancient.toLowerCase().indexOf(q) !== -1 ||
                r.desc.toLowerCase().indexOf(q) !== -1 ||
                r.states.toLowerCase().indexOf(q) !== -1) {
                results.push({ type: 'river', name: r.name, meaning: r.meaning });
            }
        });
        PATTERNS.forEach(function (p) {
            if (p.name.toLowerCase().indexOf(q) !== -1 || p.desc.toLowerCase().indexOf(q) !== -1) {
                results.push({ type: 'pattern', name: p.name, meaning: p.desc.substring(0, 80) });
            }
        });
        return results;
    }

    /* ============================================
       UTILITY: Get river with longest ancient name
       ============================================ */
    function getLongestAncientName() {
        return RIVERS.reduce(function (longest, r) {
            return r.ancient.length > longest.ancient.length ? r : longest;
        }, RIVERS[0]);
    }

    /* ============================================
       UTILITY: Get river with shortest name
       ============================================ */
    function getShortestName() {
        return RIVERS.reduce(function (shortest, r) {
            return r.name.length < shortest.name.length ? r : shortest;
        }, RIVERS[0]);
    }

    /* ============================================
       UTILITY: Get rivers flowing through most states
       ============================================ */
    function getMostInterstateRivers() {
        return RIVERS.reduce(function (most, r) {
            var count = r.states.split(',').length;
            var mostCount = most.states.split(',').length;
            return count > mostCount ? r : most;
        }, RIVERS[0]);
    }

    /* ============================================
       UTILITY: Get river with most descriptive meaning
       ============================================ */
    function getMostDescriptive() {
        return RIVERS.reduce(function (best, r) {
            return r.meaning.length > best.meaning.length ? r : best;
        }, RIVERS[0]);
    }

    /* ============================================
       UTILITY: Get all map colors used
       ============================================ */
    function getMapColors() {
        var colors = {};
        RIVERS.forEach(function (r) { colors[r.mapColor] = true; });
        return Object.keys(colors);
    }

    /* ============================================
       UTILITY: Get rivers on the map
       ============================================ */
    function getMapRivers() {
        return RIVERS.filter(function (r) { return r.mapX && r.mapY; });
    }

})();
