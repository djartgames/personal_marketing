import { Location } from 'edwin';
import marketingCompanyOfficeImage from '../../assets/images/locations/marketing_company_office.png';

class MarketingCompanyOffice extends Location {
  constructor() {
    super({
      id: 'marketing_company_office',
      name: 'Office',
      description: 'The main office of the marketing company.',
      image: marketingCompanyOfficeImage,
      paths: {
        marketing_company: { target: 'marketing_company', label: 'Marketing Company' },
      },
    });
  }
}

export { MarketingCompanyOffice };
