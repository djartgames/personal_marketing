/**
 * @file GameContainer – root wrapper component for the Edwin engine.
 *
 * This component wires together all child components (LocationView, Navigation,
 * ActionPanel, Inventory, EventLog, NPCDialog) using the useGame hook.
 */

import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import ActionPanel from './ActionPanel.jsx';
import EventLog from './EventLog.jsx';
import Inventory from './Inventory.jsx';
import LocationView from './LocationView.jsx';
import Navigation from './Navigation.jsx';
import NPCDialog from './NPCDialog.jsx';
import { useGame } from '../hooks/useGame.js';
import { useInventory } from '../hooks/useInventory.js';
import { useLocation } from '../hooks/useLocation.js';

/**
 * Root game container. Pass the GameStateManager and optional action list.
 *
 * @param {object} props
 * @param {import('../core/GameStateManager.js').GameStateManager} props.manager - The active GameStateManager instance.
 * @param {Array<import('../entities/Action.js').Action>} [props.actions=[]] - Player actions to evaluate and display.
 * @returns {JSX.Element}
 */
function GameContainer({ manager, actions = [] }) {
  const { state, moveTo, pickUpItem, dropItem } = useGame(manager);
  const { location, navigate } = useLocation(state, moveTo);
  const { inventory, drop } = useInventory(state, dropItem);

  const [activeNPC, setActiveNPC] = useState(null);
  const [dialogStep, setDialogStep] = useState(null);

  // Filter actions that are currently available
  const availableActions = actions
    .filter((a) => a.isAvailable(state))
    .map((a) => a.toJSON());

  const handleAction = useCallback(
    (actionId) => {
      const action = actions.find((a) => a.id === actionId);
      if (action) {
        try {
          action.execute(state);
        } catch (err) {
          console.warn('Action error:', err.message);
        }
      }
    },
    [actions, state]
  );

  const handleTalkTo = useCallback((npcData) => {
    // Look up the live NPC from the game world
    const liveNPC = manager.game.currentLocation?.npcs.find((n) => n.id === npcData.id);
    if (!liveNPC) { return; }
    const step = liveNPC.startDialogue();
    setActiveNPC(liveNPC);
    setDialogStep(step);
  }, [manager]);

  const handleDialogChoose = useCallback(
    (optionIndex) => {
      if (!activeNPC) { return; }
      const next = activeNPC.respondToChoice(optionIndex, state);
      setDialogStep(next);
    },
    [activeNPC, state]
  );

  const handleDialogClose = useCallback(() => {
    setActiveNPC(null);
    setDialogStep(null);
  }, []);

  const handlePickUp = useCallback(
    (itemData) => {
      // Find the live Item object in the current location
      const liveItem = manager.game.currentLocation?.items.find((i) => i.id === itemData.id);
      if (liveItem) {
        manager.game.currentLocation.removeItem(liveItem.id);
        pickUpItem(liveItem);
      }
    },
    [manager, pickUpItem]
  );

  return (
    <div className="edwin-game-container container-fluid py-3">
      {/* Header */}
      <header className="row mb-3">
        <div className="col">
          <h1 className="h3 fw-bold">{state.title}</h1>
        </div>
      </header>

      <div className="row g-3">
        {/* Main content – location + navigation + actions */}
        <main className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <LocationView
                location={location}
                onPickUp={handlePickUp}
                onTalkTo={handleTalkTo}
              />
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <Navigation
                paths={location?.paths ?? {}}
                onNavigate={navigate}
              />
            </div>
          </div>

          {availableActions.length > 0 && (
            <div className="card mb-3">
              <div className="card-body">
                <ActionPanel actions={availableActions} onAction={handleAction} />
              </div>
            </div>
          )}
        </main>

        {/* Sidebar – inventory + event log */}
        <aside className="col-md-4">
          <Inventory items={inventory} onDrop={drop} />
          <div className="mt-3">
            <EventLog entries={state.log} />
          </div>
        </aside>
      </div>

      {/* NPC Dialogue modal */}
      {activeNPC && (
        <NPCDialog
          npc={{ id: activeNPC.id, name: activeNPC.name, description: activeNPC.description }}
          currentStep={dialogStep}
          onChoose={handleDialogChoose}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
}

GameContainer.propTypes = {
  manager: PropTypes.object.isRequired,
  actions: PropTypes.array,
};

export default GameContainer;
