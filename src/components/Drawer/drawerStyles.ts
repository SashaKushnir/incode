import { SxProps, Theme } from '@mui/material'

export const drawerSx: SxProps<Theme> = () => ({
	'& .MuiDrawer-paper': {
		height: '50vh',
		top: '25%',
		width: '400px',
		borderRadius: '9px 0px 0px 9px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	}
})

export const closeButtonSx: SxProps<Theme> = ({ palette }) => ({
	color: palette.primary.dark,
	fontSize: '14px',
	fontWeight: 500,
	cursor: 'pointer',
	padding: '12px 16px'
})
