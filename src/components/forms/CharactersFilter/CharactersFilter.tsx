import React, { FC, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button } from '@mui/material'
import { MultiSelect } from '../../../assets/components/formHelpers/MultiSelect/MultiSelect'
import { KeyFilteringWords } from 'assets/components/formHelpers/KeyFilteringWords/KeyFilteringWords'
import { useAppDispatch } from '../../../store/store'
import { setFilteringConfig } from '../../../store/slices/charactersFilter/charactersFilterSlice'
import { SelectOptionButtonSx } from '../../../assets/components/formHelpers/MultiSelect/multiselectStyles'
import { FilteringConfig, FilterType } from '../../../assets/types/types'
import { formContainerSx } from './formStyles'
import { filterCharacters } from '../../../store/requests'

const filteringOptions = Object.values(FilterType) as FilterType[]

export const CharactersFilter: FC = ({}) => {
	const form = useForm<FilteringConfig>()
	const [open, setOpen] = useState(false)
	const d = useAppDispatch()

	const onSubmit: SubmitHandler<FilteringConfig> = values => {
		if (!values.filterType) return
		d(setFilteringConfig(values))
		d(filterCharacters())
	}

	return (
		<FormProvider {...form}>
			<Box sx={formContainerSx}>
				<MultiSelect options={filteringOptions} open={open} setOpen={setOpen} />
				<KeyFilteringWords open={open} />
				<Button
					sx={SelectOptionButtonSx}
					style={{
						borderRadius: '4px',
						padding: '16px 53px',
						maxHeight: '57px',
						maxWidth: '143px'
					}}
					onClick={form.handleSubmit(onSubmit)}
				>
					FIND
				</Button>
			</Box>
		</FormProvider>
	)
}
