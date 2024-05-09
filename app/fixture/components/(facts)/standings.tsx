import clsx from 'clsx'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import _ from 'lodash'
import { useColorScheme } from 'nativewind'
import { View, Text, TouchableOpacity } from 'react-native'
import { Table, Row } from 'react-native-table-component'

import { Club, Standing } from '@/lib/types/standing'

interface Props {
    homeTeamId?: number
    awayTeamId?: number
    standingsData: Standing
    isFiltered?: boolean
}

export default function Standings({
    homeTeamId,
    awayTeamId,
    standingsData,
    isFiltered,
}: Props) {
    const { colorScheme } = useColorScheme()

    const dimension = [5, 0.75, 0.75, 0.75, 0.75, 1.5, 1, 1]

    const tableHeadArr = ['Team', 'PL', 'W', 'D', 'L', '+/-', 'GD', 'PTS']

    const tableHead = tableHeadArr.map((item: string, index: number) => {
        return (
            <Text
                key={index}
                className={clsx('font-semibold uppercase dark:text-white', {
                    'px-1': item === 'Team',
                    'text-center': item !== 'Team',
                })}
            >
                {item}
            </Text>
        )
    })

    const { league } = standingsData

    return (
        <View
            className={clsx({
                'rounded-xl bg-white shadow-lg dark:bg-[#1D1D1D]': isFiltered,
            })}
        >
            {isFiltered && (
                <View className="flex-row items-center space-x-4 p-[14px]">
                    <Image
                        className="h-4 w-4"
                        source={league.logo}
                        contentFit="contain"
                        transition={500}
                    />

                    <Text className="flex-1 text-base font-bold dark:text-white">
                        {league.name}
                    </Text>
                </View>
            )}

            <View className="space-y-8">
                {league.standings.map((standing: Club[]) => {
                    const clubs = isFiltered
                        ? standing.filter(
                              (club: Club) =>
                                  club.team.id === homeTeamId ||
                                  club.team.id === awayTeamId
                          )
                        : standing

                    return (
                        <View>
                            {league.standings.length > 1 && (
                                <View className="flex-row items-center space-x-4 p-[14px]">
                                    <Image
                                        className="h-4 w-4"
                                        source={league.logo}
                                        contentFit="contain"
                                        transition={500}
                                    />

                                    <Text className="flex-1 text-base font-bold dark:text-white">
                                        {standing[0].group}
                                    </Text>
                                </View>
                            )}

                            <View
                                className={clsx('bg-white dark:bg-[#1D1D1D]', {
                                    'rounded-b-xl': isFiltered,
                                    'rounded-xl shadow-lg': !isFiltered,
                                })}
                            >
                                <Table>
                                    <Row
                                        style={{
                                            padding: 10,
                                            borderBottomWidth: !isFiltered
                                                ? 0.25
                                                : 0,
                                            borderBottomColor:
                                                colorScheme === 'light'
                                                    ? '#F0F0F0'
                                                    : '#000000',
                                        }}
                                        data={tableHead}
                                        flexArr={dimension}
                                    />

                                    {clubs.map((club: Club, index: number) => {
                                        const data = [
                                            <View className="flex-row items-center space-x-2">
                                                <Text className="basis-5 text-center text-base font-semibold dark:text-white">
                                                    {club.rank}
                                                </Text>

                                                <Image
                                                    className="h-[22px] w-[22px]"
                                                    source={club.team.logo}
                                                    contentFit="contain"
                                                    transition={500}
                                                />

                                                <Text
                                                    className="flex-1 text-[17px] dark:text-white"
                                                    adjustsFontSizeToFit
                                                    numberOfLines={1}
                                                >
                                                    {club.team.name}
                                                </Text>
                                            </View>,
                                            <Text className="text-center dark:text-white">
                                                {club.all.played}
                                            </Text>,
                                            <Text className="text-center dark:text-white">
                                                {club.all.win}
                                            </Text>,
                                            <Text className="text-center dark:text-white">
                                                {club.all.draw}
                                            </Text>,
                                            <Text className="text-center dark:text-white">
                                                {club.all.lose}
                                            </Text>,
                                            <Text className="text-center dark:text-white">
                                                {club.all.goals.for}-
                                                {club.all.goals.against}
                                            </Text>,
                                            <Text className="text-center dark:text-white">
                                                {club.goalsDiff >= 1 ? (
                                                    <>+{club.goalsDiff}</>
                                                ) : (
                                                    club.goalsDiff
                                                )}
                                            </Text>,
                                            <Text className="text-center dark:text-white">
                                                {club.points}
                                            </Text>,
                                        ]

                                        return (
                                            <Link
                                                key={club.team.id}
                                                href={`/team/${club.team.id.toString()}`}
                                                asChild
                                            >
                                                <TouchableOpacity>
                                                    <Row
                                                        style={{
                                                            height: 40,
                                                            padding: 10,
                                                            backgroundColor:
                                                                !isFiltered &&
                                                                (club.team
                                                                    .id ===
                                                                    homeTeamId ||
                                                                    club.team
                                                                        .id ===
                                                                        awayTeamId)
                                                                    ? colorScheme ===
                                                                      'light'
                                                                        ? '#F0F0F0'
                                                                        : '#383838'
                                                                    : undefined,
                                                            borderBottomWidth:
                                                                index !==
                                                                clubs.length - 1
                                                                    ? 0.25
                                                                    : 0,
                                                            borderBottomColor:
                                                                colorScheme ===
                                                                'light'
                                                                    ? '#F0F0F0'
                                                                    : '#000000',
                                                        }}
                                                        data={data}
                                                        flexArr={dimension}
                                                    />
                                                </TouchableOpacity>
                                            </Link>
                                        )
                                    })}
                                </Table>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}
