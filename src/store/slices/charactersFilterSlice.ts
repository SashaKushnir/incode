import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character, Characters, Episodes, Locations, Maybe } from '../../api'
import { RootState } from '../store'
import {
	FilteringConfig,
	FilterType
} from '../../components/forms/CharactersFilter/CharactersFilter'
import { getQueryByFilterType, requestCreator } from '../apiHelpers'
import { LocalStore } from '../../utils/localStorage'

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

export type FilteringResultType<T extends FilterType> = {
	data: T extends FilterType.Character
		? { characters: Characters }
		: T extends FilterType.Location
		  ? { locations: Locations }
		  : T extends FilterType.Episode
		    ? { episodes: Episodes }
		    : never
}

export const filterCharacters = createAsyncThunk<CustomCharacters, undefined>(
	'characters',
	async (_, { rejectWithValue, getState }) => {
		try {
			const {
				charactersFilter: { page, filteringConfig }
			} = getState() as RootState
			if (!filteringConfig) {
				throw Error('filteringConfig is ', filteringConfig)
			}
			const result = await requestCreator('POST', {
				query: getQueryByFilterType(filteringConfig, page),
				variables: { page }
			})
			const { filterType } = filteringConfig
			const response = await result.json()
			switch (filterType) {
				case FilterType.Location:
					const locationData =
						response as FilteringResultType<FilterType.Location>
					const locationCharacters: Character[] =
						locationData.data.locations?.results?.reduce(
							(res, currentLocation) => {
								res = [
									...res,
									...(currentLocation?.residents || [])
								] as Character[]
								return res
							},
							[] as Character[]
						) || []
					return {
						...locationData.data.locations,
						results: locationCharacters
					} as CustomCharacters

				case FilterType.Episode:
					const episodeData =
						response as FilteringResultType<FilterType.Episode>
					const episodeCharacters: Character[] =
						episodeData.data.episodes?.results?.reduce(
							(res, currentEpisode) => {
								res = [
									...res,
									...(currentEpisode?.characters || [])
								] as Character[]
								return res
							},
							[] as Character[]
						) || []

					return {
						...episodeData.data.episodes,
						results: episodeCharacters
					} as CustomCharacters
				case FilterType.Character:
				default:
					return response.data.characters as CustomCharacters
			}
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export const pageSelector = (state: RootState) => state.charactersFilter.page
export const pagesAmountSelector = (state: RootState) =>
	state.charactersFilter.charactersInfo.info?.pages || 1
export const charactersSelector = (state: RootState): Maybe<Character>[] =>
	state.charactersFilter.charactersInfo?.results || []

export const charactersLoadingStatusSelector = (state: RootState) =>
	state.charactersFilter.charactersLoadingStatus
