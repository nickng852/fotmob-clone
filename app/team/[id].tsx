import { Image } from 'expo-image'
import { useLocalSearchParams, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { View, Text } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useQuery } from '@tanstack/react-query'

import Matches from '@/app/team/components/matches'
import Overview from '@/app/team/components/overview'
import Squad from '@/app/team/components/squad'
import Stats from '@/app/team/components/stats'
import Table from '@/app/team/components/table'
import { fetchLeagueByTeamId } from '@/lib/api/leagues'
import { fetchTeam } from '@/lib/api/teams'

const Tab = createMaterialTopTabNavigator()

export default function Team() {
    const { colorScheme } = useColorScheme()
    const { id: teamId } = useLocalSearchParams()

    console.log('teamId: ', teamId)

    const {
        isPending: leaguePending,
        isSuccess: leagueSuccess,
        data: leagueData,
    } = useQuery({
        queryKey: ['leagues', teamId],
        queryFn: () => fetchLeagueByTeamId(teamId as string),
    })

    const {
        isPending: teamPending,
        isSuccess: teamSuccess,
        data: teamData,
    } = useQuery({
        queryKey: ['teams', teamId],
        queryFn: () => fetchTeam(teamId as string),
    })

    const isPending = leaguePending || teamPending
    const isSuccess = leagueSuccess && teamSuccess

    const leagues = leagueSuccess && leagueData.response
    const team = teamSuccess && teamData.response[0]

    const matchLeague =
        isSuccess &&
        leagues.find(
            (league: any) =>
                league.league.type === 'League' &&
                league.country.name === team.team.country
        )

    return (
        <>
            <Stack.Screen options={{ title: '' }} />

            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

            <View className="h-[120px] justify-center bg-gray-400 dark:bg-[#1A1A1A]">
                {isSuccess && (
                    <View
                        key={team.team.id}
                        className="flex-row items-center space-x-[14px] px-5 py-6"
                    >
                        <Image
                            className="h-14 w-14"
                            source={team.team.logo}
                            contentFit="contain"
                            transition={500}
                        />

                        <View className="space-y-1">
                            <Text className="text-[28px] font-extrabold text-white">
                                {team.team.name}
                            </Text>

                            <Text className="text-[17px] font-semibold text-white">
                                {team.team.country}
                            </Text>
                        </View>
                    </View>
                )}
            </View>

            {isPending && (
                <View className="flex-1 items-center justify-center">
                    <Circle size={24} color="#A1A1AA" />
                </View>
            )}

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
                    <Tab.Screen
                        name="Overview"
                        children={() => <Overview teamId={teamId as string} />}
                    />
                    <Tab.Screen
                        name="Matches"
                        children={() => (
                            <Matches
                                leagueId={matchLeague?.league.id}
                                leagueName={matchLeague?.league.name}
                                teamId={teamId as string}
                            />
                        )}
                    />
                    <Tab.Screen
                        name="Table"
                        children={() => (
                            <Table
                                leagueId={matchLeague?.league.id}
                                teamId={teamId as string}
                            />
                        )}
                    />
                    <Tab.Screen
                        name="Stats"
                        children={() => (
                            <Stats
                                leagueId={matchLeague?.league.id}
                                teamId={teamId as string}
                            />
                        )}
                    />
                    <Tab.Screen
                        name="Squad"
                        children={() => <Squad teamId={teamId as string} />}
                    />
                </Tab.Navigator>
            )}
        </>
    )
}
