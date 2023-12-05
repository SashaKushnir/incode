import { SxProps, Theme } from '@mui/material'

export const buttonSx: SxProps<Theme> = ({ palette }) => ({
	background: palette.secondary.main,
	':hover': {
		background: palette.secondary.contrastText,
		color: palette.warning.main
	},
	':disabled': {
		background: palette.grey[100]
	}
})
export const menusSx: SxProps<Theme> = ({ palette }) => ({
	position: 'absolute',
	bottom: '70px',
	left: '50%',
	transform: 'translate(-50%, 0%)',
	display: 'flex',
	flexDirection: 'column',
	gap: '16px'
})