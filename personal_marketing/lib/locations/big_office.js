import { Location } from 'edwin';
import bigOfficeImage from '../../assets/images/locations/big_office.png';

class BigOffice extends Location {
  constructor() {
    super({
      id: 'big_office',
      name: 'Big Office',
      description: 'A large corporate office building.',
      image: bigOfficeImage,
      paths: {
        downtown: { target: 'downtown', label: 'Downtown' },
      },
    });
  }
}

export { BigOffice };
