export interface Player{
    _id?: string,
    userId?: string,
	firstName: string
	lastName: string
	city?: string
	province?: string,
	birthDate?: Date
	gender?: 'masculino' | 'femenino' | 'otro'
	avatarUrl?: string
	disciplines: ('tenis' | 'padel')[]
	technicalSkills: {
		power: number
		endurance: number
		technique: number
	}
}

export interface Players {
    players: Player[]
}