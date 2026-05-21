# Architecture

## Overview

Personal Marketing is a React application that uses **Edwin** as its game engine. The app wires together game data (locations, NPCs, items) using Edwin's entity classes, then hands the resulting `GameStateManager` to Edwin's `GameContainer` for rendering.

## Layer Structure

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **Game definition** | `personal_marketing/lib/` | Pure data — constructs Edwin entities (Game, Location, NPC, Item, Interaction) |
| **App entry** | `personal_marketing/main.jsx` | Mounts the React app, starts the game, renders `<GameContainer>` |
| **Engine** | `source/` (Edwin) | All rendering, state management, and UI logic — treated as a black box |

## Edwin as a Sibling Dependency

In Docker, Edwin's source is mounted into the game container:

```
/home/node/app/          ← personal_marketing app root
/home/node/app/edwin/    ← Edwin source (mounted from ./source)
```

`vite.config.js` defines a `resolve.alias` so `import { ... } from 'edwin'` resolves to the mounted source:

```js
resolve: {
  alias: {
    edwin: resolve(__dirname, 'edwin/lib/index.js'),
  },
},
```

## Game Definition

All game content lives in `personal_marketing/lib/`. Each file is a **module declarer** — it exports Edwin entity instances with no side effects at import time.

The only exception is `lib/game.js`, which wires everything together and exports `game` and `manager` for use in `main.jsx`.

_See [folder-structure.md](folder-structure.md) for the full directory breakdown and [how-to-use-edwin.md](how-to-use-edwin.md) for Edwin's entity API._
