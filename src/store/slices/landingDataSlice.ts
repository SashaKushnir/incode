import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character, Info } from '../../api'
import { RootState } from '../store'
import { GraphQLRequest } from '@apollo/client'
import {
	charactersFilterQuery,
	episodeFilterQuery,
	locationFilterQuery
} from '../../api/queries'
import {
	FilteringConfig,
	FilterType
} from '../../components/forms/CharactersFilter/CharactersFilter'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export const baseUrl = 'https://rickandmortyapi.com/graphql'

export enum LoadingStatus {
	pending = 'Pending',
	error = 'Error',
	success = 'Success',
	none = 'None'
}

interface CharactersState {
	characters: Array<Character>
	charactersLoadingStatus: LoadingStatus
	page: number
	info?: Info
}

const initialCharactersState: CharactersState = {
	characters: [],
	charactersLoadingStatus: LoadingStatus.none,
	page: 1
}

export const charactersSlice = createSlice({
	name: 'charactersSlice',
	initialState: initialCharactersState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		}
	},
	extraReducers: builder => {
		builder
		// .addCase(filterCharacters.pending, state => {
		// 	state.charactersLoadingStatus = LoadingStatus.pending
		// })
		// .addCase(filterCharacters.fulfilled, (state, action) => {
		// 	state.charactersLoadingStatus = LoadingStatus.success
		// 	state.characters = action.payload?.characters || []
		// 	console.log(action, 'action')
		// })
		// .addCase(filterCharacters.rejected, state => {
		// 	state.charactersLoadingStatus = LoadingStatus.error
		// })
	}
})

export const { setPage } = charactersSlice.actions

const requestCreator = async (
	method: HttpMethod,
	graphqlQuery: Omit<GraphQLRequest, 'query'> & { query: string },
	queryParams?: Record<string, any>
) => {
	const url = new URL(baseUrl)

	if (method === 'GET' && queryParams) {
		Object.keys(queryParams).forEach(key =>
			url.searchParams.append(key, queryParams[key])
		)
	}

	return fetch(url.toString(), {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: method === 'GET' ? undefined : JSON.stringify(graphqlQuery)
	})
}

// export const fetchCharacters = createAsyncThunk<any, number>(
// 	'characters/fetchCharacters',
// 	async (page, { rejectWithValue }) => {
// 		try {
// 			console.log(charactersFilterQuery)
// 			const result = await requestCreator('POST', {
// 				query: charactersFilterQuery,
// 				variables: {
// 					page
// 				}
// 			})
// 			const res = await result.json()
// 			console.log(res, 'result')
// 			return res
// 		} catch (e) {
// 			return rejectWithValue(e)
// 		}
// 	}
// )

const getQueryByFilterType = (
	filteringConfig: FilteringConfig,
	page: number
) => {
	const payload = { ...filteringConfig.values, page }
	switch (filteringConfig.filterType) {
		case FilterType.Character:
			return charactersFilterQuery(payload)
		case FilterType.Location:
			return locationFilterQuery(payload)
		case FilterType.Episode:
			return episodeFilterQuery(payload)
	}
}
export const filterCharacters = createAsyncThunk<any, FilteringConfig>(
	'characters',
	async (filteringConfig, { rejectWithValue, getState }) => {
		try {
			const {
				landingData: { page }
			} = getState() as RootState
			const result = await requestCreator('POST', {
				query: getQueryByFilterType(filteringConfig, page),
				variables: { page }
			})
			const res = await result.json()
			console.log(res, 'result')
			return res
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const pageSelector = (state: RootState) => state.landingData.page
