# Edwin – API Reference

## Entities

### `Game`

| Member | Type | Description |
|--------|------|-------------|
| `id` | `string` | Unique game identifier |
| `title` | `string` | Display title |
| `locations` | `Map<string, Location>` | All registered locations |
| `playerInventory` | `Item[]` | Player's current items |
| `flags` | `object` | Arbitrary game state flags |
| `log` | `LogEntry[]` | Chronological event log |
| `events` | `EventSystem` | Internal event bus |
| `addLocation(loc)` | `void` | Register a location |
| `setStartLocation(id)` | `void` | Set the starting location |
| `moveTo(id)` | `void` | Move player to a location |
| `pickUpItem(item)` | `void` | Add item to inventory |
| `dropItem(id)` | `Item\|null` | Remove item from inventory |
| `hasItem(id)` | `boolean` | Inventory check |
| `setFlag(key, value)` | `void` | Set a game flag |
| `getFlag(key, default)` | `*` | Get a game flag |
| `save()` | `void` | Persist to localStorage |
| `load()` | `boolean` | Load from localStorage |
| `start(loadSave?)` | `void` | Begin or restart the game |

### `Location`

| Member | Type | Description |
|--------|------|-------------|
| `id` | `string` | Unique identifier |
| `name` | `string` | Display name |
| `description` | `string` | Long description |
| `paths` | `object` | direction → locationId |
| `items` | `Item[]` | Present items |
| `npcs` | `NPC[]` | Present NPCs |
| `isLocked` | `boolean` | Entry gate |
| `addPath(dir, id)` | `void` | Add exit |
| `addItem(item)` | `void` | Place item |
| `removeItem(id)` | `Item\|null` | Remove item |
| `addNPC(npc)` | `void` | Place NPC |
| `removeNPC(id)` | `NPC\|null` | Remove NPC |
| `lock()` / `unlock()` | `void` | Toggle lock state |

### `NPC`

| Member | Type | Description |
|--------|------|-------------|
| `id` | `string` | Unique identifier |
| `name` | `string` | Display name |
| `dialogue` | `Interaction\|null` | Primary dialogue tree |
| `startDialogue()` | `InteractionStep\|null` | Reset + return first step |
| `respondToChoice(idx, state)` | `InteractionStep\|null` | Advance dialogue |

### `Item`

| Member | Type | Description |
|--------|------|-------------|
| `id` | `string` | Unique identifier |
| `name` | `string` | Display name |
| `isPickable` | `boolean` | Can be picked up |
| `isUsable` | `boolean` | Has a use action |
| `state` | `string` | `world\|inventory\|equipped\|discarded` |
| `setState(s)` | `void` | Change item state |
| `use(ctx)` | `boolean` | Execute use callback |

### `Action`

| Member | Type | Description |
|--------|------|-------------|
| `id` | `string` | Unique identifier |
| `label` | `string` | Button label |
| `isAvailable(state)` | `boolean` | Precondition check |
| `execute(state)` | `void` | Run action |

### `Interaction`

| Member | Type | Description |
|--------|------|-------------|
| `id` | `string` | Unique identifier |
| `currentStep` | `object\|null` | Active step |
| `isComplete` | `boolean` | Done flag |
| `choose(idx, state)` | `object\|null` | Pick option, advance |
| `reset()` | `void` | Restart dialogue |

### `EventSystem`

| Member | Type | Description |
|--------|------|-------------|
| `on(event, fn)` | `Function` | Subscribe (returns unsub fn) |
| `once(event, fn)` | `Function` | Subscribe once |
| `off(event, fn)` | `void` | Unsubscribe |
| `emit(event, data)` | `void` | Publish |
| `clear(event?)` | `void` | Remove listeners |

---

## Core

### `GameStateManager`

| Member | Type | Description |
|--------|------|-------------|
| `game` | `Game` | The wrapped Game instance |
| `subscribe(cb)` | `Function` | Subscribe to state changes |
| `getSnapshot()` | `object` | Current state plain object |

---

## React Components

| Component | Key Props |
|-----------|-----------|
| `GameContainer` | `manager`, `actions?` |
| `LocationView` | `location`, `onPickUp?`, `onTalkTo?` |
| `Navigation` | `paths`, `onNavigate` |
| `ActionPanel` | `actions`, `onAction` |
| `Inventory` | `items`, `onDrop?`, `onUse?` |
| `EventLog` | `entries`, `maxEntries?` |
| `NPCDialog` | `npc`, `currentStep`, `onChoose`, `onClose` |

---

## Hooks

| Hook | Signature |
|------|-----------|
| `useGame(manager)` | Returns `{ state, moveTo, pickUpItem, dropItem, setFlag, save, load }` |
| `useLocation(state, moveTo)` | Returns `{ location, exits, navigate }` |
| `useInventory(state, dropItem)` | Returns `{ inventory, hasItem, drop }` |
