# Secure Attendance Ecosystem

Enterprise-grade attendance platform with anti-fraud verification, live monitoring, and mobile-first workflows.

This repository now contains a production-oriented monorepo scaffold for:

- Expo React Native mobile app
- Next.js web dashboard
- NestJS backend API
- PostgreSQL Prisma schema
- Redis and Socket.IO real-time infrastructure
- Shared security and contract packages

## What changed

The original repository described a QR/geofence attendance app. The current implementation expands that into a hardened attendance ecosystem with:

- Rolling signed QR tokens
- Location-aware fraud scoring
- Device-bound session logic
- WebSocket live feeds
- Notifications and analytics modules
- Role-aware mobile and web entry points

## Repository layout

- `apps/api` - NestJS API, websocket gateway, attendance engine, auth, notifications, analytics
- `apps/mobile` - Expo Router app for student and teacher workflows
- `apps/web` - Next.js console for admin, teacher, and student dashboards
- `packages/contracts` - Shared Zod schemas and TypeScript contracts
- `packages/security` - Geo, token, and fraud helpers
- `packages/ui` - Shared UI utilities
- `apps/api/prisma` - PostgreSQL schema for institutions, sessions, records, logs, and analytics cache
- `infra` - Docker Compose and deployment scaffolding

## Core capabilities in this scaffold

- JWT-ready auth/session architecture with refresh rotation
- Dynamic attendance session creation with rotating QR payloads
- Fraud scoring for replay, spoofing, stale QR, and suspicious behavior
- Attendance status lifecycle: present, late, suspicious, rejected, manual review
- Notification and analytics entry points for live operations

## Docs

- [System Workflow](docs/system-workflow.md)
- [Sequence Diagrams](docs/sequence-diagrams.md)
- [Tech Stack](docs/tech-stack.md)
- [Future Scope](docs/future-scope.md)

## Local environment

Copy `.env.example` to `.env` and set the service secrets and database URLs. The API, web app, and mobile app all read from these values during local development.

For a Docker-based setup, use `infra/docker-compose.yml` as the backing services layer and point `DATABASE_URL` / `REDIS_URL` at the container network when running inside Compose.

## Local run

1. Copy `.env.example` to `.env`.
2. Start the infrastructure with `docker compose -f infra/docker-compose.yml up --build`.
3. If you want seed data, run `pnpm --filter @secure-attendance/api prisma:seed` after Postgres is up.
4. Demo login credentials from the seed are `teacher@nexus.edu` or `student@nexus.edu` with password `Password123!`.

## Mobile app

1. Copy `.env.example` to `apps/mobile/.env` and keep `EXPO_PUBLIC_API_URL=http://localhost:4000/api/v1`.
2. Start the API first so the mobile app has a backend to talk to.
3. Run `pnpm --filter @secure-attendance/mobile start`.
4. Open the Expo dev tools and choose a simulator, emulator, or the Expo Go app on your phone.
5. If you test on a physical device, replace `localhost` in `EXPO_PUBLIC_API_URL` with your machine's LAN IP address.

## Note

This is a scaffolded enterprise implementation, not a toy demo. The backend logic and schema are structured for server-side validation, role separation, and future production wiring to real persistence and push providers.
