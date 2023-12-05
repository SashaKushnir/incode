import { FilterCharacter, FilterEpisode, FilterLocation } from './index'
import { FilteringValues } from '../components/forms/CharactersFilter/CharactersFilter'

export const filterOptionsCreator = (config: FilteringValues) => {
	return Object.keys(config).reduce((res, curKey) => {
		if (config[curKey as keyof FilteringValues]) {
			res += curKey + `: "${config[curKey as keyof FilteringValues]}",`
		}
		return res
	}, '')
}
export const charactersFilterQuery = ({
	page,
	...rest
}: FilterCharacter & { page: number }) => `query character {
  characters(${page ? `page: ${page}` : ''}, filter: { ${filterOptionsCreator(
		rest
	)} }) {
        info {
            count
            prev
            next
            pages
        }
   	  	results {
          id
					name
					status
					species
					image
					location {
						name
						created
					}
					episode {
						name
						created
					}
        }
    }
}`
export const episodeFilterQuery = ({
	page,
	...rest
}: FilterEpisode & {
	page: number
}) => `query episodes {
  episodes (
    page: ${page},
    filter: {${filterOptionsCreator(rest)}}
  ) {
    info {
      count
      pages
      next
    }
    results {
      name
      created
      characters {
     		 	id
					name
					status
					species
					image
					location {
						name
						created
					}
					episode {
						name
						created
					}
      }
    }
  }
}`

export const locationFilterQuery = ({
	page,
	...rest
}: FilterLocation & {
	page: number
}) => `query location {
	locations (page: ${page}, filter: {${filterOptionsCreator(rest)}}) {
    info {
      count
      pages
      next
      next
    }
    results {
      name
      type
      dimension
      created
     	residents {
      	 	id
					name
					status
					species
					image
					location {
						name
						created
					}
					episode {
						name
						created
				}
      }
    }
  }
}
`
export const characterDetailsQuery = (id: string) => `query characterDetails {
  character (id: ${id}) {
 		id
    name
    status
    species
    type
    gender
    image
    created
    origin {
      name
      type
      dimension
    }
    location {
      name
    }
  }
}
`
