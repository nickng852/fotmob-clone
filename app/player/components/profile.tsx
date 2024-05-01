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
import { fetchTrophiesByPlayerId } from '@/lib/api/trophies'
import { Country } from '@/lib/types/country'
import { PlayerObj } from '@/lib/types/player'
import { Trophy } from '@/lib/types/trophy'

export default function ProfileTab({
    playerId,
    playerObj,
}: {
    playerId: string
    playerObj: PlayerObj
}) {
    const { player, statistics } = playerObj

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
        queryKey: ['trophies', playerId],
        queryFn: () => fetchTrophiesByPlayerId(playerId),
    })

    const isPending = trophiesPending
    const isSuccess = trophiesSuccess

    const country =
        countriesSuccess &&
        countriesData.response.find(
            (country: Country) => country.name === player.nationality
        )

    const statistic = statistics[0]

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
                                    value={player.height ?? '-'}
                                    type="Height"
                                />

                                <CardItem
                                    value={`${player.age} years` ?? '-'}
                                    type={
                                        moment(player.birth.date).format(
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
                                            {player.nationality
                                                .substring(0, 3)
                                                .toUpperCase()}
                                        </Text>
                                    </View>
                                </CardItem>
                            </View>
                        </Card>

                        <Card>
                            <View className="flex-row items-center space-x-2">
                                <Image
                                    className="h-4 w-4"
                                    source={statistic!.league.logo}
                                    contentFit="contain"
                                    transition={500}
                                />

                                <Text className="text-[17px] font-bold dark:text-white">
                                    {statistic!.league.name}{' '}
                                    {statistic!.league.season}/
                                    {statistic!.league.season + 1}
                                </Text>
                            </View>

                            <View className="flex-row">
                                <CardItem
                                    value={statistic!.games.appearences ?? 0}
                                    type="Matches"
                                />

                                <CardItem
                                    value={statistic!.goals.total ?? 0}
                                    type="Goals"
                                />

                                <CardItem
                                    value={statistic!.goals.assists ?? 0}
                                    type="Assists"
                                />

                                <CardItem type="Rating">
                                    <View
                                        className={clsx('rounded px-[5px]', {
                                            'bg-[#32C771]':
                                                Number(
                                                    Number(
                                                        statistic!.games.rating
                                                    ).toFixed(2)
                                                ) >= 7,
                                            'bg-[#F08022]':
                                                Number(
                                                    Number(
                                                        statistic!.games.rating
                                                    ).toFixed(2)
                                                ) >= 5 &&
                                                Number(
                                                    Number(
                                                        statistic!.games.rating
                                                    ).toFixed(2)
                                                ) < 7,
                                            'bg-[#E55E5B]':
                                                Number(
                                                    Number(
                                                        statistic!.games.rating
                                                    ).toFixed(2)
                                                ) < 5,
                                        })}
                                    >
                                        <Text className="text-lg text-white">
                                            {Number(
                                                statistic!.games.rating
                                            ).toFixed(2) ?? 0}
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
