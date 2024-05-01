import { Team } from '@/lib/types/coach'

export interface FixtureStats {
    team: Team
    statistics: Statistic[]
}

export interface Statistic {
    type: string
    value: number
}
