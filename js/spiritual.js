window.IIE = window.IIE || {};
(function() {
  'use strict';

  const spiritualData = [
    { id: 'sp1', name: 'Varanasi Ghats', subtitle: 'Ancient spiritual capital', image: 'assets/spiritual/varanasi.png', description: 'Varanasi, one of the world\'s oldest living cities, sits on the banks of the Ganges. The ghats host daily Ganga Aarti ceremonies, attracting pilgrims who perform ritual bathing and prayers at sunrise and sunset.' },
    { id: 'sp2', name: 'Golden Temple', subtitle: 'Sikhism\'s holiest shrine', image: 'assets/spiritual/golden-temple.png', description: 'The Harmandir Sahib in Amritsar is covered in real gold and surrounded by the sacred Amrit Sarovar (holy tank). The temple serves free meals (langar) to over 100,000 visitors daily, regardless of religion or background.' },
    { id: 'sp3', name: 'Rishikesh Ashrams', subtitle: 'Yoga capital of the world', image: 'assets/spiritual/rishikesh.png', description: 'Nestled in the Himalayan foothills along the Ganges, Rishikesh is a global center for yoga, meditation, and spiritual retreats. The Beatles famously visited Maharishi Mahesh Yogi\'s ashram here in 1968.' },
    { id: 'sp4', name: 'Bodh Gaya Temple', subtitle: 'Where Buddha attained enlightenment', image: 'assets/spiritual/bodhgaya.png', description: 'The Mahabodhi Temple complex marks the spot where Siddhartha Gautama attained enlightenment under the Bodhi tree. It is the most sacred site in Buddhism, attracting pilgrims from around the world.' },
    { id: 'sp5', name: 'Somnath Temple', subtitle: 'First Jyotirlinga', image: 'assets/spiritual/somnath.png', description: 'The Somnath Temple in Gujarat is one of the 12 Jyotirlingas dedicated to Lord Shiva. The temple has been rebuilt several times after invasions, symbolizing the resilience of faith.' },
    { id: 'sp6', name: 'Kashi Vishwanath', subtitle: 'Lord of the Universe', image: 'assets/spiritual/kashi-vishwanath.png', description: 'The Kashi Vishwanath Temple in Varanasi is one of the most famous Shiva temples in India. Its gold-plated spire and the sacred Ganges nearby make it a focal point of Hindu devotion.' },
    { id: 'sp7', name: 'Tirupati Balaji', subtitle: 'Richest temple in India', image: 'assets/spiritual/tirupati.png', description: 'The Tirumala Venkateswara Temple in Andhra Pradesh is one of the most visited pilgrimage sites in the world, drawing millions of devotees annually who offer their prayers and donations.' },
    { id: 'sp8', name: 'Ajmer Sharif', subtitle: 'Sufi saint\'s shrine', image: 'assets/spiritual/ajmer-sharif.png', description: 'The dargah of Khwaja Moinuddin Chishti in Ajmer is one of the most important Sufi shrines in India. Devotees of all faiths visit to seek blessings at this symbol of communal harmony.' },
    { id: 'sp9', name: 'Sanchi Stupa', subtitle: 'Ancient Buddhist monument', image: 'assets/spiritual/sanchi.png', description: 'The Great Stupa at Sanchi, built by Emperor Ashoka in the 3rd century BCE, is one of the oldest stone structures in India. Its intricate gateways (toranas) depict scenes from Buddha\'s life.' },
    { id: 'sp10', name: 'Konark Sun Temple', subtitle: 'Chariot of the Sun God', image: 'assets/spiritual/konark.png', description: 'The 13th-century Sun Temple at Konark, Odisha, is designed as a colossal chariot with 24 stone wheels pulled by seven horses. It represents the passage of time and celestial cycles.' }
  ];

  function initSpiritualCarousel() {
    const track = document.getElementById('spiritual-carousel-track');
    const prevBtn = document.getElementById('spiritual-carousel-prev');
    const nextBtn = document.getElementById('spiritual-carousel-next');
    const dotsContainer = document.getElementById('spiritual-carousel-dots');
    const detailPanel = document.getElementById('spiritual-detail-panel');
    const detailName = document.getElementById('spiritual-detail-name');
    const detailSubtitle = document.getElementById('spiritual-detail-subtitle');
    const detailDesc = document.getElementById('spiritual-detail-description');

    if (!track) return;

    let currentIndex = 0;

    render();

    function render() {
      track.innerHTML = '';
      spiritualData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `spiritual-carousel-card ${index === currentIndex ? 'active' : ''}`;
        card.innerHTML = `<img src="${item.image}" alt="${item.name}" loading="lazy"><div class="spiritual-card-body"><h3>${item.name}</h3><p>${item.subtitle}</p></div>`;
        card.addEventListener('click', () => selectItem(index));
        track.appendChild(card);
      });
      updateDots();
      updateDetail(spiritualData[currentIndex]);
    }

    function selectItem(index) {
      currentIndex = index;
      const cards = track.querySelectorAll('.spiritual-carousel-card');
      cards.forEach((c, i) => c.classList.toggle('active', i === currentIndex));
      updateDots();
      updateDetail(spiritualData[currentIndex]);
    }

    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      spiritualData.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = `spiritual-dot ${index === currentIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => selectItem(index));
        dotsContainer.appendChild(dot);
      });
    }

    function updateDetail(item) {
      if (!detailPanel) return;
      if (detailName) detailName.textContent = item.name;
      if (detailSubtitle) detailSubtitle.textContent = item.subtitle;
      if (detailDesc) detailDesc.textContent = item.description;
    }

    prevBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + spiritualData.length) % spiritualData.length;
      selectItem(currentIndex);
    });

    nextBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % spiritualData.length;
      selectItem(currentIndex);
    });
  }

  window.IIE.SpiritualCarousel = { init: initSpiritualCarousel };
})();
