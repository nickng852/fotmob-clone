import clsx from 'clsx'
import { View, Text } from 'react-native'

import Badge from '@/app/fixture/components/(lineup)/badge'

interface Props {
    type: 'in' | 'out'
    value: number
    isGoalkeeper: boolean
}

export default function SubstitutionBadge({
    type,
    value,
    isGoalkeeper,
}: Props) {
    return (
        <View
            className={clsx('absolute items-center', {
                '-left-[22px] -top-[2.5px] flex-row':
                    type === 'in' || (type === 'out' && isGoalkeeper),
                '-left-1 -top-[15px] justify-center':
                    type === 'out' && !isGoalkeeper,
            })}
        >
            <Text
                className={clsx({
                    'text-xs font-medium text-[#15985F]': type === 'in',
                    'text-center text-xs font-medium text-white':
                        type === 'out',
                })}
            >
                {value}'{' '}
            </Text>

            <Badge type="substitution" subType={type} />
        </View>
    )
}
