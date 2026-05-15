import { Item } from 'edwin';

const potion = new Item({
  id: 'health_potion',
  name: 'Health Potion',
  description: 'A small vial of red liquid.',
  isPickable: true,
  isUsable: true,
});

export { potion };
