import axios from 'axios'

import { headers } from '@/lib/api/headers'

export const fetchStandings = async (leagueId: string, season: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
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
