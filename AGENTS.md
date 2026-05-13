# Project Instructions

Edwin is an npm package (distributed via yarn) that provides a text-based RPG game engine for the browser. It renders game content — scenes, dialogue, choices, and images — using React components styled with Bootstrap. The package is designed to be embedded in any HTML page and driven by a declarative game definition.

## Stack

- **Runtime:** Node.js
- **UI:** React, Bootstrap
- **Distribution:** npm package (yarn)
- **Language:** JavaScript / JSX

## Conventions

### Language

All code, comments, documentation, and commit messages must be written in **English**.

For full contribution guidelines — commit rules, PR standards, code organization, dependency injection, and refactoring — see [docs/agents/contributing.md](docs/agents/contributing.md).

## Documentation

All project documentation lives under [`docs/agents/`](docs/agents/):

| File | Contents |
|------|----------|
| [Folder Structure](docs/agents/folder-structure.md) | Top-level directory layout and the role of each folder. |
| [Architecture](docs/agents/architecture.md) | Source layout, modules, code style, and implementation guidelines. |
| [Flow](docs/agents/flow.md) | Main runtime flow of the application. |
| [Contributing](docs/agents/contributing.md) | Commit guidelines, PR standards, code organization, and refactoring rules. |
| [Plans](docs/agents/plans/) | Implementation plans for ongoing or upcoming features. |
| [Issues](docs/agents/issues/) | Detailed specs for open issues. |

### Issues (`docs/agents/issues/`)

Each file documents an issue in detail. Naming convention:

```
docs/agents/issues/<issue_id>_<issue_name>.md
```

Example: `docs/agents/issues/5_release_npm_package.md` for issue #5.

### Plans (`docs/agents/plans/`)

Each plan is a directory named after the issue ID and topic, containing one or more related files:

```
docs/agents/plans/<issue_id>_<topic>/<related_files>.md
```

Example: `docs/agents/plans/12_add-scene-renderer/plan.md` for issue #12.
