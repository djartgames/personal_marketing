import { Location } from 'edwin';
import gymImage from '../../assets/images/locations/gym.png';

class Gym extends Location {
  constructor() {
    super({
      id: 'gym',
      name: 'Gym',
      description: 'A downtown gym to keep fit.',
      image: gymImage,
      paths: {
        downtown: { target: 'downtown', label: 'Downtown' },
      },
    });
  }
}

export { Gym };
