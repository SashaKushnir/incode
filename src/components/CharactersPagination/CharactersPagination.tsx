import React, { ChangeEvent, FC } from 'react'
import { Box, Pagination, SxProps, Theme } from '@mui/material'
import { useSelector } from 'react-redux'
import {
	filterCharacters,
	pagesAmountSelector,
	pageSelector,
	setPage
} from '../../store/slices/charactersFilterSlice'
import { useAppDispatch } from '../../store/store'
import './pagination.css'
import { FabMenu } from '../../assets/components/FabMenu/FabMenu'

const paginationWrapperSx: SxProps<Theme> = () => ({
	display: 'flex',
	justifyContent: 'center',
	mt: '33px',
	position: 'relative'
})
const fabSx: SxProps<Theme> = ({ palette }) => ({
	position: 'absolute',
	right: 0,
	bottom: 0,
	transform: 'translate(50%, 0%)'
})
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
