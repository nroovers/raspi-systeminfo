import React from 'react'
import { useState, useEffect } from 'react'
import infoService from '../services/infoService'
// import Chart from "react-google-charts";
import appStateUtils from '../utils/appStateUtils'

const Overview = (props) => {
    const [info, setInfo] = useState({ os: {}, network: [] });

    useEffect(() => {
        appStateUtils.setLoading(props.appState, props.setAppState, true)
    }, [])

    useEffect(() => {
        console.log('useeffect Load')
        let memInfoMounted = true
        infoService.getInfo(['os', 'network'])
            .then(data => {
                console.log('set data', data)
                if (memInfoMounted)
                    setInfo({
                        os: data.os,
                        network: data.network,
                    })
                appStateUtils.setLoading(props.appState, props.setAppState, false)
            })
            .catch(err => {
                appStateUtils.addNotification(
                    props.appState,
                    props.setAppState,
                    { title: 'Error', body: <><p>Retrieving system data failed</p><p>{err.message}</p></>, type: 'danger' })
                appStateUtils.setLoading(props.appState, props.setAppState, false)
            })
        return () => memInfoMounted = false
    }, []);

    return (
        <div>
            {/* <h2>Overview</h2> */}

            <h2>Operating System</h2>

            <p>Platform: {info.os.platform}</p>
            <p>Distro: {info.os.distro}</p>
            <p>Release: {info.os.release}</p>
            <p>Hostname: {info.os.hostname}</p>
            <p>Arch: {info.os.arch}</p>
            <p></p>

            <h2>Network</h2>

            <p>Fixed IP: {info.network.find(net => net.type === "wired" && !net.virtual)?.ip4}</p>
            <p>Wifi IP: {info.network.find(net => net.type === "wireless" && !net.virtual)?.ip4}</p>

        </div>
    )
}

export default Overview 