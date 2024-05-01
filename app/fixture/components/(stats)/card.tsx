import { View } from 'react-native'

export default function Card({ children }: { children: React.ReactNode }) {
    return (
        <View className="space-y-[24px] rounded-xl bg-white p-4 shadow-lg dark:bg-[#1D1D1D]">
            {children}
        </View>
    )
}
