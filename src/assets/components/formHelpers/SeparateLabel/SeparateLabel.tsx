import React, { FC, PropsWithChildren } from 'react'
import { SxProps, Theme, Typography } from '@mui/material'

interface SeparateLabelProps extends PropsWithChildren {
	sx?: SxProps<Theme>
	name: string
}

export const SeparateLabel: FC<SeparateLabelProps> = ({
	sx,
	children,
	name
}) => {
	return (
		<Typography sx={sx} component={'label'} htmlFor={name}>
			{children}
		</Typography>
	)
}
