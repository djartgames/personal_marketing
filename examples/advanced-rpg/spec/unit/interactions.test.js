import { describe, it, expect } from 'vitest';
import { guardDialogue, merchantDialogue } from '../../lib/interactions.js';

describe('guardDialogue', () => {
  it('has correct id', () => {
    expect(guardDialogue.id).toBe('guard_dialogue');
  });

  it('has three steps', () => {
    expect(guardDialogue.steps).toHaveLength(3);
  });

  it('first step is challenge', () => {
    expect(guardDialogue.steps[0].id).toBe('challenge');
  });

  it('challenge step has two options', () => {
    expect(guardDialogue.steps[0].options).toHaveLength(2);
  });
});

describe('merchantDialogue', () => {
  it('has correct id', () => {
    expect(merchantDialogue.id).toBe('merchant_dialogue');
  });

  it('has four steps', () => {
    expect(merchantDialogue.steps).toHaveLength(4);
  });

  it('first step is welcome', () => {
    expect(merchantDialogue.steps[0].id).toBe('welcome');
  });

  it('wares step buy option calls action with gameState', () => {
    const waresStep = merchantDialogue.steps.find((s) => s.id === 'wares');
    const buyOption = waresStep.options[0];
    const gameState = {};
    buyOption.action(gameState);
    expect(gameState.flags.boughtKey).toBe(true);
  });
});
