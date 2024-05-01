import clsx from 'clsx'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import moment from 'moment'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { MaterialIcons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'

import Card from '@/app/fixture/components/(stats)/card'
import Team from '@/components/matches/team'
import {
    fetchLastFixturesByTeamId,
    fetchNextFixturesByTeamId,
} from '@/lib/api/fixtures'
import { FixtureObj } from '@/lib/types/fixture'

export function formatDate(date: string) {
    const today = moment().format('YYYY-MM-DD')
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')
    const currentYear = moment().year()

    const isToday = moment(date).isSame(today, 'day')
    const isTomorrow = moment(date).isSame(tomorrow, 'day')
    const isCurrentYear = moment(date).year() === currentYear

    return isToday
        ? 'Today'
        : isTomorrow
          ? 'Tomorrow'
          : isCurrentYear
            ? moment(date).format('ddd, D MMM')
            : moment(date).format('ddd, D MMM YYYY')
}

export default function OverviewTab({ teamId }: { teamId: string }) {
    const {
        isPending: nextFixturePending,
        isSuccess: nextFixtureSuccess,
        data: nextFixtureData,
    } = useQuery({
        queryKey: ['nextfixture', teamId],
        queryFn: () => fetchNextFixturesByTeamId(teamId, 1),
    })

    const {
        isPending: lastFixturePending,
        isSuccess: lastFixtureSuccess,
        data: lastFixtureData,
    } = useQuery({
        queryKey: ['lastfixture', teamId],
        queryFn: () => fetchLastFixturesByTeamId(teamId, 5),
    })

    const isPending = nextFixturePending || lastFixturePending
    const isSuccess = nextFixtureSuccess && lastFixtureSuccess

    return (
        <>
            {isPending && (
                <View className="flex-1 items-center justify-center">
                    <Circle size={24} color="#A1A1AA" />
                </View>
            )}

            {isSuccess && (
                <ScrollView className="bg-[#FAFAFA] dark:bg-black">
                    <View style={{ gap: 12 }} className=" p-[10px]">
                        <Card>
                            <Text className="text-[17px] font-bold dark:text-white">
                                Next match
                            </Text>

                            {nextFixtureData.response.map(
                                (match: FixtureObj) => {
                                    const { fixture, league, teams } = match

                                    return (
                                        <Link
                                            key={fixture.id}
                                            href={`/fixture/${fixture.id.toString()}`}
                                            asChild
                                        >
                                            <TouchableOpacity className="space-y-3">
                                                <View className="flex-row items-center justify-between">
                                                    <Text className="text-xs font-medium text-[#858585] dark:text-[#9F9F9F]">
                                                        {formatDate(
                                                            fixture.date
                                                        )}
                                                    </Text>

                                                    <View className="rounded-full bg-[#F5F5F7] px-[9px] py-[2.5px] dark:bg-[#262626]">
                                                        <Text className="text-[13px] font-medium uppercase text-[#ACACAC] dark:text-[#9F9F9F]">
                                                            {league.name}
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View className="flex-row items-center justify-center">
                                                    <Team
                                                        side="home"
                                                        teamName={
                                                            teams.home.name
                                                        }
                                                        teamLogo={
                                                            teams.home.logo
                                                        }
                                                    />

                                                    <View className="basis-12 items-center justify-center">
                                                        <Text className="text-[15px] font-semibold text-[#717171] dark:text-[#9F9F9F]">
                                                            {moment(
                                                                fixture.date
                                                            ).format('HH:mm')}
                                                        </Text>
                                                    </View>

                                                    <Team
                                                        side="away"
                                                        teamName={
                                                            teams.away.name
                                                        }
                                                        teamLogo={
                                                            teams.away.logo
                                                        }
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </Link>
                                    )
                                }
                            )}
                        </Card>

                        <Card>
                            <View className="flex-row items-center justify-between">
                                <Text className="text-[17px] font-bold dark:text-white">
                                    Team form
                                </Text>

                                <TouchableOpacity>
                                    <MaterialIcons
                                        name="keyboard-arrow-right"
                                        size={24}
                                        color="#9F9F9F"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row justify-between">
                                {lastFixtureData.response
                                    .sort(
                                        (a: FixtureObj, b: FixtureObj) =>
                                            a.fixture.timestamp -
                                            b.fixture.timestamp
                                    )
                                    .map((match: FixtureObj, index: number) => {
                                        const { fixture, teams, goals } = match

                                        const isDraw = goals.home === goals.away
                                        const isTeamWin =
                                            (teams.home.id === Number(teamId) &&
                                                teams.home.winner) ||
                                            (teams.away.id === Number(teamId) &&
                                                teams.away.winner)
                                        const isTeamLose = !isDraw && !isTeamWin

                                        const opponent =
                                            teams.home.id == Number(teamId)
                                                ? teams.away
                                                : teams.home

                                        return (
                                            <Link
                                                key={fixture.id}
                                                href={`/fixture/${fixture.id.toString()}`}
                                                asChild
                                            >
                                                <TouchableOpacity className="items-center justify-center space-y-[8.5px]">
                                                    <View
                                                        className={clsx(
                                                            'relative rounded px-[5.5px] py-[2px]',
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
                                                        <Text className="text-sm font-semibold text-white">
                                                            {goals.home +
                                                                ' - ' +
                                                                goals.away}
                                                        </Text>

                                                        {index ===
                                                            lastFixtureData
                                                                .response
                                                                .length -
                                                                1 && (
                                                            <View
                                                                className={clsx(
                                                                    'absolute -bottom-[4px] left-0 right-0 h-[2px] rounded-full',
                                                                    {
                                                                        'bg-[#00975F]':
                                                                            isTeamWin,
                                                                        'bg-[#DB383C]':
                                                                            isTeamLose,
                                                                        'bg-[#7B8188]':
                                                                            isDraw,
                                                                    }
                                                                )}
                                                            />
                                                        )}
                                                    </View>

                                                    <Image
                                                        className="h-7 w-7"
                                                        source={opponent.logo}
                                                        contentFit="contain"
                                                        transition={500}
                                                    />
                                                </TouchableOpacity>
                                            </Link>
                                        )
                                    })}
                            </View>
                        </Card>
                    </View>
                </ScrollView>
            )}
        </>
    )
}
