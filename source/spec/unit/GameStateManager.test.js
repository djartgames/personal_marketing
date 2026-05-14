import { describe, it, expect, vi } from 'vitest';
import { GameStateManager } from '../../lib/core/GameStateManager.js';
import { Game } from '../../lib/entities/Game.js';
import { Location } from '../../lib/entities/Location.js';

function buildManager() {
  const game = new Game({ id: 'gsm_test', title: 'GSM Test' });
  const start = new Location({ id: 'start', name: 'Start Room' });
  game.addLocation(start);
  game.setStartLocation('start');
  game.start();
  return new GameStateManager(game);
}

describe('GameStateManager', () => {
  it('throws when constructed without a Game instance', () => {
    expect(() => new GameStateManager({})).toThrow(
      'GameStateManager requires a Game instance.'
    );
  });

  it('throws when constructed with null', () => {
    expect(() => new GameStateManager(null)).toThrow(
      'GameStateManager requires a Game instance.'
    );
  });

  it('getSnapshot() returns current game state', () => {
    const manager = buildManager();
    const snap = manager.getSnapshot();
    expect(snap.title).toBe('GSM Test');
    expect(snap.isStarted).toBe(true);
    expect(snap.currentLocationId).toBe('start');
    expect(snap.playerInventory).toEqual([]);
    expect(snap.flags).toEqual({});
  });

  it('getSnapshot() currentLocation is null before start', () => {
    const game = new Game({ id: 'gsm2', title: 'GSM2' });
    const loc = new Location({ id: 'a', name: 'A' });
    game.addLocation(loc);
    game.setStartLocation('a');
    const manager = new GameStateManager(game);
    const snap = manager.getSnapshot();
    expect(snap.currentLocation).toBeNull();
  });

  it('subscribe() receives snapshot updates on game events', () => {
    const manager = buildManager();
    const snapshots = [];
    manager.subscribe((snap) => snapshots.push(snap));

    manager.game.setFlag('door', true);
    expect(snapshots).toHaveLength(1);
    expect(snapshots[0].flags.door).toBe(true);
  });

  it('subscribe() returns an unsubscribe function', () => {
    const manager = buildManager();
    const cb = vi.fn();
    const unsubscribe = manager.subscribe(cb);

    manager.game.setFlag('x', 1);
    expect(cb).toHaveBeenCalledTimes(1);

    unsubscribe();
    manager.game.setFlag('x', 2);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('notifies on locationChanged', () => {
    const game = new Game({ id: 'gsm3', title: 'GSM3' });
    const a = new Location({ id: 'a', name: 'A' });
    const b = new Location({ id: 'b', name: 'B' });
    game.addLocation(a);
    game.addLocation(b);
    game.setStartLocation('a');
    game.start();
    const manager = new GameStateManager(game);
    const cb = vi.fn();
    manager.subscribe(cb);
    game.moveTo('b');
    expect(cb).toHaveBeenCalled();
    expect(cb.mock.calls[0][0].currentLocationId).toBe('b');
  });
});
