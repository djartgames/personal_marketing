# Architecture

## Overview

Edwin is a React-based game engine. The source code is split into three layers: **entities** (pure domain logic), **hooks** (React state bridges), and **components** (UI rendering).

## Component Structure

Each UI component in `source/lib/components/` follows a three-layer split:

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **Component** (`.jsx`) | `components/` | Thin rendering layer — wires props to helpers and controllers, delegates all logic |
| **Helper** (`.jsx`) | `components/helpers/` | Generates JSX fragments for conditional or repeated markup; one class per component |
| **Controller** (`.js`) | `components/controllers/` | Plain JS class handling non-React business logic; testable without a renderer |

### Rules

- Any JSX guarded by a condition (`condition && <JSX />`) must be extracted into a helper method.
- Methods should be as small as possible — each method does exactly one thing.
- Helper and controller classes are instantiated with the props or callbacks they need; they hold no React state.
- Specs for helpers live in `source/spec/components/helpers/`, specs for controllers in `source/spec/components/controllers/`.

## Source Code Layout

_See [folder-structure.md](folder-structure.md) for a full directory breakdown._
