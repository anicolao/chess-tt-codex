# Development Standards

## Technology Stack

- Frontend: SvelteKit with Svelte 5
- State management: Redux
- State evolution model: event sourcing for both game and UI state
- Deployment: static site via `@sveltejs/adapter-static`
- Hosting: GitHub Pages with production and per-PR preview paths
- Unit testing: Vitest
- E2E testing: Playwright with zero-pixel screenshot tolerance
- Package manager: `npm`
- Runtime baseline: Node.js 20

## Architecture Rules

### Redux + Event Sourcing

This repository does not use ad hoc mutable component state as the system of record.

- Game state must be driven by Redux reducers.
- UI state must also be represented in Redux.
- State changes should be modeled as append-only events where practical.
- Reducers are responsible for interpreting those events into present state.

### Static Hosting + Base Path Discipline

The app must be deployable to GitHub Pages under a configurable base path.

- Production builds use `/chess-tt-codex`.
- PR previews use `/chess-tt-codex/pr{number}`.
- SvelteKit configuration must respect `PUBLIC_BASE_PATH`.
- Routes, assets, links, and tests must work when the app is served from a subpath.

## Testing Policy

### General

- If a feature is not covered by tests, assume it is untrusted.
- Unit tests protect pure logic and reducers.
- E2E tests protect user-facing behavior and visual regressions.

### Hard Rules

- `waitForTimeout` is banned in tests.
- Timeouts greater than `2000ms` are banned in tests and test config.
- Screenshot diff tolerance must remain exactly zero pixels.
- Skipping broken E2E tests instead of fixing them is not acceptable.

### Required Commands

- `npm run verify:policy`
- `npm run check`
- `npm run test:unit`
- `npm run test:e2e`

## Git Hooks

Husky is required.

- `pre-commit` must run policy verification and unit tests.
- `pre-push` must run policy verification, `check`, unit tests, and E2E tests.

## CI Workflows

The repository must keep these workflows active:

- `check.yml`: install, verify policy, run `check`, run unit tests
- `e2e.yml`: install, verify policy, run Playwright E2E tests, upload artifacts
- `deploy.yml`: install, verify policy, build, deploy GitHub Pages output, publish PR preview URL comments

## Styling

- Use plain Svelte component CSS.
- Do not adopt Tailwind for this project.
- Keep the board as the dominant visual element; UI chrome is secondary.
