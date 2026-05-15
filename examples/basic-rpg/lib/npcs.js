import { NPC } from 'edwin';
import { innkeeperDialogue } from './interactions.js';

const innkeeper = new NPC({
  id: 'innkeeper',
  name: 'Gareth the Innkeeper',
  description: 'A stout, friendly man with a ruddy face.',
  dialogue: innkeeperDialogue,
});

export { innkeeper };
