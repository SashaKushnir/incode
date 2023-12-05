import React, { FC, useEffect } from 'react'
import { Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Character } from '../../api'
import { useSelector } from 'react-redux'
import { CharacterItem } from './CharacterItem'
import { Loading } from '../../assets/components/Loading/Loading'
import { filterCharacters } from '../../store/requests'
import {
	charactersLoadingStatusSelector,
	charactersSelector
} from '../../store/slices/charactersFilter/selectors'

export const Characters: FC = ({}) => {
	const characters = useSelector(charactersSelector)
	const isLoading = useSelector(charactersLoadingStatusSelector) === 'Pending'
	const d = useAppDispatch()

	useEffect(() => {
		d(filterCharacters())
	}, [])

	if (isLoading) {
		return <Loading />
	}
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '50% 50%',
				gridGap: '27px',
				mt: '20px'
			}}
		>
			{characters.map(character => {
				return (
					<CharacterItem
						key={character?.id}
						character={character as Character}
					/>
				)
			})}
		</Box>
	)
}
