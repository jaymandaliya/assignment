import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconChevronRight(props) {
    return (
        <Svg
            width={13}
            height={13}
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M3.738 1.083h2.058L9.966 6.5l-4.17 5.417H3.738L7.908 6.5l-4.17-5.417z"
                fill="#000"
            />
        </Svg>
    )
}

export default IconChevronRight
