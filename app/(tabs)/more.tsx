import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { SafeAreaView, ScrollView, View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import Button from '@/components/more/button'

export default function MoreScreen() {
    const { colorScheme } = useColorScheme()

    return (
        <SafeAreaView className="bg-white dark:bg-[#1A1A1A]">
            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

            <View className="bg-[#F6F6F6] dark:bg-black">
                <View className="border-b-[0.17px] border-[#ABABAB] bg-white px-4 pb-4 pt-12 dark:border-[#262626] dark:bg-[#1A1A1A]">
                    <Text className="text-4xl font-semibold dark:text-white">
                        More
                    </Text>
                </View>

                <ScrollView className="h-full p-4">
                    <Button
                        icon={
                            <FontAwesome
                                name="gear"
                                size={16}
                                color="#FFFFFF"
                            />
                        }
                        title="Settings"
                        onPress={() => router.push('/settings')}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
