import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconCloseLight(props) {
    return (
        <Svg
            width={22}
            height={22}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M20 2L2 20M2 2l18 18"
                stroke="#000"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default IconCloseLight
