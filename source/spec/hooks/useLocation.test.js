import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useLocation } from '../../lib/hooks/useLocation.js';

const makeState = (location = null) => ({ currentLocation: location });

describe('useLocation', () => {
  it('returns null location when none is set', () => {
    const { result } = renderHook(() => useLocation(makeState(null), () => {}));
    expect(result.current.location).toBeNull();
    expect(result.current.exits).toEqual([]);
  });

  it('returns the current location', () => {
    const location = { id: 'tavern', name: 'Tavern', paths: { north: { target: 'town', label: '↑ North' } } };
    const { result } = renderHook(() => useLocation(makeState(location), () => {}));
    expect(result.current.location).toEqual(location);
  });

  it('returns exits from location paths', () => {
    const location = {
      id: 'hall', name: 'Hall',
      paths: {
        north: { target: 'tower', label: '↑ North' },
        east: { target: 'garden', label: '→ East' },
      },
    };
    const { result } = renderHook(() => useLocation(makeState(location), () => {}));
    expect(result.current.exits).toContain('north');
    expect(result.current.exits).toContain('east');
  });

  it('navigate() calls moveTo with target location id', () => {
    const moveTo = vi.fn();
    const location = { id: 'hall', name: 'Hall', paths: { north: { target: 'tower', label: '↑ North' } } };
    const { result } = renderHook(() => useLocation(makeState(location), moveTo));
    result.current.navigate('north');
    expect(moveTo).toHaveBeenCalledWith('tower');
  });

  it('navigate() does nothing when direction not in paths', () => {
    const moveTo = vi.fn();
    const location = { id: 'hall', name: 'Hall', paths: { north: { target: 'tower', label: '↑ North' } } };
    const { result } = renderHook(() => useLocation(makeState(location), moveTo));
    result.current.navigate('south');
    expect(moveTo).not.toHaveBeenCalled();
  });

  it('navigate() does nothing when location is null', () => {
    const moveTo = vi.fn();
    const { result } = renderHook(() => useLocation(makeState(null), moveTo));
    result.current.navigate('north');
    expect(moveTo).not.toHaveBeenCalled();
  });
});
