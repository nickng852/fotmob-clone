import { useLocalSearchParams, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { View } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useQuery } from '@tanstack/react-query'

import Facts from '@/app/fixture/components/facts'
import Lineup from '@/app/fixture/components/lineup'
import ScoreSheet from '@/app/fixture/components/score-sheet'
import Stats from '@/app/fixture/components/stats'
import Table from '@/app/fixture/components/table'
import { fetchFixtureByFixtureId } from '@/lib/api/fixtures'

const Tab = createMaterialTopTabNavigator()

export default function Match() {
    const { colorScheme } = useColorScheme()
    const { id: fixtureId } = useLocalSearchParams()

    console.log('fixtureId:', fixtureId)

    const {
        isPending: fixturesPending,
        isSuccess: fixturesSuccess,
        data: fixturesData,
    } = useQuery({
        queryKey: ['fixtures', fixtureId],
        queryFn: () => fetchFixtureByFixtureId(fixtureId as string),
        // refetchInterval: 60000,
    })

    const isPending = fixturesPending
    const isSuccess = fixturesSuccess

    const match = fixturesSuccess && fixturesData.response[0]

    return (
        <>
            <Stack.Screen options={{ title: '' }} />

            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

            {isPending && (
                <View className="flex-1 items-center justify-center dark:bg-[#1D1D1D]">
                    <Circle size={24} color="#a1a1aa" />
                </View>
            )}

            {isSuccess && (
                <>
                    <ScoreSheet match={match} />

                    <Tab.Navigator
                        backBehavior="none"
                        screenOptions={{
                            tabBarStyle: {
                                paddingLeft: 16,
                                backgroundColor:
                                    colorScheme === 'light'
                                        ? '#FFFFFF'
                                        : '#1A1A1A',
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
                                    colorScheme === 'light'
                                        ? '#000000'
                                        : '#61DF6E',
                            },
                            tabBarActiveTintColor:
                                colorScheme === 'light' ? 'black' : 'white',
                            tabBarInactiveTintColor:
                                colorScheme === 'light' ? '#9F9F9F' : '#A3A3A3',
                            tabBarGap: 28,
                            tabBarScrollEnabled: true,
                        }}
                    >
                        <Tab.Screen
                            name={
                                match.fixture.status.short === 'NS'
                                    ? 'Preview'
                                    : 'Facts'
                            }
                            children={() => <Facts match={match} />}
                        />

                        <Tab.Screen
                            name="Lineup"
                            children={() => <Lineup match={match} />}
                        />

                        {match.league.country !== 'World' && (
                            <Tab.Screen
                                name="Table"
                                children={() => <Table match={match} />}
                            />
                        )}

                        {match.fixture.status.short !== 'NS' && (
                            <Tab.Screen
                                name="Stats"
                                children={() => <Stats match={match} />}
                            />
                        )}
                    </Tab.Navigator>
                </>
            )}
        </>
    )
}
