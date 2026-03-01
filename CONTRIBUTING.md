# Contributing

Thanks for your interest in contributing to Scan 2 Pass.

## Prerequisites

- Node.js 22
- npm

## Local setup

1. Fork and clone the repository.
2. Install dependencies:
   - `npm ci`
3. Create your local environment file:
   - `cp .env.example .env`
4. Start the app:
   - `npm run dev`

## Development rules

- Keep changes focused and small.
- Follow existing code style and project structure.
- Do not commit secrets.
- Keep all user-facing text and configuration aligned with the environment-variable strategy.

## Before opening a pull request

Run:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run test:e2e`

If you need to control Playwright server reuse locally:

- `PLAYWRIGHT_REUSE_EXISTING_SERVER=true npm run test:e2e`

## Pull request checklist

- Describe the goal and what changed.
- Link related request/backlog/task files when relevant.
- Add or update tests when behavior changes.
- Update documentation (`README`, `.env.example`, `logics`) if needed.
