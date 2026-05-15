import { describe, it, expect } from 'vitest';
import { potion } from '../../lib/items.js';

describe('potion', () => {
  it('has correct id', () => {
    expect(potion.id).toBe('health_potion');
  });

  it('has correct name', () => {
    expect(potion.name).toBe('Health Potion');
  });

  it('is pickable', () => {
    expect(potion.isPickable).toBe(true);
  });

  it('is usable', () => {
    expect(potion.isUsable).toBe(true);
  });
});
