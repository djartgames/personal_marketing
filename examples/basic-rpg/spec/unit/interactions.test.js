import { describe, it, expect } from 'vitest';
import { innkeeperDialogue } from '../../lib/interactions.js';

describe('innkeeperDialogue', () => {
  it('has correct id', () => {
    expect(innkeeperDialogue.id).toBe('innkeeper_greeting');
  });

  it('has three steps', () => {
    expect(innkeeperDialogue.steps).toHaveLength(3);
  });

  it('first step is intro', () => {
    expect(innkeeperDialogue.steps[0].id).toBe('intro');
  });

  it('intro step has three options', () => {
    expect(innkeeperDialogue.steps[0].options).toHaveLength(3);
  });

  it('starts at the intro step', () => {
    expect(innkeeperDialogue.currentStep.id).toBe('intro');
  });
});
