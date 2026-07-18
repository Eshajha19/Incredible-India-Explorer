function initSportsPage() {
    const athleteGrid = document.getElementById('sports-athlete-grid');
    const searchInput = document.getElementById('sports-search-input');
    const filterButtons = document.querySelectorAll('[data-sports-filter]');
    const timelineGrid = document.getElementById('sports-timeline');
    const timelineDetail = document.getElementById('sports-timeline-detail');
    const modal = document.getElementById('sports-modal');
    const modalClose = document.getElementById('sports-modal-close');
    const modalAvatar = document.getElementById('sports-modal-avatar');
    const modalCategory = document.getElementById('sports-modal-category');
    const modalTitle = document.getElementById('sports-modal-title');
    const modalSubtitle = document.getElementById('sports-modal-subtitle');
    const modalStory = document.getElementById('sports-modal-story');
    const modalHighlights = document.getElementById('sports-modal-highlights');
    const modalStats = document.getElementById('sports-modal-stats');
    const sportsSection = document.getElementById('sports-athletes-section');

    if (!athleteGrid || !searchInput || !filterButtons.length || !timelineGrid || !timelineDetail || !modal || !modalClose) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const athleteData = [
        {
            id: 'sachin-tendulkar',
            category: 'cricket',
            name: 'Sachin Tendulkar',
            subtitle: 'Master Blaster',
            image: 'assets/sports/sachin-tendulkar.png',
            summary: 'A benchmark for longevity, timing, and calm under pressure.',
            story: 'Sachin Tendulkar became the face of Indian batting for more than two decades. His records, consistency, and composure helped turn cricket into a shared national passion.',
            highlights: ['200 Test matches', '2011 World Cup winner', 'Most international runs'],
            stats: [
                { label: 'Role', value: 'Top-order batter' },
                { label: 'Legacy', value: 'Cricket icon' },
                { label: 'Era', value: '1989-2013' }
            ]
        },
        {
            id: 'ms-dhoni',
            category: 'cricket',
            name: 'M. S. Dhoni',
            subtitle: 'Captain Cool',
            image: 'assets/sports/ms-dhoni.png',
            summary: 'A calm leader who delivered India across formats.',
            story: 'M. S. Dhoni guided India to major white-ball titles and became known for sharp decision-making, calm finishing, and a fearless approach to leadership.',
            highlights: ['2007 T20 World Cup', '2011 ODI World Cup', '2013 Champions Trophy'],
            stats: [
                { label: 'Role', value: 'Wicketkeeper-captain' },
                { label: 'Leadership', value: 'Title-winning captain' },
                { label: 'Style', value: 'Finisher' }
            ]
        },
        {
            id: 'harmanpreet-kaur',
            category: 'cricket',
            name: 'Harmanpreet Kaur',
            subtitle: 'Modern match-winner',
            image: 'assets/sports/harmanpreet-kaur.png',
            summary: 'An aggressive leader shaping the next era of Indian women’s cricket.',
            story: 'Harmanpreet Kaur is one of the most influential voices in Indian women’s cricket. Her power hitting and leadership have helped expand the sport’s visibility and ambition.',
            highlights: ['ICC tournament standout', 'India captain', 'Big-match temperament'],
            stats: [
                { label: 'Role', value: 'Batting all-rounder' },
                { label: 'Focus', value: 'Power play leader' },
                { label: 'Impact', value: 'Women’s cricket growth' }
            ]
        },
        {
            id: 'abhinav-bindra',
            category: 'olympics',
            name: 'Abhinav Bindra',
            image: 'assets/sports/abhinav-bindra.png',
            subtitle: 'India’s first individual Olympic gold medalist',
            summary: 'A milestone figure in India’s Olympic story.',
            story: 'At Beijing 2008, Abhinav Bindra won India’s first individual Olympic gold in shooting. That achievement changed the country’s expectations of what was possible in precision sport.',
            highlights: ['2008 Olympic gold', 'World champion shooter', 'Enduring sporting benchmark'],
            stats: [
                { label: 'Sport', value: 'Shooting' },
                { label: 'Gold', value: 'Olympic champion' },
                { label: 'Era', value: '2000s' }
            ]
        },
        {
            id: 'pv-sindhu',
            category: 'olympics',
            name: 'P. V. Sindhu',
            subtitle: 'Badminton trailblazer',
            image: 'assets/sports/pv-sindhu.png',
            summary: 'A consistent medal contender who raised the bar for Indian badminton.',
            story: 'P. V. Sindhu became the first Indian woman to win two Olympic medals. Her speed, discipline, and clutch play turned badminton into a major national success story.',
            highlights: ['Olympic silver and bronze', 'World Championships medalist', 'Elite badminton standard'],
            stats: [
                { label: 'Sport', value: 'Badminton' },
                { label: 'Signature', value: 'Explosive rallies' },
                { label: 'Legacy', value: 'Two-time Olympic medallist' }
            ]
        },
        {
            id: 'neeraj-chopra',
            category: 'olympics',
            name: 'Neeraj Chopra',
            subtitle: 'Javelin pioneer',
            image: 'assets/sports/neeraj-chopra.png',
            summary: 'The athlete who opened a new chapter for Indian athletics.',
            story: 'Neeraj Chopra won Olympic gold in javelin throw and inspired a wave of interest in track and field. His success showed that Indian athletes could dominate in throwing events on the world stage.',
            highlights: ['2021 Olympic gold', 'World championship medal', 'Athletics breakthrough'],
            stats: [
                { label: 'Sport', value: 'Javelin throw' },
                { label: 'Strength', value: 'Explosive power' },
                { label: 'Impact', value: 'Athletics landmark' }
            ]
        },
        {
            id: 'anup-kumar',
            category: 'indigenous',
            name: 'Anup Kumar',
            subtitle: 'Kabaddi leader',
            image: 'assets/sports/anup-kumar.png',
            summary: 'A composed raider and captain who defined modern kabaddi leadership.',
            story: 'Anup Kumar helped kabaddi move from local grounds to national spotlight. His technique, reading of the mat, and leadership made him a reference point for the sport.',
            highlights: ['Pro Kabaddi era star', 'National captain', 'Kabaddi strategist'],
            stats: [
                { label: 'Sport', value: 'Kabaddi' },
                { label: 'Role', value: 'Raider-captain' },
                { label: 'Legacy', value: 'Modern kabaddi icon' }
            ]
        },
        {
            id: 'pardeep-narwal',
            category: 'indigenous',
            name: 'Pardeep Narwal',
            subtitle: 'Record-setting raider',
            image: 'assets/sports/pradeep-narwal.png',
            summary: 'One of kabaddi’s most feared scorers in the league era.',
            story: 'Pardeep Narwal became a symbol of kabaddi’s fast, tactical evolution. His pace and scoring record helped the sport reach a wider audience through televised league play.',
            highlights: ['Record raid totals', 'League standout', 'High-pressure scorer'],
            stats: [
                { label: 'Sport', value: 'Kabaddi' },
                { label: 'Style', value: 'Explosive raids' },
                { label: 'Impact', value: 'Fan favorite' }
            ]
        },
        {
            id: 'uday-deshpande',
            category: 'indigenous',
            name: 'Uday Deshpande',
            subtitle: 'Mallakhamb revivalist',
            image: 'assets/sports/uday-deshpande.png',
            summary: 'A major figure in preserving and promoting mallakhamb.',
            story: 'Uday Deshpande has been central to the modern revival of mallakhamb, the traditional strength-and-gymnastics discipline. His work kept a historic indigenous practice visible for new generations.',
            highlights: ['Mallakhamb coach', 'Heritage revival', 'Strength and balance expert'],
            stats: [
                { label: 'Sport', value: 'Mallakhamb' },
                { label: 'Focus', value: 'Heritage training' },
                { label: 'Legacy', value: 'Living tradition' }
            ]
        }
    ];

    const timelineData = [
        {
            id: 'all',
            category: 'all',
            year: '1928',
            title: 'India begins its hockey dynasty',
            summary: 'A gold-medal run in Amsterdam helped establish India as a global hockey force and laid early Olympic sporting pride.',
            detail: 'The 1928 Olympic gold in hockey became an early symbol of Indian sporting excellence. It set the tone for future Olympic ambition and gave the country a durable international identity in team sport.'
        },
        {
            id: 'cricket-1983',
            category: 'cricket',
            year: '1983',
            title: 'World Cup triumph at Lord’s',
            summary: 'India’s first Cricket World Cup win transformed cricket into a national obsession.',
            detail: 'The 1983 World Cup victory under Kapil Dev reshaped Indian cricket forever. It proved that India could beat the best on the world stage and inspired a generation of players and fans.'
        },
        {
            id: 'olympics-2008',
            category: 'olympics',
            year: '2008',
            title: 'First individual Olympic gold',
            summary: 'Abhinav Bindra’s shooting gold in Beijing became a defining Olympic breakthrough.',
            detail: 'Bindra’s gold medal in 2008 changed the emotional ceiling of Indian sport. It showed that an individual Indian athlete could deliver gold at the highest level of global competition.'
        },
        {
            id: 'indigenous-2014',
            category: 'indigenous',
            year: '2014',
            title: 'Kabaddi returns to the mainstream',
            summary: 'The league era brought indigenous sports like kabaddi into living rooms across the country.',
            detail: 'Televised league competition gave kabaddi a fresh audience, bigger stages, and stronger youth participation. The format helped connect a traditional game to a modern sports ecosystem.'
        },
        {
            id: 'olympics-2021',
            category: 'olympics',
            year: '2021',
            title: 'Neeraj Chopra wins javelin gold',
            summary: 'India’s first Olympic athletics gold became a landmark moment for track and field.',
            detail: 'Neeraj Chopra’s gold in javelin throw turned athletics into a real medal pathway for India. The victory inspired broader investment and interest in field events.'
        }
    ];

    let activeFilter = 'all';
    let activeTimelineId = 'all';
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    renderTimeline();
    renderTimelineDetail(timelineData[0]);
    setActiveTimelineButton(timelineGrid.querySelector('[data-timeline-id="all"]'));
    renderAthletes();
    setActiveFilterButton(activeFilter);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.getAttribute('data-sports-filter') || 'all';
            setActiveFilterButton(activeFilter);

            const matchingMilestone = timelineData.find(item => item.category === activeFilter) || timelineData[0];
            activeTimelineId = matchingMilestone.id;
            setActiveTimelineButton(timelineGrid.querySelector(`[data-timeline-id="${matchingMilestone.id}"]`));
            renderTimelineDetail(matchingMilestone);
            renderAthletes();
        });
    });

    searchInput.addEventListener('input', () => {
        renderAthletes();
    });

    timelineGrid.addEventListener('click', (event) => {
        const button = event.target.closest('[data-timeline-filter]');
        if (!button) return;

        const filter = button.getAttribute('data-timeline-filter') || 'all';
        activeTimelineId = button.getAttribute('data-timeline-id') || 'all';
        activeFilter = filter;
        setActiveFilterButton(filter);
        setActiveTimelineButton(button);

        const milestone = timelineData.find(item => item.id === activeTimelineId) || timelineData[0];
        renderTimelineDetail(milestone);
        renderAthletes();
        sportsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
        }
    });

    function setActiveFilterButton(filterValue) {
        filterButtons.forEach(btn => {
            const isActive = (btn.getAttribute('data-sports-filter') || 'all') === filterValue;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function setActiveTimelineButton(activeButton) {
        const buttons = timelineGrid.querySelectorAll('[data-timeline-filter]');
        buttons.forEach(btn => {
            const isActive = activeButton ? btn === activeButton : false;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function renderAthletes() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredAthletes = athleteData.filter(athlete => {
            const matchesFilter = activeFilter === 'all' || athlete.category === activeFilter;
            const matchesSearch = !query || [
                athlete.name,
                athlete.subtitle,
                athlete.summary,
                athlete.story,
                athlete.category,
                ...(athlete.highlights || [])
            ].join(' ').toLowerCase().includes(query);
            return matchesFilter && matchesSearch;
        });

        athleteGrid.innerHTML = '';

        if (filteredAthletes.length === 0) {
            athleteGrid.innerHTML = `
                <div class="sports-empty-state glass-card">
                    <h3>No athletes found</h3>
                    <p>Try a different search term or switch back to All categories.</p>
                    <button type="button" class="btn btn-primary" id="sports-reset-filters">Show All Athletes</button>
                </div>
            `;

            const resetBtn = document.getElementById('sports-reset-filters');
            resetBtn?.addEventListener('click', () => {
                searchInput.value = '';
                activeFilter = 'all';
                activeTimelineId = 'all';
                setActiveFilterButton('all');
                setActiveTimelineButton(timelineGrid.querySelector('[data-timeline-id="all"]'));
                renderTimelineDetail(timelineData[0]);
                renderAthletes();
            });
            return;
        }

        filteredAthletes.forEach(athlete => {
            const card = document.createElement('article');
            card.className = 'athlete-card glass-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${athlete.name}`);
            card.setAttribute('data-category', athlete.category);

            card.innerHTML = `
                <div class="athlete-card-header">
                    <div class="athlete-media ${athlete.category}">
                        <img src="${athlete.image}" alt="${athlete.name}" loading="lazy">
                    </div>
                    <div class="athlete-card-title">
                        <span class="sports-badge ${athlete.category}">${getCategoryLabel(athlete.category)}</span>
                        <h3>${athlete.name}</h3>
                        <p>${athlete.subtitle}</p>
                    </div>
                </div>
                <p class="athlete-summary">${athlete.summary}</p>
                <div class="achievement-chip-row">
                    ${athlete.highlights.map(item => `<span class="achievement-chip">${item}</span>`).join('')}
                </div>
                <div class="athlete-card-footer">
                    <span class="card-sport-note">Click to explore career highlights</span>
                    <button type="button" class="btn btn-secondary athlete-view-btn">View Details</button>
                </div>
            `;

            card.addEventListener('click', () => openModal(athlete, card));
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(athlete, card);
                }
            });

            athleteGrid.appendChild(card);
        });
    }

    function renderTimeline() {
        timelineGrid.innerHTML = '';

        timelineData.forEach(item => {
            const timelineButton = document.createElement('button');
            timelineButton.type = 'button';
            timelineButton.className = `sports-timeline-item glass-card ${item.category}`;
            timelineButton.setAttribute('data-timeline-filter', item.category);
            timelineButton.setAttribute('data-timeline-id', item.id);
            timelineButton.setAttribute('aria-pressed', 'false');
            timelineButton.innerHTML = `
                <span class="timeline-year">${item.year}</span>
                <span class="sports-badge ${item.category}">${getCategoryLabel(item.category)}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
            `;

            timelineGrid.appendChild(timelineButton);
        });
    }

    function renderTimelineDetail(item) {
        timelineDetail.innerHTML = `
            <div class="timeline-detail-head">
                <span class="sports-badge ${item.category}">${getCategoryLabel(item.category)}</span>
                <span class="timeline-detail-year">${item.year}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
        `;
    }

    function openModal(athlete, trigger) {
        modalCategory.className = `sports-badge ${athlete.category}`;
        modalCategory.textContent = getCategoryLabel(athlete.category);
        modalTitle.textContent = athlete.name;
        modalSubtitle.textContent = athlete.subtitle;
        modalStory.textContent = athlete.story;

        modalHighlights.innerHTML = athlete.highlights.map(item => `<li>${item}</li>`).join('');
        modalStats.innerHTML = athlete.stats.map(stat => `
            <div class="modal-stat">
                <span class="modal-stat-label">${stat.label}</span>
                <span class="modal-stat-value">${stat.value}</span>
            </div>
        `).join('');

        modalAvatar.className = `sports-modal-avatar ${athlete.category}`;
        modalAvatar.innerHTML = `<img src="${athlete.image}" alt="${athlete.name}" loading="lazy">`;

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

    function getCategoryLabel(category) {
        if (category === 'cricket') return 'Cricket';
        if (category === 'olympics') return 'Olympics';
        if (category === 'indigenous') return 'Indigenous Sports';
        return 'All';
    }
}
