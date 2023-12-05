import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Character } from '../../api'
import { RootState } from '../store'
import { characterDetailsQuery } from '../../api/queries'
import { requestCreator } from '../apiHelpers'
import { LoadingStatus } from './charactersFilterSlice'

interface CharacterDetailsState {
	characterDetailsLoadingStatus: LoadingStatus
	character?: Character
}

const initialCharacterDetailsState: CharacterDetailsState = {
	characterDetailsLoadingStatus: LoadingStatus.none
}

export const characterDetailsSlice = createSlice({
	name: 'characterDetailsSlice',
	initialState: initialCharacterDetailsState,
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
