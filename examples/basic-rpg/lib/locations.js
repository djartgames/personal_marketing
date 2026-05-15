import { Location } from 'edwin';
import { innkeeper } from './npcs.js';
import { potion } from './items.js';

const tavern = new Location({
  id: 'tavern',
  name: 'The Rusty Flagon',
  description:
    'A dimly lit tavern smelling of ale and sawdust. A fire crackles in the hearth. ' +
    'Gareth stands behind the bar, polishing a tankard.',
  paths: { north: 'town_square' },
  npcs: [innkeeper],
});

const townSquare = new Location({
  id: 'town_square',
  name: 'Town Square',
  description:
    'The heart of the village. A weathered stone fountain stands in the centre. ' +
    'Cobblestone streets fan out in every direction.',
  paths: { south: 'tavern' },
  items: [potion],
});

export { tavern, townSquare };
