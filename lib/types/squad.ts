import { Team } from '@/lib/types/coach'

export interface Squad {
    team: Team
    players: Player[]
}

export interface Player {
    id: number
    name: string
    age: number
    number: number
    position: string
    photo: string
}
