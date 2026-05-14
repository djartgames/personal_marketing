import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useInventory } from '../../lib/hooks/useInventory.js';

const makeState = (items = []) => ({ playerInventory: items });

describe('useInventory', () => {
  it('returns the inventory from game state', () => {
    const items = [{ id: 'sword', name: 'Sword' }];
    const { result } = renderHook(() => useInventory(makeState(items), () => {}));
    expect(result.current.inventory).toEqual(items);
  });

  it('hasItem() returns true when item is in inventory', () => {
    const items = [{ id: 'sword', name: 'Sword' }];
    const { result } = renderHook(() => useInventory(makeState(items), () => {}));
    expect(result.current.hasItem('sword')).toBe(true);
  });

  it('hasItem() returns false when item is not in inventory', () => {
    const { result } = renderHook(() => useInventory(makeState([]), () => {}));
    expect(result.current.hasItem('shield')).toBe(false);
  });

  it('drop() delegates to dropItem callback', () => {
    const dropItem = vi.fn();
    const { result } = renderHook(() => useInventory(makeState([]), dropItem));
    result.current.drop('sword');
    expect(dropItem).toHaveBeenCalledWith('sword');
  });
});
