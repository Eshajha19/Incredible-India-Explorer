// Yoga Cards - Vanilla JS card components for Yoga & Wellness Guide
import { YOGA_STYLES, CHAKRAS, PRANAYAMA_TECHNIQUES, MEDITATION_TYPES, ASANA_CATEGORIES, FORMATTERS } from './yogaTypes.js';
import { yogaStats } from './yogaData.js';

// Create Stat Card
export function createStatCard(value, label, icon = '', color = '#FF6B6B') {
  const card = document.createElement('div');
  card.className = 'yoga-stat-card';
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

// Create Asana Card
export function createAsanaCard(asana, onSelect) {
  const card = document.createElement('div');
  card.className = 'yoga-asana-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${asana.color}22, ${asana.color}11);
    border: 1px solid ${asana.color}44;
    border-radius: 16px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  `;

  const category = ASANA_CATEGORIES.find(c => c.id === asana.category);
  const difficultyColors = { beginner: '#34d399', intermediate: '#fbbf24', advanced: '#f87171' };
  const diffColor = difficultyColors[asana.difficulty] || '#94a3b8';

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
      <div style="font-size: 36px;">${asana.icon}</div>
      <span style="
        background: ${diffColor}22;
        color: ${diffColor};
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 10px;
        text-transform: capitalize;
      ">${asana.difficulty}</span>
    </div>
    <h4 style="margin: 0 0 4px; color: #f1f5f9; font-size: 15px;">${asana.name}</h4>
    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">${asana.english}</p>
    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
      <span style="font-size: 11px; color: #94a3b8;">${category?.icon || '🧘'} ${category?.name || asana.category}</span>
      <span style="font-size: 11px; color: #94a3b8;">⏱ ${asana.duration}</span>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
      ${asana.benefits.slice(0, 2).map(b => `
        <span style="
          background: ${asana.color}22;
          color: ${asana.color};
          padding: 2px 8px;
          border-radius: 8px;
          font-size: 10px;
        ">✓ ${b}</span>
      `).join('')}
    </div>
  `;

  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
    card.style.borderColor = asana.color;
    card.style.boxShadow = `0 8px 24px ${asana.color}33`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.borderColor = `${asana.color}44`;
    card.style.boxShadow = 'none';
  });
  if (onSelect) card.addEventListener('click', () => onSelect(asana));

  return card;
}

// Create Asana Detail Panel
export function createAsanaDetailPanel(asana) {
  const panel = document.createElement('div');
  panel.className = 'yoga-detail-panel';
  panel.style.cssText = `
    background: rgba(30, 41, 59, 0.95);
    border: 2px solid ${asana.color}44;
    border-radius: 20px;
    padding: 24px;
    margin-top: 20px;
  `;

  const category = ASANA_CATEGORIES.find(c => c.id === asana.category);
  const style = YOGA_STYLES.find(s => s.id === asana.style);

  const benefitsList = asana.benefits.map(b => `
    <li style="padding: 8px 12px; background: rgba(52, 211, 153, 0.1); border-radius: 8px; margin-bottom: 6px; font-size: 13px; color: #34d399; list-style: none;">
      ✅ ${b}
    </li>
  `).join('');

  const contraindicationsList = asana.contraindications.map(c => `
    <li style="padding: 8px 12px; background: rgba(248, 113, 113, 0.1); border-radius: 8px; margin-bottom: 6px; font-size: 13px; color: #f87171; list-style: none;">
      ⚠️ ${c}
    </li>
  `).join('');

  const chakraList = asana.chakras.map(chakraId => {
    const chakra = CHAKRAS.find(c => c.id === chakraId);
    return `
      <span style="
        background: ${chakra?.color || '#666'}33;
        color: ${chakra?.color || '#ccc'};
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        margin: 0 4px 4px 0;
        display: inline-block;
      ">🔮 ${chakra?.name || chakraId}</span>
    `;
  }).join('');

  panel.innerHTML = `
    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
      <div style="
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, ${asana.color}44, ${asana.color}22);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 56px;
      ">${asana.icon}</div>
      <div style="flex: 1;">
        <h2 style="margin: 0 0 4px; color: #f1f5f9; font-size: 22px;">${asana.name}</h2>
        <p style="margin: 0 0 4px; color: #94a3b8; font-size: 14px;">${asana.english}</p>
        <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; font-style: italic;">${asana.sanskrit}</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <span style="background: ${category?.color || '#666'}33; color: ${category?.color || '#ccc'}; padding: 4px 10px; border-radius: 12px; font-size: 11px;">
            ${category?.icon || '🧘'} ${category?.name || asana.category}
          </span>
          <span style="background: ${style?.color || '#666'}33; color: ${style?.color || '#ccc'}; padding: 4px 10px; border-radius: 12px; font-size: 11px;">
            ${style?.icon || '🧘'} ${style?.name || asana.style}
          </span>
          <span style="background: rgba(255,255,255,0.1); color: #94a3b8; padding: 4px 10px; border-radius: 12px; font-size: 11px;">
            ⏱ ${asana.duration}
          </span>
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
      <div>
        <h4 style="color: #f1f5f9; margin: 0 0 12px; font-size: 14px;">✅ Benefits</h4>
        <ul style="padding: 0; margin: 0;">${benefitsList}</ul>
      </div>
      <div>
        <h4 style="color: #f1f5f9; margin: 0 0 12px; font-size: 14px;">⚠️ Contraindications</h4>
        <ul style="padding: 0; margin: 0;">${contraindicationsList}</ul>
      </div>
    </div>

    <div style="margin-bottom: 16px;">
      <h4 style="color: #f1f5f9; margin: 0 0 8px; font-size: 14px;">🔮 Associated Chakras</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 4px;">${chakraList}</div>
    </div>
  `;

  return panel;
}

// Create Chakra Card
export function createChakraCard(chakra) {
  const card = document.createElement('div');
  card.className = 'yoga-chakra-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${chakra.color}22, ${chakra.color}11);
    border: 1px solid ${chakra.color}44;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
  `;

  card.innerHTML = `
    <div style="
      width: 60px;
      height: 60px;
      background: ${chakra.color};
      border-radius: 50%;
      margin: 0 auto 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      box-shadow: 0 0 20px ${chakra.color}66;
    ">🔮</div>
    <h4 style="margin: 0 0 4px; color: ${chakra.color}; font-size: 15px;">${chakra.name}</h4>
    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 11px; font-style: italic;">${chakra.sanskrit}</p>
    <p style="margin: 0 0 12px; color: #cbd5e1; font-size: 12px;">${chakra.location}</p>
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 4px;">
      ${chakra.benefits.map(b => `
        <span style="
          background: ${chakra.color}22;
          color: ${chakra.color};
          padding: 2px 8px;
          border-radius: 8px;
          font-size: 10px;
        ">${b}</span>
      `).join('')}
    </div>
    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1);">
      <span style="font-size: 11px; color: #94a3b8;">Element: ${chakra.element}</span>
    </div>
  `;

  card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.02)';
    card.style.boxShadow = `0 0 30px ${chakra.color}44`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
    card.style.boxShadow = 'none';
  });

  return card;
}

// Create Pranayama Card
export function createPranayamaCard(technique) {
  const card = document.createElement('div');
  card.className = 'yoga-pranayama-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${technique.color}22, ${technique.color}11);
    border: 1px solid ${technique.color}44;
    border-radius: 16px;
    padding: 20px;
    transition: all 0.3s ease;
  `;

  card.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <div style="
        width: 48px;
        height: 48px;
        background: ${technique.color}33;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      ">${technique.icon}</div>
      <div>
        <h4 style="margin: 0; color: #f1f5f9; font-size: 15px;">${technique.name}</h4>
        <p style="margin: 2px 0 0; color: #94a3b8; font-size: 11px;">⏱ ${technique.duration}</p>
      </div>
    </div>
    <p style="margin: 0 0 12px; color: #cbd5e1; font-size: 12px; line-height: 1.4;">${technique.description}</p>
    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
      ${technique.benefits.map(b => `
        <span style="
          background: ${technique.color}22;
          color: ${technique.color};
          padding: 2px 8px;
          border-radius: 8px;
          font-size: 10px;
        ">✓ ${b}</span>
      `).join('')}
    </div>
  `;

  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-2px)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');

  return card;
}

// Create Meditation Card
export function createMeditationCard(meditation) {
  const card = document.createElement('div');
  card.className = 'yoga-meditation-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${meditation.color}22, ${meditation.color}11);
    border: 1px solid ${meditation.color}44;
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
  `;

  card.innerHTML = `
    <div style="font-size: 40px; margin-bottom: 12px;">${meditation.icon}</div>
    <h4 style="margin: 0 0 8px; color: ${meditation.color}; font-size: 16px;">${meditation.name}</h4>
    <p style="margin: 0; color: #cbd5e1; font-size: 12px; line-height: 1.4;">${meditation.description}</p>
  `;

  card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
  card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');

  return card;
}

// Create Session Card
export function createSessionCard(session, onStart) {
  const card = document.createElement('div');
  card.className = 'yoga-session-card';
  card.style.cssText = `
    background: linear-gradient(135deg, ${session.color}22, ${session.color}11);
    border: 1px solid ${session.color}44;
    border-radius: 16px;
    padding: 20px;
    transition: all 0.3s ease;
  `;

  const style = YOGA_STYLES.find(s => s.id === session.style);
  const diffColors = { beginner: '#34d399', intermediate: '#fbbf24', advanced: '#f87171' };

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
      <div style="font-size: 36px;">${session.icon}</div>
      <span style="
        background: ${diffColors[session.difficulty] || '#94a3b8'}22;
        color: ${diffColors[session.difficulty] || '#94a3b8'};
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 10px;
        text-transform: capitalize;
      ">${session.difficulty}</span>
    </div>
    <h4 style="margin: 0 0 4px; color: #f1f5f9; font-size: 16px;">${session.name}</h4>
    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">${style?.name || session.style} • ⏱ ${FORMATTERS.formatDuration(session.duration)}</p>
    <p style="margin: 0 0 12px; color: #cbd5e1; font-size: 12px;">${session.description}</p>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 12px; color: #94a3b8;">${session.asanas.length} poses</span>
      <button class="start-btn" style="
        background: ${session.color};
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: opacity 0.2s ease;
      ">Start Session</button>
    </div>
  `;

  card.addEventListener('mouseenter', () => card.style.borderColor = session.color);
  card.addEventListener('mouseleave', () => card.style.borderColor = `${session.color}44`);

  const startBtn = card.querySelector('.start-btn');
  startBtn.addEventListener('mouseenter', () => startBtn.style.opacity = '0.8');
  startBtn.addEventListener('mouseleave', () => startBtn.style.opacity = '1');
  if (onStart) startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    onStart(session);
  });

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
    btn.className = 'yoga-filter-btn';
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
      container.querySelectorAll('.yoga-filter-btn').forEach(b => {
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

// Create Chakra Diagram
export function createChakraDiagram() {
  const container = document.createElement('div');
  container.className = 'yoga-chakra-diagram';
  container.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
  `;

  const sortedChakras = [...CHAKRAS].reverse();
  sortedChakras.forEach((chakra, i) => {
    const chakraEl = document.createElement('div');
    chakraEl.style.cssText = `
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px;
      margin: 4px 0;
      background: ${chakra.color}11;
      border: 1px solid ${chakra.color}33;
      border-radius: 12px;
      width: 100%;
      transition: all 0.3s ease;
    `;
    chakraEl.innerHTML = `
      <div style="
        width: 36px;
        height: 36px;
        background: ${chakra.color};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 0 10px ${chakra.color}66;
      ">🔮</div>
      <div style="flex: 1;">
        <div style="font-size: 13px; font-weight: 600; color: ${chakra.color};">${chakra.name}</div>
        <div style="font-size: 11px; color: #94a3b8;">${chakra.sanskrit} • ${chakra.location}</div>
      </div>
      <div style="font-size: 11px; color: #94a3b8;">${chakra.element}</div>
    `;
    chakraEl.addEventListener('mouseenter', () => {
      chakraEl.style.background = `${chakra.color}22`;
      chakraEl.style.transform = 'translateX(4px)';
    });
    chakraEl.addEventListener('mouseleave', () => {
      chakraEl.style.background = `${chakra.color}11`;
      chakraEl.style.transform = 'translateX(0)';
    });
    container.appendChild(chakraEl);
  });

  return container;
}

// Export all creators
export const YogaCards = {
  createStatCard,
  createAsanaCard,
  createAsanaDetailPanel,
  createChakraCard,
  createPranayamaCard,
  createMeditationCard,
  createSessionCard,
  createFilterButtonGroup,
  createSearchInput,
  createChakraDiagram
};

export default YogaCards;