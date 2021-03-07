import React from 'react'
import { Alert } from "react-bootstrap" //https://react-bootstrap.github.io/components/alerts/
import appStateUtils from '../utils/appStateUtils'

const Notification = (props) => {

    const handleOnClose = (i) => {
        appStateUtils.removeNotification(props.appState, props.setAppState, i)
    }

    return (
        <div>
            {props.appState.notifications?.map((n, i) =>
                <Alert key={i} variant={n.type} onClose={() => handleOnClose(i)} dismissible>
                    <Alert.Heading>{n.title}</Alert.Heading>
                    {n.body}
                </Alert>
            )}
        </div>
    )
}

export default Notification 