import React, { FC } from 'react'
import { Box, CircularProgress } from '@mui/material'

export const Loading: FC = ({}) => {
	return (
		<Box
			display={'flex'}
			width={'100%'}
			height={'100%'}
			minHeight={'300px'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<CircularProgress color={'secondary'} size={100} />
		</Box>
	)
}
