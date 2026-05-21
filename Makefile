.PHONY: help dev dev-up

COMPOSE ?= docker compose
DEV_SHELL ?= /bin/bash
APP_SERVICE ?= personal_marketing_example

help:
	@echo "Usage:"
	@echo "  make dev        Open a shell inside the personal_marketing container"
	@echo "  make dev-up     Start the personal_marketing dev server"

dev: .env
	$(COMPOSE) run $(APP_SERVICE) $(DEV_SHELL)

dev-up: .env
	$(COMPOSE) up $(APP_SERVICE)

.env:
	cp .env.sample .env
