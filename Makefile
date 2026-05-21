.PHONY: help setup dev tests build-dev build build-httpd build-image release update-description dev-app-up

PROJECT ?= edwin
COMPOSE ?= docker compose
APP_SERVICE ?= $(PROJECT)_dev
DEV_SHELL ?= /bin/bash
IMAGE ?= $(PROJECT)
APP_IMAGE ?= $(PROJECT)_app
DOCKERFILE_DEV ?= dockerfiles/dev_edwin/Dockerfile
PLATFORM := linux/amd64

help:
	@echo "Usage:"
	@echo "  make dev        Open $(APP_SERVICE) container with $(DEV_SHELL)"

dev: .env
	$(COMPOSE) run $(APP_SERVICE) $(DEV_SHELL)

.env:
	cp .env.sample .env
