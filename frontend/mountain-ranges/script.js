/**
 * Mountain Ranges of India Explorer
 */
(function () {
    'use strict';

    /* ================================================================
       1. DATA
       ================================================================ */

    const MOUNTAIN_RANGES = [
        {
            id: 'himalayas',
            name: 'The Himalayas',
            states: 'Jammu & Kashmir, Ladakh, Himachal, Uttarakhand, Sikkim, Arunachal Pradesh',
            length: 'Approx. 2,400 km',
            elevation: '8,586 m (Kangchenjunga - India)',
            peak: 'Kangchenjunga',
            description: 'The Himalayas are the highest and youngest folded mountain range in the world. They act as a natural barrier in the north and significantly influence the climate of the Indian subcontinent by preventing cold Central Asian winds from entering.',
            flora: ['Pine', 'Deodar', 'Rhododendron', 'Alpine Shrubs'],
            fauna: ['Snow Leopard', 'Himalayan Tahr', 'Musk Deer', 'Red Panda'],
            ecology: 'Crucial for maintaining the monsoon system. Acts as the source for major rivers like the Ganga, Indus, and Brahmaputra, providing water to millions.',
            // Approximate path for Himalayas (North to Northeast)
            svgPath: 'M 160 100 Q 250 180 350 200 T 520 180'
        },
        {
            id: 'western-ghats',
            name: 'Western Ghats (Sahyadri)',
            states: 'Gujarat, Maharashtra, Goa, Karnataka, Kerala, Tamil Nadu',
            length: 'Approx. 1,600 km',
            elevation: '2,695 m (Anamudi)',
            peak: 'Anamudi',
            description: 'A UNESCO World Heritage Site and one of the world\'s eight "hottest hotspots" of biological diversity. The Western Ghats run parallel to the western coast of the Indian peninsula.',
            flora: ['Teak', 'Rosewood', 'Bamboo', 'Orchids'],
            fauna: ['Lion-tailed Macaque', 'Nilgiri Tahr', 'Malabar Giant Squirrel', 'Indian Elephant'],
            ecology: 'Influences the Indian monsoon weather pattern by intercepting the rain-laden monsoon winds. Highly endemic biodiversity.',
            // Approximate path along the west coast
            svgPath: 'M 100 400 Q 130 500 190 620'
        },
        {
            id: 'eastern-ghats',
            name: 'Eastern Ghats',
            states: 'Odisha, Andhra Pradesh, Telangana, Karnataka, Tamil Nadu',
            length: 'Approx. 1,500 km',
            elevation: '1,690 m (Jindhagada Peak)',
            peak: 'Jindhagada Peak',
            description: 'A discontinuous range of mountains along India\'s eastern coast. They are eroded and cut through by the four major rivers of peninsular India: Godavari, Mahanadi, Krishna, and Kaveri.',
            flora: ['Sal', 'Sandalwood', 'Neem', 'Red Sanders'],
            fauna: ['Sloth Bear', 'Indian Leopard', 'Sambar Deer', 'Golden Gecko'],
            ecology: 'Important for their rich mineral resources, forests, and watersheds. They merge with the Western Ghats at the Nilgiri hills.',
            // Approximate path along the east coast
            svgPath: 'M 350 380 Q 280 480 210 580'
        },
        {
            id: 'aravalli',
            name: 'Aravalli Range',
            states: 'Gujarat, Rajasthan, Haryana, Delhi',
            length: 'Approx. 692 km',
            elevation: '1,722 m (Guru Shikhar)',
            peak: 'Guru Shikhar',
            description: 'The Aravalli Range is the oldest fold mountain system in India. Severely eroded over millions of years, it now acts as a barrier preventing the expansion of the Thar Desert.',
            flora: ['Khejri', 'Acacia', 'Dhok', 'Kadam'],
            fauna: ['Leopard', 'Striped Hyena', 'Indian Fox', 'Nilgai'],
            ecology: 'Rich in minerals like marble and copper. Acts as a crucial water divide separating the drainage to the Bay of Bengal from that to the Arabian Sea.',
            // Approximate path in Northwest
            svgPath: 'M 120 280 L 170 200'
        },
        {
            id: 'vindhya',
            name: 'Vindhya Range',
            states: 'Gujarat, Madhya Pradesh, Uttar Pradesh',
            length: 'Approx. 1,050 km',
            elevation: '752 m (Sadbhawna Shikhar)',
            peak: 'Sadbhawna Shikhar (Goodwill Peak)',
            description: 'A complex, discontinuous chain of mountain ridges, hill ranges, highlands and plateau escarpments. Historically, it forms the traditional boundary between North and South India.',
            flora: ['Teak', 'Sal', 'Mahua', 'Banyan'],
            fauna: ['Tiger', 'Sloth Bear', 'Chital', 'Barking Deer'],
            ecology: 'Gives rise to several tributaries of the Ganga river system including the Chambal, Betwa, and Ken rivers.',
            // Approximate central horizontal path
            svgPath: 'M 160 320 Q 220 330 300 310'
        },
        {
            id: 'satpura',
            name: 'Satpura Range',
            states: 'Gujarat, Maharashtra, Madhya Pradesh, Chhattisgarh',
            length: 'Approx. 900 km',
            elevation: '1,350 m (Dhupgarh)',
            peak: 'Dhupgarh',
            description: 'A range of hills in central India. The name Satpura means "Seven Folds". It runs parallel to the Vindhya Range to the north, and these two east-west ranges divide the Indian Subcontinent into the Indo-Gangetic plain of northern India and the Deccan Plateau of the south.',
            flora: ['Teak', 'Sal', 'Bamboo', 'Amla'],
            fauna: ['Gaur', 'Tiger', 'Dhole', 'Leopard'],
            ecology: 'The Narmada river originates from its north-eastern end, and the Tapti river originates in the eastern-central part.',
            // Approximate central horizontal path below Vindhya
            svgPath: 'M 150 350 Q 210 360 290 340'
        },
        {
            id: 'purvanchal',
            name: 'Purvanchal Hills',
            states: 'Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Meghalaya',
            length: 'Varies',
            elevation: '3,826 m (Mount Saramati)',
            peak: 'Mount Saramati',
            description: 'The easternward extension of the Himalayas, bending sharply to the south beyond the Dihang River gorge. It comprises the Patkai hills, the Naga hills, Manipur hills and the Mizo hills.',
            flora: ['Bamboo', 'Orchids', 'Evergreen Forests', 'Ferns'],
            fauna: ['Hoolock Gibbon', 'Hornbill', 'Clouded Leopard', 'Pangolin'],
            ecology: 'Part of the Indo-Burma biodiversity hotspot. Features extremely dense forests and high rainfall.',
            // Approximate path in the far east
            svgPath: 'M 500 220 Q 520 280 500 340'
        }
    ];

    /* ================================================================
       2. STATE VARIABLES
       ================================================================ */

    let activeRangeId = null;

    /* ================================================================
       3. INIT
       ================================================================ */

    document.addEventListener('DOMContentLoaded', () => {
        renderBaseMap();
        renderMountainOverlays();
    });

    /* ================================================================
       4. MAP RENDERING
       ================================================================ */

    function renderBaseMap() {
        const baseMapGroup = document.getElementById('base-map');
        if (!baseMapGroup) return;

        // Use INDIA_MAP_STATES from map-data.js if available
        const states = typeof window.INDIA_MAP_STATES !== 'undefined' ? window.INDIA_MAP_STATES : [];
        if (!states.length) {
            console.error('INDIA_MAP_STATES data not found.');
            return;
        }

        let pathsHtml = '';
        states.forEach(s => {
            pathsHtml += `<path class="state-path" data-state="${s.id}" d="${s.path}"/>`;
        });
        baseMapGroup.innerHTML = pathsHtml;
    }

    function renderMountainOverlays() {
        const overlaysGroup = document.getElementById('mountain-overlays');
        if (!overlaysGroup) return;

        let overlaysHtml = '';
        MOUNTAIN_RANGES.forEach(range => {
            overlaysHtml += `
                <path 
                    class="mountain-path" 
                    id="path-${range.id}" 
                    d="${range.svgPath}" 
                    data-id="${range.id}"
                    tabindex="0"
                    role="button"
                    aria-label="${range.name}"
                />`;
        });
        overlaysGroup.innerHTML = overlaysHtml;

        // Bind events
        const paths = overlaysGroup.querySelectorAll('.mountain-path');
        paths.forEach(path => {
            path.addEventListener('click', () => handleRangeSelection(path.dataset.id));
            path.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRangeSelection(path.dataset.id);
                }
            });
        });
    }

    /* ================================================================
       5. INTERACTION LOGIC
       ================================================================ */

    function handleRangeSelection(rangeId) {
        // Update active SVG path
        const allPaths = document.querySelectorAll('.mountain-path');
        allPaths.forEach(p => p.classList.remove('active'));

        const selectedPath = document.getElementById(`path-${rangeId}`);
        if (selectedPath) {
            selectedPath.classList.add('active');
        }

        activeRangeId = rangeId;
        updateDetailsPanel(rangeId);
    }

    function updateDetailsPanel(rangeId) {
        const range = MOUNTAIN_RANGES.find(r => r.id === rangeId);
        if (!range) return;

        const emptyState = document.getElementById('details-empty');
        const contentState = document.getElementById('details-content');

        if (emptyState && contentState) {
            emptyState.classList.add('hidden');
            
            // Temporary hide to re-trigger animation
            contentState.classList.remove('hidden');
            contentState.style.animation = 'none';
            contentState.offsetHeight; // trigger reflow
            contentState.style.animation = null;
        }

        // Update Text Fields
        document.getElementById('mr-name').textContent = range.name;
        document.getElementById('mr-states').textContent = `📍 ${range.states}`;
        document.getElementById('mr-length').textContent = `📏 ${range.length}`;
        document.getElementById('mr-description').textContent = range.description;
        document.getElementById('mr-peak').textContent = range.peak;
        document.getElementById('mr-elevation').textContent = range.elevation;
        document.getElementById('mr-ecology').textContent = range.ecology;

        // Update Flora Chips
        const floraContainer = document.getElementById('mr-flora');
        floraContainer.innerHTML = range.flora.map(f => `<span class="chip">${f}</span>`).join('');

        // Update Fauna Chips
        const faunaContainer = document.getElementById('mr-fauna');
        faunaContainer.innerHTML = range.fauna.map(f => `<span class="chip">${f}</span>`).join('');
    }

})();
