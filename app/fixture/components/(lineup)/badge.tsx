import clsx from 'clsx'
import { View } from 'react-native'
import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons'

interface Props {
    index?: number
    type: string
    subType?: string
    color?: string
}

export default function Badge({ index, type, subType, color }: Props) {
    return (
        <View
            className={clsx(
                'h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm',
                {
                    '-ml-[24px]': type === 'assist',
                    '-ml-[8px]': type === 'goal' && index !== 0,
                }
            )}
        >
            {type === 'goal' && (
                <Ionicons
                    name="football-outline"
                    size={15}
                    color={subType === 'Own Goal' ? '#EF4444' : '#000000'}
                />
            )}

            {type === 'assist' && (
                <MaterialCommunityIcons
                    name="shoe-sneaker"
                    size={14}
                    color="black"
                />
            )}

            {type === 'card' && (
                <View
                    className={clsx('h-[11.5px] w-[8.5px] rounded-sm', {
                        'bg-yellowcard': color === 'yellow',
                        'bg-redcard': color === 'red',
                    })}
                />
            )}

            {type === 'substitution' && (
                <View
                    className={clsx(
                        'h-full w-full items-center justify-center rounded-full border-2 border-white',
                        {
                            'bg-[#00985F]': subType === 'in',
                            'bg-[#E55E5B]': subType === 'out',
                        }
                    )}
                >
                    <FontAwesome5
                        name={subType === 'in' ? 'arrow-right' : 'arrow-left'}
                        size={8}
                        color="white"
                    />
                </View>
            )}

            {type === 'injury' && (
                <FontAwesome5 name="plus" size={10} color="#E55E5B" />
            )}
        </View>
    )
}
