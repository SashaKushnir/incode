import { RootState } from '../../store'

export const characterDetailsSelector = (state: RootState) =>
	state.characterDetails.character
export const characterDetailsLoadingStatusSelector = (state: RootState) =>
	state.characterDetails.characterDetailsLoadingStatus
