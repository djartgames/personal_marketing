/**
 * @file Edwin – Public API entry point.
 *
 * Import from this file to consume the Edwin RPG framework.
 *
 * @example
 * import { Game, Location, Path, NPC, Item, Action, Interaction, EventSystem } from 'edwin';
 * import { GameContainer, GameStateManager } from 'edwin';
 */

// ── Entities ──────────────────────────────────────────────────────────────────
export { Game } from './entities/Game.js';
export { Location } from './entities/Location.js';
export { Path } from './entities/Path.js';
export { NPC } from './entities/NPC.js';
export { Item } from './entities/Item.js';
export { Action } from './entities/Action.js';
export { Interaction } from './entities/Interaction.js';
export { EventSystem } from './entities/EventSystem.js';

// ── Core ──────────────────────────────────────────────────────────────────────
export { GameStateManager } from './core/GameStateManager.js';

// ── React Components ──────────────────────────────────────────────────────────
export { default as GameContainer } from './components/GameContainer.jsx';
export { default as LocationView } from './components/LocationView.jsx';
export { default as NPCDialog } from './components/NPCDialog.jsx';
export { default as Inventory } from './components/Inventory.jsx';
export { default as ActionPanel } from './components/ActionPanel.jsx';
export { default as Navigation } from './components/Navigation.jsx';
export { default as EventLog } from './components/EventLog.jsx';

// ── Hooks ─────────────────────────────────────────────────────────────────────
export { useGame } from './hooks/useGame.js';
export { useLocation } from './hooks/useLocation.js';
export { useInventory } from './hooks/useInventory.js';

// ── Styles ────────────────────────────────────────────────────────────────────
import './styles/main.css';
