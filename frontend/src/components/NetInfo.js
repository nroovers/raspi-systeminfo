import React from 'react'
import { useState, useEffect } from 'react'
import infoService from '../services/infoService'
// import Chart from "react-google-charts";

const NetInfo = (props) => {
    const [info, setInfo] = useState({ network: [], wifi: [] });

    useEffect(() => {
        console.log('NetInfo useeffect Load')
        let netInfoMounted = true
        infoService.getInfo(['network', 'wifi'])
            .then(data => {
                console.log('NetInfo set data', data)
                if (netInfoMounted) {
                    setInfo({
                        network: data.network,
                        wifi: data.wifi,
                    })
                }
            })
        return () => netInfoMounted = false
    }, []);

    return (
        <div>
            <h2>Network</h2>
            <table>
                <thead>
                    <tr>
                        <th>iface</th>
                        <th>ip4</th>
                        <th>ip4subnet</th>
                        <th>type</th>
                        <th>dhcp</th>
                    </tr>
                </thead>
                <tbody>
                    {info.network.map(netw => {
                        return (
                            <tr key={netw.iface}>
                                <td>{netw.iface}</td>
                                <td>{netw.ip4}</td>
                                <td>{netw.ip4subnet}</td>
                                <td>{netw.type}</td>
                                <td>{netw.dhcp}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h2>WiFi</h2>
            <table>
                <thead>
                    <tr>
                        <th>ssid</th>
                        <th>channel</th>
                        <th>security</th>
                    </tr>
                </thead>
                <tbody>
                    {info.wifi.map(wifi => {
                        return (
                            <tr key={wifi.ssid}>
                                <td>{wifi.ssid}</td>
                                <td>{wifi.channel}</td>
                                <td>{wifi.security.join()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default NetInfo 