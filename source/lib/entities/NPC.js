/**
 * @file NPC – a Non-Player Character with dialogue trees and
 * item inventories.
 */

/**
 * Represents a non-player character the player can interact with.
 *
 * @example
 * const innkeeper = new NPC({
 *   id: 'innkeeper',
 *   name: 'Gareth',
 *   description: 'A stout man with a friendly smile.',
 *   dialogue: greetInteraction,
 * });
 */
export class NPC {
  /**
   * @param {object} config
   * @param {string} config.id - Unique identifier.
   * @param {string} config.name - Display name.
   * @param {string} [config.description=''] - Flavour text.
   * @param {Interaction | null} [config.dialogue=null] - Primary dialogue tree.
   * @param {Array<import('./Item.js').Item>} [config.inventory=[]] - Items the NPC carries.
   * @param {object} [config.properties={}] - Arbitrary metadata.
   */
  constructor({
    id,
    name,
    description = '',
    dialogue = null,
    inventory = [],
    properties = {},
  }) {
    if (!id) { throw new Error('NPC requires an id.'); }
    if (!name) { throw new Error('NPC requires a name.'); }

    this._id = id;
    this._name = name;
    this._description = description;
    this._dialogue = dialogue;
    this._inventory = [...inventory];
    this._properties = { ...properties };
    this._isHostile = false;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    if (!id) { throw new Error('NPC requires an id.'); }
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    if (!name) { throw new Error('NPC requires a name.'); }
    this._name = name;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description ?? '';
  }

  get dialogue() {
    return this._dialogue;
  }

  set dialogue(dialogue) {
    this._dialogue = dialogue;
  }

  get inventory() {
    return [...this._inventory];
  }

  set inventory(inventory) {
    this._inventory = Array.isArray(inventory) ? [...inventory] : [];
  }

  get properties() {
    return { ...this._properties };
  }

  set properties(properties) {
    this._properties = { ...(properties ?? {}) };
  }

  get isHostile() {
    return this._isHostile;
  }

  set isHostile(isHostile) {
    this._isHostile = isHostile;
  }

  /**
   * Begin (or restart) the NPC's primary dialogue.
   *
   * @returns {object | null} The first dialogue step, or null if no dialogue.
   */
  startDialogue() {
    if (!this._dialogue) { return null; }
    this._dialogue.reset();
    return this._dialogue.currentStep;
  }

  /**
   * Respond to a player dialogue choice.
   *
   * @param {number} optionIndex - The chosen option index.
   * @param {object} [gameState={}] - Current game state.
   * @returns {object | null} The next step, or null when done.
   */
  respondToChoice(optionIndex, gameState = {}) {
    if (!this._dialogue) { return null; }
    return this._dialogue.choose(optionIndex, gameState);
  }

  /**
   * Add an item to the NPC's inventory.
   *
   * @param {import('./Item.js').Item} item
   */
  addItem(item) {
    this._inventory.push(item);
  }

  /**
   * Remove an item from the NPC's inventory by id.
   *
   * @param {string} itemId
   * @returns {import('./Item.js').Item | null} The removed item, or null.
   */
  removeItem(itemId) {
    const idx = this._inventory.findIndex((i) => i.id === itemId);
    if (idx === -1) { return null; }
    return this._inventory.splice(idx, 1)[0];
  }

  /**
   * Serialize the NPC for persistence.
   *
   * @returns {object}
   */
  toJSON() {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      isHostile: this._isHostile,
      properties: { ...this._properties },
      inventory: this._inventory.map((i) => i.toJSON()),
      dialogue: this._dialogue?.toJSON() ?? null,
    };
  }
}

export default NPC;
