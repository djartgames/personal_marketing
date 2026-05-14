import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../../lib/entities/Game.js';
import { Item } from '../../lib/entities/Item.js';
import { Location } from '../../lib/entities/Location.js';

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

  it('save() persists state to localStorage', () => {
    game.start();
    game.setFlag('visited', true);
    game.save();
    const raw = localStorage.getItem('edwin_save_test_game');
    expect(raw).not.toBeNull();
    const state = JSON.parse(raw);
    expect(state.flags.visited).toBe(true);
    expect(state.currentLocationId).toBe('start');
  });

  it('load() restores state from localStorage', () => {
    game.start();
    game.moveTo('next');
    game.setFlag('key', 42);
    game.save();

    const fresh = new Game({ id: 'test_game', title: 'Test Game' });
    const start = new Location({ id: 'start', name: 'Start Room' });
    const next = new Location({ id: 'next', name: 'Next Room' });
    fresh.addLocation(start);
    fresh.addLocation(next);
    fresh.setStartLocation('start');

    const loaded = fresh.load();
    expect(loaded).toBe(true);
    expect(fresh._currentLocationId).toBe('next');
    expect(fresh.flags.key).toBe(42);
  });

  it('load() returns false when no save exists', () => {
    localStorage.clear();
    const result = game.load();
    expect(result).toBe(false);
  });

  it('deleteSave() removes the save from localStorage', () => {
    game.start();
    game.save();
    expect(localStorage.getItem('edwin_save_test_game')).not.toBeNull();
    game.deleteSave();
    expect(localStorage.getItem('edwin_save_test_game')).toBeNull();
  });

  it('start() loads save when loadSave is true', () => {
    game.start();
    game.moveTo('next');
    game.save();

    const fresh = new Game({ id: 'test_game', title: 'Test Game' });
    const start = new Location({ id: 'start', name: 'Start Room' });
    const next = new Location({ id: 'next', name: 'Next Room' });
    fresh.addLocation(start);
    fresh.addLocation(next);
    fresh.setStartLocation('start');
    fresh.start(true);

    expect(fresh._currentLocationId).toBe('next');
  });

  it('toJSON() serializes world metadata', () => {
    game.start();
    const json = game.toJSON();
    expect(json.id).toBe('test_game');
    expect(json.title).toBe('Test Game');
    expect(json.startLocationId).toBe('start');
    expect(json.locations).toHaveLength(2);
  });

  it('save() logs error and does not throw when localStorage fails', () => {
    game.start();
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const origStorage = global.localStorage;
    Object.defineProperty(global, 'localStorage', {
      value: { setItem: () => { throw new Error('quota exceeded'); }, getItem: () => null, removeItem: () => {} },
      configurable: true,
    });
    expect(() => game.save()).not.toThrow();
    expect(error).toHaveBeenCalled();
    Object.defineProperty(global, 'localStorage', { value: origStorage, configurable: true });
    error.mockRestore();
  });

  it('load() returns false and logs error when localStorage throws', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const origStorage = global.localStorage;
    Object.defineProperty(global, 'localStorage', {
      value: { getItem: () => { throw new Error('access denied'); }, setItem: () => {}, removeItem: () => {} },
      configurable: true,
    });
    const result = game.load();
    expect(result).toBe(false);
    expect(error).toHaveBeenCalled();
    Object.defineProperty(global, 'localStorage', { value: origStorage, configurable: true });
    error.mockRestore();
  });
});
