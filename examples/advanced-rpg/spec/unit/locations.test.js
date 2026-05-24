import { describe, it, expect } from 'vitest';
import { village, forestEdge, darkForest, citadelGate, vault } from '../../lib/locations.js';

describe('village', () => {
  it('has correct id', () => {
    expect(village.id).toBe('village');
  });

  it('has paths north and east', () => {
    expect(village.paths.north.target).toBe('citadel_gate');
    expect(village.paths.north.label).toBe('↑ North');
    expect(village.paths.east.target).toBe('forest_edge');
    expect(village.paths.east.label).toBe('→ East');
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
    expect(forestEdge.paths.west.target).toBe('village');
    expect(forestEdge.paths.west.label).toBe('← West');
    expect(forestEdge.paths.deeper.target).toBe('dark_forest');
    expect(forestEdge.paths.deeper.label).toBe('Deeper');
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
    expect(darkForest.paths.back.target).toBe('forest_edge');
    expect(darkForest.paths.back.label).toBe('Back');
  });
});

describe('citadelGate', () => {
  it('has correct id', () => {
    expect(citadelGate.id).toBe('citadel_gate');
  });

  it('has paths south and inside', () => {
    expect(citadelGate.paths.south.target).toBe('village');
    expect(citadelGate.paths.south.label).toBe('↓ South');
    expect(citadelGate.paths.inside.target).toBe('vault');
    expect(citadelGate.paths.inside.label).toBe('Inside');
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
    expect(vault.paths.out.target).toBe('citadel_gate');
    expect(vault.paths.out.label).toBe('⤴ Out');
  });
});
