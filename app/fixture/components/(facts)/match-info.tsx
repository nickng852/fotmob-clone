import { Image } from 'expo-image'
import _ from 'lodash'
import moment from 'moment'
import { useColorScheme } from 'nativewind'
import { View, Text } from 'react-native'
import {
    FontAwesome,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons'

import { Fixture, League } from '@/lib/types/fixture'

function formatDate(date: string) {
    const today = moment().format('YYYY-MM-DD')
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')
    const currentYear = moment().year()

    const isToday = moment(date).isSame(today, 'day')
    const isTomorrow = moment(date).isSame(tomorrow, 'day')
    const isCurrentYear = moment(date).year() === currentYear

    return isToday
        ? `Today ${moment(date).format('HH:mm')}`
        : isTomorrow
          ? `Tomorrow ${moment(date).format('HH:mm')}`
          : isCurrentYear
            ? moment(date).format('ddd, D MMM HH:mm')
            : moment(date).format('ddd, D MMM YYYY HH:mm')
}

function formatRound(round: string) {
    return round.includes('Regular Season')
        ? `Round ${round.split(' ').slice(-1)}`
        : round
}

function formatRefereeName(refereeName: string) {
    return refereeName.split(',')[0]
}

function Row({ logo, children }: { logo: any; children: React.ReactNode }) {
    return (
        <View className="flex-row items-center space-x-4">
            <View className="basis-4 items-center justify-center">{logo}</View>

            {children}
        </View>
    )
}

interface Props {
    fixture: Fixture
    league: League
}

export default function MatchInfo({ fixture, league }: Props) {
    const { colorScheme } = useColorScheme()

    return (
        <View
            style={{ gap: 20 }}
            className="rounded-xl bg-white px-4 py-6 shadow-lg dark:bg-[#1D1D1D]"
        >
            <Row
                logo={
                    <FontAwesome
                        name="calendar"
                        size={14}
                        color={colorScheme === 'light' ? '#333333' : '#FFFFFF'}
                    />
                }
            >
                <Text className="flex-1 px-2 text-base dark:text-white">
                    {formatDate(fixture.date)}
                </Text>
            </Row>

            <Row
                logo={
                    <Image
                        className="h-4 w-4"
                        source={league.logo}
                        contentFit="contain"
                        transition={500}
                    />
                }
            >
                <View className="rounded-2xl bg-[#F4F4F4] px-2 py-[1px] dark:bg-[#262626]">
                    <Text className="text-base text-[#717171] dark:text-[#E6E6E6]">
                        {league.name} - {formatRound(league.round)}
                    </Text>
                </View>
            </Row>

            <Row
                logo={
                    <MaterialIcons
                        name="stadium"
                        size={16}
                        color={colorScheme === 'light' ? '#333333' : '#FFFFFF'}
                    />
                }
            >
                <View className="rounded-2xl bg-[#F4F4F4] px-2 py-[1px] dark:bg-[#262626]">
                    <Text className="text-base text-[#717171] dark:text-[#E6E6E6]">
                        {fixture.venue.name}, {fixture.venue.city}
                    </Text>
                </View>
            </Row>

            {fixture.referee && (
                <Row
                    logo={
                        <MaterialCommunityIcons
                            name="whistle"
                            size={18}
                            color={
                                colorScheme === 'light' ? '#333333' : '#FFFFFF'
                            }
                        />
                    }
                >
                    <Text className="flex-1 px-2 text-base dark:text-white ">
                        {formatRefereeName(fixture.referee)}
                    </Text>
                </Row>
            )}
        </View>
    )
}
