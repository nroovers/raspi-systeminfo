import React from 'react'
import { useState } from 'react'
import { Table } from "react-bootstrap"

// TODO: implement filter columns

const SortTable = (props) => {
    const [sort, setSort] = useState({ col: 'name', order: 'asc' })
    const [selectedRow, setSelectedRow] = useState('')

    const compare = (a, b) => {
        if (a[sort.col] < b[sort.col]) {
            return sort.order === 'asc' ? -1 : 1;
        }
        if (a[sort.col] > b[sort.col]) {
            return sort.order === 'asc' ? 1 : -1;
        }
        return 0;
    }

    const onColClick = (columnName) => {
        console.log(columnName)
        setSort({
            col: columnName,
            order: sort.order === 'asc' ? 'desc' : 'asc'
        })
        props.updateDataState(props.data.sort(compare))
    }

    const handleRowClicked = (rowKey) => {
        if (props.renderRowDetails && selectedRow !== rowKey)
            setSelectedRow(rowKey)
        else
            setSelectedRow('')
    }

    const renderTr = (row) => {
        return <tr key={props.getRowKey(row)} onClick={() => handleRowClicked(props.getRowKey(row))}>
            {props.columns.map(col =>
                (<td key={col.header}>{col.getValue(row)}</td>)
            )}
        </tr>
    }

    const renderTrDetails = (row) => {
        return <tr key={props.getRowKey(row) + '2'}>
            <td colSpan={props.columns.length}>{props.renderRowDetails(row)}</td>
        </tr>
    }

    return (
        <Table>
            <thead>
                <tr>
                    {props.columns.map(col =>
                    (<th key={col.header} onClick={() => onColClick(col.name)}>
                        {col.header}
                    </th>))}
                </tr>
            </thead>
            <tbody>
                {props.data?.map(row => {
                    return <tr key={props.getRowKey(row)} onClick={() => handleRowClicked(props.getRowKey(row))}>
                        {props.renderRowDetails && selectedRow === props.getRowKey(row)
                            ? <td colSpan={props.columns.length}>{props.renderRowDetails(row)}</td>
                            : props.columns.map(col => <td key={col.header}>{col.getValue(row)}</td>)
                        }
                    </tr>
                })}
            </tbody>
        </Table >
    )
}

export default SortTable 