# Edwin RPG Game Engine

**Edwin** is a specialized Node.js package designed to streamline the development of text-based Role-Playing Game (RPG) web applications. It provides a comprehensive framework that bridges game logic and web presentation using **React** and **Bootstrap**.

---

## ✨ Features

- 🧩 **Clean Architecture** – game logic is fully decoupled from the UI
- ⚛️ **React + JSX** – component-based UI with custom hooks
- 🎨 **Bootstrap 5** – responsive, accessible styling out of the box
- 💾 **Zero-backend persistence** – save/load via `localStorage`
- 📡 **Event-driven** – lightweight pub/sub `EventSystem` for async coordination
- 🔧 **Vite** – fast dev server and optimised production builds
- 🐳 **Docker** – ready-to-use development container
- ✅ **Vitest** – unit and integration tests

---

## 🗂️ Directory Structure

```
edwin/
├── source/
│   ├── src/
│   │   ├── core/           # Game engine logic (GameStateManager)
│   │   ├── entities/       # Core classes (Game, Location, NPC, Item, Action, Interaction, EventSystem)
│   │   ├── components/     # React UI components
│   │   ├── styles/         # CSS + Bootstrap overrides
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # JSDoc type definitions
│   │   └── index.js        # Public API entry point
│   ├── examples/
│   │   ├── basic-rpg/      # Minimal implementation example
│   │   └── advanced-rpg/   # Complex narrative example
│   ├── tests/              # Unit and integration tests
│   ├── docs/               # Technical documentation
│   ├── package.json
│   ├── vite.config.js
│   ├── .eslintrc.json
│   └── .prettierrc.json
├── dockerfiles/
│   └── dev_edwin/
│       └── Dockerfile
├── docker-compose.yml
├── README.md
└── LICENSE
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Install dependencies

```bash
cd source
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Run tests

```bash
npm test
```

---

## 🐳 Docker

Start the full development environment with a single command:

```bash
docker compose up --build
```

The Vite dev server will be available at `http://localhost:5173`.

---

## 📖 Core Concepts

### Game

The central hub. Manages locations, player inventory, game flags, and the event log.

```js
import { Game, Location, GameStateManager } from 'edwin';

const game = new Game({ id: 'my_rpg', title: 'My Adventure' });
game.addLocation(new Location({ id: 'start', name: 'Starting Room' }));
game.setStartLocation('start');
game.start();
```

### Location

A place the player can visit. Holds items, NPCs, and exit paths.

```js
const forest = new Location({
  id: 'forest',
  name: 'Dark Forest',
  description: 'Tall trees block the sun.',
  paths: { north: 'clearing' },
});
```

### NPC + Interaction (dialogue tree)

```js
const dialogue = new Interaction({
  id: 'guard_chat',
  steps: [
    { id: 'start', text: 'Halt!', options: [{ label: 'Pass', next: null }] },
  ],
});
const guard = new NPC({ id: 'guard', name: 'Guard', dialogue });
```

### Action (conditional player action)

```js
const openChest = new Action({
  id: 'open_chest',
  label: 'Open the chest',
  condition: (state) => state.flags.hasKey,
  execute: (state) => { state.flags.chestOpen = true; },
});
```

### React integration

```jsx
import { GameContainer, GameStateManager } from 'edwin';

function App() {
  const manager = useMemo(() => new GameStateManager(game), []);
  return <GameContainer manager={manager} actions={[openChest]} />;
}
```

---

## 📚 Documentation

Detailed documentation is available in [`source/docs/`](source/docs/):

- [API Reference](source/docs/api-reference.md)
- [Architecture](source/docs/architecture.md)
- [Examples Guide](source/docs/examples.md)

---

## 🧪 Testing

```bash
# Run all tests once
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

---

## 🔍 Linting & Formatting

```bash
npm run lint          # check
npm run lint:fix      # auto-fix
npm run format        # Prettier
```

---

## 📄 License

MIT – see [LICENSE](LICENSE).