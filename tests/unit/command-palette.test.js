import { describe, it, expect, beforeEach } from 'vitest';
import { CommandPaletteEngine } from '../../js-modules/command-palette.js';

describe('CommandPaletteEngine', () => {
  let palette;

  beforeEach(() => {
    palette = new CommandPaletteEngine();
  });

  it('should initialize in closed state', () => {
    expect(palette.isOpen).toBe(false);
    expect(palette.selectedIndex).toBe(0);
  });

  it('should toggle open/closed states', () => {
    expect(palette.toggle()).toBe(true);
    expect(palette.isOpen).toBe(true);

    palette.close();
    expect(palette.isOpen).toBe(false);
  });

  it('should filter commands by search query', () => {
    const results = palette.search('monuments');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('monuments');
  });

  it('should navigate up and down within bounds', () => {
    palette.open();
    expect(palette.selectedIndex).toBe(0);

    palette.navigate('down');
    expect(palette.selectedIndex).toBe(1);

    palette.navigate('up');
    expect(palette.selectedIndex).toBe(0);
  });

  it('should return currently selected command', () => {
    palette.open();
    const cmd = palette.getSelectedCommand();
    expect(cmd.id).toBe('home');
  });
});
