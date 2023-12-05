import React, { FC } from 'react'
import { Box, SxProps, Theme } from '@mui/material'
import { FilteringOptions } from '../components/FilteringOptions/FilteringOptions'
import { Characters } from '../components/Characters/Characters'
import { CharactersPagination } from '../components/CharactersPagination/CharactersPagination'

export const contentWrapperSx: SxProps<Theme> = ({ palette }) => ({
	background: palette.primary.dark,
	padding: '24px 107px'
})
export const pageTitleSx: SxProps<Theme> = ({ palette }) => ({
	fontSize: '101.25px',
	fontWeight: 900,
	color: palette.primary.main,
	textAlign: 'center',
	padding: '113px 0 120px 0'
})

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
