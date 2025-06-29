import { Box, Button, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const HomeComponent = () => {
	return (
		<Box component="main" sx={{ flexGrow: 1, p: 3, mt: 6 }} width={'100%'}>
			<Grid
				container
				size={12}
				display={'flex'}
				direction="column"
				alignItems="center"
				justifyContent="center"
				sx={{ marginTop: 10 }}
				// sx={{ height: 'calc(100vh - px)' }}
			>
				<Typography
					variant="h4"
					fontWeight="bold"
					textAlign="center"
					color="white"
				>
					Encuentra jugadores para tenis y pádel
				</Typography>
				<Typography
					variant="body1"
					textAlign="center"
					color="white"
					mt={2}
					mb={4}
					maxWidth={500}
				>
					Explora perfiles de jugadores, organizadores de torneos y lleva un
					registro de tus partidos de tenis y pádel.
				</Typography>
				<Button
					variant="contained"
					size="large"
					sx={{ backgroundColor: '#ce7b52' }}
				>
					<Link to="/search-players">Buscar jugadores</Link>
				</Button>
			</Grid>
		</Box>
	)
}
