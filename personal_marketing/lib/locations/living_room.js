import { Location } from 'edwin';
import homeImage from '../../assets/images/locations/home.png';

class LivingRoom extends Location {
  constructor() {
    super({
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
  }
}

export { LivingRoom };
