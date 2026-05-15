import { describe, it, expect } from 'vitest';
import { innkeeper } from '../../lib/npcs.js';
import { innkeeperDialogue } from '../../lib/interactions.js';

describe('innkeeper', () => {
  it('has correct id', () => {
    expect(innkeeper.id).toBe('innkeeper');
  });

  it('has correct name', () => {
    expect(innkeeper.name).toBe('Gareth the Innkeeper');
  });

  it('has the innkeeper dialogue assigned', () => {
    expect(innkeeper.dialogue).toBe(innkeeperDialogue);
  });
});
