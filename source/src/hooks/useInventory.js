/**
 * @fileoverview useInventory – React hook that exposes the player's inventory
 * and item interaction helpers.
 */

import { useMemo } from 'react';

/**
 * @param {import('../types/index.js').GameState} gameState - From useGame().state
 * @param {Function} dropItem - From useGame().dropItem
 * @returns {{
 *   inventory: Array<import('../types/index.js').ItemData>,
 *   hasItem: (itemId: string) => boolean,
 *   drop: (itemId: string) => void,
 * }}
 */
export function useInventory(gameState, dropItem) {
  const inventory = gameState.playerInventory;

  const hasItem = useMemo(
    () => (itemId) => inventory.some((i) => i.id === itemId),
    [inventory]
  );

  const drop = useMemo(() => (itemId) => dropItem(itemId), [dropItem]);

  return { inventory, hasItem, drop };
}

export default useInventory;
