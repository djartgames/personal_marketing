/**
 * @file Game – the central hub that manages world initialization,
 * global state, player inventory, and event coordination.
 */

import { EventSystem } from './EventSystem.js';

/**
 * Central game orchestrator.
 *
 * @example
 * const game = new Game({ id: 'my_rpg', title: 'My Adventure' });
 * game.addLocation(tavern);
 * game.setStartLocation('tavern');
 * game.start();
 */
export class Game {
  /**
   * @param {object} config
   * @param {string} config.id - Unique game identifier (used for localStorage key).
   * @param {string} config.title - Display title.
   * @param {string} [config.description=''] - Short description.
   * @param {string} [config.version='1.0.0'] - Semantic version.
   */
  constructor({ id, title, description = '', version = '1.0.0' }) {
    if (!id) { throw new Error('Game requires an id.'); }
    if (!title) { throw new Error('Game requires a title.'); }

    this.id = id;
    this.title = title;
    this.description = description;
    this.version = version;

    /** @type {Map<string, import('./Location.js').Location>} */
    this.locations = new Map();

    /** @type {Array<import('./Item.js').Item>} */
    this.playerInventory = [];

    /** @type {object} Arbitrary game flags / variables */
    this.flags = {};

    /** @type {string | null} */
    this._startLocationId = null;

    /** @type {string | null} */
    this._currentLocationId = null;

    /** @type {EventSystem} */
    this.events = new EventSystem();

    /** @type {boolean} */
    this.isStarted = false;

    /** @type {Array<string>} Chronological event log entries. */
    this.log = [];
  }

  // ─── Locations ────────────────────────────────────────────────────────────

  /**
   * Register a location with the game world.
   *
   * @param {import('./Location.js').Location} location
   */
  addLocation(location) {
    this.locations.set(location.id, location);
  }

  /**
   * Define the starting location id.
   *
   * @param {string} locationId
   */
  setStartLocation(locationId) {
    if (!this.locations.has(locationId)) {
      throw new Error(`Unknown location: ${locationId}`);
    }
    this._startLocationId = locationId;
  }

  /** @returns {import('./Location.js').Location | null} */
  get currentLocation() {
    return this.locations.get(this._currentLocationId) ?? null;
  }

  /**
   * Move the player to a new location.
   *
   * @param {string} locationId
   * @fires Game#locationChanged
   */
  moveTo(locationId) {
    const location = this.locations.get(locationId);
    if (!location) { throw new Error(`Unknown location: ${locationId}`); }
    if (location.isLocked) { throw new Error(`Location "${locationId}" is locked.`); }

    const previous = this._currentLocationId;
    this._currentLocationId = locationId;

    this.addLogEntry(`You move to ${location.name}.`);
    this.events.emit('locationChanged', { previous, current: locationId, location });
  }

  // ─── Inventory ────────────────────────────────────────────────────────────

  /**
   * Add an item to the player's inventory.
   *
   * @param {import('./Item.js').Item} item
   * @fires Game#inventoryChanged
   */
  pickUpItem(item) {
    item.setState('inventory');
    this.playerInventory.push(item);
    this.addLogEntry(`You picked up ${item.name}.`);
    this.events.emit('inventoryChanged', { action: 'added', item });
  }

  /**
   * Remove an item from the player's inventory by id.
   *
   * @param {string} itemId
   * @returns {import('./Item.js').Item | null}
   * @fires Game#inventoryChanged
   */
  dropItem(itemId) {
    const idx = this.playerInventory.findIndex((i) => i.id === itemId);
    if (idx === -1) { return null; }
    const [item] = this.playerInventory.splice(idx, 1);
    item.setState('world');
    this.addLogEntry(`You dropped ${item.name}.`);
    this.events.emit('inventoryChanged', { action: 'removed', item });
    return item;
  }

  /**
   * Check whether the player carries a specific item.
   *
   * @param {string} itemId
   * @returns {boolean}
   */
  hasItem(itemId) {
    return this.playerInventory.some((i) => i.id === itemId);
  }

  // ─── Flags / State ────────────────────────────────────────────────────────

  /**
   * Set a game flag.
   *
   * @param {string} key
   * @param {*} value
   */
  setFlag(key, value) {
    this.flags[key] = value;
    this.events.emit('flagChanged', { key, value });
  }

  /**
   * Get a game flag value.
   *
   * @param {string} key
   * @param {*} [defaultValue=undefined]
   * @returns {*}
   */
  getFlag(key, defaultValue = undefined) {
    return Object.prototype.hasOwnProperty.call(this.flags, key)
      ? this.flags[key]
      : defaultValue;
  }

  // ─── Log ──────────────────────────────────────────────────────────────────

  /**
   * Append a human-readable entry to the event log.
   *
   * @param {string} text
   */
  addLogEntry(text) {
    const entry = { text, timestamp: Date.now() };
    this.log.push(entry);
    this.events.emit('logUpdated', { entry });
  }

  // ─── Persistence ──────────────────────────────────────────────────────────

  /**
   * Persist game state to localStorage.
   */
  save() {
    const state = {
      currentLocationId: this._currentLocationId,
      playerInventory: this.playerInventory.map((i) => i.toJSON()),
      flags: { ...this.flags },
      log: this.log,
    };
    try {
      localStorage.setItem(`edwin_save_${this.id}`, JSON.stringify(state));
      this.events.emit('gameSaved', { state });
    } catch (err) {
      console.error('Failed to save game:', err);
    }
  }

  /**
   * Load game state from localStorage.
   *
   * @returns {boolean} True if a save was found and loaded.
   */
  load() {
    try {
      const raw = localStorage.getItem(`edwin_save_${this.id}`);
      if (!raw) { return false; }
      const state = JSON.parse(raw);
      this._currentLocationId = state.currentLocationId;
      this.flags = state.flags ?? {};
      this.log = state.log ?? [];
      this.events.emit('gameLoaded', { state });
      return true;
    } catch (err) {
      console.error('Failed to load game:', err);
      return false;
    }
  }

  /**
   * Erase the saved game from localStorage.
   */
  deleteSave() {
    localStorage.removeItem(`edwin_save_${this.id}`);
    this.events.emit('saveDeleted', {});
  }

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  /**
   * Start (or restart) the game.
   *
   * @param {boolean} [loadSave=false] - Attempt to resume from a previous save.
   */
  start(loadSave = false) {
    if (!this._startLocationId) {
      throw new Error('Call setStartLocation() before starting the game.');
    }
    this.isStarted = true;

    const loaded = loadSave && this.load();
    if (!loaded) {
      this._currentLocationId = this._startLocationId;
      this.addLogEntry(`${this.title} – Adventure begins!`);
    }

    this.events.emit('gameStarted', { loaded });
  }

  /**
   * Serialize the game world metadata (not save state) to a plain object.
   *
   * @returns {object}
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      version: this.version,
      startLocationId: this._startLocationId,
      currentLocationId: this._currentLocationId,
      flags: { ...this.flags },
      locations: [...this.locations.values()].map((l) => l.toJSON()),
    };
  }
}

export default Game;
