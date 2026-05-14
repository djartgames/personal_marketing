# Folder Structure

## Project Root

| Directory / File | Description |
|-----------------|-------------|
| `source/` | The npm package — all library source code and tests live here. |
| `examples/` | Standalone example games (`basic-rpg/`, `advanced-rpg/`), each with its own configuration. |
| `dockerfiles/` | Dockerfiles for the development environment. |
| `docker_volumes/` | Persistent Docker volume mounts (e.g. `node_modules` for the container). |
| `docs/` | Agent-facing documentation (architecture, flow, plans, issues). |
| `docker-compose.yml` | Defines development containers for the Edwin library and each example. |
| `eslint.config.mjs` | Shared ESLint flat config (v9) — applies to `source/` and all `examples/`. |
| `package.json` | Workspace root manifest — lint and test scripts that span the whole repo. |
| `AGENTS.md` | Shared project instructions for Claude and Copilot. |
| `README.md` | Human-facing project overview and quick-start guide. |
| `LICENSE` | MIT licence. |

## `source/`

| Subdirectory / File | Description |
|--------------------|-------------|
| `lib/` | Library source code — the public API of the package. |
| `spec/` | Unit and integration tests (Vitest). |
| `docs/` | Technical documentation (API reference, architecture, examples guide). |
| `package.json` | Package manifest and scripts. |
| `vite.config.js` | Vite build and dev-server configuration. |

## `examples/`

Each example is a standalone application with its own configuration. See [examples.md](examples.md) for full details.

| Subdirectory | Description |
|-------------|-------------|
| `basic-rpg/` | Minimal game demonstrating locations, navigation, items, and NPCs. Served on port 3000. |
| `advanced-rpg/` | Full-featured game with branching dialogue, conditional actions, and game flags. Served on port 3010. |

Each example folder contains:

| File | Description |
|------|-------------|
| `game.js` | Game world definition (locations, NPCs, items, actions). |
| `main.jsx` | React application root. |
| `index.html` | HTML entry point. |
| `vite.config.js` | Vite dev server configuration with `edwin` alias. |
| `package.json` | App manifest and scripts (`lint`, `lint_fix`, `lint_report`). |

## `source/lib/`

| Subdirectory / File | Description |
|--------------------|-------------|
| `core/` | Game engine logic — `GameStateManager` and state transitions. |
| `entities/` | Core domain classes — `Game`, `Location`, `NPC`, `Item`, `Action`, `Interaction`, `EventSystem`. |
| `components/` | React UI components (`GameContainer`, scene and dialogue renderers, etc.). Each component is a thin rendering layer; logic is delegated to helpers and controllers (see below). |
| `components/helpers/` | JSX-generating helper classes, one per component. Each helper encapsulates markup generation and conditional rendering methods extracted from its parent component. |
| `components/controllers/` | Plain JS controller classes, one per component that has behaviour logic. Controllers handle non-React business logic (action execution, dialogue flow, item pick-up) and are independently testable without a React renderer. |
| `hooks/` | Custom React hooks for consuming game state. |
| `styles/` | CSS and Bootstrap overrides. |
| `types/` | JSDoc type definitions. |
| `index.js` | Public API entry point — re-exports everything consumers need. |
