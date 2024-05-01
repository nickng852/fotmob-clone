export interface Coach {
    id: number
    name: string
    firstname: string
    lastname: string
    age: number
    birth: Birth
    nationality: string
    height: string
    weight: string
    photo: string
    team: Team
    career: Career[]
}

export interface Birth {
    date: string
    place: string
    country: string
}

export interface Team {
    id: number
    name: string
    logo: string
}

export interface Career {
    team: Team
    start: string
    end: string | null
}
