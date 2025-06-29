import { Box } from '@mui/material'
import { Navbar } from '../components/Navbar/Navbar'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { HomeComponent } from '../components/Home/HomeComponent'
import { Footer } from '../components/Footer/Footer'

export const Home = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<Navbar />
			<Sidebar />
			<HomeComponent />
			<Footer />
		</Box>
	)
}
