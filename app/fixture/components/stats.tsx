import clsx from 'clsx'
import _ from 'lodash'
import { ScrollView, View, Text } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { useQuery } from '@tanstack/react-query'

import Card from '@/app/fixture/components/(stats)/card'
import PlayerStatsCard from '@/app/fixture/components/(stats)/player-stats-card'
import SeactionHeaderWithAction from '@/components/section-header-with-action'
import { fetchFixtureStats, fetchPlayerStats } from '@/lib/api/fixtures'
import { FixtureObj } from '@/lib/types/fixture'
import { FixtureStats, Statistic } from '@/lib/types/fixture-stats'
import { PlayerStats, Players } from '@/lib/types/player-stats'

interface Sections {
    [key: string]: string[]
}

const sections: Sections = {
    topStats: [
        'Ball Possession',
        'expected_goals',
        'Total Shots',
        'Passes accurate',
        'Fouls',
        'Offsides',
        'Corner Kicks',
    ],
    shots: [
        'Total Shots',
        'Shots off Goal',
        'Shots on Goal',
        'Blocked Shots',
        'Shots insidebox',
        'Shots outsidebox',
    ],
    expectedGoals: ['expected_goals'],
    passes: ['Total passes', 'Passes accurate'],
    defence: ['Goalkeeper Saves'],
    discipline: ['Yellow Cards', 'Red Cards'],
}

const getStatTypeTranslation = (type: string) => {
    switch (type) {
        case 'Ball Possession':
            return 'Ball possession'
        case 'expected_goals':
            return 'Expected goals (xG)'
        case 'Total Shots':
            return 'Total shots'
        case 'Passes accurate':
            return 'Accurate passes'
        case 'Fouls':
            return 'Fouls committed'
        case 'Offsides':
            return 'Offsides'
        case 'Corner Kicks':
            return 'Corners'
        case 'Total Shots':
            return 'Total shots'
        case 'Shots off Goal':
            return 'Shots off target'
        case 'Shots on Goal':
            return 'Shots on target'
        case 'Blocked Shots':
            return 'Blocked shots'
        case 'Shots insidebox':
            return 'Shots inside box'
        case 'Shots outsidebox':
            return 'Shots outside box'
        case 'Total passes':
            return 'Passes'
        case 'Passes accurate':
            return 'Accurate passes'
        case 'Goalkeeper Saves':
            return 'Keeper saves'
        case 'Yellow Cards':
            return 'Yellow cards'
        case 'Red Cards':
            return 'Red cards'
    }
}

export default function StatsTab({ match }: { match: FixtureObj }) {
    const { fixture, teams } = match

    const {
        isPending: fixtureStatsPending,
        isSuccess: fixtureStatsSuccess,
        data: fixtureStatsData,
    } = useQuery({
        queryKey: ['fixtures/statistics', fixture.id.toString()],
        queryFn: () => fetchFixtureStats(fixture.id.toString()),
    })

    const {
        isPending: playerStatsPending,
        isSuccess: playerStatsSuccess,
        data: playerStatsData,
    } = useQuery({
        queryKey: ['fixtures/players', fixture.id.toString()],
        queryFn: () => fetchPlayerStats(fixture.id.toString()),
    })

    const isPending = fixtureStatsPending || playerStatsPending
    const isSuccess = fixtureStatsSuccess && playerStatsSuccess

    const allPlayers = playerStatsData?.response
        .map((team: PlayerStats) => team.players)
        .flat()

    const topThreePlayersByTotalShots = allPlayers
        ?.sort(
            (a: Players, b: Players) =>
                (b.statistics[0].shots.total as number) -
                (a.statistics[0].shots.total as number)
        )
        .slice(0, 3)

    const topThreePlayersByAccPasses = allPlayers
        ?.sort(
            (a: Players, b: Players) =>
                (b.statistics[0].passes.total as number) -
                (a.statistics[0].passes.total as number)
        )
        .slice(0, 3)

    const topThreePlayersByTacklesWon = allPlayers
        ?.sort(
            (a: Players, b: Players) =>
                (b.statistics[0].tackles.total as number) -
                (a.statistics[0].tackles.total as number)
        )
        .slice(0, 3)

    const getTeamLogo = (playerId: number) => {
        const match = playerStatsData?.response.find((team: PlayerStats) =>
            team.players.find((player) => player.player.id === playerId)
        )

        return match.team.logo
    }

    return (
        <>
            {isPending && (
                <View className="flex-1 items-center justify-center">
                    <Circle size={24} color="#A1A1AA" />
                </View>
            )}

            {isSuccess &&
                fixtureStatsData.response.length > 0 &&
                playerStatsData.response.length > 0 && (
                    <ScrollView className="bg-[#FAFAFA] dark:bg-black">
                        <View className="space-y-8 p-[10px]">
                            <View style={{ gap: 12 }}>
                                {_.keys(sections).map((section: string) => {
                                    return (
                                        <Card key={section}>
                                            <Text className="text-center text-xl font-extrabold dark:text-white">
                                                {_.startCase(section)}
                                            </Text>

                                            {sections[section].map(
                                                (type: string) => {
                                                    const homeTeamStats =
                                                        fixtureStatsData.response.find(
                                                            (
                                                                teamStats: FixtureStats
                                                            ) =>
                                                                teamStats.team
                                                                    .id ===
                                                                teams.home.id
                                                        )

                                                    const awayTeamStats =
                                                        fixtureStatsData.response.find(
                                                            (
                                                                teamStats: FixtureStats
                                                            ) =>
                                                                teamStats.team
                                                                    .id ===
                                                                teams.away.id
                                                        )

                                                    const homeTeamData =
                                                        homeTeamStats.statistics.find(
                                                            (
                                                                statistic: Statistic
                                                            ) =>
                                                                statistic.type ===
                                                                type
                                                        ).value

                                                    const awayTeamData =
                                                        awayTeamStats.statistics.find(
                                                            (
                                                                statistic: Statistic
                                                            ) =>
                                                                statistic.type ===
                                                                type
                                                        ).value

                                                    const getStat = (
                                                        teamStats: FixtureStats,
                                                        type: string
                                                    ) => {
                                                        const statistic =
                                                            teamStats.statistics.find(
                                                                (
                                                                    statistic: Statistic
                                                                ) =>
                                                                    statistic.type ===
                                                                    type
                                                            )
                                                        return statistic?.value
                                                    }

                                                    const isTeamStatWin = (
                                                        team: string,
                                                        type: string
                                                    ) => {
                                                        if (
                                                            type === 'Fouls' ||
                                                            type ===
                                                                'Offsides' ||
                                                            type ===
                                                                'Shots off Goal' ||
                                                            type ===
                                                                'Yellow Cards' ||
                                                            type === 'Red Cards'
                                                        ) {
                                                            return team ===
                                                                'home'
                                                                ? homeTeamData <
                                                                      awayTeamData
                                                                : awayTeamData <
                                                                      homeTeamData
                                                        }
                                                        return team === 'home'
                                                            ? homeTeamData >
                                                                  awayTeamData
                                                            : awayTeamData >
                                                                  homeTeamData
                                                    }

                                                    return (
                                                        <View key={type}>
                                                            {type ===
                                                            'Ball Possession' ? (
                                                                <View className="space-y-[20px]">
                                                                    <Text className="text-center text-[16px] text-gray-600 dark:text-[#E5E5E5]">
                                                                        {getStatTypeTranslation(
                                                                            type
                                                                        )}
                                                                    </Text>

                                                                    <View className="h-8 flex-row">
                                                                        <View
                                                                            style={{
                                                                                width: homeTeamData,
                                                                            }}
                                                                            className={clsx(
                                                                                'justify-center rounded-l-full px-[10px]',
                                                                                {
                                                                                    'bg-gray-500':
                                                                                        homeTeamData >
                                                                                        awayTeamData,
                                                                                    'bg-gray-200':
                                                                                        homeTeamData <
                                                                                        awayTeamData,
                                                                                }
                                                                            )}
                                                                        >
                                                                            <Text
                                                                                className={clsx(
                                                                                    'text-lg font-semibold text-white',
                                                                                    {
                                                                                        'text-white':
                                                                                            homeTeamData >
                                                                                            awayTeamData,
                                                                                        'text-gray-600':
                                                                                            homeTeamData <
                                                                                            awayTeamData,
                                                                                    }
                                                                                )}
                                                                            >
                                                                                {
                                                                                    homeTeamData
                                                                                }
                                                                            </Text>
                                                                        </View>

                                                                        <View
                                                                            style={{
                                                                                width: awayTeamData,
                                                                            }}
                                                                            className={clsx(
                                                                                'items-end justify-center rounded-r-full px-[10px]',
                                                                                {
                                                                                    'bg-gray-500':
                                                                                        awayTeamData >
                                                                                        homeTeamData,
                                                                                    'bg-gray-200':
                                                                                        awayTeamData <
                                                                                        homeTeamData,
                                                                                }
                                                                            )}
                                                                        >
                                                                            <Text
                                                                                className={clsx(
                                                                                    'text-lg font-semibold text-white',
                                                                                    {
                                                                                        'text-white':
                                                                                            awayTeamData >
                                                                                            homeTeamData,
                                                                                        'text-gray-600':
                                                                                            awayTeamData <
                                                                                            homeTeamData,
                                                                                    }
                                                                                )}
                                                                            >
                                                                                {
                                                                                    awayTeamData
                                                                                }
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            ) : (
                                                                <View className="flex-row items-center">
                                                                    <View
                                                                        className={clsx(
                                                                            'flex-1 items-start'
                                                                        )}
                                                                    >
                                                                        <View
                                                                            className={clsx(
                                                                                {
                                                                                    'items-center justify-center rounded-full bg-gray-200 px-[10px] py-[1.5px] dark:bg-gray-500':
                                                                                        isTeamStatWin(
                                                                                            'home',
                                                                                            type
                                                                                        ),
                                                                                }
                                                                            )}
                                                                        >
                                                                            <Text className="text-lg font-semibold dark:text-white">
                                                                                {homeTeamData
                                                                                    ? type ===
                                                                                      'Passes accurate'
                                                                                        ? `${homeTeamData} (${getStat(
                                                                                              homeTeamStats,
                                                                                              'Passes %'
                                                                                          )})`
                                                                                        : homeTeamData
                                                                                    : 0}
                                                                            </Text>
                                                                        </View>
                                                                    </View>

                                                                    <View className="flex-2">
                                                                        <Text className="text-[16px] text-gray-600 dark:text-[#E5E5E5]">
                                                                            {getStatTypeTranslation(
                                                                                type
                                                                            )}
                                                                        </Text>
                                                                    </View>

                                                                    <View
                                                                        className={clsx(
                                                                            'flex-1 items-end'
                                                                        )}
                                                                    >
                                                                        <View
                                                                            className={clsx(
                                                                                {
                                                                                    'items-center justify-center rounded-full bg-gray-200 px-[10px] py-[1.5px] dark:bg-gray-500':
                                                                                        isTeamStatWin(
                                                                                            'away',
                                                                                            type
                                                                                        ),
                                                                                }
                                                                            )}
                                                                        >
                                                                            <Text className="text-lg font-semibold dark:text-white">
                                                                                {awayTeamData
                                                                                    ? type ===
                                                                                      'Passes accurate'
                                                                                        ? `${awayTeamData} (${getStat(
                                                                                              awayTeamStats,
                                                                                              'Passes %'
                                                                                          )})`
                                                                                        : awayTeamData
                                                                                    : 0}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            )}
                                                        </View>
                                                    )
                                                }
                                            )}
                                        </Card>
                                    )
                                })}
                            </View>

                            <View className="space-y-4">
                                <SeactionHeaderWithAction
                                    title="Player stats"
                                    action="View all"
                                />

                                <View style={{ gap: 12 }}>
                                    <PlayerStatsCard
                                        title="Total shots"
                                        data={topThreePlayersByTotalShots}
                                        getTeamLogo={getTeamLogo}
                                        path="shots.total"
                                    />

                                    <PlayerStatsCard
                                        title="Accurate passes"
                                        data={topThreePlayersByAccPasses}
                                        getTeamLogo={getTeamLogo}
                                        path="passes.total"
                                    />

                                    <PlayerStatsCard
                                        title="Tackles won"
                                        data={topThreePlayersByTacklesWon}
                                        getTeamLogo={getTeamLogo}
                                        path="tackles.total"
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                )}
        </>
    )
}
