import { describe, it, expect } from 'vitest';
import { Interaction } from '../../lib/entities/Interaction.js';
import { Item } from '../../lib/entities/Item.js';
import { NPC } from '../../lib/entities/NPC.js';

const makeInteraction = () =>
  new Interaction({
    id: 'test_talk',
    steps: [
      {
        id: 'greet',
        text: 'Hello!',
        options: [{ label: 'Bye', next: null }],
      },
    ],
  });

describe('NPC', () => {
  const makeNPC = (overrides = {}) =>
    new NPC({ id: 'guard', name: 'Guard', ...overrides });

  it('throws if id is missing', () => {
    expect(() => new NPC({ name: 'X' })).toThrow('NPC requires an id.');
  });

  it('throws if name is missing', () => {
    expect(() => new NPC({ id: 'x' })).toThrow('NPC requires a name.');
  });

  it('creates an NPC with defaults', () => {
    const npc = makeNPC();
    expect(npc.isHostile).toBe(false);
    expect(npc.inventory).toHaveLength(0);
    expect(npc.dialogue).toBeNull();
  });

  it('startDialogue() returns null when no dialogue', () => {
    const npc = makeNPC();
    expect(npc.startDialogue()).toBeNull();
  });

  it('startDialogue() returns first step when dialogue present', () => {
    const npc = makeNPC({ dialogue: makeInteraction() });
    const step = npc.startDialogue();
    expect(step.id).toBe('greet');
  });

  it('respondToChoice() returns null when no dialogue', () => {
    const npc = makeNPC();
    expect(npc.respondToChoice(0)).toBeNull();
  });

  it('respondToChoice() delegates to dialogue', () => {
    const npc = makeNPC({ dialogue: makeInteraction() });
    npc.startDialogue();
    const result = npc.respondToChoice(0);
    expect(result).toBeNull();
    expect(npc.dialogue.isComplete).toBe(true);
  });

  it('addItem() adds to inventory', () => {
    const npc = makeNPC();
    const item = new Item({ id: 'coin', name: 'Coin' });
    npc.addItem(item);
    expect(npc.inventory).toHaveLength(1);
    expect(npc.inventory[0]).toBe(item);
  });

  it('removeItem() returns the item when found', () => {
    const npc = makeNPC();
    const item = new Item({ id: 'coin', name: 'Coin' });
    npc.addItem(item);
    const removed = npc.removeItem('coin');
    expect(removed).toBe(item);
    expect(npc.inventory).toHaveLength(0);
  });

  it('removeItem() returns null when item not found', () => {
    const npc = makeNPC();
    expect(npc.removeItem('ghost')).toBeNull();
  });

  it('toJSON() serializes correctly', () => {
    const npc = makeNPC({ description: 'A stern guard.', properties: { rank: 'captain' } });
    const json = npc.toJSON();
    expect(json.id).toBe('guard');
    expect(json.name).toBe('Guard');
    expect(json.description).toBe('A stern guard.');
    expect(json.isHostile).toBe(false);
    expect(json.properties.rank).toBe('captain');
    expect(json.inventory).toEqual([]);
    expect(json.dialogue).toBeNull();
  });

  it('toJSON() includes dialogue when present', () => {
    const npc = makeNPC({ dialogue: makeInteraction() });
    const json = npc.toJSON();
    expect(json.dialogue).not.toBeNull();
    expect(json.dialogue.id).toBe('test_talk');
  });
});
