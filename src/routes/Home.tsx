import React, { FC, useEffect } from 'react'
import { Box, SxProps, Theme } from '@mui/material'
import { useSelector } from 'react-redux'
import { pageSelector } from '../store/slices/landingDataSlice'
import { useAppDispatch, useAppSelector } from '../store/store'
import { FilteringOptions } from '../components/FilteringOptions/FilteringOptions'
import { Characters } from '../components/Characters/Characters'

const contentWrapperSx: SxProps<Theme> = ({ palette }) => ({
	background: palette.primary.dark,
	padding: '24px 107px'
})
const titleSx: SxProps<Theme> = ({ palette }) => ({
	fontSize: '101.25px',
	fontWeight: 900,
	color: palette.primary.main,
	textAlign: 'center',
	padding: '113px 0 120px 0'
})

export const Home: FC = ({}) => {
	const page = useAppSelector(pageSelector)
	const d = useAppDispatch()
	// use hooks if no thunks
	// const res = useCharactersQuery({ variables: { page: 1 } })
	// console.log(res, 'res')
	useEffect(() => {
		// d(filterCharacters({ filterType: FilterType.Character, values: {} }))
	}, [])

	return (
		<Box>
			<Box sx={titleSx}>The Rick and Morty API</Box>
			<Box sx={contentWrapperSx}>
				<FilteringOptions />
				<Characters />
			</Box>
		</Box>
	)
}
