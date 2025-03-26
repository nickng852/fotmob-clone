export interface Score {
    halftime: ScoreLine
    fulltime: ScoreLine
    extratime: ScoreLine
    penalty: ScoreLine
}

interface ScoreLine {
    home: number | null
    away: number | null
}
