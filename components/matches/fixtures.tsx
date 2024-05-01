import { useCallback, useState } from 'react'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import _ from 'lodash'
import { useColorScheme } from 'nativewind'
import { RefreshControl, View, Text, TouchableOpacity } from 'react-native'
import { Circle } from 'react-native-animated-spinkit'
import { MaterialIcons } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'

import Fixture from '@/components/matches/fixture'
import { fetchFixtures } from '@/lib/api/fixtures'
import { FixtureObj } from '@/lib/types/fixture'

const R = require('ramda')

function useUserRefresh<T>(refetch: () => Promise<T>) {
    const [refreshing, setRefreshing] = useState(false)
    const handleRefresh = useCallback(() => {
        setRefreshing(true)
        refetch().then(() => setRefreshing(false))
    }, [])
    return { refreshing, handleRefresh }
}

export default function Fixtures({ date }: { date: string }) {
    const { colorScheme } = useColorScheme()

    const { isPending, isSuccess, data, refetch } = useQuery({
        queryKey: ['fixtures', date],
        queryFn: () => fetchFixtures(date),
    })

    const { refreshing, handleRefresh } = useUserRefresh(refetch)

    const fixturesGrpByLeague =
        data &&
        R.groupBy(
            R.path(['league', 'id']),
            data.response.sort(
                (a: FixtureObj, b: FixtureObj) =>
                    a.fixture.timestamp - b.fixture.timestamp
            )
        )

    function renderItem({ item }: { item: string }) {
        return (
            <View
                key={item}
                className="rounded-xl bg-white shadow dark:bg-[#272727]"
            >
                <View className="flex-row items-center justify-between rounded-t-xl bg-[#F7F7F8] p-3 dark:bg-[#272727]">
                    <Link href={`/league/${item}`} asChild>
                        <TouchableOpacity className="h-full flex-1 flex-row items-center space-x-3">
                            <Image
                                className="h-4 w-4 rounded-full"
                                source={
                                    fixturesGrpByLeague[item][0].league.flag ??
                                    fixturesGrpByLeague[item][0].league.logo
                                }
                                contentFit="cover"
                                transition={500}
                            />

                            <Text className="font-semibold text-[#333333] dark:text-white">
                                {fixturesGrpByLeague[item][0].league.country ===
                                'World' ? (
                                    <>
                                        {
                                            fixturesGrpByLeague[item][0].league
                                                .name
                                        }{' '}
                                        -{' '}
                                        {
                                            fixturesGrpByLeague[item][0].league
                                                .round
                                        }
                                    </>
                                ) : (
                                    <>
                                        {
                                            fixturesGrpByLeague[item][0].league
                                                .country
                                        }{' '}
                                        -{' '}
                                        {
                                            fixturesGrpByLeague[item][0].league
                                                .name
                                        }
                                    </>
                                )}
                            </Text>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity className="basis-12 items-end">
                        <MaterialIcons
                            name="keyboard-arrow-up"
                            size={20}
                            color={
                                colorScheme === 'light' ? '#A7B7BF' : '#717171'
                            }
                        />
                    </TouchableOpacity>
                </View>

                {fixturesGrpByLeague[item].map(
                    (match: FixtureObj, index: number) => {
                        return (
                            <Fixture
                                key={match.fixture.id}
                                index={index}
                                totalMatches={fixturesGrpByLeague[item].length}
                                item={match}
                            />
                        )
                    }
                )}
            </View>
        )
    }

    return (
        <>
            {isPending && (
                <View className="flex-1 items-center justify-center">
                    <Circle size={24} color="#A1A1AA" />
                </View>
            )}

            {isSuccess && (
                <View style={{ flex: 1 }}>
                    <FlashList
                        data={Object.keys(fixturesGrpByLeague)}
                        keyExtractor={(item) => item}
                        renderItem={renderItem}
                        estimatedItemSize={500}
                        contentContainerStyle={{
                            padding: 8,
                        }}
                        ItemSeparatorComponent={() => (
                            <View className="h-[10px]" />
                        )}
                        ListEmptyComponent={() => (
                            <View className="p-4">
                                <Text className="text-center text-gray-400">
                                    No matches scheduled
                                </Text>
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                            />
                        }
                    />
                </View>
            )}
        </>
    )
}
