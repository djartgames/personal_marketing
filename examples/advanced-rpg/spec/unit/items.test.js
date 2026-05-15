import { describe, it, expect } from 'vitest';
import { rustySword, silverKey, healingHerb } from '../../lib/items.js';

describe('rustySword', () => {
  it('has correct id', () => {
    expect(rustySword.id).toBe('rusty_sword');
  });

  it('has correct name', () => {
    expect(rustySword.name).toBe('Rusty Sword');
  });

  it('is pickable', () => {
    expect(rustySword.isPickable).toBe(true);
  });

  it('is not usable', () => {
    expect(rustySword.isUsable).toBe(false);
  });

  it('has damage property', () => {
    expect(rustySword.properties.damage).toBe(8);
  });
});

describe('silverKey', () => {
  it('has correct id', () => {
    expect(silverKey.id).toBe('silver_key');
  });

  it('has correct name', () => {
    expect(silverKey.name).toBe('Silver Key');
  });

  it('is pickable', () => {
    expect(silverKey.isPickable).toBe(true);
  });

  it('is usable', () => {
    expect(silverKey.isUsable).toBe(true);
  });
});

describe('healingHerb', () => {
  it('has correct id', () => {
    expect(healingHerb.id).toBe('healing_herb');
  });

  it('is pickable and usable', () => {
    expect(healingHerb.isPickable).toBe(true);
    expect(healingHerb.isUsable).toBe(true);
  });

  it('onUse sets usedHerb flag on gameState', () => {
    const gameState = {};
    healingHerb.onUse(gameState);
    expect(gameState.flags.usedHerb).toBe(true);
  });
});
