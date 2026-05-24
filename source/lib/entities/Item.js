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

    this._id = id;
    this._name = name;
    this._description = description;
    this._isPickable = isPickable;
    this._isUsable = isUsable;
    this._properties = { ...properties };

    /** @type {'world' | 'inventory' | 'equipped' | 'discarded'} */
    this._state = 'world';
  }

  get id() {
    return this._id;
  }

  set id(id) {
    if (!id) { throw new Error('Item requires an id.'); }
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    if (!name) { throw new Error('Item requires a name.'); }
    this._name = name;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description ?? '';
  }

  get isPickable() {
    return this._isPickable;
  }

  set isPickable(isPickable) {
    this._isPickable = isPickable;
  }

  get isUsable() {
    return this._isUsable;
  }

  set isUsable(isUsable) {
    this._isUsable = isUsable;
  }

  get properties() {
    return { ...this._properties };
  }

  set properties(properties) {
    this._properties = { ...(properties ?? {}) };
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this.setState(state);
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
    this._state = newState;
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
      id: this._id,
      name: this._name,
      description: this._description,
      isPickable: this._isPickable,
      isUsable: this._isUsable,
      properties: { ...this._properties },
      state: this._state,
    };
  }
}

export default Item;
