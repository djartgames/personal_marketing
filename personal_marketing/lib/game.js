import { Game, GameStateManager } from 'edwin';
import {
  bar,
  bathroom,
  bedroom,
  bigOffice,
  coffeeShop,
  constructionCompanyOffice,
  constructionSite,
  downtown,
  factory,
  grocery,
  gym,
  livingRoom,
  marketingCompany,
  marketingCompanyOffice,
  photographer,
  shoppingMall,
  townSquare,
} from './locations/index.js';

const game = new Game({
  id: 'personal_marketing',
  title: 'Personal Marketing',
  description: 'Follow Anastacia on her journey.',
});

game.addLocation(bar);
game.addLocation(bathroom);
game.addLocation(bedroom);
game.addLocation(bigOffice);
game.addLocation(coffeeShop);
game.addLocation(constructionCompanyOffice);
game.addLocation(constructionSite);
game.addLocation(downtown);
game.addLocation(factory);
game.addLocation(grocery);
game.addLocation(gym);
game.addLocation(livingRoom);
game.addLocation(marketingCompany);
game.addLocation(marketingCompanyOffice);
game.addLocation(photographer);
game.addLocation(shoppingMall);
game.addLocation(townSquare);
game.setStartLocation('living_room');

const manager = new GameStateManager(game);

export { game, manager };
