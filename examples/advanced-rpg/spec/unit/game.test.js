import { describe, it, expect } from 'vitest';
import { game, manager } from '../../lib/game.js';

describe('game', () => {
  it('has correct id', () => {
    expect(game.id).toBe('advanced_rpg');
  });

  it('has correct title', () => {
    expect(game.title).toBe('The Moon Vault');
  });

  it('has five locations', () => {
    expect(game.locations.size).toBe(5);
  });

  it('starts at the village', () => {
    expect(game.toJSON().startLocationId).toBe('village');
  });
});

describe('manager', () => {
  it('holds the game instance', () => {
    expect(manager.game).toBe(game);
  });
});
