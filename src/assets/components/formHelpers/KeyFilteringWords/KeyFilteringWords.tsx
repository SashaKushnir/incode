import React, { FC, useMemo } from 'react'
import { Box, Button, List, ListItem } from '@mui/material'
import { useWatch } from 'react-hook-form'
import { FilterCharacter, FilterEpisode, FilterLocation } from '../../../../api'
import { FormField } from '../FormField/FormField'
import { fieldSx, inputPropsSx, listItemSx, listSx } from './keyWordsStyles'
import { SelectOptionButtonSx } from '../MultiSelect/multiselectStyles'
import { FilteringConfig, FilterType } from '../../../types/types'
import { capitalizeString } from '../../../../utils/capitalizeLletter'

interface KeyFilteringWordsProps {
	open: boolean
}

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
									<FormField
										sx={fieldSx}
										placeholder={'Add ' + capitalizeString(option)}
										InputProps={{
											sx: inputPropsSx
										}}
										name={'values.' + option}
									/>
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
