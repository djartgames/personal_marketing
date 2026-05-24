import { describe, it, expect } from 'vitest';
import { Path } from '../../lib/entities/Path.js';

describe('Path', () => {
  it('uses target as destination when destination is not provided', () => {
    const path = new Path({ target: 'town_square', label: '↑ North' });

    expect(path.target).toBe('town_square');
    expect(path.destination).toBe('town_square');
    expect(path.label).toBe('↑ North');
  });

  it('uses destination as target when target is not provided', () => {
    const path = new Path({ destination: 'tavern' });

    expect(path.target).toBe('tavern');
    expect(path.destination).toBe('tavern');
  });

  it('keeps custom properties and conditions in serialization', () => {
    const path = new Path({
      target: 'vault',
      label: 'Inside',
      conditions: ['has_key'],
      kind: 'secret',
    });

    expect(path.conditions).toEqual(['has_key']);
    expect(path.properties).toEqual({ kind: 'secret' });
    expect(path.toJSON()).toEqual({
      target: 'vault',
      label: 'Inside',
      conditions: ['has_key'],
      kind: 'secret',
    });
  });
});
