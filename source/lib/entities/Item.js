/**
 * @file Item – a collectible or interactive in-game object.
 */

/**
 * Represents a collectible or interactive item in the game world.
 *
 * @example
 * const sword = new Item({
 *   id: 'sword_01',
 *   name: 'Iron Sword',
 *   description: 'A sturdy iron sword.',
 *   properties: { damage: 10, weight: 5 },
 * });
 */
export class Item {
  /**
   * @param {object} config
   * @param {string} config.id - Unique identifier.
   * @param {string} config.name - Display name.
   * @param {string} [config.description=''] - Flavour text.
   * @param {boolean} [config.isPickable=true] - Whether the player can pick this up.
   * @param {boolean} [config.isUsable=false] - Whether the item has a use action.
   * @param {object} [config.properties={}] - Arbitrary key/value metadata.
   */
  constructor({ id, name, description = '', isPickable = true, isUsable = false, properties = {} }) {
    if (!id) { throw new Error('Item requires an id.'); }
    if (!name) { throw new Error('Item requires a name.'); }

    this.id = id;
    this.name = name;
    this.description = description;
    this.isPickable = isPickable;
    this.isUsable = isUsable;
    this.properties = { ...properties };

    /** @type {'world' | 'inventory' | 'equipped' | 'discarded'} */
    this.state = 'world';
  }

  /**
   * Transition the item to a new state.
   *
   * @param {'world' | 'inventory' | 'equipped' | 'discarded'} newState
   */
  setState(newState) {
    const valid = ['world', 'inventory', 'equipped', 'discarded'];
    if (!valid.includes(newState)) {
      throw new Error(`Invalid item state: ${newState}`);
    }
    this.state = newState;
  }

  /**
   * Use the item, executing optional logic.
   *
   * @param {object} [context={}] - Game context passed to the use callback.
   * @returns {boolean} Whether the item was successfully used.
   */
  use(context = {}) {
    if (!this.isUsable) { return false; }
    if (typeof this.onUse === 'function') {
      this.onUse(context);
    }
    return true;
  }

  /**
   * Serialize the item to a plain object for persistence.
   *
   * @returns {object}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      isPickable: this.isPickable,
      isUsable: this.isUsable,
      properties: { ...this.properties },
      state: this.state,
    };
  }
}

export default Item;
