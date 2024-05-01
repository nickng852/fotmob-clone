import { Team } from '@/lib/types/coach'
import { League } from '@/lib/types/player'

export interface Injury {
    player: Player
    team: Team
    fixture: Fixture
    league: League
}

export interface Player {
    id: number
    name: string
    photo: string
    type: string
    reason: string
}

export interface Fixture {
    id: number
    timezone: string
    date: string
    timestamp: number
}
