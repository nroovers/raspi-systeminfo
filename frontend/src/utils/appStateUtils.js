import config from '../config/config'


// TODO replace by Redux or other state management framework?

const initialState = {
    notifications: [
        // { title: 'Error', body: <p>kdsahfkashdfkaj falkj fdakjh dfalkshd fal</p>, type: 'danger' },
        // { title: 'Titles', body: <p>kdsahfkashdfkaj falkj fdakjh dfalkshd fal</p>, type: 'primary' },
        // { title: 'Titles', body: <p>kdsahfkashdfkaj falkj fdakjh dfalkshd fal</p>, type: 'secondary' }
    ],
    loading: false,
    selectedNode: config.nodes[0]
}

const addNotification = (appState, setAppState, notification) => {
    setAppState({
        ...appState,
        notifications: appState.notifications.concat(notification)
    })
}

const removeNotification = (appState, setAppState, i) => {
    setAppState({
        ...appState,
        notifications: appState.notifications.filter((n, j) => i !== j)
    })
}

const isLoading = (appState) => {
    // console.log('laoding', appState.loading)
    return appState.loading
}

const setLoading = (appState, setAppState, loadingState) => {
    // console.log('setTaoding', loadingState)
    setAppState({
        ...appState,
        loading: loadingState
    })
}

const getSelectedNode = (appState) => {
    return appState.selectedNode
}

const setSelectedNode = (appState, setAppState, node) => {
    // console.log('setTaoding', loadingState)
    setAppState({
        ...appState,
        selectedNode: node
    })
}

const appStateUtils = {
    initialState,
    addNotification,
    removeNotification,
    isLoading,
    setLoading,
    getSelectedNode,
    setSelectedNode,
}

export default appStateUtils