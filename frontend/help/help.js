document.addEventListener('DOMContentLoaded', () => {

    const faqs = [
        {
            id: 'getting-started-1',
            category: 'Getting Started',
            question: 'What is Incredible India Explorer?',
            answer: 'It\'s an interactive digital guide to India\'s states, culture, cuisine, festivals, and heritage — built with an interactive map, travel tools, and games to explore the country from your browser.'
        },
        {
            id: 'getting-started-2',
            category: 'Getting Started',
            question: 'Is the project free?',
            answer: 'Yes. Incredible India Explorer is completely free and open source. You can browse every page, use the map, and play the games without any account or payment.'
        },
        {
            id: 'getting-started-3',
            category: 'Getting Started',
            question: 'How do I contribute?',
            answer: 'Check the <a href="../../CONTRIBUTING.md">contributing guide</a> in the repository and the <a href="../contributor-checklist/contributor-checklist.html">contributor checklist page</a> for setup steps, coding conventions, and good first issues to pick up.'
        },
        {
            id: 'maps-1',
            category: 'Maps',
            question: "Why isn't the map loading?",
            answer: 'This is usually a slow connection or a browser blocking third-party scripts. Try refreshing the page, disabling ad-blockers for this site, or switching browsers. If the map still fails to load, please report it using the button below.'
        },
        {
            id: 'maps-2',
            category: 'Maps',
            question: 'How do I explore a specific state on the map?',
            answer: 'Click or tap any state on the Interactive Map on the homepage to open its dedicated state page, with details on culture, cuisine, festivals, and attractions.'
        },
        {
            id: 'bookmarks-1',
            category: 'Bookmarks',
            question: 'How do I bookmark a state?',
            answer: 'Open any state page and click the bookmark icon near the state name. Bookmarked states are saved to your account (or your browser, if you\'re not signed in) so you can find them again quickly.'
        },
        {
            id: 'bookmarks-2',
            category: 'Bookmarks',
            question: 'Where can I see all my bookmarked states?',
            answer: 'Your bookmarks are listed on your profile page once you\'re signed in. If you\'re browsing without an account, bookmarks are kept locally in your browser and won\'t sync across devices.'
        },
        {
            id: 'states-1',
            category: 'States',
            question: 'How many states and union territories are covered?',
            answer: 'All 28 states and 8 union territories of India are covered, each with its own page featuring culture, cuisine, festivals, and key facts.'
        },
        {
            id: 'states-2',
            category: 'States',
            question: 'I found incorrect information on a state page — how do I report it?',
            answer: 'Please open a GitHub issue describing the page and the correction needed. Content fixes are one of the easiest ways to contribute and are always welcome.'
        },
        {
            id: 'search-1',
            category: 'Search',
            question: 'How does the site search work?',
            answer: 'Use the search icon in the navigation bar to open the global search, which looks across states, cuisine, festivals, culture, and more, then jumps you straight to the matching page.'
        },
        {
            id: 'search-2',
            category: 'Search',
            question: "The search isn't finding what I'm looking for. What should I do?",
            answer: 'Try a shorter or more general keyword — for example, a state name or topic instead of a full sentence. If it is still missing, it may not be covered yet; feel free to suggest it via GitHub Issues.'
        },
        {
            id: 'offline-1',
            category: 'Offline Mode',
            question: 'Can I use it offline?',
            answer: 'Yes. Pages you\'ve already visited are cached automatically, so you can keep browsing them without an internet connection. If you open a page that hasn\'t been cached yet, you\'ll see the offline screen with cached-page suggestions instead.'
        },
        {
            id: 'offline-2',
            category: 'Offline Mode',
            question: 'Why is a page I visited before not available offline?',
            answer: 'Some pages, especially large ones with maps or media, may not finish caching before you go offline. Revisit the page once you\'re back online to make sure it\'s stored for next time.'
        },
        {
            id: 'account-1',
            category: 'Account',
            question: 'Do I need an account to use the site?',
            answer: 'No — most of the site, including states, culture, cuisine, and games, is fully usable without signing in. An account is only needed to sync bookmarks and progress across devices.'
        },
        {
            id: 'account-2',
            category: 'Account',
            question: 'How do I sign in or create an account?',
            answer: 'Click "Login" in the navigation bar to sign in or create a free account.'
        },
        {
            id: 'troubleshooting-1',
            category: 'Troubleshooting',
            question: 'How do I report bugs?',
            answer: 'Open a new issue on our <a href="https://github.com/Eshajha19/Incredible-India-Explorer/issues" target="_blank" rel="noopener noreferrer">GitHub Issues</a> page, describing what happened, what you expected, and, if possible, steps to reproduce it.'
        },
        {
            id: 'troubleshooting-2',
            category: 'Troubleshooting',
            question: 'The site looks broken or unstyled. What can I do?',
            answer: 'Try a hard refresh (Ctrl/Cmd + Shift + R) to clear a stale cached stylesheet. If the issue persists across browsers, please let us know via GitHub Issues.'
        }
    ];

    const accordionEl = document.getElementById('helpAccordion');
    const searchInput = document.getElementById('helpSearchInput');
    const searchClearBtn = document.getElementById('helpSearchClear');
    const searchCountEl = document.getElementById('helpSearchCount');
    const emptyStateEl = document.getElementById('helpEmptyState');
    const resetSearchBtn = document.getElementById('helpResetSearch');
    const categoryButtons = Array.from(document.querySelectorAll('.help-chip'));

    let activeCategory = 'all';
    let query = '';

    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function highlight(text, term) {
        if (!term) return escapeHtml(text);
        const escaped = escapeHtml(text);
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp('(' + escapedTerm + ')', 'ig');
        return escaped.replace(regex, '<mark>$1</mark>');
    }

    function buildItem(faq, term) {
        const wrapper = document.createElement('div');
        wrapper.className = 'help-item';
        wrapper.dataset.id = faq.id;

        wrapper.innerHTML = `
            <span class="help-category-tag">${escapeHtml(faq.category)}</span>
            <h3 style="margin:0;">
                <button type="button" class="help-question" aria-expanded="false" id="q-${faq.id}" aria-controls="a-${faq.id}">
                    <span class="help-question-text">${highlight(faq.question, term)}</span>
                    <span class="help-question-icon" aria-hidden="true">+</span>
                </button>
            </h3>
            <div class="help-answer-wrapper">
                <div class="help-answer-inner">
                    <div class="help-answer" id="a-${faq.id}" role="region" aria-labelledby="q-${faq.id}">
                        <p>${faq.answer}</p>
                    </div>
                </div>
            </div>
        `;

        const questionBtn = wrapper.querySelector('.help-question');
        questionBtn.addEventListener('click', () => toggleItem(wrapper));
        questionBtn.addEventListener('keydown', (e) => handleKeyNav(e, wrapper));

        return wrapper;
    }

    function toggleItem(item, forceOpen) {
        const isOpen = item.classList.contains('open');
        const shouldOpen = forceOpen !== undefined ? forceOpen : !isOpen;

        // Accordion behaviour: only one panel open at a time.
        accordionEl.querySelectorAll('.help-item.open').forEach((openItem) => {
            if (openItem !== item) {
                openItem.classList.remove('open');
                openItem.querySelector('.help-question').setAttribute('aria-expanded', 'false');
            }
        });

        item.classList.toggle('open', shouldOpen);
        item.querySelector('.help-question').setAttribute('aria-expanded', String(shouldOpen));
    }

    function handleKeyNav(e, currentItem) {
        const items = Array.from(accordionEl.querySelectorAll('.help-item'));
        const index = items.indexOf(currentItem);
        if (index === -1) return;

        let targetIndex = null;
        if (e.key === 'ArrowDown') targetIndex = (index + 1) % items.length;
        if (e.key === 'ArrowUp') targetIndex = (index - 1 + items.length) % items.length;
        if (e.key === 'Home') targetIndex = 0;
        if (e.key === 'End') targetIndex = items.length - 1;

        if (targetIndex !== null) {
            e.preventDefault();
            items[targetIndex].querySelector('.help-question').focus();
        }
    }

    function getFilteredFaqs() {
        const term = query.trim().toLowerCase();
        return faqs.filter((faq) => {
            const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
            const matchesTerm = !term ||
                faq.question.toLowerCase().includes(term) ||
                faq.answer.toLowerCase().includes(term) ||
                faq.category.toLowerCase().includes(term);
            return matchesCategory && matchesTerm;
        });
    }

    function render() {
        const term = query.trim();
        const filtered = getFilteredFaqs();

        accordionEl.innerHTML = '';
        filtered.forEach((faq) => accordionEl.appendChild(buildItem(faq, term)));

        const hasResults = filtered.length > 0;
        emptyStateEl.hidden = hasResults;
        accordionEl.hidden = !hasResults;

        if (term) {
            searchCountEl.textContent = `${filtered.length} result${filtered.length === 1 ? '' : 's'} for "${term}"`;
        } else {
            searchCountEl.textContent = '';
        }

        searchClearBtn.hidden = !term;
    }

    searchInput.addEventListener('input', (e) => {
        query = e.target.value;
        render();
    });

    searchClearBtn.addEventListener('click', () => {
        query = '';
        searchInput.value = '';
        searchInput.focus();
        render();
    });

    resetSearchBtn.addEventListener('click', () => {
        query = '';
        activeCategory = 'all';
        searchInput.value = '';
        categoryButtons.forEach((btn) => {
            const isAll = btn.dataset.category === 'all';
            btn.classList.toggle('active', isAll);
            btn.setAttribute('aria-pressed', String(isAll));
        });
        render();
    });

    categoryButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            activeCategory = btn.dataset.category;
            categoryButtons.forEach((b) => {
                b.classList.toggle('active', b === btn);
                b.setAttribute('aria-pressed', String(b === btn));
            });
            render();
        });
    });

    render();
});