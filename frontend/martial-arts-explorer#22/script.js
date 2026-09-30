/**
 * Martial Arts Explorer - Interactive Logic
 * Handles dynamic card rendering, modal interactions, and accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Data Source
  const martialArts = [
    {
      id: 'kalaripayattu',
      name: 'Kalaripayattu',
      region: 'Kerala',
      era: '3rd Century BCE',
      focus: 'Armed & Unarmed',
      weapon: 'Urumi (Flex Sword)',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Often called the "Mother of all Martial Arts", it combines combat techniques with Ayurvedic healing.',
      description: 'Kalaripayattu is an ancient Indian martial art and an art form that originated in modern-day Kerala. It includes strikes, kicks, grappling, preset forms, weaponry, and healing methods. It is deeply tied to Hindu philosophy and the spiritual traditions of the region.'
    },
    {
      id: 'gatka',
      name: 'Gatka',
      region: 'Punjab',
      era: '15th Century',
      focus: 'Weapon-based',
      weapon: 'Sword & Shield',
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80',
      excerpt: 'The Sikh martial art focused on spiritual discipline, swordsmanship, and fluid, rhythmic movements.',
      description: 'Gatka is the traditional martial art of the Sikhs. It is a spiritual practice as much as a combat system, emphasizing the use of wooden sticks to simulate swords. It is often performed during festivals and religious processions, showcasing the Sikh ethos of "Sant Sipahi" (Saint-Soldier).'
    },
    {
      id: 'silambam',
      name: 'Silambam',
      region: 'Tamil Nadu',
      era: 'Ancient (Sangam Period)',
      focus: 'Staff Fighting',
      weapon: 'Bamboo Staff',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=600&q=80',
      excerpt: 'One of the oldest Indian martial arts, famous for its dazzling, fast-paced staff fighting techniques.',
      description: 'Silambam is a traditional martial art from Tamil Nadu that primarily focuses on fighting with a long bamboo or wooden staff (usually around 1.68 meters). It incorporates footwork, body movements, and animal stances, and was historically used by warriors to defend against multiple opponents.'
    },
    {
      id: 'thang-ta',
      name: 'Thang-Ta (Huyen Langlon)',
      region: 'Manipur',
      era: '17th Century',
      focus: 'Armed & Unarmed',
      weapon: 'Sword & Spear',
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80',
      excerpt: 'The classical martial art of Manipur, combining graceful, dance-like movements with lethal combat.',
      description: 'Thang-Ta, also known as Huyen Langlon, is the traditional martial art of Manipur. "Thang" means sword and "Ta" means spear. It was developed by the Meitei people for warfare and is now also performed as a ritualistic and cultural dance, featuring fluid, acrobatic movements.'
    },
    {
      id: 'malla-yuddha',
      name: 'Malla Yuddha',
      region: 'Maharashtra / UP',
      era: 'Ancient (Epic Period)',
      focus: 'Wrestling',
      weapon: 'None (Grappling)',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=600&q=80',
      excerpt: 'The ancient Indian combat wrestling style, focusing on pure strength, leverage, and joint locks.',
      description: 'Malla Yuddha is the traditional Indian form of combat wrestling. It involves no weapons, focusing entirely on grappling, bodybuilding, and mental discipline. Historically practiced in "Akhadas" (wrestling pits), it was the combat style of choice for warriors like Bhima from the Mahabharata.'
    },
    {
      id: 'kushti',
      name: 'Pehlwani (Kushti)',
      region: 'North India',
      era: '16th Century (Mughal Era)',
      focus: 'Wrestling',
      weapon: 'None (Grappling)',
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80',
      excerpt: 'A synthesis of Indian Malla Yuddha and Persian Varzesh-e Bastani, practiced in traditional mud pits.',
      description: 'Pehlwani, or Kushti, is a form of wrestling developed in the Indian subcontinent. It is a synthesis of ancient Indian Malla Yuddha and Persian Varzesh-e Bastani. Practitioners (Pehlwans) train in a "Kushti" pit made of clay, salt, and turmeric, following a strict diet and lifestyle.'
    }
  ];

  // DOM Elements
  const gridContainer = document.getElementById('arts-grid');
  const modal = document.getElementById('art-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  
  // Modal Content Elements
  const mTitle = document.getElementById('modal-title');
  const mRegion = document.getElementById('modal-region');
  const mImage = document.getElementById('modal-image');
  const mDesc = document.getElementById('modal-description');
  const mEra = document.getElementById('modal-era');
  const mFocus = document.getElementById('modal-focus');
  const mWeapon = document.getElementById('modal-weapon');

  // Render Cards
  function renderArts() {
    // Simulate brief loading state for UX
    setTimeout(() => {
      gridContainer.innerHTML = '';
      martialArts.forEach(art => {
        const card = document.createElement('article');
        card.className = 'art-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View details for ${art.name}`);
        card.dataset.id = art.id;

        card.innerHTML = `
          <div class="card-image-wrapper">
            <img src="${art.image}" alt="${art.name}" class="card-image" loading="lazy">
            <span class="card-badge">${art.era}</span>
          </div>
          <div class="card-content">
            <h3 class="card-title">${art.name}</h3>
            <div class="card-location">
              <i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${art.region}
            </div>
            <p class="card-excerpt">${art.excerpt}</p>
          </div>
        `;
        
        // Event Listeners for Card (Click & Keyboard)
        card.addEventListener('click', () => openModal(art));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(art);
          }
        });

        gridContainer.appendChild(card);
      });
    }, 300);
  }

  // Modal Logic
  function openModal(data) {
    mTitle.textContent = data.name;
    mRegion.textContent = data.region;
    mImage.src = data.image;
    mImage.alt = `Wide view of ${data.name} practitioners`;
    mDesc.textContent = data.description;
    mEra.textContent = data.era;
    mFocus.textContent = data.focus;
    mWeapon.textContent = data.weapon;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    modalCloseBtn.focus(); // Trap focus
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event Listeners for Modal
  modalCloseBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Initialize
  renderArts();
});