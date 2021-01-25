import React from 'react'
import { useState, useEffect } from 'react'
import infoService from '../services/infoService'

const ProcInfo = (props) => {
    const [info, setInfo] = useState({ processes: {} });
    const [sort, setSort] = useState({ col: 'name', order: 'asc' })
    // const [orderCol, setOrderCol] = useState('name');
    // const [order, setOrder] = useState('asc');

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

    const compare = (a, b) => {
        if (a[sort.col] < b[sort.col]) {
            return sort.order === 'asc' ? -1 : 1;
        }
        if (a[sort.col] > b[sort.col]) {
            return sort.order === 'asc' ? 1 : -1;
        }
        return 0;
    }

    const sortPocessData = (column) => {
        console.log(column)
        setSort({
            col: column,
            order: sort.order === 'asc' ? 'desc' : 'asc'
        })
        setInfo({
            processes: {
                list: info.processes.list.sort(compare),
                ...info.processes
            }
        })
    }

    const onNameColClick = (args) => {
        sortPocessData('name')
    }
    const onCpuColClick = (args) => {
        sortPocessData('pcpu')
    }
    const onMemColClick = (args) => {
        sortPocessData('pmem')
    }
    const onVmemColClick = (args) => {
        sortPocessData('mem_vsz')
    }
    const onStateColClick = (args) => {
        sortPocessData('state')
    }

    return (
        <div>
            <h2>Processes</h2>

            <p>All processes: </p>
            <p>Running processes: </p>

            <table>
                <thead>
                    <tr>
                        <th onClick={onNameColClick}>name</th>
                        <th onClick={onCpuColClick}>cpu (%)</th>
                        <th onClick={onMemColClick}>mem (%)</th>
                        <th onClick={onVmemColClick}>virtual mem (MB)</th>
                        <th onClick={onStateColClick}>state</th>
                    </tr>
                </thead>
                <tbody>
                    {info.processes?.list?.map(proc => {
                        return (
                            <tr key={proc.pid}>
                                <td>{proc.name}</td>
                                <td>{proc.pcpu.toFixed(2)}</td>
                                <td>{proc.pmem.toFixed(2)}</td>
                                <td>{(proc.mem_vsz / (1024 * 1024)).toFixed(2)}</td>
                                <td>{proc.state}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ProcInfo 