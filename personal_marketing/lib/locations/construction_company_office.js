import { Location } from 'edwin';
import constructionCompanyOfficeImage from '../../assets/images/locations/construction_company_office.png';

class ConstructionCompanyOffice extends Location {
  constructor() {
    super({
      id: 'construction_company_office',
      name: 'Construction Company Office',
      description: 'The administrative office of a local construction company.',
      image: constructionCompanyOfficeImage,
      paths: {
        downtown: { target: 'downtown', label: 'Downtown' },
        construction_site: { target: 'construction_site', label: 'Construction Site' },
      },
    });
  }
}

export { ConstructionCompanyOffice };
