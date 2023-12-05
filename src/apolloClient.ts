import { ApolloClient, InMemoryCache } from '@apollo/client'
import { baseUrl } from './store/apiHelpers'

const client = new ApolloClient({
	uri: baseUrl,
	cache: new InMemoryCache()
})

export default client
