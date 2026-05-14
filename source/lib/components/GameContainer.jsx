/**
 * @file GameContainer – root wrapper component for the Edwin engine.
 *
 * This component wires together all child components (LocationView, Navigation,
 * ActionPanel, Inventory, EventLog, NPCDialog) using the useGame hook.
 */

import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { GameContainerController } from './controllers/GameContainerController.js';
import EventLog from './EventLog.jsx';
import { GameContainerHelper } from './helpers/GameContainerHelper.jsx';
import Inventory from './Inventory.jsx';
import LocationView from './LocationView.jsx';
import Navigation from './Navigation.jsx';
import { useGame } from '../hooks/useGame.js';
import { useInventory } from '../hooks/useInventory.js';
import { useLocation } from '../hooks/useLocation.js';

const helper = new GameContainerHelper();

function GameContainer({ manager, actions = [] }) {
  const { state, moveTo, pickUpItem, dropItem } = useGame(manager);
  const { location, navigate } = useLocation(state, moveTo);
  const { inventory, drop } = useInventory(state, dropItem);

  const [activeNPC, setActiveNPC] = useState(null);
  const [dialogStep, setDialogStep] = useState(null);

  const controller = new GameContainerController(manager, actions);
  const availableActions = controller.getAvailableActions(state);

  const handleAction = useCallback(
    (actionId) => { controller.executeAction(actionId, state); },
    [actions, state]
  );

  const handleTalkTo = useCallback((npcData) => {
    const result = controller.startDialogue(npcData);
    if (!result) {return;}
    setActiveNPC(result.npc);
    setDialogStep(result.step);
  }, [manager]);

  const handleDialogChoose = useCallback(
    (optionIndex) => {
      if (!activeNPC) {return;}
      setDialogStep(controller.advanceDialogue(activeNPC, optionIndex, state));
    },
    [activeNPC, state]
  );

  const handleDialogClose = useCallback(() => {
    setActiveNPC(null);
    setDialogStep(null);
  }, []);

  const handlePickUp = useCallback(
    (itemData) => { controller.pickUpItem(itemData, pickUpItem); },
    [manager, pickUpItem]
  );

  return (
    <div className="edwin-game-container container-fluid py-3">
      <header className="row mb-3">
        <div className="col">
          <h1 className="h3 fw-bold">{state.title}</h1>
        </div>
      </header>

      <div className="row g-3">
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

          {helper.renderActionPanel(availableActions, handleAction)}
        </main>

        <aside className="col-md-4">
          <Inventory items={inventory} onDrop={drop} />
          <div className="mt-3">
            <EventLog entries={state.log} />
          </div>
        </aside>
      </div>

      {helper.renderNPCDialog(activeNPC, dialogStep, handleDialogChoose, handleDialogClose)}
    </div>
  );
}

GameContainer.propTypes = {
  manager: PropTypes.object.isRequired,
  actions: PropTypes.array,
};

export default GameContainer;
