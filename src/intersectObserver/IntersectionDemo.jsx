import React from 'react'
import v1 from "./cars.mp4"
import v2 from "./ducks.mp4"
import v3 from "./some.mp4"
import "./inter.css"
function IntersectionDemo() {
    return (
        <div>
            <div className="video-container">
                <Video src={v1}
                    id="a">
                    
                </Video>
            </div>
            <div className="video-container">
                <Video  src={v2}
                    id="b">
                </Video>
                {/* <video src={v2}></video> */}
            </div>
            <div className="video-container">
                <Video src={v3}
                    id="c">
                    
                </Video>
            </div>
        </div>
    )
}

function Video(props) {
    return (
        <video className="video-styles" controls muted="true" id={props.id}>
            <source src={props.src}
            //    type="video.mp4" 
            >
            </source>
        </video>
    )
}

export default IntersectionDemo
