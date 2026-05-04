import { describe, it, expect } from 'vitest';
import { Action } from '../../src/entities/Action.js';

describe('Action', () => {
  const makeAction = (overrides = {}) =>
    new Action({
      id: 'act',
      label: 'Do something',
      execute: () => {},
      ...overrides,
    });

  it('throws if id is missing', () => {
    expect(() => new Action({ label: 'X', execute: () => {} })).toThrow(
      'Action requires an id.'
    );
  });

  it('throws if label is missing', () => {
    expect(() => new Action({ id: 'x', execute: () => {} })).toThrow(
      'Action requires a label.'
    );
  });

  it('throws if execute is not a function', () => {
    expect(() => new Action({ id: 'x', label: 'y', execute: 'bad' })).toThrow(
      'Action requires an execute function.'
    );
  });

  it('isAvailable() returns true by default', () => {
    const action = makeAction();
    expect(action.isAvailable({})).toBe(true);
  });

  it('isAvailable() returns false when condition fails', () => {
    const action = makeAction({ condition: () => false });
    expect(action.isAvailable({})).toBe(false);
  });

  it('execute() calls the execute callback', () => {
    const calls = [];
    const action = makeAction({ execute: (state) => calls.push(state) });
    const state = { flag: true };
    action.execute(state);
    expect(calls).toEqual([state]);
  });

  it('execute() throws when action is not available', () => {
    const action = makeAction({ condition: () => false });
    expect(() => action.execute({})).toThrow('is not available');
  });

  it('toJSON() returns metadata without callbacks', () => {
    const action = makeAction({ description: 'desc' });
    const json = action.toJSON();
    expect(json.id).toBe('act');
    expect(json.label).toBe('Do something');
    expect(json.description).toBe('desc');
    expect(json.execute).toBeUndefined();
  });
});
