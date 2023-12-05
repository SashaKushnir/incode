import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './routes/Home'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { ThemeProvider } from '@mui/material'
import { theme } from './assets/theme-config/theme'
import { CharacterPage } from './routes/CharacterPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/character/:characterId',
		element: <CharacterPage />
	}
])

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<RouterProvider router={router} />
			<Footer />
		</ThemeProvider>
	)
}

export default App
