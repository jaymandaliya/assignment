import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconEdit(props) {
    return (
        <Svg
            width={22}
            height={19}
            viewBox="0 0 22 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M17.556 6.866L3.626 18.268.461 14.4 14.389 2.997l3.167 3.869zM3.106 18.134L0 17.815l.438-3.092 2.668 3.411zM17.451.507a2.5 2.5 0 013.023 3.985l-1.993 1.51L15.46 2.02 17.451.507z"
                fill="#000"
            />
        </Svg>
    )
}

export default IconEdit
