import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character, Characters, Episodes, Locations, Maybe } from '../../api'
import { RootState } from '../store'
import { GraphQLRequest } from '@apollo/client'
import {
	characterDetailsQuery,
	charactersFilterQuery,
	episodeFilterQuery,
	locationFilterQuery
} from '../../api/queries'
import {
	FilteringConfig,
	FilterType
} from '../../components/forms/CharactersFilter/CharactersFilter'
import { getQueryByFilterType, requestCreator } from '../apiHelpers'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export const baseUrl = 'https://rickandmortyapi.com/graphql'

export enum LoadingStatus {
	pending = 'Pending',
	error = 'Error',
	success = 'Success',
	none = 'None'
}

export type CustomCharacters = Required<Omit<Characters, '__typename'>>

interface CharactersState {
	characterDetailsLoadingStatus: LoadingStatus
	character?: Character
}

const initialCharactersState: CharactersState = {
	characterDetailsLoadingStatus: LoadingStatus.none
}

export const characterDetailsSlice = createSlice({
	name: 'characterDetailsSlice',
	initialState: initialCharactersState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCharacterDetails.pending, state => {
				state.characterDetailsLoadingStatus = LoadingStatus.pending
			})
			.addCase(fetchCharacterDetails.fulfilled, (state, action) => {
				state.characterDetailsLoadingStatus = LoadingStatus.success
				state.character = action.payload
			})
			.addCase(fetchCharacterDetails.rejected, state => {
				state.characterDetailsLoadingStatus = LoadingStatus.error
			})
	}
})

export const {} = characterDetailsSlice.actions

export const fetchCharacterDetails = createAsyncThunk<Character, string>(
	'character',
	async (id, { rejectWithValue, getState }) => {
		try {
			const result = await requestCreator('POST', {
				query: characterDetailsQuery(id)
			})
			const awaiterResult = (await result.json()) as {
				data: { character: Character }
			}
			return awaiterResult.data.character
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const characterDetailsSelector = (state: RootState) =>
	state.characterDetails.character

export const characterDetailsLoadingStatusSelector = (state: RootState) =>
	state.characterDetails.characterDetailsLoadingStatus
