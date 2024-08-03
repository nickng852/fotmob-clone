import clsx from 'clsx'
import { Image } from 'expo-image'
import _ from 'lodash'
import { View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { getPlayerPhoto } from '@/app/fixture/utils/helper'
import { Event, Time } from '@/lib/types/event'

interface Props {
    homeTeamId: number
    awayTeamId: number
    events: Event[]
}

export default function PenaltyShootout({
    homeTeamId,
    awayTeamId,
    events,
}: Props) {
    const penaltyShootoutEvents = events.filter(
        (event: Event) =>
            event.type && event.detail && event.comments === 'Penalty Shootout'
    )

    // TODO: should use event sequence to count scores for each team
    const getCurrentGoalByTeamId = (teamId: number, time: Time) => {
        return penaltyShootoutEvents.filter(
            (event: Event) =>
                event.time.elapsed + (event.time.extra as number) <=
                    time.elapsed + (time.extra as number) &&
                event.team.id === teamId &&
                event.detail === 'Penalty'
        ).length
    }

    return (
        <View className="space-y-[34px] rounded-xl bg-white p-4 shadow-lg">
            <Text className="flex-1 text-base font-bold">Penalty shootout</Text>

            <View className="space-y-2">
                {penaltyShootoutEvents.map((event: Event, index: number) => {
                    return (
                        <View
                            key={index}
                            style={{ gap: 15 }}
                            className={clsx('w-full flex-row items-center', {
                                'flex-row-reverse':
                                    event.team.id === awayTeamId,
                            })}
                        >
                            <View>
                                <Image
                                    className="relative h-10 w-10 rounded-full border-[1px] border-gray-200"
                                    source={getPlayerPhoto(event.player.id)}
                                    contentFit="cover"
                                    transition={500}
                                />

                                <View className="absolute -bottom-1 -right-1 h-5 w-5 items-center justify-center rounded-full bg-white">
                                    {event.detail === 'Penalty' && (
                                        <FontAwesome
                                            name="check-circle"
                                            size={18}
                                            color="#03975F"
                                        />
                                    )}

                                    {event.detail === 'Missed Penalty' && (
                                        <FontAwesome
                                            name="times-circle"
                                            size={18}
                                            color="#E55D5B"
                                        />
                                    )}
                                </View>
                            </View>

                            <View>
                                <Text className="text-[17px]">
                                    {event.player.name}
                                </Text>

                                <View
                                    className={clsx('flex-row', {
                                        'justify-end':
                                            event.team.id === awayTeamId,
                                    })}
                                >
                                    <Text
                                        className={clsx(
                                            'text-base text-[#717171]',
                                            {
                                                'text-[#15803D]':
                                                    event.team.id ===
                                                        homeTeamId &&
                                                    event.detail === 'Penalty',
                                            }
                                        )}
                                    >
                                        {getCurrentGoalByTeamId(
                                            homeTeamId,
                                            event.time
                                        )}
                                    </Text>

                                    <Text className="text-base text-[#717171]">
                                        {' '}
                                        -{' '}
                                    </Text>

                                    <Text
                                        className={clsx(
                                            'text-base text-[#717171]',
                                            {
                                                'text-[#15803D]':
                                                    event.team.id ===
                                                        awayTeamId &&
                                                    event.detail === 'Penalty',
                                            }
                                        )}
                                    >
                                        {getCurrentGoalByTeamId(
                                            awayTeamId,
                                            event.time
                                        )}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}
