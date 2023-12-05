import React, { ChangeEvent, FC } from 'react'
import { Box, Pagination } from '@mui/material'
import { useSelector } from 'react-redux'
import { setPage } from '../../store/slices/charactersFilter/charactersFilterSlice'
import { useAppDispatch } from '../../store/store'
import './pagination.css'
import { FabMenu } from '../../assets/components/FabMenu/FabMenu'
import { fabSx, paginationWrapperSx } from './paginationStyles'
import { filterCharacters } from '../../store/requests'
import {
	pagesAmountSelector,
	pageSelector
} from '../../store/slices/charactersFilter/selectors'

export const CharactersPagination: FC = ({}) => {
	const pagesAmount = useSelector(pagesAmountSelector)
	const page = useSelector(pageSelector)
	const d = useAppDispatch()

	const handleChange = (_e: ChangeEvent<unknown>, page: number) => {
		d(setPage(page))
		d(filterCharacters())
	}
	return (
		<Box sx={paginationWrapperSx}>
			<Pagination
				page={page}
				count={pagesAmount}
				variant='outlined'
				size={'large'}
				shape='rounded'
				onChange={handleChange}
			/>
			<FabMenu fabSx={fabSx} />
		</Box>
	)
}
