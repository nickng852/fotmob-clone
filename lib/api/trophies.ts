import axios from 'axios'

import { headers } from '@/lib/api/headers'

export const fetchTrophiesByCoachId = async (coachId: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/trophies',
        params: {
            coach: coachId,
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

export const fetchTrophiesByPlayerId = async (playerId: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/trophies',
        params: {
            player: playerId,
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
