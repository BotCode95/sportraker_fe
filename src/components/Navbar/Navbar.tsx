import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
export const Navbar = () => {
	const { logout } = useContext(UserContext)
	return (
		<AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
					Sport<strong>Tracker</strong> - Conectar Jugadores
				</Typography>
				<Box>
					<Button color="inherit" sx={{ color: 'black', mr: 2 }}>
						<Link to={'/home'}>Inicio</Link>
					</Button>
					<Button color="inherit" sx={{ color: 'black', mr: 2 }}>
						<Link to="/profile">Mi perfil</Link>
					</Button>
					<Button
						variant="contained"
						sx={{ backgroundColor: '#ce7b52' }}
						onClick={() => logout()}
					>
						Cerrar Sesión
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	)
}
