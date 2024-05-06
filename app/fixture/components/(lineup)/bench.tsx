import { View } from 'react-native'

import Avatar from '@/app/fixture/components/(lineup)/avatar'
import Card from '@/app/fixture/components/(lineup)/card'
import { Event } from '@/lib/types/event'
import { Lineup, Substitute } from '@/lib/types/lineup'
import { PlayerStats } from '@/lib/types/player-stats'

interface Props {
    events: Event[]
    lineUp: Lineup[]
    playerStats: PlayerStats[]
}

export default function Bench({ events, lineUp, playerStats }: Props) {
    return (
        <Card title="Bench">
            <View className="flex-row justify-between">
                {lineUp.map((lineup: Lineup) => {
                    return (
                        <View
                            key={lineup.team.id}
                            style={{ gap: 20 }}
                            className="basis-1/3"
                        >
                            {lineup.substitutes.map(
                                (substitute: Substitute) => {
                                    return (
                                        <Avatar
                                            key={substitute.player.id}
                                            type="substitute"
                                            events={events}
                                            playerStats={playerStats}
                                            lineup={lineup}
                                            squad={substitute}
                                        />
                                    )
                                }
                            )}
                        </View>
                    )
                })}
            </View>
        </Card>
    )
}
