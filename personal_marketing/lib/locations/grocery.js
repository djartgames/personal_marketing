import { Location } from 'edwin';
import groceryImage from '../../assets/images/locations/grocery.png';

const grocery = new Location({
  id: 'grocery',
  name: 'Grocery',
  description: 'A well-stocked grocery store.',
  image: groceryImage,
  paths: {
    town_square: { target: 'town_square' },
  },
});

export { grocery };
