import React, { FC, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../store/store'
import {
	characterDetailsLoadingStatusSelector,
	characterDetailsSelector,
	fetchCharacterDetails
} from '../store/slices/cheracterDetailsSlice'
import { contentWrapperSx } from './Home'
import { CharacterItem } from '../components/Characters/CharacterItem'
import { useSelector } from 'react-redux'

export const CharacterPage: FC = ({}) => {
	const { characterId } = useParams<{ characterId: string }>()
	const character = useSelector(characterDetailsSelector)
	const isLoading =
		useSelector(characterDetailsLoadingStatusSelector) === 'Pending'
	const d = useAppDispatch()
	useEffect(() => {
		characterId && d(fetchCharacterDetails(characterId))
	}, [])

	if (isLoading) {
		return (
			<Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
				<CircularProgress size={100} />
			</Box>
		)
	}
	if (!character) {
		return <></>
	}
	return (
		<Box
			bgcolor={({ palette }) => palette.primary.dark}
			minHeight={'600px'}
			padding={'80px 110px'}
		>
			<CharacterItem character={character} expandedVersion />
		</Box>
	)
}
