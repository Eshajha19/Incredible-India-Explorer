function initSciencePage() {
    const scienceAsset = fileName => `assets/science/${encodeURIComponent(fileName)}`;
    const statsGrid = document.getElementById('science-stats-grid');
    const isroGrid = document.getElementById('science-isro-grid');
    const scientistGrid = document.getElementById('science-scientist-grid');
    const searchInput = document.getElementById('science-search-input');
    const filterButtons = document.querySelectorAll('[data-science-filter]');
    const timelineGrid = document.getElementById('science-timeline');
    const timelineDetail = document.getElementById('science-timeline-detail');
    const modal = document.getElementById('science-modal');
    const modalClose = document.getElementById('science-modal-close');
    const modalAvatar = document.getElementById('science-modal-avatar');
    const modalCategory = document.getElementById('science-modal-category');
    const modalTitle = document.getElementById('science-modal-title');
    const modalSubtitle = document.getElementById('science-modal-subtitle');
    const modalStory = document.getElementById('science-modal-story');
    const modalHighlights = document.getElementById('science-modal-highlights');
    const modalStats = document.getElementById('science-modal-stats');

    if (!statsGrid || !isroGrid || !scientistGrid || !searchInput || !filterButtons.length || !timelineGrid || !timelineDetail || !modal || !modalClose) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const statsData = [
        {
            label: 'Space missions',
            value: '100+',
            detail: 'India has built a deep track record across Earth orbit, lunar, Mars, and solar science missions.'
        },
        {
            label: 'Nobel-winning discovery',
            value: 'Raman Effect',
            detail: "C. V. Raman's 1928 discovery reshaped physics and earned the 1930 Nobel Prize."
        },
        {
            label: 'Satellites launched',
            value: '400+',
            detail: 'Indian launch systems have carried domestic and international payloads into orbit for decades.'
        },
        {
            label: 'Research institutions',
            value: '70+',
            detail: 'Premier labs, councils, and universities continue to power discovery across the country.'
        }
    ];

    const isroData = [
        { id: 'chandrayaan-3', year: '2023', title: 'Chandrayaan-3', type: 'Lunar Mission', category: 'space', image: scienceAsset('chandrayaan-3.png'), summary: "India achieved a historic soft landing near the Moon's south polar region.", contribution: 'Precision landing, rover operations, and reusable landing systems.', highlights: ['South polar region', 'Pragyan rover', 'Soft landing milestone'] },
        { id: 'mangalyaan', year: '2013', title: 'Mangalyaan', type: 'Mars Mission', category: 'space', image: scienceAsset('mangalyaan.png'), summary: 'The Mars Orbiter Mission proved India could reach another planet on a disciplined budget.', contribution: 'Reliable interplanetary navigation and deep-space operations.', highlights: ['Mars orbit insertion', 'Low-cost engineering', 'Global recognition'] },
        { id: 'aryabhata', year: '1975', title: 'Aryabhata', type: 'First Satellite', category: 'space', image: scienceAsset('aryabhata.png'), summary: "India's first satellite opened the country's space era.", contribution: 'A foundation for later launch, communications, and observation programs.', highlights: ['First Indian satellite', '1975 launch', 'Space age milestone'] },
        { id: 'aditya-l1', year: '2023', title: 'Aditya-L1', type: 'Solar Mission', category: 'space', image: scienceAsset('aditya-l1.png'), summary: "India's solar observatory studies the Sun from the L1 vantage point.", contribution: 'Solar corona, winds, and space-weather observations.', highlights: ['Sun monitoring', 'L1 halo orbit', 'Space weather'] }
    ];

    const scientistData = [
        { id: 'cv-raman', category: 'physics', image: scienceAsset('cv-raman.png'), name: 'C. V. Raman', subtitle: 'Physics pioneer', achievement: 'Discovered the Raman Effect.', contribution: 'Showed how light changes wavelength while scattering through matter.', story: 'C. V. Raman transformed Indian science with the Raman Effect, a discovery that became one of the most famous results in modern physics. His work placed India on the global scientific map and inspired generations of researchers.', highlights: ['1930 Nobel Prize', 'Raman spectroscopy', 'Foundational physics'], stats: [{ label: 'Field', value: 'Physics' }, { label: 'Legacy', value: 'Light scattering' }, { label: 'Era', value: '1920s-1950s' }] },
        { id: 'apj-abdul-kalam', category: 'space', image: scienceAsset('apj-abudal kalam.png'), name: 'A. P. J. Abdul Kalam', subtitle: 'Missile scientist and teacher', achievement: "Helped lead India's launch and missile programs.", contribution: 'Connected engineering, space systems, and national ambition.', story: "A. P. J. Abdul Kalam became one of India's most admired science leaders. His work in rockets, missile development, and public science communication made him a symbol of aspiration and possibility.", highlights: ['Launch systems', 'Missile development', 'Public science leader'], stats: [{ label: 'Field', value: 'Space' }, { label: 'Known for', value: 'Guiding large systems' }, { label: 'Legacy', value: "People's President" }] },
        { id: 'vikram-sarabhai', category: 'space', image: scienceAsset('vikram-sarabhai.png'), name: 'Vikram Sarabhai', subtitle: 'Father of Indian space program', achievement: 'Built the vision that became ISRO.', contribution: 'Championed satellites, applications, and scientific institutions.', story: "Vikram Sarabhai argued that space technology should solve real problems on Earth. That vision shaped India's space program into a practical national platform for communication, weather, and science.", highlights: ['ISRO inspiration', 'Space applications', 'Institution builder'], stats: [{ label: 'Field', value: 'Space' }, { label: 'Role', value: 'Visionary' }, { label: 'Legacy', value: 'Institution builder' }] },
        { id: 'homi-bhabha', category: 'physics', image: scienceAsset('homi-bhabha.png'), name: 'Homi J. Bhabha', subtitle: 'Architect of nuclear science', achievement: 'Founded major Indian research institutions.', contribution: 'Built long-term scientific capacity in physics and atomic research.', story: "Homi J. Bhabha helped establish a strong scientific foundation through TIFR and other research efforts. His work strengthened India's capacity in physics, energy, and advanced research.", highlights: ['TIFR founder', 'Atomic research', 'Scientific institution builder'], stats: [{ label: 'Field', value: 'Physics' }, { label: 'Focus', value: 'Research ecosystem' }, { label: 'Legacy', value: 'Foundational leader' }] },
        { id: 'janaki-ammal', category: 'biology', image: scienceAsset('janaki-ammal.png'), name: 'Janaki Ammal', subtitle: 'Botanist and cytogeneticist', achievement: 'Advanced plant breeding and biodiversity research.', contribution: 'Improved understanding of Indian flora and agricultural genetics.', story: 'Janaki Ammal became a pioneering voice in botany and cytogenetics. Her work on plants, chromosomes, and biodiversity helped frame a more scientific approach to agriculture and conservation.', highlights: ['Botany pioneer', 'Plant genetics', 'Biodiversity research'], stats: [{ label: 'Field', value: 'Biology' }, { label: 'Focus', value: 'Plants' }, { label: 'Legacy', value: 'Trailblazing researcher' }] },
        { id: 'ms-swaminathan', category: 'agriculture', image: scienceAsset('ms-swaminathan.png'), name: 'M. S. Swaminathan', subtitle: 'Green Revolution leader', achievement: 'Helped transform food security in India.', contribution: 'Improved crop productivity and agricultural resilience.', story: "M. S. Swaminathan played a defining role in India's Green Revolution. His research and advocacy improved agricultural output and made food security a central national priority.", highlights: ['Green Revolution', 'Food security', 'Crop science'], stats: [{ label: 'Field', value: 'Agriculture' }, { label: 'Focus', value: 'Crop systems' }, { label: 'Legacy', value: 'Food security' }] },
        { id: 'srinivasa-ramanujan', category: 'mathematics', image: scienceAsset('srinivas-ramanujan.png'), name: 'Srinivasa Ramanujan', subtitle: 'Mathematical prodigy', achievement: 'Expanded number theory with deep new identities.', contribution: 'Left a lasting mark on pure mathematics and analytic number theory.', story: "Srinivasa Ramanujan's formulas and insights continue to influence mathematics worldwide. His work remains a reminder that original thinking can emerge far from established centers of power.", highlights: ['Number theory', 'Infinite series', 'Global mathematics icon'], stats: [{ label: 'Field', value: 'Mathematics' }, { label: 'Style', value: 'Pure insight' }, { label: 'Legacy', value: 'International influence' }] }
    ];

    const timelineData = [
        { id: 'raman-effect', category: 'physics', year: '1928', title: 'Raman Effect discovered', summary: 'A landmark physics breakthrough in light scattering.', detail: 'C. V. Raman and K. S. Krishnan showed that light can change wavelength when it scatters through a medium. The result became a defining achievement for Indian science and a foundation for spectroscopy.' },
        { id: 'tifr-founded', category: 'physics', year: '1945', title: 'TIFR is founded', summary: 'A leading center for advanced Indian research takes shape.', detail: 'Homi J. Bhabha helped establish the Tata Institute of Fundamental Research, creating a long-term home for physics, mathematics, and broader scientific inquiry.' },
        { id: 'isro-founded', category: 'space', year: '1969', title: 'ISRO is founded', summary: 'India organizes a national space program for satellites and launch systems.', detail: "The Indian Space Research Organisation brought together launch, satellite, and research efforts under one national mission. It became the backbone of India's modern space capability." },
        { id: 'aryabhata-launch', category: 'space', year: '1975', title: 'Aryabhata enters orbit', summary: 'India launches its first satellite and steps into the space age.', detail: "Aryabhata marked the country's first successful satellite mission and proved that India could design, build, and launch hardware for space exploration." },
        { id: 'mangalyaan-launch', category: 'space', year: '2013', title: 'Mangalyaan launches', summary: 'The Mars Orbiter Mission earns global attention.', detail: 'Mangalyaan demonstrated precise interplanetary engineering and efficient mission design. Its success became a symbol of Indian scientific discipline and ambition.' },
        { id: 'chandrayaan-3-landing', category: 'space', year: '2023', title: 'Chandrayaan-3 lands on the Moon', summary: 'India completes a historic soft landing near the lunar south pole.', detail: 'Chandrayaan-3’s landing created a defining scientific moment. The mission combined robotics, navigation, and lander control to achieve a feat that resonated across the world.' },
        { id: 'aditya-l1-orbit', category: 'space', year: '2024', title: 'Aditya-L1 reaches orbit', summary: 'India turns its focus toward the Sun and space weather.', detail: "Aditya-L1 helps study the Sun's corona, winds, and solar activity from the L1 vantage point. It expanded India's portfolio from planetary exploration to solar science." }
    ];

    const categoryLabels = {
        all: 'All',
        space: 'Space',
        physics: 'Physics',
        medicine: 'Medicine',
        agriculture: 'Agriculture',
        mathematics: 'Mathematics',
        biology: 'Biology'
    };

    let activeFilter = 'all';
    let activeTimelineId = timelineData[0].id;
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    renderStats();
    renderIsroCards();
    renderTimeline();
    renderTimelineDetail(timelineData[0]);
    setActiveTimelineButton(timelineGrid.querySelector(`[data-science-timeline-id="${timelineData[0].id}"]`));
    renderScientists();
    setActiveFilterButton(activeFilter);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.getAttribute('data-science-filter') || 'all';
            setActiveFilterButton(activeFilter);
            renderScientists();
        });
    });

    searchInput.addEventListener('input', () => {
        renderScientists();
    });

    timelineGrid.addEventListener('click', event => {
        const button = event.target.closest('[data-science-timeline-id]');
        if (!button) return;

        activeTimelineId = button.getAttribute('data-science-timeline-id') || timelineData[0].id;
        const milestone = timelineData.find(item => item.id === activeTimelineId) || timelineData[0];
        setActiveTimelineButton(button);
        renderTimelineDetail(milestone);
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', event => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
        }
    });

    function renderStats() {
        statsGrid.innerHTML = statsData.map(stat => `
            <article class="science-stat-card glass-card">
                <span class="science-stat-label">${stat.label}</span>
                <strong class="science-stat-value">${stat.value}</strong>
                <p class="science-stat-detail">${stat.detail}</p>
            </article>
        `).join('');
    }

    function renderIsroCards() {
        isroGrid.innerHTML = isroData.map(item => `
            <article class="science-isro-card glass-card" data-mission-type="${item.category}">
                <div class="science-isro-card-top">
                    <div class="science-mission-avatar science-avatar-frame" aria-hidden="true">
                        <img class="science-avatar-image science-avatar-image-contain" src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
                    </div>
                    <div class="science-isro-card-head">
                        <span class="science-badge ${item.category}">${categoryLabels[item.category] || 'Space'}</span>
                        <span class="science-mission-year">${item.year}</span>
                    </div>
                </div>
                <h3>${item.title}</h3>
                <p class="science-mission-summary">${item.summary}</p>
                <p class="science-mission-contribution">${item.contribution}</p>
                <div class="science-chip-row">${item.highlights.map(highlight => `<span class="science-chip">${highlight}</span>`).join('')}</div>
            </article>
        `).join('');
    }

    function renderScientists() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredScientists = scientistData.filter(scientist => {
            const matchesFilter = activeFilter === 'all' || scientist.category === activeFilter;
            const matchesSearch = !query || [scientist.name, scientist.subtitle, scientist.achievement, scientist.contribution, scientist.story, scientist.category, ...(scientist.highlights || [])].join(' ').toLowerCase().includes(query);
            return matchesFilter && matchesSearch;
        });

        scientistGrid.innerHTML = '';

        if (filteredScientists.length === 0) {
            scientistGrid.innerHTML = `
                <div class="science-empty-state glass-card">
                    <h3>No scientists found</h3>
                    <p>Try a different search term or switch back to All Fields.</p>
                    <button type="button" class="btn btn-primary" id="science-reset-filters">Show All Scientists</button>
                </div>
            `;

            document.getElementById('science-reset-filters')?.addEventListener('click', () => {
                searchInput.value = '';
                activeFilter = 'all';
                setActiveFilterButton('all');
                renderScientists();
            });
            return;
        }

        filteredScientists.forEach(scientist => {
            const card = document.createElement('article');
            card.className = 'science-scientist-card glass-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${scientist.name}`);
            card.setAttribute('data-category', scientist.category);
            card.setAttribute('data-scientist-id', scientist.id);

            card.innerHTML = `
                <div class="science-scientist-card-head">
                    <div class="science-scientist-avatar science-avatar-frame ${scientist.category} ${scientist.id}" aria-hidden="true">
                        <img class="science-avatar-image science-avatar-image-cover" src="${scientist.image}" alt="${scientist.name}" loading="lazy" decoding="async">
                    </div>
                    <div class="science-scientist-title">
                        <span class="science-badge ${scientist.category}">${categoryLabels[scientist.category] || scientist.category}</span>
                        <h3>${scientist.name}</h3>
                        <p>${scientist.subtitle}</p>
                    </div>
                </div>
                <p class="science-scientist-achievement">${scientist.achievement}</p>
                <p class="science-scientist-contribution">${scientist.contribution}</p>
                <div class="science-chip-row">${scientist.highlights.map(item => `<span class="science-chip">${item}</span>`).join('')}</div>
                <div class="science-scientist-footer">
                    <span class="science-card-note">Click to explore achievements</span>
                    <button type="button" class="btn btn-secondary science-view-btn">Open Details</button>
                </div>
            `;

            card.addEventListener('click', () => openModal(scientist, card));
            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(scientist, card);
                }
            });

            scientistGrid.appendChild(card);
        });
    }

    function renderTimeline() {
        timelineGrid.innerHTML = timelineData.map(item => `
            <button type="button" class="science-timeline-item glass-card ${item.category}" data-science-timeline-id="${item.id}" aria-pressed="false">
                <span class="timeline-year">${item.year}</span>
                <span class="science-badge ${item.category}">${categoryLabels[item.category] || 'Science'}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
            </button>
        `).join('');
    }

    function renderTimelineDetail(item) {
        timelineDetail.innerHTML = `
            <div class="timeline-detail-head">
                <span class="science-badge ${item.category}">${categoryLabels[item.category] || 'Science'}</span>
                <span class="timeline-detail-year">${item.year}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
        `;
    }

    function setActiveFilterButton(filterValue) {
        filterButtons.forEach(btn => {
            const isActive = (btn.getAttribute('data-science-filter') || 'all') === filterValue;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function setActiveTimelineButton(activeButton) {
        const buttons = timelineGrid.querySelectorAll('[data-science-timeline-id]');
        buttons.forEach(btn => {
            const isActive = activeButton ? btn === activeButton : false;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function openModal(scientist, trigger) {
        modalCategory.className = `science-badge ${scientist.category}`;
        modalCategory.textContent = categoryLabels[scientist.category] || scientist.category;
        modalTitle.textContent = scientist.name;
        modalSubtitle.textContent = scientist.subtitle;
        modalStory.textContent = scientist.story;

        modalHighlights.innerHTML = scientist.highlights.map(item => `<li>${item}</li>`).join('');
        modalStats.innerHTML = scientist.stats.map(stat => `
            <div class="modal-stat">
                <span class="modal-stat-label">${stat.label}</span>
                <span class="modal-stat-value">${stat.value}</span>
            </div>
        `).join('');

        modalAvatar.className = `science-modal-avatar science-avatar-frame ${scientist.category} ${scientist.id}`;
        modalAvatar.innerHTML = `<img class="science-avatar-image science-avatar-image-cover" src="${scientist.image}" alt="${scientist.name}" loading="lazy" decoding="async">`;

        window.ModalUtils.openModal({
            modalEl: modal,
            triggerEl: trigger || document.activeElement,
            onOpen: () => {
                isModalOpen = true;
            },
            onClose: () => {
                isModalOpen = false;
            }
        });
    }

    function closeModal() {
        window.ModalUtils.closeModal(modal);
    }
}
