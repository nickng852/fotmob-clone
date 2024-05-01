import { useCallback, useMemo, useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'

import ThemeOption from '@/components/more/theme-option'
import { themeOptions } from '@/components/more/theme-options'

export default function MoreScreen() {
    const { colorScheme, setColorScheme } = useColorScheme()

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    // variables
    const snapPoints = useMemo(() => ['25%', '34.25%'], [])

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

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
                    <TouchableOpacity
                        className="flex-row items-center space-x-4 rounded-xl bg-white p-4 dark:bg-[#1A1A1A]"
                        onPress={handlePresentModalPress}
                    >
                        <View className="h-6 w-6 items-center justify-center rounded-full bg-[#333333] dark:bg-[#F5F5F5]">
                            <FontAwesome
                                name="gear"
                                size={16}
                                color={
                                    colorScheme === 'light'
                                        ? '#FFFFFF'
                                        : '#1D1D1D'
                                }
                            />
                        </View>

                        <Text className="flex-1 text-lg dark:text-white">
                            Settings
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                backgroundStyle={{
                    backgroundColor:
                        colorScheme === 'light' ? '#FFFFFF' : '#1D1D1D',
                }}
                handleIndicatorStyle={{
                    backgroundColor: '#BCBEC9',
                }}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                    />
                )}
            >
                <BottomSheetView style={{ flex: 1 }}>
                    <View className="space-y-3 bg-white dark:bg-[#1D1D1D]">
                        <Text className="px-4 text-lg font-extrabold text-[#333333] dark:text-white">
                            Select
                        </Text>

                        <ScrollView className="h-full border-t-[1px] border-[#F1F1F1] dark:border-[#101010]">
                            {themeOptions.map((option, index: number) => (
                                <ThemeOption
                                    key={index}
                                    option={option}
                                    colorScheme={colorScheme}
                                    onPress={setColorScheme}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </SafeAreaView>
    )
}
