import React, { FC, useState } from 'react'
import { Box, Button } from '@mui/material'
import { CharactersFilter } from '../forms/CharactersFilter/CharactersFilter'
import { filterStatusButtonSx } from './filterStyles'

export const FilteringOptions: FC = ({}) => {
	const [showFilter, setShowFilter] = useState(false)

	return (
		<Box display={'flex'} gap={'20px'}>
			<Button
				onClick={() => setShowFilter(actual => !actual)}
				variant={'contained'}
				sx={filterStatusButtonSx}
			>
				{showFilter ? 'Remove Filter' : 'Filter'}
			</Button>
			{showFilter && <CharactersFilter setShowFilter={setShowFilter} />}
		</Box>
	)
}
