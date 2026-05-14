import { describe, it, expect } from 'vitest';
import { Interaction } from '../../lib/entities/Interaction.js';

const makeInteraction = () =>
  new Interaction({
    id: 'test_talk',
    steps: [
      {
        id: 'start',
        text: 'Hello!',
        options: [
          { label: 'Hi there', next: 'end' },
          { label: 'Bye', next: null },
        ],
      },
      {
        id: 'end',
        text: 'Great to meet you.',
        options: [{ label: 'Farewell.', next: null }],
      },
    ],
  });

describe('Interaction', () => {
  it('starts at the first step', () => {
    const interaction = makeInteraction();
    expect(interaction.currentStep.id).toBe('start');
  });

  it('throws if id is missing', () => {
    expect(() => new Interaction({ steps: [{ id: 'a', text: 'b' }] })).toThrow(
      'Interaction requires an id.'
    );
  });

  it('throws if steps array is empty', () => {
    expect(() => new Interaction({ id: 'x', steps: [] })).toThrow(
      'Interaction requires at least one step.'
    );
  });

  it('choose() advances to the next step', () => {
    const interaction = makeInteraction();
    const next = interaction.choose(0);
    expect(next.id).toBe('end');
  });

  it('choose() ends the interaction when next is null', () => {
    const interaction = makeInteraction();
    interaction.choose(1); // 'Bye' → next: null
    expect(interaction.isComplete).toBe(true);
    expect(interaction.currentStep).toBeNull();
  });

  it('choose() calls option action if provided', () => {
    const calls = [];
    const interaction = new Interaction({
      id: 'action_test',
      steps: [
        {
          id: 's1',
          text: 'Pick',
          options: [
            {
              label: 'Do it',
              next: null,
              action: (state) => calls.push(state),
            },
          ],
        },
      ],
    });
    interaction.choose(0, { flag: true });
    expect(calls).toEqual([{ flag: true }]);
  });

  it('reset() restores initial state', () => {
    const interaction = makeInteraction();
    interaction.choose(1); // complete
    interaction.reset();
    expect(interaction.isComplete).toBe(false);
    expect(interaction.currentStep.id).toBe('start');
  });

  it('choose() throws when already complete', () => {
    const interaction = makeInteraction();
    interaction.choose(1);
    expect(() => interaction.choose(0)).toThrow('already complete');
  });

  it('choose() throws when option index is out of range', () => {
    const interaction = makeInteraction();
    expect(() => interaction.choose(99)).toThrow('No option at index 99');
  });

  it('toJSON() returns serializable snapshot', () => {
    const interaction = makeInteraction();
    const json = interaction.toJSON();
    expect(json.id).toBe('test_talk');
    expect(json.currentStepId).toBe('start');
    expect(json.isComplete).toBe(false);
  });

  it('currentStep returns null when stepId not found in map', () => {
    const interaction = new Interaction({
      id: 'odd',
      steps: [{ id: 'only', text: 'Hi', options: [] }],
      startStepId: 'missing',
    });
    expect(interaction.currentStep).toBeNull();
  });
});
