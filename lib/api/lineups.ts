import axios from 'axios'

import { headers } from '@/lib/api/headers'

export const fetchLineUp = async (fixtureId: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups',
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
