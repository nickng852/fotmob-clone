import clsx from 'clsx'
import _ from 'lodash'
import { useColorScheme } from 'nativewind'
import { View, Text } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import Badge from '@/app/fixture/components/(lineup)/badge'
import { Event } from '@/lib/types/event'

interface Props {
    homeTeamId: number
    awayTeamId: number
    events: Event[]
}

export default function Events({ homeTeamId, awayTeamId, events }: Props) {
    const { colorScheme } = useColorScheme()

    const getCurrentGoalByTeamId = (teamId: number, time: number) => {
        return events.filter(
            (event: Event) =>
                event.time.elapsed <= time &&
                event.type === 'Goal' &&
                event.team.id === teamId
        ).length
    }

    return (
        <View className="space-y-5 rounded-xl bg-white px-4 py-6 shadow-lg dark:bg-[#1D1D1D]">
            {events
                .filter((event) => event.comments !== 'Penalty Shootout')
                .map((event: Event, index: number) => {
                    return (
                        <View
                            key={index}
                            style={{ gap: 10 }}
                            className={clsx('w-full flex-row items-center', {
                                'flex-row-reverse':
                                    event.team.id === awayTeamId,
                            })}
                        >
                            <View
                                className={clsx('flex-row items-center', {
                                    'flex-row-reverse':
                                        event.team.id === awayTeamId,
                                })}
                            >
                                <View className="basis-9">
                                    <Text
                                        className={clsx(
                                            'text-base font-semibold dark:text-white',
                                            {
                                                'text-right':
                                                    event.team.id ===
                                                    awayTeamId,
                                            }
                                        )}
                                    >
                                        {event.time.elapsed}'
                                    </Text>

                                    {event.time.extra && (
                                        <Text
                                            className={clsx(
                                                'text-[13px] font-extrabold text-[#6B7280]',
                                                {
                                                    'text-right':
                                                        event.team.id ===
                                                        awayTeamId,
                                                }
                                            )}
                                        >
                                            +{event.time.extra}'
                                        </Text>
                                    )}
                                </View>

                                <View className="basis-6 items-center justify-center">
                                    {event.type === 'Goal' && (
                                        <Ionicons
                                            name="football"
                                            size={22}
                                            color={
                                                event.detail === 'Own Goal'
                                                    ? '#E55E5B'
                                                    : colorScheme === 'light'
                                                      ? '#4B4C69'
                                                      : '#333333'
                                            }
                                        />
                                    )}

                                    {event.type === 'Card' && (
                                        <View
                                            className={clsx(
                                                'h-[20px] w-[15.5px] rounded-[3px]',
                                                {
                                                    'bg-yellowcard':
                                                        event.detail ===
                                                        'Yellow Card',
                                                    'bg-redcard':
                                                        event.detail ===
                                                        'Red Card',
                                                }
                                            )}
                                        />
                                    )}

                                    {event.type === 'subst' && (
                                        <View className="space-y-1">
                                            <View
                                                className={clsx({
                                                    '-scale-x-100':
                                                        event.team.id ===
                                                        awayTeamId,
                                                })}
                                            >
                                                <Badge
                                                    type="substitution"
                                                    subType="in"
                                                />
                                            </View>

                                            <View
                                                className={clsx({
                                                    '-scale-x-100':
                                                        event.team.id ===
                                                        awayTeamId,
                                                })}
                                            >
                                                <Badge
                                                    type="substitution"
                                                    subType="out"
                                                />
                                            </View>
                                        </View>
                                    )}

                                    {event.type === 'Var' && (
                                        <MaterialIcons
                                            name="screenshot-monitor"
                                            size={24}
                                            color={
                                                colorScheme === 'light'
                                                    ? '#4B4C69'
                                                    : '#6A80AC'
                                            }
                                        />
                                    )}
                                </View>
                            </View>

                            <View className="flex-1">
                                {event.type === 'Goal' && (
                                    <View>
                                        <Text
                                            className={clsx(
                                                'text-base dark:text-white',
                                                {
                                                    'text-right':
                                                        event.team.id ===
                                                        awayTeamId,
                                                }
                                            )}
                                        >
                                            {event.player.name} (
                                            <Text
                                                className={clsx(
                                                    'text-base dark:text-white',
                                                    {
                                                        'text-[#15803D]':
                                                            event.team.id ===
                                                            homeTeamId,
                                                    }
                                                )}
                                            >
                                                {getCurrentGoalByTeamId(
                                                    homeTeamId,
                                                    event.time.elapsed
                                                )}
                                            </Text>
                                            <Text className="text-base dark:text-white">
                                                {' '}
                                                -{' '}
                                            </Text>
                                            <Text
                                                className={clsx(
                                                    'text-base dark:text-white',
                                                    {
                                                        'text-[#15803D]':
                                                            event.team.id ===
                                                            awayTeamId,
                                                    }
                                                )}
                                            >
                                                {getCurrentGoalByTeamId(
                                                    awayTeamId,
                                                    event.time.elapsed
                                                )}
                                            </Text>
                                            )
                                        </Text>

                                        {event.detail === 'Normal Goal' &&
                                            event.assist.id && (
                                                <Text
                                                    className={clsx(
                                                        'text-[#6B7280] dark:text-white',
                                                        {
                                                            'text-right':
                                                                event.team
                                                                    .id ===
                                                                awayTeamId,
                                                        }
                                                    )}
                                                >
                                                    Assist by{' '}
                                                    {event.assist.name}
                                                </Text>
                                            )}

                                        {(event.detail === 'Penalty' ||
                                            event.detail === 'Own Goal') && (
                                            <Text
                                                className={clsx(
                                                    'text-[#6B7280] dark:text-[#9F9F9F]',
                                                    {
                                                        'text-right':
                                                            event.team.id ===
                                                            awayTeamId,
                                                    }
                                                )}
                                            >
                                                {event.detail}
                                            </Text>
                                        )}
                                    </View>
                                )}

                                {event.type === 'Card' && (
                                    <Text
                                        className={clsx(
                                            'text-base dark:text-white',
                                            {
                                                'text-right':
                                                    event.team.id ===
                                                    awayTeamId,
                                            }
                                        )}
                                    >
                                        {event.player.name}
                                    </Text>
                                )}

                                {event.type === 'subst' && (
                                    <View>
                                        <Text
                                            className={clsx(
                                                'text-base text-[#03975F]',
                                                {
                                                    'text-right':
                                                        event.team.id ===
                                                        awayTeamId,
                                                }
                                            )}
                                        >
                                            {event.assist.name}
                                        </Text>

                                        <Text
                                            className={clsx(
                                                'text-base text-[#E55D5B]',
                                                {
                                                    'text-right':
                                                        event.team.id ===
                                                        awayTeamId,
                                                }
                                            )}
                                        >
                                            {event.player.name}
                                        </Text>
                                    </View>
                                )}

                                {event.type === 'Var' && (
                                    <View>
                                        <Text
                                            className={clsx(
                                                'text-base dark:text-white',
                                                {
                                                    'text-right':
                                                        event.team.id ===
                                                        awayTeamId,
                                                }
                                            )}
                                        >
                                            {event.detail}
                                        </Text>

                                        <Text
                                            className={clsx(
                                                'text-[#6B7280] dark:text-white',
                                                {
                                                    'text-right':
                                                        event.team.id ===
                                                        awayTeamId,
                                                }
                                            )}
                                        >
                                            {event.player.name}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    )
                })}
        </View>
    )
}
