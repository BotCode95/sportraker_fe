import { useContext, useEffect, useState, type MouseEvent } from 'react'
import {
	Button,
	TextField,
	Box,
	Typography,
	Card,
	InputAdornment,
	IconButton,
	Grid,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext/UserContext'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import background from '../assets/bg.png'
import logo_sport_tracker from '../assets/logo_sport_tracker.svg'
// import { Spinner } from '../components/dashboard/Spinner/Spinner'
// import { Oval as SpinnerLoading } from 'react-loader-spinner'

type FormValues = {
	email: string
	password: string
}

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<FormValues>()

	const { token, status, message, changePasswordByEmail, cleanMessage, login } =
		useContext(UserContext)

	const onSubmit = handleSubmit((data) => {
		setActiveSpinner(true)
		login(data)
		reset()
		setActiveSpinner(false)
	})

	const [activeSpinner, setActiveSpinner] = useState(false)

	const emailValue = watch('email')

	useEffect(() => {
		setTimeout(() => {
			cleanMessage()
		}, 3000)
	}, [message])

	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const navigate = useNavigate()

	const resetPassword = () => {
		changePasswordByEmail(emailValue, '123456')
	}

	useEffect(() => {
		if (localStorage.getItem('token') && status === 'AUTHENTICATED') {
			setActiveSpinner(true)
			navigate('/home')
		}
	}, [token])

	if (status === 'CHECKING') {
		return (
			<Grid
				container
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				width={'100%'}
				paddingTop={20}
			>
				{/* <SpinnerLoading width="200" height="200" /> */}
			</Grid>
		)
	}

	return (
		<Box>
			{/* {activeSpinner && <Spinner />} */}
			<Grid
				container
				direction="column"
				spacing="2"
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				minHeight={'90vh'}
				height={'100vh'}
				width={'100vw'}
				style={{
					backgroundImage: `url(${background})`,
					backgroundSize: 'cover',
				}}
			>
				<img src={logo_sport_tracker} alt="logo_sport_tracker" width={200} />

				<Typography variant="h4">Inicio de sesión</Typography>

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
						<Grid size={{ xs: 12, md: 6, lg: 6, xl: 6 }}>
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
								label="Correo electrónico"
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
						<Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
							<TextField
								{...register('password', {
									required: {
										value: true,
										message: 'Campo requerido',
									},
								})}
								type={showPassword ? 'text' : 'password'}
								name="password"
								margin="dense"
								fullWidth
								label="Contraseña"
								required
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? (
													<VisibilityOff color="primary" />
												) : (
													<Visibility color="primary" />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
								InputLabelProps={{ className: 'textfield' }}
								inputProps={{ className: 'input_base' }}
								sx={{
									marginTop: '35px',
									width: '400px',
									color: '#ffffff',
									opacity: 1,
								}}
							/>

							{errors.password && (
								<Typography sx={{ color: 'white' }}>
									{errors.password.message}
								</Typography>
							)}
						</Grid>
						{message ? <p style={{ color: 'white' }}>{message}</p> : null}
						<Grid
							size={{ xs: 12, md: 12, lg: 12, xl: 12 }}
							sx={{ marginTop: '20px', marginBottom: '20px' }}
						>
							{activeSpinner ? (
								// <Spinner />
								<div>Agregar spinner</div>
							) : (
								<Button
									variant="contained"
									color={'secondary'}
									type="submit"
									fullWidth
								>
									Ingresar
								</Button>
							)}
						</Grid>
						<Grid
							size={{ xs: 12, md: 12, lg: 12, xl: 12 }}
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
						>
							<Typography>
								<Link to={'/register'}>¿Deseas crear una cuenta?</Link>
							</Typography>
							<Button
								variant={'contained'}
								color={'secondary'}
								onClick={resetPassword}
								style={{
									marginLeft: '10px',
								}}
								disabled={emailValue?.length === 0}
							>
								Olvidé mi contraseña
							</Button>
						</Grid>
					</form>
				</Card>
			</Grid>
		</Box>
	)
}
