import {
	Box,
	MenuItem,
	Select,
	TextField,
	InputLabel,
	FormControl,
} from '@mui/material'
import { useContext, useState, useEffect } from 'react'
import { PlayerContext } from '../../context/PlayerContext'
import { InputAdornment, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

export const SearchBar = () => {
	const [filter, setFilter] = useState<'name' | 'province' | 'city'>('name')
	const [searchQuery, setSearchQuery] = useState('')
	const { getPlayers, resetPlayers } = useContext(PlayerContext)

	useEffect(() => {
		if (searchQuery.length >= 3) {
			getPlayers(searchQuery, filter)
		}
	}, [searchQuery, filter])

	const handleClear = () => {
		setSearchQuery('')
		resetPlayers()
	}

	return (
		<Box display="flex" gap={2} mb={4} alignItems="center">
			<TextField
				fullWidth
				variant="outlined"
				placeholder="Buscar jugador/a"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				InputProps={{
					endAdornment: searchQuery && (
						<InputAdornment position="end">
							<IconButton onClick={handleClear} edge="end" color="secondary">
								<ClearIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			<FormControl sx={{ minWidth: 150 }}>
				<InputLabel id="filter-label">Filtrar por</InputLabel>
				<Select
					labelId="filter-label"
					value={filter}
					label="Filtrar por"
					onChange={(e) =>
						setFilter(e.target.value as 'name' | 'province' | 'city')
					}
					sx={{
						color: 'white',
						backgroundColor: '#342E37',
						'& .MuiSvgIcon-root': { color: 'white' },
					}}
				>
					<MenuItem value="name">Nombre</MenuItem>
					<MenuItem value="province">Provincia</MenuItem>
					<MenuItem value="city">Ciudad</MenuItem>
				</Select>
			</FormControl>
		</Box>
	)
}
