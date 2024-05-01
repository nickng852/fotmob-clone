import { useColorScheme } from 'nativewind'
import { View, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function SearchBar() {
    const { colorScheme } = useColorScheme()

    return (
        <View className="flex-row items-center space-x-1 rounded-full bg-[#EEEEEF] p-2 dark:bg-[#303032]">
            <Feather
                name="search"
                size={16}
                color={colorScheme === 'light' ? '#989898' : '#D6E7D5'}
            />

            <TextInput
                className="flex-1"
                placeholder="Find leagues"
                placeholderTextColor={
                    colorScheme === 'light' ? '#989898' : '#D6E7D5'
                }
            />
        </View>
    )
}
