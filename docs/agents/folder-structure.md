# Folder Structure

## Project Root

| Directory / File | Description |
|-----------------|-------------|
| `personal_marketing/` | The main game application — all game code and tests live here. |
| `source/` | The Edwin engine (npm package) — used by `personal_marketing` as a dependency. |
| `examples/` | Standalone Edwin example games (`basic-rpg/`, `advanced-rpg/`) for reference. |
| `docs/` | Agent-facing documentation (architecture, flow, plans, issues). |
| `docker-compose.yml` | Defines development containers for the Edwin library, examples, and the game. |
| `AGENTS.md` | Shared project instructions for Claude and Copilot. |
| `README.md` | Human-facing project overview and quick-start guide. |
| `LICENSE` | MIT licence. |

## `personal_marketing/`

The main project — the Personal Marketing RPG game.

| Subdirectory / File | Description |
|--------------------|-------------|
| `lib/` | Game definition files — locations, NPCs, items, actions, and game setup. |
| `spec/` | Unit and integration tests (Vitest). |
| `main.jsx` | React application root — renders `GameContainer` with the game manager. |
| `index.html` | HTML entry point. |
| `vite.config.js` | Vite build and dev-server configuration with `edwin` alias. |
| `package.json` | Package manifest and scripts. |

### `personal_marketing/lib/`

| File | Description |
|------|-------------|
| `game.js` | Creates the `Game` and `GameStateManager` instances; adds all locations. |
| `locations.js` | Location definitions (places Anastacia can visit). |

Additional files will be added here as the game grows (e.g. `npcs.js`, `items.js`, `interactions.js`).

## `source/`

The Edwin engine. Do not modify this directly for game features — treat it as a third-party library. See [how-to-use-edwin.md](how-to-use-edwin.md) for its API.

## `examples/`

Standalone applications showing how to use Edwin. Useful as reference, but not the main project.
