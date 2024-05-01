import { StatusBar } from 'expo-status-bar'
import _ from 'lodash'
import moment, { Moment } from 'moment'
import { useColorScheme } from 'nativewind'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Fixtures from '@/components/matches/fixtures'

function formatDate(date: string) {
    const today = moment().format('YYYY-MM-DD')
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')

    const isToday = moment(date).isSame(today, 'day')
    const isTomorrow = moment(date).isSame(tomorrow, 'day')

    return isToday
        ? `Today`
        : isTomorrow
          ? `Tomorrow`
          : moment(date).format('ddd D MMM')
}

const Tab = createMaterialTopTabNavigator()

export default function HomeScreen() {
    const { colorScheme } = useColorScheme()

    const sixDaysBeforeToday = moment().subtract(6, 'days')
    const sixDaysAfterToday = moment().add(6, 'days')

    const getDateArr = (startDate: Moment, endDate: Moment) => {
        let dates = []

        while (startDate.isSameOrBefore(endDate)) {
            dates.push(startDate.format('YYYY-MM-DD'))
            startDate.add(1, 'days')
        }

        return dates
    }

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-[#1A1A1A]">
            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

            <View className="flex-1 bg-white dark:bg-[#1A1A1A]">
                <View className="flex-row items-center justify-between px-4 py-2">
                    <TouchableOpacity>
                        <Text className="text-2xl font-bold uppercase dark:text-white">
                            FotMob
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center justify-between space-x-6">
                        <TouchableOpacity>
                            <SimpleLineIcons
                                name="clock"
                                size={22}
                                color={
                                    colorScheme === 'light'
                                        ? '#000000'
                                        : '#FFFFFF'
                                }
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <AntDesign
                                name="search1"
                                size={25}
                                color={
                                    colorScheme === 'light'
                                        ? '#000000'
                                        : '#FFFFFF'
                                }
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Ionicons
                                name="calendar-number-outline"
                                size={24}
                                color={
                                    colorScheme === 'light'
                                        ? '#000000'
                                        : '#FFFFFF'
                                }
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <Tab.Navigator
                    initialRouteName="Today"
                    screenOptions={{
                        lazy: true,
                        tabBarStyle: {
                            paddingLeft: 16,
                            backgroundColor:
                                colorScheme === 'light' ? '#FFFFFF' : '#1A1A1A',
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
                                colorScheme === 'light' ? '#000000' : '#61DF6E',
                        },
                        tabBarActiveTintColor:
                            colorScheme === 'light' ? '#000000' : '#FFFFFF',
                        tabBarInactiveTintColor:
                            colorScheme === 'light' ? '#9F9F9F' : '#A3A3A3',
                        tabBarGap: 28,
                        tabBarScrollEnabled: true,
                    }}
                >
                    {getDateArr(sixDaysBeforeToday, sixDaysAfterToday).map(
                        (date) => (
                            <Tab.Screen
                                key={date}
                                name={formatDate(date)}
                                children={() => <Fixtures date={date} />}
                            />
                        )
                    )}
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    )
}
