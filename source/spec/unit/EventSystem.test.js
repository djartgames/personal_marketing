import { describe, it, expect } from 'vitest';
import { EventSystem } from '../../lib/entities/EventSystem.js';

describe('EventSystem', () => {
  it('calls a registered listener when the event is emitted', () => {
    const events = new EventSystem();
    const calls = [];
    events.on('test', (data) => calls.push(data));
    events.emit('test', { value: 42 });
    expect(calls).toHaveLength(1);
    expect(calls[0]).toEqual({ value: 42 });
  });

  it('returns an unsubscribe function from on()', () => {
    const events = new EventSystem();
    const calls = [];
    const off = events.on('evt', () => calls.push(1));
    off();
    events.emit('evt');
    expect(calls).toHaveLength(0);
  });

  it('once() fires only once', () => {
    const events = new EventSystem();
    const calls = [];
    events.once('x', (d) => calls.push(d));
    events.emit('x', 1);
    events.emit('x', 2);
    expect(calls).toEqual([1]);
  });

  it('off() removes a listener', () => {
    const events = new EventSystem();
    const calls = [];
    const listener = () => calls.push(1);
    events.on('y', listener);
    events.off('y', listener);
    events.emit('y');
    expect(calls).toHaveLength(0);
  });

  it('clear(event) removes only that event', () => {
    const events = new EventSystem();
    const a = [];
    const b = [];
    events.on('a', () => a.push(1));
    events.on('b', () => b.push(1));
    events.clear('a');
    events.emit('a');
    events.emit('b');
    expect(a).toHaveLength(0);
    expect(b).toHaveLength(1);
  });

  it('clear() with no args removes all listeners', () => {
    const events = new EventSystem();
    const calls = [];
    events.on('z', () => calls.push(1));
    events.clear();
    events.emit('z');
    expect(calls).toHaveLength(0);
  });

  it('listenerCount() returns the correct count', () => {
    const events = new EventSystem();
    events.on('c', () => {});
    events.on('c', () => {});
    expect(events.listenerCount('c')).toBe(2);
    expect(events.listenerCount('nope')).toBe(0);
  });
});
