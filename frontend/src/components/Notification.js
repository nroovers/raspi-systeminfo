import React from 'react'
import { Alert } from "react-bootstrap"

const Notification = (props) => {

    const handleOnClose = (i) => {
        console.log('remove item at index ', i)
        console.log(props.appState.notifications)
        const notifs = props.appState.notifications.filter((n, j) => i !== j)
        console.log(notifs)
        props.setAppState({
            ...props.appState,
            notifications: notifs
        })
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