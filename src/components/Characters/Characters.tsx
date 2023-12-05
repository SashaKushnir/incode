import React, { FC, useEffect } from 'react'
import { Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/store'
import {
	charactersSelector,
	filterCharacters
} from '../../store/slices/charactersFilterSlice'
import { Character } from '../../api'
import { useSelector } from 'react-redux'
import { CharacterItem } from './CharacterItem'

export const Characters: FC = ({}) => {
	const characters = useSelector(charactersSelector)
	const d = useAppDispatch()

	useEffect(() => {
		d(filterCharacters())
	}, [])
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
