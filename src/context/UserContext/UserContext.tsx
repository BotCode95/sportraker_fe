import { createContext } from 'react'
import type { Login, Register, Status } from '../../types/forms'
import type { User } from '../../types/user'
import type { Player } from '../../types/player'

export interface ContextProps {
	token: string | null
	user: User | null
	player: Player | null
	status: Status
	message: string
	isLoading: boolean
	login: (loginUser: Login) => Promise<void>
	register: (registerUser: Register) => Promise<void>
	logout: () => void
	getToken: () => void
	cleanMessage: () => void
	setMessageError: (message: string) => void
	changePassword: (password: string) => Promise<void>
	changePasswordByEmail: (email: string, password: string) => Promise<void>
}

export const UserContext = createContext({} as ContextProps)
