import { NPC } from 'edwin';
import { guardDialogue, merchantDialogue } from './interactions.js';
import { silverKey } from './items.js';

const guard = new NPC({
  id: 'vault_guard',
  name: 'Vault Guard',
  description: 'A stern warrior in polished armour.',
  dialogue: guardDialogue,
});

const merchant = new NPC({
  id: 'merchant',
  name: 'Elara the Merchant',
  description: 'A sharp-eyed woman surrounded by trinkets.',
  dialogue: merchantDialogue,
  inventory: [silverKey],
});

export { guard, merchant };
