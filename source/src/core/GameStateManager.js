/**
 * @fileoverview GameStateManager – wraps a Game instance and bridges it to
 * React state via an event-driven approach.
 */

import { Game } from '../entities/Game.js';

/**
 * Manages reactive game state for use with React hooks.
 *
 * It holds a single Game instance and re-serializes state whenever the
 * game emits a change event.
 */
export class GameStateManager {
  /**
   * @param {Game} game - The Game instance to manage.
   */
  constructor(game) {
    if (!(game instanceof Game)) {
      throw new Error('GameStateManager requires a Game instance.');
    }
    this.game = game;

    /** @type {Set<Function>} React setState callbacks */
    this._subscribers = new Set();

    const notify = () => this._notifySubscribers();
    game.events.on('locationChanged', notify);
    game.events.on('inventoryChanged', notify);
    game.events.on('flagChanged', notify);
    game.events.on('logUpdated', notify);
    game.events.on('gameStarted', notify);
    game.events.on('gameLoaded', notify);
  }

  /**
   * Subscribe to state changes.
   *
   * @param {Function} callback - Called with the new state snapshot.
   * @returns {Function} Unsubscribe function.
   */
  subscribe(callback) {
    this._subscribers.add(callback);
    return () => this._subscribers.delete(callback);
  }

  /** @private */
  _notifySubscribers() {
    const snapshot = this.getSnapshot();
    this._subscribers.forEach((cb) => cb(snapshot));
  }

  /**
   * Returns a plain-object snapshot of the current game state (safe for
   * React state storage and JSON serialization).
   *
   * @returns {import('../types/index.js').GameState & { title: string, currentLocation: object | null }}
   */
  getSnapshot() {
    const g = this.game;
    return {
      title: g.title,
      currentLocationId: g._currentLocationId,
      currentLocation: g.currentLocation ? g.currentLocation.toJSON() : null,
      playerInventory: g.playerInventory.map((i) => i.toJSON()),
      flags: { ...g.flags },
      log: [...g.log],
      isStarted: g.isStarted,
    };
  }
}

export default GameStateManager;
