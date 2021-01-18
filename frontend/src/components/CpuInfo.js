import React from 'react'


const CpuInfo = (props) => {
    console.log('CpuInfo', props)
    return (
        <div>
            <div>Temperature: {props.info?.cpuTemp?.main} </div>
            <div>Speed: {props.info?.cpuSpeed?.avg}</div>
        </div>
    )
}

export default CpuInfo 