import type { Player } from '../../types/player'
import type { PlayerState } from './PlayerProvider'

type PlayerActionType = 
| {type: 'GET_PLAYERS', payload: Player[]}   
| {type: 'GET_PLAYER', payload: Player}   
| {type: 'UPDATE_PLAYER', payload: Player}   
| {type: 'MESSAGE_ERROR', payload: string}   
| {type: 'CLEAN_MESSAGE'}   
| {type: 'LOADING_START'}   
| {type: 'LOADING_END' }   
| {type: 'RESET_PLAYERS' }   


export const playerReducer = (state: PlayerState, action: PlayerActionType): PlayerState => {
    switch (action.type) {
    case 'GET_PLAYERS':
        return {
            ...state,
            players: action.payload
        }
    case 'GET_PLAYER':
        return {
            ...state,
            player: action.payload
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
    case 'RESET_PLAYERS':
        return  {
            ...state,
            players: [],
            player: null,
        }
    case 'UPDATE_PLAYER':
        return  {
            ...state,
            player: action.payload,
        }
    default:		
        return state
    }
}