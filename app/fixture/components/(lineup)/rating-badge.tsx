import clsx from 'clsx'
import { View, Text } from 'react-native'

interface Props {
    type: string
    value: string | number
}

export default function RatingBadge({ type, value }: Props) {
    return (
        <View
            className={clsx('z-10 items-center justify-center rounded-full', {
                'px-[3.75px] py-[1.5px]': type === 'avatar',
                'px-[6.5px] py-[2.25px]': type === 'formation',
                'bg-[#32C771]': Number(value) >= 7,
                'bg-[#F08022]': Number(value) >= 5 && Number(value) < 7,
                'bg-[#E55E5B]': Number(value) < 5,
            })}
        >
            <Text
                className={clsx('text-white', {
                    'text-[13px] font-medium': type === 'avatar',
                    'text-[15px] font-semibold': type === 'formation',
                })}
            >
                {Number(value).toFixed(1)}
            </Text>
        </View>
    )
}
