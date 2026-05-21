# How to use Edwin

This guide explains how to build a text-based RPG web application using **Edwin** as a dependency.

## Project setup

Edwin is distributed as an npm package. Install it with:

```bash
npm install edwin
# or
yarn add edwin
```

Your project needs [React](https://react.dev/) and [Vite](https://vitejs.dev/). A minimal `package.json`:

```json
{
  "name": "my-rpg",
  "version": "1.0.0",
  "dependencies": {
    "edwin": "latest",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  }
}
```

## Core concepts

Edwin is built around five entities:

| Entity | Purpose |
|--------|---------|
| `Game` | Top-level container that holds locations and manages save/load |
| `GameStateManager` | Bridges the game state to React |
| `Location` | A place the player can visit, with a description, paths, NPCs and items |
| `NPC` | A character the player can talk to, driven by an `Interaction` |
| `Item` | An object the player can inspect, pick up, or use |
| `Interaction` | A branching dialogue tree attached to an NPC |

## Building your game

### 1. Define items

```js
import { Item } from 'edwin';

const healthPotion = new Item({
  id: 'health_potion',
  name: 'Health Potion',
  description: 'A small vial of red liquid.',
  isPickable: true,
  isUsable: true,
});
```

### 2. Define NPC dialogue

```js
import { Interaction } from 'edwin';

const innkeeperDialogue = new Interaction({
  id: 'innkeeper_greeting',
  steps: [
    {
      id: 'intro',
      text: 'Welcome to the Rusty Flagon! What can I do for you?',
      options: [
        { label: 'Just looking around.', next: 'farewell' },
        { label: 'I need a room.', next: 'room' },
        { label: 'Goodbye.', next: null },
      ],
    },
    {
      id: 'room',
      text: "That'll be 5 gold coins. We've a cosy spot by the fire.",
      options: [
        { label: "Sounds good, I'll take it.", next: 'farewell' },
        { label: 'Maybe later.', next: 'intro' },
      ],
    },
    {
      id: 'farewell',
      text: 'Safe travels, friend!',
      options: [{ label: 'Goodbye.', next: null }],
    },
  ],
});
```

### 3. Define NPCs

```js
import { NPC } from 'edwin';
import { innkeeperDialogue } from './interactions.js';

const innkeeper = new NPC({
  id: 'innkeeper',
  name: 'Gareth the Innkeeper',
  description: 'A stout, friendly man with a ruddy face.',
  dialogue: innkeeperDialogue,
});
```

### 4. Define locations

Locations reference each other by `id` via the `paths` map:

```js
import { Location } from 'edwin';
import { innkeeper } from './npcs.js';
import { healthPotion } from './items.js';

const tavern = new Location({
  id: 'tavern',
  name: 'The Rusty Flagon',
  description: 'A dimly lit tavern smelling of ale and sawdust.',
  paths: { north: { target: 'town_square', label: '↑ North' } },
  npcs: [innkeeper],
});

const townSquare = new Location({
  id: 'town_square',
  name: 'Town Square',
  description: 'The heart of the village. A weathered stone fountain stands in the centre.',
  paths: { south: { target: 'tavern', label: '↓ South' } },
  items: [healthPotion],
});
```

### 5. Create the game

```js
import { Game, GameStateManager } from 'edwin';
import { tavern, townSquare } from './locations.js';

const game = new Game({
  id: 'my_rpg',
  title: 'My Adventure',
  description: 'A short text-based RPG.',
});

game.addLocation(tavern);
game.addLocation(townSquare);
game.setStartLocation('tavern');

const manager = new GameStateManager(game);

export { game, manager };
```

### 6. Render with React

```jsx
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GameContainer } from 'edwin';
import { game, manager } from './lib/game.js';

function App() {
  useEffect(() => {
    game.start(true); // pass true to attempt loading a previous save
  }, []);

  return <GameContainer manager={manager} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### 7. Configure Vite

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

And a minimal `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My RPG</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.jsx"></script>
  </body>
</html>
```

## Running locally

```bash
npx vite
```

Open `http://localhost:5173` in your browser.

## Examples

The Edwin repository includes two reference applications under `examples/`:

- `examples/basic-rpg` – locations, navigation, one NPC, one item
- `examples/advanced-rpg` – branching dialogue, flags, conditional actions
