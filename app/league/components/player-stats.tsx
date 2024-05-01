import { ScrollView, View, Text } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { useQuery } from '@tanstack/react-query'

import PlayerStatsCard from '@/app/team/components/(stats)/player-stats-card'
import { fetchLeagueByLeagueId } from '@/lib/api/leagues'
import {
    fetchTopScorers,
    fetchTopAssists,
    fetchTopYellowCards,
    fetchTopRedCards,
} from '@/lib/api/players'
import { Season } from '@/lib/types/league'
import { PlayerObj } from '@/lib/types/top-player-stats'

export default function PlayerStatsTab({ leagueId }: { leagueId: string }) {
    const { data: leagueData } = useQuery({
        queryKey: ['leagues', leagueId],
        queryFn: () => fetchLeagueByLeagueId(leagueId),
    })

    const season = leagueData?.response[0].seasons.find(
        (season: Season) => season.current
    ).year

    const {
        isPending: topScorersPending,
        isSuccess: topScorersSuccess,
        data: topScorersData,
    } = useQuery({
        queryKey: ['topscorers', leagueId, season],
        queryFn: () => fetchTopScorers(leagueId, season.toString()),
        enabled: !!season,
    })

    const {
        isPending: topAssistsPending,
        isSuccess: topAssistsSuccess,
        data: topAssistsData,
    } = useQuery({
        queryKey: ['topassists', leagueId, season],
        queryFn: () => fetchTopAssists(leagueId, season.toString()),
        enabled: !!season,
    })

    const {
        isPending: topYellowCardsPending,
        isSuccess: topYellowCardsSuccess,
        data: topYellowCardsData,
    } = useQuery({
        queryKey: ['topyellowcards', leagueId, season],
        queryFn: () => fetchTopYellowCards(leagueId, season.toString()),
        enabled: !!season,
    })

    const {
        isPending: topRedCardsPending,
        isSuccess: topRedCardsSuccess,
        data: topRedCardsData,
    } = useQuery({
        queryKey: ['topredcards', leagueId, season],
        queryFn: () => fetchTopRedCards(leagueId, season.toString()),
        enabled: !!season,
    })

    const isPending =
        topScorersPending ||
        topAssistsPending ||
        topYellowCardsPending ||
        topRedCardsPending

    const isSuccess =
        topScorersSuccess &&
        topAssistsSuccess &&
        topYellowCardsSuccess &&
        topRedCardsSuccess

    const topThreePlayersByTotalGoals = topScorersData?.response
        .sort(
            (a: PlayerObj, b: PlayerObj) =>
                (b.statistics[0].goals.total as number) -
                (a.statistics[0].goals.total as number)
        )
        .slice(0, 3)

    const topThreePlayersByTotalAssists = topAssistsData?.response
        .sort(
            (a: PlayerObj, b: PlayerObj) =>
                (b.statistics[0].goals.assists as number) -
                (a.statistics[0].goals.assists as number)
        )
        .slice(0, 3)

    const topThreePlayersByTotalGA = topScorersData?.response
        .sort(
            (a: PlayerObj, b: PlayerObj) =>
                (b.statistics[0].goals.total as number) +
                (b.statistics[0].goals.assists as number) -
                ((a.statistics[0].goals.total as number) +
                    (a.statistics[0].goals.assists as number))
        )
        .slice(0, 3)

    const topThreePlayersByTotalYellowCards = topYellowCardsData?.response
        .sort(
            (a: PlayerObj, b: PlayerObj) =>
                (b.statistics[0].cards.yellow as number) -
                (a.statistics[0].cards.yellow as number)
        )
        .slice(0, 3)

    const topThreePlayersByTotalRedCards = topRedCardsData?.response
        .sort(
            (a: PlayerObj, b: PlayerObj) =>
                (b.statistics[0].cards.red as number) -
                (a.statistics[0].cards.red as number)
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
                        <View className="space-y-4">
                            <Text className="text-xl font-extrabold dark:text-white">
                                Top stats
                            </Text>

                            <View style={{ gap: 12 }}>
                                <PlayerStatsCard
                                    title="Top scorer"
                                    data={topThreePlayersByTotalGoals}
                                    path="goals.total"
                                />

                                <PlayerStatsCard
                                    title="Assists"
                                    data={topThreePlayersByTotalAssists}
                                    path="goals.assists"
                                />

                                <PlayerStatsCard
                                    title="Goals + Assists"
                                    data={topThreePlayersByTotalGA}
                                    path={['goals.total', 'goals.assists']}
                                />
                            </View>
                        </View>

                        <View className="space-y-4">
                            <Text className="text-xl font-extrabold dark:text-white">
                                Discipline
                            </Text>

                            <View style={{ gap: 12 }}>
                                <PlayerStatsCard
                                    title="Yellow cards"
                                    data={topThreePlayersByTotalYellowCards}
                                    path={'cards.yellow'}
                                />

                                <PlayerStatsCard
                                    title="Red cards"
                                    data={topThreePlayersByTotalRedCards}
                                    path={'cards.red'}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </>
    )
}
