import { Typography } from '@mui/material'
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Tooltip,
} from '@mui/material'
import { Link } from 'react-router-dom'

const menuItems = [
	{ text: 'Buscar jugadores', link: '/search-players', enabled: true },
	{ text: 'Torneos', link: '/tournaments', enabled: false },
	{ text: 'Historial de partidos', link: '/match-history', enabled: false },
]

interface Menu {
	text: string
	link: string
	enabled: boolean
}

export const Sidebar = () => {
	return (
		<Box
			component="nav"
			sx={{ width: 240, flexShrink: 0, pt: 8, backgroundColor: '#d66a17' }}
		>
			<Box
				sx={{
					width: 240,
					// bgcolor: '#f5f5f5',
					height: '100vh',
					pt: 2,
					borderRight: '1px solid #000000',
					color: '#ffffff',
				}}
			>
				<Typography variant="h4" color="initial" align="center">
					Sport<strong>Tracker</strong>
				</Typography>
				<List>
					{menuItems.map(({ text, link, enabled }: Menu) => (
						<ListItem key={text} disablePadding>
							<Tooltip
								title="Esta sección estará disponible pronto"
								disableHoverListener={enabled}
							>
								<ListItemButton>
									{enabled ? (
										<Link to={link}>
											<ListItemText primary={text} />
										</Link>
									) : (
										<ListItemText primary={text} color="#f3f3f3" />
									)}
								</ListItemButton>
							</Tooltip>
						</ListItem>
					))}
				</List>
			</Box>
		</Box>
	)
}
