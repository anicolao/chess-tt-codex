# Vision

## Core Idea

Build the simplest good version of chess for a large shared touchscreen table.

Two people stand or sit on opposite sides of the same display. The software should feel closer to a physical board than a laptop chess app: direct, legible, calm, and fast.

## Product Promise

The product should let two players:

- start a game immediately,
- understand the current state from either side of the table,
- make moves with large, reliable touch targets,
- and finish a full game without setup friction, accounts, or peripherals.

## Experience Principles

### Opposite-Side Clarity

The table is the primary constraint. White and Black must each feel that the board belongs to them from their side. Player labels, turn indicators, captured pieces, and controls should read naturally from both orientations.

### Touch-First Interaction

All core gameplay must work with touch alone. No keyboard assumptions. No hover-dependent affordances. No tiny controls tucked into corners.

### Physical-Board Feel

The app should emphasize the board and pieces, not app chrome. A move should usually be: tap piece, tap destination. The UI should stay quiet unless it is helping players resolve ambiguity.

### Local-First Reliability

The app should work as a client-only PWA with no backend dependency for local play. If the network disappears, local chess should still work.

### Fast Reset

The table may host repeated casual games. Starting a new game, swapping sides, and returning to the board should be nearly instantaneous.

## MVP Outcome

The MVP is successful if two first-time users can approach the table, start a game without explanation, complete legal moves from opposite sides, and understand whose turn it is at all times.

## Non-Goals For MVP

The first version does not need:

- AI play
- networked play
- clocks or tournament pairings
- account systems
- game analysis or opening prep
- deep customization

## Technical Direction

The product will be a Svelte-based PWA deployed as a static site, following the same local-first, GitHub Pages-friendly approach used in `chess-clock` and `food`. Quality is defined by deterministic E2E coverage, not by ad hoc manual checking.
