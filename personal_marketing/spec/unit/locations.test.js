import { describe, it, expect } from 'vitest';
import { livingRoom } from '../../lib/locations.js';

describe('livingRoom', () => {
  it('has correct id', () => {
    expect(livingRoom.id).toBe('living_room');
  });

  it('has correct name', () => {
    expect(livingRoom.name).toBe('Living Room');
  });

  it('has no paths', () => {
    expect(Object.keys(livingRoom.paths)).toHaveLength(0);
  });

  it('has no npcs', () => {
    expect(livingRoom.npcs).toHaveLength(0);
  });

  it('has no items', () => {
    expect(livingRoom.items).toHaveLength(0);
  });
});
