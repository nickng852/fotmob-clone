import { Event } from '@/lib/types/event'
import { StartXI } from '@/lib/types/lineup'
import { PlayerStats, Players } from '@/lib/types/player-stats'

export function getPlayerPhoto(playerId: number) {
    return `https://media.api-sports.io/football/players/${playerId.toString()}.png`
}

export function formatPlayerName(fullName: string) {
    return fullName.split(' ').length > 1
        ? fullName.split(' ').length > 2
            ? fullName
                  .split(' ')
                  .slice(1)
                  .map((name: string) => name)
                  .join(' ')
            : fullName.split(' ').slice(-1)
        : fullName
}

export function formatPlayerPosition(playerPos: string) {
    switch (playerPos) {
        case 'G':
            return 'Keeper'
        case 'D':
            return 'Defender'
        case 'M':
            return 'Midfielder'
        case 'F':
            return 'Attacker'
    }
}

export function useLineup(events: Event[], playerStats: PlayerStats[]) {
    const getPlayerStats = (teamId: number, playerId: number) => {
        const playerTeamStats = playerStats.find(
            (playerStat: PlayerStats) => playerStat.team.id === teamId
        )

        return playerTeamStats?.players.find(
            (players: Players) => players.player.id === playerId
        )
    }

    const isPlayerCaptain = (teamId: number, playerId: number) => {
        return getPlayerStats(teamId, playerId)?.statistics[0].games.captain
    }

    const isPlayerSubstitute = (teamId: number, playerId: number) => {
        return getPlayerStats(teamId, playerId)?.statistics[0].games.substitute
    }

    const isPlayerSubstituted = (teamId: number, playerId: number) => {
        const substituted = isPlayerSubstitute(teamId, playerId)
            ? events.find(
                  (event: Event) =>
                      event.type === 'subst' && event.assist.id === playerId
              )
            : events.find(
                  (event: Event) =>
                      event.type === 'subst' && event.player.id === playerId
              )

        return substituted
    }

    const getSubstitutedTime = (teamId: number, playerId: number) => {
        const substitutedTime = isPlayerSubstitute(teamId, playerId)
            ? events.find(
                  (event: Event) =>
                      event.type === 'subst' && event.assist.id === playerId
              )?.time.elapsed
            : events.find(
                  (event: Event) =>
                      event.type === 'subst' && event.player.id === playerId
              )?.time.elapsed

        return substitutedTime
    }

    const getStartXITeamRating = (teamId: number, startXI: StartXI[]) => {
        const allRatings = startXI.map((startXI: StartXI) => {
            return getPlayerRating(teamId, startXI.player.id)
        })

        const sum = allRatings.reduce((acc: any, cV: any) => {
            acc += Number(cV)
            return acc
        }, 0)

        return (sum / startXI.length).toFixed(1)
    }

    const getPlayerRating = (teamId: number, playerId: number) => {
        return getPlayerStats(teamId, playerId)?.statistics[0].games.rating
    }

    const getPlayerGoals = (playerId: number) =>
        events.filter(
            (event: Event) =>
                event.type === 'Goal' && event.player.id === playerId
        )

    const getPlayerAssists = (playerId: number) =>
        events.filter(
            (event: Event) =>
                event.type === 'Goal' && event.assist.id === playerId
        )

    const getPlayerYellowCards = (playerId: number) =>
        events.filter(
            (event: Event) =>
                event.type === 'Card' &&
                event.detail === 'Yellow Card' &&
                event.player.id === playerId
        )

    const getPlayerRedCards = (playerId: number) =>
        events.filter(
            (event: Event) =>
                event.type === 'Card' &&
                event.detail === 'Red Card' &&
                event.player.id === playerId
        )

    return {
        getPlayerStats,
        isPlayerCaptain,
        isPlayerSubstitute,
        isPlayerSubstituted,
        getSubstitutedTime,
        getStartXITeamRating,
        getPlayerRating,
        getPlayerGoals,
        getPlayerAssists,
        getPlayerYellowCards,
        getPlayerRedCards,
    }
}
