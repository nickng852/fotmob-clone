import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { Stack, router } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useColorScheme } from 'nativewind'
import { View, Text, TouchableOpacity } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-gesture-handler'
import 'react-native-reanimated'
import { useReactQueryDevTools } from '@dev-plugins/react-query'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    })

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error
    }, [error])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return <RootLayoutNav />
}

const queryClient = new QueryClient()

function RootLayoutNav() {
    useReactQueryDevTools(queryClient)

    const { colorScheme } = useColorScheme()

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <ThemeProvider
                        value={
                            colorScheme === 'dark' ? DarkTheme : DefaultTheme
                        }
                    >
                        <Stack>
                            <Stack.Screen
                                name="(tabs)"
                                options={{
                                    headerShown: false,
                                }}
                            />

                            <Stack.Screen
                                name="fixture/[id]"
                                options={{
                                    headerStyle: {
                                        backgroundColor:
                                            colorScheme === 'light'
                                                ? '#FFFFFF'
                                                : '#1A1A1A',
                                    },
                                    headerLeft: () => (
                                        <TouchableOpacity
                                            className="-ml-4 p-2"
                                            onPress={router.back}
                                        >
                                            <Ionicons
                                                name="chevron-back-outline"
                                                size={28}
                                                color={
                                                    colorScheme === 'light'
                                                        ? '#000000'
                                                        : '#FFFFFF'
                                                }
                                            />
                                        </TouchableOpacity>
                                    ),
                                    headerShadowVisible: false,
                                }}
                            />

                            <Stack.Screen
                                name="league/[id]"
                                options={{
                                    headerStyle: {
                                        backgroundColor:
                                            colorScheme === 'light'
                                                ? '#9CA3AF'
                                                : '#1A1A1A',
                                    },
                                    headerLeft: () => (
                                        <TouchableOpacity
                                            className="-ml-4 p-2"
                                            onPress={router.back}
                                        >
                                            <Ionicons
                                                name="chevron-back-outline"
                                                size={28}
                                                color="#FFFFFF"
                                            />
                                        </TouchableOpacity>
                                    ),
                                    headerShadowVisible: false,
                                }}
                            />

                            <Stack.Screen
                                name="team/[id]"
                                options={{
                                    headerStyle: {
                                        backgroundColor:
                                            colorScheme === 'light'
                                                ? '#9CA3AF'
                                                : '#1A1A1A',
                                    },
                                    headerLeft: () => (
                                        <TouchableOpacity
                                            className="-ml-4 p-2"
                                            onPress={router.back}
                                        >
                                            <Ionicons
                                                name="chevron-back-outline"
                                                size={28}
                                                color="#FFFFFF"
                                            />
                                        </TouchableOpacity>
                                    ),
                                    headerShadowVisible: false,
                                }}
                            />

                            <Stack.Screen
                                name="coach/[id]"
                                options={{
                                    headerStyle: {
                                        backgroundColor:
                                            colorScheme === 'light'
                                                ? '#9CA3AF'
                                                : '#1A1A1A',
                                    },
                                    headerLeft: () => (
                                        <TouchableOpacity
                                            className="-ml-4 p-2"
                                            onPress={router.back}
                                        >
                                            <View className="flex-row items-center space-x-1">
                                                <Ionicons
                                                    name="chevron-back-outline"
                                                    size={28}
                                                    color="#FFFFFF"
                                                />

                                                <Text className="text-xl text-white">
                                                    Back
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ),
                                    headerShadowVisible: false,
                                }}
                            />

                            <Stack.Screen
                                name="player/[id]"
                                options={{
                                    headerStyle: {
                                        backgroundColor:
                                            colorScheme === 'light'
                                                ? '#9CA3AF'
                                                : '#1A1A1A',
                                    },
                                    headerLeft: () => (
                                        <TouchableOpacity
                                            className="-ml-4 p-2"
                                            onPress={router.back}
                                        >
                                            <View className="flex-row items-center space-x-1">
                                                <Ionicons
                                                    name="chevron-back-outline"
                                                    size={28}
                                                    color="#FFFFFF"
                                                />

                                                <Text className="text-xl text-white">
                                                    Back
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ),
                                    headerShadowVisible: false,
                                }}
                            />

                            <Stack.Screen
                                name="settings"
                                options={{
                                    headerStyle: {
                                        backgroundColor:
                                            colorScheme === 'light'
                                                ? '#FFFFFF'
                                                : '#1A1A1A',
                                    },
                                    headerLeft: () => (
                                        <TouchableOpacity
                                            className="-ml-4 p-2"
                                            onPress={router.back}
                                        >
                                            <Ionicons
                                                name="chevron-back-outline"
                                                size={28}
                                                color={
                                                    colorScheme === 'light'
                                                        ? '#000000'
                                                        : '#FFFFFF'
                                                }
                                            />
                                        </TouchableOpacity>
                                    ),
                                    headerShadowVisible: false,
                                }}
                            />
                        </Stack>
                    </ThemeProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    )
}
