import type { Player } from '../../types/player'
import type { User } from '../../types/user'
import type { UserState } from './UserProvider'

type UserActionType = 
| {type: 'LOGIN', payload: {user: User,  player: Player,token: string}}   
| {type: 'REGISTER', payload:  {user: User, player: Player, token: string}}   
| {type: 'MESSAGE_ERROR', payload: string}   
| {type: 'LOGOUT'}   
| {type: 'CLEAN_MESSAGE'}   
| {type: 'CHANGE_PASSWORD'}   
| {type: 'LOADING_START'}   
| {type: 'LOADING_END' }   


export const userReducer = (state: UserState, action: UserActionType): UserState => {
	switch (action.type) {
	case 'LOGIN':
	case 'REGISTER':
		return {
			...state,
			user: action.payload.user,
			player: action.payload.player,
			token: action.payload.token,
			status: 'AUTHENTICATED'
		}
	case 'LOGOUT':
		return {
			...state,
			token: null,
			status: 'NOT-AUTHENTICATED'
		}
	case 'MESSAGE_ERROR':
		return {
			...state,
			message: action.payload
		}
	case 'CLEAN_MESSAGE':
		return  {
			...state,
			message: ''
		}
	case 'CHANGE_PASSWORD':
		return {
			...state,
		}
	case 'LOADING_START':
		return  {
			...state,
			isLoading: true
		}
	case 'LOADING_END':
		return  {
			...state,
			isLoading: false
		}
	default:		
		return state
	}
}