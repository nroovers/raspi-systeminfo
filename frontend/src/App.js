import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import infoService from './services/infoService'

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

axios.defaults.baseURL = process.env.BACKEND_URL || 'http://localhost:3001'

function App() {

    // const [info, setInfo] = useState('')


    // const initInfo = async () => { await infoService.getInfo() }

    // useEffect(() => {
    //     infoService.getInfo().then(info => {
    //         console.log('useEffect', info)
    //         setInfo(info)
    //     })
    // }, []);


    // console.log(info)

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
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;