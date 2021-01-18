import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import infoService from './services/infoService'

import CpuInfo from './components/CpuInfo'

axios.defaults.baseURL = process.env.BACKEND_URL || 'http://localhost:3001'

function App() {

    const [info, setInfo] = useState('')


    // const initInfo = async () => { await infoService.getInfo() }

    useEffect(() => {
        infoService.getInfo().then(info => {
            console.log('useEffect', info)
            setInfo(info)
        })
    }, []);


    console.log(info)

    return (
        <div className="App">
            <header className="App-header">
                Raspberry Pi System Info
            </header>
            {/* <div>{info.toString()}</div> */}
            <CpuInfo info={info}></CpuInfo>
        </div>
    );
}

export default App;