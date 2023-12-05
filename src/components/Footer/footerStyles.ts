import { SxProps, Theme } from '@mui/material'

export const footerSx: SxProps<Theme> = ({ palette }) => ({
	background: palette.primary.main,
	padding: '47px 0 81px 0'
})
export const imgSx: SxProps<Theme> = ({ palette }) => ({
	width: '18px',
	height: '18px'
})