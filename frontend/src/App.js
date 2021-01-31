import './App.css';

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

function App() {

    return (
        <Container>
            <Router>
                <Header></Header>
                <Switch>
                    <Route exact path="/">
                        <Overview />
                    </Route>
                    <Route path="/cpu">
                        <CpuInfo />
                    </Route>
                    <Route path="/mem">
                        <MemInfo />
                    </Route>
                    <Route path="/proc">
                        <ProcInfo />
                    </Route>
                    <Route path="/net">
                        <NetInfo />
                    </Route>

                    {/*  TODO -> check if this works
                        <Route path="/*">
                            404 Page not found
                        </Route> */}
                </Switch>
            </Router>
        </Container>
    );
}

export default App;