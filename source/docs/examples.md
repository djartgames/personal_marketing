# Edwin – Examples Guide

Two example applications are bundled in `source/examples/`.

---

## Basic RPG (`examples/basic-rpg/`)

Demonstrates the minimum required to build an Edwin game:

- Two locations connected by an exit path
- One item the player can pick up
- One NPC with a three-step dialogue tree

### Files

| File | Purpose |
|------|---------|
| `game.js` | World definition (locations, NPC, item, game instance) |
| `main.jsx` | React application root |
| `index.html` | HTML shell |

### Key code

```js
// game.js – create and wire up the world
const game = new Game({ id: 'basic_rpg', title: 'A Simple Adventure' });
game.addLocation(tavern);
game.addLocation(townSquare);
game.setStartLocation('tavern');
export const manager = new GameStateManager(game);

// main.jsx – mount the React app
game.start(true); // attempt to resume from localStorage
<GameContainer manager={manager} />
```

---

## Advanced RPG (`examples/advanced-rpg/`)

Builds on the basics to show:

- Five interconnected locations
- A conditional `Action` (unlock the vault when holding the Silver Key)
- An NPC whose dialogue options execute callbacks that set game flags
- An item with a custom `onUse` callback
- Multiple NPCs (merchant + guard)

### Files

| File | Purpose |
|------|---------|
| `game.js` | Full world definition with conditional logic |
| `main.jsx` | React root, passes `unlockVaultAction` to `<GameContainer>` |
| `index.html` | HTML shell |

### Conditional action pattern

```js
const unlockVaultAction = new Action({
  id: 'unlock_vault',
  label: 'Unlock the vault gate',
  // Only shown when player has the Silver Key at the citadel gate
  condition: (state) =>
    state.currentLocationId === 'citadel_gate' &&
    state.playerInventory.some((i) => i.id === 'silver_key'),
  execute: (state) => {
    state.flags.vaultUnlocked = true;
  },
});
```

Pass it to the container so the `ActionPanel` renders it automatically:

```jsx
<GameContainer manager={manager} actions={[unlockVaultAction]} />
```
