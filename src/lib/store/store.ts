import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './game';
import { uiReducer } from './ui';

export function createAppStore() {
	return configureStore({
		reducer: {
			game: gameReducer,
			ui: uiReducer
		}
	});
}

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore['getState']>;
