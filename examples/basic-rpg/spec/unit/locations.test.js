import { describe, it, expect } from 'vitest';
import { tavern, townSquare } from '../../lib/locations.js';

describe('tavern', () => {
  it('has correct id', () => {
    expect(tavern.id).toBe('tavern');
  });

  it('has correct name', () => {
    expect(tavern.name).toBe('The Rusty Flagon');
  });

  it('has a path north to town_square', () => {
    expect(tavern.paths.north).toEqual({ target: 'town_square', label: '↑ North' });
  });

  it('has the innkeeper as an NPC', () => {
    expect(tavern.npcs).toHaveLength(1);
    expect(tavern.npcs[0].id).toBe('innkeeper');
  });
});

describe('townSquare', () => {
  it('has correct id', () => {
    expect(townSquare.id).toBe('town_square');
  });

  it('has correct name', () => {
    expect(townSquare.name).toBe('Town Square');
  });

  it('has a path south to tavern', () => {
    expect(townSquare.paths.south).toEqual({ target: 'tavern', label: '↓ South' });
  });

  it('has the health potion as an item', () => {
    expect(townSquare.items).toHaveLength(1);
    expect(townSquare.items[0].id).toBe('health_potion');
  });
});
