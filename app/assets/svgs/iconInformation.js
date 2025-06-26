import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconInformation(props) {
    return (
        <Svg
            width={14}
            height={15}
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M7 .347c-3.866 0-7 3.14-7 7.013 0 3.872 3.134 7.012 7 7.012s7-3.14 7-7.012C14 3.487 10.866.347 7 .347zm.5 10.394a.126.126 0 01-.125.125h-.75a.126.126 0 01-.125-.125V6.483c0-.069.056-.125.125-.125h.75c.069 0 .125.056.125.125v4.258zM7 5.356a.75.75 0 01-.735-.751A.752.752 0 017 3.854a.75.75 0 01.735.75.752.752 0 01-.735.752z"
                fill="#B5B5B5"
            />
        </Svg>
    )
}

export default IconInformation
