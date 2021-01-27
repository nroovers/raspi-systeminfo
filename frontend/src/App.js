import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Overview from './components/Overview'
import CpuInfo from './components/CpuInfo'
import MemInfo from './components/MemInfo'
import ProcInfo from './components/ProcInfo'
import NetInfo from './components/NetInfo'

function App() {

    // TODO make the router work with static files
    return (
        <div className="App">
            <Router>
                <header className="App-header">
                    Raspberry Pi System Info
                </header>
                <div>
                    <Link to="/">Home</Link> | 
                    <Link to="/cpu">CPU</Link> | 
                    <Link to="/mem">Memory & Storage</Link> | 
                    <Link to="/proc">Processes</Link> | 
                    <Link to="/net">Network</Link>
                    <hr />
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
                </div>
            </Router>
        </div>
    );
}

export default App;