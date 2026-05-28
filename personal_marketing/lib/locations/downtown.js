import { Location } from 'edwin';
import downtownImage from '../../assets/images/locations/downtown.png';

class Downtown extends Location {
  constructor() {
    super({
      id: 'downtown',
      name: 'Downtown',
      description: 'The bustling commercial heart of the city.',
      image: downtownImage,
      paths: {
        town_square: { target: 'town_square', label: 'Town Square' },
        big_office: { target: 'big_office', label: 'Big Office' },
        construction_company_office: { target: 'construction_company_office', label: 'Construction Company' },
        bar: { target: 'bar', label: 'Bar' },
        gym: { target: 'gym', label: 'Gym' },
        shopping_mall: { target: 'shopping_mall', label: 'Shopping Mall' },
      },
    });
  }
}

export { Downtown };
