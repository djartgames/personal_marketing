/**
 * @file Path – a connection between two locations in the game world.
 */

/**
 * Represents a traversable path to another location.
 */
export class Path {
  /**
   * @param {object} [config={}] - Path configuration.
   * @param {string} [config.target] - Target location id.
   * @param {string} [config.destination] - Alias for target location id.
   * @param {string} [config.label] - Display label for this path.
   * @param {*} [config.conditions] - Optional conditions required to use this path.
   */
  constructor({ target, destination, label, conditions, ...properties } = {}) {
    this._target = target ?? destination ?? null;
    this._destination = destination ?? target ?? null;
    this._label = label;
    this._conditions = conditions;
    this._properties = { ...properties };
  }

  get target() {
    return this._target;
  }

  get destination() {
    return this._destination;
  }

  get label() {
    return this._label;
  }

  get conditions() {
    return this._conditions;
  }

  get properties() {
    return this._properties;
  }

  toJSON() {
    const path = { ...this._properties };

    if (this.target !== null) {
      path.target = this.target;
    }

    if (this.destination !== null && this.destination !== this.target) {
      path.destination = this.destination;
    }

    if (this.label !== undefined) {
      path.label = this.label;
    }

    if (this.conditions !== undefined) {
      path.conditions = this.conditions;
    }

    return path;
  }
}

export default Path;
