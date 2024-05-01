import { useColorScheme } from 'nativewind'
import Svg, { G, Path } from 'react-native-svg'

export default function Gantry() {
    const { colorScheme } = useColorScheme()

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="270"
            height="130"
            viewBox="0 0 316 174"
        >
            <G
                fill={colorScheme === 'light' ? '#0D9F68' : '#2C2C2C'}
                transform="translate(84.168)"
            >
                <Path
                    d="M57 0h5.907v50.136a5.92 5.92 0 0 0 5.907 5.9H192.85a5.92 5.92 0 0 0 5.907-5.9V0h5.907v50.136a11.84 11.84 0 0 1-11.813 11.8H68.813A11.84 11.84 0 0 1 57 50.136z"
                    transform="translate(-57)"
                ></Path>
            </G>
            <Path
                fill={colorScheme === 'light' ? '#0D9F68' : '#2C2C2C'}
                d="M11.813 150.407h90.813a76.778 76.778 0 0 0 110.748 0h90.813A11.839 11.839 0 0 0 316 138.61V0h-5.906v138.61a5.92 5.92 0 0 1-5.907 5.9H11.813a5.92 5.92 0 0 1-5.907-5.9V0H0v138.61a11.84 11.84 0 0 0 11.813 11.797zm193 0a70.761 70.761 0 0 1-93.619 0z"
            ></Path>
        </Svg>
    )
}
