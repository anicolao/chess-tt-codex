# Chess TT Codex

`chess-tt-codex` is a client-side chess PWA for a large horizontal touchscreen table. Two players sit opposite each other, share one display, and play a fast, local over-the-board style game with touch input only.

This repository is currently a scaffold. It includes the product docs, workflow policy, testing policy, a minimal SvelteKit shell, and no chess gameplay implementation yet.

## Product Summary

The target experience is simple:

- Start a local two-player game in seconds.
- Let each player interact comfortably from their own side of the table.
- Keep the board, turn state, captures, and move history obvious at a glance.
- Run fully client-side with no server dependency.

## Architecture Commitments

The implementation will follow the same broad shape used in `food` and `chess-clock`:

- SvelteKit + Svelte 5 for the UI
- Redux for both game state and UI state
- Event sourcing as the primary state evolution model
- Static deployment via `@sveltejs/adapter-static`
- GitHub Pages as the default hosting target
- Progressive Web App behavior with offline-friendly local play
- Deterministic client-side state management with an append-only move log

## Hard Requirements

These are not optional. They are inherited from the workflow and testing discipline in `food` and `chess-clock` and should be treated as repo policy once code is added.

- Node.js 20 is the baseline runtime for local development and CI.
- The repo must expose `dev`, `build`, `preview`, `check`, `test:unit`, `test:e2e`, and `verify:policy`.
- `npm run check` must fail on warnings, not just errors.
- Game state and UI state must use Redux with an event-sourced model.
- Playwright E2E tests are the primary acceptance mechanism for user-facing behavior.
- Vitest unit tests are mandatory for reducers, pure rules, and policy-critical config.
- Visual regression tests must use zero-pixel tolerance: `toHaveScreenshot({ maxDiffPixels: 0 })`.
- E2E runs must be deterministic: fixed viewport, fixed locale/timezone, reduced motion, software rendering flags, and no uncontrolled randomness.
- Test timeouts greater than `2000ms` are forbidden.
- Arbitrary waits such as `waitForTimeout` are banned; tests must wait on real UI conditions.
- Every MVP user story must have at least one E2E scenario with committed baseline screenshots and generated scenario documentation.
- Broken E2E tests are always in scope to fix; they must not be bypassed by relaxing screenshot thresholds or casually skipping tests.
- CI must include separate `check`, `e2e`, and `deploy` workflows.
- SvelteKit must honor `PUBLIC_BASE_PATH` so GitHub Pages PR previews work under subpaths.
- Pull requests to `main` must get a GitHub Pages preview deployment and a PR comment with the preview URL.
- Husky must enforce unit tests on pre-commit and the full suite on pre-push.
- The repository is licensed under GPLv3.

## Documents

- [VISION.md](./VISION.md): product intent and experience principles
- [MVP_DESIGN.md](./MVP_DESIGN.md): concrete MVP scope, architecture, and testing plan
- [DEVELOPMENT.md](./DEVELOPMENT.md): engineering standards and repo policy
- [E2E_GUIDE.md](./E2E_GUIDE.md): mandatory Playwright structure and rules

## Initial Repository Shape

The first implementation pass should preserve a simple structure:

```text
.github/workflows/
.husky/
scripts/
src/
  lib/
    game/
    store/
    ui/
tests/
  unit/
  e2e/
docs/
```

## MVP Scope

The first shipped version is intentionally narrow:

- Local two-player chess on one table
- Legal move enforcement
- Touch-first move input
- Clear top/bottom player orientation
- New game and simple move history

Out of scope for MVP:

- Online multiplayer
- AI opponent
- Accounts or cloud sync
- Analysis engine
- Tournament controls

## Deployment Target

Production hosting is expected to use GitHub Pages at the repository base path, with PR previews deployed to branch subpaths in the same style as the reference repos.

- Production path: `/chess-tt-codex`
- PR preview path: `/chess-tt-codex/pr{number}`
