import clsx from 'clsx'
import { useColorScheme } from 'nativewind'
import { ScrollView, View, Text } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { Table, Row } from 'react-native-table-component'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'

import Card from '@/app/fixture/components/(stats)/card'
import PlayerStatsCard from '@/app/team/components/(stats)/player-stats-card'
import SeactionHeaderWithAction from '@/components/section-header-with-action'
import { fetchLeagueByLeagueId } from '@/lib/api/leagues'
import { fetchPlayersByTeamId } from '@/lib/api/players'
import { fetchTeamStats } from '@/lib/api/teams'
import { Season } from '@/lib/types/league'
import { Fixtures } from '@/lib/types/team-stats'
import { PlayerObj } from '@/lib/types/top-player-stats'

export default function StatsTab({
    leagueId,
    teamId,
}: {
    leagueId: string
    teamId: string
}) {
    const { colorScheme } = useColorScheme()

    const { data: leagueData } = useQuery({
        queryKey: ['league', leagueId],
        queryFn: () => fetchLeagueByLeagueId(leagueId),
    })

    const season = leagueData?.response[0].seasons.find(
        (season: Season) => season.current
    ).year

    const {
        isPending: teamStatsPending,
        isSuccess: teamStatsSuccess,
        data: teamStatsData,
    } = useQuery({
        queryKey: ['teams/statistics', leagueId, season, teamId],
        queryFn: () => fetchTeamStats(leagueId, season.toString(), teamId),
        enabled: !!season,
    })

    const {
        isPending: playersPending,
        isSuccess: playersSuccess,
        data: playersData,
    } = useQuery({
        queryKey: ['players', season, teamId],
        queryFn: () => fetchPlayersByTeamId(season.toString(), teamId),
        enabled: !!season,
    })

    const isPending = teamStatsPending || playersPending
    const isSuccess = teamStatsSuccess && playersSuccess

    const { fixtures, goals, penalty } =
        teamStatsSuccess && teamStatsData?.response

    const dimension = [5, 1, 1, 1, 1, 2, 1, 1]

    const tableHeadArr = ['', 'PL', 'W', 'D', 'L', '+/-', 'GD', 'PTS']

    const tableHead = tableHeadArr.map((item: string, index: number) => {
        return (
            <Text
                key={index}
                className={clsx(
                    'text-xs font-semibold uppercase text-[#AAAAAA] dark:text-[#6B6B6B]',
                    {
                        'px-1': item === 'Team',
                        'text-center': item !== 'Team',
                    }
                )}
            >
                {item}
            </Text>
        )
    })

    const getPoints = (fixture: Fixtures, side: string) => {
        return side === 'home'
            ? fixture.wins.home * 3 + fixture.draws.home
            : fixture.wins.away * 3 + fixture.draws.away
    }

    const topThreePlayersByRating = playersData?.response
        .sort(
            (a: PlayerObj, b: PlayerObj) =>
                Number(b.statistics[0].games.rating) -
                Number(a.statistics[0].games.rating)
        )
        .slice(0, 3)

    const topThreePlayersByGoals = playersData?.response
        .sort(
            (a: PlayerObj, b: PlayerObj) =>
                (b.statistics[0].goals.total as number) -
                (a.statistics[0].goals.total as number)
        )
        .slice(0, 3)

    const getAssist = (field: number) => {
        return field ? field : 0
    }

    const topThreePlayersByAssists = playersData?.response
        .sort(
            (a: PlayerObj, b: PlayerObj) =>
                getAssist(b.statistics[0].goals.assists as number) -
                getAssist(a.statistics[0].goals.assists as number)
        )
        .slice(0, 3)

    return (
        <>
            {isPending && (
                <View className="flex-1 items-center justify-center">
                    <Circle size={24} color="#A1A1AA" />
                </View>
            )}

            {isSuccess && (
                <ScrollView className="bg-[#FAFAFA] dark:bg-black">
                    <View className="space-y-8 p-[10px]">
                        <View style={{ gap: 12 }}>
                            <Card>
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-base font-bold dark:text-white">
                                        Points
                                    </Text>

                                    <Text className="text-base font-semibold dark:text-white">
                                        {getPoints(fixtures, 'home') +
                                            getPoints(fixtures, 'away')}
                                    </Text>
                                </View>

                                <Table>
                                    <View className="space-y-4">
                                        <Row
                                            data={tableHead}
                                            flexArr={dimension}
                                        />

                                        <Row
                                            data={[
                                                <View className="flex-row items-center space-x-2">
                                                    <MaterialCommunityIcons
                                                        name="stadium-variant"
                                                        size={16}
                                                        color={
                                                            colorScheme ===
                                                            'light'
                                                                ? '#000000'
                                                                : '#FFFFFF'
                                                        }
                                                    />

                                                    <Text className="text-base dark:text-white">
                                                        Home
                                                    </Text>
                                                </View>,
                                                <Text className="text-center text-base dark:text-white">
                                                    {fixtures.played.home}
                                                </Text>,
                                                <Text className="text-center text-base dark:text-white">
                                                    {fixtures.wins.home}
                                                </Text>,
                                                <Text className="text-center text-base dark:text-white">
                                                    {fixtures.draws.home}
                                                </Text>,
                                                <Text className="text-center text-base dark:text-white">
                                                    {fixtures.loses.home}
                                                </Text>,
                                                <Text className="text-center text-base dark:text-white">
                                                    {goals.for.total.home} -{' '}
                                                    {goals.against.total.home}
                                                </Text>,
                                                <Text className="text-center text-base dark:text-white">
                                                    {goals.for.total.home -
                                                        goals.against.total
                                                            .home}
                                                </Text>,
                                                <Text className="text-center text-base font-semibold dark:text-white">
                                                    {getPoints(
                                                        fixtures,
                                                        'home'
                                                    )}
                                                </Text>,
                                            ]}
                                            flexArr={dimension}
                                        />

                                        <Row
                                            data={[
                                                <View className="flex-row items-center space-x-2">
                                                    <MaterialCommunityIcons
                                                        name="airplane-takeoff"
                                                        size={16}
                                                        color={
                                                            colorScheme ===
                                                            'light'
                                                                ? '#000000'
                                                                : '#FFFFFF'
                                                        }
                                                    />

                                                    <Text className="text-base dark:text-white">
                                                        Away
                                                    </Text>
                                                </View>,
                                                <Text className="text-center text-base dark:text-white">
                                                    {fixtures.played.away}
                                                </Text>,
                                                <Text className="text-center text-base dark:text-white">
                                                    {fixtures.wins.away}
                                                </Text>,
                                                <Text className="text-center text-base dark:text-white">
                                                    {fixtures.draws.away}
                                                </Text>,
                                                <Text className="text-center text-base dark:text-white">
                                                    {fixtures.loses.away}
                                                </Text>,
                                                <Text className="text-center text-base dark:text-white">
                                                    {goals.for.total.away} -{' '}
                                                    {goals.against.total.away}
                                                </Text>,
                                                <Text className="text-center text-base dark:text-white">
                                                    {goals.for.total.away -
                                                        goals.against.total
                                                            .away}
                                                </Text>,
                                                <Text className="text-center text-base font-semibold dark:text-white">
                                                    {getPoints(
                                                        fixtures,
                                                        'away'
                                                    )}
                                                </Text>,
                                            ]}
                                            flexArr={dimension}
                                        />
                                    </View>
                                </Table>
                            </Card>

                            <Card>
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-base font-bold dark:text-white">
                                        Goals
                                    </Text>

                                    <Text className="text-base font-semibold dark:text-white">
                                        {goals.for.total.total}
                                    </Text>
                                </View>

                                <View className="flex-row items-center">
                                    <View className="basis-[78px]">
                                        <Text className="text-base dark:text-white">
                                            Penalty
                                        </Text>
                                    </View>

                                    <View className="flex-1">
                                        <View className="relative h-4 rounded-[2.5px] bg-[#F0F0F0] dark:bg-black">
                                            <View
                                                style={{
                                                    width: Number(
                                                        (
                                                            (penalty.scored
                                                                .total /
                                                                goals.for.total
                                                                    .total) *
                                                            100
                                                        ).toFixed()
                                                    ),
                                                }}
                                                className="absolute left-0 top-0 h-4 rounded-l-[2.5px] bg-gray-400"
                                            />
                                        </View>
                                    </View>

                                    <View className="basis-10">
                                        <Text className="text-right text-base font-semibold dark:text-white">
                                            {penalty.scored.total}
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        </View>

                        <View className="space-y-4">
                            <SeactionHeaderWithAction
                                title="Top players"
                                action="View all"
                            />

                            <View style={{ gap: 12 }}>
                                <PlayerStatsCard
                                    title="Rating"
                                    data={topThreePlayersByRating}
                                    path="games.rating"
                                />

                                <PlayerStatsCard
                                    title="Top scorer"
                                    data={topThreePlayersByGoals}
                                    path="goals.total"
                                />

                                <PlayerStatsCard
                                    title="Assists"
                                    data={topThreePlayersByAssists}
                                    path="goals.assists"
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </>
    )
}
