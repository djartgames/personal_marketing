/**
 * @fileoverview Basic RPG – React application root.
 */

import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GameContainer } from '../../src/index.js';
import { game, manager } from './game.js';

function App() {
  useEffect(() => {
    game.start(true); // attempt to load a previous save
  }, []);

  return <GameContainer manager={manager} />;
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
