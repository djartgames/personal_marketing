/**
 * @file Interaction – models a structured exchange between the player
 * and an NPC, such as a dialogue tree or a trade sequence.
 */

/**
 * Represents a multi-step interaction (dialogue, trade, etc.) between the
 * player and an entity.
 *
 * @example
 * const greet = new Interaction({
 *   id: 'greet_merchant',
 *   steps: [
 *     { id: 'intro', text: 'Welcome, traveller!', options: [
 *       { label: 'What do you sell?', next: 'shop' },
 *       { label: 'Goodbye', next: null },
 *     ]},
 *     { id: 'shop', text: 'I have potions and maps.', options: [
 *       { label: 'Buy a potion', action: 'buyPotion', next: null },
 *       { label: 'Back', next: 'intro' },
 *     ]},
 *   ],
 * });
 */
export class Interaction {
  /**
   * @param {object} config
   * @param {string} config.id - Unique identifier.
   * @param {Array<import('../types/index.js').InteractionStep>} config.steps - Ordered list of steps.
   * @param {string} [config.startStepId] - ID of the first step (defaults to steps[0].id).
   */
  constructor({ id, steps = [], startStepId }) {
    if (!id) { throw new Error('Interaction requires an id.'); }
    if (!Array.isArray(steps) || steps.length === 0) {
      throw new Error('Interaction requires at least one step.');
    }

    this.id = id;
    this.steps = steps;
    this._stepMap = new Map(steps.map((s) => [s.id, s]));
    this._currentStepId = startStepId ?? steps[0].id;
    this.isComplete = false;
  }

  /** @returns {object | null} The current step object, or null if finished. */
  get currentStep() {
    if (this.isComplete) { return null; }
    return this._stepMap.get(this._currentStepId) ?? null;
  }

  /**
   * Choose an option from the current step.
   *
   * @param {number} optionIndex - Zero-based index into currentStep.options.
   * @param {object} [gameState={}] - Passed to option action callbacks.
   * @returns {object | null} The next step, or null when the interaction ends.
   */
  choose(optionIndex, gameState = {}) {
    const step = this.currentStep;
    if (!step) { throw new Error('Interaction is already complete.'); }

    const option = step.options?.[optionIndex];
    if (!option) { throw new Error(`No option at index ${optionIndex}.`); }

    if (typeof option.action === 'function') {
      option.action(gameState);
    }

    if (option.next === null || option.next === undefined) {
      this.isComplete = true;
      return null;
    }

    this._currentStepId = option.next;
    return this.currentStep;
  }

  /** Reset the interaction to its initial state. */
  reset() {
    this._currentStepId = this.steps[0].id;
    this.isComplete = false;
  }

  /**
   * Serialize the interaction for persistence.
   *
   * @returns {object}
   */
  toJSON() {
    return {
      id: this.id,
      currentStepId: this._currentStepId,
      isComplete: this.isComplete,
    };
  }
}

export default Interaction;
