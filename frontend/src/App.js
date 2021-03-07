import './App.css'
import { useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { Container } from "react-bootstrap"

import Header from './components/Header'
import Overview from './components/Overview'
import CpuInfo from './components/CpuInfo'
import MemInfo from './components/MemInfo'
import ProcInfo from './components/ProcInfo'
import NetInfo from './components/NetInfo'
import Notification from './components/Notification'
import Loading from './components/Loading'

import appStateUtils from './utils/appStateUtils'
import infoService from './services/infoService'

function App() {

    const [appState, setAppState] = useState(appStateUtils.initialState)

    infoService.setNode(appStateUtils.getSelectedNode(appState))

    return (
        <Router>
            <Container>
                <Header appState={appState} setAppState={setAppState}></Header>
            </Container>
            <Container>
                <Notification appState={appState} setAppState={setAppState}></Notification>
                <Loading appState={appState} setAppState={setAppState}></Loading>
                <Switch>
                    <Route exact path="/">
                        <Overview appState={appState} setAppState={setAppState} />
                    </Route>
                    <Route path="/cpu">
                        <CpuInfo appState={appState} setAppState={setAppState} />
                    </Route>
                    <Route path="/mem">
                        <MemInfo appState={appState} setAppState={setAppState} />
                    </Route>
                    <Route path="/proc">
                        <ProcInfo appState={appState} setAppState={setAppState} />
                    </Route>
                    <Route path="/net">
                        <NetInfo appState={appState} setAppState={setAppState} />
                    </Route>

                    {/*  TODO -> check if this works
                        <Route path="/*">
                            404 Page not found
                        </Route> */}
                </Switch>
            </Container>
        </Router>
    );
}

export default App;