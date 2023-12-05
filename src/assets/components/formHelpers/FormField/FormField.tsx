import {
	Box,
	FormControl,
	SxProps,
	TextField,
	TextFieldProps,
	Theme
} from '@mui/material'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import React, { ElementType, useMemo } from 'react'
import { textFieldSx } from './formFieldStyles'

interface Props<T extends FieldValues = FieldValues>
	extends Omit<TextFieldProps, 'name' | 'register'> {
	name: Path<T>
	label?: string
	Component?: ElementType
	isDisabled?: string
	labelSx?: SxProps<Theme>
}

export const FormField = <T extends FieldValues>({
	label,
	name,
	isDisabled,
	Component = TextField,
	labelSx,
	...props
}: Props<T>) => {
	const {
		formState: { errors, isSubmitted },
		register
	} = useFormContext<T>()
	const isInvalid = useMemo(
		() => errors[name] && isSubmitted,
		[errors, isSubmitted, name]
	)

	return (
		<FormControl sx={textFieldSx} p={0} width={'100%'} component={Box}>
			<Component
				id={name}
				{...props}
				{...register(name as Path<T>)}
				error={isInvalid}
			/>
		</FormControl>
	)
}
