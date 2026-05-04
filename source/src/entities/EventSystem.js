/**
 * @fileoverview EventSystem – a lightweight pub/sub implementation for
 * asynchronous, decoupled communication between game entities.
 */

/**
 * A simple publish/subscribe event bus.
 *
 * @example
 * const events = new EventSystem();
 * events.on('playerMoved', ({ location }) => console.log('Moved to', location));
 * events.emit('playerMoved', { location: 'Forest' });
 */
export class EventSystem {
  constructor() {
    /** @type {Map<string, Set<Function>>} */
    this._listeners = new Map();
  }

  /**
   * Subscribe to an event.
   *
   * @param {string} event - The event name.
   * @param {Function} listener - Callback invoked when the event fires.
   * @returns {Function} Unsubscribe function.
   */
  on(event, listener) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event).add(listener);

    return () => this.off(event, listener);
  }

  /**
   * Subscribe to an event once; auto-unsubscribes after the first emission.
   *
   * @param {string} event - The event name.
   * @param {Function} listener - Callback invoked once.
   * @returns {Function} Unsubscribe function.
   */
  once(event, listener) {
    const wrapper = (data) => {
      listener(data);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }

  /**
   * Unsubscribe from an event.
   *
   * @param {string} event - The event name.
   * @param {Function} listener - The previously registered callback.
   */
  off(event, listener) {
    const listeners = this._listeners.get(event);
    if (listeners) {
      listeners.delete(listener);
    }
  }

  /**
   * Emit an event, calling all registered listeners synchronously.
   *
   * @param {string} event - The event name.
   * @param {*} [data] - Payload passed to each listener.
   */
  emit(event, data) {
    const listeners = this._listeners.get(event);
    if (listeners) {
      listeners.forEach((listener) => listener(data));
    }
  }

  /**
   * Remove all listeners for a given event, or all events if none is provided.
   *
   * @param {string} [event] - The event to clear. Omit to clear everything.
   */
  clear(event) {
    if (event) {
      this._listeners.delete(event);
    } else {
      this._listeners.clear();
    }
  }

  /**
   * Returns the number of listeners registered for an event.
   *
   * @param {string} event - The event name.
   * @returns {number}
   */
  listenerCount(event) {
    return this._listeners.get(event)?.size ?? 0;
  }
}

export default EventSystem;
