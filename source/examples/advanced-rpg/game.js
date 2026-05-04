/**
 * @fileoverview Advanced RPG example – world setup.
 *
 * Demonstrates: conditional actions, branching dialogue, item use callbacks,
 * game flags, and multi-location exploration.
 */

import {
  Game,
  Location,
  NPC,
  Item,
  Action,
  Interaction,
  GameStateManager,
} from '../../src/index.js';

// ── Items ────────────────────────────────────────────────────────────────────

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
  // In a full game you'd adjust HP; here we just set a flag
  gameState.flags.usedHerb = true;
};

// ── Dialogues ─────────────────────────────────────────────────────────────────

const guardDialogue = new Interaction({
  id: 'guard_dialogue',
  steps: [
    {
      id: 'challenge',
      text: 'Halt! The vault is sealed. Only those bearing the Moon Key may pass.',
      options: [
        { label: 'I have the Silver Key!', next: 'pass' },
        { label: 'I was just exploring.', next: 'dismiss' },
      ],
    },
    {
      id: 'pass',
      text: 'Very well. The vault awaits you.',
      options: [{ label: 'Thank you.', next: null }],
    },
    {
      id: 'dismiss',
      text: "Move along then. Don't cause trouble.",
      options: [{ label: 'Of course.', next: null }],
    },
  ],
});

const merchantDialogue = new Interaction({
  id: 'merchant_dialogue',
  steps: [
    {
      id: 'welcome',
      text: 'Greetings! I deal in rare artefacts. Looking for something special?',
      options: [
        { label: 'Tell me about your wares.', next: 'wares' },
        { label: "I'm just passing through.", next: 'farewell' },
      ],
    },
    {
      id: 'wares',
      text: 'I have the finest Silver Key – opens the vault beneath the citadel.',
      options: [
        {
          label: "I'll take the key.",
          next: 'sold',
          action: (gameState) => {
            // Transfer item flag for demo purposes
            gameState.flags = gameState.flags ?? {};
            gameState.flags.boughtKey = true;
          },
        },
        { label: 'Too expensive.', next: 'farewell' },
      ],
    },
    {
      id: 'sold',
      text: 'A wise purchase. May it serve you well.',
      options: [{ label: 'Farewell.', next: null }],
    },
    {
      id: 'farewell',
      text: 'Safe travels!',
      options: [{ label: 'Bye.', next: null }],
    },
  ],
});

// ── NPCs ─────────────────────────────────────────────────────────────────────

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

// ── Locations ─────────────────────────────────────────────────────────────────

const village = new Location({
  id: 'village',
  name: 'Thornwick Village',
  description:
    'A quiet hamlet nestled between rolling hills. Smoke rises from chimneys, ' +
    'and merchants hawk their goods in the narrow lane.',
  paths: { north: 'citadel_gate', east: 'forest_edge' },
  npcs: [merchant],
});

const forestEdge = new Location({
  id: 'forest_edge',
  name: 'Forest Edge',
  description:
    'Tall oaks press close on either side. Shafts of morning light pierce the canopy. ' +
    'A healing herb grows at the base of an old stump.',
  paths: { west: 'village', deeper: 'dark_forest' },
  items: [healingHerb, rustySword],
});

const darkForest = new Location({
  id: 'dark_forest',
  name: 'Dark Forest',
  description:
    'The trees close in and the light dies. Strange sounds echo in the distance.',
  paths: { back: 'forest_edge' },
});

const citadelGate = new Location({
  id: 'citadel_gate',
  name: 'Citadel Gate',
  description:
    'A massive iron gate bars entry to the ancient citadel. A guard stands watch, ' +
    'hand resting on the pommel of his sword.',
  paths: { south: 'village', inside: 'vault' },
  npcs: [guard],
});

citadelGate.isLocked = false; // gate itself is passable; vault gate is not

const vault = new Location({
  id: 'vault',
  name: 'The Moon Vault',
  description:
    'A circular chamber lit by silver torches. Ancient runes cover the walls. ' +
    'A pedestal at the centre holds a glowing artefact.',
  paths: { out: 'citadel_gate' },
});

// ── Actions ──────────────────────────────────────────────────────────────────

const unlockVaultAction = new Action({
  id: 'unlock_vault',
  label: 'Unlock the vault gate',
  description: 'Use the Silver Key to open the vault.',
  condition: (state) =>
    state.currentLocationId === 'citadel_gate' &&
    state.playerInventory.some((i) => i.id === 'silver_key'),
  execute: (state) => {
    // In a live game you'd call game.locations.get('vault').unlock() etc.
    state.flags.vaultUnlocked = true;
  },
});

// ── Assemble the game ────────────────────────────────────────────────────────

const game = new Game({
  id: 'advanced_rpg',
  title: 'The Moon Vault',
  description: 'An advanced Edwin RPG example.',
  version: '1.0.0',
});

[village, forestEdge, darkForest, citadelGate, vault].forEach((loc) =>
  game.addLocation(loc)
);
game.setStartLocation('village');

const manager = new GameStateManager(game);

export { game, manager, unlockVaultAction };
