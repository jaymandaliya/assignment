import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconCall(props) {
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
                d="M21.373 15.546l-4.813-2.063a1.032 1.032 0 00-1.203.297l-2.131 2.604A15.927 15.927 0 015.612 8.77L8.216 6.64a1.029 1.029 0 00.296-1.203L6.45.623A1.038 1.038 0 005.268.026L.8 1.057A1.031 1.031 0 000 2.062C0 13.084 8.933 22 19.938 22a1.031 1.031 0 001.005-.8l1.032-4.468a1.044 1.044 0 00-.602-1.186z"
                fill="#000"
            />
        </Svg>
    )
}

export default IconCall
