# Issue: Add New Locations

## Description

The game currently has only a single location. This issue adds multiple new locations and establishes a navigation graph between them, enriching the game world and giving the player more places to explore.

## Problem

- Only one location exists (home), making the game world feel flat and limited.
- There is no multi-room navigation system yet.

## Expected Behavior

The following locations should exist in the game:

- **Living Room** (renamed from Home)
- **Bedroom**
- **Bathroom**
- **Town Square**
- **Coffee Shop**
- **Grocery**

Navigation links (bidirectional unless noted):

| From | To | Label |
|------|----|-------|
| Living Room | Bedroom | — |
| Living Room | Bathroom | — |
| Living Room | Town Square | Outside |
| Bedroom | Bathroom | — |
| Town Square | Living Room | Home |
| Town Square | Coffee Shop | — |
| Town Square | Grocery | — |

## Solution

- Rename the existing `home` location to `living_room`.
- Create scene/location files for each new location: `bedroom`, `bathroom`, `town_square`, `coffee_shop`, `grocery`.
- Wire navigation choices between locations according to the table above, using custom labels where specified.
- For each new location, add a background image using a 1×1 black pixel PNG as a placeholder (to be replaced with real artwork later).

## Benefits

- Expands the explorable world, making gameplay more engaging.
- Provides the foundation for location-specific events and marketing jobs tied to different areas.

---
See issue for details: https://github.com/djartgames/personal_marketing/issues/9
