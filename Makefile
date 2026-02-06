.PHONY: build up down rebuild logs clean dev install

# ---------- Docker ----------

## Build the Docker image
build:
	docker compose build

## Start containers in background
up:
	docker compose up -d

## Stop and remove containers
down:
	docker compose down

## Rebuild image from scratch and restart
rebuild:
	docker compose down
	docker compose build --no-cache
	docker compose up -d

## Show container logs (follow mode)
logs:
	docker compose logs -f frontend

## Remove containers, images and build cache
clean:
	docker compose down --rmi local --volumes --remove-orphans

# ---------- Local dev (no Docker) ----------

## Install npm dependencies
install:
	npm install

## Start Vite dev server (requires npm install first)
dev:
	npm run dev

# ---------- Help ----------

## Show this help
help:
	@echo ""
	@echo "  Lista Zakupow - available commands:"
	@echo "  ------------------------------------"
	@echo "  make build     - Build Docker image"
	@echo "  make up        - Start container (port 3000)"
	@echo "  make down      - Stop container"
	@echo "  make rebuild   - Full rebuild from scratch"
	@echo "  make logs      - Follow container logs"
	@echo "  make clean     - Remove everything (containers, images)"
	@echo "  make install   - npm install (local dev)"
	@echo "  make dev       - Start Vite dev server (local dev)"
	@echo ""
