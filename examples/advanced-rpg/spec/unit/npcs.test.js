import { describe, it, expect } from 'vitest';
import { guard, merchant } from '../../lib/npcs.js';

describe('guard', () => {
  it('has correct id', () => {
    expect(guard.id).toBe('vault_guard');
  });

  it('has correct name', () => {
    expect(guard.name).toBe('Vault Guard');
  });

  it('has guard dialogue assigned', () => {
    expect(guard.dialogue).not.toBeNull();
    expect(guard.dialogue.id).toBe('guard_dialogue');
  });
});

describe('merchant', () => {
  it('has correct id', () => {
    expect(merchant.id).toBe('merchant');
  });

  it('has correct name', () => {
    expect(merchant.name).toBe('Elara the Merchant');
  });

  it('has merchant dialogue assigned', () => {
    expect(merchant.dialogue).not.toBeNull();
    expect(merchant.dialogue.id).toBe('merchant_dialogue');
  });

  it('has the silver key in inventory', () => {
    expect(merchant.inventory).toHaveLength(1);
    expect(merchant.inventory[0].id).toBe('silver_key');
  });
});
