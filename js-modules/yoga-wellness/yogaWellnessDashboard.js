// Yoga Wellness Dashboard - Main dashboard page for Yoga & Wellness Guide
import { YOGA_STYLES, CHAKRAS, PRANAYAMA_TECHNIQUES, MEDITATION_TYPES, ASANA_CATEGORIES, FORMATTERS } from './yogaTypes.js';
import { asanas, yogaSessions, yogaStats, getAsanasByCategory, getAsanasByStyle, searchAsanas } from './yogaData.js';
import {
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
} from './yogaCards.js';
import {
  createCategoryPieChart,
  createDifficultyBarChart,
  createChakraDonut,
  createCategoryBarChart,
  createBenefitRadar
} from './yogaCharts.js';

export class YogaWellnessDashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container #${containerId} not found`);
      return;
    }

    this.activeTab = 'overview';
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.selectedStyle = 'all';
    this.selectedDifficulty = 'all';
    this.selectedAsana = null;

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    this.container.style.cssText = `
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      min-height: 100vh;
      padding: 24px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #f1f5f9;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 8px;">
        <div style="font-size: 48px;">🧘</div>
        <div>
          <h1 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(90deg, #FF6B6B, #4ECDC4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            India Yoga & Wellness Guide
          </h1>
          <p style="margin: 4px 0 0; color: #94a3b8; font-size: 14px;">Ancient wisdom for modern well-being • ${asanas.length} Asanas • ${CHAKRAS.length} Chakras • ${PRANAYAMA_TECHNIQUES.length} Pranayama Techniques</p>
        </div>
      </div>
    `;
    this.container.appendChild(header);

    // Tab Navigation
    const tabs = [
      { id: 'overview', name: 'Overview', icon: '📊' },
      { id: 'asanas', name: 'Asanas', icon: '🧘' },
      { id: 'chakras', name: 'Chakras', icon: '🔮' },
      { id: 'pranayama', name: 'Pranayama', icon: '🌬' },
      { id: 'meditation', name: 'Meditation', icon: '🧠' },
      { id: 'sessions', name: 'Sessions', icon: '⏱' }
    ];

    const tabBar = document.createElement('div');
    tabBar.style.cssText = `
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      padding: 8px;
      background: rgba(30, 41, 59, 0.5);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      overflow-x: auto;
    `;

    tabs.forEach(tab => {
      const btn = document.createElement('button');
      btn.style.cssText = `
        padding: 12px 20px;
        border-radius: 12px;
        border: none;
        background: ${this.activeTab === tab.id ? 'linear-gradient(135deg, #FF6B6B, #4ECDC4)' : 'transparent'};
        color: ${this.activeTab === tab.id ? '#fff' : '#94a3b8'};
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      `;
      btn.innerHTML = `${tab.icon} ${tab.name}`;
      btn.dataset.tab = tab.id;
      btn.addEventListener('click', () => this.switchTab(tab.id));
      tabBar.appendChild(btn);
    });
    this.container.appendChild(tabBar);

    // Main Content
    const content = document.createElement('div');
    content.id = 'yoga-content';
    content.style.cssText = 'min-height: 500px;';
    this.container.appendChild(content);

    this.renderTabContent();
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    this.selectedAsana = null;
    this.render();
  }

  renderTabContent() {
    const content = document.getElementById('yoga-content');
    if (!content) return;

    content.innerHTML = '';

    switch (this.activeTab) {
      case 'overview':
        this.renderOverviewTab(content);
        break;
      case 'asanas':
        this.renderAsanasTab(content);
        break;
      case 'chakras':
        this.renderChakrasTab(content);
        break;
      case 'pranayama':
        this.renderPranayamaTab(content);
        break;
      case 'meditation':
        this.renderMeditationTab(content);
        break;
      case 'sessions':
        this.renderSessionsTab(content);
        break;
    }
  }

  renderOverviewTab(container) {
    const stats = yogaStats;

    // Stats Row
    const statsRow = document.createElement('div');
    statsRow.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    `;

    const statCards = [
      { value: stats.totalAsanas, label: 'Total Asanas', icon: '🧘', color: '#FF6B6B' },
      { value: stats.totalChakras, label: 'Chakras', icon: '🔮', color: '#4ECDC4' },
      { value: stats.totalPranayama, label: 'Pranayama', icon: '🌬', color: '#45B7D1' },
      { value: stats.totalMeditations, label: 'Meditations', icon: '🧠', color: '#DDA0DD' },
      { value: stats.totalSessions, label: 'Sessions', icon: '⏱', color: '#FFB347' }
    ];

    statCards.forEach(s => statsRow.appendChild(createStatCard(s.value, s.label, s.icon, s.color)));
    container.appendChild(statsRow);

    // Charts Row
    const chartsRow = document.createElement('div');
    chartsRow.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    `;

    // Category Pie
    const pieContainer = document.createElement('div');
    pieContainer.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
    `;
    const pieCanvas = document.createElement('canvas');
    pieCanvas.width = 300;
    pieCanvas.height = 250;
    pieContainer.appendChild(pieCanvas);
    chartsRow.appendChild(pieContainer);

    // Difficulty Bar
    const barContainer = document.createElement('div');
    barContainer.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
    `;
    const barCanvas = document.createElement('canvas');
    barCanvas.width = 300;
    barCanvas.height = 250;
    barContainer.appendChild(barCanvas);
    chartsRow.appendChild(barContainer);

    // Chakra Donut
    const donutContainer = document.createElement('div');
    donutContainer.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
    `;
    const donutCanvas = document.createElement('canvas');
    donutCanvas.width = 300;
    donutCanvas.height = 250;
    donutContainer.appendChild(donutCanvas);
    chartsRow.appendChild(donutContainer);

    container.appendChild(chartsRow);

    // Featured Asanas
    const featuredSection = document.createElement('div');
    featuredSection.style.cssText = 'margin-bottom: 24px;';
    featuredSection.innerHTML = `
      <h3 style="margin: 0 0 16px; color: #f1f5f9; font-size: 18px;">⭐ Popular Asanas</h3>
    `;

    const featuredGrid = document.createElement('div');
    featuredGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    `;

    asanas.slice(0, 6).forEach(asana => {
      featuredGrid.appendChild(createAsanaCard(asana, (a) => this.showAsanaDetail(a)));
    });
    featuredSection.appendChild(featuredGrid);
    container.appendChild(featuredSection);

    // Yoga Styles
    const stylesSection = document.createElement('div');
    stylesSection.innerHTML = `
      <h3 style="margin: 0 0 16px; color: #f1f5f9; font-size: 18px;">🕉 Yoga Styles</h3>
    `;

    const stylesGrid = document.createElement('div');
    stylesGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
    `;

    YOGA_STYLES.slice(0, 5).forEach(style => {
      const styleCard = document.createElement('div');
      styleCard.style.cssText = `
        background: ${style.color}22;
        border: 1px solid ${style.color}44;
        border-radius: 12px;
        padding: 16px;
        text-align: center;
      `;
      styleCard.innerHTML = `
        <div style="font-size: 28px; margin-bottom: 8px;">${style.icon}</div>
        <h5 style="margin: 0 0 4px; color: ${style.color}; font-size: 13px;">${style.name}</h5>
        <p style="margin: 0; font-size: 11px; color: #94a3b8;">${style.description.substring(0, 50)}...</p>
      `;
      stylesGrid.appendChild(styleCard);
    });
    stylesSection.appendChild(stylesGrid);
    container.appendChild(stylesSection);

    // Initialize charts
    setTimeout(() => {
      const categoryData = stats.byCategory.filter(c => c.count > 0).map(c => ({
        label: c.name.split(' ')[0],
        value: c.count,
        color: c.color
      }));
      createCategoryPieChart(pieCanvas, categoryData);

      const difficultyData = stats.byDifficulty.map(d => ({
        label: d.level.charAt(0).toUpperCase() + d.level.slice(1),
        value: d.count,
        color: d.color
      }));
      createDifficultyBarChart(barCanvas, difficultyData);

      const chakraData = CHAKRAS.map(c => ({
        label: c.name.split(' ')[0],
        value: asanas.filter(a => a.chakras.includes(c.id)).length,
        color: c.color
      }));
      createChakraDonut(donutCanvas, chakraData);
    }, 100);
  }

  renderAsanasTab(container) {
    // Filters
    const filtersContainer = document.createElement('div');
    filtersContainer.style.cssText = 'margin-bottom: 20px;';

    const searchInput = createSearchInput('Search asanas by name, benefits...', (q) => {
      this.searchQuery = q.toLowerCase();
      this.renderAsanasGrid(gridContainer);
    });
    filtersContainer.appendChild(searchInput);

    const filterRow = document.createElement('div');
    filterRow.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px;';

    const categoryOptions = [{ id: 'all', name: 'All Categories', icon: '🧘' }, ...ASANA_CATEGORIES.map(c => ({ id: c.id, name: c.name, icon: c.icon, color: c.color }))];
    const categoryFilter = createFilterButtonGroup(categoryOptions, (id) => {
      this.selectedCategory = id;
      this.renderAsanasGrid(gridContainer);
    });
    filterRow.appendChild(categoryFilter);
    filtersContainer.appendChild(filterRow);

    const filterRow2 = document.createElement('div');
    filterRow2.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px;';

    const styleOptions = [{ id: 'all', name: 'All Styles', icon: '🕉' }, ...YOGA_STYLES.slice(0, 5).map(s => ({ id: s.id, name: s.name, icon: s.icon, color: s.color }))];
    const styleFilter = createFilterButtonGroup(styleOptions, (id) => {
      this.selectedStyle = id;
      this.renderAsanasGrid(gridContainer);
    });
    filterRow2.appendChild(styleFilter);
    filtersContainer.appendChild(filterRow2);

    const filterRow3 = document.createElement('div');
    filterRow3.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap;';

    const diffOptions = [
      { id: 'all', name: 'All Levels', icon: '📊', color: '#94a3b8' },
      { id: 'beginner', name: 'Beginner', icon: '🟢', color: '#34d399' },
      { id: 'intermediate', name: 'Intermediate', icon: '🟡', color: '#fbbf24' },
      { id: 'advanced', name: 'Advanced', icon: '🔴', color: '#f87171' }
    ];
    const diffFilter = createFilterButtonGroup(diffOptions, (id) => {
      this.selectedDifficulty = id;
      this.renderAsanasGrid(gridContainer);
    });
    filterRow3.appendChild(diffFilter);
    filtersContainer.appendChild(filterRow3);

    container.appendChild(filtersContainer);

    // Asanas grid
    const gridContainer = document.createElement('div');
    gridContainer.id = 'asanas-grid';
    gridContainer.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    `;
    container.appendChild(gridContainer);

    // Detail panel
    const detailPanel = document.createElement('div');
    detailPanel.id = 'asana-detail-panel';
    container.appendChild(detailPanel);

    this.renderAsanasGrid(gridContainer);
  }

  renderAsanasGrid(container) {
    container.innerHTML = '';

    let filtered = asanas;

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(a => a.category === this.selectedCategory);
    }
    if (this.selectedStyle !== 'all') {
      filtered = filtered.filter(a => a.style === this.selectedStyle);
    }
    if (this.selectedDifficulty !== 'all') {
      filtered = filtered.filter(a => a.difficulty === this.selectedDifficulty);
    }
    if (this.searchQuery) {
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(this.searchQuery) ||
        a.english.toLowerCase().includes(this.searchQuery) ||
        a.benefits.some(b => b.toLowerCase().includes(this.searchQuery))
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
          <h3 style="color: #94a3b8; font-weight: 500;">No asanas found</h3>
          <p style="color: #64748b; font-size: 14px;">Try adjusting your filters or search query</p>
        </div>
      `;
      return;
    }

    filtered.forEach(asana => {
      container.appendChild(createAsanaCard(asana, (a) => this.showAsanaDetail(a)));
    });
  }

  showAsanaDetail(asana) {
    this.selectedAsana = asana;
    const detailPanel = document.getElementById('asana-detail-panel');
    if (!detailPanel) return;

    detailPanel.innerHTML = '';
    detailPanel.appendChild(createAsanaDetailPanel(asana));
    detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  renderChakrasTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">🔮 Seven Chakras</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Energy centers of the body in Hindu and Buddhist traditions</p>
    `;
    container.appendChild(header);

    // Chakra Diagram
    const diagramSection = document.createElement('div');
    diagramSection.style.cssText = 'margin-bottom: 24px;';
    diagramSection.appendChild(createChakraDiagram());
    container.appendChild(diagramSection);

    // Chakra Cards Grid
    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    `;

    CHAKRAS.forEach(chakra => {
      grid.appendChild(createChakraCard(chakra));
    });
    container.appendChild(grid);
  }

  renderPranayamaTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">🌬 Pranayama Techniques</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Ancient breathing exercises for physical and mental well-being</p>
    `;
    container.appendChild(header);

    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    `;

    PRANAYAMA_TECHNIQUES.forEach(technique => {
      grid.appendChild(createPranayamaCard(technique));
    });
    container.appendChild(grid);

    // Benefits Radar
    const radarSection = document.createElement('div');
    radarSection.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
      margin-top: 24px;
    `;
    const radarCanvas = document.createElement('canvas');
    radarCanvas.width = 400;
    radarCanvas.height = 300;
    radarSection.appendChild(radarCanvas);
    container.appendChild(radarSection);

    setTimeout(() => {
      const radarData = [
        { label: 'Energy', value: 80 },
        { label: 'Focus', value: 75 },
        { label: 'Calm', value: 85 },
        { label: 'Balance', value: 70 },
        { label: 'Detox', value: 65 },
        { label: 'Sleep', value: 60 }
      ];
      createBenefitRadar(radarCanvas, radarData);
    }, 100);
  }

  renderMeditationTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">🧠 Meditation Practices</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Techniques for mental clarity and spiritual growth</p>
    `;
    container.appendChild(header);

    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    `;

    MEDITATION_TYPES.forEach(meditation => {
      grid.appendChild(createMeditationCard(meditation));
    });
    container.appendChild(grid);

    // Quick Guide
    const guideSection = document.createElement('div');
    guideSection.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 24px;
      margin-top: 24px;
    `;
    guideSection.innerHTML = `
      <h3 style="margin: 0 0 16px; color: #f1f5f9; font-size: 18px;">📝 Meditation Quick Guide</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
        <div style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px;">
          <h4 style="margin: 0 0 8px; color: #4ECDC4; font-size: 14px;">🕐 When to Meditate</h4>
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">Early morning (4-6 AM) or evening (6-8 PM) are ideal times for practice.</p>
        </div>
        <div style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px;">
          <h4 style="margin: 0 0 8px; color: #FF6B6B; font-size: 14px;">🪑 Posture Tips</h4>
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">Sit cross-legged on floor or chair with spine straight and hands on knees.</p>
        </div>
        <div style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px;">
          <h4 style="margin: 0 0 8px; color: #FFB347; font-size: 14px;">⏱ Duration</h4>
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">Start with 5-10 minutes daily and gradually increase to 20-30 minutes.</p>
        </div>
        <div style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 12px;">
          <h4 style="margin: 0 0 8px; color: #DDA0DD; font-size: 14px;">🎯 Focus Object</h4>
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">Use breath, mantra, candle flame, or visualization as your focal point.</p>
        </div>
      </div>
    `;
    container.appendChild(guideSection);
  }

  renderSessionsTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">⏱ Yoga Sessions</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Curated practice sequences for different goals</p>
    `;
    container.appendChild(header);

    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    `;

    yogaSessions.forEach(session => {
      grid.appendChild(createSessionCard(session, (s) => {
        alert(`Starting "${s.name}" session!\n\nDuration: ${FORMATTERS.formatDuration(s.duration)}\nDifficulty: ${s.difficulty}\nAsanas: ${s.asanas.length} poses\n\nIn a real app, this would start a guided practice.`);
      }));
    });
    container.appendChild(grid);
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('yoga-wellness');
  if (container) {
    window.yogaWellness = new YogaWellnessDashboard('yoga-wellness');
  }
});

export default YogaWellnessDashboard;