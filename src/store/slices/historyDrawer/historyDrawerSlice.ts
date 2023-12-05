import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface HistoryDrawerState {
	drawerOpened: boolean
}

const initialHistoryDrawerState: HistoryDrawerState = {
	drawerOpened: false
}

export const historyDrawerSlice = createSlice({
	name: 'historyDrawerSlice',
	initialState: initialHistoryDrawerState,
	reducers: {
		setDrawerOpened: (state, action: PayloadAction<boolean>) => {
			state.drawerOpened = action.payload
		}
	}
})

export const { setDrawerOpened } = historyDrawerSlice.actions
