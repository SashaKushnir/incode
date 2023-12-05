import { SxProps, Theme } from '@mui/material'

export const contentWrapperSx: SxProps<Theme> = ({ palette }) => ({
	background: palette.primary.dark,
	padding: '24px 107px'
})
export const pageTitleSx: SxProps<Theme> = ({ palette }) => ({
	fontSize: '101.25px',
	fontWeight: 900,
	color: palette.primary.main,
	textAlign: 'center',
	padding: '113px 0 120px 0'
})