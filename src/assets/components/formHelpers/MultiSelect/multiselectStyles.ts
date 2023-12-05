import { SxProps, Theme } from '@mui/material'

export const SelectOptionButtonSx: SxProps<Theme> = ({ palette }) => ({
	borderRadius: '4px 4px 0px 0px',
	padding: '16px',
	background: palette.secondary.main,
	color: palette.primary.dark,
	fontSize: '16px',
	textOverflow: 'ellipsis',
	display: 'flex',
	justifyContent: 'space-between',
	textTransform: 'none',
	width: '215px',
	zIndex: 10,
	':hover': {
		background: palette.secondary.contrastText
	}
})
export const menuItemSx: SxProps<Theme> = ({ palette }) => ({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	color: palette.primary.dark + '!important'
})
