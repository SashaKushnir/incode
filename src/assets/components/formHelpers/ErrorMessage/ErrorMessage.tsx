import { FormHelperText, SxProps, Theme } from '@mui/material'
import React, { FC, PropsWithChildren } from 'react'
import { FormHelperTextProps } from '@mui/material/FormHelperText/FormHelperText'

interface ErrorMessageProps extends PropsWithChildren, FormHelperTextProps {}

const helper: SxProps<Theme> = ({ palette }) => ({
	fontSize: '14px',
	fontWeight: 400,
	color: palette.error.main,
	margin: '5px 0 0 0'
})

export const ErrorMessage: FC<ErrorMessageProps> = ({ children, ...props }) => {
	return (
		<FormHelperText sx={helper} {...props}>
			{children}
		</FormHelperText>
	)
}
