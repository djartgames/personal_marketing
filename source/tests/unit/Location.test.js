import { describe, it, expect } from 'vitest';
import { Location } from '../../src/entities/Location.js';
import { Item } from '../../src/entities/Item.js';
import { NPC } from '../../src/entities/NPC.js';

describe('Location', () => {
  const makeLocation = (overrides = {}) =>
    new Location({ id: 'forest', name: 'Forest', ...overrides });

  it('throws if id is missing', () => {
    expect(() => new Location({ name: 'X' })).toThrow('Location requires an id.');
  });

  it('throws if name is missing', () => {
    expect(() => new Location({ id: 'x' })).toThrow('Location requires a name.');
  });

  it('addPath() / getExits()', () => {
    const loc = makeLocation();
    loc.addPath('north', 'town');
    expect(loc.getExits()).toContain('north');
    expect(loc.paths.north).toBe('town');
  });

  it('removePath() removes an exit', () => {
    const loc = makeLocation({ paths: { north: 'town' } });
    loc.removePath('north');
    expect(loc.getExits()).not.toContain('north');
  });

  it('addItem() / removeItem()', () => {
    const loc = makeLocation();
    const item = new Item({ id: 'key', name: 'Key' });
    loc.addItem(item);
    expect(loc.items).toHaveLength(1);
    const removed = loc.removeItem('key');
    expect(removed).toBe(item);
    expect(loc.items).toHaveLength(0);
  });

  it('removeItem() returns null when item not found', () => {
    const loc = makeLocation();
    expect(loc.removeItem('nope')).toBeNull();
  });

  it('addNPC() / removeNPC()', () => {
    const loc = makeLocation();
    const npc = new NPC({ id: 'guard', name: 'Guard' });
    loc.addNPC(npc);
    expect(loc.npcs).toHaveLength(1);
    const removed = loc.removeNPC('guard');
    expect(removed).toBe(npc);
    expect(loc.npcs).toHaveLength(0);
  });

  it('lock() / unlock()', () => {
    const loc = makeLocation();
    loc.lock();
    expect(loc.isLocked).toBe(true);
    loc.unlock();
    expect(loc.isLocked).toBe(false);
  });

  it('toJSON() returns a serializable object', () => {
    const loc = makeLocation({ description: 'Tall trees.' });
    const json = loc.toJSON();
    expect(json.id).toBe('forest');
    expect(json.description).toBe('Tall trees.');
  });
});
