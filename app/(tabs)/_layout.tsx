import { Tabs } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name']
    color: string
}) {
    return <FontAwesome size={26} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
    const { colorScheme } = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor:
                        colorScheme === 'light' ? '#FFFFFF' : '#0A0A0A',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
                tabBarActiveTintColor:
                    colorScheme === 'light' ? '#000000' : '#61DF6E',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Matches',
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="football"
                            size={24}
                            style={{ marginBottom: -3 }}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="news"
                options={{
                    title: 'News',
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="newspaper"
                            size={24}
                            style={{ marginBottom: -3 }}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="leagues"
                options={{
                    title: 'Leagues',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="trophy" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="following"
                options={{
                    title: 'Following',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="star" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="more"
                options={{
                    title: 'More',
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="menu"
                            size={28}
                            style={{ marginBottom: -3 }}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}
