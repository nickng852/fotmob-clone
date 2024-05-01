import { Image } from 'expo-image'
import { useLocalSearchParams, Stack, Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { View, Text, TouchableOpacity } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useQuery } from '@tanstack/react-query'

import Career from '@/app/coach/components/career'
import Profile from '@/app/coach/components/profile'
import { formatName } from '@/app/player/[id]'
import { fetchCoachByCoachId } from '@/lib/api/coachs'

const Tab = createMaterialTopTabNavigator()

export default function CoachPage() {
    const { colorScheme } = useColorScheme()
    const { id: coachId } = useLocalSearchParams()

    console.log('coachId:', coachId)

    const {
        isPending: coachPending,
        isSuccess: coachSuccess,
        data: coachData,
    } = useQuery({
        queryKey: ['coachs', coachId],
        queryFn: () => fetchCoachByCoachId(coachId as string),
    })

    const isPending = coachPending
    const isSuccess = coachSuccess

    const coach = isSuccess && coachData.response[0]

    return (
        <>
            <Stack.Screen options={{ title: '' }} />

            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

            <View className="h-[120px] justify-center bg-gray-400 dark:bg-[#1A1A1A]">
                {isSuccess && (
                    <View
                        key={coach.id}
                        className="flex-row items-center space-x-[14px] px-5 py-6"
                    >
                        <Image
                            className="h-14 w-14 rounded-full"
                            source={coach.photo}
                            contentFit="cover"
                            transition={500}
                        />

                        <View className="space-y-1">
                            <Text className="text-[28px] font-extrabold text-white">
                                {formatName(coach.name, coach.firstname)}
                            </Text>

                            <Link
                                href={`/team/${coach.team.id}`}
                                className="w-full"
                                asChild
                            >
                                <TouchableOpacity className="flex-row items-center space-x-1 rounded-full bg-gray-500 px-[5px] py-[3.5px] dark:bg-[#262626]">
                                    <Image
                                        className="h-[18px] w-[18px]"
                                        source={coach.team.logo}
                                        contentFit="contain"
                                        transition={500}
                                    />

                                    <Text className="text-[17px] font-semibold text-white">
                                        {coach.team.name}
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
                                coachId={coachId as string}
                                coach={coach}
                            />
                        )}
                    />
                    <Tab.Screen
                        name="Career"
                        children={() => <Career coach={coach} />}
                    />
                </Tab.Navigator>
            )}
        </>
    )
}
