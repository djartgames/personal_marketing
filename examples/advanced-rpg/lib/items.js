import { Item } from 'edwin';

const rustySword = new Item({
  id: 'rusty_sword',
  name: 'Rusty Sword',
  description: 'A blade worn by time, but still serviceable.',
  isPickable: true,
  isUsable: false,
  properties: { damage: 8 },
});

const silverKey = new Item({
  id: 'silver_key',
  name: 'Silver Key',
  description: 'A small key engraved with a crescent moon.',
  isPickable: true,
  isUsable: true,
});

const healingHerb = new Item({
  id: 'healing_herb',
  name: 'Healing Herb',
  description: 'Smells of pine and mint. Restores a small amount of vitality.',
  isPickable: true,
  isUsable: true,
});

healingHerb.onUse = (gameState) => {
  gameState.flags = gameState.flags ?? {};
  gameState.flags.usedHerb = true;
};

export { rustySword, silverKey, healingHerb };
