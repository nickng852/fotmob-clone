import { useCallback, useMemo, useRef } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import _ from 'lodash'
import { useColorScheme } from 'nativewind'
import { ScrollView, View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'

import Button from '@/components/more/button'
import ThemeOption from '@/components/more/theme-option'
import { themeOptions } from '@/components/more/theme-options'

export default function SettingsScreen() {
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
        <>
            <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

            <Stack.Screen options={{ title: 'Settings' }} />

            <ScrollView className="h-full p-4">
                <Button
                    icon={
                        <MaterialCommunityIcons
                            name="theme-light-dark"
                            size={14}
                            color="#FFFFFF"
                        />
                    }
                    title="Theme"
                    subTitle={_.startCase(colorScheme)}
                    onPress={handlePresentModalPress}
                />
            </ScrollView>

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
        </>
    )
}
