import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GameStateManager } from '../../lib/core/GameStateManager.js';
import { Game } from '../../lib/entities/Game.js';
import { Item } from '../../lib/entities/Item.js';
import { Location } from '../../lib/entities/Location.js';
import { useGame } from '../../lib/hooks/useGame.js';

function buildManager() {
  const game = new Game({ id: 'hook_game', title: 'Hook Game' });
  const start = new Location({ id: 'start', name: 'Start Room' });
  const next = new Location({ id: 'next', name: 'Next Room' });
  start.addPath('north', 'next');
  game.addLocation(start);
  game.addLocation(next);
  game.setStartLocation('start');
  game.start();
  return new GameStateManager(game);
}

describe('useGame', () => {
  it('returns initial game state snapshot', () => {
    const manager = buildManager();
    const { result } = renderHook(() => useGame(manager));
    expect(result.current.state.isStarted).toBe(true);
    expect(result.current.state.currentLocationId).toBe('start');
  });

  it('state updates when game emits an event', () => {
    const manager = buildManager();
    const { result } = renderHook(() => useGame(manager));
    act(() => { manager.game.setFlag('door', true); });
    expect(result.current.state.flags.door).toBe(true);
  });

  it('moveTo() moves the player to a new location', () => {
    const manager = buildManager();
    const { result } = renderHook(() => useGame(manager));
    act(() => { result.current.moveTo('next'); });
    expect(result.current.state.currentLocationId).toBe('next');
  });

  it('moveTo() logs a console warning on error', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const manager = buildManager();
    const { result } = renderHook(() => useGame(manager));
    act(() => { result.current.moveTo('nowhere'); });
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('pickUpItem() adds item to inventory', () => {
    const manager = buildManager();
    const { result } = renderHook(() => useGame(manager));
    const item = new Item({ id: 'gem', name: 'Gem' });
    act(() => { result.current.pickUpItem(item); });
    expect(result.current.state.playerInventory).toHaveLength(1);
  });

  it('dropItem() removes item from inventory', () => {
    const manager = buildManager();
    const { result } = renderHook(() => useGame(manager));
    const item = new Item({ id: 'gem', name: 'Gem' });
    act(() => { result.current.pickUpItem(item); });
    act(() => { result.current.dropItem('gem'); });
    expect(result.current.state.playerInventory).toHaveLength(0);
  });

  it('setFlag() updates game flags', () => {
    const manager = buildManager();
    const { result } = renderHook(() => useGame(manager));
    act(() => { result.current.setFlag('visited', true); });
    expect(result.current.state.flags.visited).toBe(true);
  });

  it('save() and load() persist and restore state', () => {
    const manager = buildManager();
    const { result } = renderHook(() => useGame(manager));
    act(() => { result.current.moveTo('next'); });
    act(() => { result.current.save(); });

    const manager2 = buildManager();
    const { result: result2 } = renderHook(() => useGame(manager2));
    act(() => { result2.current.load(); });
    expect(result2.current.state.currentLocationId).toBe('next');
  });
});
