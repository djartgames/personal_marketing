# Issue: Add Image for Locations

## Description
Locations can now have an image associated with them. The home location needs its image added, and the system must support location images both during development (Vite server) and in the final production build.

## Problem
- The home location (and other locations) lack images even though the engine supports them
- Images must work correctly in both the Vite dev server and the built HTML output

## Expected Behavior
- Location images are stored under `personal_marketing/assets/images/locations/`
- Images are imported and assigned when defining a location:

```javascript
import homeImage from '../assets/images/locations/home.png';

new Location({
  ...,
  image: homeImage,
  ...
});
```

- Images render correctly during development (`vite`) and after building

## Solution
- Add the home image file to `personal_marketing/assets/images/locations/home.png`
- Import and assign the image in the home location definition
- Verify image loads with `vite` dev server and in the production build output

## Benefits
- Richer visual experience for players as each location has a representative image

---
See issue for details: https://github.com/djartgames/personal_marketing/issues/5
