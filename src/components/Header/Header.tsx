import React, { FC } from 'react'
import { AppBar, Box } from '@mui/material'
import headerSrc from 'assets/images/header-icon.svg'

export const Header: FC = ({}) => {
	return (
		<AppBar
			position={'static'}
			sx={{
				padding: '10px 27px',
				justifyContent: 'flex-start',
				background: 'inherit',
				boxShadow: 'none'
			}}
		>
			<Box
				component='img'
				sx={{
					height: 40,
					width: 40
				}}
				alt='Header'
				src={headerSrc}
			/>
		</AppBar>
	)
}
