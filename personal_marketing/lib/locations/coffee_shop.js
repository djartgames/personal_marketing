import { Location } from 'edwin';
import coffeeShopImage from '../../assets/images/locations/coffee_shop.png';

const coffeeShop = new Location({
  id: 'coffee_shop',
  name: 'Coffee Shop',
  description: 'A cosy coffee shop filled with the aroma of fresh brew.',
  image: coffeeShopImage,
  paths: {
    town_square: { target: 'town_square' },
  },
});

export { coffeeShop };
