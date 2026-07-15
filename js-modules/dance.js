function initDancePage() {
    const danceAsset = fileName => `assets/dances/${encodeURI(fileName)}`;
    const danceGrid = document.getElementById('dance-grid');
    const searchInput = document.getElementById('dance-search-input');
    const stateSelect = document.getElementById('dance-state-filter');
    const typeButtons = document.querySelectorAll('[data-dance-filter]');
    const videoGrid = document.getElementById('dance-video-grid');
    const quizForm = document.getElementById('dance-quiz-form');
    const quizQuestionsGrid = document.getElementById('dance-quiz-questions');
    const quizResult = document.getElementById('dance-quiz-result');
    const quizReset = document.getElementById('dance-quiz-reset');
    const modal = document.getElementById('dance-modal');
    const modalClose = document.getElementById('dance-modal-close');
    const modalVisual = document.getElementById('dance-modal-visual');
    const modalBadge = document.getElementById('dance-modal-badge');
    const modalTitle = document.getElementById('dance-modal-title');
    const modalSubtitle = document.getElementById('dance-modal-subtitle');
    const modalOrigin = document.getElementById('dance-modal-origin');
    const modalMovement = document.getElementById('dance-modal-movement');
    const modalCostume = document.getElementById('dance-modal-costume');
    const modalFeatures = document.getElementById('dance-modal-features');
    const modalNotes = document.getElementById('dance-modal-notes');

    if (!danceGrid || !searchInput || !stateSelect || !typeButtons.length || !videoGrid || !quizForm || !quizQuestionsGrid || !quizResult || !quizReset || !modal || !modalClose) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const danceTypeConfig = {
        classical: {
            label: 'Classical',
            badge: 'Classical heritage',
            accent: 'classical'
        },
        folk: {
            label: 'Folk',
            badge: 'Folk celebration',
            accent: 'folk'
        }
    };

    const danceData = [
        {
            id: 'bharatanatyam',
            type: 'classical',
            name: 'Bharatanatyam',
            state: 'Tamil Nadu',
            region: 'Tamil temple tradition',
            image: danceAsset('bharatanatyam.png'),
            monogram: 'BN',
            description: 'A precise classical form rooted in temple heritage, sculpture-like poses, and rhythmic footwork.',
            features: ['Anga shuddha', 'Temple devotion', 'Hand gestures'],
            movement: 'Sharp lines, sculpted poses, and fast rhythmic passages.',
            costume: 'Silk sari costumes, pleated fans, temple jewelry, and expressive eye makeup.',
            music: 'Nattuvangam, mridangam, and Carnatic vocal accompaniment.',
            significance: 'One of India\'s most recognized classical dance traditions and a global symbol of Indian performance art.'
        },
        {
            id: 'kathak',
            type: 'classical',
            name: 'Kathak',
            state: 'Uttar Pradesh / North India',
            region: 'Court and temple storytelling',
            image: danceAsset('kathak.jpg'),
            monogram: 'KT',
            description: 'A graceful storytelling dance known for pirouettes, rhythmic patterns, and dramatic abhinaya.',
            features: ['Gat-bhav', 'Chakkars', 'Storytelling'],
            movement: 'Spins, intricate footwork, and fluid gestures that move from lyric to percussive.',
            costume: 'Anarkali-style costumes, ankle bells, and jewelry that highlight turning movement.',
            music: 'Tabla, sarangi, and khayal or thumri melodies.',
            significance: 'A bridge between temple storytelling and north Indian court aesthetics.'
        },
        {
            id: 'odissi',
            type: 'classical',
            name: 'Odissi',
            state: 'Odisha',
            region: 'Jagannath temple culture',
            image: danceAsset('odissi.png'),
            monogram: 'OD',
            description: 'A lyrical dance famous for its curved torso, devotional mood, and statuesque elegance.',
            features: ['Tribhangi stance', 'Temple imagery', 'Lyrical grace'],
            movement: 'Soft torso bends, expressive wrists, and flowing transitions between stillness and motion.',
            costume: 'Silver jewelry, woven silk, and a distinctive waist belt and headpiece.',
            music: 'Odissi percussion and melodic vocal support with strong devotional cadence.',
            significance: 'A deeply devotional classical form with a distinctive sculptural profile.'
        },
        {
            id: 'kathakali',
            type: 'classical',
            name: 'Kathakali',
            state: 'Kerala',
            region: 'Story drama theatre',
            image: danceAsset('kathakali.png'),
            monogram: 'KK',
            description: 'A dramatic classical dance-theatre tradition known for painted faces, bold gestures, and epic stories.',
            features: ['Face paint', 'Mudras', 'Epic narration'],
            movement: 'Powerful, controlled gestures and expressive eye work that reads like living theatre.',
            costume: 'Layered skirts, towering headgear, and elaborate green or red facial makeup.',
            music: 'Chenda and maddalam percussion with vocal narration.',
            significance: 'One of the most theatrical forms in India, combining dance, drama, and ritual display.'
        },
        {
            id: 'kuchipudi',
            type: 'classical',
            name: 'Kuchipudi',
            state: 'Andhra Pradesh',
            region: 'Village performance tradition',
            image: danceAsset('kuchipudi.png'),
            monogram: 'KU',
            description: 'A brisk classical form that blends speed, expressiveness, and dramatic stage presence.',
            features: ['Fast transitions', 'Dance-drama', 'Expressive face work'],
            movement: 'Quick footwork, light leaps, and lively storytelling with comic and devotional threads.',
            costume: 'Bright silk outfits with ornamented pleats and expressive stage makeup.',
            music: 'Carnatic music with percussion and vocal support.',
            significance: 'Known for its lively theatricality and the balance between grace and tempo.'
        },
        {
            id: 'manipuri',
            type: 'classical',
            name: 'Manipuri',
            state: 'Manipur',
            region: 'Vaishnav devotional tradition',
            image: danceAsset('manipuri.png'),
            monogram: 'MA',
            description: 'A gentle and devotional classical style with circular movement and restrained elegance.',
            features: ['Circular patterns', 'Soft steps', 'Devotional mood'],
            movement: 'Floating, circular phrases and restrained upper-body motion.',
            costume: 'Cylindrical skirts, translucent fabrics, and floral crowns in performance pieces.',
            music: 'Pung percussion, vocals, and devotional melodies.',
            significance: 'A tranquil classical tradition shaped by devotion and community ritual.'
        },
        {
            id: 'mohiniyattam',
            type: 'classical',
            name: 'Mohiniyattam',
            state: 'Kerala',
            region: 'Temple and court heritage',
            image: danceAsset('mohiniyattam.png'),
            monogram: 'MO',
            description: 'A lyrical dance form associated with soft swaying motion and feminine elegance.',
            features: ['Soft sways', 'Lasya', 'Temple grace'],
            movement: 'Wave-like torso motion, gentle footwork, and composed facial expression.',
            costume: 'White and gold kasavu sarees with jasmine flowers and subtle jewelry.',
            music: 'Carnatic music with soft percussion and melodic support.',
            significance: 'Celebrated for its flowing beauty and serene classical expression.'
        },
        {
            id: 'sattriya',
            type: 'classical',
            name: 'Sattriya',
            state: 'Assam',
            region: 'Monastic tradition',
            image: danceAsset('sattriya.png'),
            monogram: 'SA',
            description: 'A classical form from Assamese monasteries that combines devotion, narrative, and disciplined rhythm.',
            features: ['Monastic roots', 'Devotional storytelling', 'Rhythmic discipline'],
            movement: 'Structured steps, devotional gestures, and controlled storytelling sequences.',
            costume: 'Assamese traditional drapes, ornate jewelry, and stage-specific fabrics.',
            music: 'Khol percussion, cymbals, and Vaishnav devotional song.',
            significance: 'A living classical heritage linked to Assamese religious and cultural institutions.'
        },
        {
            id: 'bihu',
            type: 'folk',
            name: 'Bihu',
            state: 'Assam',
            region: 'Spring harvest celebration',
            image: danceAsset('bihu.png'),
            monogram: 'BI',
            description: 'An energetic folk dance that celebrates harvest, youth, and the arrival of spring.',
            features: ['Harvest joy', 'Fast rhythm', 'Community chorus'],
            movement: 'Quick steps, hip-driven rhythm, and joyful partner movement.',
            costume: 'Bright mekhela chadors with red accents and festival ornaments.',
            music: 'Dhol, pepa, and lively Assamese songs.',
            significance: 'A beloved Assamese festival dance that brings villages and cities into the same celebration.'
        },
        {
            id: 'garba',
            type: 'folk',
            name: 'Garba',
            state: 'Gujarat',
            region: 'Navratri circles',
            image: danceAsset('garba.png'),
            monogram: 'GA',
            description: 'A devotional circle dance performed during Navratri with graceful turns and collective rhythm.',
            features: ['Circular patterns', 'Festival devotion', 'Hand claps'],
            movement: 'Rhythmic steps around a center point with coordinated claps and turns.',
            costume: 'Colorful chaniya cholis, embroidered mirrors, and festive jewelry.',
            music: 'Dhol, percussion, and devotional songs.',
            significance: 'One of the most recognizable festival dances in western India.'
        },
        {
            id: 'ghoomar',
            type: 'folk',
            name: 'Ghoomar',
            state: 'Rajasthan',
            region: 'Desert palace and village tradition',
            image: danceAsset('ghoomar.png'),
            monogram: 'GH',
            description: 'A swirling folk dance known for wide spins, elegant lines, and celebratory motion.',
            features: ['Spins', 'Festive grace', 'Palace heritage'],
            movement: 'Circular spinning and graceful arm movement that creates a flowing silhouette.',
            costume: 'Flared ghagras with mirror work, veils, and elaborate jewelry.',
            music: 'Folk songs and percussion with a regal celebratory tone.',
            significance: 'A strong emblem of Rajasthani identity and festive ceremony.'
        },
        {
            id: 'lavani',
            type: 'folk',
            name: 'Lavani',
            state: 'Maharashtra',
            region: 'Performance and storytelling stage',
            image: danceAsset('lavani.png'),
            monogram: 'LA',
            description: 'A fast folk form that blends powerful rhythm, dramatic expression, and social commentary.',
            features: ['Strong rhythm', 'Expressive performance', 'Powada energy'],
            movement: 'Quick footwork and lively expression with direct audience connection.',
            costume: 'Nauvari sarees, bold jewelry, and stage-ready movement-friendly draping.',
            music: 'Dholki, taal, and energetic sung verses.',
            significance: 'A high-energy Marathi performance tradition with both entertainment and commentary.'
        },
        {
            id: 'bhangra',
            type: 'folk',
            name: 'Bhangra',
            state: 'Punjab',
            region: 'Harvest celebration',
            image: danceAsset('bhangra.png'),
            monogram: 'BH',
            description: 'A high-energy harvest dance defined by jumps, shoulder lifts, and exuberant group rhythm.',
            features: ['Jumps', 'Harvest joy', 'Group energy'],
            movement: 'Explosive jumps, joyful arm patterns, and powerful synchronized steps.',
            costume: 'Vibrant kurta pajamas, phulkari accents, and festive turbans.',
            music: 'Dhol beats and call-and-call celebration songs.',
            significance: 'A global symbol of Punjabi energy and celebratory movement.'
        },
        {
            id: 'chhau',
            type: 'folk',
            name: 'Chhau',
            state: 'Odisha / Jharkhand / West Bengal',
            region: 'Masked martial storytelling',
            image: danceAsset('chhau.png'),
            monogram: 'CH',
            description: 'A powerful dance-theatre form that combines martial movement, masks, and mythic narratives.',
            features: ['Masks', 'Martial movement', 'Mythic stories'],
            movement: 'Acrobatic leaps, stylized combat, and expansive body lines.',
            costume: 'Masks, headgear, and dramatic costumes that support larger-than-life storytelling.',
            music: 'Percussion-led rhythm and village performance ensembles.',
            significance: 'A spectacular regional form that joins ritual, athletics, and folklore.'
        },
        {
            id: 'kalbelia',
            type: 'folk',
            name: 'Kalbelia',
            state: 'Rajasthan',
            region: 'Nomadic desert communities',
            image: danceAsset('kalbelia.png'),
            monogram: 'KA',
            description: 'A serpentine dance famous for its flowing spins and snake-like arm and torso movement.',
            features: ['Snake-like flow', 'Nomadic roots', 'Quick spins'],
            movement: 'Wave-like torso motion, sudden turns, and continuous flowing steps.',
            costume: 'Black flowing skirts embroidered with mirror work and silver ornaments.',
            music: 'Pungi, khanjari, and desert folk melodies.',
            significance: 'A vivid folk tradition tied to Rajasthan\'s nomadic heritage.'
        },
        {
            id: 'pandavani',
            type: 'folk',
            name: 'Pandavani',
            state: 'Chhattisgarh',
            region: 'Epic storytelling performance',
            image: danceAsset('pandavani.png'),
            monogram: 'PA',
            description: 'A narrative folk performance that retells Mahabharata episodes through song, gesture, and drama.',
            features: ['Epic narration', 'Solo storytelling', 'Community memory'],
            movement: 'Narrative gestures, dramatic pauses, and forceful vocal delivery.',
            costume: 'Simple performance dress with accessories that support storytelling presence.',
            music: 'Tambura, manjira, and sung narration.',
            significance: 'A strong oral tradition that keeps epic literature alive in village performance spaces.'
        }
    ];

    function getDanceFallbackLabel(dance) {
        return dance.type === 'classical' ? 'Classical' : 'Folk';
    }

    function getDanceMediaMarkup(dance, variant) {
        const fallbackMarkup = `
            <div class="dance-image-fallback" aria-hidden="true">
                <span class="dance-fallback-monogram">${dance.monogram}</span>
                <span class="dance-fallback-label">${getDanceFallbackLabel(dance)}</span>
            </div>
        `;

        if (!dance.image) {
            return fallbackMarkup;
        }

        const imageClass = variant === 'modal' ? 'dance-modal-image' : 'dance-card-image';
        return `
            <img src="${dance.image}" alt="${dance.name}" loading="lazy" decoding="async" class="${imageClass}">
            ${fallbackMarkup}
        `;
    }

    function syncDanceMediaState(scope) {
        const root = scope || document;
        const mediaContainers = root.querySelectorAll('.dance-card-media, .dance-modal-visual');

        mediaContainers.forEach(container => {
            const img = container.querySelector('img');
            if (!img) {
                container.classList.add('is-missing');
                container.classList.remove('is-loaded');
                return;
            }

            const markLoaded = () => {
                if (img.naturalWidth > 0) {
                    container.classList.add('is-loaded');
                    container.classList.remove('is-missing');
                } else {
                    container.classList.add('is-missing');
                    container.classList.remove('is-loaded');
                }
            };

            if (img.complete) {
                markLoaded();
            } else {
                img.addEventListener('load', markLoaded, { once: true });
                img.addEventListener('error', () => {
                    container.classList.add('is-missing');
                    container.classList.remove('is-loaded');
                }, { once: true });
            }
        });
    }

    const quizQuestions = [
        {
            prompt: 'Which state is Bharatanatyam associated with?',
            options: ['Tamil Nadu', 'Punjab', 'Gujarat'],
            answer: 'Tamil Nadu'
        },
        {
            prompt: 'Is Bihu classical or folk?',
            options: ['Classical', 'Folk', 'Modern'],
            answer: 'Folk'
        },
        {
            prompt: 'Which dance is famous for elaborate makeup and epic storytelling from Kerala?',
            options: ['Kathakali', 'Odissi', 'Lavani'],
            answer: 'Kathakali'
        },
        {
            prompt: 'Garba is most closely associated with which state?',
            options: ['Rajasthan', 'Assam', 'Gujarat'],
            answer: 'Gujarat'
        }
    ];

    const uniqueStates = Array.from(new Set(danceData.map(item => item.state))).sort((a, b) => a.localeCompare(b));

    let activeType = 'all';
    let activeState = 'all';
    let selectedPreviewId = null;
    let quizAnswers = {};
    let quizSubmitted = false;
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    populateStateOptions();
    renderDanceCards();
    renderVideoPreviews();
    renderQuiz();
    setActiveTypeButton('all');

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            activeType = button.getAttribute('data-dance-filter') || 'all';
            setActiveTypeButton(activeType);
            renderDanceCards();
        });
    });

    searchInput.addEventListener('input', () => {
        renderDanceCards();
    });

    stateSelect.addEventListener('change', () => {
        activeState = stateSelect.value || 'all';
        renderDanceCards();
    });

    danceGrid.addEventListener('click', event => {
        const detailsButton = event.target.closest('[data-dance-details]');
        const card = event.target.closest('[data-dance-id]');

        if (detailsButton && card) {
            event.stopPropagation();
            openModal(card.getAttribute('data-dance-id'), detailsButton);
            return;
        }

        if (card) {
            openModal(card.getAttribute('data-dance-id'), card);
        }
    });

    danceGrid.addEventListener('keydown', event => {
        const card = event.target.closest('[data-dance-id]');
        if (!card) return;

        if (event.key === 'Enter' || event.key === ' ') {
            const target = event.target;
            if (target.matches('button, a, input, [role="button"], select')) {
                return;
            }

            event.preventDefault();
            openModal(card.getAttribute('data-dance-id'), card);
        }
    });

    videoGrid.addEventListener('click', event => {
        const previewButton = event.target.closest('[data-dance-preview]');
        if (!previewButton) return;

        const previewId = previewButton.getAttribute('data-dance-preview');
        selectedPreviewId = selectedPreviewId === previewId ? null : previewId;
        renderVideoPreviews();
    });

    quizForm.addEventListener('submit', event => {
        event.preventDefault();
        quizSubmitted = true;

        const score = quizQuestions.reduce((total, question, index) => {
            return total + (quizAnswers[index] === question.answer ? 1 : 0);
        }, 0);

        const total = quizQuestions.length;
        quizResult.innerHTML = `
                <strong>Your score: ${score} / ${total}</strong>
                <p>${score === total ? 'Perfect score. You know your dance heritage beautifully.' : score >= 3 ? 'Strong recall. A quick review will make it even better.' : 'Good start. Revisit the cards above and try again.'}</p>
            `;
        renderQuiz();
    });

    quizReset.addEventListener('click', () => {
        quizAnswers = {};
        quizSubmitted = false;
        quizResult.innerHTML = '';
        renderQuiz();
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

    function populateStateOptions() {
        stateSelect.innerHTML = [
            '<option value="all">All States & Regions</option>',
            ...uniqueStates.map(state => `<option value="${state}">${state}</option>`)
        ].join('');
    }

    function setActiveTypeButton(typeValue) {
        typeButtons.forEach(button => {
            const isActive = (button.getAttribute('data-dance-filter') || 'all') === typeValue;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function renderDanceCards() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredDances = danceData.filter(dance => {
            const matchesType = activeType === 'all' || dance.type === activeType;
            const matchesState = activeState === 'all' || dance.state === activeState;
            const matchesSearch = !query || [
                dance.name,
                dance.state,
                dance.region,
                dance.description,
                dance.movement,
                dance.costume,
                dance.music,
                dance.significance,
                dance.type,
                ...(dance.features || [])
            ].join(' ').toLowerCase().includes(query);

            return matchesType && matchesState && matchesSearch;
        });

        if (filteredDances.length === 0) {
            danceGrid.innerHTML = `
                <div class="dance-empty-state glass-card">
                    <h3>No dances found</h3>
                    <p>Try a different search term or reset the type and state filters.</p>
                    <button type="button" class="btn btn-primary" id="dance-reset-filters">Show All Dances</button>
                </div>
            `;

            document.getElementById('dance-reset-filters')?.addEventListener('click', () => {
                activeType = 'all';
                activeState = 'all';
                searchInput.value = '';
                stateSelect.value = 'all';
                setActiveTypeButton('all');
                renderDanceCards();
            });
            return;
        }

        danceGrid.innerHTML = filteredDances.map(dance => {
            const typeConfig = danceTypeConfig[dance.type];
            return `
                <article class="dance-card glass-card ${dance.type}" tabindex="0" role="button" data-dance-id="${dance.id}" aria-label="View details for ${dance.name}">
                    <div class="dance-card-media ${dance.type}">
                        ${getDanceMediaMarkup(dance, 'card')}
                    </div>
                    <div class="dance-card-body">
                        <div class="dance-card-topline">
                            <span class="dance-badge ${dance.type}">${typeConfig.label}</span>
                            <span class="dance-state-chip">${dance.state}</span>
                        </div>
                        <h3>${dance.name}</h3>
                        <p class="dance-card-region">${dance.region}</p>
                        <p class="dance-card-description">${dance.description}</p>
                        <div class="dance-feature-chip-row">
                            ${dance.features.map(feature => `<span class="dance-chip">${feature}</span>`).join('')}
                        </div>
                        <div class="dance-card-footer">
                            <span class="dance-card-note">Open for costume and movement details</span>
                            <button type="button" class="btn btn-secondary dance-details-btn" data-dance-details>View Details</button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        syncDanceMediaState(danceGrid);
    }

    function renderVideoPreviews() {
        const previewData = [
            {
                id: 'bharatanatyam',
                title: 'Bharatanatyam Adavu Sequence',
                type: 'classical',
                note: 'Video preview placeholder',
                description: 'Footwork and mudra practice from the Tamil classical tradition.'
            },
            {
                id: 'garba',
                title: 'Garba Circle Preview',
                type: 'folk',
                note: 'Video preview placeholder',
                description: 'A festive circle pattern built around hand-claps and rhythmic turns.'
            },
            {
                id: 'bihu',
                title: 'Bihu Festival Motion',
                type: 'folk',
                note: 'Video preview placeholder',
                description: 'Spring energy from Assam with quick steps and bright percussion.'
            }
        ];

        videoGrid.innerHTML = previewData.map(preview => {
            const isSelected = selectedPreviewId === preview.id;

            return `
                <article class="dance-video-card glass-card ${preview.type} ${isSelected ? 'is-selected' : ''}">
                    <div class="dance-video-stage ${preview.type}" aria-hidden="true">
                        <span class="dance-video-label">${preview.note}</span>
                        <strong>${preview.title}</strong>
                        <p>${preview.description}</p>
                    </div>
                    <div class="dance-video-meta">
                        <span class="dance-badge ${preview.type}">${danceTypeConfig[preview.type].label}</span>
                        <button type="button" class="dance-preview-btn" data-dance-preview="${preview.id}" aria-pressed="${String(isSelected)}" aria-label="${isSelected ? 'Remove preview selection for ' + preview.title : 'Select preview for ' + preview.title}">
                            <span class="dance-preview-icon" aria-hidden="true">${isSelected ? '❚❚' : '▶'}</span>
                            <span>${isSelected ? 'Preview selected' : 'Play preview'}</span>
                        </button>
                    </div>
                    <div class="dance-video-status" aria-live="polite">${isSelected ? 'Preview selected' : 'Tap play to highlight this video placeholder'}</div>
                </article>
            `;
        }).join('');
    }

    function renderQuiz() {
        quizQuestionsGrid.innerHTML = quizQuestions.map((question, index) => {
            const selectedAnswer = quizAnswers[index];
            const questionClass = quizSubmitted
                ? (selectedAnswer === question.answer ? 'is-correct' : 'is-incorrect')
                : '';

            return `
                <fieldset class="dance-quiz-question glass-card ${questionClass}">
                    <legend>
                        <span class="dance-quiz-number">0${index + 1}</span>
                        <span>${question.prompt}</span>
                    </legend>
                    <div class="dance-quiz-options" role="radiogroup" aria-label="${question.prompt}">
                        ${question.options.map(option => {
                const optionId = `dance-quiz-${index}-${option.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                const isSelected = selectedAnswer === option;
                const isCorrect = quizSubmitted && option === question.answer;
                const isWrong = quizSubmitted && isSelected && option !== question.answer;
                return `
                                <label class="dance-quiz-option ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-incorrect' : ''}" for="${optionId}">
                                    <input type="radio" id="${optionId}" name="dance-question-${index}" value="${option}" ${isSelected ? 'checked' : ''}>
                                    <span>${option}</span>
                                </label>
                            `;
            }).join('')}
                    </div>
                    ${quizSubmitted ? `<p class="dance-question-feedback">${selectedAnswer === question.answer ? 'Correct answer picked.' : `Correct answer: ${question.answer}`}</p>` : ''}
                </fieldset>
            `;
        }).join('');

        quizQuestionsGrid.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', event => {
                const match = event.target.name.match(/dance-question-(\d+)/);
                if (!match) return;

                quizAnswers[Number(match[1])] = event.target.value;
                if (quizSubmitted) {
                    const score = quizQuestions.reduce((total, question, index) => {
                        return total + (quizAnswers[index] === question.answer ? 1 : 0);
                    }, 0);
                    const total = quizQuestions.length;
                    quizResult.innerHTML = `
                        <strong>Your score: ${score} / ${total}</strong>
                        <p>${score === total ? 'Perfect score. You know your dance heritage beautifully.' : score >= 3 ? 'Strong recall. A quick review will make it even better.' : 'Good start. Revisit the cards above and try again.'}</p>
                    `;
                    renderQuiz();
                }
            });
        });
    }

    function openModal(danceId, trigger) {
        const dance = danceData.find(item => item.id === danceId);
        if (!dance) return;

        lastFocusedTrigger = trigger || document.activeElement;
        isModalOpen = true;

        modalVisual.className = `dance-modal-visual ${dance.type}`;
        modalVisual.innerHTML = getDanceMediaMarkup(dance, 'modal');
        modalBadge.className = `dance-badge ${dance.type}`;
        modalBadge.textContent = danceTypeConfig[dance.type].label;
        modalTitle.textContent = dance.name;
        modalSubtitle.textContent = `${dance.state} | ${dance.region}`;
        modalOrigin.textContent = dance.significance;
        modalMovement.textContent = dance.movement;
        modalCostume.textContent = `${dance.costume} Music and stage rhythm: ${dance.music}`;
        modalFeatures.innerHTML = dance.features.map(feature => `<span class="dance-chip">${feature}</span>`).join('');
        modalNotes.textContent = dance.description;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        syncDanceMediaState(modalVisual);

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

        if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
            requestAnimationFrame(() => {
                lastFocusedTrigger.focus();
            });
        }
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
}
