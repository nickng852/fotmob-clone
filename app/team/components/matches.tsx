import clsx from 'clsx'
import { Link } from 'expo-router'
import _ from 'lodash'
import moment from 'moment'
import { View, Text, TouchableOpacity } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'

import { formatDate } from '@/app/team/components/overview'
import Team from '@/components/matches/team'
import { fetchFixturesByTeamId } from '@/lib/api/fixtures'
import { fetchLeagueByLeagueId } from '@/lib/api/leagues'
import { FixtureObj } from '@/lib/types/fixture'
import { Season } from '@/lib/types/league'

const R = require('ramda')

export default function MatchesTab({
    leagueId,
    leagueName,
    teamId,
}: {
    leagueId: string
    leagueName: string
    teamId: string
}) {
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
        queryKey: ['fixtures', season, teamId],
        queryFn: () => fetchFixturesByTeamId(season.toString(), teamId),
        enabled: !!season,
    })

    const isPending = fixturesPending
    const isSuccess = fixturesSuccess

    const fixturesByDate =
        fixturesData &&
        R.groupBy(
            R.path(['fixture', 'isUpcoming']),
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
                            isUpcoming:
                                match.fixture.status.short === 'NS'
                                    ? true
                                    : false,
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
                {item === 'true' && (
                    <View className="p-4">
                        <Text className="text-[17px] font-bold dark:text-white">
                            Upcoming matches
                        </Text>
                    </View>
                )}

                <View>
                    {fixturesByDate[item].map(
                        (match: FixtureObj, index: number) => {
                            const { fixture, league, teams, goals } = match

                            const isDraw = goals.home === goals.away
                            const isTeamWin =
                                (teams.home.id === Number(teamId) &&
                                    teams.home.winner) ||
                                (teams.away.id === Number(teamId) &&
                                    teams.away.winner)
                            const isTeamLose = !isDraw && !isTeamWin

                            return (
                                <Link
                                    key={fixture.id}
                                    href={`/fixture/${fixture.id.toString()}`}
                                    asChild
                                >
                                    <TouchableOpacity
                                        className={clsx('space-y-3 px-4 py-2', {
                                            'border-b border-[#F9F9F9] dark:border-[#0F0F0F]':
                                                index !==
                                                fixturesData.response.length -
                                                    1,
                                        })}
                                    >
                                        <View className="flex-row items-center justify-between">
                                            <Text className="text-xs font-medium text-[#858585] dark:text-[#9F9F9F]">
                                                {formatDate(fixture.date)}
                                            </Text>

                                            {league.name !== leagueName && (
                                                <View className="rounded-full bg-[#F5F5F7] px-[9px] py-[2.5px] dark:bg-[#262626]">
                                                    <Text className="text-[13px] font-medium uppercase text-[#ACACAC] dark:text-[#9F9F9F]">
                                                        {league.name}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>

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
                                                    <View
                                                        className={clsx(
                                                            'rounded px-[4.5px] py-[1.5px]',
                                                            {
                                                                'bg-[#00975F]':
                                                                    isTeamWin,
                                                                'bg-[#DB383C]':
                                                                    isTeamLose,
                                                                'bg-[#7B8188]':
                                                                    isDraw,
                                                            }
                                                        )}
                                                    >
                                                        <Text className="text-base font-semibold text-white">
                                                            {goals.home +
                                                                ' - ' +
                                                                goals.away}
                                                        </Text>
                                                    </View>
                                                ) : (
                                                    <Text
                                                        className={clsx(
                                                            'text-[15px] font-semibold text-[#717171] dark:text-[#9F9F9F]',
                                                            {
                                                                'line-through':
                                                                    fixture
                                                                        .status
                                                                        .short ===
                                                                        'PST' ||
                                                                    fixture
                                                                        .status
                                                                        .short ===
                                                                        'TBD' ||
                                                                    fixture
                                                                        .status
                                                                        .short ===
                                                                        'CANC',
                                                            }
                                                        )}
                                                    >
                                                        {moment(
                                                            fixture.date
                                                        ).format('HH:mm')}
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
                        estimatedItemSize={2}
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
