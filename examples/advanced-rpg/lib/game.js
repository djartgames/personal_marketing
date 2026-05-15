import { Game, GameStateManager } from 'edwin';
import { village, forestEdge, darkForest, citadelGate, vault } from './locations.js';
import { unlockVaultAction } from './actions.js';

const game = new Game({
  id: 'advanced_rpg',
  title: 'The Moon Vault',
  description: 'An advanced Edwin RPG example.',
  version: '1.0.0',
});

[village, forestEdge, darkForest, citadelGate, vault].forEach((loc) =>
  game.addLocation(loc)
);
game.setStartLocation('village');

const manager = new GameStateManager(game);

export { game, manager, unlockVaultAction };
