import {
	Avatar,
	Box,
	Button,
	Chip,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { Navbar } from '../components/Navbar/Navbar'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const estadisticas = {
	partidosJugados: 18,
	partidosGanados: 12,
	puntos: 1340,
}

const proximosPartidos = [
	{ disciplina: 'Tenis', fecha: '01/06/2024', contrincante: 'Ana García' },
	{ disciplina: 'Padel', fecha: '03/06/2024', contrincante: 'Martín Ruiz' },
]

const historialTorneos = [
	{ torneo: 'Torneo Primavera', disciplina: 'Tenis', resultado: 'Campeón' },
	{ torneo: 'Abierto de Otoño', disciplina: 'Padel', resultado: 'Finalista' },
]

export const Profile = () => {
	const { user, player } = useContext(UserContext)

	return (
		<Box sx={{ display: 'flex' }}>
			<Navbar />
			<Sidebar />

			<Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}>
				<Typography variant="h5" fontWeight="bold" mb={3}>
					Mi perfil
				</Typography>

				<Grid container spacing={4}>
					<Grid size={{ xs: 12, md: 4 }}>
						<Paper sx={{ p: 3, textAlign: 'center' }}>
							<Avatar
								src="https://randomuser.me/api/portraits/men/32.jpg"
								sx={{ width: 100, height: 100, margin: '0 auto' }}
							/>
							<Typography variant="h6" fontWeight="bold" mt={2}>
								{user?.name} {user?.lastname}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{player?.province}
							</Typography>
							<Button
								variant="contained"
								fullWidth
								sx={{ mt: 2, backgroundColor: '#f37c2b' }}
							>
								<Button variant="contained" sx={{ backgroundColor: '#f37c2b' }}>
									<Link to={`/profile/${player?.userId}`}>Editar perfil</Link>
								</Button>
							</Button>

							<Typography variant="subtitle1" mt={4} fontWeight="bold">
								Disciplinas
							</Typography>
							<Box
								sx={{
									display: 'flex',
									gap: 1,
									justifyContent: 'center',
									mt: 1,
								}}
							>
								{player?.disciplines.map((d, i) => (
									<Chip key={i} label={d} />
								))}
							</Box>

							<Typography variant="subtitle1" mt={4} fontWeight="bold">
								Valores técnicos
							</Typography>
							<Box mt={1}>
								<Typography>
									Resistencia:{' '}
									<strong>{player?.technicalSkills.endurance}</strong>
								</Typography>
								<Typography>
									Potencia: <strong>{player?.technicalSkills.power}</strong>
								</Typography>
								<Typography>
									Técnica: <strong>{player?.technicalSkills.technique}</strong>
								</Typography>
							</Box>
						</Paper>
					</Grid>
					<Grid size={{ xs: 12, md: 8 }}>
						<Paper sx={{ p: 2, mb: 4 }}>
							<Typography variant="subtitle1" fontWeight="bold" mb={1}>
								Mis estadísticas
							</Typography>
							<Typography variant="body2">
								Partidos jugados: {estadisticas.partidosJugados}
							</Typography>
							<Typography variant="body2">
								Partidos ganados: {estadisticas.partidosGanados}
							</Typography>
							<Typography variant="body2">
								Puntos: {estadisticas.puntos}
							</Typography>
						</Paper>

						<Typography variant="h6" fontWeight="bold" mb={1}>
							Próximos partidos
						</Typography>
						<TableContainer component={Paper} sx={{ mb: 4 }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Disciplina</TableCell>
										<TableCell>Fecha</TableCell>
										<TableCell>Contrincante</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{proximosPartidos.map((p, i) => (
										<TableRow key={i}>
											<TableCell>{p.disciplina}</TableCell>
											<TableCell>{p.fecha}</TableCell>
											<TableCell>{p.contrincante}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>

						<Typography variant="h6" fontWeight="bold" mb={1}>
							Historial de torneos
						</Typography>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Torneo</TableCell>
										<TableCell>Disciplina</TableCell>
										<TableCell>Resultado</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{historialTorneos.map((h, i) => (
										<TableRow key={i}>
											<TableCell>{h.torneo}</TableCell>
											<TableCell>{h.disciplina}</TableCell>
											<TableCell>{h.resultado}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</Box>
		</Box>
	)
}
