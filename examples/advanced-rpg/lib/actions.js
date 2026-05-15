import { Action } from 'edwin';

const unlockVaultAction = new Action({
  id: 'unlock_vault',
  label: 'Unlock the vault gate',
  description: 'Use the Silver Key to open the vault.',
  condition: (state) =>
    state.currentLocationId === 'citadel_gate' &&
    state.playerInventory.some((i) => i.id === 'silver_key'),
  execute: (state) => {
    state.flags.vaultUnlocked = true;
  },
});

export { unlockVaultAction };
