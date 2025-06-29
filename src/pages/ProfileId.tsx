import { useContext, useEffect, useState } from 'react'
import {
	TextField,
	Box,
	Typography,
	Button,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Checkbox,
	FormControlLabel,
	FormGroup,
	FormLabel,
} from '@mui/material'
import { PlayerContext } from '../context/PlayerContext'
import type { Player } from '../types/player'
import { useParams } from 'react-router-dom'

export const ProfileId = () => {
	const { id } = useParams<{ id: string }>()
	const { player, getPlayerById, updatePlayer } = useContext(PlayerContext)

	const [formData, setFormData] = useState<Player>({
		_id: '',
		userId: '',
		firstName: '',
		lastName: '',
		province: '',
		gender: undefined,
		disciplines: ['tenis'],
		technicalSkills: {
			power: 0,
			endurance: 0,
			technique: 0,
		},
	})

	useEffect(() => {
		if (id) getPlayerById(id)
	}, [id])

	useEffect(() => {
		if (player) {
			setFormData({
				firstName: player.firstName || '',
				lastName: player.lastName || '',
				province: player.province || '',
				gender: player.gender || undefined,
				disciplines: player.disciplines || [],
				technicalSkills: {
					power: player.technicalSkills.power || 0,
					endurance: player.technicalSkills.endurance || 0,
					technique: player.technicalSkills.technique || 0,
				},
			})
		}
	}, [player])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			technicalSkills: {
				...formData.technicalSkills,
				[e.target.name]: Number(e.target.value),
			},
		})
	}

	const handleDisciplineToggle = (discipline: 'tenis' | 'padel') => {
		const updated = formData.disciplines.includes(discipline)
			? formData.disciplines.filter((d) => d !== discipline)
			: [...formData.disciplines, discipline]

		setFormData({ ...formData, disciplines: updated })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		updatePlayer(id ?? '', formData)
	}

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			maxWidth={500}
			mx="auto"
			mt={4}
			display="flex"
			flexDirection="column"
			gap={2}
		>
			<Typography variant="h5" fontWeight="bold">
				Editar Perfil
			</Typography>

			<TextField
				label="Nombre"
				name="name"
				value={formData.firstName}
				onChange={handleChange}
				fullWidth
			/>
			<TextField
				label="Apellido"
				name="lastName"
				value={formData.lastName}
				onChange={handleChange}
				fullWidth
			/>
			<TextField
				label="Provincia"
				name="province"
				value={formData.province}
				onChange={handleChange}
				fullWidth
			/>

			<FormControl fullWidth>
				<InputLabel id="gender-label">Género</InputLabel>
				<Select
					labelId="gender-label"
					name="gender"
					value={formData.gender}
					label="Género"
					onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
				>
					<MenuItem value="masculino">Masculino</MenuItem>
					<MenuItem value="femenino">Femenino</MenuItem>
					<MenuItem value="otro">Otro</MenuItem>
				</Select>
			</FormControl>

			<FormGroup>
				<FormLabel component="legend">Disciplinas</FormLabel>
				<FormControlLabel
					control={
						<Checkbox
							checked={formData.disciplines.includes('tenis')}
							onChange={() => handleDisciplineToggle('tenis')}
						/>
					}
					label="Tenis"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={formData.disciplines.includes('padel')}
							onChange={() => handleDisciplineToggle('padel')}
						/>
					}
					label="Padel"
				/>
			</FormGroup>

			<Typography variant="subtitle1">Habilidades Técnicas</Typography>
			<TextField
				label="Potencia"
				name="power"
				type="number"
				value={formData.technicalSkills.power}
				onChange={handleSkillChange}
			/>
			<TextField
				label="Resistencia"
				name="endurance"
				type="number"
				value={formData.technicalSkills.endurance}
				onChange={handleSkillChange}
			/>
			<TextField
				label="Técnica"
				name="technique"
				type="number"
				value={formData.technicalSkills.technique}
				onChange={handleSkillChange}
			/>

			<Button type="submit" variant="contained" color="primary">
				Guardar cambios
			</Button>
		</Box>
	)
}
