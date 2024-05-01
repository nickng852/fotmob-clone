import _ from 'lodash'
import { ScrollView, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'

import Events from '@/app/fixture/components/(facts)/events'
import MatchInfo from '@/app/fixture/components/(facts)/match-info'
import PenaltyShootout from '@/app/fixture/components/(facts)/penalty-shootout'
import Standings from '@/app/fixture/components/(facts)/standings'
import TopRatedPlayers from '@/app/fixture/components/(facts)/top-rated-players'
import { fetchPlayerStats } from '@/lib/api/fixtures'
import { fetchStandings } from '@/lib/api/standings'
import { FixtureObj } from '@/lib/types/fixture'

export default function FactsTab({ match }: { match: FixtureObj }) {
    const { fixture, league, teams, events } = match

    const {
        isPending: standingsPending,
        isSuccess: standingsSuccess,
        data: standingsData,
    } = useQuery({
        queryKey: ['standings', league.id.toString(), league.season.toString()],
        queryFn: () =>
            fetchStandings(league.id.toString(), league.season.toString()),
    })

    const {
        isPending: playerStatsPending,
        isSuccess: playerStatsSuccess,
        data: playerStatsData,
    } = useQuery({
        queryKey: ['fixtures/players', fixture.id.toString()],
        queryFn: () => fetchPlayerStats(fixture.id.toString()),
    })

    const isPending = standingsPending || playerStatsPending
    const isSuccess = standingsSuccess && playerStatsSuccess

    return (
        <ScrollView className="bg-[#FAFAFA] dark:bg-black">
            <View style={{ gap: 12 }} className="p-[10px]">
                {events.length > 0 && (
                    <>
                        <Events
                            homeTeamId={teams.home.id}
                            awayTeamId={teams.away.id}
                            events={events}
                        />

                        {events.filter(
                            (event) => event.comments === 'Penalty Shootout'
                        ).length > 0 && (
                            <PenaltyShootout
                                homeTeamId={teams.home.id}
                                awayTeamId={teams.away.id}
                                events={events.filter(
                                    (event) =>
                                        event.comments === 'Penalty Shootout'
                                )}
                            />
                        )}
                    </>
                )}

                <MatchInfo fixture={fixture} league={league} />

                {standingsSuccess &&
                    !_.isEmpty(standingsData.response) &&
                    league.country !== 'World' && (
                        <Standings
                            homeTeamId={teams.home.id}
                            awayTeamId={teams.away.id}
                            standingsData={standingsData.response[0]}
                            isFiltered
                        />
                    )}

                {playerStatsSuccess && !_.isEmpty(playerStatsData.response) && (
                    <TopRatedPlayers
                        homeTeamId={teams.home.id}
                        awayTeamId={teams.away.id}
                        events={events}
                        playerStats={playerStatsData.response}
                    />
                )}
            </View>
        </ScrollView>
    )
}
