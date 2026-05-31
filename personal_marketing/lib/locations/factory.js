import { Location } from 'edwin';
import factoryImage from '../../assets/images/locations/factory.png';

class Factory extends Location {
  constructor() {
    super({
      id: 'factory',
      name: 'Factory',
      description: 'The production floor of the marketing company.',
      image: factoryImage,
      paths: {
        marketing_company: { target: 'marketing_company', label: 'Marketing Company' },
      },
    });
  }
}

export { Factory };
