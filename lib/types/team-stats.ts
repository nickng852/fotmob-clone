import { Team } from '@/lib/types/coach'
import { League } from '@/lib/types/player'

export interface TeamStats {
    league: League
    team: Team
    form: string
    fixtures: Fixtures
    goals: Goals
    biggest: Biggest
    clean_sheet: Played
    failed_to_score: Played
    penalty: Penalty
    lineups: Lineup[]
    cards: Cards
}

export interface Fixtures {
    played: Played
    wins: Played
    draws: Played
    loses: Played
}

export interface Played {
    home: number
    away: number
    total: number
}

export interface Goals {
    for: Goal
    against: Goal
}

export interface Goal {
    total: Played
    average: Average
    minute: Minute
}

export interface Average {
    home: string
    away: string
    total: string
}

export interface Minute {
    '0-15': TotalPercentage
    '16-30': TotalPercentage
    '31-45': TotalPercentage
    '46-60': TotalPercentage
    '61-75': TotalPercentage
    '76-90': TotalPercentage
    '91-105': TotalPercentage
    '106-120': TotalPercentage
}

export interface TotalPercentage {
    total: number | null
    percentage: string | null
}

export interface Biggest {
    streak: Streak
    wins: Wins
    loses: Loses
    goals: Goals2
}

export interface Streak {
    wins: number
    draws: number
    loses: number
}

export interface Wins {
    home: string | null
    away: string | null
}

export interface Loses {
    home: string | null
    away: string | null
}

export interface Goals2 {
    for: Goal2
    against: Goal2
}

export interface Goal2 {
    home: number
    away: number
}

export interface Penalty {
    scored: TotalPercentage
    missed: TotalPercentage
    total: number
}

export interface Lineup {
    formation: string
    played: number
}

export interface Cards {
    yellow: Card
    red: Card
}

export interface Card {
    '0-15': TotalPercentage
    '16-30': TotalPercentage
    '31-45': TotalPercentage
    '46-60': TotalPercentage
    '61-75': TotalPercentage
    '76-90': TotalPercentage
    '91-105': TotalPercentage
    '106-120': TotalPercentage
}
