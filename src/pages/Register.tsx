import { useContext, useEffect } from 'react'
import { Button, TextField, Grid, Box, Typography, Card } from '@mui/material'
import { useForm } from 'react-hook-form'
import { UserContext } from '../context/UserContext/UserContext'
import background from '../assets/bg.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo_sport_tracker from '../assets/logo_sport_tracker.svg'

type FormValues = {
	name: string
	lastname: string
	email: string
	password: string
	dni: number
	confirm: string
}

export const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>()

	const {
		message,
		status,
		cleanMessage,
		setMessageError,
		register: registerUser,
	} = useContext(UserContext)

	const onSubmit = handleSubmit((data) => {
		if (data.confirm !== data.password) {
			setMessageError('La contraseña no coincide con el campo confirmar')
			return
		}
		registerUser(data)
		reset()
	})

	const navigate = useNavigate()
	useEffect(() => {
		if (status === 'AUTHENTICATED') {
			navigate('/home')
			return
		}
		setTimeout(() => {
			cleanMessage()
		}, 8000)
	}, [message, status])

	return (
		<Box>
			<Grid
				container
				direction="column"
				spacing="2"
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				minHeight={'90vh'}
				width={'100vw'}
				style={{
					backgroundImage: `url(${background})`,
					backgroundSize: 'cover',
				}}
			>
				<Link to="/login">
					<img src={logo_sport_tracker} alt="logo_sport_tracker" width={200} />
				</Link>

				<Typography variant="h4">Crea tu cuenta</Typography>
				<Card
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						marginTop: '20px',
						backgroundColor: 'var(--color-primary)',
					}}
				>
					<form onSubmit={onSubmit}>
						<Grid size={{ xs: 12, sm: 12, md: 6 }}>
							<TextField
								{...register('name', {
									required: {
										value: true,
										message: 'Campo requerido',
									},
								})}
								type={'text'}
								name="name"
								margin="dense"
								className="input_base"
								fullWidth
								label="Nombre"
								color="secondary"
								required
								InputLabelProps={{ className: 'textfield' }}
								inputProps={{ className: 'input_base' }}
								sx={{ marginTop: '35px', width: '400px' }}
							/>

							{errors.name && (
								<Typography sx={{ color: 'white' }}>
									{errors.name.message}
								</Typography>
							)}
						</Grid>
						<Grid size={{ xs: 12, sm: 12, md: 6 }}>
							<TextField
								{...register('lastname', {
									required: {
										value: true,
										message: 'Campo requerido',
									},
								})}
								type={'text'}
								name="lastname"
								margin="dense"
								className="input_base"
								fullWidth
								label="Apellido"
								color="secondary"
								required
								InputLabelProps={{ className: 'textfield' }}
								inputProps={{ className: 'input_base' }}
								sx={{ marginTop: '35px', width: '400px' }}
							/>

							{errors.lastname && (
								<Typography sx={{ color: 'white' }}>
									{errors.lastname.message}
								</Typography>
							)}
						</Grid>
						<Grid size={{ xs: 12, sm: 12, md: 6 }}>
							<TextField
								{...register('email', {
									required: {
										value: true,
										message: 'Campo requerido',
									},
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
										message: 'El formato no es correcto',
									},
								})}
								type="email"
								name="email"
								margin="dense"
								required
								fullWidth
								label="Correo"
								color="secondary"
								sx={{
									marginTop: '25px',
									width: '400px',
								}}
								inputProps={{ className: 'input_base' }}
								InputLabelProps={{ className: 'textfield' }}
							/>
							{errors.email && (
								<Typography sx={{ color: 'white' }}>
									{errors.email.message}
								</Typography>
							)}
						</Grid>
						<Grid size={{ xs: 12, sm: 12, md: 6 }}>
							<TextField
								{...register('dni', {
									required: {
										value: true,
										message: 'Campo requerido',
									},
								})}
								type={'number'}
								name="dni"
								margin="dense"
								className="input_base"
								fullWidth
								label="Documento"
								color="secondary"
								required
								InputLabelProps={{ className: 'textfield' }}
								inputProps={{ className: 'input_base' }}
								sx={{ marginTop: '35px', width: '400px' }}
							/>

							{errors.dni && (
								<Typography sx={{ color: 'white' }}>
									{errors.dni.message}
								</Typography>
							)}
						</Grid>
						<Grid size={{ xs: 12, sm: 12, md: 6 }}>
							<TextField
								{...register('password', {
									required: {
										value: true,
										message: 'Campo requerido',
									},
								})}
								type={'password'}
								name="password"
								margin="dense"
								className="input_base"
								fullWidth
								label="Contraseña"
								color="secondary"
								required
								InputLabelProps={{ className: 'textfield' }}
								inputProps={{ className: 'input_base' }}
								sx={{ marginTop: '35px', width: '400px' }}
							/>

							{errors.password && (
								<Typography sx={{ color: 'white' }}>
									{errors.password.message}
								</Typography>
							)}
						</Grid>
						<Grid size={{ xs: 12, sm: 12, md: 6 }}>
							<TextField
								{...register('confirm', {
									required: {
										value: true,
										message: 'Campo requerido',
									},
								})}
								type={'password'}
								name="confirm"
								margin="dense"
								className="input_base"
								fullWidth
								label="Confirmar Contraseña"
								color="secondary"
								required
								InputLabelProps={{ className: 'textfield' }}
								inputProps={{ className: 'input_base' }}
								sx={{ marginTop: '35px', width: '400px' }}
							/>

							{errors.confirm && (
								<Typography sx={{ color: 'white' }}>
									{errors.confirm.message}
								</Typography>
							)}
						</Grid>
						{message ? <p style={{ color: 'red' }}>{message}</p> : null}
						<Grid
							size={{ xs: 12, sm: 12, md: 12 }}
							sx={{ marginTop: '20px', marginBottom: '20px' }}
						>
							<Button
								variant="contained"
								color={'secondary'}
								type="submit"
								fullWidth
							>
								Crear Cuenta
							</Button>
						</Grid>
						<Grid size={{ xs: 12, md: 8 }}>
							<NavLink className="button_link" to={'/login'}>
								¿Ya tenes una cuenta?, Inicia Sesión
							</NavLink>
						</Grid>
					</form>
				</Card>
			</Grid>
		</Box>
	)
}
