import clsx from 'clsx'
import { Image } from 'expo-image'
import { View, Text } from 'react-native'

import Avatar from '@/app/fixture/components/(lineup)/avatar'
import Gantry from '@/app/fixture/components/(lineup)/gantry'
import RatingBadge from '@/app/fixture/components/(lineup)/rating-badge'
import { useLineup } from '@/app/fixture/utils/helper'
import { Event } from '@/lib/types/event'
import { Lineup, StartXI } from '@/lib/types/lineup'
import { PlayerStats } from '@/lib/types/player-stats'

const R = require('ramda')

interface Props {
    homeTeamId: number
    awayTeamId: number
    events: Event[]
    lineUp: Lineup[]
    playerStats: PlayerStats[]
}

interface PlayersInGrid {
    player: {
        id: number
        name: string
        number: number
        pos: string
        grid: {
            x: number
            y: number
        }
    }
}

export default function StartingXI({
    homeTeamId,
    awayTeamId,
    events,
    lineUp,
    playerStats,
}: Props) {
    const { getStartXITeamRating } = useLineup(events, playerStats)

    return (
        <View className="bg-[#00925B] dark:bg-[#1D1D1D]">
            {lineUp.map((lineup: Lineup) => {
                const restructuredLineUp = lineup.startXI.map(
                    (startXI: StartXI) => {
                        return {
                            player: {
                                ...startXI.player,
                                grid: {
                                    x: Number(
                                        startXI.player.grid.split(':')[0]
                                    ),
                                    y: Number(
                                        startXI.player.grid.split(':')[1]
                                    ),
                                },
                            },
                        }
                    }
                )

                const playersInGrid = R.groupBy(
                    R.path(['player', 'grid', 'x']),
                    restructuredLineUp
                )

                return (
                    <View
                        key={lineup.team.id}
                        className={clsx({
                            'flex-col-reverse': lineup.team.id === awayTeamId,
                        })}
                    >
                        <View className="z-10 flex-row items-center space-x-2 bg-[#0E9E68] p-[14px] dark:bg-[#2C2C2C]">
                            <RatingBadge
                                type="formation"
                                value={getStartXITeamRating(
                                    lineup.team.id,
                                    lineup.startXI
                                )}
                            />

                            <Image
                                className="h-[18px] w-[18px]"
                                source={lineup.team.logo}
                                contentFit="contain"
                                transition={500}
                            />

                            <Text className="text-[17px] font-bold text-white">
                                {lineup.team.name}
                            </Text>

                            <Text className="text-[17px] font-bold text-[#B3DFCE] dark:text-[#9F9F9F]">
                                {lineup.formation}
                            </Text>
                        </View>

                        <View
                            style={{ gap: 20 }}
                            className={clsx('relative', {
                                'pb-7 pt-3': lineup.team.id === homeTeamId,
                                'flex-col-reverse pb-3 pt-7':
                                    lineup.team.id === awayTeamId,
                            })}
                        >
                            <View
                                className={clsx(
                                    'absolute left-0 right-0 items-center justify-center',
                                    {
                                        '-top-3': lineup.team.id === homeTeamId,
                                        '-bottom-3 rotate-180':
                                            lineup.team.id === awayTeamId,
                                    }
                                )}
                            >
                                <Gantry />
                            </View>

                            <View
                                className={clsx(
                                    'absolute left-0 right-0 items-center justify-center',
                                    {
                                        'bottom-0':
                                            lineup.team.id === homeTeamId,
                                        'top-0': lineup.team.id === awayTeamId,
                                    }
                                )}
                            >
                                <View className="h-[3px] w-full bg-[#0D9F68] dark:bg-[#2C2C2C]" />
                            </View>

                            {lineup.team.id === homeTeamId && (
                                <View className="absolute -bottom-16 left-0 right-0 items-center justify-center">
                                    <View className="h-32 w-32 rounded-full border-[6px] border-[#0D9F68] dark:border-[#2C2C2C]" />
                                </View>
                            )}

                            {Object.keys(playersInGrid).map((key) => {
                                const playersByGridY = playersInGrid[key].sort(
                                    (a: PlayersInGrid, b: PlayersInGrid) =>
                                        a.player.grid.y - b.player.grid.y
                                )

                                return (
                                    <View
                                        key={key}
                                        className={clsx(
                                            'flex-row items-start justify-around',
                                            {
                                                'flex-row-reverse':
                                                    lineup.team.id ===
                                                    homeTeamId,
                                            }
                                        )}
                                    >
                                        {playersByGridY.map(
                                            (startXI: StartXI) => {
                                                return (
                                                    <Avatar
                                                        key={startXI.player.id}
                                                        type="startXI"
                                                        events={events}
                                                        playerStats={
                                                            playerStats
                                                        }
                                                        lineup={lineup}
                                                        squad={startXI}
                                                    />
                                                )
                                            }
                                        )}
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                )
            })}
        </View>
    )
}
