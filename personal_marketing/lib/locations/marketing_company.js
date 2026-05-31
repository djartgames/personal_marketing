import { Location } from 'edwin';
import marketingCompanyImage from '../../assets/images/locations/marketing_company.png';

class MarketingCompany extends Location {
  constructor() {
    super({
      id: 'marketing_company',
      name: 'Marketing Company',
      description: "The marketing company Anastacia inherited from her father.",
      image: marketingCompanyImage,
      paths: {
        town_square: { target: 'town_square', label: 'Town Square' },
        marketing_company_office: { target: 'marketing_company_office', label: 'Office' },
        factory: { target: 'factory', label: 'Factory' },
      },
    });
  }
}

export { MarketingCompany };
