import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { TouchableOpacity, Text } from 'react-native'

interface Props {
    id: number
    name: string
    logo: string | number
}

export default function League({ item }: { item: Props }) {
    const { id, name, logo } = item

    return (
        <Link href={`/league/${id}`} asChild>
            <TouchableOpacity className="flex-row items-center space-x-4 rounded-xl bg-white p-4 dark:bg-[#1D1D1D]">
                <Image
                    className="h-6 w-6"
                    source={logo}
                    contentFit="cover"
                    transition={500}
                />

                <Text className="flex-1 text-lg dark:text-white">{name}</Text>
            </TouchableOpacity>
        </Link>
    )
}
