import { describe, it, expect } from 'vitest';
import { Item } from '../../lib/entities/Item.js';

describe('Item', () => {
  const makeItem = (overrides = {}) =>
    new Item({ id: 'sword', name: 'Sword', ...overrides });

  it('creates an item with default state "world"', () => {
    const item = makeItem();
    expect(item.state).toBe('world');
  });

  it('throws if id is missing', () => {
    expect(() => new Item({ name: 'X' })).toThrow('Item requires an id.');
  });

  it('throws if name is missing', () => {
    expect(() => new Item({ id: 'x' })).toThrow('Item requires a name.');
  });

  it('setState() changes the state', () => {
    const item = makeItem();
    item.setState('inventory');
    expect(item.state).toBe('inventory');
  });

  it('setState() throws on invalid state', () => {
    const item = makeItem();
    expect(() => item.setState('flying')).toThrow('Invalid item state');
  });

  it('state setter changes the state', () => {
    const item = makeItem();
    item.state = 'equipped';
    expect(item.state).toBe('equipped');
  });

  it('use() returns false when isUsable is false', () => {
    const item = makeItem({ isUsable: false });
    expect(item.use()).toBe(false);
  });

  it('use() calls onUse and returns true when isUsable is true', () => {
    const item = makeItem({ isUsable: true });
    const ctx = {};
    const calls = [];
    item.onUse = (c) => calls.push(c);
    expect(item.use(ctx)).toBe(true);
    expect(calls).toEqual([ctx]);
  });

  it('toJSON() returns a plain object', () => {
    const item = makeItem({ description: 'Sharp blade', properties: { dmg: 5 } });
    const json = item.toJSON();
    expect(json.id).toBe('sword');
    expect(json.properties.dmg).toBe(5);
    expect(json.state).toBe('world');
  });

  it('properties getter returns a copy', () => {
    const item = makeItem({ properties: { dmg: 5 } });
    const properties = item.properties;

    properties.dmg = 99;

    expect(item.properties.dmg).toBe(5);
  });

  it('setters update public fields', () => {
    const item = makeItem();
    item.id = 'axe';
    item.name = 'Axe';
    item.description = 'Heavy axe';
    item.isPickable = false;
    item.isUsable = true;
    item.properties = { dmg: 12 };

    expect(item.id).toBe('axe');
    expect(item.name).toBe('Axe');
    expect(item.description).toBe('Heavy axe');
    expect(item.isPickable).toBe(false);
    expect(item.isUsable).toBe(true);
    expect(item.properties).toEqual({ dmg: 12 });
  });
});
