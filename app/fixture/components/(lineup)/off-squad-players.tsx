import clsx from 'clsx'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

import Badge from '@/app/fixture/components/(lineup)/badge'
import Card from '@/app/fixture/components/(lineup)/card'
import { getPlayerPhoto, formatPlayerName } from '@/app/fixture/utils/helper'
import { Injury } from '@/lib/types/injury'

interface Props {
    homeTeamId: number
    awayTeamId: number
    offSquadPlayers: {
        [key: string]: Injury[]
    }
}

export default function OffSquadPlayers({
    homeTeamId,
    awayTeamId,
    offSquadPlayers,
}: Props) {
    return (
        <Card title="Injured and suspended players">
            <View
                className={clsx('flex justify-between', {
                    'flex-row':
                        Object.keys(offSquadPlayers)[0] ==
                        homeTeamId.toString(),
                    'flex-row-reverse':
                        Object.keys(offSquadPlayers)[0] ==
                        awayTeamId.toString(),
                })}
            >
                {Object.keys(offSquadPlayers).map((teamId) => {
                    return (
                        <View
                            key={teamId}
                            style={{ gap: 20 }}
                            className="basis-1/3"
                        >
                            {offSquadPlayers[teamId].map((injury: Injury) => {
                                return (
                                    <Link
                                        key={injury.player.id}
                                        href={`/player/${injury.player.id.toString()}`}
                                        asChild
                                    >
                                        <TouchableOpacity className="items-center justify-center space-y-1">
                                            <View>
                                                <Image
                                                    className="relative h-12 w-12 rounded-full"
                                                    source={getPlayerPhoto(
                                                        injury.player.id
                                                    )}
                                                    contentFit="cover"
                                                    transition={500}
                                                />

                                                <View className="absolute -right-[1px] bottom-0">
                                                    {injury.player.reason ===
                                                        'Red Card' ||
                                                    injury.player.reason ===
                                                        'Suspended' ? (
                                                        <Badge
                                                            type="card"
                                                            color="red"
                                                        />
                                                    ) : (
                                                        <Badge type="injury" />
                                                    )}
                                                </View>
                                            </View>

                                            <View className="items-center justify-center">
                                                <Text className="text-center text-[13px] font-medium text-[#333333] dark:text-white">
                                                    {formatPlayerName(
                                                        injury.player.name
                                                    )}
                                                </Text>

                                                <Text className="text-center text-[13px] text-[#717171] dark:text-[#9F9F9F]">
                                                    {injury.player.reason}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Link>
                                )
                            })}
                        </View>
                    )
                })}
            </View>
        </Card>
    )
}
