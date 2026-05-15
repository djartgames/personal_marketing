/**
 * @fileoverview Advanced RPG – React application root.
 */

import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GameContainer } from 'edwin';
import { game, manager, unlockVaultAction } from './lib/game.js';

function App() {
  useEffect(() => {
    game.start(true);
  }, []);

  return <GameContainer manager={manager} actions={[unlockVaultAction]} />;
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
