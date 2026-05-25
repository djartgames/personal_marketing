import { describe, it, expect } from 'vitest';
import { game, manager } from '../../lib/game.js';

describe('game', () => {
  it('has correct id', () => {
    expect(game.id).toBe('personal_marketing');
  });

  it('has correct title', () => {
    expect(game.title).toBe('Personal Marketing');
  });

  it('has six locations', () => {
    expect(game.locations.size).toBe(6);
  });

  it('starts at living room', () => {
    expect(game.toJSON().startLocationId).toBe('living_room');
  });
});

describe('manager', () => {
  it('holds the game instance', () => {
    expect(manager.game).toBe(game);
  });
});
