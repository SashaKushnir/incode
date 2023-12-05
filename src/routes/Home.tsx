import React, { FC } from 'react'
import { Box } from '@mui/material'
import { FilteringOptions } from '../components/FilteringOptions/FilteringOptions'
import { Characters } from '../components/Characters/Characters'
import { CharactersPagination } from '../components/CharactersPagination/CharactersPagination'
import { contentWrapperSx, pageTitleSx } from './commonStyles'

export const Home: FC = ({}) => {
	// use hooks if no thunks
	// const res = useCharactersQuery({ variables: { page: 1 } })

	return (
		<Box>
			<Box sx={pageTitleSx}>The Rick and Morty API</Box>
			<Box sx={contentWrapperSx}>
				<FilteringOptions />
				<Characters />
				<CharactersPagination />
			</Box>
		</Box>
	)
}
