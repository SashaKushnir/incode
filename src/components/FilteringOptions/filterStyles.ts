import { SxProps, Theme } from '@mui/material'

export const filterStatusButtonSx: SxProps<Theme> = ({ palette }) => ({
	padding: '16px 46px',
	background: palette.secondary.main,
	fontSize: '16px',
	color: palette.primary.dark,
	whiteSpace: 'nowrap',
	borderRadius: '4px',
	maxHeight: '57px',
	':hover': {
		background: palette.secondary.contrastText
	}
})
