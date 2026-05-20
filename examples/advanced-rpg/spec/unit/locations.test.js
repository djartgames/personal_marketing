import { describe, it, expect } from 'vitest';
import { village, forestEdge, darkForest, citadelGate, vault } from '../../lib/locations.js';

describe('village', () => {
  it('has correct id', () => {
    expect(village.id).toBe('village');
  });

  it('has paths north and east', () => {
    expect(village.paths.north).toEqual({ target: 'citadel_gate', label: '↑ North' });
    expect(village.paths.east).toEqual({ target: 'forest_edge', label: '→ East' });
  });

  it('has the merchant as an NPC', () => {
    expect(village.npcs).toHaveLength(1);
    expect(village.npcs[0].id).toBe('merchant');
  });
});

describe('forestEdge', () => {
  it('has correct id', () => {
    expect(forestEdge.id).toBe('forest_edge');
  });

  it('has paths west and deeper', () => {
    expect(forestEdge.paths.west).toEqual({ target: 'village', label: '← West' });
    expect(forestEdge.paths.deeper).toEqual({ target: 'dark_forest', label: 'Deeper' });
  });

  it('has healing herb and rusty sword as items', () => {
    const ids = forestEdge.items.map((i) => i.id);
    expect(ids).toContain('healing_herb');
    expect(ids).toContain('rusty_sword');
  });
});

describe('darkForest', () => {
  it('has correct id', () => {
    expect(darkForest.id).toBe('dark_forest');
  });

  it('has path back to forest_edge', () => {
    expect(darkForest.paths.back).toEqual({ target: 'forest_edge', label: 'Back' });
  });
});

describe('citadelGate', () => {
  it('has correct id', () => {
    expect(citadelGate.id).toBe('citadel_gate');
  });

  it('has paths south and inside', () => {
    expect(citadelGate.paths.south).toEqual({ target: 'village', label: '↓ South' });
    expect(citadelGate.paths.inside).toEqual({ target: 'vault', label: 'Inside' });
  });

  it('has the guard as an NPC', () => {
    expect(citadelGate.npcs).toHaveLength(1);
    expect(citadelGate.npcs[0].id).toBe('vault_guard');
  });

  it('is not locked', () => {
    expect(citadelGate.isLocked).toBe(false);
  });
});

describe('vault', () => {
  it('has correct id', () => {
    expect(vault.id).toBe('vault');
  });

  it('has path out to citadel_gate', () => {
    expect(vault.paths.out).toEqual({ target: 'citadel_gate', label: '⤴ Out' });
  });
});
