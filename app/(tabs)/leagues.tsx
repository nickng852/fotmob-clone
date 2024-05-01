import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { SafeAreaView, ScrollView, View, Text } from 'react-native'

import { popularLeagues } from '@/assets/data/popularLeagues'
import League from '@/components/leagues/league'
import SearchBar from '@/components/leagues/search-bar'
import SeactionHeaderWithAction from '@/components/section-header-with-action'

export default function LeaguesScreen() {
    const { colorScheme } = useColorScheme()

    return (
        <SafeAreaView className="bg-white dark:bg-[#1A1A1A]">
            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

            <View className="bg-[#F6F6F6] dark:bg-black">
                <View
                    style={{ gap: 10 }}
                    className="border-b-[0.17px] border-[#ABABAB] bg-white px-4 pb-4 pt-12 dark:border-[#262626] dark:bg-[#1A1A1A]"
                >
                    <Text className="text-4xl font-semibold dark:text-white">
                        Leagues
                    </Text>

                    <SearchBar />
                </View>

                <ScrollView className="h-full space-y-10 p-4">
                    <SeactionHeaderWithAction title="Following" action="Edit" />

                    <View className="space-y-4">
                        <Text className="text-xl font-extrabold dark:text-white">
                            All competitions
                        </Text>

                        <View style={{ gap: 10 }}>
                            {popularLeagues.map((league) => {
                                return <League key={league.id} item={league} />
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
