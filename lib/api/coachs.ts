import axios from 'axios'

import { headers } from '@/lib/api/headers'

export const fetchCoachByCoachId = async (coachId: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/coachs',
        params: {
            id: coachId,
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

export const fetchCoachByTeamId = async (teamId: string) => {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/coachs',
        params: {
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
