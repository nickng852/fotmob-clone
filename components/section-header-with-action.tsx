import { View, Text, TouchableOpacity } from 'react-native'

interface Props {
    title: string
    action: string
}

export default function SeactionHeaderWithAction({ title, action }: Props) {
    return (
        <View className="flex-row items-center justify-between">
            <Text className="text-xl font-extrabold dark:text-white">
                {title}
            </Text>

            <TouchableOpacity>
                <Text className="text-xl text-[#04975F] dark:text-[#61DF6E]">
                    {action}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
