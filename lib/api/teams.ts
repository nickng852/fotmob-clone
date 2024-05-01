import axios from 'axios'

import { headers } from '@/lib/api/headers'

export const fetchTeam = async (teamId: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
        params: {
            id: teamId,
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

export const fetchTeamStats = async (
    leagueId: string,
    season: string,
    teamId: string
) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
        params: {
            league: leagueId,
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
