import { SxProps, Theme } from '@mui/material'

export const drawerSx: SxProps<Theme> = () => ({
	'& .MuiDrawer-paper': {
		height: '50vh',
		top: '25%',
		width: '400px',
		borderRadius: '9px 0px 0px 9px'
	}
})