import { Location } from 'edwin';
import constructionSiteImage from '../../assets/images/locations/construction_site.png';

class ConstructionSite extends Location {
  constructor() {
    super({
      id: 'construction_site',
      name: 'Construction Site',
      description: 'A busy construction site on the outskirts of downtown.',
      image: constructionSiteImage,
      paths: {
        construction_company_office: { target: 'construction_company_office', label: 'Construction Company Office' },
      },
    });
  }
}

export { ConstructionSite };
