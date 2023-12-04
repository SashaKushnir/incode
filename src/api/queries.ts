import { FilterCharacter, FilterEpisode, FilterLocation } from './index'

export const charactersFilterQuery = ({
	page,
	name,
	type,
	status,
	species,
	gender
}: FilterCharacter & { page: number }) => `query character {
  characters(page: ${page}, filter: { name: ${name}, status: ${status}, species: ${species}, type: ${type}, gender: ${gender}}) {
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
						type
						gender
						image
						origin {
							id
							name
						}
        }
    }
}`
export const episodeFilterQuery = ({
	page,
	name,
	episode
}: FilterEpisode & {
	page: number
}) => `query episodes {
  episodes (
    page: ${page}
    filter: {name: ${name},  episode: ${episode}}
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
        type
        gender
        image
        origin {
          id
          name
        }
      }
    }
  }
}`

export const locationFilterQuery = ({
	page,
	name,
	type,
	dimension
}: FilterLocation & {
	page: number
}) => `query location {
	locations (page: ${page}, filter: {name: ${name}, type: ${type}, dimension: ${dimension}}) {
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
        type
        gender
        origin {
          id
          name
        }
      }
    }
  }
}
`
