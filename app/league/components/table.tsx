import _ from 'lodash'
import { ScrollView, View } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { useQuery } from '@tanstack/react-query'

import Standings from '@/app/fixture/components/(facts)/standings'
import { fetchLeagueByLeagueId } from '@/lib/api/leagues'
import { fetchStandings } from '@/lib/api/standings'
import { Season } from '@/lib/types/league'

export default function TableTab({ leagueId }: { leagueId: string }) {
    const { data: leagueData } = useQuery({
        queryKey: ['leagues', leagueId],
        queryFn: () => fetchLeagueByLeagueId(leagueId),
    })

    const season = leagueData?.response[0].seasons.find(
        (season: Season) => season.current
    ).year

    const {
        isPending: standingsPending,
        isSuccess: standingsSuccess,
        data: standingsData,
    } = useQuery({
        queryKey: ['standings', leagueId, season],
        queryFn: () => fetchStandings(leagueId, season.toString()),
        enabled: !!season,
    })

    const isPending = standingsPending
    const isSuccess = standingsSuccess

    const standings = standingsSuccess && standingsData.response[0]

    return (
        <>
            {isPending && (
                <View className="flex-1 items-center justify-center">
                    <Circle size={24} color="#A1A1AA" />
                </View>
            )}

            {isSuccess && (
                <ScrollView className="bg-[#FAFAFA] dark:bg-black">
                    <View className="p-[10px]">
                        {!_.isEmpty(standingsData.response) && (
                            <Standings standingsData={standings} />
                        )}
                    </View>
                </ScrollView>
            )}
        </>
    )
}
