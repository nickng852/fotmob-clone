import clsx from 'clsx'
import { Link } from 'expo-router'
import moment from 'moment'
import { View, Text, TouchableOpacity } from 'react-native'

import Badge from '@/components/matches/badge'
import Team from '@/components/matches/team'
import { FixtureObj } from '@/lib/types/fixture'

export default function Fixture({
    index,
    totalMatches,
    item,
}: {
    index: number
    totalMatches: number
    item: FixtureObj
}) {
    const { fixture, teams, goals } = item

    return (
        <Link href={`/fixture/${fixture.id.toString()}`} asChild>
            <TouchableOpacity
                className={clsx(
                    'flex-row items-center justify-center bg-white px-2 py-5 dark:bg-[#1D1D1D]',
                    {
                        'border-b border-gray-100 dark:border-[#1D1D1D]':
                            index !== totalMatches - 1,
                        'rounded-b-xl': index === totalMatches - 1,
                    }
                )}
            >
                <View className="flex-1">
                    <View className="flex-row items-center justify-between space-x-2">
                        {(fixture.status.short === 'HT' ||
                            fixture.status.short === 'FT' ||
                            fixture.status.short === 'AET' ||
                            fixture.status.short === 'PEN' ||
                            fixture.status.short === 'SUSP' ||
                            fixture.status.short === 'PST' ||
                            fixture.status.short === 'TBD' ||
                            fixture.status.short === 'CANC' ||
                            fixture.status.short === 'AWD') && (
                            <Badge
                                type="text"
                                value={fixture.status.short.slice(0, 2)}
                            />
                        )}

                        {(fixture.status.short === '1H' ||
                            fixture.status.short === '2H') && (
                            <Badge
                                type="number"
                                value={fixture.status.elapsed as number}
                            />
                        )}

                        <Team
                            side="home"
                            teamName={teams.home.name}
                            teamLogo={teams.home.logo}
                        />
                    </View>
                </View>

                <View className="basis-12">
                    {(fixture.status.short === 'NS' ||
                        fixture.status.short === 'PST' ||
                        fixture.status.short === 'TBD' ||
                        fixture.status.short === 'CANC') && (
                        <Text
                            className={clsx(
                                'text-center text-base font-semibold text-[#717171] dark:text-[#9F9F9F]',
                                {
                                    'line-through':
                                        fixture.status.short === 'PST' ||
                                        fixture.status.short === 'TBD' ||
                                        fixture.status.short === 'CANC',
                                }
                            )}
                        >
                            {moment.unix(fixture.timestamp).format('HH:mm')}
                        </Text>
                    )}

                    {(fixture.status.short === '1H' ||
                        fixture.status.short === '2H' ||
                        fixture.status.short === 'HT' ||
                        fixture.status.short === 'FT' ||
                        fixture.status.short === 'AET' ||
                        fixture.status.short === 'PEN' ||
                        fixture.status.short === 'SUSP' ||
                        fixture.status.short === 'AWD') && (
                        <Text className="text-center text-lg font-semibold text-[#333333] dark:text-white">
                            {goals.home} - {goals.away}
                        </Text>
                    )}
                </View>

                <Team
                    side="away"
                    teamName={teams.away.name}
                    teamLogo={teams.away.logo}
                />
            </TouchableOpacity>
        </Link>
    )
}
