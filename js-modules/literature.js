function initLiteraturePage() {
    const worksGrid = document.getElementById('literature-works-grid');
    const authorsGrid = document.getElementById('literature-authors-grid');
    const ancientGrid = document.getElementById('literature-ancient-grid');
    const statsGrid = document.getElementById('literature-stats-grid');
    const searchInput = document.getElementById('literature-search-input');
    const filterButtons = document.querySelectorAll('[data-literature-filter]');
    const modal = document.getElementById('literature-modal');
    const modalClose = document.getElementById('literature-modal-close');
    const modalAvatar = document.getElementById('literature-modal-avatar');
    const modalBadge = document.getElementById('literature-modal-badge');
    const modalTitle = document.getElementById('literature-modal-title');
    const modalSubtitle = document.getElementById('literature-modal-subtitle');
    const modalStory = document.getElementById('literature-modal-story');
    const modalSignificance = document.getElementById('literature-modal-significance');
    const modalMeta = document.getElementById('literature-modal-meta');
    const modalHighlights = document.getElementById('literature-modal-highlights');

    if (!worksGrid || !authorsGrid || !ancientGrid || !statsGrid || !searchInput || !filterButtons.length || !modal || !modalClose || !modalAvatar || !modalBadge || !modalTitle || !modalSubtitle || !modalStory || !modalSignificance || !modalMeta || !modalHighlights) {
        return;
    }

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.classList.add('is-visible');
    });

    const categoryLabels = {
        ancient: 'Ancient',
        epic: 'Epic',
        poetry: 'Poetry',
        modern: 'Modern',
        regional: 'Regional',
        philosophy: 'Philosophy'
    };

    const collectionLabels = {
        work: 'Literary work',
        author: 'Author',
        ancient: 'Ancient text'
    };

    const literatureImagePaths = {
        works: {
            ramayana: 'assets/literature/works/ramayana.png',
            mahabharata: 'assets/literature/works/mahabharata.png',
            'bhagavad-gita': 'assets/literature/works/bhagvad-gita.png',
            arthashastra: 'assets/literature/works/Arthashastra.png',
            tirukkural: 'assets/literature/works/Tirukkural.png',
            gitanjali: 'assets/literature/works/Gitanjali.png',
            godan: 'assets/literature/works/godan.png',
            'malgudi-days': 'assets/literature/works/Malgudi%20Days.png',
            'discovery-of-india': 'assets/literature/works/The%20Discovery%20of%20India.png',
            "midnights-children": 'assets/literature/works/Midnight%E2%80%99s%20Children.png',
            'train-to-pakistan': 'assets/literature/works/Train%20to%20Pakistan.png',
            abhijnanasakuntalam: 'assets/literature/works/Abhijnanasakuntalam.png',
            panchatantra: 'assets/literature/works/Panchatantra.png'
        },
        authors: {
            'rabindranath-tagore': 'assets/literature/authors/Rabindranath%20Tagore.png',
            'munshi-premchand': 'assets/literature/authors/Munshi%20Premchand.png',
            'rk-narayan': 'assets/literature/authors/R.%20K.%20Narayan.png',
            kalidasa: 'assets/literature/authors/Kalidasa.png',
            valmiki: 'assets/literature/authors/Valmiki.png',
            'ved-vyasa': 'assets/literature/authors/Ved%20Vyasa.png',
            'subramania-bharati': 'assets/literature/authors/Subramania%20Bharati.png',
            'mahadevi-verma': 'assets/literature/authors/Mahadevi%20Verma.png',
            'amrita-pritam': 'assets/literature/authors/Amrita%20Pritam.png',
            'bankim-chandra-chatterjee': 'assets/literature/authors/Bankim%20Chandra%20Chatterjee.png',
            'khushwant-singh': 'assets/literature/authors/Khushwant%20Singh.png',
            'sarojini-naidu': 'assets/literature/authors/Sarojini%20Naidu.png'
        },
        texts: {
            vedas: 'assets/literature/texts/Vedas.png',
            upanishads: 'assets/literature/texts/Upanishads.png',
            'ramayana-ancient': 'assets/literature/texts/Ramayana.png',
            'mahabharata-ancient': 'assets/literature/texts/Mahabharata.png',
            'arthashastra-ancient': 'assets/literature/texts/Arthashastra.png',
            'panchatantra-ancient': 'assets/literature/texts/Panchatantra.png',
            'natya-shastra': 'assets/literature/texts/Natya%20Shastra.png',
            'charaka-samhita': 'assets/literature/texts/Charaka%20Samhita.png',
            'sushruta-samhita': 'assets/literature/texts/Sushruta%20Samhita.png'
        }
    };

    const worksData = [
        {
            id: 'ramayana',
            kind: 'work',
            category: 'epic',
            title: 'Ramayana',
            subtitle: 'Valmiki and the epic tradition',
            language: 'Sanskrit',
            era: 'c. 500 BCE - 100 BCE',
            summary: 'A foundational epic of exile, devotion, and return that shapes ideas of duty and ideal kingship.',
            significance: 'Its moral language and characters remain central to Indian storytelling across regions and languages.',
            highlights: ['Rama and Sita', 'Dharma and exile', 'Pan-Indian retellings'],
            facts: [
                { label: 'Author / tradition', value: 'Valmiki' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient epic' }
            ]
        },
        {
            id: 'mahabharata',
            kind: 'work',
            category: 'epic',
            title: 'Mahabharata',
            subtitle: 'Ved Vyasa and the great war narrative',
            language: 'Sanskrit',
            era: 'c. 400 BCE - 400 CE',
            summary: 'A vast epic of kinship, conflict, philosophy, and political order anchored by the Kurukshetra war.',
            significance: 'Its scale and philosophical range make it a major source for ethics, governance, and cultural memory.',
            highlights: ['Kurukshetra', 'Bhishma and Krishna', 'Epic philosophy'],
            facts: [
                { label: 'Author / tradition', value: 'Ved Vyasa' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient epic' }
            ]
        },
        {
            id: 'bhagavad-gita',
            kind: 'work',
            category: 'philosophy',
            title: 'Bhagavad Gita',
            subtitle: 'Dialogue within the Mahabharata',
            language: 'Sanskrit',
            era: 'c. 2nd century BCE - 2nd century CE',
            summary: 'A compact philosophical dialogue on action, duty, devotion, and self-knowledge.',
            significance: 'It became one of the most studied spiritual texts in India and beyond.',
            highlights: ['Karma yoga', 'Bhakti', 'Inner discipline'],
            facts: [
                { label: 'Tradition', value: 'Mahabharata scripture' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Classical period' }
            ]
        },
        {
            id: 'arthashastra',
            kind: 'work',
            category: 'philosophy',
            title: 'Arthashastra',
            subtitle: 'Kautilya on statecraft and economics',
            language: 'Sanskrit',
            era: 'c. 3rd century BCE',
            summary: 'A systematic treatise on governance, economics, security, and administration.',
            significance: 'It remains a landmark text for political theory and practical statecraft.',
            highlights: ['Administration', 'Strategy', 'Public order'],
            facts: [
                { label: 'Author / tradition', value: 'Kautilya' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Mauryan age' }
            ]
        },
        {
            id: 'tirukkural',
            kind: 'work',
            category: 'regional',
            title: 'Tirukkural',
            subtitle: 'Thiruvalluvar and universal ethics',
            language: 'Tamil',
            era: 'c. 1st century BCE - 5th century CE',
            summary: 'A brief but expansive classic on virtue, wealth, and love in tightly crafted couplets.',
            significance: 'Its aphoristic style made it one of the most beloved ethical texts in Tamil literature.',
            highlights: ['1330 couplets', 'Virtue, wealth, love', 'Enduring moral clarity'],
            facts: [
                { label: 'Author / tradition', value: 'Thiruvalluvar' },
                { label: 'Language', value: 'Tamil' },
                { label: 'Era', value: 'Classical Tamil' }
            ]
        },
        {
            id: 'gitanjali',
            kind: 'work',
            category: 'poetry',
            title: 'Gitanjali',
            subtitle: 'Rabindranath Tagore',
            language: 'Bengali / English',
            era: '1910',
            summary: 'A lyric sequence of devotional and humanist poems that opened Indian poetry to the world stage.',
            significance: 'It helped secure Tagore the Nobel Prize and broadened the reach of Indian modern poetry.',
            highlights: ['Lyric devotion', 'Humanism', 'Global recognition'],
            facts: [
                { label: 'Author', value: 'Rabindranath Tagore' },
                { label: 'Language', value: 'Bengali / English' },
                { label: 'Era', value: 'Early modern' }
            ]
        },
        {
            id: 'godan',
            kind: 'work',
            category: 'modern',
            title: 'Godan',
            subtitle: 'Munshi Premchand',
            language: 'Hindi',
            era: '1936',
            summary: 'A stark novel of peasant hardship, debt, and social inequality in colonial India.',
            significance: 'It stands as one of the strongest social realist novels in Hindi literature.',
            highlights: ['Peasant life', 'Social realism', 'Economic struggle'],
            facts: [
                { label: 'Author', value: 'Munshi Premchand' },
                { label: 'Language', value: 'Hindi' },
                { label: 'Era', value: '1930s' }
            ]
        },
        {
            id: 'malgudi-days',
            kind: 'work',
            category: 'modern',
            title: 'Malgudi Days',
            subtitle: 'R. K. Narayan',
            language: 'English',
            era: '1943',
            summary: 'A warm and sharply observed collection of stories set in the fictional town of Malgudi.',
            significance: 'Its clear prose and memorable characters helped define Indian English fiction for generations.',
            highlights: ['Malgudi town', 'Quiet humor', 'Everyday life'],
            facts: [
                { label: 'Author', value: 'R. K. Narayan' },
                { label: 'Language', value: 'English' },
                { label: 'Era', value: 'Mid 20th century' }
            ]
        },
        {
            id: 'discovery-of-india',
            kind: 'work',
            category: 'modern',
            title: 'The Discovery of India',
            subtitle: 'Jawaharlal Nehru',
            language: 'English',
            era: '1946',
            summary: 'A reflective historical meditation on India’s civilization, diversity, and political awakening.',
            significance: 'It helped frame a post-independence understanding of Indian identity and continuity.',
            highlights: ['Civilizational sweep', 'National reflection', 'History and identity'],
            facts: [
                { label: 'Author', value: 'Jawaharlal Nehru' },
                { label: 'Language', value: 'English' },
                { label: 'Era', value: '1940s' }
            ]
        },
        {
            id: 'midnights-children',
            kind: 'work',
            category: 'modern',
            title: "Midnight's Children",
            subtitle: 'Salman Rushdie',
            language: 'English',
            era: '1981',
            summary: 'A magical-realist novel linking a child’s life to the political history of independent India.',
            significance: 'It became a landmark of Indian English fiction and global postcolonial literature.',
            highlights: ['Magical realism', 'Independence era', 'Narrative ambition'],
            facts: [
                { label: 'Author', value: 'Salman Rushdie' },
                { label: 'Language', value: 'English' },
                { label: 'Era', value: 'Late 20th century' }
            ]
        },
        {
            id: 'train-to-pakistan',
            kind: 'work',
            category: 'modern',
            title: 'Train to Pakistan',
            subtitle: 'Khushwant Singh',
            language: 'English',
            era: '1956',
            summary: 'A spare and powerful novel about Partition, violence, and the human cost of political rupture.',
            significance: 'It remains one of the most vivid literary accounts of the Partition experience.',
            highlights: ['Partition memory', 'Village life', 'Human cost'],
            facts: [
                { label: 'Author', value: 'Khushwant Singh' },
                { label: 'Language', value: 'English' },
                { label: 'Era', value: '1950s' }
            ]
        },
        {
            id: 'abhijnanasakuntalam',
            kind: 'work',
            category: 'ancient',
            title: 'Abhijnanasakuntalam',
            subtitle: 'Kalidasa',
            language: 'Sanskrit',
            era: 'c. 4th - 5th century CE',
            summary: 'A celebrated Sanskrit play about recognition, love, memory, and royal destiny.',
            significance: 'It became one of the best-known classical Indian dramas in world literature.',
            highlights: ['Courtly drama', 'Recognition motif', 'Classical Sanskrit'],
            facts: [
                { label: 'Author', value: 'Kalidasa' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Classical India' }
            ]
        },
        {
            id: 'panchatantra',
            kind: 'work',
            category: 'ancient',
            title: 'Panchatantra',
            subtitle: 'Vishnu Sharma and animal fables',
            language: 'Sanskrit',
            era: 'c. 3rd century BCE - 3rd century CE',
            summary: 'A playful and wise collection of linked fables used to teach politics, prudence, and friendship.',
            significance: 'Its stories travelled widely through Asia, Africa, and Europe in many retellings.',
            highlights: ['Animal fables', 'Practical wisdom', 'Global retellings'],
            facts: [
                { label: 'Author / tradition', value: 'Vishnu Sharma' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        }
    ];

    const authorsData = [
        {
            id: 'rabindranath-tagore',
            kind: 'author',
            category: 'poetry',
            title: 'Rabindranath Tagore',
            subtitle: 'Bengali poet, novelist, composer',
            language: 'Bengali / English',
            era: '1861-1941',
            summary: 'A towering modern voice whose poems, songs, and prose reshaped Indian literary modernity.',
            significance: 'The first Asian Nobel laureate in literature and a defining figure in Bengal’s cultural renaissance.',
            highlights: ['Gitanjali', 'Gora', 'Gitabitan'],
            facts: [
                { label: 'Language / region', value: 'Bengal' },
                { label: 'Era', value: '1861-1941' },
                { label: 'Known for', value: 'Poetry and song' }
            ]
        },
        {
            id: 'munshi-premchand',
            kind: 'author',
            category: 'modern',
            title: 'Munshi Premchand',
            subtitle: 'Hindi and Urdu social realist',
            language: 'Hindi / Urdu',
            era: '1880-1936',
            summary: 'A major chronicler of peasant life, social struggle, and moral complexity.',
            significance: 'Helped define realism in modern Hindi literature and gave voice to ordinary people.',
            highlights: ['Godan', 'Kafan', 'Nirmala'],
            facts: [
                { label: 'Language / region', value: 'North India' },
                { label: 'Era', value: '1880-1936' },
                { label: 'Known for', value: 'Social realism' }
            ]
        },
        {
            id: 'rk-narayan',
            kind: 'author',
            category: 'modern',
            title: 'R. K. Narayan',
            subtitle: 'Storyteller of Malgudi',
            language: 'English',
            era: '1906-2001',
            summary: 'Known for gentle irony, clear prose, and the enduring fictional town of Malgudi.',
            significance: 'Helped establish Indian English fiction with warmth, precision, and accessibility.',
            highlights: ['Malgudi Days', 'Swami and Friends', 'Guide'],
            facts: [
                { label: 'Language / region', value: 'Tamil Nadu' },
                { label: 'Era', value: '1906-2001' },
                { label: 'Known for', value: 'Malgudi stories' }
            ]
        },
        {
            id: 'kalidasa',
            kind: 'author',
            category: 'ancient',
            title: 'Kalidasa',
            subtitle: 'Classical Sanskrit dramatist and poet',
            language: 'Sanskrit',
            era: 'c. 4th - 5th century CE',
            summary: 'A master of lyrical imagination whose plays and poems set a high classical standard.',
            significance: 'His works remain central to the Sanskrit canon and to later Indian literary taste.',
            highlights: ['Abhijnanasakuntalam', 'Meghaduta', 'Raghuvamsha'],
            facts: [
                { label: 'Language / region', value: 'Classical Sanskrit' },
                { label: 'Era', value: 'Ancient India' },
                { label: 'Known for', value: 'Drama and lyric poetry' }
            ]
        },
        {
            id: 'valmiki',
            kind: 'author',
            category: 'epic',
            title: 'Valmiki',
            subtitle: 'Authorial voice of the Ramayana',
            language: 'Sanskrit',
            era: 'Ancient India',
            summary: 'Traditionally credited with composing the Ramayana and shaping the epic form.',
            significance: 'Valmiki became a symbolic source for the epic imagination across South Asia.',
            highlights: ['Ramayana', 'Epic narration', 'Poetic authority'],
            facts: [
                { label: 'Language / region', value: 'Sanskrit tradition' },
                { label: 'Era', value: 'Ancient India' },
                { label: 'Known for', value: 'The Ramayana' }
            ]
        },
        {
            id: 'ved-vyasa',
            kind: 'author',
            category: 'epic',
            title: 'Ved Vyasa',
            subtitle: 'Tradition linked to the Mahabharata',
            language: 'Sanskrit',
            era: 'Ancient India',
            summary: 'The legendary compiler and narrator associated with the Mahabharata and related texts.',
            significance: 'His name stands for one of the most influential narrative and philosophical traditions in India.',
            highlights: ['Mahabharata', 'Puranic tradition', 'Epic wisdom'],
            facts: [
                { label: 'Language / region', value: 'Sanskrit tradition' },
                { label: 'Era', value: 'Ancient India' },
                { label: 'Known for', value: 'Epic compilation' }
            ]
        },
        {
            id: 'subramania-bharati',
            kind: 'author',
            category: 'regional',
            title: 'Subramania Bharati',
            subtitle: 'Tamil poet and nationalist writer',
            language: 'Tamil',
            era: '1882-1921',
            summary: 'A passionate modern poet whose verses fused nationalism, reform, and lyrical force.',
            significance: 'His work helped modernize Tamil poetry and energize cultural and political awakening.',
            highlights: ['Deshika', 'Kuyil Pattu', 'Vande Mataram lyrics'],
            facts: [
                { label: 'Language / region', value: 'Tamil Nadu' },
                { label: 'Era', value: '1882-1921' },
                { label: 'Known for', value: 'Modern Tamil poetry' }
            ]
        },
        {
            id: 'mahadevi-verma',
            kind: 'author',
            category: 'poetry',
            title: 'Mahadevi Verma',
            subtitle: 'Hindi poet and essayist',
            language: 'Hindi',
            era: '1907-1987',
            summary: 'A major modernist voice whose poetry and essays explored loneliness, empathy, and selfhood.',
            significance: 'She became one of the most important women writers in modern Hindi literature.',
            highlights: ['Yama', 'Nihar', 'Neerja'],
            facts: [
                { label: 'Language / region', value: 'Hindi heartland' },
                { label: 'Era', value: '1907-1987' },
                { label: 'Known for', value: 'Modernist poetry' }
            ]
        },
        {
            id: 'amrita-pritam',
            kind: 'author',
            category: 'regional',
            title: 'Amrita Pritam',
            subtitle: 'Punjabi poet and novelist',
            language: 'Punjabi / Hindi',
            era: '1919-2005',
            summary: 'A bold lyrical voice whose work captured love, Partition, and the inner life of women.',
            significance: 'She remains one of the most influential modern writers in Punjabi literature.',
            highlights: ['Ajj Aakhan Waris Shah Nu', 'Pinjar', 'Partition poetry'],
            facts: [
                { label: 'Language / region', value: 'Punjab' },
                { label: 'Era', value: '1919-2005' },
                { label: 'Known for', value: 'Partition and love poetry' }
            ]
        },
        {
            id: 'bankim-chandra-chatterjee',
            kind: 'author',
            category: 'modern',
            title: 'Bankim Chandra Chatterjee',
            subtitle: 'Novelist and nationalist thinker',
            language: 'Bengali',
            era: '1838-1894',
            summary: 'A pioneering novelist whose work helped shape the Indian literary public sphere.',
            significance: 'His writing bridged literary modernity, public debate, and nationalist feeling.',
            highlights: ['Anandamath', 'Vande Mataram', `Rajmohan's Wife`],
            facts: [
                { label: 'Language / region', value: 'Bengal' },
                { label: 'Era', value: '1838-1894' },
                { label: 'Known for', value: 'Nationalist fiction' }
            ]
        },
        {
            id: 'khushwant-singh',
            kind: 'author',
            category: 'modern',
            title: 'Khushwant Singh',
            subtitle: 'Novelist, editor, and commentator',
            language: 'English',
            era: '1915-2014',
            summary: 'A sharp observer of politics, Partition, and urban life with a lively public voice.',
            significance: 'He made complex historical subjects accessible through fiction and journalism.',
            highlights: ['Train to Pakistan', 'Delhi', 'History writing'],
            facts: [
                { label: 'Language / region', value: 'Punjab / Delhi' },
                { label: 'Era', value: '1915-2014' },
                { label: 'Known for', value: 'Partition fiction' }
            ]
        },
        {
            id: 'sarojini-naidu',
            kind: 'author',
            category: 'poetry',
            title: 'Sarojini Naidu',
            subtitle: 'Poet and public leader',
            language: 'English',
            era: '1879-1949',
            summary: 'A lyrical poet whose public life connected literature, freedom, and civic leadership.',
            significance: 'Known as the Nightingale of India, she linked poetry to the freedom movement.',
            highlights: ['The Golden Threshold', 'Freedom speeches', 'Lyric poetry'],
            facts: [
                { label: 'Language / region', value: 'Hyderabad' },
                { label: 'Era', value: '1879-1949' },
                { label: 'Known for', value: 'Lyric poetry and leadership' }
            ]
        }
    ];

    const ancientTextsData = [
        {
            id: 'vedas',
            kind: 'ancient',
            category: 'ancient',
            title: 'Vedas',
            subtitle: 'Foundational hymns and ritual knowledge',
            language: 'Vedic Sanskrit',
            era: 'c. 1500 BCE - 500 BCE',
            summary: 'A layered corpus of hymns, rituals, and cosmological inquiry that anchors early Indian thought.',
            significance: 'The Vedic corpus shaped ritual practice, scholarship, and philosophical imagination for centuries.',
            highlights: ['Rig, Sama, Yajur, Atharva', 'Oral transmission', 'Sacred knowledge'],
            facts: [
                { label: 'Tradition', value: 'Shruti' },
                { label: 'Language', value: 'Vedic Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        },
        {
            id: 'upanishads',
            kind: 'ancient',
            category: 'philosophy',
            title: 'Upanishads',
            subtitle: 'Philosophical inquiry into self and reality',
            language: 'Sanskrit',
            era: 'c. 800 BCE - 300 BCE',
            summary: 'Dialogues that turn from ritual toward questions of self, consciousness, and ultimate reality.',
            significance: 'They became central to Vedanta and later Indian philosophical traditions.',
            highlights: ['Atman and Brahman', 'Meditation', 'Inquiry'],
            facts: [
                { label: 'Tradition', value: 'Vedanta roots' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        },
        {
            id: 'ramayana-ancient',
            kind: 'ancient',
            category: 'epic',
            title: 'Ramayana',
            subtitle: 'The epic of Rama and Sita',
            language: 'Sanskrit',
            era: 'c. 500 BCE - 100 BCE',
            summary: 'A classic epic of exile, devotion, and return that has been retold in countless regional forms.',
            significance: 'It remains one of the most influential narrative foundations in South Asian culture.',
            highlights: ['Rama and Sita', 'Dharma', 'Living retellings'],
            facts: [
                { label: 'Tradition', value: 'Valmiki' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient epic' }
            ]
        },
        {
            id: 'mahabharata-ancient',
            kind: 'ancient',
            category: 'epic',
            title: 'Mahabharata',
            subtitle: 'The great war and its philosophy',
            language: 'Sanskrit',
            era: 'c. 400 BCE - 400 CE',
            summary: 'A monumental epic that mixes war, kinship, ethics, and philosophical reflection.',
            significance: 'Its influence reaches literature, performance, politics, and everyday moral language.',
            highlights: ['Kurukshetra', 'Bhagavad Gita', 'Epic scale'],
            facts: [
                { label: 'Tradition', value: 'Ved Vyasa' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient epic' }
            ]
        },
        {
            id: 'arthashastra-ancient',
            kind: 'ancient',
            category: 'philosophy',
            title: 'Arthashastra',
            subtitle: 'Statecraft, economics, and governance',
            language: 'Sanskrit',
            era: 'c. 3rd century BCE',
            summary: 'A highly practical treatise on the mechanics of government, diplomacy, and public order.',
            significance: 'It remains one of the most studied classical Indian texts on politics and administration.',
            highlights: ['Strategy', 'Administration', 'Public order'],
            facts: [
                { label: 'Tradition', value: 'Kautilya' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Mauryan age' }
            ]
        },
        {
            id: 'panchatantra-ancient',
            kind: 'ancient',
            category: 'ancient',
            title: 'Panchatantra',
            subtitle: 'Animal fables and political wisdom',
            language: 'Sanskrit',
            era: 'c. 3rd century BCE - 3rd century CE',
            summary: 'A linked set of fables that teaches prudence, friendship, and strategy through story.',
            significance: 'Its stories travelled widely and continue to shape global fable traditions.',
            highlights: ['Animal tales', 'Practical wisdom', 'World travel'],
            facts: [
                { label: 'Tradition', value: 'Vishnu Sharma' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        },
        {
            id: 'natya-shastra',
            kind: 'ancient',
            category: 'ancient',
            title: 'Natya Shastra',
            subtitle: 'Performing arts and dramatic theory',
            language: 'Sanskrit',
            era: 'c. 200 BCE - 200 CE',
            summary: 'A seminal treatise on drama, dance, music, aesthetics, and performance conventions.',
            significance: 'It remains a core reference for Indian theatre and performance theory.',
            highlights: ['Rasa theory', 'Stagecraft', 'Aesthetic system'],
            facts: [
                { label: 'Tradition', value: 'Bharata Muni' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        },
        {
            id: 'charaka-samhita',
            kind: 'ancient',
            category: 'philosophy',
            title: 'Charaka Samhita',
            subtitle: 'Classical Ayurvedic medicine',
            language: 'Sanskrit',
            era: 'c. 1st century CE',
            summary: 'A foundational Ayurvedic text on diagnosis, treatment, and medical ethics.',
            significance: 'It shaped the classical framework of Indian medicine and clinical reasoning.',
            highlights: ['Ayurveda', 'Diagnosis', 'Medical ethics'],
            facts: [
                { label: 'Tradition', value: 'Classical Ayurveda' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        },
        {
            id: 'sushruta-samhita',
            kind: 'ancient',
            category: 'philosophy',
            title: 'Sushruta Samhita',
            subtitle: 'Surgery and medical craft',
            language: 'Sanskrit',
            era: 'c. 1st millennium BCE - 1st millennium CE',
            summary: 'A classical medical work known for surgical procedures, instruments, and anatomical insight.',
            significance: 'It became a landmark text for surgery and technical medical knowledge.',
            highlights: ['Surgery', 'Anatomy', 'Instrument lists'],
            facts: [
                { label: 'Tradition', value: 'Sushruta' },
                { label: 'Language', value: 'Sanskrit' },
                { label: 'Era', value: 'Ancient India' }
            ]
        }
    ];

    worksData.forEach(item => {
        item.image = literatureImagePaths.works[item.id] || '';
    });
    authorsData.forEach(item => {
        item.image = literatureImagePaths.authors[item.id] || '';
    });
    ancientTextsData.forEach(item => {
        item.image = literatureImagePaths.texts[item.id] || '';
    });

    const allItems = [...worksData, ...authorsData, ...ancientTextsData];
    const languages = new Set();
    allItems.forEach(item => {
        item.language.split(/[\/,]/).map(part => part.trim()).filter(Boolean).forEach(part => languages.add(part));
    });

    const statsData = [
        { label: 'Ancient texts', value: String(ancientTextsData.length), detail: 'From the Vedas to classic treatises on drama, medicine, and statecraft.' },
        { label: 'Languages represented', value: String(languages.size), detail: 'Sanskrit, Tamil, Hindi, Bengali, Punjabi, and English all appear across the archive.' },
        { label: 'Famous authors', value: String(authorsData.length), detail: 'Poets, novelists, dramatists, and public thinkers who shaped modern Indian letters.' },
        { label: 'Literary categories', value: String(Object.keys(categoryLabels).length), detail: 'Epic, poetry, modern, regional, philosophy, and ancient knowledge traditions.' }
    ];

    let activeFilter = 'all';
    let lastFocusedTrigger = null;
    let isModalOpen = false;

    renderStats();
    renderCollections();
    setActiveFilterButton(activeFilter);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.getAttribute('data-literature-filter') || 'all';
            setActiveFilterButton(activeFilter);
            renderCollections();
        });
    });

    searchInput.addEventListener('input', () => {
        renderCollections();
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

    document.querySelectorAll('[data-literature-reset]').forEach(button => {
        button.addEventListener('click', resetFilters);
    });

    function renderStats() {
        statsGrid.innerHTML = statsData.map(stat => `
            <article class="literature-stat-card glass-card">
                <span class="literature-stat-label">${stat.label}</span>
                <strong class="literature-stat-value">${stat.value}</strong>
                <p class="literature-stat-detail">${stat.detail}</p>
            </article>
        `).join('');
    }

    function renderCollections() {
        const query = searchInput.value.trim().toLowerCase();

        renderCollection(worksGrid, worksData, query, 'works');
        renderCollection(authorsGrid, authorsData, query, 'authors');
        renderCollection(ancientGrid, ancientTextsData, query, 'ancient texts');
    }

    function renderCollection(grid, collection, query, emptyLabel) {
        const filteredItems = collection.filter(item => matchesFilter(item) && matchesSearch(item, query));

        grid.innerHTML = '';

        if (!filteredItems.length) {
            grid.innerHTML = `
                <div class="literature-empty-state glass-card">
                    <h3>No ${emptyLabel} found</h3>
                    <p>Try a different search term or switch back to All categories.</p>
                    <button type="button" class="btn btn-primary" data-literature-reset>Show all entries</button>
                </div>
            `;

            grid.querySelectorAll('[data-literature-reset]').forEach(button => {
                button.addEventListener('click', resetFilters);
            });
            return;
        }

        filteredItems.forEach(item => {
            const card = document.createElement('article');
            card.className = 'literature-card glass-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View details for ${item.title}`);
            card.setAttribute('data-category', item.category);
            card.setAttribute('data-literature-id', item.id);
            card.innerHTML = `
                <div class="literature-card-media ${item.category}">
                    <img class="literature-card-image" src="${item.image || ''}" alt="${item.title}" loading="lazy" decoding="async">
                    <div class="literature-card-fallback">${getMonogram(item.title)}</div>
                </div>
                <div class="literature-card-head">
                    <div class="literature-card-title">
                        <span class="literature-badge ${item.category}">${getCategoryLabel(item.category)}</span>
                        <h3>${item.title}</h3>
                        <p>${item.subtitle}</p>
                    </div>
                </div>
                <div class="literature-meta-row" aria-label="Literature metadata">
                    <span class="literature-meta-chip">${item.language}</span>
                    <span class="literature-meta-chip">${item.era}</span>
                    <span class="literature-meta-chip">${collectionLabels[item.kind] || 'Literature'}</span>
                </div>
                <p class="literature-summary">${item.summary}</p>
                <p class="literature-significance">${item.significance}</p>
                <div class="literature-chip-row">${item.highlights.map(highlight => `<span class="literature-chip">${highlight}</span>`).join('')}</div>
                <div class="literature-card-footer">
                    <span class="literature-card-note">Open the details card for more context</span>
                    <button type="button" class="btn btn-secondary literature-details-btn" data-literature-details>View Details</button>
                </div>
            `;
            syncLiteratureMedia(card, item);

            card.addEventListener('click', event => {
                const trigger = event.target.closest('[data-literature-details]');
                openModal(item, trigger || card);
            });

            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    const target = event.target;
                    if (target.matches('button, a, input, textarea, select')) {
                        return;
                    }

                    event.preventDefault();
                    openModal(item, card);
                }
            });

            grid.appendChild(card);
        });
    }

    function matchesFilter(item) {
        if (activeFilter === 'all') {
            return true;
        }

        if (activeFilter === 'ancient') {
            return item.category === 'ancient' || item.kind === 'ancient';
        }

        return item.category === activeFilter;
    }

    function matchesSearch(item, query) {
        if (!query) {
            return true;
        }

        const searchable = [
            item.title,
            item.subtitle,
            item.language,
            item.era,
            item.summary,
            item.significance,
            item.kind,
            item.category,
            ...(item.highlights || []),
            ...(item.facts || []).map(fact => `${fact.label} ${fact.value}`)
        ].join(' ').toLowerCase();

        return searchable.includes(query);
    }

    function setActiveFilterButton(filterValue) {
        filterButtons.forEach(btn => {
            const isActive = (btn.getAttribute('data-literature-filter') || 'all') === filterValue;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function getCategoryLabel(category) {
        return categoryLabels[category] || 'Literature';
    }

    function getMonogram(value) {
        return value
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map(part => part[0])
            .join('')
            .toUpperCase();
    }

    function syncLiteratureMedia(root, item) {
        const media = root.classList.contains('literature-modal-avatar')
            ? root
            : root.querySelector('.literature-card-media');
        const img = root.classList.contains('literature-modal-avatar')
            ? root.querySelector('.literature-modal-image')
            : root.querySelector('.literature-card-image');
        if (!media || !img) return;

        const fallback = root.classList.contains('literature-modal-avatar')
            ? root.querySelector('.literature-modal-fallback')
            : media.querySelector('.literature-card-fallback');
        const resolveFallback = () => {
            media.classList.add('is-missing');
            media.classList.remove('is-loaded');
            if (fallback) fallback.textContent = getMonogram(item.title);
        };

        if (!item.image) {
            resolveFallback();
            return;
        }

        img.addEventListener('load', () => {
            media.classList.add('is-loaded');
            media.classList.remove('is-missing');
        }, { once: true });
        img.addEventListener('error', resolveFallback, { once: true });

        if (img.complete && img.naturalWidth > 0) {
            media.classList.add('is-loaded');
            media.classList.remove('is-missing');
        } else if (!img.complete) {
            media.classList.add('is-loading');
        }
    }

    function openModal(item, trigger) {
        lastFocusedTrigger = trigger || document.activeElement;
        isModalOpen = true;

        modalAvatar.className = `literature-modal-avatar ${item.category}`;
        modalAvatar.innerHTML = `
            <img class="literature-modal-image" src="${item.image || ''}" alt="${item.title}" loading="lazy" decoding="async">
            <div class="literature-modal-fallback">${getMonogram(item.title)}</div>
        `;
        syncLiteratureMedia(modalAvatar, item);
        modalBadge.className = `literature-badge ${item.category}`;
        modalBadge.textContent = `${getCategoryLabel(item.category)} / ${collectionLabels[item.kind] || 'Literature'}`;
        modalTitle.textContent = item.title;
        modalSubtitle.textContent = item.subtitle;
        modalStory.textContent = item.summary;
        modalSignificance.textContent = item.significance;
        modalMeta.innerHTML = item.facts.map(fact => `
            <div class="literature-modal-meta-item">
                <span class="literature-modal-meta-label">${fact.label}</span>
                <span class="literature-modal-meta-value">${fact.value}</span>
            </div>
        `).join('');
        modalHighlights.innerHTML = item.highlights.map(highlight => `<li>${highlight}</li>`).join('');

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

        if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
            requestAnimationFrame(() => {
                lastFocusedTrigger.focus();
            });
        }
    }

    function trapModalFocus(event) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
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

    function resetFilters() {
        searchInput.value = '';
        activeFilter = 'all';
        setActiveFilterButton(activeFilter);
        renderCollections();
        searchInput.focus();
    }
}
