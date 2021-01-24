import React from 'react'
import { useState, useEffect } from 'react'
import infoService from '../services/infoService'
import Chart from "react-google-charts";

const MemInfo = (props) => {
    const [memData, setMemData] = useState({});
    const [diskData, setDiskData] = useState([]);
    const [fsSizeData, setFsSizeData] = useState([]);


    useEffect(() => {
        console.log('useeffect Load')
        infoService.getInfo(['mem', 'disk', 'fsSize'])
            .then(data => {
                console.log('set data', data)
                setMemData(data.mem)
                setDiskData(data.disk)
                setFsSizeData(data.fsSize)
            })
    }, []);


    const toGB = (bytes) => (bytes / (1024 * 1024 * 1024)).toFixed(1)

    return (
        <div>
            <h2>Memory</h2>
            <p>Total: {(memData.total / (1024 * 1024 * 1024)).toFixed(1)} GB</p>
            <p>Used: {(memData.used / (1024 * 1024 * 1024)).toFixed(1)} GB</p>
            <p>Free: {(memData.free / (1024 * 1024 * 1024)).toFixed(1)} GB</p>
            <h2>Storage</h2>
            {diskData.map(disk => {
                return (
                    <div key={disk.device + disk.name}>
                        <p>Device: {disk.device}</p>
                        <p>Name: {disk.name}</p>
                        <p>Type: {disk.type}</p>
                        <p>Size: {toGB(disk.size)} GB</p>
                    </div>
                )
            })}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Size (GB)</th>
                        <th>Free (GB)</th>
                        <th>Used (GB)</th>
                        <th>Used (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {fsSizeData.map(fsSize => {
                        return (
                            <tr key={fsSize.fs}>
                                <td>{fsSize.fs}</td>
                                <td>{fsSize.type}</td>
                                <td>{toGB(fsSize.size)}</td>
                                <td>{toGB(fsSize.size - fsSize.used)}</td>
                                <td>{toGB(fsSize.used)}</td>
                                <td>{(fsSize.use).toFixed(1)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default MemInfo 