import axios from 'axios'

import { headers } from '@/lib/api/headers'

export const fetchOffSquadPlayers = async (fixtureId: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/injuries',
        params: {
            fixture: fixtureId,
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
