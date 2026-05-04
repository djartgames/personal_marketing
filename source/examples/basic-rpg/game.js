/**
 * @fileoverview Basic RPG example – entry point.
 *
 * Demonstrates minimal Edwin usage: two locations, one item, one NPC with
 * a simple two-step dialogue.
 */

import { Game, Location, NPC, Item, Interaction, GameStateManager } from '../../src/index.js';

// ── Build the world ──────────────────────────────────────────────────────────

const potion = new Item({
  id: 'health_potion',
  name: 'Health Potion',
  description: 'A small vial of red liquid.',
  isPickable: true,
  isUsable: true,
});

const innkeeperDialogue = new Interaction({
  id: 'innkeeper_greeting',
  steps: [
    {
      id: 'intro',
      text: 'Welcome to the Rusty Flagon! What can I do for you?',
      options: [
        { label: 'Just looking around.', next: 'farewell' },
        { label: 'I need a room.', next: 'room' },
        { label: 'Goodbye.', next: null },
      ],
    },
    {
      id: 'room',
      text: "That'll be 5 gold coins. We've a cosy spot by the fire.",
      options: [
        { label: 'Sounds good, I'll take it.', next: 'farewell' },
        { label: 'Maybe later.', next: 'intro' },
      ],
    },
    {
      id: 'farewell',
      text: 'Safe travels, friend!',
      options: [{ label: 'Goodbye.', next: null }],
    },
  ],
});

const innkeeper = new NPC({
  id: 'innkeeper',
  name: 'Gareth the Innkeeper',
  description: 'A stout, friendly man with a ruddy face.',
  dialogue: innkeeperDialogue,
});

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

// ── Assemble the game ────────────────────────────────────────────────────────

const game = new Game({
  id: 'basic_rpg',
  title: 'A Simple Adventure',
  description: 'A minimal Edwin RPG example.',
});

game.addLocation(tavern);
game.addLocation(townSquare);
game.setStartLocation('tavern');

// ── Export the manager for React ─────────────────────────────────────────────

const manager = new GameStateManager(game);

export { game, manager };
