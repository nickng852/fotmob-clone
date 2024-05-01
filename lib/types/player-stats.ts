import {
    Shots,
    Goals,
    Tackles,
    Duels,
    Dribbles,
    Fouls,
    Penalty,
} from '@/lib/types/player'

export interface PlayerStats {
    team: Team
    players: Players[]
}

export interface Team {
    id: number
    name: string
    logo: string
    update: string
}

export interface Players {
    player: Player
    statistics: Statistic[]
}

export interface Player {
    id: number
    name: string
    photo: string
}

export interface Statistic {
    games: Games
    offsides: number | null
    shots: Shots
    goals: Goals
    passes: Passes
    tackles: Tackles
    duels: Duels
    dribbles: Dribbles
    fouls: Fouls
    cards: Cards
    penalty: Penalty
}

export interface Games {
    minutes: number
    number: number
    position: string
    rating: string
    captain: boolean
    substitute: boolean
}

export interface Passes {
    total: number | null
    key: number | null
    accuracy: string | null
}

export interface Cards {
    yellow: number
    red: number
}
