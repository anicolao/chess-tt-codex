# MVP Design

## Goal

Deliver a local two-player chess game optimized for a large horizontal touchscreen table, with both players physically opposite each other and sharing one display.

## MVP Feature Set

### In Scope

- Standard chess starting position
- Two-player local hotseat play
- Legal move generation and enforcement
- Piece selection and destination highlighting
- Captures, check, checkmate, stalemate, and promotion
- Turn indicator visible from both sides
- Simple move list
- New game / reset flow
- Installable PWA behavior

### Explicitly Out Of Scope

- Chess engine or hints
- Remote multiplayer
- User accounts
- Cloud persistence
- Tournament clock integration
- Game import/export beyond basic internal move log

## UX Model

### Table Layout

The board remains centered and dominant.

- White-facing information lives on the bottom edge.
- Black-facing information lives on the top edge.
- Shared controls stay on the side edges or in neutral overlays.
- The board itself must remain readable from both sides without requiring the table to rotate.

### Input Model

Primary input is touch.

- Tap a piece to select it.
- Show legal destinations immediately.
- Tap a target square to commit the move.
- Tap elsewhere to clear selection.
- Promotion should use a large modal or strip with touch-sized options.

No keyboard shortcuts are required for MVP.

### Visual Priorities

- The board is the main visual object.
- Current player state must be obvious without reading small text.
- Illegal actions should fail quietly but clearly.
- Animations should be short and deterministic.

## Architecture

### Platform

- SvelteKit with Svelte 5
- Redux for game state and UI state
- Event-sourced reducers as the authoritative state model
- `@sveltejs/adapter-static`
- GitHub Pages deployment with `PUBLIC_BASE_PATH`
- PWA shell for installability and offline-friendly local play

### State Model

Use a deterministic Redux store with append-only events for both game state and UI state.

Core benefits:

- easy move history,
- replay/debug support,
- deterministic tests,
- clear separation between chess rules and UI concerns.

Suggested core Redux slices:

```ts
type GameState = {
  gameId: string;
  orientation: "white-bottom";
  board: PiecePlacement[];
  turn: "white" | "black";
  selectedSquare: Square | null;
  legalTargets: Square[];
  moveLog: MoveRecord[];
  capturedByWhite: PieceType[];
  capturedByBlack: PieceType[];
  status: "playing" | "check" | "checkmate" | "stalemate" | "promotion";
  pendingPromotion: PromotionState | null;
};

type UiState = {
  screen: "lobby" | "game";
  activeModal: "none" | "promotion" | "reset-confirm";
  announcements: string[];
  lastInteraction: "touch" | "mouse";
};
```

Suggested event types:

- `GAME_STARTED`
- `SQUARE_SELECTED`
- `MOVE_COMMITTED`
- `PROMOTION_CHOSEN`
- `GAME_RESET`

### Module Boundaries

Keep pure game logic isolated from rendering and Svelte components.

```text
src/lib/game/
  rules/        # Legal moves, check, mate, promotion
  model/        # Types, board coordinates, piece records
  notation/     # Move log formatting
src/lib/store/
  game/         # Redux slice + selectors for game state
  ui/           # Redux slice + selectors for UI state
  events/       # Shared event definitions and replay helpers
  store.ts      # Root Redux store
src/lib/ui/
  board/
  overlays/
  controls/
```

The chess rules layer must be framework-agnostic and directly testable.

## Route Strategy

MVP can stay simple.

- `/` for start screen and active game shell
- optional modal/overlay flows rather than many routes

This keeps the app fast and avoids unnecessary navigation complexity on a shared table.

## Persistence

MVP persistence should stay local only.

- local storage or IndexedDB for last in-progress game
- no server
- no authentication

If persistence creates complexity, it can be deferred until after first playable delivery.

## Testing Strategy

Testing policy should mirror the strongest constraints from `food` and `chess-clock`.

### Non-Negotiable Rules

- Playwright E2E tests are the source of truth for user-facing correctness.
- Vitest unit tests are required for reducers, rules, and other pure logic.
- Screenshot comparisons use zero-pixel tolerance only.
- Tests must run with deterministic rendering settings.
- Timeouts greater than `2000ms` are forbidden.
- `waitForTimeout` and similar arbitrary waits are banned.
- Every user story added to MVP must ship with an E2E scenario.
- `check` must fail on warnings.

### Planned Quality Gates

- `npm run check`
  - `svelte-kit sync`
  - `svelte-check --fail-on-warnings`
- `npm run test:unit`
  - Vitest for reducers, rules, and policy checks
- `npm run test:e2e`
  - Playwright on Chromium
  - fixed viewport
  - fixed locale/timezone
  - reduced motion
  - software rendering flags
- local git hook
  - verify zero-tolerance screenshot policy
  - ban `waitForTimeout`
  - ban test timeouts above `2000ms`
  - pre-commit runs unit tests
  - pre-push runs the full suite

### E2E Structure

Adopt the same scenario-based structure used in the reference repos.

```text
tests/e2e/
  helpers/
  001-start-game/
    001-start-game.spec.ts
    README.md
    screenshots/
  002-basic-moves/
  003-capture-and-check/
  004-promotion/
  005-endgame-states/
```

Each scenario should generate human-readable verification docs plus committed baseline screenshots.

## CI / Delivery

The repo should eventually include three required GitHub Actions workflows:

- `check.yml`
  - install dependencies
  - run `npm ci`
  - run `npm run verify:policy`
  - run `npm run check`
  - run `npm run test:unit`
- `e2e.yml`
  - install Playwright Chromium
  - run `npm run verify:policy`
  - run `npm run test:e2e`
  - upload Playwright artifacts on failure
- `deploy.yml`
  - determine GitHub Pages base path from branch or PR number
  - build static site
  - deploy to GitHub Pages
  - create PR preview paths and comment preview URLs

## Implementation Order

1. Establish SvelteKit static PWA scaffold and deployment base-path handling.
2. Build pure chess rules/state modules.
3. Render the board and piece interaction model.
4. Add move log, capture trays, and reset flow.
5. Add deterministic E2E scenarios with screenshot baselines.
6. Add CI and git-hook enforcement.

## MVP Acceptance Criteria

The MVP is ready when:

- two players can complete a legal full game locally,
- orientation works cleanly for opposite sides of the table,
- the move log is understandable,
- all MVP user stories are covered by deterministic E2E tests,
- and GitHub Pages deploys both production and PR previews successfully.
