import { Location } from 'edwin';
import bathroomImage from '../../assets/images/locations/bathroom.png';

const bathroom = new Location({
  id: 'bathroom',
  name: 'Bathroom',
  description: 'A small but tidy bathroom.',
  image: bathroomImage,
  paths: {
    living_room: { target: 'living_room' },
    bedroom: { target: 'bedroom' },
  },
});

export { bathroom };
