window.IIE = window.IIE || {};
(function() {
  'use strict';

  const startupAsset = fileName => `assets/startup/${encodeURIComponent(fileName)}`;

  const startupCategoryThemes = {
    'fintech': { icon: '\uD83D\uDCB3', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    'edtech': { icon: '\uD83C\uDF93', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    'ecommerce': { icon: '\uD83D\uDED2', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    'healthtech': { icon: '\u2695\uFE0F', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    'saas': { icon: '\u2601\uFE0F', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    'logistics': { icon: '\uD83D\uDE9A', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    'agritech': { icon: '\uD83C\uDF3E', gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)' },
    'default': { icon: '\uD83D\uDE80', gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' }
  };

  const startupData = [
    { id: 's1', name: 'Paytm', subtitle: 'Digital payments pioneer', category: 'fintech', founded: 2010, founder: 'Vijay Shekhar Sharma', image: startupAsset('paytm.png'), city: 'Noida', funding: '$3.5B+', valuation: '$16B', summary: 'Revolutionized digital payments in India with mobile wallets and QR-based transactions.', description: 'Paytm started as a mobile recharge platform and grew into India\'s largest digital payments ecosystem. It introduced UPI payments, payment banks, and financial services to hundreds of millions of Indians.', highlights: ['QR code payments', 'Paytm Payments Bank', 'IPO success'] },
    { id: 's2', name: 'Byju\'s', subtitle: 'Edtech giant', category: 'edtech', founded: 2011, founder: 'Byju Raveendran', image: startupAsset('byjus.png'), city: 'Bengaluru', funding: '$4.5B+', valuation: '$22B', summary: 'Transformed learning through personalized app-based education for K-12 and test prep.', description: 'Byju\'s became India\'s most valuable edtech company by making learning engaging through video lessons, interactive content, and personalized learning paths for millions of students.', highlights: ['Personalized learning', 'Mergers & acquisitions', 'Global expansion'] },
    { id: 's3', name: 'Flipkart', subtitle: 'E-commerce leader', category: 'ecommerce', founded: 2007, founder: 'Sachin Bansal & Binny Bansal', image: startupAsset('flipkart.png'), city: 'Bengaluru', funding: '$7B+', valuation: '$35B+', summary: 'Built India\'s first major e-commerce marketplace, now part of Walmart.', description: 'Flipkart transformed Indian retail by making online shopping accessible with cash-on-delivery, easy returns, and a vast selection. Its acquisition by Walmart was a landmark moment for Indian tech.', highlights: ['Cash-on-delivery model', 'Big Billion Days', 'Walmart acquisition'] },
    { id: 's4', name: 'Ola', subtitle: 'Mobility platform', category: 'logistics', founded: 2010, founder: 'Bhavish Aggarwal & Ankit Bhati', image: startupAsset('ola.png'), city: 'Bengaluru', funding: '$5B+', valuation: '$7.5B', summary: 'Built India\'s largest ride-hailing platform and electric vehicle ambitions.', description: 'Ola started as a cab aggregator and expanded to auto-rickshaws, bikes, and electric vehicles. Its Ola Electric subsidiary is building India\'s largest EV ecosystem.', highlights: ['Ride-hailing dominance', 'Ola Electric', 'Global expansion'] },
    { id: 's5', name: 'Zomato', subtitle: 'Food delivery leader', category: 'ecommerce', founded: 2008, founder: 'Deepinder Goyal & Pankaj Chaddah', image: startupAsset('zomato.png'), city: 'Gurugram', funding: '$2B+', valuation: '$8B+', summary: 'Changed how India eats with restaurant discovery and food delivery.', description: 'Zomato evolved from a restaurant discovery platform to India\'s leading food delivery service. Its IPO was one of the most anticipated in Indian tech history.', highlights: ['Restaurant discovery', 'Food delivery network', 'IPO milestone'] },
    { id: 's6', name: 'PhonePe', subtitle: 'Fintech powerhouse', category: 'fintech', founded: 2015, founder: 'Sameer Nigam, Rahul Chari & Burzin Engineer', image: startupAsset('phonepe.png'), city: 'Bengaluru', funding: '$2B+', valuation: '$12B', summary: 'Democratized UPI payments and financial services across India.', description: 'PhonePe made UPI payments seamless for millions, offering bill payments, insurance, mutual funds, and merchant services. It processes over 45% of India\'s UPI transactions.', highlights: ['UPI leadership', 'Insurance & wealth', 'Merchant ecosystem'] },
    { id: 's7', name: 'Ola Electric', subtitle: 'EV revolution', category: 'default', founded: 2017, founder: 'Bhavish Aggarwal', image: startupAsset('ola-electric.png'), city: 'Bengaluru', funding: '$1B+', valuation: '$5B+', summary: 'Building India\'s largest electric two-wheeler manufacturing plant.', description: 'Ola Electric is driving India\'s EV revolution with its massive factory in Tamil Nadu, producing affordable electric scooters and building a nationwide charging infrastructure.', highlights: ['Futurefactory', 'Electric scooters', 'Battery tech'] },
    { id: 's8', name: 'CRED', subtitle: 'Credit card rewards', category: 'fintech', founded: 2018, founder: 'Kunal Shah', image: startupAsset('cred.png'), city: 'Bengaluru', funding: '$800M+', valuation: '$6.4B', summary: 'Rewarding credit card bill payments with perks and gamification.', description: 'CRED created a premium ecosystem for creditworthy users, offering rewards for bill payments, exclusive experiences, and financial products tailored for high-income individuals.', highlights: ['Gamified UX', 'CRED RentPay', 'Community building'] },
    { id: 's9', name: 'Razorpay', subtitle: 'Payment gateway leader', category: 'fintech', founded: 2014, founder: 'Harshil Mathur & Shashank Kumar', image: startupAsset('razorpay.png'), city: 'Bengaluru', funding: '$750M+', valuation: '$7.5B', summary: 'Built India\'s most developer-friendly payment infrastructure.', description: 'Razorpay simplified online payments for businesses with an easy-to-integrate API, recurring payments, neobanking, and lending solutions for startups and enterprises.', highlights: ['Developer-first API', 'RazorpayX neobank', 'Business banking'] },
    { id: 's10', name: 'Nykaa', subtitle: 'Beauty e-commerce', category: 'ecommerce', founded: 2012, founder: 'Falguni Nayar', image: startupAsset('nykaa.png'), city: 'Mumbai', funding: '$300M+', valuation: '$13B', summary: 'Built India\'s leading beauty and wellness retail platform.', description: 'Nykaa revolutionized beauty shopping in India by offering authentic products, expert content, and a seamless omnichannel experience across online and retail stores.', highlights: ['Omnichannel retail', 'Own brands', 'FSN E-Commerce IPO'] },
    { id: 's11', name: 'Swiggy', subtitle: 'Food delivery innovator', category: 'ecommerce', founded: 2014, founder: 'Sriharsha Majety, Nandan Reddy & Rahul Jaimini', image: startupAsset('swiggy.png'), city: 'Bengaluru', funding: '$3B+', valuation: '$10B+', summary: 'Pioneered hyperlocal food delivery and quick commerce in India.', description: 'Swiggy transformed food delivery with real-time tracking, scheduled orders, and Instamart quick commerce. Its logistics network serves hundreds of cities across India.', highlights: ['Real-time tracking', 'Instamart', 'Hyperlocal delivery'] },
    { id: 's12', name: 'Droom', subtitle: 'Auto marketplace', category: 'ecommerce', founded: 2014, founder: 'Sandeep Aggarwal & Rishab Malik', image: startupAsset('droom.png'), city: 'Gurugram', funding: '$200M+', valuation: '$1.2B', summary: 'Built India\'s first AI-driven automobile transaction platform.', description: 'Droom uses AI and data science to make buying and selling used cars transparent and trustworthy. Its OBV (Orange Book Value) pricing became an industry standard.', highlights: ['OBV pricing', 'AI-driven platform', 'Pan-India reach'] }
  ];

  function initStartupPage() {
    const startupGrid = document.getElementById('startup-grid');
    const searchInput = document.getElementById('startup-search-input');
    const filterButtons = document.querySelectorAll('[data-startup-filter]');
    const favoritesToggle = document.getElementById('startup-favorites-toggle');

    if (!startupGrid) return;

    document.querySelectorAll('.fade-in-section').forEach(s => s.classList.add('is-visible'));

    let activeCategory = 'all';
    let showFavoritesOnly = false;
    let favorites = getFavorites();

    if (favoritesToggle) {
      favoritesToggle.addEventListener('change', () => {
        showFavoritesOnly = favoritesToggle.checked;
        render();
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-startup-filter') || 'all';
        filterButtons.forEach(b => b.classList.toggle('active', (b.getAttribute('data-startup-filter') || 'all') === activeCategory));
        render();
      });
    });

    searchInput?.addEventListener('input', () => render());

    render();

    function getFavorites() {
      try { return JSON.parse(localStorage.getItem('startupFavorites')) || []; } catch(e) { return []; }
    }

    function saveFavorites() {
      localStorage.setItem('startupFavorites', JSON.stringify(favorites));
    }

    function toggleFavorite(id) {
      const idx = favorites.indexOf(id);
      if (idx > -1) favorites.splice(idx, 1);
      else favorites.push(id);
      saveFavorites();
      render();
    }

    function render() {
      startupGrid.innerHTML = '';
      const query = searchInput?.value.trim().toLowerCase() || '';
      const filtered = startupData.filter(s => {
        const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
        const matchesSearch = !query || s.name.toLowerCase().includes(query) || s.subtitle.toLowerCase().includes(query) || s.founder.toLowerCase().includes(query) || s.city.toLowerCase().includes(query) || s.description.toLowerCase().includes(query);
        const matchesFavorites = !showFavoritesOnly || favorites.includes(s.id);
        return matchesCategory && matchesSearch && matchesFavorites;
      });

      if (filtered.length === 0) {
        startupGrid.innerHTML = `<div class="startup-empty glass-card"><h3>No startups found</h3><p>Try adjusting your search or filter.</p></div>`;
        return;
      }

      filtered.forEach(s => {
        const theme = startupCategoryThemes[s.category] || startupCategoryThemes.default;
        const isFav = favorites.includes(s.id);
        const card = document.createElement('article');
        card.className = 'startup-card glass-card';
        card.innerHTML = `<div class="startup-card-accent" style="background: ${theme.gradient}"></div><div class="startup-card-header"><div class="startup-card-icon" style="background: ${theme.gradient}"><span>${theme.icon}</span></div><div class="startup-card-meta"><span class="startup-category-badge">${s.category}</span><h3>${s.name}</h3><p>${s.subtitle}</p></div><button class="startup-fav-btn ${isFav ? 'active' : ''}" aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}"><span>${isFav ? '\u2764' : '\u2661'}</span></button></div><div class="startup-card-body"><p class="startup-summary">${s.summary}</p><div class="startup-detail-row"><span class="startup-detail-label">Founder</span><span>${s.founder}</span></div><div class="startup-detail-row"><span class="startup-detail-label">Founded</span><span>${s.founded}</span></div><div class="startup-detail-row"><span class="startup-detail-label">City</span><span>${s.city}</span></div></div><div class="startup-card-footer"><div class="startup-stats"><div class="startup-stat"><span class="startup-stat-label">Funding</span><span class="startup-stat-value">${s.funding}</span></div><div class="startup-stat"><span class="startup-stat-label">Valuation</span><span class="startup-stat-value">${s.valuation}</span></div></div><div class="startup-highlights">${s.highlights.map(h => `<span class="startup-chip">${h}</span>`).join('')}</div></div>`;
        card.querySelector('.startup-fav-btn')?.addEventListener('click', (e) => { e.stopPropagation(); toggleFavorite(s.id); });
        card.addEventListener('click', () => openStartupModal(s, theme));
        startupGrid.appendChild(card);
      });
    }

    // Founder profiles
    const founderGrid = document.getElementById('startup-founder-grid');
    if (founderGrid) {
      const founders = [
        { name: 'Vijay Shekhar Sharma', company: 'Paytm', image: startupAsset('vijay-shekhar-sharma.png'), role: 'Founder & CEO' },
        { name: 'Byju Raveendran', company: 'Byju\'s', image: startupAsset('byju-raveendran.png'), role: 'Founder & CEO' },
        { name: 'Falguni Nayar', company: 'Nykaa', image: startupAsset('falguni-nayar.png'), role: 'Founder & CEO' },
        { name: 'Kunal Shah', company: 'CRED', image: startupAsset('kunal-shah.png'), role: 'Founder & CEO' },
        { name: 'Deepinder Goyal', company: 'Zomato', image: startupAsset('deepinder-goyal.png'), role: 'Founder & CEO' },
        { name: 'Bhavish Aggarwal', company: 'Ola', image: startupAsset('bhavish-aggarwal.png'), role: 'Founder & CEO' }
      ];
      founderGrid.innerHTML = '';
      founders.forEach(f => {
        const card = document.createElement('div');
        card.className = 'founder-card glass-card';
        card.innerHTML = `<div class="founder-avatar"><img src="${f.image}" alt="${f.name}" loading="lazy"></div><h4>${f.name}</h4><p>${f.role}, ${f.company}</p>`;
        founderGrid.appendChild(card);
      });
    }

    // Modal
    const modal = document.getElementById('startup-modal');
    const modalClose = document.getElementById('startup-modal-close');
    const modalIcon = document.getElementById('startup-modal-icon');
    const modalTitle = document.getElementById('startup-modal-title');
    const modalSubtitle = document.getElementById('startup-modal-subtitle');
    const modalDescription = document.getElementById('startup-modal-description');
    const modalFounder = document.getElementById('startup-modal-founder');
    const modalCity = document.getElementById('startup-modal-city');
    const modalFunding = document.getElementById('startup-modal-funding');
    const modalValuation = document.getElementById('startup-modal-valuation');

    function openStartupModal(s, theme) {
      if (!modal) return;
      modalIcon.innerHTML = `<span style="font-size: 2rem">${theme.icon}</span>`;
      modalIcon.style.background = theme.gradient;
      modalTitle.textContent = s.name;
      modalSubtitle.textContent = s.subtitle;
      modalDescription.textContent = s.description;
      modalFounder.textContent = s.founder;
      modalCity.textContent = s.city;
      modalFunding.textContent = s.funding;
      modalValuation.textContent = s.valuation;
      modal.classList.add('open');
      document.body.classList.add('no-scroll');
    }

    modalClose?.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  window.IIE.StartupPage = { init: initStartupPage };
})();
