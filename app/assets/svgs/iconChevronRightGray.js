import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconChevronRightGray(props) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M6.9 2h3.8l7.7 10-7.7 10H6.9l7.7-10L6.9 2z" fill="#6B6B6B" />
        </Svg>
    )
}

export default IconChevronRightGray
