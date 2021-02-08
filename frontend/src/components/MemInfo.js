import React from 'react'
import { useState, useEffect } from 'react'
import SortTable from "./SortTable"
import appStateUtils from '../utils/appStateUtils'

import infoService from '../services/infoService'

const MemInfo = (props) => {
    const [info, setInfo] = useState({ mem: {}, disk: [], fsSize: [] });

    useEffect(() => {
        appStateUtils.setLoading(props.appState, props.setAppState, true)
    }, [])

    useEffect(() => {
        console.log('useeffect Load')
        var memInfoMounted = true
        infoService.getInfo(['mem', 'disk', 'fsSize'])
            .then(data => {
                console.log('set data', data)
                if (memInfoMounted)
                    setInfo({
                        mem: data.mem,
                        disk: data.disk,
                        fsSize: data.fsSize,
                    })
                appStateUtils.setLoading(props.appState, props.setAppState, false)
            })
            .catch(err => {
                appStateUtils.addNotification(
                    props.appState,
                    props.setAppState,
                    { title: 'Error', body: <><p>Retrieving memory & storage data failed</p><p>{err.message}</p></>, type: 'danger' })
                appStateUtils.setLoading(props.appState, props.setAppState, false)
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
            <h2>Disks</h2>
            <SortTable
                columns={[
                    {
                        header: 'device',
                        name: 'device',
                        getValue: row => row.device
                    },
                    {
                        header: 'name',
                        name: 'name',
                        getValue: row => row.name
                    },
                    {
                        header: 'type',
                        name: 'type',
                        getValue: row => row.type
                    },
                    {
                        header: 'size',
                        name: 'size',
                        getValue: row => toGB(row.size)
                    },

                ]}
                getRowKey={(row) => row.device + row.name}
                data={info.disk}
                updateDataState={(sortedData) => {
                    setInfo({
                        ...info,
                        disk: sortedData,
                    })
                }}
            >
            </SortTable>
            <h2>File System Size</h2>
            <SortTable
                columns={[
                    {
                        header: 'name',
                        name: 'fs',
                        getValue: row => row.fs
                    },
                    {
                        header: 'type',
                        name: 'type',
                        getValue: row => row.type
                    },
                    {
                        header: 'size (GB)',
                        name: 'size',
                        getValue: row => toGB(row.size)
                    },
                    {
                        header: 'free (GB)',
                        name: 'used',
                        getValue: row => toGB(row.size - row.used)
                    },
                    {
                        header: 'used (GB)',
                        name: 'used',
                        getValue: row => toGB(row.used)
                    },
                    {
                        header: 'use (%)',
                        name: 'use',
                        getValue: row => (row.use).toFixed(1)
                    },
                ]}
                getRowKey={row => row.fs}
                data={info.fsSize}
                updateDataState={(sortedData) => {
                    setInfo({
                        ...info,
                        fsSize: sortedData,
                    })
                }}
            >
            </SortTable>
        </div>
    )
}

export default MemInfo 