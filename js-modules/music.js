function initMusicPage() {
    const musicAsset = fileName => `assets/music/${encodeURI(fileName)}`;
    const artistGrid = document.getElementById('music-artist-grid');
    const summaryPanel = document.getElementById('music-genre-summary');
    const searchInput = document.getElementById('music-search-input');
    const tabButtons = document.querySelectorAll('[data-music-tab]');
    const instrumentGrid = document.getElementById('music-instrument-grid');
    const modal = document.getElementById('music-modal');
    const modalClose = document.getElementById('music-modal-close');
    const modalAvatar = document.getElementById('music-modal-avatar');
    const modalBadge = document.getElementById('music-modal-badge');
    const modalTitle = document.getElementById('music-modal-title');
    const modalSubtitle = document.getElementById('music-modal-subtitle');
    const modalContribution = document.getElementById('music-modal-contribution');
    const modalRegion = document.getElementById('music-modal-region');
    const modalInstruments = document.getElementById('music-modal-instruments');
    const modalHighlights = document.getElementById('music-modal-highlights');

    if (!artistGrid || !summaryPanel || !searchInput || !tabButtons.length || !instrumentGrid || !modal || !modalClose) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const genreData = {
        classical: {
            label: 'Classical',
            badge: 'Classical lineages',
            title: 'Ragas, gharanas, and temple traditions',
            description: 'Indian classical music carries rigorous melodic and rhythmic systems that reward patience, improvisation, and deep listening. From khayal and dhrupad to Carnatic kritis, the tradition is defined by disciplined expression and living transmission.',
            accent: 'classical',
            chips: ['Raga structure', 'Concert discipline', 'Guru-shishya lineages']
        },
        folk: {
            label: 'Folk',
            badge: 'Community sound',
            title: 'Songs rooted in seasons, labor, and ritual',
            description: 'Folk music keeps everyday memory alive through harvest songs, devotional choruses, wedding pieces, and oral storytelling. It is direct, regional, and deeply tied to local identity.',
            accent: 'folk',
            chips: ['Oral tradition', 'Festival rhythm', 'Regional voices']
        },
        modern: {
            label: 'Modern',
            badge: 'Contemporary sound',
            title: 'Film, fusion, indie, and global reach',
            description: 'Modern Indian music blends cinema, pop, electronica, and crossover sounds. It connects old melodies to new production, widening the audience for Indian voices across languages and platforms.',
            accent: 'modern',
            chips: ['Film music', 'Fusion bands', 'Streaming culture']
        }
    };

    const artistData = [
        {
            id: 'ravi-shankar',
            genre: 'classical',
            name: 'Ravi Shankar',
            subtitle: 'Sitar maestro and global ambassador',
            image: musicAsset('ravi-shankar.png'),
            region: 'Bengal / Pan-Indian',
            contribution: 'Brought Hindustani classical music to world stages and inspired cross-cultural collaborations.',
            highlights: ['Sitar recital', 'Global concert tours', 'Bridge between traditions'],
            instruments: ['Sitar', 'Tanpura'],
            listeningNote: 'A luminous string tone with spacious improvisation and strong melodic arcs.'
        },
        {
            id: 'ms-subbulakshmi',
            genre: 'classical',
            name: 'M. S. Subbulakshmi',
            subtitle: 'Carnatic vocal legend',
            image: musicAsset('ms-subbulakshmi.png'),
            region: 'Tamil Nadu',
            contribution: 'Turned Carnatic music into a cultural beacon through devotional concerts and precise artistry.',
            highlights: ['Vocal purity', 'Devotional repertoire', 'International acclaim'],
            instruments: ['Voice', 'Veena'],
            listeningNote: 'A devotional clarity that makes every phrase feel serene and exact.'
        },
        {
            id: 'bhimsen-joshi',
            genre: 'classical',
            name: 'Bhimsen Joshi',
            subtitle: 'Khayal master of the Kirana gharana',
            image: musicAsset('bhimsen-joshi.png'),
            region: 'Karnataka / Maharashtra',
            contribution: 'Known for expansive ragas, emotional intensity, and a commanding concert presence.',
            highlights: ['Khayal form', 'Kirana gharana', 'Powerful alaap'],
            instruments: ['Voice', 'Harmonium'],
            listeningNote: 'Long, soaring phrases that build from stillness into thrilling melodic movement.'
        },
        {
            id: 'lalgudi-jayaraman',
            genre: 'classical',
            name: 'Lalgudi Jayaraman',
            subtitle: 'Violin innovator',
            image: musicAsset('lalgudi-jayaraman.png'),
            region: 'Tamil Nadu',
            contribution: 'Reimagined Carnatic violin performance with lyrical phrasing and refined accompaniment.',
            highlights: ['Violin technique', 'Carnatic concerts', 'Composer and teacher'],
            instruments: ['Violin', 'Voice'],
            listeningNote: 'Elegant bowing and ornamentation that make the violin sing like a human voice.'
        },
        {
            id: 'zakir-hussain',
            genre: 'classical',
            name: 'Zakir Hussain',
            subtitle: 'Tabla virtuoso',
            image: musicAsset('zakir-hussain.png'),
            region: 'Mumbai / Global',
            contribution: 'Expanded tabla into both classical and crossover spaces with dazzling rhythmic command.',
            highlights: ['Tabla recitals', 'Rhythmic improvisation', 'Cross-genre collaborations'],
            instruments: ['Tabla', 'Percussion'],
            listeningNote: 'Fast, precise tabla language that turns rhythm into a storytelling art form.'
        },
        {
            id: 'baul-tradition',
            genre: 'folk',
            name: 'Baul voices',
            subtitle: 'Mystic Bengali folk tradition',
            image: musicAsset('baul-voices.png'),
            region: 'West Bengal',
            contribution: 'Carried spiritual poetry and portable instruments across villages and gatherings.',
            highlights: ['Ektara and dotara', 'Mystic lyrics', 'Traveling performers'],
            instruments: ['Ektara', 'Dotara'],
            listeningNote: 'Open-throated, wandering songs built around devotion and philosophical longing.'
        },
        {
            id: 'bihu-ensemble',
            genre: 'folk',
            name: 'Bihu ensembles',
            subtitle: 'Assamese harvest music',
            image: musicAsset('bihu-ensembles.png'),
            region: 'Assam',
            contribution: 'Celebrates spring, community, and the energy of the Bihu festival through dance and song.',
            highlights: ['Harvest celebration', 'Community chorus', 'Dance-driven rhythm'],
            instruments: ['Dhol', 'Pepa'],
            listeningNote: 'Bright percussion and celebratory movement that feels alive from the first beat.'
        },
        {
            id: 'lavani-performers',
            genre: 'folk',
            name: 'Lavani performers',
            subtitle: 'Expressive Marathi folk stagecraft',
            image: musicAsset('lavani-performers.png'),
            region: 'Maharashtra',
            contribution: 'Blends fast rhythms, narrative lyrics, and dramatic performance into a vibrant folk form.',
            highlights: ['Taal-heavy rhythms', 'Story-driven lyrics', 'Stage presence'],
            instruments: ['Dholki', 'Manjira'],
            listeningNote: 'A quick pulse with expressive vocals that keep the performance theatrical and direct.'
        },
        {
            id: 'rajasthani-manganiyar',
            genre: 'folk',
            name: 'Rajasthani Manganiyar',
            subtitle: 'Desert ballad tradition',
            image: musicAsset('Rajasthani-Manganiyar.png'),
            region: 'Rajasthan',
            contribution: 'Preserves devotional, heroic, and pastoral songs through richly ornamented vocal style.',
            highlights: ['Desert ballads', 'Wedding songs', 'Oral heritage'],
            instruments: ['Kamaicha', 'Khartal'],
            listeningNote: 'A resonant, earthy sound shaped by the open desert and the pulse of community gatherings.'
        },
        {
            id: 'pandavani',
            genre: 'folk',
            name: 'Pandavani storytellers',
            subtitle: 'Epic narration from Chhattisgarh',
            image: musicAsset('Pandavani-storytellers.png'),
            region: 'Chhattisgarh',
            contribution: 'Performs Mahabharata episodes through song, gesture, and dramatic oral storytelling.',
            highlights: ['Epic narration', 'Stage storytelling', 'Community memory'],
            instruments: ['Tambura', 'Manjira'],
            listeningNote: 'Narrative singing that moves like theatre, carrying myth, memory, and moral reflection.'
        },
        {
            id: 'ar-rahman',
            genre: 'modern',
            name: 'A. R. Rahman',
            subtitle: 'Composer of a new Indian sound',
            image: musicAsset('ar-rahman.png'),
            region: 'Tamil Nadu / Global',
            contribution: 'Reframed film music with layered production, emotional themes, and global collaborators.',
            highlights: ['Film scoring', 'Fusion textures', 'Award-winning soundtracks'],
            instruments: ['Synths', 'Orchestration'],
            listeningNote: 'Polished, cinematic arrangements that travel from intimate melody to huge emotional release.'
        },
        {
            id: 'lata-mangeshkar',
            genre: 'modern',
            name: 'Lata Mangeshkar',
            subtitle: 'Voice of generations',
            image: musicAsset('Lata-Mangeshkar.png'),
            region: 'Maharashtra / Pan-Indian',
            contribution: 'Defined playback singing for decades with unmatched range, clarity, and emotional reach.',
            highlights: ['Playback era', 'National icon', 'Iconic film songs'],
            instruments: ['Voice', 'Orchestral playback'],
            listeningNote: 'A clear, pure voice that made film melodies feel timeless and intimate.'
        },
        {
            id: 'kishore-kumar',
            genre: 'modern',
            name: 'Kishore Kumar',
            subtitle: 'Playful playback legend',
            image: musicAsset('kishore-kumar.png'),
            region: 'Madhya Pradesh / Mumbai',
            contribution: 'Brought spontaneity, humor, and emotional elasticity to Hindi film music.',
            highlights: ['Expressive playback', 'Versatile performer', 'Era-defining hits'],
            instruments: ['Voice', 'Film arrangement'],
            listeningNote: 'Effortless phrasing and playful tone shifts that make every song feel alive.'
        },
        {
            id: 'shreya-ghoshal',
            genre: 'modern',
            name: 'Shreya Ghoshal',
            subtitle: 'Contemporary playback favorite',
            image: musicAsset('shreya-goshal.png'),
            region: 'West Bengal / Mumbai',
            contribution: 'Represents a new generation of film vocals with precision, warmth, and versatility.',
            highlights: ['Multi-language singing', 'Live performances', 'Modern playback standard'],
            instruments: ['Voice', 'Studio arrangement'],
            listeningNote: 'Controlled, expressive singing that moves cleanly through contemporary film textures.'
        },
        {
            id: 'amit-trivedi',
            genre: 'modern',
            name: 'Amit Trivedi',
            subtitle: 'Indie-fusion composer',
            image: musicAsset('amit-trivedi.png'),
            region: 'Gujarat / Mumbai',
            contribution: 'Bridges indie sensibility and film composition with inventive instrumentation.',
            highlights: ['Indie fusion', 'Fresh arrangements', 'Young audience appeal'],
            instruments: ['Guitar', 'Electronics'],
            listeningNote: 'A hybrid sound that feels experimental while staying deeply melodic.'
        }
    ];

    const instrumentData = [
        {
            name: 'Sitar',
            category: 'String',
            description: 'A resonant long-necked lute associated with Hindustani classical performance and meditative melodic flights.',
            image: musicAsset('sitar.png'),
            accent: 'classical'
        },
        {
            name: 'Tabla',
            category: 'Percussion',
            description: 'A pair of tuned drums that can articulate complex rhythmic cycles with remarkable precision.',
            image: musicAsset('tabla.png'),
            accent: 'folk'
        },
        {
            name: 'Veena',
            category: 'String',
            description: 'A sacred and expressive plucked instrument closely tied to Carnatic music and temple aesthetics.',
            image: musicAsset('veena.png'),
            accent: 'modern'
        },
        {
            name: 'Bansuri',
            category: 'Wind',
            description: 'A bamboo flute whose breathy tone is central to many devotional and classical soundscapes.',
            image: musicAsset('bansuri.png'),
            accent: 'classical'
        },
        {
            name: 'Mridangam',
            category: 'Percussion',
            description: 'The foundational drum of Carnatic ensembles, known for its rich tonal range and speed.',
            image: musicAsset('Mridangam.png'),
            accent: 'folk'
        },
        {
            name: 'Sarangi',
            category: 'String',
            description: 'A bowed instrument admired for its close vocal resemblance and emotional depth in North Indian traditions.',
            image: musicAsset('sarangi.png'),
            accent: 'modern'
        }
    ];

    let activeGenre = 'classical';
    let activeAudioId = null;
    let lastFocusedArtistId = null;
    let lastFocusedTriggerKind = 'card';
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    renderInstruments();
    renderArtists();
    setActiveTab(activeGenre);

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            activeGenre = button.getAttribute('data-music-tab') || 'classical';
            setActiveTab(activeGenre);
            renderArtists();
        });
    });

    searchInput.addEventListener('input', () => {
        renderArtists();
    });

    artistGrid.addEventListener('click', event => {
        const playButton = event.target.closest('[data-music-play]');
        if (playButton) {
            event.stopPropagation();
            const card = playButton.closest('[data-artist-id]');
            const artistId = card?.getAttribute('data-artist-id');
            if (!artistId) return;
            activeAudioId = activeAudioId === artistId ? null : artistId;
            renderArtists();
            return;
        }

        const detailsButton = event.target.closest('[data-music-details]');
        const card = event.target.closest('[data-artist-id]');

        if (detailsButton && card) {
            event.stopPropagation();
            openModal(card.getAttribute('data-artist-id'), detailsButton);
            return;
        }

        if (card) {
            openModal(card.getAttribute('data-artist-id'), card);
        }
    });

    artistGrid.addEventListener('keydown', event => {
        const card = event.target.closest('[data-artist-id]');
        if (!card) return;

        if (event.key === 'Enter' || event.key === ' ') {
            const target = event.target;
            if (target.matches('button, a, input, [role="button"]')) {
                return;
            }

            event.preventDefault();
            openModal(card.getAttribute('data-artist-id'), card);
        }
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (!isModalOpen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            trapModalFocus(event);
        }
    });

    function setActiveTab(tabName) {
        tabButtons.forEach(button => {
            const isActive = (button.getAttribute('data-music-tab') || 'classical') === tabName;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function renderInstruments() {
        instrumentGrid.innerHTML = instrumentData.map(instrument => `
            <article class="music-instrument-card glass-card ${instrument.accent}">
                <div class="music-instrument-visual ${instrument.accent}" aria-hidden="true">
                    <img src="${instrument.image}" alt="${instrument.name}" loading="lazy" decoding="async" class="music-instrument-image">
                </div>
                <div class="music-instrument-body">
                    <span class="music-instrument-badge">${instrument.category}</span>
                    <h3>${instrument.name}</h3>
                    <p>${instrument.description}</p>
                </div>
            </article>
        `).join('');
    }

    function renderArtists() {
        const query = searchInput.value.trim().toLowerCase();
        const activeGenreConfig = genreData[activeGenre];
        const filteredArtists = artistData.filter(artist => {
            const matchesGenre = artist.genre === activeGenre;
            const haystack = [
                artist.name,
                artist.subtitle,
                artist.region,
                artist.contribution,
                artist.listeningNote,
                artist.genre,
                ...(artist.highlights || []),
                ...(artist.instruments || [])
            ].join(' ').toLowerCase();
            const matchesSearch = !query || haystack.includes(query);
            return matchesGenre && matchesSearch;
        });

        summaryPanel.innerHTML = `
            <div class="music-genre-summary-copy">
                <span class="section-badge music-summary-badge">${activeGenreConfig.badge}</span>
                <h3>${activeGenreConfig.title}</h3>
                <p>${activeGenreConfig.description}</p>
                <div class="music-chips">
                    ${activeGenreConfig.chips.map(chip => `<span class="music-chip">${chip}</span>`).join('')}
                </div>
            </div>
            <div class="music-summary-stats" aria-label="Genre summary">
                <div class="music-summary-stat">
                    <strong>${filteredArtists.length}</strong>
                    <span>matching artists</span>
                </div>
                <div class="music-summary-stat">
                    <strong>${artistData.filter(item => item.genre === activeGenre).length}</strong>
                    <span>genre profiles</span>
                </div>
                <div class="music-summary-stat">
                    <strong>${activeGenreConfig.label}</strong>
                    <span>current tab</span>
                </div>
            </div>
        `;

        if (filteredArtists.length === 0) {
            artistGrid.innerHTML = `
                <div class="music-empty-state glass-card">
                    <h3>No artists found</h3>
                    <p>Try a different search term or switch to another music tab.</p>
                    <button type="button" class="btn btn-primary" id="music-reset-search">Show All Artists</button>
                </div>
            `;

            document.getElementById('music-reset-search')?.addEventListener('click', () => {
                searchInput.value = '';
                renderArtists();
            });
            return;
        }

        artistGrid.innerHTML = filteredArtists.map(artist => {
            const isPlaying = activeAudioId === artist.id;

            return `
                <article class="music-artist-card glass-card ${artist.genre} ${isPlaying ? 'is-playing' : ''}" tabindex="0" role="button" data-artist-id="${artist.id}" aria-label="View details for ${artist.name}">
                    <div class="music-artist-card-top">
                        <div class="music-avatar ${artist.genre}" aria-hidden="true">
                            <img src="${artist.image}" alt="${artist.name}" loading="lazy" decoding="async" class="music-avatar-image">
                        </div>
                        <div class="music-artist-title">
                            <span class="music-badge ${artist.genre}">${activeGenreConfig.label}</span>
                            <h3>${artist.name}</h3>
                            <p>${artist.subtitle}</p>
                        </div>
                    </div>
                    <p class="music-artist-contribution">${artist.contribution}</p>
                    <div class="music-meta-row">
                        <span class="music-meta-label">Region / style</span>
                        <span class="music-meta-value">${artist.region}</span>
                    </div>
                    <div class="music-chip-row">
                        ${artist.highlights.map(item => `<span class="music-chip">${item}</span>`).join('')}
                    </div>
                    <div class="music-audio-placeholder" data-audio-state="${isPlaying ? 'playing' : 'paused'}">
                        <button type="button" class="music-play-btn" data-music-play aria-pressed="${isPlaying ? 'true' : 'false'}" aria-label="${isPlaying ? 'Pause sample preview for ' + artist.name : 'Play sample preview for ' + artist.name}">
                            <span class="music-play-icon" aria-hidden="true">${isPlaying ? '❚❚' : '▶'}</span>
                            <span>${isPlaying ? 'Pause preview' : 'Play preview'}</span>
                        </button>
                        <div class="music-audio-copy">
                            <span class="music-audio-label">Audio placeholder</span>
                            <span class="music-audio-status">${isPlaying ? 'Sample preview playing' : artist.listeningNote}</span>
                        </div>
                        <div class="music-audio-bars" aria-hidden="true">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="music-card-footer">
                        <span class="music-card-note">Click for more about the artist</span>
                        <button type="button" class="btn btn-secondary music-details-btn" data-music-details>View Details</button>
                    </div>
                </article>
            `;
        }).join('');

        artistGrid.querySelectorAll('.music-artist-card').forEach(card => {
            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    const target = event.target;
                    if (target.matches('button, a, input, [role="button"]')) {
                        return;
                    }

                    event.preventDefault();
                    openModal(card.getAttribute('data-artist-id'), card);
                }
            });
        });
    }

    function openModal(artistId, trigger) {
        const artist = artistData.find(item => item.id === artistId);
        if (!artist) return;

        const activeGenreConfig = genreData[artist.genre];
        lastFocusedArtistId = artistId;
        lastFocusedTrigger = trigger || document.activeElement;
        lastFocusedTriggerKind = trigger?.matches?.('[data-music-details]') ? 'details' : 'card';
        isModalOpen = true;

        modalAvatar.className = `music-modal-avatar ${artist.genre}`;
        modalAvatar.innerHTML = `<img src="${artist.image}" alt="${artist.name}" loading="lazy" decoding="async" class="music-modal-image">`;
        modalBadge.className = `music-badge ${artist.genre}`;
        modalBadge.textContent = activeGenreConfig.label;
        modalTitle.textContent = artist.name;
        modalSubtitle.textContent = artist.subtitle;
        modalContribution.textContent = artist.contribution;
        modalRegion.textContent = artist.region;
        modalInstruments.innerHTML = artist.instruments.map(item => `<span class="music-chip">${item}</span>`).join('');
        modalHighlights.innerHTML = artist.highlights.map(item => `<li>${item}</li>`).join('');

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modalClose.focus();
        });
    }

    function closeModal() {
        if (!isModalOpen) return;

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;
        renderArtists();
        restoreFocus();
    }

    function trapModalFocus(event) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusableElements.length) return;

        const focusable = Array.from(focusableElements).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function restoreFocus() {
        let focusTarget = null;

        if (lastFocusedArtistId) {
            const selector = lastFocusedTriggerKind === 'details'
                ? `[data-artist-id="${lastFocusedArtistId}"] [data-music-details]`
                : `[data-artist-id="${lastFocusedArtistId}"]`;
            focusTarget = document.querySelector(selector);
        }

        if (!focusTarget && lastFocusedTrigger && document.contains(lastFocusedTrigger)) {
            focusTarget = lastFocusedTrigger;
        }

        if (focusTarget && typeof focusTarget.focus === 'function') {
            requestAnimationFrame(() => {
                focusTarget.focus();
            });
        }
    }
}
