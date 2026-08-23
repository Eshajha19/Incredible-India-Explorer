// Art Cards - Vanilla JS card components for Indian Art & Craft Gallery
import { ART_FORMS, ART_MEDIUMS, SKILL_LEVELS, FORMATTERS } from './artTypes.js';
import { artStats } from './artData.js';

// Create Stat Card
export function createStatCard(value, label, icon = '', color = '#FF6B6B') {
  const card = document.createElement('div');
  card.className = 'art-stat-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${color}22, ${color}11);
    border: 1px solid ${color}33;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease;
  `;
  card.innerHTML = `
    <div style="font-size: 28px; margin-bottom: 8px;">${icon}</div>
    <div style="font-size: 28px; font-weight: 700; color: ${color};">${value}</div>
    <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">${label}</div>
  `;
  card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
  card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
  return card;
}

// Create Artwork Card
export function createArtworkCard(artwork, onSelect) {
  const card = document.createElement('div');
  card.className = 'art-artwork-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${artwork.color}22, ${artwork.color}11);
    border: 1px solid ${artwork.color}44;
    border-radius: 16px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  `;

  const artForm = ART_FORMS.find(f => f.id === artwork.artForm);
  const skillLevel = SKILL_LEVELS.find(s => s.id === artwork.difficulty);
  const stars = '★'.repeat(Math.floor(artwork.rating)) + (artwork.rating % 1 >= 0.5 ? '½' : '');

  card.innerHTML = `
    <div style="
      height: 120px;
      background: linear-gradient(135deg, ${artwork.color}44, ${artwork.color}22);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 56px;
      margin-bottom: 12px;
    ">${artwork.images[0]}</div>
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
      <h4 style="margin: 0; color: #f1f5f9; font-size: 15px; flex: 1;">${artwork.name}</h4>
      <span style="
        background: ${skillLevel?.color || '#666'}33;
        color: ${skillLevel?.color || '#ccc'};
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 10px;
      ">${skillLevel?.name || artwork.difficulty}</span>
    </div>
    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">${artForm?.name || artwork.artForm} • ${artwork.state}</p>
    <p style="margin: 0 0 12px; color: #cbd5e1; font-size: 12px; line-height: 1.4;">${artwork.description.substring(0, 80)}...</p>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="color: #fbbf24; font-size: 12px;">${stars}</span>
        <span style="color: #94a3b8; font-size: 11px; margin-left: 4px;">${artwork.rating}</span>
      </div>
      <div style="font-size: 16px; font-weight: 700; color: ${artwork.color};">${FORMATTERS.formatPrice(artwork.price)}</div>
    </div>
    <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 11px; color: #94a3b8;">
      👨‍🎨 ${artwork.artist}
    </div>
  `;

  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
    card.style.borderColor = artwork.color;
    card.style.boxShadow = `0 8px 24px ${artwork.color}33`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.borderColor = `${artwork.color}44`;
    card.style.boxShadow = 'none';
  });
  if (onSelect) card.addEventListener('click', () => onSelect(artwork));

  return card;
}

// Create Artwork Detail Panel
export function createArtworkDetailPanel(artwork) {
  const panel = document.createElement('div');
  panel.className = 'art-detail-panel';
  panel.style.cssText = `
    background: rgba(30, 41, 59, 0.95);
    border: 2px solid ${artwork.color}44;
    border-radius: 20px;
    padding: 24px;
    margin-top: 20px;
  `;

  const artForm = ART_FORMS.find(f => f.id === artwork.artForm);
  const medium = ART_MEDIUMS.find(m => m.id === artwork.medium);
  const skillLevel = SKILL_LEVELS.find(s => s.id === artwork.difficulty);

  const materialsList = artwork.materials.map(m => `
    <span style="
      background: ${artwork.color}22;
      color: ${artwork.color};
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 11px;
      margin: 0 4px 4px 0;
      display: inline-block;
    ">${m}</span>
  `).join('');

  panel.innerHTML = `
    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
      <div style="
        width: 140px;
        height: 140px;
        background: linear-gradient(135deg, ${artwork.color}44, ${artwork.color}22);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 72px;
      ">${artwork.images[0]}</div>
      <div style="flex: 1;">
        <h2 style="margin: 0 0 4px; color: #f1f5f9; font-size: 22px;">${artwork.name}</h2>
        <p style="margin: 0 0 8px; color: #94a3b8; font-size: 13px;">by ${artwork.artist} • ${artwork.state}</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
          <span style="background: ${artForm?.color || '#666'}33; color: ${artForm?.color || '#ccc'}; padding: 4px 10px; border-radius: 12px; font-size: 11px;">
            ${artForm?.icon || '🎨'} ${artForm?.name || artwork.artForm}
          </span>
          <span style="background: ${medium?.color || '#666'}33; color: ${medium?.color || '#ccc'}; padding: 4px 10px; border-radius: 12px; font-size: 11px;">
            ${medium?.icon || '🎨'} ${medium?.name || artwork.medium}
          </span>
          <span style="background: ${skillLevel?.color || '#666'}33; color: ${skillLevel?.color || '#ccc'}; padding: 4px 10px; border-radius: 12px; font-size: 11px;">
            ${skillLevel?.name || artwork.difficulty}
          </span>
        </div>
        <div style="font-size: 24px; font-weight: 700; color: ${artwork.color};">${FORMATTERS.formatPrice(artwork.price)}</div>
      </div>
    </div>

    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
      <h4 style="margin: 0 0 8px; color: #f1f5f9; font-size: 14px;">📖 About This Artwork</h4>
      <p style="margin: 0; color: #cbd5e1; font-size: 13px; line-height: 1.5;">${artwork.description}</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
      <div>
        <h4 style="color: #f1f5f9; margin: 0 0 12px; font-size: 14px;">🛠 Materials Used</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 4px;">${materialsList}</div>
      </div>
      <div>
        <h4 style="color: #f1f5f9; margin: 0 0 12px; font-size: 14px;">📐 Details</h4>
        <div style="font-size: 13px; color: #cbd5e1;">
          <p style="margin: 0 0 8px;"><strong>Dimensions:</strong> ${artwork.dimensions}</p>
          <p style="margin: 0 0 8px;"><strong>Technique:</strong> ${artwork.technique}</p>
          <p style="margin: 0;"><strong>Rating:</strong> ⭐ ${artwork.rating}/5.0</p>
        </div>
      </div>
    </div>

    <div style="
      background: rgba(255,255,255,0.05);
      border-radius: 12px;
      padding: 16px;
      border-left: 3px solid ${artwork.color};
    ">
      <h4 style="margin: 0 0 8px; color: #f1f5f9; font-size: 14px;">📜 Historical Significance</h4>
      <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">${artwork.history}</p>
    </div>
  `;

  return panel;
}

// Create Artisan Card
export function createArtisanCard(artisan) {
  const card = document.createElement('div');
  card.className = 'art-artisan-card';
  card.style.cssText = `
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
  `;

  const artForm = ART_FORMS.find(f => f.id === artisan.speciality);

  card.innerHTML = `
    <div style="
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, ${artForm?.color || '#FF6B6B'}44, ${artForm?.color || '#FF6B6B'}22);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin: 0 auto 12px;
    ">${artForm?.icon || '🎨'}</div>
    <h4 style="margin: 0 0 4px; color: #f1f5f9; font-size: 16px;">${artisan.name}</h4>
    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">${artForm?.name || artisan.speciality} • ${artisan.state}</p>
    <p style="margin: 0 0 8px; color: #cbd5e1; font-size: 12px;">${artisan.experience} years experience</p>
    <div style="margin-bottom: 8px;">
      ${artisan.awards.map(a => `
        <span style="
          background: #fbbf2422;
          color: #fbbf24;
          padding: 2px 8px;
          border-radius: 8px;
          font-size: 10px;
          margin: 0 2px;
        ">🏅 ${a}</span>
      `).join('')}
    </div>
    <div style="color: #fbbf24; font-size: 12px;">⭐ ${artisan.rating}/5.0</div>
  `;

  card.addEventListener('mouseenter', () => {
    card.style.borderColor = artForm?.color || '#FF6B6B';
    card.style.transform = 'translateY(-4px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    card.style.transform = 'translateY(0)';
  });

  return card;
}

// Create Workshop Card
export function createWorkshopCard(workshop, onBook) {
  const card = document.createElement('div');
  card.className = 'art-workshop-card';
  card.style.cssText = `
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 20px;
    transition: all 0.3s ease;
  `;

  const artForm = ART_FORMS.find(f => f.id === workshop.artForm);
  const level = SKILL_LEVELS.find(s => s.id === workshop.level);
  const durationStr = FORMATTERS.formatDuration(workshop.duration);

  card.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <div style="
        width: 48px;
        height: 48px;
        background: ${artForm?.color || '#666'}33;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      ">${artForm?.icon || '🎨'}</div>
      <div>
        <h4 style="margin: 0; color: #f1f5f9; font-size: 15px;">${workshop.title}</h4>
        <p style="margin: 2px 0 0; font-size: 11px; color: #94a3b8;">by ${workshop.instructor}</p>
      </div>
    </div>
    <div style="display: flex; gap: 12px; margin-bottom: 12px; font-size: 12px; color: #94a3b8;">
      <span>⏱ ${durationStr}</span>
      <span>👥 Max ${workshop.maxParticipants}</span>
      <span style="color: ${level?.color || '#ccc'};">📊 ${level?.name || workshop.level}</span>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: 20px; font-weight: 700; color: ${artForm?.color || '#FF6B6B'};">${FORMATTERS.formatPrice(workshop.price)}</div>
      <button class="book-btn" style="
        background: ${artForm?.color || '#FF6B6B'};
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: opacity 0.2s ease;
      ">Book Now</button>
    </div>
  `;

  card.addEventListener('mouseenter', () => card.style.borderColor = artForm?.color || '#FF6B6B');
  card.addEventListener('mouseleave', () => card.style.borderColor = 'rgba(255, 255, 255, 0.1)');

  const bookBtn = card.querySelector('.book-btn');
  bookBtn.addEventListener('mouseenter', () => bookBtn.style.opacity = '0.8');
  bookBtn.addEventListener('mouseleave', () => bookBtn.style.opacity = '1');
  if (onBook) bookBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    onBook(workshop);
  });

  return card;
}

// Create Art Form Card
export function createArtFormCard(artForm, artworksCount) {
  const card = document.createElement('div');
  card.className = 'art-form-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${artForm.color}22, ${artForm.color}11);
    border: 1px solid ${artForm.color}44;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
  `;

  card.innerHTML = `
    <div style="font-size: 40px; margin-bottom: 12px;">${artForm.icon}</div>
    <h4 style="margin: 0 0 4px; color: ${artForm.color}; font-size: 16px;">${artForm.name}</h4>
    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">${artForm.origin}</p>
    <p style="margin: 0 0 12px; color: #cbd5e1; font-size: 11px; line-height: 1.4;">${artForm.description}</p>
    <div style="
      font-size: 20px;
      font-weight: 700;
      color: ${artForm.color};
    ">${artworksCount}</div>
    <div style="font-size: 11px; color: #94a3b8;">Artworks</div>
  `;

  card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
  card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');

  return card;
}

// Create Filter Button Group
export function createFilterButtonGroup(options, onSelect) {
  const container = document.createElement('div');
  container.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  `;

  let selectedId = options[0]?.id;

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'art-filter-btn';
    btn.style.cssText = `
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid ${option.color || 'rgba(255,255,255,0.2)'}44;
      background: ${option.id === selectedId ? (option.color || '#FF6B6B') + '33' : 'rgba(255,255,255,0.05)'};
      color: ${option.id === selectedId ? (option.color || '#FF6B6B') : '#94a3b8'};
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    `;
    btn.innerHTML = `${option.icon || ''} ${option.name}`;
    btn.dataset.id = option.id;

    btn.addEventListener('click', () => {
      selectedId = option.id;
      container.querySelectorAll('.art-filter-btn').forEach(b => {
        b.style.background = 'rgba(255,255,255,0.05)';
        b.style.color = '#94a3b8';
      });
      btn.style.background = (option.color || '#FF6B6B') + '33';
      btn.style.color = option.color || '#FF6B6B';
      if (onSelect) onSelect(option.id);
    });

    container.appendChild(btn);
  });

  return container;
}

// Create Search Input
export function createSearchInput(placeholder, onSearch) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: relative;
    margin-bottom: 16px;
  `;
  wrapper.innerHTML = `
    <input type="text" placeholder="${placeholder}" style="
      width: 100%;
      padding: 12px 16px 12px 44px;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: #f1f5f9;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s ease;
    " />
    <span style="
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      color: #94a3b8;
    ">🔍</span>
  `;

  const input = wrapper.querySelector('input');
  input.addEventListener('focus', () => input.style.borderColor = '#FF6B6B');
  input.addEventListener('blur', () => input.style.borderColor = 'rgba(255, 255, 255, 0.1)');
  input.addEventListener('input', (e) => {
    if (onSearch) onSearch(e.target.value);
  });

  return wrapper;
}

// Create Price Range Slider
export function createPriceRangeSlider(min, max, onChange) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
  `;

  let currentMin = min;
  let currentMax = max;

  wrapper.innerHTML = `
    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
      <h4 style="margin: 0; color: #f1f5f9; font-size: 14px;">💰 Price Range</h4>
      <span style="color: #94a3b8; font-size: 12px;">${FORMATTERS.formatPrice(currentMin)} - ${FORMATTERS.formatPrice(currentMax)}</span>
    </div>
    <input type="range" min="${min}" max="${max}" value="${min}" style="width: 100%; accent-color: #FF6B6B;" />
  `;

  const range = wrapper.querySelector('input[type="range"]');
  const valueDisplay = wrapper.querySelector('span');

  range.addEventListener('input', (e) => {
    currentMin = parseInt(e.target.value);
    valueDisplay.textContent = `${FORMATTERS.formatPrice(currentMin)} - ${FORMATTERS.formatPrice(currentMax)}`;
    if (onChange) onChange(currentMin, currentMax);
  });

  return wrapper;
}

// Export all creators
export const ArtCards = {
  createStatCard,
  createArtworkCard,
  createArtworkDetailPanel,
  createArtisanCard,
  createWorkshopCard,
  createArtFormCard,
  createFilterButtonGroup,
  createSearchInput,
  createPriceRangeSlider
};

export default ArtCards;