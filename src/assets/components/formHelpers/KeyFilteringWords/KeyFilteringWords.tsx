import React, { FC, useMemo } from 'react'
import { Box, Button, List, ListItem, SxProps, Theme } from '@mui/material'
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
	width: '215px',
	zIndex: 10,
	position: 'absolute',
	top: 0,
	left: 0
})

export const KeyFilteringWords: FC<KeyFilteringWordsProps> = ({ open }) => {
	const formValues = useWatch<FilteringConfig>()

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
		<Box position={'relative'}>
			{open && listOptions?.length ? (
				<Box width={'215px'}>
					<List sx={listSx}>
						{listOptions.map(option => {
							return (
								<ListItem sx={listItemSx} key={option}>
									<FormField sx={fieldSx} name={'values.' + option} />
								</ListItem>
							)
						})}
					</List>
				</Box>
			) : (
				<Button sx={SelectOptionButtonSx}>Add key words to find</Button>
			)}
		</Box>
	)
}
