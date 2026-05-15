import { Game, GameStateManager } from 'edwin';
import { tavern, townSquare } from './locations.js';

const game = new Game({
  id: 'basic_rpg',
  title: 'A Simple Adventure',
  description: 'A minimal Edwin RPG example.',
});

game.addLocation(tavern);
game.addLocation(townSquare);
game.setStartLocation('tavern');

const manager = new GameStateManager(game);

export { game, manager };
