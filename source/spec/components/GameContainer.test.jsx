import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GameContainer from '../../lib/components/GameContainer.jsx';
import { GameStateManager } from '../../lib/core/GameStateManager.js';
import { Action } from '../../lib/entities/Action.js';
import { Game } from '../../lib/entities/Game.js';
import { Interaction } from '../../lib/entities/Interaction.js';
import { Item } from '../../lib/entities/Item.js';
import { Location } from '../../lib/entities/Location.js';
import { NPC } from '../../lib/entities/NPC.js';

function buildManager(opts = {}) {
  const game = new Game({ id: 'gc_test', title: 'GC Test' });

  const item = new Item({ id: 'potion', name: 'Potion', isPickable: true, isUsable: false });

  const dialogue = new Interaction({
    id: 'talk',
    steps: [
      {
        id: 'greet',
        text: 'Hello adventurer!',
        options: [{ label: 'Farewell.', next: null }],
      },
    ],
  });
  const npc = new NPC({ id: 'innkeeper', name: 'Innkeeper', dialogue });

  const start = new Location({
    id: 'start',
    name: 'Start Room',
    description: 'A small room.',
    paths: { north: { target: 'next', label: '↑ North' } },
    items: opts.withItem ? [item] : [],
    npcs: opts.withNPC ? [npc] : [],
  });
  const next = new Location({ id: 'next', name: 'Next Room', paths: { south: { target: 'start', label: '↓ South' } } });
  game.addLocation(start);
  game.addLocation(next);
  game.setStartLocation('start');
  game.start();

  return new GameStateManager(game);
}

describe('GameContainer', () => {
  it('renders the game title', () => {
    const manager = buildManager();
    render(<GameContainer manager={manager} />);
    expect(screen.getByText('GC Test')).toBeInTheDocument();
  });

  it('renders the current location', () => {
    const manager = buildManager();
    render(<GameContainer manager={manager} />);
    expect(screen.getByText('Start Room')).toBeInTheDocument();
    expect(screen.getByText('A small room.')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    const manager = buildManager();
    render(<GameContainer manager={manager} />);
    expect(screen.getByText('↑ North')).toBeInTheDocument();
  });

  it('navigates to next room when direction clicked', () => {
    const manager = buildManager();
    render(<GameContainer manager={manager} />);
    act(() => { fireEvent.click(screen.getByText('↑ North')); });
    expect(screen.getByText('Next Room')).toBeInTheDocument();
  });

  it('renders available actions when provided', () => {
    const manager = buildManager();
    const action = new Action({
      id: 'shout',
      label: 'Shout!',
      execute: () => {},
    });
    render(<GameContainer manager={manager} actions={[action]} />);
    expect(screen.getByText('Shout!')).toBeInTheDocument();
  });

  it('does not render unavailable actions', () => {
    const manager = buildManager();
    const action = new Action({
      id: 'hidden',
      label: 'Hidden action',
      condition: () => false,
      execute: () => {},
    });
    render(<GameContainer manager={manager} actions={[action]} />);
    expect(screen.queryByText('Hidden action')).toBeNull();
  });

  it('renders pick up button for pickable items', () => {
    const manager = buildManager({ withItem: true });
    render(<GameContainer manager={manager} />);
    expect(screen.getByText('Pick up')).toBeInTheDocument();
  });

  it('picks up item and adds it to inventory', () => {
    const manager = buildManager({ withItem: true });
    render(<GameContainer manager={manager} />);
    act(() => { fireEvent.click(screen.getByText('Pick up')); });
    expect(screen.getByText('Potion')).toBeInTheDocument();
  });

  it('renders Talk button for NPCs', () => {
    const manager = buildManager({ withNPC: true });
    render(<GameContainer manager={manager} />);
    expect(screen.getByText('Talk')).toBeInTheDocument();
  });

  it('opens NPC dialog when Talk is clicked', () => {
    const manager = buildManager({ withNPC: true });
    render(<GameContainer manager={manager} />);
    act(() => { fireEvent.click(screen.getByText('Talk')); });
    expect(screen.getByText('Hello adventurer!')).toBeInTheDocument();
  });

  it('advances dialogue when option chosen', () => {
    const manager = buildManager({ withNPC: true });
    render(<GameContainer manager={manager} />);
    act(() => { fireEvent.click(screen.getByText('Talk')); });
    act(() => { fireEvent.click(screen.getByText('Farewell.')); });
    expect(screen.getByText('The conversation has ended.')).toBeInTheDocument();
  });

  it('closes dialog when Leave button clicked', () => {
    const manager = buildManager({ withNPC: true });
    render(<GameContainer manager={manager} />);
    act(() => { fireEvent.click(screen.getByText('Talk')); });
    act(() => { fireEvent.click(screen.getByText('Leave')); });
    expect(screen.queryByText('Hello adventurer!')).toBeNull();
  });

  it('executes an action when action button is clicked', () => {
    const manager = buildManager();
    const calls = [];
    const action = new Action({
      id: 'yell',
      label: 'Yell!',
      execute: (state) => calls.push(state),
    });
    render(<GameContainer manager={manager} actions={[action]} />);
    act(() => { fireEvent.click(screen.getByText('Yell!')); });
    expect(calls).toHaveLength(1);
  });

  it('logs a warning when action execution throws', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const manager = buildManager();
    const action = new Action({
      id: 'boom',
      label: 'Boom!',
      execute: () => { throw new Error('kaboom'); },
    });
    render(<GameContainer manager={manager} actions={[action]} />);
    act(() => { fireEvent.click(screen.getByText('Boom!')); });
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
