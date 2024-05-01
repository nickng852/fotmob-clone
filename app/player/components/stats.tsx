import clsx from 'clsx'
import { Image } from 'expo-image'
import _ from 'lodash'
import { ScrollView, View, Text } from 'react-native'

import Card from '@/app/fixture/components/(stats)/card'
import CardItem from '@/app/player/components/card-item'
import { PlayerObj } from '@/lib/types/player'

interface Stats {
    type: string
    title: string
    path: string[]
}

interface PositionFieldsObj {
    [key: string]: {
        [key: string]: {
            [key: string]: Boolean
        }
    }
}

interface PerformanceObj {
    [key: string]: Stats[]
}

const positionFields: PositionFieldsObj = {
    attacker: {
        shooting: {
            goals: true,
            shots: true,
            shotsOnTarget: true,
        },
        passing: {
            assists: true,
            successfulPasses: true,
        },
        possession: {
            successfulDribbles: true,
            dribbleSuccess: true,
            foulsWon: true,
        },
        defending: {
            duelsWon: true,
            duelsWonPercentage: true,
            interceptions: true,
            foulsComitted: true,
        },
        discipline: {
            yellowCards: true,
            redCards: true,
        },
    },
    midfielder: {
        shooting: {
            goals: true,
            shots: true,
            shotsOnTarget: true,
        },
        passing: {
            assists: true,
            successfulPasses: true,
        },
        possession: {
            successfulDribbles: true,
            dribbleSuccess: true,
            foulsWon: true,
        },
        defending: {
            duelsWon: true,
            duelsWonPercentage: true,
            interceptions: true,
            foulsComitted: true,
        },
        discipline: {
            yellowCards: true,
            redCards: true,
        },
    },
    defender: {
        shooting: {
            goals: true,
            shots: true,
            shotsOnTarget: true,
        },
        passing: {
            assists: true,
            successfulPasses: true,
        },
        possession: {
            successfulDribbles: false,
            dribbleSuccess: false,
            foulsWon: true,
        },
        defending: {
            duelsWon: true,
            duelsWonPercentage: true,
            interceptions: true,
            foulsComitted: true,
        },
        discipline: {
            yellowCards: true,
            redCards: true,
        },
    },
    goalkeeper: {
        goalkeeping: {
            saves: true,
            savePercentage: true,
            goalsConceded: true,
            penaltyGoalsConceded: true,
            penaltySaves: true,
        },
        discipline: {
            yellowCards: true,
            redCards: true,
        },
    },
}

const seasonPerformance: PerformanceObj = {
    shooting: [
        {
            type: 'goals',
            title: 'Goals',
            path: ['goals.total'],
        },
        {
            type: 'shots',
            title: 'Shots',
            path: ['shots.total'],
        },
        {
            type: 'shotsOnTarget',
            title: 'Shots on target',
            path: ['shots.on'],
        },
    ],
    passing: [
        {
            type: 'assists',
            title: 'Assists',
            path: ['goals.assists'],
        },
        {
            type: 'successfulPasses',
            title: 'Successful passes',
            path: ['passes.total'],
        },
    ],
    possession: [
        {
            type: 'successfulDribbles',
            title: 'Successful dribbles',
            path: ['dribbles.success'],
        },
        {
            type: 'dribbleSuccess',
            title: 'Dribble success',
            path: ['dribbles.success', 'dribbles.attempts'],
        },
        {
            type: 'foulsWon',
            title: 'Fouls won',
            path: ['fouls.drawn'],
        },
    ],
    defending: [
        {
            type: 'duelsWon',
            title: 'Duels won',
            path: ['duels.won'],
        },
        {
            type: 'duelsWonPercentage',
            title: 'Duels won %',
            path: ['duels.won', 'duels.total'],
        },
        {
            type: 'interceptions',
            title: 'Interceptions',
            path: ['tackles.interceptions'],
        },
        {
            type: 'foulsComitted',
            title: 'Fouls commiteed',
            path: ['fouls.committed'],
        },
    ],
    goalkeeping: [
        {
            type: 'saves',
            title: 'Saves',
            path: ['goals.saves'],
        },
        {
            type: 'savePercentage',
            title: 'Save perecentage',
            path: ['goals.saves', 'goals.conceded'],
        },
        {
            type: 'goalsConceded',
            title: 'Goals conceded',
            path: ['goals.conceded'],
        },
        {
            type: 'penaltyGoalsConceded',
            title: 'Penalty goals conceded',
            path: ['penalty.missed'],
        },
        {
            type: 'penaltySaves',
            title: 'Penalty saves',
            path: ['penalty.saved'],
        },
    ],
    discipline: [
        {
            type: 'yellowCards',
            title: 'Yellow cards',
            path: ['cards.yellow'],
        },
        {
            type: 'redCards',
            title: 'Red cards',
            path: ['cards.red'],
        },
    ],
}

export default function StatsTab({ playerObj }: { playerObj: PlayerObj }) {
    const { statistics } = playerObj

    const statistic = statistics[0]

    const position = statistic.games.position.toLowerCase()

    return (
        <ScrollView className="bg-[#FAFAFA] dark:bg-black">
            <View style={{ gap: 12 }} className="p-[10px]">
                <Card>
                    <View className="flex-row items-center space-x-2">
                        <Image
                            className="h-4 w-4"
                            source={statistic!.league.logo}
                            contentFit="contain"
                            transition={500}
                        />

                        <Text className="text-[17px] font-bold dark:text-white">
                            {statistic!.league.name} {statistic!.league.season}/
                            {statistic!.league.season + 1}
                        </Text>
                    </View>

                    <View className="flex-row">
                        <CardItem
                            value={statistic!.goals.total ?? 0}
                            type="Goals"
                        />

                        <CardItem
                            value={statistic!.goals.assists ?? 0}
                            type="Assists"
                        />

                        <CardItem type="Rating">
                            <View
                                className={clsx('rounded px-[5px]', {
                                    'bg-[#32C771]':
                                        Number(
                                            Number(
                                                statistic!.games.rating
                                            ).toFixed(2)
                                        ) >= 7,
                                    'bg-[#F08022]':
                                        Number(
                                            Number(
                                                statistic!.games.rating
                                            ).toFixed(2)
                                        ) >= 5 &&
                                        Number(
                                            Number(
                                                statistic!.games.rating
                                            ).toFixed(2)
                                        ) < 7,
                                    'bg-[#E55E5B]':
                                        Number(
                                            Number(
                                                statistic!.games.rating
                                            ).toFixed(2)
                                        ) < 5,
                                })}
                            >
                                <Text className="text-lg text-white">
                                    {Number(statistic!.games.rating).toFixed(
                                        2
                                    ) ?? 0}
                                </Text>
                            </View>
                        </CardItem>
                    </View>

                    <View className="flex-row">
                        <CardItem
                            value={statistic!.games.appearences ?? 0}
                            type="Matches"
                        />

                        <CardItem
                            value={statistic!.games.lineups ?? 0}
                            type="Started"
                        />

                        <CardItem
                            value={statistic!.games.minutes ?? 0}
                            type="Minutes"
                        />
                    </View>
                </Card>

                <View className="rounded-xl bg-white shadow-lg dark:bg-[#1D1D1D]">
                    <View className="border-b border-[#F1F1F1] p-4 dark:border-[#3D3D40]">
                        <Text className="text-[17px] font-bold dark:text-white">
                            Season performance
                        </Text>
                    </View>

                    <View>
                        {_.keys(seasonPerformance).map(
                            (sectionKey: string, index: number) => {
                                if (positionFields[position][sectionKey])
                                    return (
                                        <View
                                            key={sectionKey}
                                            className={clsx('space-y-5 p-4', {
                                                'border-b border-[#F1F1F1] dark:border-[#3D3D40]':
                                                    index !==
                                                    _.keys(seasonPerformance)
                                                        .length -
                                                        1,
                                            })}
                                        >
                                            <Text className="text-[17px] font-bold dark:text-white">
                                                {_.startCase(sectionKey)}
                                            </Text>

                                            {seasonPerformance[sectionKey].map(
                                                (stats: Stats) => {
                                                    if (
                                                        positionFields[
                                                            position
                                                        ][sectionKey][
                                                            stats.type
                                                        ]
                                                    )
                                                        return (
                                                            <View
                                                                key={stats.type}
                                                                className="flex-row items-center justify-between"
                                                            >
                                                                <Text className="text-base dark:text-white">
                                                                    {
                                                                        stats.title
                                                                    }
                                                                </Text>

                                                                <Text className="text-base font-semibold dark:text-white">
                                                                    {stats.path
                                                                        .length ==
                                                                        1 &&
                                                                        (_.get(
                                                                            statistic,
                                                                            stats
                                                                                .path[0]
                                                                        ) ??
                                                                            0)}

                                                                    {(stats.type ===
                                                                        'dribbleSuccess' ||
                                                                        stats.type ===
                                                                            'duelsWonPercentage') && (
                                                                        <>
                                                                            {(
                                                                                (_.get(
                                                                                    statistic,
                                                                                    stats
                                                                                        .path[0]
                                                                                ) /
                                                                                    _.get(
                                                                                        statistic,
                                                                                        stats
                                                                                            .path[1]
                                                                                    )) *
                                                                                100
                                                                            ).toFixed(
                                                                                1
                                                                            )}
                                                                            %
                                                                        </>
                                                                    )}

                                                                    {stats.type ===
                                                                        'savePercentage' && (
                                                                        <>
                                                                            {(
                                                                                (_.get(
                                                                                    statistic,
                                                                                    stats
                                                                                        .path[0]
                                                                                ) /
                                                                                    (_.get(
                                                                                        statistic,
                                                                                        stats
                                                                                            .path[0]
                                                                                    ) +
                                                                                        _.get(
                                                                                            statistic,
                                                                                            stats
                                                                                                .path[1]
                                                                                        ))) *
                                                                                100
                                                                            ).toFixed(
                                                                                1
                                                                            )}
                                                                            %
                                                                        </>
                                                                    )}
                                                                </Text>
                                                            </View>
                                                        )
                                                }
                                            )}
                                        </View>
                                    )
                            }
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
