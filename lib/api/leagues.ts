import axios from 'axios'

import { headers } from '@/lib/api/headers'

export const fetchLeagueByLeagueId = async (leagueId: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
        params: { id: leagueId },
        headers,
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const fetchLeagueByTeamId = async (teamId: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
        params: { team: teamId },
        headers,
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
