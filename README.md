# Personal Marketing

[![Build Status](https://circleci.com/gh/djartgames/personal_marketing.svg?style=shield)](https://circleci.com/gh/djartgames/personal_marketing)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/898ec2d0ad094e6fbf28802ea3d96c7a)](https://app.codacy.com/gh/djartgames/personal_marketing/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)


A text-based RPG where **Anastacia** must complete marketing jobs to save her struggling company. Built with the [Edwin](source/) engine.

---

## Development

### Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Start the dev server

```bash
make dev-up
```

Open [http://localhost:3050](http://localhost:3050) in your browser.

### Open a dev shell

```bash
make dev
```

From inside the container:

```bash
# Run tests with coverage report
npm run coverage

# Run the linter
npm run lint

# Fix lint issues automatically
npm run lint_fix
```

---

## Documentation

See [`docs/agents/`](docs/agents/) for architecture, flow, and contribution guidelines.
