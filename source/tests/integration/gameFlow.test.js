/**
 * @fileoverview Integration test – full game flow (world + save/load).
 *
 * Uses a jsdom environment via Vitest.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { Game } from '../../src/entities/Game.js';
import { Location } from '../../src/entities/Location.js';
import { NPC } from '../../src/entities/NPC.js';
import { Item } from '../../src/entities/Item.js';
import { Interaction } from '../../src/entities/Interaction.js';
import { Action } from '../../src/entities/Action.js';
import { GameStateManager } from '../../src/core/GameStateManager.js';

function buildWorld() {
  const potion = new Item({
    id: 'potion',
    name: 'Health Potion',
    isPickable: true,
    isUsable: true,
  });

  const dialogue = new Interaction({
    id: 'guard_talk',
    steps: [
      {
        id: 'q1',
        text: 'Who goes there?',
        options: [
          { label: 'A friend.', next: 'q2' },
          { label: 'Leave.', next: null },
        ],
      },
      {
        id: 'q2',
        text: 'Pass, friend.',
        options: [{ label: 'Thanks.', next: null }],
      },
    ],
  });

  const guard = new NPC({ id: 'guard', name: 'Guard', dialogue });

  const entrance = new Location({
    id: 'entrance',
    name: 'Castle Entrance',
    paths: { inside: 'hall' },
    npcs: [guard],
  });

  const hall = new Location({
    id: 'hall',
    name: 'Great Hall',
    paths: { out: 'entrance' },
    items: [potion],
  });

  const game = new Game({ id: 'integration_test', title: 'Integration Test' });
  game.addLocation(entrance);
  game.addLocation(hall);
  game.setStartLocation('entrance');

  return { game, potion, guard };
}

describe('Full game flow', () => {
  let game, potion, guard;

  beforeEach(() => {
    ({ game, potion, guard } = buildWorld());
    game.start();
  });

  it('player starts at the entrance', () => {
    expect(game.currentLocation.id).toBe('entrance');
  });

  it('player can navigate to the hall', () => {
    game.moveTo('hall');
    expect(game.currentLocation.id).toBe('hall');
  });

  it('player can pick up an item in the hall', () => {
    game.moveTo('hall');
    const livePotion = game.currentLocation.removeItem('potion');
    game.pickUpItem(livePotion);
    expect(game.hasItem('potion')).toBe(true);
    expect(game.currentLocation.items).toHaveLength(0);
  });

  it('player can talk through an NPC dialogue', () => {
    const step1 = guard.startDialogue();
    expect(step1.id).toBe('q1');
    const step2 = guard.respondToChoice(0); // 'A friend.'
    expect(step2.id).toBe('q2');
    const done = guard.respondToChoice(0); // 'Thanks.'
    expect(done).toBeNull();
    expect(guard.dialogue.isComplete).toBe(true);
  });

  it('conditional action fires only when condition is met', () => {
    const calls = [];
    const act = new Action({
      id: 'use_potion',
      label: 'Use potion',
      condition: (state) => state.playerInventory.some((i) => i.id === 'potion'),
      execute: (state) => calls.push(state),
    });

    // Before picking up
    const snapshot1 = new GameStateManager(game).getSnapshot();
    expect(act.isAvailable(snapshot1)).toBe(false);

    // After picking up
    game.moveTo('hall');
    const livePotion = game.currentLocation.removeItem('potion');
    game.pickUpItem(livePotion);
    const snapshot2 = new GameStateManager(game).getSnapshot();
    expect(act.isAvailable(snapshot2)).toBe(true);
    act.execute(snapshot2);
    expect(calls).toHaveLength(1);
  });

  it('GameStateManager snapshot reflects latest state', () => {
    const manager = new GameStateManager(game);
    game.moveTo('hall');
    const snap = manager.getSnapshot();
    expect(snap.currentLocationId).toBe('hall');
    expect(snap.currentLocation.name).toBe('Great Hall');
  });

  it('event log is populated after navigation', () => {
    game.moveTo('hall');
    expect(game.log.some((e) => e.text.includes('Great Hall'))).toBe(true);
  });
});
