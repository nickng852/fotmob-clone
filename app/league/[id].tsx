import { Image } from 'expo-image'
import { useLocalSearchParams, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import moment from 'moment'
import { useColorScheme } from 'nativewind'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useQuery } from '@tanstack/react-query'

import Fixtures from '@/app/league/components/fixtures'
import PlayerStats from '@/app/league/components/player-stats'
import Table from '@/app/league/components/table'
import { fetchLeagueByLeagueId } from '@/lib/api/leagues'
import { Season } from '@/lib/types/league'

const Tab = createMaterialTopTabNavigator()

export default function League() {
    const { colorScheme } = useColorScheme()
    const { id: leagueId } = useLocalSearchParams()

    console.log('leagueId:', leagueId)

    const {
        isPending: leaguePending,
        isSuccess: leagueSuccess,
        data: leagueData,
    } = useQuery({
        queryKey: ['leagues', leagueId],
        queryFn: () => fetchLeagueByLeagueId(leagueId as string),
    })

    const isPending = leaguePending
    const isSuccess = leagueSuccess

    const { league, country } = leagueSuccess && leagueData.response[0]

    const currentSeason =
        leagueSuccess &&
        leagueData.response[0].seasons.find(
            (season: Season) => season.current === true
        )

    const today = moment().format('YYYY-MM-DD')

    const isCurrentSeasonStarted =
        currentSeason &&
        moment(today).isBetween(
            currentSeason.start,
            currentSeason.end,
            null,
            '[]'
        )

    return (
        <>
            <Stack.Screen options={{ title: '' }} />

            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

            <View className="h-[120px] justify-center bg-gray-400 dark:bg-[#1A1A1A]">
                {isSuccess && (
                    <View
                        key={league.id}
                        className="flex-row items-center space-x-[14px] px-5 py-6"
                    >
                        <Image
                            className="h-14 w-14"
                            source={league.logo}
                            contentFit="contain"
                            transition={500}
                        />

                        <View className="space-y-1">
                            <Text className="text-[28px] font-extrabold text-white">
                                {league.name}
                            </Text>

                            <Text className="text-[17px] font-semibold text-white">
                                {country.name}
                            </Text>
                        </View>
                    </View>
                )}
            </View>

            {isSuccess && (
                <Tab.Navigator
                    backBehavior="none"
                    screenOptions={{
                        tabBarStyle: {
                            paddingLeft: 16,
                            backgroundColor:
                                colorScheme === 'light' ? '#9CA3AF' : '#1A1A1A',
                        },
                        tabBarItemStyle: {
                            width: 'auto',
                            paddingHorizontal: 0,
                        },
                        tabBarLabelStyle: {
                            marginHorizontal: 0,
                            fontSize: 17,
                            fontWeight: 'bold',
                            textTransform: 'none',
                        },
                        tabBarIndicatorContainerStyle: {
                            marginLeft: 16,
                        },
                        tabBarIndicatorStyle: {
                            height: 3.5,
                            backgroundColor:
                                colorScheme === 'light' ? '#FFFFFF' : '#61DF6E',
                        },
                        tabBarActiveTintColor: '#FFFFFF',
                        tabBarInactiveTintColor:
                            colorScheme === 'light' ? '#E5E7EB' : '#A3A3A3',
                        tabBarGap: 28,
                        tabBarScrollEnabled: true,
                    }}
                >
                    {currentSeason.coverage.standings && (
                        <Tab.Screen
                            name="Table"
                            children={() => (
                                <Table leagueId={leagueId as string} />
                            )}
                        />
                    )}

                    <Tab.Screen
                        name="Fixtures"
                        children={() => (
                            <Fixtures leagueId={leagueId as string} />
                        )}
                    />

                    {isCurrentSeasonStarted &&
                        (currentSeason.coverage.top_scorers ||
                            currentSeason.coverage.top_assists ||
                            currentSeason.coverage.top_cards) && (
                            <Tab.Screen
                                name="Player stats"
                                children={() => (
                                    <PlayerStats
                                        leagueId={leagueId as string}
                                    />
                                )}
                            />
                        )}
                </Tab.Navigator>
            )}
        </>
    )
}
