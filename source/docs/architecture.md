# Edwin – Architecture Overview

Edwin follows **Clean Architecture** principles, separating concerns into
distinct layers that have no upward dependencies.

```
┌──────────────────────────────────┐
│           UI Layer               │  React components + hooks
│  (components/, hooks/)           │
└──────────────┬───────────────────┘
               │ reads/writes via GameStateManager
┌──────────────▼───────────────────┐
│           Core Layer             │  GameStateManager
│  (core/)                         │  bridges entities → React state
└──────────────┬───────────────────┘
               │ owns
┌──────────────▼───────────────────┐
│         Domain / Entity Layer    │  Game, Location, NPC, Item,
│  (entities/)                     │  Action, Interaction, EventSystem
└──────────────────────────────────┘
```

## Data Flow

1. The **entity layer** holds all game rules and mutable state.
2. `GameStateManager` subscribes to `EventSystem` events emitted by the
   `Game` instance.
3. On each event, it re-serialises state into a plain snapshot object and
   calls registered React `setState` callbacks.
4. React components read the snapshot via `useGame()` and call action
   dispatchers (e.g. `moveTo`, `pickUpItem`) which delegate to the live
   `Game` entity.

## localStorage Persistence

`Game.save()` serialises `{ currentLocationId, playerInventory, flags, log }`
to `localStorage` under the key `edwin_save_<gameId>`.  
`Game.load()` restores this state.  
No backend is required.
