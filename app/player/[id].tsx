import { Image } from 'expo-image'
import { useLocalSearchParams, Stack, Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { View, Text, TouchableOpacity } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useQuery } from '@tanstack/react-query'

import Profile from '@/app/player/components/profile'
import Stats from '@/app/player/components/stats'
import { fetchPlayerByPlayerId } from '@/lib/api/players'

const Tab = createMaterialTopTabNavigator()

export function formatName(personFullName: string, personFirstName: string) {
    const nameInitial = personFullName.substring(0, 1)

    const firstNameSplit = personFirstName.split(' ')

    const firstName = firstNameSplit.find(
        (name: string) => name.substring(0, 1) === nameInitial
    )

    const lastname = personFullName.split('.').slice(-1)

    return personFullName.includes('.')
        ? `${firstName} ${lastname}`
        : personFullName
}

export default function PlayerPage() {
    const { colorScheme } = useColorScheme()
    const { id: playerId } = useLocalSearchParams()

    console.log('playerId:', playerId)

    const {
        isPending: playerPending,
        isSuccess: playerSuccess,
        data: playerData,
    } = useQuery({
        queryKey: ['players', playerId],
        queryFn: () => fetchPlayerByPlayerId(playerId as string),
    })

    const isPending = playerPending
    const isSuccess = playerSuccess

    const player = playerSuccess && playerData.response[0]

    return (
        <>
            <Stack.Screen options={{ title: '' }} />

            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

            <View className="h-[120px] justify-center bg-gray-400 dark:bg-[#1A1A1A]">
                {isSuccess && (
                    <View
                        key={player.player.id}
                        className="flex-row items-center space-x-[14px] px-5 py-6"
                    >
                        <Image
                            className="h-14 w-14 rounded-full"
                            source={player.player.photo}
                            contentFit="cover"
                            transition={500}
                        />

                        <View className="space-y-1">
                            <Text className="text-[28px] font-extrabold text-white">
                                {formatName(
                                    player.player.name,
                                    player.player.firstname
                                )}
                            </Text>

                            <Link
                                href={`/team/${player.statistics[0].team.id}`}
                                className="w-full"
                                asChild
                            >
                                <TouchableOpacity className="flex-row items-center space-x-1 rounded-full bg-gray-500 px-[5px] py-[3.5px] dark:bg-[#262626]">
                                    <Image
                                        className="h-[18px] w-[18px]"
                                        source={player.statistics[0].team.logo}
                                        contentFit="contain"
                                        transition={500}
                                    />

                                    <Text className="text-[17px] font-semibold text-white">
                                        {player.statistics[0].team.name}
                                    </Text>
                                </TouchableOpacity>
                            </Link>
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
                        name="Profile"
                        children={() => (
                            <Profile
                                playerId={playerId as string}
                                playerObj={player}
                            />
                        )}
                    />
                    <Tab.Screen
                        name="Stats"
                        children={() => <Stats playerObj={player} />}
                    />
                </Tab.Navigator>
            )}
        </>
    )
}
