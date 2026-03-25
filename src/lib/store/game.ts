import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type GameEvent =
	| { type: 'GAME_STARTED'; payload: { gameId: string } }
	| { type: 'MOVE_COMMITTED'; payload: { from: string; to: string } };

export type GameState = {
	events: GameEvent[];
	gameId: string | null;
	status: 'idle' | 'active';
	turn: 'white' | 'black';
};

const initialState: GameState = {
	events: [],
	gameId: null,
	status: 'idle',
	turn: 'white'
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		recordGameEvent(state, action: PayloadAction<GameEvent>) {
			state.events.push(action.payload);

			switch (action.payload.type) {
				case 'GAME_STARTED':
					state.gameId = action.payload.payload.gameId;
					state.status = 'active';
					state.turn = 'white';
					break;
				case 'MOVE_COMMITTED':
					state.turn = state.turn === 'white' ? 'black' : 'white';
					break;
			}
		}
	}
});

export const { recordGameEvent } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
