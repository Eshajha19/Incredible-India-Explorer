/**
 * Traditional Games Explorer - Interactive Logic
 * Handles dynamic card rendering, modal interactions, and accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Data Source
  const traditionalGames = [
    {
      id: 'chaturanga',
      name: 'Chaturanga',
      origin: 'Gupta Empire (6th Century)',
      era: '6th Century CE',
      global: 'Modern Chess',
      skill: 'Strategic Warfare',
      image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=600&q=80',
      excerpt: 'The ancient Indian strategy game that is the direct ancestor of modern Chess, simulating the four divisions of the military.',
      description: 'Chaturanga, meaning "four divisions," was played on an 8x8 uncheckered board. The four divisions were infantry (pawns), cavalry (knights), elephantry (bishops), and chariotry (rooks). It traveled to Persia as Shatranj and eventually to Europe, evolving into the Chess we know today.'
    },
    {
      id: 'moksha-patam',
      name: 'Moksha Patam',
      origin: 'Ancient India (13th Century)',
      era: '13th Century CE',
      global: 'Snakes & Ladders',
      skill: 'Moral Philosophy',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80',
      excerpt: 'A game of karma and destiny, where ladders represent virtues that lead to salvation, and snakes represent vices that drag you down.',
      description: 'Originally a Jain/Hindu spiritual game, Moksha Patam was designed to teach children about the consequences of karma. The original board had 100 squares, with virtues (faith, reliability, generosity) moving you up via ladders, and vices (disobedience, vanity, theft) pulling you down via snakes. British colonizers later simplified it into the modern game of Snakes & Ladders.'
    },
    {
      id: 'pachisi',
      name: 'Pachisi',
      origin: 'Ancient India (4th Century)',
      era: '4th Century CE',
      global: 'Ludo / Parcheesi',
      skill: 'Probability & Tactics',
      image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Known as the "National Game of India," this cross-and-circle board game was played by Mughal emperors with life-sized human pieces.',
      description: 'Pachisi is played on a cruciform board with cowrie shells used as dice. Emperor Akbar was so fond of the game that he had massive boards laid out in the courtyards of his palaces, using enslaved women or courtiers as the pieces themselves. It later evolved into the commercial games Ludo and Parcheesi.'
    },
    {
      id: 'pallanguzhi',
      name: 'Pallanguzhi',
      origin: 'Tamil Nadu (Ancient)',
      era: 'Ancient (Sangam Period)',
      global: 'Mancala Family',
      skill: 'Mental Arithmetic',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
      excerpt: 'A fast-paced counting game played with tamarind seeds or cowrie shells, serving as a brilliant tool for teaching mathematics.',
      description: 'Pallanguzhi is a traditional Mancala-style game played on a wooden board with 14 pits (7 on each side). Players use shells or seeds to sow and capture, requiring rapid mental addition and strategic foresight. It is traditionally played by women and children in Tamil Nadu during festivals like Aadi and Thai.'
    }
  ];

  // DOM Elements
  const gridContainer = document.getElementById('games-grid');
  const modal = document.getElementById('game-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  
  // Modal Content Elements
  const mTitle = document.getElementById('modal-title');
  const mOrigin = document.getElementById('modal-origin');
  const mImage = document.getElementById('modal-image');
  const mDesc = document.getElementById('modal-description');
  const mEra = document.getElementById('modal-era');
  const mGlobal = document.getElementById('modal-global');
  const mSkill = document.getElementById('modal-skill');

  // Render Cards
  function renderGames() {
    // Simulate brief loading state for UX
    setTimeout(() => {
      gridContainer.innerHTML = '';
      traditionalGames.forEach(game => {
        const card = document.createElement('article');
        card.className = 'game-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View details for ${game.name}`);
        card.dataset.id = game.id;

        card.innerHTML = `
          <div class="card-image-wrapper">
            <img src="${game.image}" alt="${game.name}" class="card-image" loading="lazy">
            <span class="card-badge">${game.era}</span>
          </div>
          <div class="card-content">
            <h3 class="card-title">${game.name}</h3>
            <div class="card-origin">
              <i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${game.origin}
            </div>
            <p class="card-excerpt">${game.excerpt}</p>
          </div>
        `;
        
        // Event Listeners for Card (Click & Keyboard)
        card.addEventListener('click', () => openModal(game));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(game);
          }
        });

        gridContainer.appendChild(card);
      });
    }, 300);
  }

  // Modal Logic
  function openModal(data) {
    mTitle.textContent = data.name;
    mOrigin.textContent = data.origin;
    mImage.src = data.image;
    mImage.alt = `Historical depiction of ${data.name}`;
    mDesc.textContent = data.description;
    mEra.textContent = data.era;
    mGlobal.textContent = data.global;
    mSkill.textContent = data.skill;

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
  renderGames();
});