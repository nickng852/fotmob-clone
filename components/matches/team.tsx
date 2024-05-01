import clsx from 'clsx'
import { Image } from 'expo-image'
import { View, Text } from 'react-native'

interface Props {
    side: 'home' | 'away'
    teamName: string
    teamLogo: string
}

function isSingleWord(text: string) {
    return text.split(' ').length === 1
}

export default function Team({ side, teamName, teamLogo }: Props) {
    return (
        <View
            style={{ gap: 8 }}
            className={clsx('flex-1 items-center', {
                'flex-row': side === 'home',
                'flex-row-reverse': side === 'away',
            })}
        >
            <Text
                className={clsx(
                    'flex-1 text-[17px] text-[#333333] dark:text-white',
                    {
                        'text-right': side === 'home',
                        'text-left': side === 'away',
                    }
                )}
                adjustsFontSizeToFit
                numberOfLines={isSingleWord(teamName) ? 1 : 2}
            >
                {teamName}
            </Text>

            <Image
                className="h-[26px] w-[26px]"
                source={teamLogo}
                contentFit="contain"
                transition={500}
            />
        </View>
    )
}
