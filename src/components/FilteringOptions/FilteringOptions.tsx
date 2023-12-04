import React, { FC, useState } from 'react'
import { Box, Button, SxProps, Theme } from '@mui/material'
import { CharactersFilter } from '../forms/CharactersFilter/CharactersFilter'

const filterStatusButtonSx: SxProps<Theme> = ({ palette }) => ({
	padding: '16px 46px',
	background: palette.secondary.main,
	color: palette.primary.dark,
	whiteSpace: 'nowrap',
	borderRadius: '4px',
	maxHeight: '57px',
	':hover': {
		background: palette.secondary.contrastText
	}
})
export const FilteringOptions: FC = ({}) => {
	const [showFilter, setShowFilter] = useState(false)

	return (
		<Box display={'flex'}>
			<Button
				onClick={() => setShowFilter(actual => !actual)}
				variant={'contained'}
				sx={filterStatusButtonSx}
			>
				{showFilter ? 'Remove Filter' : 'Filter'}
			</Button>
			{showFilter && <CharactersFilter />}
		</Box>
	)
}
