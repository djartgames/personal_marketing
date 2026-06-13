import { describe, it, expect } from 'vitest';
import { livingRoom, bedroom, bathroom, townSquare, coffeeShop, grocery } from '../../lib/locations/index.js';

describe('livingRoom', () => {
  it('has correct id', () => {
    expect(livingRoom.id).toBe('living_room');
  });

  it('has correct name', () => {
    expect(livingRoom.name).toBe('Living Room');
  });

  it('has paths to bedroom, bathroom, and town square', () => {
    expect(Object.keys(livingRoom.paths)).toEqual(
      expect.arrayContaining(['bedroom', 'bathroom', 'town_square'])
    );
    expect(Object.keys(livingRoom.paths)).toHaveLength(3);
  });

  it('has no npcs', () => {
    expect(livingRoom.npcs).toHaveLength(0);
  });

  it('has no items', () => {
    expect(livingRoom.items).toHaveLength(0);
  });
});

describe('bedroom', () => {
  it('has correct id', () => {
    expect(bedroom.id).toBe('bedroom');
  });

  it('has correct name', () => {
    expect(bedroom.name).toBe('Bedroom');
  });

  it('has paths to living room and bathroom', () => {
    expect(Object.keys(bedroom.paths)).toEqual(
      expect.arrayContaining(['living_room', 'bathroom'])
    );
    expect(Object.keys(bedroom.paths)).toHaveLength(2);
  });
});

describe('bathroom', () => {
  it('has correct id', () => {
    expect(bathroom.id).toBe('bathroom');
  });

  it('has correct name', () => {
    expect(bathroom.name).toBe('Bathroom');
  });

  it('has paths to living room and bedroom', () => {
    expect(Object.keys(bathroom.paths)).toEqual(
      expect.arrayContaining(['living_room', 'bedroom'])
    );
    expect(Object.keys(bathroom.paths)).toHaveLength(2);
  });
});

describe('townSquare', () => {
  it('has correct id', () => {
    expect(townSquare.id).toBe('town_square');
  });

  it('has correct name', () => {
    expect(townSquare.name).toBe('Town Square');
  });

  it('has paths to living room, coffee shop, grocery, downtown, marketing company, and photographer', () => {
    expect(Object.keys(townSquare.paths)).toEqual(
      expect.arrayContaining(['living_room', 'coffee_shop', 'grocery', 'downtown', 'marketing_company', 'photographer'])
    );
    expect(Object.keys(townSquare.paths)).toHaveLength(6);
  });
});

describe('coffeeShop', () => {
  it('has correct id', () => {
    expect(coffeeShop.id).toBe('coffee_shop');
  });

  it('has correct name', () => {
    expect(coffeeShop.name).toBe('Coffee Shop');
  });

  it('has path to town square', () => {
    expect(Object.keys(coffeeShop.paths)).toEqual(['town_square']);
  });
});

describe('grocery', () => {
  it('has correct id', () => {
    expect(grocery.id).toBe('grocery');
  });

  it('has correct name', () => {
    expect(grocery.name).toBe('Grocery');
  });

  it('has path to town square', () => {
    expect(Object.keys(grocery.paths)).toEqual(['town_square']);
  });
});
