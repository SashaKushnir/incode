import { SxProps, Theme } from '@mui/material'

export const characterImgSx: SxProps<Theme> = ({ palette }) => ({
	width: '229px',
	height: '220px',
	borderRadius: '9px'
})
export const characterImgExpandedSx: SxProps<Theme> = ({ palette }) => ({
	width: '595px',
	height: '572px',
	borderRadius: '9px'
})
export const statusSx: SxProps<Theme> = () => ({
	width: '9px',
	height: '9px',
	borderRadius: '50%'
})
export const infoExpandedWrapperSx: SxProps<Theme> = ({ palette }) => ({
	padding: '24px 26px'
})
export const fabSx: SxProps<Theme> = ({ palette }) => ({
	position: 'absolute',
	right: 0,
	bottom: 0,
	transform: 'translate(50%, 50%)'
})
export const infoWrapperSx: SxProps<Theme> = ({ palette }) => ({
	padding: '12px 13px'
})
export const characterContainerSx: SxProps<Theme> = ({ palette }) => ({
	background: palette.primary.contrastText,
	display: 'flex',
	position: 'relative',
	borderRadius: '9px'
})