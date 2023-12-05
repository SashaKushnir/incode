import { createSlice } from '@reduxjs/toolkit'
import { Character } from '../../../api'
import { fetchCharacterDetails } from '../../requests'
import { LoadingStatus } from '../../../assets/types/types'

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
