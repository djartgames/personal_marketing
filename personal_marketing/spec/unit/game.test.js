import { describe, it, expect } from 'vitest';
import { game, manager } from '../../lib/game.js';

describe('game', () => {
  it('has correct id', () => {
    expect(game.id).toBe('personal_marketing');
  });

  it('has correct title', () => {
    expect(game.title).toBe('Personal Marketing');
  });

  it('has one location', () => {
    expect(game.locations.size).toBe(1);
  });

  it('starts at home', () => {
    expect(game.toJSON().startLocationId).toBe('home');
  });
});

describe('manager', () => {
  it('holds the game instance', () => {
    expect(manager.game).toBe(game);
  });
});
