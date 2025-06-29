import { useEffect, useReducer, type FC } from 'react'
import { UserContext, userReducer } from '.'
import api from '../../api/api'
import type {
	Login,
	LoginResponse,
	Register,
	RegisterResponse,
	Status,
} from '../../types/forms'
import type { User } from '../../types/user'
import axios from 'axios'
import { notifySuccess } from '../../utils/notify'
import type { Player } from '../../types/player'

interface Props {
	children: React.ReactNode
}
export interface UserState {
	token: string | null
	user: User | null
	player: Player | null
	status: Status
	message: string
	isLoading: boolean
}

const User_INITIAL_STATE: UserState = {
	token: '',
	user: null,
	player: null,
	status: 'CHECKING',
	message: '',
	isLoading: false,
}

export const UserProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, User_INITIAL_STATE)
	useEffect(() => {
		getToken()
	}, [])
	const login = async (loginUser: Login): Promise<void> => {
		try {
			const { data } = await api.post<LoginResponse>('/auth/login', loginUser)
			const { user, player, token } = data

			dispatch({
				type: 'LOGIN',
				payload: {
					user,
					player,
					token,
				},
			})
			localStorage.setItem('token', token)
		} catch (error) {
			let message = ''
			if (axios.isAxiosError(error)) {
				if (error.response) {
					message = error.response.data.msg || 'Error del servidor'
				} else if (error.request) {
					message =
						'No se recibió respuesta del servidor. Por favor, intente de nuevo.'
				} else {
					message = error.message
				}
			}
			dispatch({
				type: 'MESSAGE_ERROR',
				payload: message,
			})
		}
	}

	const register = async (registerUser: Register): Promise<void> => {
		try {
			const { data } = await api.post<RegisterResponse>('/user', registerUser)
			const { user, player, token } = data

			dispatch({
				type: 'REGISTER',
				payload: {
					user,
					player,
					token,
				},
			})
			localStorage.setItem('token', data.token)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			let message = ''
			if (axios.isAxiosError(error)) {
				if (error.response) {
					message = error.response.data.msg || 'Error del servidor'
				} else if (error.request) {
					message =
						'No se recibió respuesta del servidor. Por favor, intente de nuevo.'
				} else {
					message = error.message
				}
			}

			dispatch({
				type: 'MESSAGE_ERROR',
				payload: message,
			})
		}
	}
	const logout = () => {
		localStorage.removeItem('token')
		dispatch({
			type: 'LOGOUT',
		})
	}

	const getToken = async () => {
		const token = localStorage.getItem('token')
		dispatch({ type: 'LOADING_START' })
		if (!token) {
			dispatch({ type: 'LOGOUT' })
			dispatch({ type: 'LOADING_END' })
			return
		}

		try {
			const res = await api.get<LoginResponse>('/auth', {
				headers: { 'x-token': token },
			})
			if (res.status !== 200) {
				localStorage.removeItem('token')
				dispatch({ type: 'LOGOUT' })
			} else {
				const { user, player } = res.data

				dispatch({
					type: 'LOGIN',
					payload: {
						user,
						player,
						token: res.data.token,
					},
				})
			}
		} catch (error) {
			console.log('error', error)
			dispatch({ type: 'LOGOUT' })
		} finally {
			dispatch({ type: 'LOADING_END' })
		}
	}
	const cleanMessage = () => {
		dispatch({
			type: 'CLEAN_MESSAGE',
		})
	}

	const setMessageError = (message: string) => {
		dispatch({
			type: 'MESSAGE_ERROR',
			payload: message,
		})
	}

	const changePassword = async (password: string) => {
		dispatch({ type: 'LOADING_START' })
		try {
			const { status } = await api.post<User>('/user/change-password', {
				password,
			})

			if (status === 200) {
				notifySuccess('La contraseña fue actualizada correctamente')
				dispatch({
					type: 'CHANGE_PASSWORD',
				})
				return
			}
			dispatch({
				type: 'MESSAGE_ERROR',
				payload: 'Ocurrio un error al intentar cambiar la contraseña',
			})
		} catch (error) {
			let message = ''
			if (axios.isAxiosError(error)) {
				if (error.response) {
					message = error.response.data.msg || 'Error del servidor'
				} else if (error.request) {
					message =
						'No se recibió respuesta del servidor. Por favor, intente de nuevo.'
				} else {
					message = error.message
				}
			}

			dispatch({
				type: 'MESSAGE_ERROR',
				payload: message,
			})
		} finally {
			dispatch({ type: 'LOADING_END' })
		}
	}

	const changePasswordByEmail = async (email: string, password: string) => {
		dispatch({ type: 'LOADING_START' })
		try {
			const { status } = await api.post<User>(
				'/user/change-password-by_email',
				{
					password,
					email,
				}
			)

			if (status === 200) {
				notifySuccess(
					`La contraseña se reseteo a ${password}, dentro del juego podras actualizarla`,
					4000
				)
				dispatch({
					type: 'CHANGE_PASSWORD',
				})
				return
			}
			dispatch({
				type: 'MESSAGE_ERROR',
				payload:
					'Ocurrio un error al intentar cambiar la contraseña, revise que el mail sea valido',
			})
		} catch (error) {
			let message = ''
			if (axios.isAxiosError(error)) {
				if (error.response) {
					message = error.response.data.msg || 'Error del servidor'
				} else if (error.request) {
					message =
						'No se recibió respuesta del servidor. Por favor, intente de nuevo.'
				} else {
					message = error.message
				}
			}

			dispatch({
				type: 'MESSAGE_ERROR',
				payload: message,
			})
		} finally {
			dispatch({ type: 'LOADING_END' })
		}
	}

	return (
		<UserContext.Provider
			value={{
				...state,
				login,
				register,
				logout,
				getToken,
				cleanMessage,
				setMessageError,
				changePassword,
				changePasswordByEmail,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
