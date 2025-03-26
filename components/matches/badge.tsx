import clsx from 'clsx'
import { View, Text } from 'react-native'

interface Props {
    type: 'text' | 'number'
    value: string | number
}

export default function Badge({ type, value }: Props) {
    return (
        <View
            className={clsx(
                'items-center justify-center rounded-full px-[5.5px] py-[1.25px]',
                {
                    'bg-[#F5F5F7] dark:bg-[#262626]': type === 'text',
                    'bg-[#02985F]': type === 'number' || value === 'HT',
                }
            )}
        >
            <Text
                className={clsx('text-xs font-bold', {
                    'text-[#ACACAC] dark:text-[#9F9F9F]': type === 'text',
                    'text-white': type === 'number' || value === 'HT',
                })}
            >
                {value}
            </Text>
        </View>
    )
}
