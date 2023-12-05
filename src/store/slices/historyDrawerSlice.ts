import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character } from '../../api'
import { RootState } from '../store'
import { characterDetailsQuery } from '../../api/queries'
import { requestCreator } from '../apiHelpers'

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
export const drawerOpenedSelector = (state: RootState) =>
	state.historyDrawer.drawerOpened
