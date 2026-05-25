import { Location } from 'edwin';
import bedroomImage from '../../assets/images/locations/bedroom.png';

class Bedroom extends Location {
  constructor() {
    super({
      id: 'bedroom',
      name: 'Bedroom',
      description: 'Anastacia\'s private bedroom. A place for rest.',
      image: bedroomImage,
      paths: {
        living_room: { target: 'living_room' },
        bathroom: { target: 'bathroom' },
      },
    });
  }
}

export { Bedroom };
