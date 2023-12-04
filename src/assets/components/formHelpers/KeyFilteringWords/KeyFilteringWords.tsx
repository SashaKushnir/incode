import React, { FC, useMemo } from 'react'
import { Button, List, ListItem, SxProps, Theme } from '@mui/material'
import { useWatch } from 'react-hook-form'
import {
	FilteringConfig,
	FilterType
} from '../../../../components/forms/CharactersFilter/CharactersFilter'
import { SelectOptionButtonSx } from '../MultiSelect/MultiSelect'
import { FilterCharacter, FilterEpisode, FilterLocation } from '../../../../api'
import { FormField } from '../FormField/FormField'

interface KeyFilteringWordsProps {
	open: boolean
}

const fieldSx: SxProps<Theme> = ({ palette }) => ({
	padding: 0,
	borderRadius: 0
})

const listItemSx: SxProps<Theme> = ({ palette }) => ({
	padding: 0
})
const listSx: SxProps<Theme> = ({ palette }) => ({
	borderRadius: '4px',
	padding: '0px',
	background: palette.secondary.main,
	color: palette.primary.dark,
	maxWidth: '260px',
	zIndex: 10
})

export const KeyFilteringWords: FC<KeyFilteringWordsProps> = ({ open }) => {
	const formValues = useWatch<FilteringConfig>()
	console.log(formValues, 'formValues')
	const filterType = formValues.filterType as FilterType
	const listOptions = useMemo(() => {
		switch (filterType) {
			case FilterType.Character:
				return ['name', 'status', 'species', 'type', 'gender'] as Array<
					keyof FilterCharacter
				>
			case FilterType.Episode:
				return ['name', 'episode'] as Array<keyof FilterEpisode>
			case FilterType.Location:
				return ['name', 'type', 'dimension'] as Array<keyof FilterLocation>
		}
	}, [filterType])

	return (
		<>
			{open && listOptions?.length ? (
				<List sx={listSx}>
					{listOptions.map(option => {
						return (
							<ListItem sx={listItemSx} key={option}>
								<FormField sx={fieldSx} name={'values.' + option} />
							</ListItem>
						)
					})}
				</List>
			) : (
				<Button sx={SelectOptionButtonSx}>Add key words to find</Button>
			)}
		</>
	)
}
