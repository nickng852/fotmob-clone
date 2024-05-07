import clsx from 'clsx'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import _ from 'lodash'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { PlayerObj } from '@/lib/types/top-player-stats'

interface Props {
    title: string
    data: PlayerObj[]
    path: string | string[]
}

export default function PlayerStatsCard({ title, data, path }: Props) {
    return (
        <View className="rounded-xl bg-white shadow-lg dark:bg-[#1D1D1D]">
            <TouchableOpacity className="flex-row items-center justify-between rounded-t-xl bg-white p-4 dark:bg-[#1D1D1D]">
                <Text className="text-[17px] font-bold dark:text-white">
                    {title}
                </Text>

                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="#9F9F9F"
                />
            </TouchableOpacity>

            <View>
                {data.map((players: PlayerObj, index: number) => {
                    return (
                        <Link
                            key={players.player.id}
                            href={`/player/${players.player.id.toString()}`}
                            asChild
                        >
                            <TouchableOpacity
                                className={clsx(
                                    'flex-row items-center justify-between px-4 py-[10px]',
                                    {
                                        'rounded-b-xl pb-[18px]':
                                            index === data.length - 1,
                                    }
                                )}
                            >
                                <View className="flex-row items-center space-x-3">
                                    <Image
                                        className="h-[26px] w-[26px] rounded-full"
                                        source={players.player.photo}
                                        contentFit="cover"
                                        transition={500}
                                    />

                                    <Text className="text-[17px] dark:text-white">
                                        {players.player.name}
                                    </Text>
                                </View>

                                <View className="flex-row items-center space-x-[2px]">
                                    <Image
                                        className="h-[26px] w-[26px]"
                                        source={players.statistics[0].team.logo}
                                        contentFit="contain"
                                        transition={500}
                                    />

                                    <View className="basis-16 items-center justify-center">
                                        <View
                                            className={clsx({
                                                'items-center justify-center rounded-full bg-gray-200 px-2 py-[1.5px] dark:bg-gray-500':
                                                    index + 1 === 1,
                                            })}
                                        >
                                            <Text className="text-lg dark:text-white">
                                                {title === 'Rating' &&
                                                    Number(
                                                        _.get(
                                                            players
                                                                .statistics[0],
                                                            path
                                                        )
                                                    ).toFixed(2)}

                                                {title === 'Goals + Assists' &&
                                                    _.get(
                                                        players.statistics[0],
                                                        path[0]
                                                    ) +
                                                        _.get(
                                                            players
                                                                .statistics[0],
                                                            path[1]
                                                        )}

                                                {title !== 'Rating' &&
                                                    title !==
                                                        'Goals + Assists' &&
                                                    _.get(
                                                        players.statistics[0],
                                                        path
                                                    )}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    )
                })}
            </View>
        </View>
    )
}
