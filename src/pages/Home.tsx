import { Box } from '@mui/material'
import { Navbar } from '../components/Navbar/Navbar'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { HomeComponent } from '../components/Home/HomeComponent'

export const Home = () => {
	return (
		<>
			<Navbar />
			<Box sx={{ display: 'flex' }}>
				<Sidebar />
				<Box sx={{ flexGrow: 1 }}>
					<HomeComponent />
				</Box>
			</Box>
		</>
	)
}
