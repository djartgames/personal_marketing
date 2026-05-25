import { Game, GameStateManager } from 'edwin';
import { livingRoom } from './locations.js';

const game = new Game({
  id: 'personal_marketing',
  title: 'Personal Marketing',
  description: 'Follow Anastacia on her journey.',
});

game.addLocation(livingRoom);
game.setStartLocation('living_room');

const manager = new GameStateManager(game);

export { game, manager };
