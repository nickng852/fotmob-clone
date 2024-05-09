import { Team } from '@/lib/types/coach'

export interface Standing {
    league: League
}

export interface League {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
    standings: Club[][]
}

export interface Club {
    rank: number
    team: Team
    points: number
    goalsDiff: number
    group: string
    form: null | string
    status: string
    description: null | string
    all: Stat
    home: Stat
    away: Stat
    update: string
}

export interface Stat {
    played: number
    win: number
    draw: number
    lose: number
    goals: {
        for: number
        against: number
    }
}
