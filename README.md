# Edwin RPG Game Engine

[![Build Status](https://circleci.com/gh/darthjee/edwin.svg?style=shield)](https://circleci.com/gh/darthjee/edwin)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/73a57e8c97764403a492f02df32ed4b6)](https://app.codacy.com/gh/darthjee/edwin/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/73a57e8c97764403a492f02df32ed4b6)](https://app.codacy.com/gh/darthjee/edwin/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)

**Edwin** is a specialized Node.js package designed to streamline the development of text-based Role-Playing Game (RPG) web applications. It provides a comprehensive framework that bridges game logic and web presentation using **React** and **Bootstrap**.

---

## Features

- **Clean Architecture** – game logic is fully decoupled from the UI
- **React + JSX** – component-based UI with custom hooks
- **Bootstrap 5** – responsive, accessible styling out of the box
- **Zero-backend persistence** – save/load via `localStorage`
- **Event-driven** – lightweight pub/sub `EventSystem` for async coordination
- **Vite** – fast dev server and optimised production builds
- **Docker** – ready-to-use development container
- **Vitest** – unit and integration tests

---

## Development

### Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Getting started

```bash
make dev
```

This opens a shell inside the development container. From there:

```bash
# Run tests with coverage report
yarn coverage

# Run the linter
yarn lint

# Fix lint issues automatically
yarn lint_fix
```

---

## Using Edwin in your application

See [docs/HOW-TO-USE-EDWIN.md](docs/HOW-TO-USE-EDWIN.md) for a step-by-step guide on how to integrate Edwin into your own project.
