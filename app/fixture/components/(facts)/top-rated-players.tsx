import clsx from 'clsx'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import _ from 'lodash'
import { View, Text, TouchableOpacity } from 'react-native'

import RatingBadge from '@/app/fixture/components/(lineup)/rating-badge'
import {
    formatPlayerName,
    formatPlayerPosition,
    useLineup,
} from '@/app/fixture/utils/helper'
import { Event } from '@/lib/types/event'
import { PlayerStats, Players } from '@/lib/types/player-stats'

interface Props {
    homeTeamId: number
    awayTeamId: number
    events: Event[]
    playerStats: PlayerStats[]
}

export default function TopRatedPlayers({
    homeTeamId,
    awayTeamId,
    events,
    playerStats,
}: Props) {
    const { getPlayerRating } = useLineup(events, playerStats)

    return (
        <View className="space-y-4 rounded-xl bg-white p-4 shadow-lg dark:bg-[#1D1D1D]">
            <Text className="flex-1 text-base font-bold dark:text-white">
                Top rated
            </Text>

            <View className="flex-row justify-between">
                {playerStats.map((playerStat: PlayerStats) => {
                    const sortedPlayers = playerStat.players
                        .sort(
                            (a: Players, b: Players) =>
                                Number(
                                    getPlayerRating(
                                        playerStat.team.id,
                                        b.player.id
                                    )
                                ) -
                                Number(
                                    getPlayerRating(
                                        playerStat.team.id,
                                        a.player.id
                                    )
                                )
                        )
                        .slice(0, 3)

                    return (
                        <View key={playerStat.team.id} className="flex-1">
                            {sortedPlayers.map(
                                (players: Players, index: number) => {
                                    return (
                                        <Link
                                            key={players.player.id}
                                            href={`/player/${players.player.id.toString()}`}
                                            asChild
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    gap: 15,
                                                }}
                                                className={clsx(
                                                    'items-center pb-[9px] pt-[18px]',
                                                    {
                                                        'flex-row':
                                                            playerStat.team
                                                                .id ===
                                                            homeTeamId,
                                                        'flex-row-reverse':
                                                            playerStat.team
                                                                .id ===
                                                            awayTeamId,
                                                        'border-b-0.5 border-[#F0F0F0] dark:border-[#000000]':
                                                            index !==
                                                            sortedPlayers.length -
                                                                1,
                                                    }
                                                )}
                                            >
                                                <View>
                                                    <Image
                                                        className="relative h-10 w-10 rounded-full border-[1px] border-gray-200 dark:border-0"
                                                        source={
                                                            players.player.photo
                                                        }
                                                        contentFit="cover"
                                                        transition={500}
                                                    />

                                                    <Image
                                                        className={clsx(
                                                            'absolute bottom-0 h-[14px] w-[14px]',
                                                            {
                                                                'left-0':
                                                                    playerStat
                                                                        .team
                                                                        .id ===
                                                                    homeTeamId,
                                                                'right-0':
                                                                    playerStat
                                                                        .team
                                                                        .id ===
                                                                    awayTeamId,
                                                            }
                                                        )}
                                                        source={
                                                            playerStat.team.logo
                                                        }
                                                        contentFit="contain"
                                                        transition={500}
                                                    />

                                                    <View className="absolute -right-[3px] -top-[7px]">
                                                        <RatingBadge
                                                            type="avatar"
                                                            value={
                                                                getPlayerRating(
                                                                    playerStat
                                                                        .team
                                                                        .id,
                                                                    players
                                                                        .player
                                                                        .id
                                                                ) as string
                                                            }
                                                        />
                                                    </View>
                                                </View>

                                                <View
                                                    className={clsx({
                                                        'items-end':
                                                            playerStat.team
                                                                .id ===
                                                            awayTeamId,
                                                    })}
                                                >
                                                    <Text className="text-base dark:text-white">
                                                        {formatPlayerName(
                                                            players.player.name
                                                        )}
                                                    </Text>

                                                    <Text className="text-[#6B7280] dark:text-[#9F9F9F]">
                                                        {formatPlayerPosition(
                                                            players
                                                                .statistics[0]
                                                                .games.position
                                                        )}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </Link>
                                    )
                                }
                            )}
                        </View>
                    )
                })}
            </View>
        </View>
    )
}
