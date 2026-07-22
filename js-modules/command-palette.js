/**
 * Spotlight Command Palette & Keyboard Navigation Engine
 * Provides Ctrl+K / Cmd+K instant command menu, section search, quick routes,
 * focus trapping, and keyboard shortcuts.
 */

export class CommandPaletteEngine {
  constructor(options = {}) {
    this.isOpen = false;
    this.selectedIndex = 0;
    this.commands = options.commands || [
      { id: 'home', title: 'Go to Home', section: 'Navigation', url: 'index.html' },
      { id: 'monuments', title: 'Explore Monuments', section: 'Heritage', url: 'monuments.html' },
      { id: 'culture', title: 'Discover Arts & Culture', section: 'Culture', url: 'culture.html' },
      { id: 'festivals', title: 'Grand Festivals of India', section: 'Culture', url: 'festivals.html' },
      { id: 'planner', title: 'Trip & Itinerary Generator', section: 'Travel', url: 'itinery-generator.html' },
      { id: 'map3d', title: 'Interactive 3D Map', section: 'Interactive', url: 'india-3d-map.html' }
    ];
    this.filteredCommands = [...this.commands];
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.selectedIndex = 0;
      this.filteredCommands = [...this.commands];
    }
    return this.isOpen;
  }

  open() {
    this.isOpen = true;
    this.selectedIndex = 0;
    this.filteredCommands = [...this.commands];
  }

  close() {
    this.isOpen = false;
  }

  search(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.filteredCommands = [...this.commands];
    } else {
      this.filteredCommands = this.commands.filter(cmd =>
        cmd.title.toLowerCase().includes(q) || cmd.section.toLowerCase().includes(q)
      );
    }
    this.selectedIndex = 0;
    return this.filteredCommands;
  }

  navigate(direction) {
    if (this.filteredCommands.length === 0) return 0;
    if (direction === 'down') {
      this.selectedIndex = (this.selectedIndex + 1) % this.filteredCommands.length;
    } else if (direction === 'up') {
      this.selectedIndex = (this.selectedIndex - 1 + this.filteredCommands.length) % this.filteredCommands.length;
    }
    return this.selectedIndex;
  }

  getSelectedCommand() {
    if (this.filteredCommands.length === 0) return null;
    return this.filteredCommands[this.selectedIndex] || null;
  }
}
