/**
 * @file Action – a discrete player-triggered operation with optional
 * preconditions and effects.
 */

/**
 * Represents an action available to the player.
 *
 * @example
 * const unlockDoor = new Action({
 *   id: 'unlock_door',
 *   label: 'Unlock door',
 *   condition: (state) => state.inventory.has('rusty_key'),
 *   execute: (state) => { state.locations.get('cellar').unlock(); },
 * });
 */
export class Action {
  /**
   * @param {object} config
   * @param {string} config.id - Unique identifier.
   * @param {string} config.label - Human-readable label.
   * @param {string} [config.description=''] - Additional context shown in UI.
   * @param {Function} [config.condition] - Predicate: (gameState) => boolean.
   *   Returns true when the action is available.
   * @param {Function} config.execute - Side-effectful: (gameState) => void.
   */
  constructor({ id, label, description = '', condition, execute }) {
    if (!id) { throw new Error('Action requires an id.'); }
    if (!label) { throw new Error('Action requires a label.'); }
    if (typeof execute !== 'function') { throw new Error('Action requires an execute function.'); }

    this.id = id;
    this.label = label;
    this.description = description;
    this._condition = condition ?? (() => true);
    this._execute = execute;
  }

  /**
   * Check whether this action is currently available.
   *
   * @param {object} gameState - The current game state snapshot.
   * @returns {boolean}
   */
  isAvailable(gameState) {
    try {
      return Boolean(this._condition(gameState));
    } catch {
      return false;
    }
  }

  /**
   * Execute the action.
   *
   * @param {object} gameState - The current game state.
   * @throws {Error} When the action is not available.
   */
  execute(gameState) {
    if (!this.isAvailable(gameState)) {
      throw new Error(`Action "${this.id}" is not available in the current state.`);
    }
    this._execute(gameState);
  }

  /**
   * Serialize the action metadata (not the callbacks) to a plain object.
   *
   * @returns {object}
   */
  toJSON() {
    return {
      id: this.id,
      label: this.label,
      description: this.description,
    };
  }
}

export default Action;
