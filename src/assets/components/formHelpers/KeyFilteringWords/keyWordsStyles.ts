import { SxProps, Theme } from '@mui/material'

export const fieldSx: SxProps<Theme> = ({ palette }) => ({
	padding: 0,
	borderRadius: 0,
	'& .MuiInputBase-root': {
		border: 'none',
		borderRadius: '0px!important',
		'&:hover': {
			border: 'none'
		},
		'&.Mui-focused': {
			border: 'none',
			boxShadow: 'none'
		}
	}
})
export const listItemSx: SxProps<Theme> = ({ palette }) => ({
	padding: 0
})
export const listSx: SxProps<Theme> = ({ palette }) => ({
	borderRadius: '4px',
	padding: '0px',
	background: palette.secondary.main,
	color: palette.primary.dark,
	width: '215px',
	zIndex: 10,
	position: 'absolute',
	top: 0,
	left: 0
})
