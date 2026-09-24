# Tool Library REST API

A REST API for a community tool library, built with Express 5. It lets you create, read, update and delete tools, filter the list, and returns clear JSON errors. Tools are stored in memory, so they reset when the server restarts.

## How to run

1. `npm install`
2. Copy `.env.example` to `.env` (`cp .env.example .env`)
3. `npm run dev` (or `npm start`)

Requires Node.js 24.

## Environment variables

- `PORT`: the port the server listens on. Defaults to 4000 if not set.

## Routes

| Method | Path | Description | Success |
|--------|------|-------------|---------|
| GET | /api/tools | List tools. Optional filters: `category`, `available` | 200 |
| GET | /api/tools/:id | Get one tool | 200 |
| POST | /api/tools | Create a tool | 201 |
| PUT | /api/tools/:id | Replace all fields of a tool | 200 |
| DELETE | /api/tools/:id | Delete a tool | 204 |

Errors use `{ "error": { "message": "...", "details": { ... } } }` with 400, 404 or 500.
