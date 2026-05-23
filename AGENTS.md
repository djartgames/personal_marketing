# Project Instructions

Personal Marketing is a text-based RPG game built with the **Edwin** engine. The player follows **Anastacia**, who must complete marketing jobs to save her struggling company.

Edwin (`source/`) is the underlying RPG engine — a React-based npm package that renders scenes, dialogue, choices, and images using React and Bootstrap.

## Stack

- **Runtime:** Node.js
- **UI:** React, Bootstrap
- **Engine:** Edwin (from `source/`)
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
| [Architecture](docs/agents/architecture.md) | Game app layout, modules, code style, and implementation guidelines. |
| [Flow](docs/agents/flow.md) | Main game flow and Anastacia's story. |
| [Contributing](docs/agents/contributing.md) | Commit guidelines, PR standards, code organization, and refactoring rules. |
| [How to Use Edwin](docs/agents/how-to-use-edwin.md) | Step-by-step guide for building with the Edwin engine. |
| [Plans](docs/agents/plans/) | Implementation plans for ongoing or upcoming features. |
| [Issues](docs/agents/issues/) | Detailed specs for open issues. |

### Issues (`docs/agents/issues/`)

Each file documents an issue in detail. Naming convention:

```
docs/agents/issues/<issue_id>_<issue_name>.md
```

Example: `docs/agents/issues/5_add_home_location.md` for issue #5.

### Plans (`docs/agents/plans/`)

Each plan is a directory named after the issue ID and topic, containing one or more related files:

```
docs/agents/plans/<issue_id>_<topic>/<related_files>.md
```

Example: `docs/agents/plans/12_add-job-system/plan.md` for issue #12.
