import clsx from 'clsx'
import { ColorSchemeSystem } from 'nativewind/dist/style-sheet/color-scheme'
import { View, Text, TouchableOpacity } from 'react-native'

interface Props {
    option: {
        title: string
        theme: string
    }
    colorScheme: ColorSchemeSystem
    onPress: (colorSchemeSystem: ColorSchemeSystem) => void
}

export default function ThemeOption({ option, colorScheme, onPress }: Props) {
    const { title, theme } = option

    return (
        <TouchableOpacity
            className="flex-row items-center space-x-6 border-b-[0.5px] border-[#F1F1F1] p-4 dark:border-[#101010]"
            onPress={() => onPress(theme as ColorSchemeSystem)}
        >
            <View
                className={clsx(
                    'h-6 w-6 items-center justify-center rounded-full border-[1.5px]',
                    {
                        'border-[#CFCFCF] dark:border-[#CCCCCC]':
                            colorScheme !== theme,
                        'border-[#00985F] dark:border-[#61DF6E]':
                            colorScheme === theme,
                    }
                )}
            >
                {colorScheme === theme && (
                    <View className="h-[14px] w-[14px] rounded-full bg-[#00985F] dark:bg-[#61DF6E]" />
                )}
            </View>

            <Text className="text-lg text-[#333333] dark:text-white">
                {title}
            </Text>
        </TouchableOpacity>
    )
}
