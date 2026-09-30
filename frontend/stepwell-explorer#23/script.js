/**
 * Stepwell Explorer - Interactive Logic
 * Handles dynamic card rendering, modal interactions, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Data Source
  const stepwells = [
    {
      id: 'rani-ki-vav',
      name: 'Rani ki Vav',
      location: 'Patan, Gujarat',
      era: '11th Century',
      style: 'Maru-Gurjara',
      steps: '7 Levels',
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
      excerpt: 'A UNESCO World Heritage site, originally built as a memorial to a king, featuring over 500 principal sculptures.',
      description: 'Rani ki Vav (the Queen\'s Stepwell) is a stunning example of Maru-Gurjara architectural style. Built in the 11th century by Queen Udayamati, it is designed as an inverted temple highlighting the sanctity of water. It features seven levels of stairs with intricate sculptural panels depicting religious, mythological, and secular themes.'
    },
    {
      id: 'chand-baori',
      name: 'Chand Baori',
      location: 'Abhaneri, Rajasthan',
      era: '8th-9th Century',
      style: 'Rajput',
      steps: '3,500+ Steps',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
      excerpt: 'One of the deepest and largest stepwells in India, featuring a mesmerizing geometric zigzag pattern.',
      description: 'Chand Baori is a magnificent stepwell located in the village of Abhaneri. With 3,500 narrow steps arranged in a perfect geometric zigzag pattern across 13 stories, it plunges about 100 feet into the ground. It was built to harvest and conserve rainwater in the arid Thar Desert region.'
    },
    {
      id: 'agrasen-ki-baoli',
      name: 'Agrasen ki Baoli',
      location: 'New Delhi',
      era: '14th Century (Rebuilt)',
      style: 'Mughal/Rajput',
      steps: '108 Steps',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=600&q=80',
      excerpt: 'A protected monument in the heart of modern Delhi, known for its atmospheric arches and historical mystery.',
      description: 'Located on Hailey Road near Connaught Place, this 60-meter long and 15-meter wide stepwell is believed to have been originally built by the legendary King Agrasen, and later rebuilt by the Agrawal community in the 14th century. Its three-sided structure features arched niches and is a popular historical landmark in modern Delhi.'
    },
    {
      id: 'rajon-ki-baoli',
      name: 'Rajon ki Baoli',
      location: 'Mehrauli, Delhi',
      era: '1503 CE',
      style: 'Lodi',
      steps: '4 Levels',
      image: 'https://images.unsplash.com/photo-1626014903700-1c5c0663471e?auto=format&fit=crop&w=600&q=80',
      excerpt: 'A unique stepwell in the Mehrauli Archaeological Park, originally built for workers (Rajmistris) constructing nearby tombs.',
      description: 'Unlike traditional stepwells built by royalty, Rajon ki Baoli was constructed by Daulat Khan during the reign of Sikandar Lodi. It was specifically built to provide water to the masons and workers (Rajmistris) who were building the nearby tombs. It features a unique rectangular layout with arched alcoves.'
    }
  ];

  // DOM Elements
  const gridContainer = document.getElementById('stepwell-grid');
  const modal = document.getElementById('stepwell-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  
  // Modal Content Elements
  const mTitle = document.getElementById('modal-title');
  const mLocation = document.getElementById('modal-location');
  const mImage = document.getElementById('modal-image');
  const mDesc = document.getElementById('modal-description');
  const mEra = document.getElementById('modal-era');
  const mStyle = document.getElementById('modal-style');
  const mSteps = document.getElementById('modal-steps');

  // Render Cards
  function renderStepwells() {
    // Simulate brief loading state for UX
    setTimeout(() => {
      gridContainer.innerHTML = '';
      stepwells.forEach((sw, index) => {
        const card = document.createElement('article');
        card.className = 'stepwell-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View details for ${sw.name}`);
        card.dataset.id = sw.id;
        
        // Staggered animation delay
        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0'; // Initial state for animation

        card.innerHTML = `
          <div class="card-image-wrapper">
            <img src="${sw.image}" alt="${sw.name}" class="card-image" loading="lazy">
            <span class="card-badge">${sw.era}</span>
          </div>
          <div class="card-content">
            <h3 class="card-title">${sw.name}</h3>
            <div class="card-location">
              <i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${sw.location}
            </div>
            <p class="card-excerpt">${sw.excerpt}</p>
          </div>
        `;
        
        // Event Listeners for Card (Click & Keyboard)
        card.addEventListener('click', () => openModal(sw));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(sw);
          }
        });

        gridContainer.appendChild(card);
      });
    }, 300);
  }

  // Modal Logic
  function openModal(data) {
    mTitle.textContent = data.name;
    mLocation.textContent = data.location;
    mImage.src = data.image;
    mImage.alt = `Wide view of ${data.name}`;
    mDesc.textContent = data.description;
    mEra.textContent = data.era;
    mStyle.textContent = data.style;
    mSteps.textContent = data.steps;

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

  // Add global keyframe for JS-triggered animations
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(styleSheet);

  // Initialize
  renderStepwells();
});