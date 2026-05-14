import { describe, it, expect, vi } from 'vitest';
import { GameContainerController } from '../../../lib/components/controllers/GameContainerController.js';

function buildAction(overrides = {}) {
  return {
    id: 'act1',
    isAvailable: () => true,
    toJSON: () => ({ id: 'act1', label: 'Test Action' }),
    execute: vi.fn(),
    ...overrides,
  };
}

function buildManager(overrides = {}) {
  return {
    game: {
      currentLocation: {
        npcs: [],
        items: [],
        removeItem: vi.fn(),
        ...overrides.currentLocation,
      },
    },
  };
}

describe('GameContainerController', () => {
  describe('getAvailableActions', () => {
    it('returns serialized actions that are available', () => {
      const action = buildAction({ isAvailable: () => true });
      const controller = new GameContainerController(buildManager(), [action]);
      const result = controller.getAvailableActions({});
      expect(result).toEqual([{ id: 'act1', label: 'Test Action' }]);
    });

    it('excludes actions that are not available', () => {
      const action = buildAction({ isAvailable: () => false });
      const controller = new GameContainerController(buildManager(), [action]);
      expect(controller.getAvailableActions({})).toEqual([]);
    });
  });

  describe('executeAction', () => {
    it('calls execute on the matching action', () => {
      const action = buildAction();
      const state = {};
      const controller = new GameContainerController(buildManager(), [action]);
      controller.executeAction('act1', state);
      expect(action.execute).toHaveBeenCalledWith(state);
    });

    it('does nothing when actionId does not match', () => {
      const action = buildAction();
      const controller = new GameContainerController(buildManager(), [action]);
      expect(() => controller.executeAction('unknown', {})).not.toThrow();
    });

    it('logs a warning when execute throws', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const action = buildAction({ execute: () => { throw new Error('boom'); } });
      const controller = new GameContainerController(buildManager(), [action]);
      controller.executeAction('act1', {});
      expect(warn).toHaveBeenCalled();
      warn.mockRestore();
    });
  });

  describe('startDialogue', () => {
    it('returns npc and step when NPC is found', () => {
      const npc = { id: 'guard', startDialogue: () => ({ id: 's1', text: 'Halt!' }) };
      const manager = buildManager({ currentLocation: { npcs: [npc], items: [] } });
      const controller = new GameContainerController(manager, []);
      const result = controller.startDialogue({ id: 'guard' });
      expect(result.npc).toBe(npc);
      expect(result.step.text).toBe('Halt!');
    });

    it('returns null when NPC is not found', () => {
      const manager = buildManager();
      const controller = new GameContainerController(manager, []);
      expect(controller.startDialogue({ id: 'ghost' })).toBeNull();
    });
  });

  describe('advanceDialogue', () => {
    it('calls respondToChoice on the active NPC and returns the result', () => {
      const nextStep = { id: 's2', text: 'Move along.' };
      const activeNPC = { respondToChoice: vi.fn(() => nextStep) };
      const state = {};
      const controller = new GameContainerController(buildManager(), []);
      const result = controller.advanceDialogue(activeNPC, 0, state);
      expect(activeNPC.respondToChoice).toHaveBeenCalledWith(0, state);
      expect(result).toBe(nextStep);
    });
  });

  describe('pickUpItem', () => {
    it('removes the item from the location and calls the callback', () => {
      const removeItem = vi.fn();
      const item = { id: 'potion' };
      const manager = buildManager({
        currentLocation: { items: [item], npcs: [], removeItem },
      });
      const pickUpCallback = vi.fn();
      const controller = new GameContainerController(manager, []);
      controller.pickUpItem({ id: 'potion' }, pickUpCallback);
      expect(removeItem).toHaveBeenCalledWith('potion');
      expect(pickUpCallback).toHaveBeenCalledWith(item);
    });

    it('does nothing when item is not found', () => {
      const manager = buildManager();
      const pickUpCallback = vi.fn();
      const controller = new GameContainerController(manager, []);
      controller.pickUpItem({ id: 'ghost-item' }, pickUpCallback);
      expect(pickUpCallback).not.toHaveBeenCalled();
    });
  });
});
