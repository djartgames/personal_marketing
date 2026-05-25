import { Location } from 'edwin';
import bathroomImage from '../../assets/images/locations/bathroom.png';

class Bathroom extends Location {
  constructor() {
    super({
      id: 'bathroom',
      name: 'Bathroom',
      description: 'A small but tidy bathroom.',
      image: bathroomImage,
      paths: {
        living_room: { target: 'living_room' },
        bedroom: { target: 'bedroom' },
      },
    });
  }
}

export { Bathroom };
