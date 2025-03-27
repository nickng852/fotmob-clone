import clsx from 'clsx'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import _ from 'lodash'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Player } from '@/lib/types/player-stats'

interface PlayerWithValues extends Player {
    value: number
}

interface RankedPlayerWithValues extends PlayerWithValues {
    rank: number
}

interface Props {
    title: string
    data: PlayerWithValues[]
    getTeamLogo: (playerId: number) => string
    path: string
}

export default function PlayerStatsCard({ title, data, getTeamLogo }: Props) {
    let rank: number = 0
    let lastRank: number = 0
    let lastValue: number

    const rankPlayers: RankedPlayerWithValues[] = data
        .sort((a: PlayerWithValues, b: PlayerWithValues) => b.value - a.value)
        .map((player: PlayerWithValues, index: number) => {
            if (player.value !== lastValue) {
                rank = lastRank + 1 // Increment the rank based on previous rank
                lastRank = rank // Update the lastRank for future players
                lastValue = player.value // Update lastValue
            }

            return { ...player, rank }
        })

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
                {rankPlayers.map(
                    (player: RankedPlayerWithValues, index: number) => {
                        return (
                            <Link
                                key={player.id}
                                href={`/player/${player.id.toString()}`}
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
                                        <Text className="text-[14px] text-[#717171]">
                                            {player.rank}
                                        </Text>

                                        <Image
                                            className="h-[26px] w-[26px] rounded-full"
                                            source={player.photo}
                                            contentFit="cover"
                                            transition={500}
                                        />

                                        <Text className="text-[17px] dark:text-white">
                                            {player.name}
                                        </Text>
                                    </View>

                                    <View className="flex-row items-center space-x-[2px]">
                                        <Image
                                            className="h-[26px] w-[26px]"
                                            source={getTeamLogo(player.id)}
                                            contentFit="contain"
                                            transition={500}
                                        />

                                        <View className="basis-16 items-center justify-center">
                                            <View
                                                className={clsx({
                                                    'items-center justify-center rounded-full bg-gray-200 dark:bg-gray-500':
                                                        player.rank === 1 &&
                                                        index === 0,
                                                    'px-2':
                                                        player.rank === 1 &&
                                                        index === 0 &&
                                                        player.value < 10,
                                                    'px-[8.5px] py-[0.5px]':
                                                        player.rank === 1 &&
                                                        index === 0 &&
                                                        player.value >= 10,
                                                })}
                                            >
                                                <Text className="text-lg dark:text-white">
                                                    {player.value}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Link>
                        )
                    }
                )}
            </View>
        </View>
    )
}
