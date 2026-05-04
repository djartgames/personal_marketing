/**
 * @fileoverview NPC – a Non-Player Character with dialogue trees and
 * item inventories.
 */

import { Interaction } from './Interaction.js';

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

    this.id = id;
    this.name = name;
    this.description = description;
    this.dialogue = dialogue;
    this.inventory = [...inventory];
    this.properties = { ...properties };
    this.isHostile = false;
  }

  /**
   * Begin (or restart) the NPC's primary dialogue.
   *
   * @returns {object | null} The first dialogue step, or null if no dialogue.
   */
  startDialogue() {
    if (!this.dialogue) { return null; }
    this.dialogue.reset();
    return this.dialogue.currentStep;
  }

  /**
   * Respond to a player dialogue choice.
   *
   * @param {number} optionIndex - The chosen option index.
   * @param {object} [gameState={}] - Current game state.
   * @returns {object | null} The next step, or null when done.
   */
  respondToChoice(optionIndex, gameState = {}) {
    if (!this.dialogue) { return null; }
    return this.dialogue.choose(optionIndex, gameState);
  }

  /**
   * Add an item to the NPC's inventory.
   *
   * @param {import('./Item.js').Item} item
   */
  addItem(item) {
    this.inventory.push(item);
  }

  /**
   * Remove an item from the NPC's inventory by id.
   *
   * @param {string} itemId
   * @returns {import('./Item.js').Item | null} The removed item, or null.
   */
  removeItem(itemId) {
    const idx = this.inventory.findIndex((i) => i.id === itemId);
    if (idx === -1) { return null; }
    return this.inventory.splice(idx, 1)[0];
  }

  /**
   * Serialize the NPC for persistence.
   *
   * @returns {object}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      isHostile: this.isHostile,
      properties: { ...this.properties },
      inventory: this.inventory.map((i) => i.toJSON()),
      dialogue: this.dialogue?.toJSON() ?? null,
    };
  }
}

export default NPC;
