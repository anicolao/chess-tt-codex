import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UiEvent =
	| { type: 'NAVIGATED_TO_GAME' }
	| { type: 'PROMOTION_OPENED' }
	| { type: 'PROMOTION_CLOSED' };

export type UiState = {
	events: UiEvent[];
	screen: 'lobby' | 'game';
	activeModal: 'none' | 'promotion';
};

const initialState: UiState = {
	events: [],
	screen: 'lobby',
	activeModal: 'none'
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		recordUiEvent(state, action: PayloadAction<UiEvent>) {
			state.events.push(action.payload);

			switch (action.payload.type) {
				case 'NAVIGATED_TO_GAME':
					state.screen = 'game';
					break;
				case 'PROMOTION_OPENED':
					state.activeModal = 'promotion';
					break;
				case 'PROMOTION_CLOSED':
					state.activeModal = 'none';
					break;
			}
		}
	}
});

export const { recordUiEvent } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
