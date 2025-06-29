import { useReducer, type FC } from 'react'
import { PlayerContext, playerReducer } from '.'
import api from '../../api/api'
import axios from 'axios'
import type { Player, Players } from '../../types/player'

interface Props {
	children: React.ReactNode
}
export interface PlayerState {
	player: Player | null
	players: Player[]
	message: string
	isLoading: boolean
}

const Player_INITIAL_STATE: PlayerState = {
	player: null,
	players: [],
	message: '',
	isLoading: false,
}

export const PlayerProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(playerReducer, Player_INITIAL_STATE)

	const getPlayers = async (
		value?: string,
		query?: 'name' | 'province' | 'city'
	): Promise<void> => {
		try {
			let dataContent
			if (value && query) {
				dataContent = await api.get<Players>(
					'/player?value=' + value + '&query=' + query
				)
			} else {
				dataContent = await api.get<Players>('/player')
			}

			dispatch({
				type: 'GET_PLAYERS',
				payload: dataContent?.data.players || [],
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
		}
	}

	const getPlayerById = async (id: string): Promise<void> => {
		try {
			const { data } = await api.get<Player>('/player/' + id)

			dispatch({
				type: 'GET_PLAYER',
				payload: data,
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
		}
	}

	const updatePlayer = async (id: string, player: Player): Promise<void> => {
		try {
			const { data } = await api.put<Player>('/player/' + id, player)

			dispatch({
				type: 'UPDATE_PLAYER',
				payload: data,
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

	const resetPlayers = () => {
		dispatch({
			type: 'RESET_PLAYERS',
		})
	}

	return (
		<PlayerContext.Provider
			value={{
				...state,
				getPlayers,
				getPlayerById,
				cleanMessage,
				setMessageError,
				resetPlayers,
				updatePlayer,
			}}
		>
			{children}
		</PlayerContext.Provider>
	)
}
