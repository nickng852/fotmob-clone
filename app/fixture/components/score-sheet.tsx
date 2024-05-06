import clsx from 'clsx'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import _ from 'lodash'
import moment from 'moment'
import { useColorScheme } from 'nativewind'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { formatPlayerName } from '@/app/fixture/utils/helper'
import { Event } from '@/lib/types/event'
import { FixtureObj } from '@/lib/types/fixture'

const R = require('ramda')

function Team({
    teamId,
    teamLogo,
    teamName,
}: {
    teamId: number
    teamLogo: string
    teamName: string
}) {
    return (
        <Link href={`/team/${teamId.toString()}`} asChild>
            <TouchableOpacity className="items-center justify-center space-y-3">
                <Image
                    className="h-11 w-11"
                    source={teamLogo}
                    contentFit="contain"
                    transition={500}
                />

                <Text className="w-full text-center font-medium dark:text-white">
                    {teamName}
                </Text>
            </TouchableOpacity>
        </Link>
    )
}

function ScorerList({
    side,
    scorers,
}: {
    side: string
    scorers: {
        [key: string]: Event[]
    }
}) {
    return (
        <>
            {Object.keys(scorers).map((playerName) => {
                return (
                    <View
                        key={playerName}
                        className={clsx('flex-row flex-wrap', {
                            'justify-end': side === 'home',
                        })}
                    >
                        {playerName !== 'null' && (
                            <Text className="text-sm text-[#5C5C5C] dark:text-[#D0D0D0]">
                                {formatPlayerName(playerName)}{' '}
                            </Text>
                        )}

                        {scorers[playerName].map(
                            (event: Event, index: number) => {
                                return (
                                    <Text
                                        key={index}
                                        className="text-sm text-[#5C5C5C] dark:text-[#D0D0D0]"
                                    >
                                        {event.time.elapsed}
                                        {event.time.extra && (
                                            <>+{event.time.extra}</>
                                        )}
                                        '
                                        {event.detail === 'Penalty' && (
                                            <> (Pen)</>
                                        )}
                                        {event.detail === 'Own Goal' && (
                                            <> (OG)</>
                                        )}
                                        {index !=
                                            scorers[playerName].length - 1 && (
                                            <>, </>
                                        )}
                                    </Text>
                                )
                            }
                        )}
                    </View>
                )
            })}
        </>
    )
}

export default function ScoreSheet({ match }: { match: FixtureObj }) {
    const { colorScheme } = useColorScheme()

    const { fixture, teams, goals, score, events } = match

    const isEitherTeamScores = goals.home > 0 || goals.away > 0

    const homeTeamScoreSheet = events.filter(
        (event: Event) =>
            event.type === 'Goal' &&
            event.comments !== 'Penalty Shootout' &&
            event.team.id === teams.home.id
    )

    const homeTeamScorers = R.groupBy(
        R.path(['player', 'name']),
        homeTeamScoreSheet
    )

    const awayTeamScoreSheet = events.filter(
        (event: Event) =>
            event.type === 'Goal' &&
            event.comments !== 'Penalty Shootout' &&
            event.team.id === teams.away.id
    )

    const awayTeamScorers = R.groupBy(
        R.path(['player', 'name']),
        awayTeamScoreSheet
    )

    const homeTeamRedCards = events.filter(
        (event: Event) =>
            event.type === 'Card' &&
            event.detail === 'Red Card' &&
            event.team.id === teams.home.id
    )

    const awayTeamRedCards = events.filter(
        (event: Event) =>
            event.type === 'Card' &&
            event.detail === 'Red Card' &&
            event.team.id === teams.away.id
    )

    return (
        <View className="space-y-4 bg-white px-2 py-[20px] dark:bg-[#1A1A1A]">
            <View className="flex-row items-center">
                <View className="flex-1">
                    <Team
                        teamId={teams.home.id}
                        teamLogo={teams.home.logo}
                        teamName={teams.home.name}
                    />
                </View>

                <View className="flex-1">
                    {(fixture.status.short === 'NS' ||
                        fixture.status.short === 'PST' ||
                        fixture.status.short === 'TBD' ||
                        fixture.status.short === 'CANC') && (
                        <View className="items-center justify-center space-y-3">
                            <View className="h-12 justify-end">
                                <Text
                                    className={clsx(
                                        'text-center text-5xl dark:text-white',
                                        {
                                            'line-through':
                                                fixture.status.short ===
                                                    'PST' ||
                                                fixture.status.short ===
                                                    'TBD' ||
                                                fixture.status.short === 'CANC',
                                        }
                                    )}
                                >
                                    {moment
                                        .unix(fixture.timestamp)
                                        .format('HH:mm')}
                                </Text>
                            </View>

                            <Text className="dark:text-white">
                                {fixture.status.short === 'NS' ? (
                                    <>Timer</>
                                ) : (
                                    <>{fixture.status.long}</>
                                )}
                            </Text>
                        </View>
                    )}

                    {(fixture.status.short === '1H' ||
                        fixture.status.short === '2H' ||
                        fixture.status.short === 'HT' ||
                        fixture.status.short === 'FT' ||
                        fixture.status.short === 'AET' ||
                        fixture.status.short === 'PEN' ||
                        fixture.status.short === 'SUSP' ||
                        fixture.status.short === 'AWD') && (
                        <View className="items-center justify-center space-y-3">
                            <View className="relative h-12 justify-end">
                                {homeTeamRedCards.length >= 1 && (
                                    <View className="absolute -left-6 top-4 h-4 w-3 rounded-sm bg-redcard" />
                                )}
                                <Text className="text-center text-5xl dark:text-white">
                                    {goals.home} - {goals.away}
                                </Text>
                                {awayTeamRedCards.length >= 1 && (
                                    <View className="absolute -right-6 top-4 h-4 w-3 rounded-sm bg-redcard" />
                                )}
                            </View>

                            {(fixture.status.short === '1H' ||
                                fixture.status.short === '2H') && (
                                <Text className="text-[#02985F]">
                                    {fixture.status.elapsed}'
                                </Text>
                            )}

                            {fixture.status.short === 'HT' && (
                                <Text className="dark:text-white">
                                    Half time
                                </Text>
                            )}

                            {fixture.status.short === 'FT' && (
                                <Text className="dark:text-white">
                                    Full time
                                </Text>
                            )}

                            {fixture.status.short === 'AET' && (
                                <Text className="dark:text-white">
                                    After extra time
                                </Text>
                            )}

                            {fixture.status.short === 'PEN' && (
                                <Text className="dark:text-white">
                                    Pen {score.penalty.home} -{' '}
                                    {score.penalty.away}
                                </Text>
                            )}

                            {fixture.status.short === 'AWD' && (
                                <Text className="dark:text-white">
                                    {fixture.status.long}
                                </Text>
                            )}
                        </View>
                    )}
                </View>

                <View className="flex-1">
                    <Team
                        teamId={teams.away.id}
                        teamLogo={teams.away.logo}
                        teamName={teams.away.name}
                    />
                </View>
            </View>

            {isEitherTeamScores &&
                (!_.isEmpty(homeTeamScorers) ||
                    !_.isEmpty(awayTeamScorers)) && (
                    <View className="flex-row items-center justify-center">
                        <View className="h-full flex-1">
                            <ScorerList side="home" scorers={homeTeamScorers} />
                        </View>

                        <View className="h-full basis-11 flex-row justify-center">
                            <MaterialIcons
                                name="sports-soccer"
                                size={15}
                                color={
                                    colorScheme === 'light'
                                        ? '#5C5C5C'
                                        : '#D0D0D0'
                                }
                            />
                        </View>

                        <View className="h-full flex-1">
                            <ScorerList side="away" scorers={awayTeamScorers} />
                        </View>
                    </View>
                )}
        </View>
    )
}
