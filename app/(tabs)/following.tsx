import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { SafeAreaView, View, Text } from 'react-native'

export default function FollowingScreen() {
    const { colorScheme } = useColorScheme()

    return (
        <SafeAreaView className="bg-white dark:bg-[#1A1A1A]">
            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

            <View>
                <View className="border-b-[0.17px] border-[#ABABAB] bg-white px-4 pb-4 pt-12 dark:border-[#262626] dark:bg-[#1A1A1A]">
                    <Text className="text-4xl font-semibold dark:text-white">
                        Following
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
