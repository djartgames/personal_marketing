# Contributing

## Commit Guidelines

- **Atomic and Unitary:** Each commit must represent a single logical change.  
  *Example:*  
  - Good: `Add paths() method to Location`  
  - Bad: `Add paths() and refactor GameStateManager logic`
- **No Unrelated Changes:** Do not mix unrelated changes in the same commit.
- **Separate Refactoring:** Whenever possible, separate refactoring commits from new feature or bugfix commits.

## Pull Requests

- **Descriptive Summary:** Every PR must include a clear and descriptive summary of its purpose and changes.
- **PR Description Files:** If a description cannot be provided directly in the PR, generate a file with the PR description (e.g., `docs/agents/issues/<pr_number>_description.md`), but do not commit this file.

### PR Description Template

Every PR description must follow this structure:

```markdown
## Issue

Brief description of the problem or requirement this PR addresses.
Reference the GitHub issue number if applicable (e.g., "Fixes #123").

## Solution

Brief description of the approach taken to solve the issue.
Focus on *what* was done and *why* this approach was chosen.

## Details

Any additional information that helps reviewers understand the changes:
- Notable implementation decisions
- Trade-offs considered
- Areas that may need extra attention
- Testing notes or edge cases covered

Omit this section if there is nothing relevant to add.
```

## Definition of Done for PRs

A PR is considered complete when:

- The stated objective has been achieved.
- All tests are passing.
- Linting passes without errors.
- Code coverage is as high as reasonably possible.
- Code is not overly complex:
  - Classes and methods should have clear, focused responsibilities.
  - If a class or method is taking on too many responsibilities, refactor to simplify.
  - Methods should be small and do exactly one thing. If a method is growing, extract parts into private helper methods or separate classes.
  - *Example (pseudo-code):*
    ```js
    // Good: Each method does one thing
    class GameStateManager {
      loadState() { ... }
      saveState() { ... }
    }

    // Bad: Method does too much
    class GameStateManager {
      run() {
        this.loadState();
        this.applyRules();
        this.saveState();
        this.notifyUI();
      }
    }
    ```
  - This requirement applies primarily to source code. For specs, refactor only if there is excessive duplication.

### CI Checks

Before a PR is considered complete, all CI checks relevant to the modified parts of the project must pass. Run only the checks that correspond to the folders you changed, **always inside the Docker container**:

```bash
make dev
# Then, inside the container:
```

| Modified folder | Commands to run inside the container |
|-----------------|--------------------------------------|
| `source/lib/`   | `yarn coverage && yarn lint`         |
| `source/spec/`  | `yarn coverage`                      |

If a new package folder is added in the future, its corresponding test and lint commands must be run before merging any changes to that folder.

### Running tests and lint

All development commands must be executed inside the Docker container — do not rely on a local Node.js installation.

Open the dev shell with:

```bash
make dev
```

Then, inside the container:

```bash
# Run tests with coverage report
yarn coverage

# Run the linter
yarn lint

# Fix lint issues automatically
yarn lint_fix
```

To run a single test file:

```bash
yarn test source/spec/path/to/YourFile.test.js
```

## Code Organization

### File Responsibility: Class Declarers vs Scripts

Every source file (excluding test files) must act as a **class declarer** — it should define and export one or more classes, components, or modules. Files must not act as **scripts** (i.e., they must not execute logic at import time or perform side effects directly).

The only exception is the **entrypoint**:

| Application | Entrypoint |
|-------------|------------|
| npm package (`source/`) | `source/lib/index.js` |

*Example:*
```jsx
// Good: class declarer — defines and exports a component
function SceneRenderer({ scene }) {
  return <div>{scene.description}</div>;
}
export default SceneRenderer;

// Bad: script — executes logic at module level
const renderer = new SceneRenderer(defaultScene);
export default renderer;
```

Test files are exempt from this rule and may import modules and execute setup code freely.

### File Naming: PascalCase for Class and Component Files

Files that define and export a class or React component must use **PascalCase** naming, matching the export name exactly.

*Examples:*

- `GameStateManager.js` for `class GameStateManager`
- `SceneRenderer.jsx` for `function SceneRenderer`
- `DialogueTree.jsx` for `function DialogueTree`
- `EventSystem.js` for `class EventSystem`

This applies to both source files and their corresponding test files:

- `GameStateManager.js` → test: `GameStateManager.test.js`
- `SceneRenderer.jsx` → test: `SceneRenderer.test.jsx`

Non-class files (e.g., hooks, utility modules) use camelCase at the author's discretion:

- `useGameState.js` for `function useGameState`

### Method Order: Public Before Private

Within a class, **public methods must be declared before private methods**. Private methods (prefixed with `#`) serve as implementation helpers and should appear at the end of the class body.

*Example:*
```js
// Good: public methods first, private methods last
class GameStateManager {
  loadState() {
    this.#deserialize();
  }

  saveState() {
    this.#serialize();
  }

  #deserialize() { ... }
  #serialize() { ... }
}

// Bad: private methods mixed in with or before public methods
class GameStateManager {
  #deserialize() { ... }

  loadState() { ... }

  #serialize() { ... }
}
```

## Dependency Injection

Classes must receive their dependencies (data, configuration, collaborators) as constructor arguments. A class must never reach out to load files, read environment variables, or fetch configuration on its own.

**The entry script is the only place responsible for wiring dependencies.** It then passes the loaded data down to the classes that need it.

This makes every class independently testable: tests simply instantiate the class with the data they need, without touching the filesystem or environment.

*Example:*
```js
// Good: class receives data as an argument — easy to test
class GameStateManager {
  constructor(game) {
    this._game = game;
  }
  loadState() { ... }
}

// In the app entrypoint:
const game = new Game(gameDefinition);
const manager = new GameStateManager(game);

// Bad: class loads its own config — hard to test and couples to the environment
class GameStateManager {
  loadState() {
    const saved = JSON.parse(localStorage.getItem('game')); // ❌
    ...
  }
}
```

This principle applies to all classes — including hooks, renderers, and managers. If a class needs data, it gets it through its constructor.

## Refactoring Guidelines

When refactoring, aim to:

- **Reduce Code Duplication:**
  *Example:* Move repeated setup code in tests to a factory function.
  ```js
  // Good
  function buildLocation(attrs = {}) {
    return new Location({ id: 'room', name: 'Room', ...attrs });
  }
  // In tests:
  const loc = buildLocation({ name: 'Dark Forest' });

  // Bad
  const loc = new Location({ id: 'room', name: 'Dark Forest' });
  // ...repeated in many test files
  ```
