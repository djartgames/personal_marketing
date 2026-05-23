import { Location } from 'edwin';
import homeImage from '../assets/images/locations/home.png';

const home = new Location({
  id: 'home',
  name: 'Home',
  description: 'The place where Anastacia lives and works. It feels familiar and safe.',
  image: homeImage,
  paths: {},
});

export { home };
