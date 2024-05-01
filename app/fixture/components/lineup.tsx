import clsx from 'clsx'
import { ScrollView, View } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { useQuery } from '@tanstack/react-query'

import Bench from '@/app/fixture/components/(lineup)/bench'
import Coach from '@/app/fixture/components/(lineup)/coach'
import OffSquadPlayers from '@/app/fixture/components/(lineup)/off-squad-players'
import StartingXI from '@/app/fixture/components/(lineup)/starting-xi'
import { fetchPlayerStats } from '@/lib/api/fixtures'
import { fetchOffSquadPlayers } from '@/lib/api/injuries'
import { fetchLineUp } from '@/lib/api/lineups'
import { FixtureObj } from '@/lib/types/fixture'
import { Lineup } from '@/lib/types/lineup'

const R = require('ramda')

export default function LineupTab({ match }: { match: FixtureObj }) {
    const { fixture, teams, events } = match

    const {
        isPending: lineUpPending,
        isSuccess: lineUpSuccess,
        data: lineUpData,
    } = useQuery({
        queryKey: ['lineups', fixture.id.toString()],
        queryFn: () => fetchLineUp(fixture.id.toString()),
    })

    const {
        isPending: playerStatsPending,
        isSuccess: playerStatsSuccess,
        data: playerStatsData,
    } = useQuery({
        queryKey: ['fixtures/players', fixture.id.toString()],
        queryFn: () => fetchPlayerStats(fixture.id.toString()),
    })

    const {
        isPending: offSquadPlayersPending,
        isSuccess: offSquadPlayersSuccess,
        data: offSquadPlayersData,
    } = useQuery({
        queryKey: ['injuries', fixture.id.toString()],
        queryFn: () => fetchOffSquadPlayers(fixture.id.toString()),
    })

    const isPending =
        lineUpPending || playerStatsPending || offSquadPlayersPending
    const isSuccess =
        lineUpSuccess && playerStatsSuccess && offSquadPlayersSuccess

    const offSquadPlayersByTeam =
        offSquadPlayersData &&
        R.groupBy(R.path(['team', 'id']), offSquadPlayersData.response)

    return (
        <>
            {isPending && (
                <View className="flex-1 items-center justify-center">
                    <Circle size={24} color="#A1A1AA" />
                </View>
            )}

            {isSuccess && (
                <ScrollView className="bg-[#FAFAFA] dark:bg-[#1D1D1D]">
                    {lineUpData.response.length > 0 && (
                        <View>
                            {lineUpData.response.every(
                                (team: Lineup) => team.startXI[0].player.grid
                            ) && (
                                <StartingXI
                                    homeTeamId={teams.home.id}
                                    awayTeamId={teams.away.id}
                                    events={events}
                                    lineUp={lineUpData.response}
                                    playerStats={playerStatsData.response}
                                />
                            )}

                            <View
                                style={{ gap: 12 }}
                                className="bg-[#FAFAFA] p-[10px] dark:bg-black"
                            >
                                {lineUpData.response[0].coach.id && (
                                    <Coach lineUp={lineUpData.response} />
                                )}

                                <Bench
                                    events={events}
                                    lineUp={lineUpData.response}
                                    playerStats={playerStatsData.response}
                                />
                            </View>
                        </View>
                    )}

                    {offSquadPlayersData.response.length > 0 && (
                        <View
                            className={clsx('bg-[#FAFAFA] dark:bg-black', {
                                'px-[10px] pb-[10px]':
                                    lineUpData.response.length,
                                'p-[10px]': !lineUpData.response.length,
                            })}
                        >
                            <OffSquadPlayers
                                homeTeamId={teams.home.id}
                                awayTeamId={teams.away.id}
                                offSquadPlayers={offSquadPlayersByTeam}
                            />
                        </View>
                    )}
                </ScrollView>
            )}
        </>
    )
}
