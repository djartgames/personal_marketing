import { Game, GameStateManager } from 'edwin';
import { livingRoom, bedroom, bathroom, townSquare, coffeeShop, grocery } from './locations.js';

const game = new Game({
  id: 'personal_marketing',
  title: 'Personal Marketing',
  description: 'Follow Anastacia on her journey.',
});

game.addLocation(livingRoom);
game.addLocation(bedroom);
game.addLocation(bathroom);
game.addLocation(townSquare);
game.addLocation(coffeeShop);
game.addLocation(grocery);
game.setStartLocation('living_room');

const manager = new GameStateManager(game);

export { game, manager };
