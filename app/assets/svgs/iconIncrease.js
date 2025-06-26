import * as React from "react"
import Svg, { G, Circle, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function IconIncrease(props) {
    return (
        <Svg
            width={43}
            height={43}
            viewBox="0 0 43 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G filter="url(#filter0_d_2_369)">
                <Circle cx={21.5} cy={17.5} r={17.5} fill="#fff" />
            </G>
            <Path
                d="M21.111 12.444v10.89M15.667 17.889h10.888"
                stroke="#000"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Defs></Defs>
        </Svg>
    )
}

export default IconIncrease
