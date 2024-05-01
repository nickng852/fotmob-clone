import { Image } from 'expo-image'
import _ from 'lodash'
import moment from 'moment'
import { ScrollView, View, Text } from 'react-native'

import Card from '@/app/fixture/components/(stats)/card'
import { Coach, Career } from '@/lib/types/coach'

export default function CareerTab({ coach }: { coach: Coach }) {
    return (
        <ScrollView className="bg-[#FAFAFA] dark:bg-black">
            <View style={{ gap: 12 }} className="p-[10px]">
                <Card>
                    <Text className="text-base font-bold text-[#8D9499] dark:text-white">
                        Coaching career
                    </Text>

                    <View style={{ gap: 18 }}>
                        {coach.career.map((career: Career) => {
                            return (
                                <View
                                    key={career.team.id}
                                    className="flex-row items-center space-x-[10px]"
                                >
                                    <Image
                                        className="h-6 w-6"
                                        source={career.team.logo}
                                        contentFit="contain"
                                        transition={500}
                                    />

                                    <View className="space-y-[2px]">
                                        <Text className="text-base font-medium dark:text-white">
                                            {career.team.name}
                                        </Text>

                                        <Text className="font-normal text-[#717171] dark:text-[#9F9F9F]">
                                            {moment(career.start).format(
                                                'MMM YYYY'
                                            )}{' '}
                                            -{' '}
                                            {career.end === null
                                                ? 'now'
                                                : moment(career.end).format(
                                                      'MMM YYYY'
                                                  )}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </Card>
            </View>
        </ScrollView>
    )
}
