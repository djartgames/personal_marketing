import { Location } from 'edwin';
import barImage from '../../assets/images/locations/bar.png';

class Bar extends Location {
  constructor() {
    super({
      id: 'bar',
      name: 'Bar',
      description: 'A lively downtown bar.',
      image: barImage,
      paths: {
        downtown: { target: 'downtown', label: 'Downtown' },
      },
    });
  }
}

export { Bar };
