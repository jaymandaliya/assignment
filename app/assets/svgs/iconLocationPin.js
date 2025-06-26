import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconLocationPin(props) {
    return (
        <Svg
            width={22}
            height={28}
            viewBox="0 0 22 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.153.715c-6.132 2.338-8.987 10.29-5.897 16.42.436.864 2.819 3.662 5.296 6.218L11.054 28l4.883-5.283c5.63-6.09 6.843-9.057 5.641-13.798C19.835 2.04 13.35-1.648 7.153.715zm5.585 9.287c1.569 1.983-.735 5.03-2.78 3.678-.569-.375-1.122-1.154-1.23-1.73-.44-2.348 2.547-3.798 4.01-1.948z"
                fill="#000"
            />
        </Svg>
    )
}

export default IconLocationPin
