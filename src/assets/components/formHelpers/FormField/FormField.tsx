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
import { SeparateLabel } from '../SeparateLabel/SeparateLabel'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'

interface Props<T extends FieldValues = FieldValues>
	extends Omit<TextFieldProps, 'name' | 'register'> {
	showSeparateLabel?: boolean
	name: Path<T>
	label?: string
	Component?: ElementType
	isDisabled?: string
	labelSx?: SxProps<Theme>
}

export const FormField = <T extends FieldValues>({
	label,
	name,
	showSeparateLabel = false,
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
		<FormControl mb={3} p={0} width={'100%'} component={Box}>
			{showSeparateLabel && (
				<SeparateLabel name={name} sx={labelSx}>
					{label}
				</SeparateLabel>
			)}
			<Component
				id={name}
				label={showSeparateLabel ? undefined : label}
				{...props}
				{...register(name as Path<T>)}
				error={isInvalid} // Set the error prop based on the presence of an error
				helperText={showSeparateLabel ? '' : (errors[name]?.message as string)}
			/>
			{errors[name]?.message && (
				<ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
			)}
		</FormControl>
	)
}
