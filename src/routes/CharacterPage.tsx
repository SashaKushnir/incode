import React, { FC, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../store/store'
import {
	characterDetailsLoadingStatusSelector,
	characterDetailsSelector,
	fetchCharacterDetails
} from '../store/slices/cheracterDetailsSlice'
import { pageTitleSx } from './Home'
import { CharacterItem } from '../components/Characters/CharacterItem'
import { useSelector } from 'react-redux'
import { Loading } from '../assets/components/Loading/Loading'

export const CharacterPage: FC = ({}) => {
	const { characterId } = useParams<{ characterId: string }>()
	const character = useSelector(characterDetailsSelector)
	const isLoading =
		useSelector(characterDetailsLoadingStatusSelector) === 'Pending'
	const d = useAppDispatch()
	useEffect(() => {
		characterId && d(fetchCharacterDetails(characterId))
	}, [])

	return (
		<>
			<Box sx={pageTitleSx}>The Rick and Morty API</Box>

			<Box
				bgcolor={({ palette }) => palette.primary.dark}
				padding={'80px 110px'}
			>
				{isLoading ? (
					<Loading />
				) : (
					<CharacterItem character={character} expandedVersion />
				)}
			</Box>
		</>
	)
}
