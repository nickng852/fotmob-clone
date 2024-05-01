import clsx from 'clsx'
import _ from 'lodash'
import { View, Text } from 'react-native'

import Card from '@/app/fixture/components/(stats)/card'
import { Trophy } from '@/lib/types/trophy'

function formatTrophySeason(season: string) {
    if (season.includes('/')) {
        return (
            season.split('/')[0].slice(-2) +
            '/' +
            season.split('/')[1].slice(-2)
        )
    }

    if (season.includes(' ')) {
        return season.split(' ')[0]
    }

    return season
}

interface Props {
    data: {
        [key: string]: Trophy[]
    }
}

export default function TrophiesCard({ data }: Props) {
    return (
        <Card>
            <Text className="text-base font-bold dark:text-white">
                Trophies
            </Text>

            <View className="rounded-md border border-[#F1F1F1] dark:border-[#333333]">
                {_.keys(data).map((trophyKey: string, index: number) => {
                    const getTrophySeasons = () => {
                        return `(${data[trophyKey]
                            .map((trophy: Trophy) =>
                                formatTrophySeason(trophy.season)
                            )
                            .join('・')})`
                    }

                    return (
                        <View
                            key={trophyKey}
                            className={clsx('flex-row items-center py-3', {
                                'border-b border-[#F1F1F1] dark:border-[#333333]':
                                    index !== _.keys(data).length - 1,
                            })}
                        >
                            <Text className="basis-12 text-center font-semibold text-[#717171] dark:text-[#9F9F9F]">
                                {data[trophyKey].length}
                            </Text>

                            <View className="flex-1">
                                <Text className="text-base dark:text-white">
                                    {trophyKey}{' '}
                                    <Text className="text-base text-[#717171] dark:text-[#9F9F9F]">
                                        {getTrophySeasons()}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        </Card>
    )
}
