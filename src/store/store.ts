import { charactersSlice } from './slices/charactersFilterSlice'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { characterDetailsSlice } from './slices/cheracterDetailsSlice'

export const store = configureStore({
	reducer: {
		charactersFilter: charactersSlice.reducer,
		characterDetails: characterDetailsSlice.reducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ActionType<T> = {
	type: string
	payload: T
}

export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector = useSelector<RootState>
