import { describe, it, expect } from 'vitest';
import { unlockVaultAction } from '../../lib/actions.js';

describe('unlockVaultAction', () => {
  it('has correct id', () => {
    expect(unlockVaultAction.id).toBe('unlock_vault');
  });

  it('has correct label', () => {
    expect(unlockVaultAction.label).toBe('Unlock the vault gate');
  });

  it('is not available when player is not at citadel_gate', () => {
    const state = { currentLocationId: 'village', playerInventory: [{ id: 'silver_key' }] };
    expect(unlockVaultAction.isAvailable(state)).toBe(false);
  });

  it('is not available when player lacks the silver key', () => {
    const state = { currentLocationId: 'citadel_gate', playerInventory: [] };
    expect(unlockVaultAction.isAvailable(state)).toBe(false);
  });

  it('is available at citadel_gate with the silver key', () => {
    const state = { currentLocationId: 'citadel_gate', playerInventory: [{ id: 'silver_key' }] };
    expect(unlockVaultAction.isAvailable(state)).toBe(true);
  });

  it('execute() sets vaultUnlocked flag', () => {
    const state = { currentLocationId: 'citadel_gate', playerInventory: [{ id: 'silver_key' }], flags: {} };
    unlockVaultAction.execute(state);
    expect(state.flags.vaultUnlocked).toBe(true);
  });
});
