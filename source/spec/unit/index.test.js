import { describe, it, expect } from 'vitest';
import * as Edwin from '../../lib/index.js';

describe('Edwin public API (lib/index.js)', () => {
  it('exports entity classes', () => {
    expect(Edwin.Game).toBeDefined();
    expect(Edwin.Location).toBeDefined();
    expect(Edwin.Path).toBeDefined();
    expect(Edwin.NPC).toBeDefined();
    expect(Edwin.Item).toBeDefined();
    expect(Edwin.Action).toBeDefined();
    expect(Edwin.Interaction).toBeDefined();
    expect(Edwin.EventSystem).toBeDefined();
  });

  it('exports core classes', () => {
    expect(Edwin.GameStateManager).toBeDefined();
  });

  it('exports React components', () => {
    expect(Edwin.GameContainer).toBeDefined();
    expect(Edwin.LocationView).toBeDefined();
    expect(Edwin.NPCDialog).toBeDefined();
    expect(Edwin.Inventory).toBeDefined();
    expect(Edwin.ActionPanel).toBeDefined();
    expect(Edwin.Navigation).toBeDefined();
    expect(Edwin.EventLog).toBeDefined();
  });

  it('exports React hooks', () => {
    expect(Edwin.useGame).toBeDefined();
    expect(Edwin.useLocation).toBeDefined();
    expect(Edwin.useInventory).toBeDefined();
  });
});
