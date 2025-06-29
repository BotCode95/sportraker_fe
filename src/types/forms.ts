import type { Player } from './player'
import type { User } from './user'

export interface Login {
    email: string
    password: string
}

export interface Register{
    name: string
    lastname: string
    email: string
    password: string
    dni: number
}


export interface RegisterResponse {
    msg: string,
    user: User
    player: Player
    token: string
}


export interface LoginResponse {
    user: User
    player: Player
    token: string
    
}


export type Status = 'CHECKING' | 'AUTHENTICATED' | 'NOT-AUTHENTICATED'