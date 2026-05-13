# Examples

## Overview

The `examples/` directory at the project root contains standalone applications that demonstrate how to use Edwin as a consumer would. Each example is an independent project with its own configuration files, Docker container, and dev server.

## Structure

```
examples/
  basic-rpg/       # minimal game: locations, navigation, items, one NPC
  advanced-rpg/    # full-featured game: branching dialogue, flags, conditional actions
```

Each folder is a self-contained Vite + React application:

```
examples/<name>/
  game.js          # game world definition
  main.jsx         # React application root
  index.html       # HTML entry point
  vite.config.js   # Vite config with edwin alias
  package.json     # app manifest and scripts
  .eslintrc.json   # ESLint rules
```

## Edwin as a Sibling Dependency

The examples do not install Edwin from npm. Instead, Edwin's source code is injected into the container as a sibling mount:

```
/home/node/app/          ← example app root (e.g. examples/basic-rpg)
/home/node/app/edwin/    ← Edwin source (mounted from ./source)
/home/node/app/node_modules/  ← shared node_modules volume
```

The `vite.config.js` in each example defines a `resolve.alias` so that `import { ... } from 'edwin'` resolves to `/home/node/app/edwin/src/index.js`:

```js
resolve: {
  alias: {
    edwin: resolve(__dirname, 'edwin/src/index.js'),
  },
},
```

## Docker Compose

Each example has its own service in `docker-compose.yml`:

```yaml
basic_example:
  volumes:
    - ./examples/basic-rpg:/home/node/app
    - ./source:/home/node/app/edwin
    - ./docker_volumes/node_modules:/home/node/app/node_modules
  ports:
    - "3000:3000"
  command: npx vite --host 0.0.0.0 --port 3000

advanced_example:
  volumes:
    - ./examples/advanced-rpg:/home/node/app
    - ./source:/home/node/app/edwin
    - ./docker_volumes/node_modules:/home/node/app/node_modules
  ports:
    - "3010:3010"
  command: npx vite --host 0.0.0.0 --port 3010
```

## Running

```bash
# Start the build image first (only needed once)
docker-compose up base_build

# Run an example
docker-compose up basic_example    # http://localhost:3000
docker-compose up advanced_example # http://localhost:3010
```

## Shared node_modules

All containers mount the same `./docker_volumes/node_modules` volume. This means installing a new package must be done inside the `edwin_dev` container (or by rebuilding the image). Each example's `package.json` documents its dependencies for reference but does not manage its own install.
