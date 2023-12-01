import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './routes/Home'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	}
])

function App() {
	return (
		<>
			<Header />
			<RouterProvider router={router} />
			<Footer />
		</>
	)
}

export default App
