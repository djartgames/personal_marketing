import { Location } from 'edwin';
import { innkeeper } from './npcs.js';
import { potion } from './items.js';
import tavernImg from '../assets/images/locations/tavern.png';
import townSquareImg from '../assets/images/locations/town_square.png';

const tavern = new Location({
  id: 'tavern',
  name: 'The Rusty Flagon',
  description:
    'A dimly lit tavern smelling of ale and sawdust. A fire crackles in the hearth. ' +
    'Gareth stands behind the bar, polishing a tankard.',
  image: tavernImg,
  paths: { north: { target: 'town_square', label: '↑ North' } },
  npcs: [innkeeper],
});

const townSquare = new Location({
  id: 'town_square',
  name: 'Town Square',
  description:
    'The heart of the village. A weathered stone fountain stands in the centre. ' +
    'Cobblestone streets fan out in every direction.',
  image: townSquareImg,
  paths: { south: { target: 'tavern', label: '↓ South' } },
  items: [potion],
});

export { tavern, townSquare };
