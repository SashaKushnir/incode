import React, { FC, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, SxProps, Theme } from '@mui/material'
import {
	MultiSelect,
	SelectOptionButtonSx
} from '../../../assets/components/formHelpers/MultiSelect/MultiSelect'
import { FilterCharacter, FilterEpisode, FilterLocation } from '../../../api'
import { KeyFilteringWords } from 'assets/components/formHelpers/KeyFilteringWords/KeyFilteringWords'
import { useAppDispatch } from '../../../store/store'

interface CharactersFilterProps {}

export enum FilterType {
	Location = 'Location',
	Character = 'Character',
	Episode = 'Episode'
}

export type FilteringValues<T extends FilterType = FilterType.Character> =
	T extends FilterType.Character
		? FilterCharacter
		: T extends FilterType.Location
		  ? FilterLocation
		  : T extends FilterType.Episode
		    ? FilterEpisode
		    : never

export interface FilteringConfig {
	filterType: FilterType
	values: FilteringValues
}

const filteringOptions = Object.values(FilterType) as FilterType[]

const formContainerSx: SxProps<Theme> = () => ({
	display: 'flex',
	justifyContent: 'center',
	width: '100%',
	gap: '28px'
})

export const CharactersFilter: FC = ({}) => {
	const form = useForm<FilteringConfig>()
	const [open, setOpen] = useState(false)
	const d = useAppDispatch()

	const onSubmit: SubmitHandler<FilteringConfig> = values => {
		// d(filterCharacters(values))
	}

	return (
		<FormProvider {...form}>
			<Box sx={formContainerSx}>
				<MultiSelect options={filteringOptions} open={open} setOpen={setOpen} />
				<KeyFilteringWords open={open} />
				<Button
					sx={SelectOptionButtonSx}
					onClick={form.handleSubmit(onSubmit)}
				></Button>
				{/*<FormInput<FilterType> name={'name'} />*/}
			</Box>
		</FormProvider>
	)
}
