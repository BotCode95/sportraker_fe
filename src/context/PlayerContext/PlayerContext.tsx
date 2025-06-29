import { createContext } from 'react'
import type { Player } from '../../types/player'

export interface ContextProps {
	player: Player | null
	players: Player[]
	message: string
	isLoading: boolean
	getPlayers: (
		value?: string,
		query?: 'name' | 'province' | 'city'
	) => Promise<void>
	getPlayerById: (id: string) => Promise<void>
	updatePlayer: (id: string, player: Player) => Promise<void>
	cleanMessage: () => void
	setMessageError: (message: string) => void
	resetPlayers: () => void
}

export const PlayerContext = createContext({} as ContextProps)
