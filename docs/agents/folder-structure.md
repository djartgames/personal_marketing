# Folder Structure

## Project Root

| Directory / File | Description |
|-----------------|-------------|
| `source/` | The npm package — all library source code, tests, and examples live here. |
| `dockerfiles/` | Dockerfiles for the development environment. |
| `docker_volumes/` | Persistent Docker volume mounts (e.g. `node_modules` for the container). |
| `docs/` | Agent-facing documentation (architecture, flow, plans, issues). |
| `docker-compose.yml` | Defines the `dev_edwin` development container. |
| `AGENTS.md` | Shared project instructions for Claude and Copilot. |
| `README.md` | Human-facing project overview and quick-start guide. |
| `LICENSE` | MIT licence. |

## `source/`

| Subdirectory / File | Description |
|--------------------|-------------|
| `src/` | Library source code — the public API of the package. |
| `tests/` | Unit and integration tests (Vitest). |
| `examples/` | Runnable example games (`basic-rpg/`, `advanced-rpg/`). Will move to their own top-level containers in the future. |
| `docs/` | Technical documentation (API reference, architecture, examples guide). |
| `package.json` | Package manifest and scripts. |
| `vite.config.js` | Vite build and dev-server configuration. |

## `source/src/`

| Subdirectory / File | Description |
|--------------------|-------------|
| `core/` | Game engine logic — `GameStateManager` and state transitions. |
| `entities/` | Core domain classes — `Game`, `Location`, `NPC`, `Item`, `Action`, `Interaction`, `EventSystem`. |
| `components/` | React UI components (`GameContainer`, scene and dialogue renderers, etc.). |
| `hooks/` | Custom React hooks for consuming game state. |
| `styles/` | CSS and Bootstrap overrides. |
| `types/` | JSDoc type definitions. |
| `index.js` | Public API entry point — re-exports everything consumers need. |
