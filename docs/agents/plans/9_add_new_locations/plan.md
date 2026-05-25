# Plan: Add New Locations

## Overview

Expand the game world from a single location to six locations. Rename the existing `home` to `Living Room`, add five new rooms/areas, wire bidirectional navigation paths between them, and provide a 1×1 black pixel PNG as a background image placeholder for each new location.

## Context

The game currently has one location (`home`). The issue asks to:
- Rename it to `Living Room` (id: `living_room`).
- Add: `Bedroom`, `Bathroom`, `Town Square`, `Coffee Shop`, `Grocery`.
- Wire navigation according to the table below (all bidirectional unless a custom label is noted):

| From | To | Label override |
|------|----|----------------|
| Living Room | Bedroom | — |
| Living Room | Bathroom | — |
| Living Room | Town Square | "Outside" (from Living Room) / "Home" (from Town Square) |
| Bedroom | Bathroom | — |
| Town Square | Coffee Shop | — |
| Town Square | Grocery | — |

- Each new location gets a 1×1 black pixel PNG as a placeholder background image.

## Implementation Steps

### Step 1 — Add placeholder images

Create a 1×1 black pixel PNG file for each new location under `personal_marketing/assets/images/locations/`:

- `bedroom.png`
- `bathroom.png`
- `town_square.png`
- `coffee_shop.png`
- `grocery.png`

The existing `home.png` is kept as-is (it will be re-used for `living_room` until a real image is provided, or renamed — see Notes).

### Step 2 — Update `locations.js`

- Rename the `home` location: change `id` to `'living_room'`, `name` to `'Living Room'`, and update the image import to use `home.png` (or rename the file to `living_room.png`).
- Define the five new `Location` instances with their ids, names, descriptions, and placeholder image imports.
- Add `paths` to each location according to the navigation table. Use plain path objects `{ target: '<id>', label: '<label>' }` where a custom label is needed.

### Step 3 — Update `game.js`

- Import all six locations.
- Register each with `game.addLocation(...)`.
- Update `game.setStartLocation('living_room')`.

## Files to Change

- `personal_marketing/assets/images/locations/bedroom.png` — new 1×1 black placeholder
- `personal_marketing/assets/images/locations/bathroom.png` — new 1×1 black placeholder
- `personal_marketing/assets/images/locations/town_square.png` — new 1×1 black placeholder
- `personal_marketing/assets/images/locations/coffee_shop.png` — new 1×1 black placeholder
- `personal_marketing/assets/images/locations/grocery.png` — new 1×1 black placeholder
- `personal_marketing/lib/locations.js` — rename `home` → `living_room`, add five new locations with paths
- `personal_marketing/lib/game.js` — import and register all locations, update start location

## Notes

- The `home` location currently uses `home.png`. Decide whether to rename the file to `living_room.png` or keep it as `home.png` with a re-import alias. Renaming is cleaner but is a one-line change worth making.
- Path direction: paths are bidirectional by convention, but each `Location` must declare its own outbound path. Both sides must be wired explicitly.
- No tests currently exist for location navigation — add them if a test pattern is established in `spec/`.
