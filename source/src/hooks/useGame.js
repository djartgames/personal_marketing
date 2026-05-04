/**
 * @fileoverview useGame – primary React hook for accessing and interacting
 * with the Edwin game engine.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameStateManager } from '../core/GameStateManager.js';

/**
 * Provides game state and action dispatchers to a React component tree.
 *
 * @param {import('../core/GameStateManager.js').GameStateManager} manager
 * @returns {{
 *   state: import('../types/index.js').GameState,
 *   moveTo: (locationId: string) => void,
 *   pickUpItem: (item: object) => void,
 *   dropItem: (itemId: string) => void,
 *   setFlag: (key: string, value: *) => void,
 *   save: () => void,
 *   load: () => void,
 * }}
 */
export function useGame(manager) {
  const [state, setState] = useState(() => manager.getSnapshot());

  useEffect(() => {
    const unsubscribe = manager.subscribe(setState);
    return unsubscribe;
  }, [manager]);

  const moveTo = useCallback(
    (locationId) => {
      try {
        manager.game.moveTo(locationId);
      } catch (err) {
        console.warn('moveTo error:', err.message);
      }
    },
    [manager]
  );

  const pickUpItem = useCallback(
    (item) => {
      manager.game.pickUpItem(item);
    },
    [manager]
  );

  const dropItem = useCallback(
    (itemId) => {
      manager.game.dropItem(itemId);
    },
    [manager]
  );

  const setFlag = useCallback(
    (key, value) => {
      manager.game.setFlag(key, value);
    },
    [manager]
  );

  const save = useCallback(() => manager.game.save(), [manager]);
  const load = useCallback(() => manager.game.load(), [manager]);

  return useMemo(
    () => ({ state, moveTo, pickUpItem, dropItem, setFlag, save, load }),
    [state, moveTo, pickUpItem, dropItem, setFlag, save, load]
  );
}

export default useGame;
