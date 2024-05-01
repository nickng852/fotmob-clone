export interface Lineup {
    team: Team
    formation: string
    startXI: StartXI[]
    substitutes: Substitute[]
    coach: Coach
}

export interface Team {
    id: number
    name: string
    logo: string
    colors: Colors
}

export interface Colors {
    player: Color
    goalkeeper: Color
}

export interface Color {
    primary: string
    number: string
    border: string
}

export interface StartXI {
    player: Player
}

export interface Substitute {
    player: Player
}

export interface Player {
    id: number
    name: string
    number: number
    pos: string
    grid: string
}

export interface Coach {
    id: number
    name: string
    photo: string
}
