import { describe, it, expect, beforeEach } from 'vitest';
import { Game } from '../../src/entities/Game.js';
import { Location } from '../../src/entities/Location.js';
import { Item } from '../../src/entities/Item.js';

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game({ id: 'test_game', title: 'Test Game' });
    const start = new Location({ id: 'start', name: 'Start Room' });
    const next = new Location({ id: 'next', name: 'Next Room' });
    start.addPath('north', 'next');
    game.addLocation(start);
    game.addLocation(next);
    game.setStartLocation('start');
  });

  it('throws if id is missing', () => {
    expect(() => new Game({ title: 'X' })).toThrow('Game requires an id.');
  });

  it('throws if title is missing', () => {
    expect(() => new Game({ id: 'x' })).toThrow('Game requires a title.');
  });

  it('start() sets isStarted and currentLocation', () => {
    game.start();
    expect(game.isStarted).toBe(true);
    expect(game.currentLocation.id).toBe('start');
  });

  it('moveTo() changes the current location', () => {
    game.start();
    game.moveTo('next');
    expect(game.currentLocation.id).toBe('next');
  });

  it('moveTo() throws for unknown location', () => {
    game.start();
    expect(() => game.moveTo('nowhere')).toThrow('Unknown location');
  });

  it('moveTo() throws for locked location', () => {
    game.start();
    game.locations.get('next').lock();
    expect(() => game.moveTo('next')).toThrow('locked');
  });

  it('pickUpItem() adds item to playerInventory', () => {
    game.start();
    const item = new Item({ id: 'gem', name: 'Gem' });
    game.pickUpItem(item);
    expect(game.hasItem('gem')).toBe(true);
    expect(game.playerInventory).toHaveLength(1);
  });

  it('dropItem() removes item from playerInventory', () => {
    game.start();
    const item = new Item({ id: 'gem', name: 'Gem' });
    game.pickUpItem(item);
    const dropped = game.dropItem('gem');
    expect(dropped).toBe(item);
    expect(game.hasItem('gem')).toBe(false);
  });

  it('setFlag() / getFlag() work correctly', () => {
    game.setFlag('doorOpen', true);
    expect(game.getFlag('doorOpen')).toBe(true);
    expect(game.getFlag('missing', 'default')).toBe('default');
  });

  it('addLogEntry() appends to log', () => {
    game.addLogEntry('Something happened.');
    expect(game.log).toHaveLength(1);
    expect(game.log[0].text).toBe('Something happened.');
  });

  it('emits locationChanged when moving', () => {
    game.start();
    const emitted = [];
    game.events.on('locationChanged', (data) => emitted.push(data));
    game.moveTo('next');
    expect(emitted).toHaveLength(1);
    expect(emitted[0].current).toBe('next');
  });

  it('setStartLocation() throws for unknown id', () => {
    expect(() => game.setStartLocation('unknown')).toThrow('Unknown location');
  });

  it('start() throws if startLocation not set', () => {
    const g = new Game({ id: 'g2', title: 'G2' });
    expect(() => g.start()).toThrow('setStartLocation');
  });
});
