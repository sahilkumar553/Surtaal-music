## Overview
- Firebase stays for auth only.
- New Express API (server/index.js) stores competitions and media in MongoDB.
- Frontend talks to the API via REST + polling, defaulting to http://localhost:4000/api.

## Setup
1) Install deps
- pnpm install
- pnpm --dir src/frontend install (if you prefer per-package install)

2) Create env files (place them in src/frontend/.env)
- MONGODB_URI=your-connection-string
- MONGODB_DB_NAME=sur-taal (optional)
- PORT=4000 (optional API port)
- CORS_ORIGIN=http://localhost:3000 (comma-separated if multiple)
- VITE_API_BASE_URL=http://localhost:4000/api (frontend -> API)

## Run
- API: pnpm --dir src/frontend server
- Frontend: pnpm --dir src/frontend start

## API routes
- GET /api/competitions
- POST /api/competitions
- DELETE /api/competitions/:id
- GET /api/media
- POST /api/media
- DELETE /api/media/:id
