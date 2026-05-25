import { Location } from 'edwin';
import townSquareImage from '../../assets/images/locations/town_square.png';

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

export { townSquare };
