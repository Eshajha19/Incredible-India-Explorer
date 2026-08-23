// Art Gallery Dashboard - Main dashboard page for Indian Art & Craft Gallery
import { ART_FORMS, ART_MEDIUMS, REGIONS, SKILL_LEVELS, FORMATTERS } from './artTypes.js';
import { artworks, artisans, workshops, artStats, getArtworksByForm } from './artData.js';
import {
  createStatCard,
  createArtworkCard,
  createArtworkDetailPanel,
  createArtisanCard,
  createWorkshopCard,
  createArtFormCard,
  createFilterButtonGroup,
  createSearchInput
} from './artCards.js';
import {
  createArtFormPieChart,
  createMediumBarChart,
  createRegionBarChart,
  createPriceVsRatingChart,
  createSkillRadar,
  createPopularityChart
} from './artCharts.js';

export class ArtGalleryDashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container #${containerId} not found`);
      return;
    }

    this.activeTab = 'overview';
    this.searchQuery = '';
    this.selectedArtForm = 'all';
    this.selectedMedium = 'all';
    this.selectedRegion = 'all';
    this.selectedArtwork = null;

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
        <div style="font-size: 48px;">🎨</div>
        <div>
          <h1 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(90deg, #FF6B6B, #4ECDC4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Indian Art & Craft Gallery
          </h1>
          <p style="margin: 4px 0 0; color: #94a3b8; font-size: 14px;">Explore India's rich artistic heritage • ${artworks.length} Artworks • ${ART_FORMS.length} Art Forms • ${artisans.length} Master Artisans</p>
        </div>
      </div>
    `;
    this.container.appendChild(header);

    // Tab Navigation
    const tabs = [
      { id: 'overview', name: 'Overview', icon: '📊' },
      { id: 'gallery', name: 'Gallery', icon: '🖼' },
      { id: 'artisans', name: 'Master Artisans', icon: '👨‍🎨' },
      { id: 'workshops', name: 'Workshops', icon: '📚' },
      { id: 'art-forms', name: 'Art Forms', icon: '🎭' }
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
    content.id = 'art-content';
    content.style.cssText = 'min-height: 500px;';
    this.container.appendChild(content);

    this.renderTabContent();
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    this.selectedArtwork = null;
    this.render();
  }

  renderTabContent() {
    const content = document.getElementById('art-content');
    if (!content) return;

    content.innerHTML = '';

    switch (this.activeTab) {
      case 'overview':
        this.renderOverviewTab(content);
        break;
      case 'gallery':
        this.renderGalleryTab(content);
        break;
      case 'artisans':
        this.renderArtisansTab(content);
        break;
      case 'workshops':
        this.renderWorkshopsTab(content);
        break;
      case 'art-forms':
        this.renderArtFormsTab(content);
        break;
    }
  }

  renderOverviewTab(container) {
    const stats = artStats;

    // Stats Row
    const statsRow = document.createElement('div');
    statsRow.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    `;

    const statCards = [
      { value: stats.totalArtworks, label: 'Total Artworks', icon: '🖼', color: '#FF6B6B' },
      { value: stats.totalArtisans, label: 'Master Artisans', icon: '👨‍🎨', color: '#4ECDC4' },
      { value: stats.totalWorkshops, label: 'Workshops', icon: '📚', color: '#FFB347' },
      { value: stats.avgRating + '★', label: 'Avg Rating', icon: '⭐', color: '#fbbf24' },
      { value: FORMATTERS.formatPrice(stats.avgPrice), label: 'Avg Price', icon: '💰', color: '#34d399' }
    ];

    statCards.forEach(s => statsRow.appendChild(createStatCard(s.value, s.label, s.icon, s.color)));
    container.appendChild(statsRow);

    // Charts Row
    const chartsRow = document.createElement('div');
    chartsRow.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    `;

    // Art Form Pie
    const pieContainer = document.createElement('div');
    pieContainer.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
    `;
    const pieCanvas = document.createElement('canvas');
    pieCanvas.width = 350;
    pieCanvas.height = 280;
    pieContainer.appendChild(pieCanvas);
    chartsRow.appendChild(pieContainer);

    // Region Bar
    const barContainer = document.createElement('div');
    barContainer.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
    `;
    const barCanvas = document.createElement('canvas');
    barCanvas.width = 350;
    barCanvas.height = 280;
    barContainer.appendChild(barCanvas);
    chartsRow.appendChild(barContainer);

    container.appendChild(chartsRow);

    // Featured Artworks
    const featuredSection = document.createElement('div');
    featuredSection.style.cssText = 'margin-bottom: 24px;';
    featuredSection.innerHTML = `
      <h3 style="margin: 0 0 16px; color: #f1f5f9; font-size: 18px;">⭐ Featured Artworks</h3>
    `;

    const featuredGrid = document.createElement('div');
    featuredGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    `;

    const featured = [...artworks].sort((a, b) => b.rating - a.rating).slice(0, 4);
    featured.forEach(artwork => {
      featuredGrid.appendChild(createArtworkCard(artwork, (a) => this.showArtworkDetail(a)));
    });
    featuredSection.appendChild(featuredGrid);
    container.appendChild(featuredSection);

    // Art Forms Preview
    const formsSection = document.createElement('div');
    formsSection.innerHTML = `
      <h3 style="margin: 0 0 16px; color: #f1f5f9; font-size: 18px;">🎭 Popular Art Forms</h3>
    `;

    const formsGrid = document.createElement('div');
    formsGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
    `;

    ART_FORMS.slice(0, 6).forEach(form => {
      const count = artworks.filter(a => a.artForm === form.id).length;
      formsGrid.appendChild(createArtFormCard(form, count));
    });
    formsSection.appendChild(formsGrid);
    container.appendChild(formsSection);

    // Initialize charts
    setTimeout(() => {
      const formData = stats.byArtForm.filter(f => f.count > 0).map(f => ({
        label: f.name,
        value: f.count,
        color: f.color
      }));
      createArtFormPieChart(pieCanvas, formData);

      const regionData = stats.byRegion.filter(r => r.count > 0).map(r => ({
        label: r.name,
        value: r.count,
        color: '#4ECDC4'
      }));
      createRegionBarChart(barCanvas, regionData);
    }, 100);
  }

  renderGalleryTab(container) {
    // Filters
    const filtersContainer = document.createElement('div');
    filtersContainer.style.cssText = 'margin-bottom: 20px;';

    const searchInput = createSearchInput('Search artworks by name, artist, or state...', (q) => {
      this.searchQuery = q.toLowerCase();
      this.renderGalleryGrid(gridContainer);
    });
    filtersContainer.appendChild(searchInput);

    const filterRow = document.createElement('div');
    filterRow.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px;';

    const formOptions = [{ id: 'all', name: 'All Art Forms', icon: '🎨' }, ...ART_FORMS.map(f => ({ id: f.id, name: f.name, icon: f.icon, color: f.color }))];
    const formFilter = createFilterButtonGroup(formOptions, (id) => {
      this.selectedArtForm = id;
      this.renderGalleryGrid(gridContainer);
    });
    filterRow.appendChild(formFilter);
    filtersContainer.appendChild(filterRow);

    const filterRow2 = document.createElement('div');
    filterRow2.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px;';

    const mediumOptions = [{ id: 'all', name: 'All Mediums', icon: '🖌' }, ...ART_MEDIUMS.map(m => ({ id: m.id, name: m.name, icon: m.icon, color: m.color }))];
    const mediumFilter = createFilterButtonGroup(mediumOptions, (id) => {
      this.selectedMedium = id;
      this.renderGalleryGrid(gridContainer);
    });
    filterRow2.appendChild(mediumFilter);
    filtersContainer.appendChild(filterRow2);

    const filterRow3 = document.createElement('div');
    filterRow3.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap;';

    const regionOptions = [{ id: 'all', name: 'All Regions', icon: '🗺' }, ...REGIONS.map(r => ({ id: r.id, name: r.name, icon: r.icon }))];
    const regionFilter = createFilterButtonGroup(regionOptions, (id) => {
      this.selectedRegion = id;
      this.renderGalleryGrid(gridContainer);
    });
    filterRow3.appendChild(regionFilter);
    filtersContainer.appendChild(filterRow3);

    container.appendChild(filtersContainer);

    // Gallery grid
    const gridContainer = document.createElement('div');
    gridContainer.id = 'gallery-grid';
    gridContainer.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    `;
    container.appendChild(gridContainer);

    // Detail panel
    const detailPanel = document.createElement('div');
    detailPanel.id = 'artwork-detail-panel';
    container.appendChild(detailPanel);

    this.renderGalleryGrid(gridContainer);
  }

  renderGalleryGrid(container) {
    container.innerHTML = '';

    let filtered = artworks;

    if (this.selectedArtForm !== 'all') {
      filtered = filtered.filter(a => a.artForm === this.selectedArtForm);
    }
    if (this.selectedMedium !== 'all') {
      filtered = filtered.filter(a => a.medium === this.selectedMedium);
    }
    if (this.selectedRegion !== 'all') {
      filtered = filtered.filter(a => a.region === this.selectedRegion);
    }
    if (this.searchQuery) {
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(this.searchQuery) ||
        a.artist.toLowerCase().includes(this.searchQuery) ||
        a.state.toLowerCase().includes(this.searchQuery) ||
        a.description.toLowerCase().includes(this.searchQuery)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
          <h3 style="color: #94a3b8; font-weight: 500;">No artworks found</h3>
          <p style="color: #64748b; font-size: 14px;">Try adjusting your filters or search query</p>
        </div>
      `;
      return;
    }

    filtered.forEach(artwork => {
      container.appendChild(createArtworkCard(artwork, (a) => this.showArtworkDetail(a)));
    });
  }

  showArtworkDetail(artwork) {
    this.selectedArtwork = artwork;
    const detailPanel = document.getElementById('artwork-detail-panel');
    if (!detailPanel) return;

    detailPanel.innerHTML = '';
    detailPanel.appendChild(createArtworkDetailPanel(artwork));
    detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  renderArtisansTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">👨‍🎨 Master Artisans</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Meet the masters who keep India's artistic heritage alive</p>
    `;
    container.appendChild(header);

    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    `;

    artisans.forEach(artisan => {
      grid.appendChild(createArtisanCard(artisan));
    });
    container.appendChild(grid);
  }

  renderWorkshopsTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">📚 Art Workshops</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Learn traditional Indian art forms from master artisans</p>
    `;
    container.appendChild(header);

    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 16px;
    `;

    workshops.forEach(workshop => {
      grid.appendChild(createWorkshopCard(workshop, (w) => {
        alert(`Workshop "${w.title}" booking requested! In a real app, this would open a booking form.`);
      }));
    });
    container.appendChild(grid);
  }

  renderArtFormsTab(container) {
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom: 24px;';
    header.innerHTML = `
      <h2 style="margin: 0 0 8px; color: #f1f5f9; font-size: 22px;">🎭 Indian Art Forms</h2>
      <p style="margin: 0; color: #94a3b8; font-size: 14px;">Discover the diverse traditional art forms of India</p>
    `;
    container.appendChild(header);

    // Art Forms grid
    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    `;

    ART_FORMS.forEach(form => {
      const count = artworks.filter(a => a.artForm === form.id).length;
      grid.appendChild(createArtFormCard(form, count));
    });
    container.appendChild(grid);

    // Price vs Rating Chart
    const chartSection = document.createElement('div');
    chartSection.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 24px;
    `;
    const scatterCanvas = document.createElement('canvas');
    scatterCanvas.width = 600;
    scatterCanvas.height = 350;
    chartSection.appendChild(scatterCanvas);
    container.appendChild(chartSection);

    // Skill Radar
    const radarSection = document.createElement('div');
    radarSection.style.cssText = `
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
    `;
    const radarCanvas = document.createElement('canvas');
    radarCanvas.width = 400;
    radarCanvas.height = 300;
    radarSection.appendChild(radarCanvas);
    container.appendChild(radarSection);

    // Initialize charts
    setTimeout(() => {
      const scatterData = artworks.map(a => ({
        x: a.price / 1000,
        y: a.rating,
        color: ART_FORMS.find(f => f.id === a.artForm)?.color || '#FF6B6B',
        size: 8
      }));
      createPriceVsRatingChart(scatterCanvas, scatterData);

      const radarData = SKILL_LEVELS.map(s => ({
        label: s.name,
        value: artworks.filter(a => a.difficulty === s.id).length * 25
      }));
      createSkillRadar(radarCanvas, radarData);
    }, 100);
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('indian-art-gallery');
  if (container) {
    window.artGallery = new ArtGalleryDashboard('indian-art-gallery');
  }
});

export default ArtGalleryDashboard;