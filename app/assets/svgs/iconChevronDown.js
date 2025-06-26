import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconChevronDown(props) {
    return (
        <Svg
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M12.836 4.025v2.217l-5.833 4.491L1.17 6.242V4.025l5.833 4.492 5.833-4.492z"
                fill="#000"
            />
        </Svg>
    )
}

export default IconChevronDown
