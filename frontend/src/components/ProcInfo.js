import React from 'react'
import { useState, useEffect } from 'react'
import infoService from '../services/infoService'
import SortTable from "./SortTable"
import { Row, Col } from "react-bootstrap"

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
            })
            .catch(err =>
                props.setAppState({
                    ...props.appState,
                    notifications: props.appState.notifications.concat(
                        { title: 'Error', body: <><p>Retrieving process data failed</p><p>{err.message}</p></>, type: 'danger' }
                    )

                }))
        // Cleanup function in the useEffect hook to ensure that state is updated (after async call) only when mounted 
        return () => procInfoMounted = false
    }, []);

    return (
        <div>
            <Row>
                <Col></Col>
            </Row>
            <Row>
                <Col><h2>Processes</h2></Col>
            </Row>
            <Row xs={1} md={3}>
                <Col><p>All processes: {info.processes.all}</p></Col>
                <Col><p>Running processes: {info.processes.list?.filter(proc => proc.state === 'running').length}</p></Col>
                <Col><p>Blocked processes: {info.processes.list?.filter(proc => proc.state === 'blocked').length}</p></Col>
                <Col><p>Sleeping processes: {info.processes.list?.filter(proc => proc.state === 'sleeping').length}</p></Col>
                <Col><p>Unknown processes: {info.processes.list?.filter(proc => proc.state === 'unknown').length}</p></Col>
            </Row>
            {/* 
            <p>All processes: {info.processes.all}</p>
            <p>Running processes: {info.processes.list?.filter(proc => proc.state === 'running').length}</p>
            <p>Blocked processes: {info.processes.list?.filter(proc => proc.state === 'blocked').length}</p>
            <p>Sleeping processes: {info.processes.list?.filter(proc => proc.state === 'sleeping').length}</p>
            <p>Unknown processes: {info.processes.list?.filter(proc => proc.state === 'unknown').length}</p> 
            */}
            <Row>
                <Col>
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
                        renderRowDetails={(row) =>
                            <Row xs={1} md={2}>
                                <Col><p>pid: {row.pid}</p></Col>
                                <Col><p>name: {row.name}</p></Col>
                                <Col><p>state: {row.state}</p></Col>
                                <Col><p>started: {row.started}</p></Col>
                                <Col><p>tty: {row.tty}</p></Col>
                                <Col><p>user: {row.user}</p></Col>
                                <Col><p>command: {row.command}</p></Col>
                                <Col><p>params: {row.params}</p></Col>
                                <Col><p>path: {row.path}</p></Col>
                            </Row>
                        }
                    >
                    </SortTable>
                </Col>
            </Row>
        </div>
    )
}

export default ProcInfo 