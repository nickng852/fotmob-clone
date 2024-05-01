import { View, Text } from 'react-native'

interface Props {
    title: string
    children: React.ReactNode
}

export default function Card({ title, children }: Props) {
    return (
        <View className="space-y-6 rounded-xl bg-white p-4 shadow-lg dark:bg-[#1D1D1D]">
            <Text className="text-[17px] font-bold text-[#333333] dark:text-white">
                {title}
            </Text>

            {children}
        </View>
    )
}
