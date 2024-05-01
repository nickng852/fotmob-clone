import clsx from 'clsx'
import { Image } from 'expo-image'
import _ from 'lodash'
import moment from 'moment'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import { ScrollView, View, Text } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { useQuery } from '@tanstack/react-query'

import TrophiesCard from '@/app/coach/components/(profile)/trophies-card'
import Card from '@/app/fixture/components/(stats)/card'
import CardItem from '@/app/player/components/card-item'
import { fetchCountries } from '@/lib/api/countries'
import { fetchTrophiesByCoachId } from '@/lib/api/trophies'
import { Coach } from '@/lib/types/coach'
import { Country } from '@/lib/types/country'
import { Trophy } from '@/lib/types/trophy'

export default function ProfileTab({
    coachId,
    coach,
}: {
    coachId: string
    coach: Coach
}) {
    const {
        isPending: countriesPending,
        isSuccess: countriesSuccess,
        data: countriesData,
    } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
    })

    const {
        isPending: trophiesPending,
        isSuccess: trophiesSuccess,
        data: trophiesData,
    } = useQuery({
        queryKey: ['trophies', coachId],
        queryFn: () => fetchTrophiesByCoachId(coachId),
    })

    const isPending = trophiesPending
    const isSuccess = trophiesSuccess

    const country =
        countriesSuccess &&
        countriesData.response.find(
            (country: Country) => country.name === coach.nationality
        )

    const trophiesByLeague = _.groupBy(
        trophiesData?.response.filter(
            (trophy: Trophy) => trophy.place === 'Winner'
        ),
        'league'
    )

    return (
        <>
            {isPending && (
                <View className="flex-1 items-center justify-center">
                    <Circle size={24} color="#A1A1AA" />
                </View>
            )}

            {isSuccess && (
                <ScrollView className="bg-[#FAFAFA] dark:bg-black">
                    <View style={{ gap: 12 }} className=" p-[10px]">
                        <Card>
                            <View className="flex-row">
                                <CardItem
                                    value={coach.height ?? '-'}
                                    type="Height"
                                />

                                <CardItem
                                    value={`${coach.age} years` ?? '-'}
                                    type={
                                        moment(coach.birth.date).format(
                                            'D MMM YYYY'
                                        ) ?? 'Age'
                                    }
                                />

                                <CardItem type="Country">
                                    <View
                                        className={clsx(
                                            'flex-row items-center justify-center',
                                            {
                                                'space-x-2':
                                                    countriesPending ||
                                                    country?.flag,
                                            }
                                        )}
                                    >
                                        {countriesPending ? (
                                            <MotiView
                                                transition={{
                                                    type: 'timing',
                                                }}
                                            >
                                                <Skeleton
                                                    colorMode="light"
                                                    radius="round"
                                                    height={15}
                                                    width={15}
                                                />
                                            </MotiView>
                                        ) : (
                                            <>
                                                {country?.flag && (
                                                    <Image
                                                        className="h-[15px] w-[15px] rounded-full"
                                                        source={country.flag}
                                                        contentFit="cover"
                                                        transition={500}
                                                    />
                                                )}
                                            </>
                                        )}

                                        <Text className="text-lg dark:text-white">
                                            {coach.nationality
                                                .substring(0, 3)
                                                .toUpperCase()}
                                        </Text>
                                    </View>
                                </CardItem>
                            </View>
                        </Card>

                        {trophiesSuccess && !_.isEmpty(trophiesByLeague) && (
                            <TrophiesCard data={trophiesByLeague} />
                        )}
                    </View>
                </ScrollView>
            )}
        </>
    )
}
