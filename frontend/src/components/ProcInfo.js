import React from 'react'
import { useState, useEffect } from 'react'
import infoService from '../services/infoService'
import SortTable from "./SortTable"

// TODO: implement favorite processes (persistant -> browser or backend?)

const ProcInfo = (props) => {
    const [info, setInfo] = useState({ processes: {} });

    useEffect(() => {
        console.log('ProcInfo useeffect Load')
        let procInfoMounted = true
        infoService.getInfo(['processes'])
            .then(data => {
                console.log('ProcInfo set data', data)
                if (procInfoMounted) // only set state if mounted
                    setInfo({ processes: data.processes })
                // setProcessData({ list: data.processes.list.sort(compare), ...data })
            })
        // Cleanup function in the useEffect hook to ensure that state is updated (after async call) only when mounted 
        return () => procInfoMounted = false
    }, []);

    return (
        <div>
            <h2>Processes</h2>
            <p>All processes: {info.processes.all}</p>
            <p>Running processes: {info.processes.running}</p>
            <p>Blocked processes: {info.processes.blocked}</p>
            <p>Sleeping processes: {info.processes.sleeping}</p>
            <p>Unknown processes: {info.processes.unknown}</p>
            <SortTable
                columns={[
                    {
                        header: 'pid',
                        name: 'pid',
                        getValue: row => row.pid
                    },
                    {
                        header: 'name',
                        name: 'name',
                        getValue: row => row.name
                    },
                    {
                        header: 'cpu (%)',
                        name: 'pcpu',
                        getValue: row => row.pcpu.toFixed(2)
                    },
                    {
                        header: 'mem (%)',
                        name: 'pmem',
                        getValue: row => row.pmem.toFixed(2)
                    },
                    {
                        header: 'state',
                        name: 'state',
                        getValue: row => row.state
                    },
                ]}
                getRowKey={(row) => row.pid}
                data={info.processes?.list}
                updateDataState={(sortedData) => {
                    setInfo({
                        processes: {
                            list: sortedData,
                            ...info.processes
                        }
                    })
                }}
            >
            </SortTable>
        </div>
    )
}

export default ProcInfo 