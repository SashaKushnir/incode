import { createTheme } from '@mui/material'

export const theme = createTheme({
	typography: {
		fontFamily: 'Roboto, sans-serif'
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
        @font-face {
          font-family: 'Roboto, sans-serif';
          font-style: normal;
        }
      `
		}
	},
	palette: {
		primary: {
			main: 'rgba(32, 35, 41, 1)',
			dark: 'rgba(39, 43, 51, 1)',
			contrastText: 'rgba(60, 62, 68, 1)'
		},
		secondary: {
			main: 'rgba(245, 245, 245, 1)',
			contrastText: 'rgba(245, 245, 245, 0.5)'
		},
		info: {
			main: '#4985EF'
		},
		warning: {
			main: 'rgba(60, 62, 68, 1)'
		},
		grey: {
			'100': 'rgba(158, 158, 158, 1)'
		},
		error: {
			main: 'rgba(214, 61, 46, 1)'
		},
		success: {
			main: 'rgba(85, 204, 68, 1)'
		}
	}
})
