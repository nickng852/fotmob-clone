import { View, Text, TouchableOpacity } from 'react-native'

interface Props {
    icon: any
    title: string
    subTitle?: string
    onPress: () => void
}

export default function Button({ icon, title, subTitle, onPress }: Props) {
    return (
        <TouchableOpacity
            className="flex-row items-center space-x-4 rounded-xl bg-white p-4 dark:bg-[#1A1A1A]"
            onPress={onPress}
        >
            <View className="h-6 w-6 items-center justify-center rounded-full bg-[#333333]">
                {icon}
            </View>

            <View className="flex-1">
                <Text className="text-lg dark:text-white">{title}</Text>

                {subTitle && (
                    <Text className="text-sm text-[#858585] dark:text-[#9F9F9F]">
                        {subTitle}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )
}
