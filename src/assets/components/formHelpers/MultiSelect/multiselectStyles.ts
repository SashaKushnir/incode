import { SxProps, Theme } from '@mui/material'

export const SelectOptionButtonSx: SxProps<Theme> = ({ palette }) => ({
	borderRadius: '4px 4px 0px 0px',
	padding: '16px',
	background: palette.secondary.main,
	color: palette.primary.dark,
	textOverflow: 'ellipsis',
	display: 'flex',
	justifyContent: 'space-between',
	width: '215px',
	zIndex: 10,
	':hover': {
		background: palette.secondary.contrastText
	}
})