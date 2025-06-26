import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconMinus(props) {
  return (
    <Svg
      width={16}
      height={2}
      viewBox="0 0 16 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 1h14"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconMinus
