import {
	Characters,
	Episodes,
	FilterCharacter,
	FilterEpisode,
	FilterLocation,
	Locations
} from '../../api'

export enum FilterType {
	Location = 'Location',
	Character = 'Character',
	Episode = 'Episode'
}

export type FilteringValues<T extends FilterType = FilterType.Character> =
	T extends FilterType.Character
		? FilterCharacter
		: T extends FilterType.Location
		  ? FilterLocation
		  : T extends FilterType.Episode
		    ? FilterEpisode
		    : never

export interface FilteringConfig {
	filterType: FilterType
	values: FilteringValues
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type CustomCharacters = Required<Omit<Characters, '__typename'>>
export type FilteringResultType<T extends FilterType> = {
	data: T extends FilterType.Character
		? { characters: Characters }
		: T extends FilterType.Location
		  ? { locations: Locations }
		  : T extends FilterType.Episode
		    ? { episodes: Episodes }
		    : never
}

export enum LoadingStatus {
	pending = 'Pending',
	error = 'Error',
	success = 'Success',
	none = 'None'
}
