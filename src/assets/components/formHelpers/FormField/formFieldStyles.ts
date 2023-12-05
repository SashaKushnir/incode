import { SxProps, Theme } from '@mui/material'

export const textFieldSx: SxProps<Theme> = () => ({
	'& .MuiInputBase-root': {
		border: 'none',
		borderRadius: '0px',
		'&:hover': {
			border: 'none'
		},
		'&.Mui-focused': {
			border: 'none',
			boxShadow: 'none'
		}
	}
})
