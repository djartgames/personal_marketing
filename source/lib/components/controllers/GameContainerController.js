class GameContainerController {
  constructor(manager, actions) {
    this.manager = manager;
    this.actions = actions;
  }

  getAvailableActions(state) {
    return this.actions
      .filter((a) => a.isAvailable(state))
      .map((a) => a.toJSON());
  }

  executeAction(actionId, state) {
    const action = this.actions.find((a) => a.id === actionId);
    if (!action) {return;}
    try {
      action.execute(state);
    } catch (err) {
      console.warn('Action error:', err.message);
    }
  }

  startDialogue(npcData) {
    const liveNPC = this.manager.game.currentLocation?.npcs.find((n) => n.id === npcData.id);
    if (!liveNPC) {return null;}
    return { npc: liveNPC, step: liveNPC.startDialogue() };
  }

  advanceDialogue(activeNPC, optionIndex, state) {
    return activeNPC.respondToChoice(optionIndex, state);
  }

  pickUpItem(itemData, pickUpCallback) {
    const liveItem = this.manager.game.currentLocation?.items.find((i) => i.id === itemData.id);
    if (!liveItem) {return;}
    this.manager.game.currentLocation.removeItem(liveItem.id);
    pickUpCallback(liveItem);
  }
}

export { GameContainerController };
