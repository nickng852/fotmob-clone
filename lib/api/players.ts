import axios from 'axios'

import { headers } from '@/lib/api/headers'

export const fetchPlayerByPlayerId = async (playerId: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players',
        params: {
            id: playerId,
            season: '2023',
        },
        headers,
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const fetchPlayersByTeamId = async (season: string, teamId: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players',
        params: {
            season: season,
            team: teamId,
        },
        headers,
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const fetchTopScorers = async (leagueId: string, season: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers',
        params: {
            league: leagueId,
            season: season,
        },
        headers,
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const fetchTopAssists = async (leagueId: string, season: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players/topassists',
        params: {
            league: leagueId,
            season: season,
        },
        headers,
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const fetchTopYellowCards = async (leagueId: string, season: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players/topyellowcards',
        params: {
            league: leagueId,
            season: season,
        },
        headers,
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const fetchTopRedCards = async (leagueId: string, season: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players/topredcards',
        params: {
            league: leagueId,
            season: season,
        },
        headers,
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
