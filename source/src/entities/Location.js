/**
 * @fileoverview Location – a spatial node in the game world that holds
 * descriptions, connected paths, items, and NPCs.
 */

/**
 * Represents a place the player can visit.
 *
 * @example
 * const tavern = new Location({
 *   id: 'tavern',
 *   name: 'The Rusty Flagon',
 *   description: 'A dimly lit tavern smelling of ale and sawdust.',
 * });
 * tavern.addPath('north', 'town_square');
 */
export class Location {
  /**
   * @param {object} config
   * @param {string} config.id - Unique identifier.
   * @param {string} config.name - Display name.
   * @param {string} [config.description=''] - Long description shown to the player.
   * @param {string} [config.shortDescription=''] - Brief description for navigation.
   * @param {object} [config.paths={}] - Map of direction → location id.
   * @param {Array<import('./Item.js').Item>} [config.items=[]] - Items present.
   * @param {Array<import('./NPC.js').NPC>} [config.npcs=[]] - NPCs present.
   * @param {object} [config.properties={}] - Arbitrary metadata.
   */
  constructor({
    id,
    name,
    description = '',
    shortDescription = '',
    paths = {},
    items = [],
    npcs = [],
    properties = {},
  }) {
    if (!id) { throw new Error('Location requires an id.'); }
    if (!name) { throw new Error('Location requires a name.'); }

    this.id = id;
    this.name = name;
    this.description = description;
    this.shortDescription = shortDescription;
    this.paths = { ...paths };
    this.items = [...items];
    this.npcs = [...npcs];
    this.properties = { ...properties };
    this.isLocked = false;
  }

  /**
   * Add an exit path from this location.
   *
   * @param {string} direction - e.g. 'north', 'south', 'up', 'east'.
   * @param {string} locationId - Target location id.
   */
  addPath(direction, locationId) {
    this.paths[direction] = locationId;
  }

  /**
   * Remove an exit path.
   *
   * @param {string} direction
   */
  removePath(direction) {
    delete this.paths[direction];
  }

  /**
   * Retrieve all available exit directions.
   *
   * @returns {string[]}
   */
  getExits() {
    return Object.keys(this.paths);
  }

  /**
   * Add an item to this location.
   *
   * @param {import('./Item.js').Item} item
   */
  addItem(item) {
    this.items.push(item);
  }

  /**
   * Remove and return an item by id.
   *
   * @param {string} itemId
   * @returns {import('./Item.js').Item | null}
   */
  removeItem(itemId) {
    const idx = this.items.findIndex((i) => i.id === itemId);
    if (idx === -1) { return null; }
    return this.items.splice(idx, 1)[0];
  }

  /**
   * Add an NPC to this location.
   *
   * @param {import('./NPC.js').NPC} npc
   */
  addNPC(npc) {
    this.npcs.push(npc);
  }

  /**
   * Remove an NPC by id.
   *
   * @param {string} npcId
   * @returns {import('./NPC.js').NPC | null}
   */
  removeNPC(npcId) {
    const idx = this.npcs.findIndex((n) => n.id === npcId);
    if (idx === -1) { return null; }
    return this.npcs.splice(idx, 1)[0];
  }

  /**
   * Lock the location (prevent entry).
   */
  lock() {
    this.isLocked = true;
  }

  /**
   * Unlock the location.
   */
  unlock() {
    this.isLocked = false;
  }

  /**
   * Serialize the location for persistence.
   *
   * @returns {object}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      shortDescription: this.shortDescription,
      paths: { ...this.paths },
      isLocked: this.isLocked,
      properties: { ...this.properties },
      items: this.items.map((i) => i.toJSON()),
      npcs: this.npcs.map((n) => n.toJSON()),
    };
  }
}

export default Location;
