import clsx from 'clsx'
import { Link } from 'expo-router'
import _ from 'lodash'
import moment from 'moment'
import { View, Text, TouchableOpacity } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'

import Team from '@/components/matches/team'
import { fetchFixturesByLeagueId } from '@/lib/api/fixtures'
import { fetchLeagueByLeagueId } from '@/lib/api/leagues'
import { FixtureObj } from '@/lib/types/fixture'
import { Season } from '@/lib/types/league'

const R = require('ramda')

export default function FixturesTab({ leagueId }: { leagueId: string }) {
    const { data: leagueData } = useQuery({
        queryKey: ['leagues', leagueId],
        queryFn: () => fetchLeagueByLeagueId(leagueId),
    })

    const season = leagueData?.response[0].seasons.find(
        (season: Season) => season.current
    ).year

    const {
        isPending: fixturesPending,
        isSuccess: fixturesSuccess,
        data: fixturesData,
    } = useQuery({
        queryKey: ['fixtures', leagueId, season],
        queryFn: () => fetchFixturesByLeagueId(leagueId, season.toString()),
        enabled: !!season,
    })

    const isPending = fixturesPending
    const isSuccess = fixturesSuccess

    const fixturesByDate =
        fixturesData &&
        R.groupBy(
            R.path(['fixture', 'date']),
            fixturesData.response
                .sort(
                    (a: FixtureObj, b: FixtureObj) =>
                        a.fixture.timestamp - b.fixture.timestamp
                )
                .map((match: FixtureObj) => {
                    return {
                        ...match,
                        fixture: {
                            ...match.fixture,
                            date: moment(match.fixture.date).format(
                                'YYYY-MM-DD'
                            ),
                        },
                    }
                })
        )

    function renderItem({ item }: { item: string }) {
        return (
            <View
                key={item}
                className="rounded-xl bg-white shadow-lg dark:bg-[#1D1D1D]"
            >
                <View className="p-4">
                    <Text className="text-[17px] font-bold dark:text-white">
                        {moment(item).format('dddd, D MMMM YYYY')}
                    </Text>
                </View>

                <View>
                    {fixturesByDate[item].map(
                        (match: FixtureObj, index: number) => {
                            const { fixture, teams, goals } = match

                            return (
                                <Link
                                    key={fixture.id}
                                    href={`/fixture/${fixture.id.toString()}`}
                                    asChild
                                >
                                    <TouchableOpacity
                                        className={clsx('px-4 py-3', {
                                            'border-b border-[#F9F9F9] dark:border-[#0F0F0F]':
                                                index !==
                                                fixturesByDate[item].length - 1,
                                        })}
                                    >
                                        <View className="flex-row items-center">
                                            <Team
                                                side="home"
                                                teamName={teams.home.name}
                                                teamLogo={teams.home.logo}
                                            />

                                            <View className="basis-12 items-center justify-center">
                                                {fixture.status.short ===
                                                    'FT' ||
                                                fixture.status.short ===
                                                    'AET' ||
                                                fixture.status.short ===
                                                    'PEN' ||
                                                fixture.status.short ===
                                                    'SUSP' ? (
                                                    <Text className="text-base font-semibold text-[#333333] dark:text-white">
                                                        {goals.home +
                                                            ' - ' +
                                                            goals.away}
                                                    </Text>
                                                ) : (
                                                    <Text className="text-[15px] font-semibold text-[#717171] dark:text-[#9F9F9F]">
                                                        {moment
                                                            .unix(
                                                                fixture.timestamp
                                                            )
                                                            .format('HH:mm')}
                                                    </Text>
                                                )}
                                            </View>

                                            <Team
                                                side="away"
                                                teamName={teams.away.name}
                                                teamLogo={teams.away.logo}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </Link>
                            )
                        }
                    )}
                </View>
            </View>
        )
    }

    return (
        <>
            {isPending && (
                <View className="flex-1 items-center justify-center">
                    <Circle size={24} color="#A1A1AA" />
                </View>
            )}

            {isSuccess && (
                <View style={{ flex: 1 }}>
                    <FlashList
                        data={Object.keys(fixturesByDate)}
                        keyExtractor={(item) => item}
                        renderItem={renderItem}
                        estimatedItemSize={200}
                        contentContainerStyle={{
                            padding: 10,
                        }}
                        ItemSeparatorComponent={() => (
                            <View className="h-[13px]" />
                        )}
                    />
                </View>
            )}
        </>
    )
}
