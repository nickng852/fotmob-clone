import clsx from 'clsx'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

import Badge from '@/app/fixture/components/(lineup)/badge'
import RatingBadge from '@/app/fixture/components/(lineup)/rating-badge'
import SubstitutionBadge from '@/app/fixture/components/(lineup)/substitution-badge'
import {
    getPlayerPhoto,
    formatPlayerName,
    formatPlayerPosition,
    useLineup,
} from '@/app/fixture/utils/helper'
import { Event } from '@/lib/types/event'
import { Lineup, StartXI, Substitute } from '@/lib/types/lineup'
import { PlayerStats } from '@/lib/types/player-stats'

interface Props {
    type: string
    events: Event[]
    playerStats: PlayerStats[]
    lineup: Lineup
    squad: StartXI | Substitute
}

export default function Avatar({
    type,
    events,
    playerStats,
    lineup,
    squad,
}: Props) {
    const {
        getPlayerStats,
        isPlayerCaptain,
        isPlayerSubstituted,
        getSubstitutedTime,
        getPlayerRating,
        getPlayerGoals,
        getPlayerAssists,
        getPlayerYellowCards,
        getPlayerRedCards,
    } = useLineup(events, playerStats)

    return (
        <Link
            key={squad.player.id}
            href={`/player/${squad.player.id.toString()}`}
            asChild
        >
            <TouchableOpacity className="z-10 basis-24 items-center justify-center space-y-1">
                <View>
                    <Image
                        className="relative h-12 w-12 rounded-full"
                        source={getPlayerPhoto(squad.player.id)}
                        contentFit="cover"
                        transition={500}
                    />

                    {getPlayerStats(lineup.team.id, squad.player.id) && (
                        <>
                            {isPlayerSubstituted(
                                lineup.team.id,
                                squad.player.id
                            ) && (
                                <SubstitutionBadge
                                    type={type === 'startXI' ? 'out' : 'in'}
                                    value={
                                        getSubstitutedTime(
                                            lineup.team.id,
                                            squad.player.id
                                        ) as number
                                    }
                                />
                            )}

                            {(type === 'startXI' ||
                                (type === 'substitute' &&
                                    isPlayerSubstituted(
                                        lineup.team.id,
                                        squad.player.id
                                    ) &&
                                    getPlayerRating(
                                        lineup.team.id,
                                        squad.player.id
                                    ))) && (
                                <View className="absolute -right-[9.5px] -top-[2px]">
                                    <RatingBadge
                                        type="avatar"
                                        value={
                                            getPlayerRating(
                                                lineup.team.id,
                                                squad.player.id
                                            ) as string
                                        }
                                    />
                                </View>
                            )}

                            {getPlayerGoals(squad.player.id) && (
                                <View className="absolute -bottom-[1.5px] -right-[1.5px] flex-row">
                                    {getPlayerGoals(squad.player.id).map(
                                        (event: Event, index: number) => (
                                            <Badge
                                                key={index}
                                                index={index}
                                                type="goal"
                                                subType={event.detail}
                                            />
                                        )
                                    )}
                                </View>
                            )}

                            {getPlayerAssists(squad.player.id) && (
                                <View className="absolute -bottom-[1.5px] right-[26px] flex-row">
                                    {getPlayerAssists(squad.player.id).map(
                                        (event: Event, index: number) => (
                                            <Badge key={index} type="assist" />
                                        )
                                    )}
                                </View>
                            )}

                            {getPlayerYellowCards(squad.player.id) && (
                                <View className="absolute -left-[7px] bottom-[15px]">
                                    {getPlayerYellowCards(squad.player.id).map(
                                        (event: Event, index: number) => (
                                            <Badge
                                                key={index}
                                                type="card"
                                                color="yellow"
                                            />
                                        )
                                    )}
                                </View>
                            )}

                            {getPlayerRedCards(squad.player.id) && (
                                <View className="absolute -left-[7px] bottom-[15px]">
                                    {getPlayerRedCards(squad.player.id).map(
                                        (event: Event, index: number) => (
                                            <Badge
                                                key={index}
                                                type="card"
                                                color="red"
                                            />
                                        )
                                    )}
                                </View>
                            )}
                        </>
                    )}
                </View>

                <View>
                    <View className="flex-row items-center">
                        {isPlayerCaptain(lineup.team.id, squad.player.id) && (
                            <>
                                <View className="h-[11px] w-[11px] items-center justify-center rounded bg-white p-[1px]">
                                    <Text className="text-center text-[8px] font-bold text-gray-900">
                                        C
                                    </Text>
                                </View>

                                <Text> </Text>
                            </>
                        )}

                        <Text
                            className={clsx(
                                'text-center text-[13px] font-medium',
                                {
                                    'text-[#B3DFCE] dark:text-[#BBBBBB]':
                                        type === 'startXI',
                                    'text-[#717171] dark:text-[#9F9F9F]':
                                        type === 'substitute',
                                }
                            )}
                        >
                            {squad.player.number}{' '}
                            <Text
                                className={clsx({
                                    'text-white': type === 'startXI',
                                    'text-[#333333] dark:text-white':
                                        type === 'substitute',
                                })}
                            >
                                {formatPlayerName(squad.player.name)}
                            </Text>
                        </Text>
                    </View>

                    {type === 'substitute' && (
                        <Text className="text-center text-[13px] text-[#717171] dark:text-[#9F9F9F]">
                            {formatPlayerPosition(squad.player.pos)}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        </Link>
    )
}
