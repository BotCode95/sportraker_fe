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
import SportsTennisIcon from '@mui/icons-material/SportsTennis'
import { SearchBar } from './SearchBar'
import { Link } from 'react-router-dom'
import padel from '../../assets/padel.png'
import { useContext } from 'react'
import { PlayerContext } from '../../context/PlayerContext'
import { Navbar } from '../Navbar/Navbar'
import { Sidebar } from '../Sidebar/Sidebar'
import React from 'react'
import type { Player } from '../../types/player'
import { UserContext } from '../../context/UserContext'

const historialTorneos = [
	{ torneo: 'Torneo Primavera', disciplina: 'Tenis', resultado: 'Campeón' },
	{ torneo: 'Abierto de Otoño', disciplina: 'Padel', resultado: 'Finalista' },
	{ torneo: 'Torneo Verano', disciplina: 'Tenis', resultado: 'Semifinalista' },
]

const resultadosRecientes = [
	{ torneo: 'Torneo de Club', disciplina: 'Padel', resultado: 'Ganado' },
	{ torneo: 'Abierto Nacional', disciplina: 'Tenis', resultado: 'Perdido' },
	{ torneo: 'Torneo Relámpago', disciplina: 'Tenis', resultado: 'Perdido' },
]

export const Players = () => {
	const { players } = useContext(PlayerContext)
	const { user } = useContext(UserContext)

	return (
		<Box display={'flex'}>
			<Navbar />
			<Sidebar />
			<Box sx={{ px: 4, pt: 4, width: '100%', minHeight: '100vh', mt: 8 }}>
				<SearchBar />
				{players.length > 0 ? (
					<Grid container spacing={4} sx={{ height: '100%' }}>
						{players.map((player: Player) => (
							<React.Fragment key={player._id}>
								<Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											gap: 2,
										}}
									>
										<Avatar
											sx={{ bgcolor: '#f37c2b', width: 100, height: 100 }}
										>
											{player.disciplines.includes('tenis') ? (
												<SportsTennisIcon sx={{ fontSize: 50 }} />
											) : (
												<img
													src={padel}
													alt="Padel"
													style={{ width: '50px', height: '50px' }}
												/>
											)}
										</Avatar>
										<Typography variant="h6" fontWeight="bold">
											{player.firstName} {player.lastName}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{player.province}
										</Typography>
										{user?._id === player.userId && (
											<Button
												variant="contained"
												sx={{ backgroundColor: '#f37c2b' }}
											>
												<Link to={`/profile/${player.userId}`}>
													Editar perfil
												</Link>
											</Button>
										)}
									</Box>
								</Grid>

								<Grid size={{ xs: 12, md: 8 }} sx={{ textAlign: 'center' }}>
									<Typography variant="h6" fontWeight="bold" mb={1}>
										Disciplinas
									</Typography>
									<Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
										{player.disciplines.includes('tenis') && (
											<Chip label="Tenis" color="secondary" />
										)}
										{player.disciplines.includes('padel') && (
											<Chip label="Padel" color="secondary" />
										)}
									</Box>

									<Typography variant="h6" fontWeight="bold" mb={1}>
										Historial de torneos
									</Typography>
									<TableContainer component={Paper} sx={{ mb: 4 }}>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>Torneo</TableCell>
													<TableCell>Disciplina</TableCell>
													<TableCell>Resultado</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{historialTorneos.map((row, index) => (
													<TableRow key={index}>
														<TableCell>{row.torneo}</TableCell>
														<TableCell>{row.disciplina}</TableCell>
														<TableCell>{row.resultado}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>

									<Typography variant="h6" fontWeight="bold" mb={1}>
										Resultados recientes
									</Typography>
									<TableContainer component={Paper} sx={{ mb: 6 }}>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>Torneo</TableCell>
													<TableCell>Disciplina</TableCell>
													<TableCell>Resultado</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{resultadosRecientes.map((row, index) => (
													<TableRow key={index}>
														<TableCell>{row.torneo}</TableCell>
														<TableCell>{row.disciplina}</TableCell>
														<TableCell>{row.resultado}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
								</Grid>
							</React.Fragment>
						))}
					</Grid>
				) : (
					<Grid
						container
						direction="column"
						display={'flex'}
						alignItems="center"
						justifyContent="center"
						sx={{ height: '60%' }}
					>
						<Typography variant="h3">
							Busca jugadores para ver sus perfiles
						</Typography>
					</Grid>
				)}
			</Box>
		</Box>
	)
}
