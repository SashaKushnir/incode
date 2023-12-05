import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'
import { getQueryByFilterType, requestCreator } from './apiHelpers'
import {
	CustomCharacters,
	FilteringResultType,
	FilterType
} from '../assets/types/types'
import { Character } from '../api'
import { characterDetailsQuery } from '../api/queries'

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
