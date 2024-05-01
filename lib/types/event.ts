import { Team } from '@/lib/types/coach'

export interface Event {
    time: Time
    team: Team
    player: Player
    assist: Assist
    type: string
    detail: string
    comments: string | null
}

export interface Time {
    elapsed: number
    extra: number | null
}

export interface Player {
    id: number
    name: string
}

export interface Assist {
    id: number | null
    name: string | null
}
