# Issue: Add More Locations

## Description
The game currently has a set of locations and needs to be expanded. New locations can be added with a 1×1 pixel black image as a placeholder.

## Current Locations

### Town Square
Acts as a hub and provides access to:

- **Home** — entry point is the Living Room; sub-locations: Bathroom, Bedroom
- **Coffee Shop** — place for working as a barista
- **Grocery** — place to work as a cashier

## Locations to Add

### Town Square (modification)
Town Square will gain access to a new area: **Downtown** (bidirectional path).

New locations accessible from Town Square:

- **Marketing Company** — the company Anastacia inherited from her father
  - Office (sub-location)
  - Factory (sub-location)
- **Photographer** — the town photographer

### Downtown (new hub)
A new hub representing the larger part of the city. Accessible from Town Square.

New locations accessible from Downtown:

- **Big Office** — a big corporation
- **Construction Company Office** — leads to the Construction Site
- **Construction Site** — the construction area
- **Bar** — the downtown bar
- **Gym** — a place to get fit
- **Shopping Mall** — another hub of locations *(to be implemented later)*

## Solution
- Add new location modules for each new location listed above
- Update Town Square to include paths to Downtown, Marketing Company, and Photographer
- Add 1×1 pixel black placeholder images for new locations
- Register all new locations in the game map following Edwin engine conventions

## Benefits
- Significantly expands the game world and available job opportunities
- Provides richer narrative context for Anastacia's story

---
See issue for details: https://djart-github.com/djartgames/personal_marketing/issues/12
