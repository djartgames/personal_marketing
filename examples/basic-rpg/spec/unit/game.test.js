import { describe, it, expect } from 'vitest';
import { game, manager } from '../../lib/game.js';

describe('game', () => {
  it('has correct id', () => {
    expect(game.id).toBe('basic_rpg');
  });

  it('has correct title', () => {
    expect(game.title).toBe('A Simple Adventure');
  });

  it('has two locations', () => {
    expect(game.locations.size).toBe(2);
  });

  it('starts at the tavern', () => {
    expect(game.toJSON().startLocationId).toBe('tavern');
  });
});

describe('manager', () => {
  it('holds the game instance', () => {
    expect(manager.game).toBe(game);
  });
});
