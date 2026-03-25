# E2E Testing Guide

This project uses Playwright for end-to-end testing. E2E tests are the primary source of truth for user-facing correctness.

## Core Policy

### Zero-Pixel Tolerance

Visual regression is strict.

- `toHaveScreenshot` must use `maxDiffPixels: 0`.
- Baseline screenshots are committed to the repository.
- Rendering must be deterministic locally and in CI.

### Timeout Discipline

The testing bar is intentionally strict.

- No test timeout may exceed `2000ms`.
- No assertion timeout may exceed `2000ms`.
- `waitForTimeout` is banned.
- Do not use arbitrary sleeps, polling loops, or timing hacks.
- Wait on real UI conditions only.

Examples of acceptable waits:

- `await expect(locator).toBeVisible()`
- `await expect(locator).toHaveText(...)`
- `await page.waitForURL(...)`

Examples of banned patterns:

- `await page.waitForTimeout(300)`
- `await new Promise((resolve) => setTimeout(resolve, 5000))`
- `test.setTimeout(10000)`

## Required Directory Structure

All E2E coverage lives under `tests/e2e/`. Each scenario gets its own directory.

```text
tests/e2e/
  helpers/
  001-start-game/
    001-start-game.spec.ts
    README.md
    screenshots/
  002-basic-moves/
    002-basic-moves.spec.ts
    README.md
    screenshots/
```

Rules:

- One scenario directory per user story or acceptance slice.
- Scenario directories are numbered for stable ordering.
- Each scenario must contain one primary spec file.
- Each scenario must contain a `README.md` describing the verifications.
- Each scenario must contain committed screenshots in `screenshots/`.

## Scenario Documentation

Every scenario README should be human-readable and verify intent, not just mechanics.

Minimum structure:

```md
# Test: US-001: Start local game

## Initial Load

![Initial Load](./screenshots/000-initial-load.png)

**Verifications:**
- [x] App shell visible
- [x] New game action visible
```

## Helper Pattern

Shared helpers belong in `tests/e2e/helpers/`.

Future gameplay scenarios should use a unified helper pattern similar to the reference repos:

- one helper owns step numbering,
- one step creates one screenshot,
- one step records associated verifications,
- one scenario generates one README artifact.

Do not hand-manage screenshot numbering across many tests.

## Determinism Requirements

Playwright config must enforce:

- fixed viewport,
- fixed locale,
- fixed timezone,
- reduced motion,
- blocked service workers during tests,
- software rendering flags for Chromium,
- stable snapshot output paths.

If randomness is introduced later, it must be explicitly seeded.

## PR Standard

Every new MVP feature must ship with:

- at least one unit test if logic changed,
- at least one E2E scenario if user-facing behavior changed,
- updated screenshots and scenario README when visuals changed.
