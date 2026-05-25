import { Location } from 'edwin';
import bathroomImage from '../assets/images/locations/bathroom.png';
import bedroomImage from '../assets/images/locations/bedroom.png';
import coffeeShopImage from '../assets/images/locations/coffee_shop.png';
import groceryImage from '../assets/images/locations/grocery.png';
import homeImage from '../assets/images/locations/home.png';
import townSquareImage from '../assets/images/locations/town_square.png';

const livingRoom = new Location({
  id: 'living_room',
  name: 'Living Room',
  description: 'The heart of Anastacia\'s home. It feels familiar and safe.',
  image: homeImage,
  paths: {
    bedroom: { target: 'bedroom' },
    bathroom: { target: 'bathroom' },
    town_square: { target: 'town_square', label: 'Outside' },
  },
});

const bedroom = new Location({
  id: 'bedroom',
  name: 'Bedroom',
  description: 'Anastacia\'s private bedroom. A place for rest.',
  image: bedroomImage,
  paths: {
    living_room: { target: 'living_room' },
    bathroom: { target: 'bathroom' },
  },
});

const bathroom = new Location({
  id: 'bathroom',
  name: 'Bathroom',
  description: 'A small but tidy bathroom.',
  image: bathroomImage,
  paths: {
    living_room: { target: 'living_room' },
    bedroom: { target: 'bedroom' },
  },
});

const townSquare = new Location({
  id: 'town_square',
  name: 'Town Square',
  description: 'The bustling heart of the town.',
  image: townSquareImage,
  paths: {
    living_room: { target: 'living_room', label: 'Home' },
    coffee_shop: { target: 'coffee_shop' },
    grocery: { target: 'grocery' },
  },
});

const coffeeShop = new Location({
  id: 'coffee_shop',
  name: 'Coffee Shop',
  description: 'A cosy coffee shop filled with the aroma of fresh brew.',
  image: coffeeShopImage,
  paths: {
    town_square: { target: 'town_square' },
  },
});

const grocery = new Location({
  id: 'grocery',
  name: 'Grocery',
  description: 'A well-stocked grocery store.',
  image: groceryImage,
  paths: {
    town_square: { target: 'town_square' },
  },
});

export { livingRoom, bedroom, bathroom, townSquare, coffeeShop, grocery };
