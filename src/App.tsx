import { HashRouter, Routes, Route } from 'react-router-dom'
import {
	Login,
	Register,
	Home,
	Profile,
	SearchPlayers,
	ProfileId,
} from './pages/'
import { ThemeProvider } from '@emotion/react'
import { theme } from './Theme'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider } from './context/UserContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { CssBaseline } from '@mui/material'
import { PlayerProvider } from './context/PlayerContext'
function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<UserProvider>
				<PlayerProvider>
					<div className="App">
						<HashRouter>
							<Routes>
								<Route path="/login" element={<Login />} />
								<Route path="/register" element={<Register />} />
								<Route
									path="/"
									element={<ProtectedRoute redirectTo="/login" />}
								>
									<Route path="/home" element={<Home />} />
									<Route path="/profile" element={<Profile />} />
									<Route path="/search-players" element={<SearchPlayers />} />
									<Route path="/profile/:id" element={<ProfileId />} />
								</Route>
							</Routes>
						</HashRouter>
					</div>
				</PlayerProvider>
			</UserProvider>
		</ThemeProvider>
	)
}

export default App
