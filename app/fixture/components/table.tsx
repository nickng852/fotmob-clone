import _ from 'lodash'
import { ScrollView, View } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { useQuery } from '@tanstack/react-query'

import Standings from '@/app/fixture/components/(facts)/standings'
import { fetchStandings } from '@/lib/api/standings'
import { FixtureObj } from '@/lib/types/fixture'

export default function TableTab({ match }: { match: FixtureObj }) {
    const { league, teams } = match

    const {
        isPending: standingsPending,
        isSuccess: standingsSuccess,
        data: standingsData,
    } = useQuery({
        queryKey: ['standings', league.id.toString(), league.season.toString()],
        queryFn: () =>
            fetchStandings(league.id.toString(), league.season.toString()),
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
                            <Standings
                                homeTeamId={teams.home.id}
                                awayTeamId={teams.away.id}
                                standingsData={standings}
                            />
                        )}
                    </View>
                </ScrollView>
            )}
        </>
    )
}
