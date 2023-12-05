import { SxProps, Theme } from '@mui/material'

export const paginationWrapperSx: SxProps<Theme> = () => ({
	display: 'flex',
	justifyContent: 'center',
	mt: '33px',
	position: 'relative'
})
export const fabSx: SxProps<Theme> = ({ palette }) => ({
	position: 'absolute',
	right: 0,
	bottom: 0,
	transform: 'translate(50%, 0%)'
})