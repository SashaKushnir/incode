import {
	FilteringConfig,
	FilterType
} from '../components/forms/CharactersFilter/CharactersFilter'
import {
	charactersFilterQuery,
	episodeFilterQuery,
	locationFilterQuery
} from '../api/queries'
import { GraphQLRequest } from '@apollo/client'
import { baseUrl, HttpMethod } from './slices/charactersFilterSlice'

export const requestCreator = async (
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
export const getQueryByFilterType = (
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