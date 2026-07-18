window.IIE = window.IIE || {};
(function() {
  'use strict';

  const musicAsset = fileName => `assets/music/${encodeURIComponent(fileName)}`;

  const genreData = [
    { id: 'hindustani', name: 'Hindustani Classical', era: 'Medieval Period', region: 'North India', image: musicAsset('hindustani.png'), summary: 'A melodic tradition built on raga and tala, shaped by centuries of court and temple patronage.', description: 'Hindustani classical music emphasizes improvisation within raga structures. Its gharana system preserved distinct stylistic lineages across generations.', highlights: ['Raga system', 'Khayal & Dhrupad', 'Gharana tradition'] },
    { id: 'carnatic', name: 'Carnatic Classical', era: '15th century', region: 'South India', image: musicAsset('carnatic.png'), summary: 'A deeply devotional and structured tradition centered on composition and rhythmic complexity.', description: 'Carnatic music is known for its intricate rhythms, fixed compositions, and emphasis on vocal music. The Trinity of Carnatic music shaped its modern form.', highlights: ['Kriti compositions', 'Raga system', 'Trinity of Carnatic'] },
    { id: 'folk-tribal', name: 'Folk & Tribal', era: 'Ancient', region: 'Across India', image: musicAsset('folk-tribal.png'), summary: 'Community-rooted music from village life, seasons, and festivals across India.', description: "India's folk music varies by region, from Bhangra in Punjab to Bhavageete in Karnataka. It uses local instruments and reflects daily life.", highlights: ['Regional diversity', 'Seasonal songs', 'Community dance'] },
    { id: 'filmi', name: 'Film Music (Bollywood)', era: '1930s-present', region: 'National', image: musicAsset('filmi.png'), summary: 'India\'s most popular music genre, blending classical, folk, and global influences.', description: 'Indian film music evolved from classical-based songs to fusion with pop, rock, and electronic. It drives India\'s massive music industry and reaches billions of listeners worldwide.', highlights: ['Bollywood hits', 'Playback singing', 'Global reach'] },
    { id: 'indie-fusion', name: 'Indie & Fusion', era: '2000s-present', region: 'Urban India', image: musicAsset('indie-fusion.png'), summary: 'Contemporary independent music blending Indian traditions with global genres.', description: 'The indie scene includes rock, electronic, hip-hop, and fusion acts. Bands like Indian Ocean and artists like Prateek Kuhad have built global audiences outside the film industry.', highlights: ['Rock & electronic', 'Fusion experiments', 'Independent spirit'] }
  ];

  const artistData = [
    { id: 'ravi-shankar', name: 'Ravi Shankar', category: 'hindustani', subtitle: 'Sitar maestro', image: musicAsset('ravi-shankar.png'), summary: 'Introduced Indian classical music to Western audiences and collaborated with global artists.', detail: 'Ravi Shankar\'s sitar performances at Monterey Pop and Woodstock put Indian classical music on the world stage. He taught Western audiences to appreciate raga, and his collaborations with George Harrison, Yehudi Menuhin, and Philip Glass created cross-cultural dialogues that still resonate.', instrument: 'Sitar' },
    { id: 'bismillah-khan', name: 'Bismillah Khan', category: 'hindustani', subtitle: 'Shehnai legend', image: musicAsset('bismillah-khan.png'), summary: 'Elevated the shehnai from folk instrument to classical concert stage.', detail: 'Bismillah Khan made the shehnai a respected classical instrument. His performance at the Red Fort on Independence Day became a national tradition. He represented India\'s cultural heritage at festivals worldwide, earning the Bharat Ratna.', instrument: 'Shehnai' },
    { id: 'ms-subbulakshmi', name: 'M. S. Subbulakshmi', category: 'carnatic', subtitle: 'Queen of Carnatic music', image: musicAsset('ms-subbulakshmi.png'), summary: 'First Indian musician to perform at the United Nations General Assembly.', detail: 'M. S. Subbulakshmi\'s divine voice and stage presence made her an icon of Carnatic music. Her rendering of bhajals and classical compositions earned her the Bharat Ratna, and her UN performance showcased India\'s spiritual musical heritage to the world.', instrument: 'Vocals' },
    { id: 'ar-rahman', name: 'A. R. Rahman', category: 'filmi', subtitle: 'Mozart of Madras', image: musicAsset('ar-rahman.png'), summary: 'Oscar-winning composer who redefined Indian film music with global fusion.', detail: 'A. R. Rahman\'s Oscar and Grammy wins for "Slumdog Millionaire" marked Indian music\'s global arrival. His unique sound blends classical, folk, electronic, and orchestral elements, creating a signature style that influences composers worldwide.', instrument: 'Keyboards, Vocals' },
    { id: 'shreya-ghoshal', name: 'Shreya Ghoshal', category: 'filmi', subtitle: 'Playback singing icon', image: musicAsset('shreya-ghoshal.png'), summary: 'One of India\'s most versatile and beloved playback singers.', detail: 'Shreya Ghoshal\'s journey from winning a TV show to becoming a top playback singer spans multiple languages and genres. Her expressive voice and classical training make her equally adept at folk, classical, and contemporary film songs.', instrument: 'Vocals' },
    { id: 'gurdas-maan', name: 'Gurdas Maan', category: 'folk-tribal', subtitle: 'Punjabi folk ambassador', image: musicAsset('gurdas-maan.png'), summary: 'Iconic Punjabi singer who brought folk music to global audiences.', detail: 'Gurdas Maan\'s powerful voice and meaningful lyrics have made him a cultural ambassador for Punjab. His blend of traditional folk with contemporary themes has earned him fans across generations and continents.', instrument: 'Vocals, Tumbi' },
    { id: 'indian-ocean', name: 'Indian Ocean', category: 'indie-fusion', subtitle: 'Pioneers of fusion rock', image: musicAsset('indian-ocean.png'), summary: 'Band that defined the Indian indie-fusion sound with poetic lyrics.', detail: 'Indian Ocean created a distinctly Indian sound by blending rock instrumentation with folk melodies and socially conscious lyrics. Their albums "Kandisa" and "Black Friday" became milestones in Indian independent music.', instrument: 'Guitars, Drums, Tabla' }
  ];

  const instrumentData = [
    { id: 'sitar', name: 'Sitar', category: 'string', image: musicAsset('sitar.png'), summary: 'Plucked string instrument known for its resonant, twanging sound.', description: 'The sitar has a long neck, a gourd resonator, and sympathetic strings that create its signature shimmering timbre. It became globally recognized through Ravi Shankar\'s international performances.', soundsLike: 'Resonant, twanging, meditative' },
    { id: 'tabla', name: 'Tabla', category: 'percussion', image: musicAsset('tabla.png'), summary: 'Paired hand drums central to Hindustani rhythm.', description: 'The tabla consists of a smaller wooden drum (dayan) and a larger metal drum (bayan). Its complex bol system allows intricate rhythmic patterns (tala) that can mimic speech patterns.', soundsLike: 'Sharp, melodic, conversational' },
    { id: 'veena', name: 'Veena', category: 'string', image: musicAsset('veena.png'), summary: 'Ancient plucked string instrument associated with Saraswati.', description: 'The veena has a distinctive hollow body with two resonators and seven strings. It is the primary instrument of Carnatic music and is considered one of India\'s oldest instruments, dating back to Vedic times.', soundsLike: 'Deep, resonant, divine' },
    { id: 'bansuri', name: 'Bansuri', category: 'wind', image: musicAsset('bansuri.png'), summary: 'Bamboo flute associated with Lord Krishna.', description: 'The bansuri is a transverse bamboo flute with six or seven holes. Its hauntingly sweet tone makes it ideal for both classical raga and devotional music. Hariprasad Chaurasia is its most famous exponent.', soundsLike: 'Sweet, airy, haunting' },
    { id: 'mridangam', name: 'Mridangam', category: 'percussion', image: musicAsset('mridangam.png'), summary: 'Primary percussion instrument in Carnatic music.', description: 'The mridangam is a double-sided drum made from jackfruit wood. Its complex rhythmic patterns provide the foundation for Carnatic performances, with each side tuned to different pitches for melodic percussion.', soundsLike: 'Deep, crisp, rhythmic' },
    { id: 'harmonium', name: 'Harmonium', category: 'wind', image: musicAsset('harmonium.png'), summary: 'Keyboard instrument widely used in Indian music.', description: 'The hand-pumped harmonium was introduced by European missionaries but became a staple of Indian music. It accompanies vocal performances, bhajans, and qawwalis, providing melodic and harmonic support.', soundsLike: 'Droning, melodic, versatile' }
  ];

  function initMusicPage() {
    const artistGrid = document.getElementById('music-artist-grid');
    const instrumentGrid = document.getElementById('music-instrument-grid');
    const filterButtons = document.querySelectorAll('[data-music-filter]');
    const modal = document.getElementById('music-modal');
    const modalClose = document.getElementById('music-modal-close');
    const modalImg = document.getElementById('music-modal-img');
    const modalCategory = document.getElementById('music-modal-category');
    const modalTitle = document.getElementById('music-modal-title');
    const modalSubtitle = document.getElementById('music-modal-subtitle');
    const modalBody = document.getElementById('music-modal-body');
    const modalDetail = document.getElementById('music-modal-detail');

    if (!artistGrid || !instrumentGrid || !filterButtons.length || !modal || !modalClose) return;

    document.querySelectorAll('.fade-in-section').forEach(s => s.classList.add('is-visible'));

    let activeCategory = 'all';

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-music-filter') || 'all';
        filterButtons.forEach(b => { b.classList.toggle('active', (b.getAttribute('data-music-filter') || 'all') === activeCategory); });
        renderAll();
      });
    });

    modalClose.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.classList.remove('open'); });

    renderAll();

    function renderAll() {
      renderArtists();
      renderInstruments();
    }

    function renderArtists() {
      artistGrid.innerHTML = '';
      const filtered = activeCategory === 'all' ? artistData : artistData.filter(a => a.category === activeCategory);

      filtered.forEach(artist => {
        const card = document.createElement('article');
        card.className = 'music-artist-card glass-card';
        card.innerHTML = `<div class="music-artist-media"><img src="${artist.image}" alt="${artist.name}" loading="lazy"></div><div class="music-artist-body"><span class="music-badge">${artist.category}</span><h3>${artist.name}</h3><p class="music-artist-subtitle">${artist.subtitle}</p><p class="music-artist-summary">${artist.summary}</p><div class="music-artist-footer"><span class="music-instrument-tag">${artist.instrument}</span></div></div>`;
        card.addEventListener('click', () => {
          modalImg.innerHTML = `<img src="${artist.image}" alt="${artist.name}" loading="lazy">`;
          modalCategory.textContent = artist.category; modalTitle.textContent = artist.name;
          modalSubtitle.textContent = artist.subtitle;
          modalBody.innerHTML = `<p><strong>Instrument:</strong> ${artist.instrument}</p><p>${artist.summary}</p>`;
          modalDetail.textContent = artist.detail;
          modal.classList.add('open');
        });
        artistGrid.appendChild(card);
      });
    }

    function renderInstruments() {
      instrumentGrid.innerHTML = '';
      instrumentData.forEach(inst => {
        const card = document.createElement('article');
        card.className = 'music-instrument-card glass-card';
        card.innerHTML = `<div class="music-instrument-media"><img src="${inst.image}" alt="${inst.name}" loading="lazy"></div><div class="music-instrument-body"><span class="music-badge">${inst.category}</span><h3>${inst.name}</h3><p class="music-instrument-summary">${inst.summary}</p><p class="music-instrument-sound"><strong>Sounds like:</strong> ${inst.soundsLike}</p></div>`;
        card.addEventListener('click', () => {
          modalImg.innerHTML = `<img src="${inst.image}" alt="${inst.name}" loading="lazy">`;
          modalCategory.textContent = inst.category; modalTitle.textContent = inst.name;
          modalSubtitle.textContent = inst.category.charAt(0).toUpperCase() + inst.category.slice(1) + ' Instrument';
          modalBody.innerHTML = `<p>${inst.description}</p><p><strong>Sounds like:</strong> ${inst.soundsLike}</p>`;
          modalDetail.textContent = '';
          modal.classList.add('open');
        });
        instrumentGrid.appendChild(card);
      });
    }
  }

  window.IIE.MusicPage = { init: initMusicPage };
})();
