import { Event } from '@/lib/types/event'

export interface FixtureObj {
    fixture: Fixture
    league: League
    teams: Teams
    goals: Goals
    score: Score
    events: Event[]
}

export interface Fixture {
    id: number
    referee: string
    timezone: string
    date: string
    timestamp: number
    periods: Periods
    venue: Venue
    status: Status
}

export interface Periods {
    first: number
    second: number
}

export interface Venue {
    id: number
    name: string
    city: string
}

export interface Status {
    long: string
    short: string
    elapsed: number | null
}

export interface League {
    id: number
    name: string
    country: string
    logo: string
    flag: string | null
    season: number
    round: string
}

export interface Teams {
    home: Team
    away: Team
}

export interface Team {
    id: number
    name: string
    logo: string
    winner: boolean
}

export interface Goals {
    home: number
    away: number
}

export interface Score {
    halftime: Goals
    fulltime: Goals
    extratime: Extratime
    penalty: Penalty
}

export interface Extratime {
    home: number | null
    away: number | null
}

export interface Penalty {
    home: number | null
    away: number | null
}
