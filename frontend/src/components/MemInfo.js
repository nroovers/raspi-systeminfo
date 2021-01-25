import React from 'react'
import { useState, useEffect } from 'react'
import infoService from '../services/infoService'

const MemInfo = (props) => {
    const [info, setInfo] = useState({ mem: {}, disk: [], fsSize: [] });

    useEffect(() => {
        console.log('useeffect Load')
        let memInfoMounted = true
        infoService.getInfo(['mem', 'disk', 'fsSize'])
            .then(data => {
                console.log('set data', data)
                if (memInfoMounted)
                    setInfo({
                        mem: data.mem,
                        disk: data.disk,
                        fsSize: data.fsSize,
                    })
            })
        return () => memInfoMounted = false
    }, []);


    const toGB = (bytes) => (bytes / (1024 * 1024 * 1024)).toFixed(1)

    return (
        <div>
            <h2>Memory</h2>
            <p>Total: {(info.mem.total / (1024 * 1024 * 1024)).toFixed(1)} GB</p>
            <p>Used: {(info.mem.used / (1024 * 1024 * 1024)).toFixed(1)} GB</p>
            <p>Free: {(info.mem.free / (1024 * 1024 * 1024)).toFixed(1)} GB</p>
            <h2>Storage</h2>
            <table>
                <thead>
                    <tr>
                        <th>Device</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Size (GB)</th>
                    </tr>
                </thead>
                <tbody>
                    {info.disk.map(disk => {
                        return (
                            <tr key={disk.device + disk.name}>
                                <td>{disk.device}</td>
                                <td>{disk.name}</td>
                                <td>{disk.type}</td>
                                <td>{toGB(disk.size)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
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
                    {info.fsSize.map(fsSize => {
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