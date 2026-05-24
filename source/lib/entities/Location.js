/**
 * @file Location – a spatial node in the game world that holds
 * descriptions, connected paths, items, and NPCs.
 */

import { Path } from './Path.js';

/**
 * Represents a place the player can visit.
 *
 * @example
 * const tavern = new Location({
 *   id: 'tavern',
 *   name: 'The Rusty Flagon',
 *   description: 'A dimly lit tavern smelling of ale and sawdust.',
 * });
 * tavern.addPath('north', { target: 'town_square', label: '↑ North' });
 */
export class Location {
  /**
   * @param {object} config
   * @param {string} config.id - Unique identifier.
   * @param {string} config.name - Display name.
   * @param {string} [config.description=''] - Long description shown to the player.
   * @param {string} [config.shortDescription=''] - Brief description for navigation.
   * @param {string|null} [config.image=null] - URL of an image depicting the location.
   * @param {Record<string, object | Path>} [config.paths={}] - Map of direction → path definition.
   * @param {Array<import('./Item.js').Item>} [config.items=[]] - Items present.
   * @param {Array<import('./NPC.js').NPC>} [config.npcs=[]] - NPCs present.
   * @param {object} [config.properties={}] - Arbitrary metadata.
   */
  constructor({
    id,
    name,
    description = '',
    shortDescription = '',
    image = null,
    paths = {},
    items = [],
    npcs = [],
    properties = {},
  }) {
    if (!id) { throw new Error('Location requires an id.'); }
    if (!name) { throw new Error('Location requires a name.'); }

    this._id = id;
    this._name = name;
    this._description = description;
    this._shortDescription = shortDescription;
    this._image = image;
    this._paths = this.#normalizePaths(paths);
    this._items = [...items];
    this._npcs = [...npcs];
    this._properties = { ...properties };
    this._isLocked = false;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get shortDescription() {
    return this._shortDescription;
  }

  get image() {
    return this._image;
  }

  get paths() {
    return this._paths;
  }

  get items() {
    return this._items;
  }

  get npcs() {
    return this._npcs;
  }

  get properties() {
    return this._properties;
  }

  get isLocked() {
    return this._isLocked;
  }

  /**
   * Add an exit path from this location.
   *
   * @param {string} direction - e.g. 'north', 'south', 'up', 'east'.
   * @param {object | Path} path - Path descriptor.
   */
  addPath(direction, path) {
    this._paths[direction] = this.#normalizePath(path);
  }

  /**
   * Remove an exit path.
   *
   * @param {string} direction
   */
  removePath(direction) {
    delete this._paths[direction];
  }

  /**
   * Retrieve all available exit directions.
   *
   * @returns {string[]}
   */
  getExits() {
    return Object.keys(this._paths);
  }

  /**
   * Add an item to this location.
   *
   * @param {import('./Item.js').Item} item
   */
  addItem(item) {
    this._items.push(item);
  }

  /**
   * Remove and return an item by id.
   *
   * @param {string} itemId
   * @returns {import('./Item.js').Item | null}
   */
  removeItem(itemId) {
    const idx = this._items.findIndex((i) => i.id === itemId);
    if (idx === -1) { return null; }
    return this._items.splice(idx, 1)[0];
  }

  /**
   * Add an NPC to this location.
   *
   * @param {import('./NPC.js').NPC} npc
   */
  addNPC(npc) {
    this._npcs.push(npc);
  }

  /**
   * Remove an NPC by id.
   *
   * @param {string} npcId
   * @returns {import('./NPC.js').NPC | null}
   */
  removeNPC(npcId) {
    const idx = this._npcs.findIndex((n) => n.id === npcId);
    if (idx === -1) { return null; }
    return this._npcs.splice(idx, 1)[0];
  }

  /**
   * Lock the location (prevent entry).
   */
  lock() {
    this._isLocked = true;
  }

  /**
   * Unlock the location.
   */
  unlock() {
    this._isLocked = false;
  }

  /**
   * Serialize the location for persistence.
   *
   * @returns {object}
   */
  toJSON() {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      shortDescription: this._shortDescription,
      image: this._image,
      paths: Object.fromEntries(
        Object.entries(this._paths).map(([direction, path]) => [direction, path.toJSON()])
      ),
      isLocked: this._isLocked,
      properties: { ...this._properties },
      items: this._items.map((i) => i.toJSON()),
      npcs: this._npcs.map((n) => n.toJSON()),
    };
  }

  #normalizePaths(paths) {
    return Object.fromEntries(
      Object.entries(paths).map(([direction, path]) => [direction, this.#normalizePath(path)])
    );
  }

  #normalizePath(path) {
    if (path instanceof Path) {
      return path;
    }

    return new Path(path);
  }
}

export default Location;
