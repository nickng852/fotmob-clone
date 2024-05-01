import { Image } from 'expo-image'
import { Href, Link } from 'expo-router'
import _ from 'lodash'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { useQuery } from '@tanstack/react-query'

import Card from '@/app/fixture/components/(stats)/card'
import { fetchCoachByTeamId } from '@/lib/api/coachs'
import { fetchCountries } from '@/lib/api/countries'
import { fetchSquad } from '@/lib/api/squads'
import { Career, Coach } from '@/lib/types/coach'
import { Country } from '@/lib/types/country'
import { Squad } from '@/lib/types/squad'

function getPlayerPositionTranslation(position: string) {
    switch (position) {
        case 'Goalkeeper':
            return 'Keepers'
        case 'Defender':
            return 'Defenders'
        case 'Midfielder':
            return 'Midfielders'
        case 'Attacker':
            return 'Forwards'
    }
}

type Path = string

function SquadRow({
    path,
    photo,
    name,
    nationality,
    children,
}: {
    path: Path
    photo: string
    name: string
    nationality?: string
    children?: React.ReactNode
}) {
    return (
        <Link href={path as Href<Path>} asChild>
            <TouchableOpacity>
                <View className="flex-row items-center space-x-[14px]">
                    <Image
                        className="h-[34px] w-[34px] rounded-full border-[1px] border-gray-100 dark:border-0"
                        source={photo}
                        contentFit="cover"
                        transition={500}
                    />

                    <View>
                        <Text className="text-lg dark:text-white">{name}</Text>

                        {nationality && (
                            <View className="flex-row items-center space-x-2">
                                {children}

                                <Text className="text-sm font-medium text-[#9F9F9F]">
                                    {nationality}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default function SquadTab({ teamId }: { teamId: string }) {
    const {
        isPending: countriesPending,
        isSuccess: countriesSuccess,
        data: countriesData,
    } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
    })

    const {
        isPending: coachPending,
        isSuccess: coachSuccess,
        data: coachData,
    } = useQuery({
        queryKey: ['coach', teamId],
        queryFn: () => fetchCoachByTeamId(teamId),
    })

    const {
        isPending: squadPending,
        isSuccess: squadSuccess,
        data: squadData,
    } = useQuery({
        queryKey: ['squad', teamId],
        queryFn: () => fetchSquad(teamId),
    })

    const isPending = coachPending || squadPending
    const isSuccess = coachSuccess && squadSuccess

    const coach = coachData?.response.find((coach: Coach) =>
        coach.career.find(
            (career: Career) =>
                career.team.id === Number(teamId) && career.end === null
        )
    )

    const country =
        coach &&
        countriesSuccess &&
        countriesData.response.find(
            (country: Country) => country.name === coach.nationality
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
                            <View style={{ gap: 28 }}>
                                <Text className="text-[17px] font-bold dark:text-white">
                                    Coach
                                </Text>

                                <SquadRow
                                    path={`/coach/${coach.id.toString()}`}
                                    photo={coach.photo}
                                    name={coach.name}
                                    nationality={coach.nationality}
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
                                                height={12}
                                                width={12}
                                            />
                                        </MotiView>
                                    ) : (
                                        <>
                                            {country && (
                                                <Image
                                                    className="h-3 w-3 rounded-full"
                                                    source={country.flag}
                                                    contentFit="cover"
                                                />
                                            )}
                                        </>
                                    )}
                                </SquadRow>
                            </View>
                        </Card>

                        {squadData.response.map((squad: Squad) => {
                            const playersGroupedByPosition = _.groupBy(
                                squad.players,
                                'position'
                            )

                            return (
                                <View key={squad.team.id} style={{ gap: 12 }}>
                                    {_.keys(playersGroupedByPosition).map(
                                        (positionKey: string) => {
                                            return (
                                                <Card key={positionKey}>
                                                    <View style={{ gap: 28 }}>
                                                        <Text className="text-[17px] font-bold dark:text-white">
                                                            {getPlayerPositionTranslation(
                                                                positionKey
                                                            )}
                                                        </Text>

                                                        {playersGroupedByPosition[
                                                            positionKey
                                                        ].map((player) => {
                                                            return (
                                                                <SquadRow
                                                                    key={
                                                                        player.id
                                                                    }
                                                                    path={`/player/${player.id.toString()}`}
                                                                    photo={
                                                                        player.photo
                                                                    }
                                                                    name={
                                                                        player.name
                                                                    }
                                                                />
                                                            )
                                                        })}
                                                    </View>
                                                </Card>
                                            )
                                        }
                                    )}
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            )}
        </>
    )
}
