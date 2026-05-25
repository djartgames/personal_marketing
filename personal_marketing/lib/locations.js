import { Location } from 'edwin';
import homeImage from '../assets/images/locations/home.png';

const livingRoom = new Location({
  id: 'living_room',
  name: 'Living Room',
  description: 'The heart of Anastacia\'s home. It feels familiar and safe.',
  image: homeImage,
  paths: {},
});

export { livingRoom };
