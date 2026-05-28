import { Location } from 'edwin';
import shoppingMallImage from '../../assets/images/locations/shopping_mall.png';

class ShoppingMall extends Location {
  constructor() {
    super({
      id: 'shopping_mall',
      name: 'Shopping Mall',
      description: 'A large shopping mall with many stores.',
      image: shoppingMallImage,
      paths: {
        downtown: { target: 'downtown', label: 'Downtown' },
      },
    });
  }
}

export { ShoppingMall };
