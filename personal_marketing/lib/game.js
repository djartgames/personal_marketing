import { Game, GameStateManager } from 'edwin';
import { home } from './locations.js';

const game = new Game({
  id: 'personal_marketing',
  title: 'Personal Marketing',
  description: 'Follow Anastacia on her journey.',
});

game.addLocation(home);
game.setStartLocation('home');

const manager = new GameStateManager(game);

export { game, manager };
