import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocalStore } from '../../../utils/localStorage'
import {
	CustomCharacters,
	FilteringConfig,
	FilterType,
	LoadingStatus
} from '../../../assets/types/types'
import { filterCharacters } from '../../requests'

interface CharactersState {
	charactersInfo: CustomCharacters
	charactersLoadingStatus: LoadingStatus
	filteringConfig?: FilteringConfig
	page: number
}

const initialCharactersState: CharactersState = {
	charactersInfo: {
		results: [],
		info: {
			pages: 1
		}
	},
	filteringConfig: { filterType: 'Character' as FilterType, values: {} },
	charactersLoadingStatus: LoadingStatus.none,
	page: 1
}

export const charactersSlice = createSlice({
	name: 'charactersSlice',
	initialState: initialCharactersState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
		setFilteringConfig: (state, action: PayloadAction<FilteringConfig>) => {
			const prevHistory = LocalStore.get('history')
			LocalStore.set(
				'history',
				prevHistory ? [...prevHistory, action.payload] : [action.payload]
			)
			state.filteringConfig = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(filterCharacters.pending, state => {
				state.charactersLoadingStatus = LoadingStatus.pending
			})
			.addCase(filterCharacters.fulfilled, (state, action) => {
				state.charactersLoadingStatus = LoadingStatus.success
				state.charactersInfo = action.payload
			})
			.addCase(filterCharacters.rejected, state => {
				state.charactersLoadingStatus = LoadingStatus.error
			})
	}
})

export const { setPage, setFilteringConfig } = charactersSlice.actions
