import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function IconVerifiedDriver(props) {
    return (
        <Svg
            width={20}
            height={19}
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M8 9c2.525 0 4.571-2.014 4.571-4.5S10.525 0 8 0 3.429 2.014 3.429 4.5 5.475 9 8 9zm3.2 1.125h-.596a6.307 6.307 0 01-5.208 0H4.8c-2.65 0-4.8 2.116-4.8 4.725v1.463C0 17.244.768 18 1.714 18h12.572c.946 0 1.714-.756 1.714-1.688V14.85c0-2.609-2.15-4.725-4.8-4.725z"
                fill="#34A853"
            />
            <Circle cx={15} cy={14} r={5} fill="#fff" />
            <Path
                d="M13.717 16.902l-2.6-2.18a.298.298 0 010-.473l.566-.475c.156-.13.41-.13.566 0L14 15.242l3.752-3.144c.156-.13.409-.13.565 0l.566.474a.298.298 0 010 .474l-4.6 3.856a.456.456 0 01-.566 0z"
                fill="#34A853"
            />
        </Svg>
    )
}

export default IconVerifiedDriver
