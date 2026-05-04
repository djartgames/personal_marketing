/**
 * @fileoverview Shared JSDoc type definitions used across the Edwin framework.
 *
 * These are pure documentation types (no runtime code).
 */

/**
 * @typedef {object} GameState
 * @property {string} currentLocationId - ID of the current location.
 * @property {Array<ItemData>} playerInventory - Player's held items.
 * @property {object} flags - Arbitrary game flags.
 * @property {Array<LogEntry>} log - Event log entries.
 */

/**
 * @typedef {object} ItemData
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {boolean} isPickable
 * @property {boolean} isUsable
 * @property {object} properties
 * @property {'world' | 'inventory' | 'equipped' | 'discarded'} state
 */

/**
 * @typedef {object} LogEntry
 * @property {string} text
 * @property {number} timestamp - Unix milliseconds.
 */

/**
 * @typedef {object} InteractionStep
 * @property {string} id - Unique step identifier.
 * @property {string} text - Text displayed to the player.
 * @property {Array<InteractionOption>} [options] - Available choices.
 */

/**
 * @typedef {object} InteractionOption
 * @property {string} label - Button/choice label.
 * @property {string | null} next - Next step id, or null to end.
 * @property {Function} [action] - Optional callback: (gameState) => void.
 */

/**
 * @typedef {object} LocationData
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} shortDescription
 * @property {object} paths - direction → locationId
 * @property {boolean} isLocked
 * @property {Array<ItemData>} items
 */
