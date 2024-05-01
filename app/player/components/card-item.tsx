import { View, Text } from 'react-native'

interface Props {
    children?: React.ReactNode
    value?: number | string
    type: string
}
export default function CardItem({ children, value, type }: Props) {
    return (
        <View className="flex-1 items-center justify-center space-y-[2px]">
            {type === 'Country' || type === 'Rating' ? (
                <>{children}</>
            ) : (
                <Text className="text-lg dark:text-white">{value}</Text>
            )}

            <Text className="font-medium text-[#737373] dark:text-[#9F9F9F]">
                {type}
            </Text>
        </View>
    )
}
