import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function IconShare(props) {
    return (
        <Svg
            width={17}
            height={17}
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G
                clipPath="url(#clip0_2_830)"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d="M3.167 8.5v5.333A1.333 1.333 0 004.5 15.167h8a1.333 1.333 0 001.333-1.334V8.5M11.167 4.5L8.5 1.833 5.833 4.5M8.5 1.833V10.5" />
            </G>
            <Defs>
                <ClipPath id="clip0_2_830">
                    <Path fill="#fff" transform="translate(.5 .5)" d="M0 0H16V16H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default IconShare
