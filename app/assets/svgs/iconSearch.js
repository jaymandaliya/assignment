import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconSearch(props) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M20.833 19l-3.666-3.667c.916-1.333 1.5-2.916 1.5-4.666 0-4.334-3.584-7.917-7.917-7.917s-7.917 3.583-7.917 7.917c0 4.333 3.584 7.916 7.917 7.916 1.75 0 3.333-.583 4.667-1.5l3.666 3.667 1.75-1.75zm-15.5-8.25c0-3 2.417-5.417 5.417-5.417s5.417 2.417 5.417 5.417-2.417 5.417-5.417 5.417-5.417-2.417-5.417-5.417z"
                fill="#6B6B6B"
            />
        </Svg>
    )
}

export default IconSearch
