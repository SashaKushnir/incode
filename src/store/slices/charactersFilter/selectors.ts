import { RootState } from '../../store'
import { Character, Maybe } from '../../../api'

export const pageSelector = (state: RootState) => state.charactersFilter.page
export const pagesAmountSelector = (state: RootState) =>
	state.charactersFilter.charactersInfo.info?.pages || 1
export const charactersSelector = (state: RootState): Maybe<Character>[] =>
	state.charactersFilter.charactersInfo?.results || []
export const charactersLoadingStatusSelector = (state: RootState) =>
	state.charactersFilter.charactersLoadingStatus