import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { recordGameEvent } from '../../src/lib/store/game';
import { recordUiEvent } from '../../src/lib/store/ui';
import { createAppStore } from '../../src/lib/store/store';

describe('redux event sourcing scaffold', () => {
	it('records game events and derives turn state from the reducer', () => {
		const store = createAppStore();

		store.dispatch(recordGameEvent({ type: 'GAME_STARTED', payload: { gameId: 'game-1' } }));
		store.dispatch(
			recordGameEvent({ type: 'MOVE_COMMITTED', payload: { from: 'e2', to: 'e4' } })
		);

		const state = store.getState();
		expect(state.game.events).toHaveLength(2);
		expect(state.game.status).toBe('active');
		expect(state.game.turn).toBe('black');
	});

	it('records ui events and derives modal state from the reducer', () => {
		const store = createAppStore();

		store.dispatch(recordUiEvent({ type: 'NAVIGATED_TO_GAME' }));
		store.dispatch(recordUiEvent({ type: 'PROMOTION_OPENED' }));

		const state = store.getState();
		expect(state.ui.events).toHaveLength(2);
		expect(state.ui.screen).toBe('game');
		expect(state.ui.activeModal).toBe('promotion');
	});
});

describe('repo policy files', () => {
	it('keeps PUBLIC_BASE_PATH support in svelte config', () => {
		const svelteConfig = readFileSync('svelte.config.js', 'utf8');
		expect(svelteConfig).toContain('PUBLIC_BASE_PATH');
		expect(svelteConfig).toContain('/chess-tt-codex');
	});

	it('keeps per-pr preview deployment in the deploy workflow', () => {
		const workflow = readFileSync('.github/workflows/deploy.yml', 'utf8');
		expect(workflow).toContain('/chess-tt-codex/pr${{ github.event.pull_request.number }}');
		expect(workflow).toContain('Preview deployed to:');
	});
});
