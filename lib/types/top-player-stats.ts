import { Birth } from '@/lib/types/coach'
import { Statistic } from '@/lib/types/player'

export interface PlayerObj {
    player: Player
    statistics: Statistic[]
}

export interface Player {
    id: number
    name: string
    firstname: string
    lastname: string
    age: number
    birth: Birth
    nationality: string
    height: string
    weight: string
    injured: boolean
    photo: string
}
