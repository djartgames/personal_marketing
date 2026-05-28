# Plan: Add More Locations

## Overview

Expand the game world by adding a Downtown hub and several new locations, plus connecting them to the existing Town Square. Each new location gets a 1×1 pixel black placeholder image.

## Context

The game currently has Town Square as the only hub, with access to Home, Coffee Shop, and Grocery. This issue adds two new groups of locations:

- **From Town Square:** Marketing Company (with Office and Factory sub-locations) and Photographer, plus a bidirectional path to Downtown.
- **From Downtown:** Big Office, Construction Company Office (which leads to Construction Site), Bar, Gym, and Shopping Mall (placeholder only).

## Implementation Steps

### Step 1 — Add placeholder images

Create a 1×1 pixel black PNG for each new location in `personal_marketing/assets/images/locations/`:

- `downtown.png`
- `marketing_company.png`
- `marketing_company_office.png`
- `factory.png`
- `photographer.png`
- `big_office.png`
- `construction_company_office.png`
- `construction_site.png`
- `bar.png`
- `gym.png`
- `shopping_mall.png`

### Step 2 — Create new location files

Create one file per location in `personal_marketing/lib/locations/`, following the existing class pattern (extend `Location`, import image, export class):

| File | ID | Name | Paths out |
|------|----|------|-----------|
| `downtown.js` | `downtown` | Downtown | `town_square`, `big_office`, `construction_company_office`, `bar`, `gym`, `shopping_mall` |
| `marketing_company.js` | `marketing_company` | Marketing Company | `town_square`, `marketing_company_office`, `factory` |
| `marketing_company_office.js` | `marketing_company_office` | Office | `marketing_company` |
| `factory.js` | `factory` | Factory | `marketing_company` |
| `photographer.js` | `photographer` | Photographer | `town_square` |
| `big_office.js` | `big_office` | Big Office | `downtown` |
| `construction_company_office.js` | `construction_company_office` | Construction Company Office | `downtown`, `construction_site` |
| `construction_site.js` | `construction_site` | Construction Site | `construction_company_office` |
| `bar.js` | `bar` | Bar | `downtown` |
| `gym.js` | `gym` | Gym | `downtown` |
| `shopping_mall.js` | `shopping_mall` | Shopping Mall | `downtown` |

### Step 3 — Update Town Square

Add three new paths to `personal_marketing/lib/locations/town_square.js`:

- `downtown` → Downtown
- `marketing_company` → Marketing Company
- `photographer` → Photographer

### Step 4 — Register in index and game

- `personal_marketing/lib/locations/index.js` — import and export all 11 new location instances.
- `personal_marketing/lib/game.js` — call `game.addLocation(...)` for each new location.

## Files to Change

- `personal_marketing/assets/images/locations/` — add 11 placeholder PNGs (1×1 black pixel)
- `personal_marketing/lib/locations/town_square.js` — add paths to `downtown`, `marketing_company`, `photographer`
- `personal_marketing/lib/locations/downtown.js` — new file
- `personal_marketing/lib/locations/marketing_company.js` — new file
- `personal_marketing/lib/locations/marketing_company_office.js` — new file
- `personal_marketing/lib/locations/factory.js` — new file
- `personal_marketing/lib/locations/photographer.js` — new file
- `personal_marketing/lib/locations/big_office.js` — new file
- `personal_marketing/lib/locations/construction_company_office.js` — new file
- `personal_marketing/lib/locations/construction_site.js` — new file
- `personal_marketing/lib/locations/bar.js` — new file
- `personal_marketing/lib/locations/gym.js` — new file
- `personal_marketing/lib/locations/shopping_mall.js` — new file
- `personal_marketing/lib/locations/index.js` — import and export all new locations
- `personal_marketing/lib/game.js` — register all new locations

## Notes

- Shopping Mall is listed as "to be implemented later" — it gets a location file and placeholder image now, but no sub-locations or content yet.
- All paths are bidirectional by convention (each side declares its own path back).
- The `downtown` ↔ `town_square` path is the only cross-hub connection at this stage.
