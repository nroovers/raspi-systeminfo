import React from 'react'
import { Spinner } from "react-bootstrap"
import appStateUtils from '../utils/appStateUtils'

const Loading = (props) => {

    return (
        appStateUtils.isLoading(props.appState)
            ? <div className='text-center'>
                <Spinner animation="border" role="status"></Spinner>
                <p>Loading...</p>
            </div>
            : null
    )
}

export default Loading 