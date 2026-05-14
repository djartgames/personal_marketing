/**
 * @file useLocation – React hook that provides current-location data
 * and navigation helpers.
 */

import { useMemo } from 'react';

/**
 * @param {import('../types/index.js').GameState} gameState - From useGame().state
 * @param {Function} moveTo - From useGame().moveTo
 * @returns {{
 *   location: object | null,
 *   exits: string[],
 *   navigate: (direction: string) => void,
 * }}
 */
export function useLocation(gameState, moveTo) {
  const location = gameState.currentLocation ?? null;

  const exits = useMemo(() => {
    if (!location) { return []; }
    return Object.keys(location.paths);
  }, [location]);

  const navigate = useMemo(
    () =>
      (direction) => {
        if (!location) { return; }
        const targetId = location.paths[direction];
        if (targetId) { moveTo(targetId); }
      },
    [location, moveTo]
  );

  return { location, exits, navigate };
}

export default useLocation;
