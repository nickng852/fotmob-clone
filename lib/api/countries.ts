import axios from 'axios'

import { headers } from '@/lib/api/headers'

export const fetchCountries = async () => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams/countries',
        headers,
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
