import { Location } from 'edwin';
import photographerImage from '../../assets/images/locations/photographer.png';

class Photographer extends Location {
  constructor() {
    super({
      id: 'photographer',
      name: 'Photographer',
      description: "The town photographer's studio.",
      image: photographerImage,
      paths: {
        town_square: { target: 'town_square', label: 'Town Square' },
      },
    });
  }
}

export { Photographer };
