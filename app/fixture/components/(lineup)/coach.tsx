import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'

import Card from '@/app/fixture/components/(lineup)/card'
import { Lineup } from '@/lib/types/lineup'

interface Props {
    lineUp: Lineup[]
}

export default function Coach({ lineUp }: Props) {
    return (
        <Card title="Coach">
            <View className="flex-row justify-between">
                {lineUp.map((lineup: Lineup) => {
                    return (
                        <Link
                            key={lineup.team.id}
                            href={`/coach/${lineup.coach.id.toString()}`}
                            asChild
                        >
                            <TouchableOpacity className="basis-1/3 items-center justify-center space-y-1">
                                <Image
                                    className="relative h-12 w-12 rounded-full"
                                    source={lineup.coach.photo}
                                    contentFit="cover"
                                    transition={500}
                                />

                                <Text className="text-center text-[13px] font-medium text-[#333333] dark:text-white">
                                    {lineup.coach.name}
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    )
                })}
            </View>
        </Card>
    )
}
