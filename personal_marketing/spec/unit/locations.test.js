import { describe, it, expect } from 'vitest';
import { home } from '../../lib/locations.js';

describe('home', () => {
  it('has correct id', () => {
    expect(home.id).toBe('home');
  });

  it('has correct name', () => {
    expect(home.name).toBe('Home');
  });

  it('has no paths', () => {
    expect(Object.keys(home.paths)).toHaveLength(0);
  });

  it('has no npcs', () => {
    expect(home.npcs).toHaveLength(0);
  });

  it('has no items', () => {
    expect(home.items).toHaveLength(0);
  });
});
