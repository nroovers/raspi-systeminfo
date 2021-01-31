import React from 'react'
import { useState, useEffect } from 'react'
import infoService from '../services/infoService'
import SortTable from "./SortTable"
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
            <SortTable
                columns={[
                    {
                        header: 'iface',
                        name: 'iface',
                        getValue: row => row.iface
                    },
                    {
                        header: 'ip4',
                        name: 'ip4',
                        getValue: row => row.ip4
                    },
                    {
                        header: 'ip4subnet',
                        name: 'ip4subnet',
                        getValue: row => row.ip4subnet
                    },
                    {
                        header: 'type',
                        name: 'type',
                        getValue: row => row.type
                    },
                    {
                        header: 'virtual',
                        name: 'virtual',
                        getValue: row => row.virtual.toString()
                    },
                    {
                        header: 'dhcp',
                        name: 'dhcp',
                        getValue: row => row.dhcp.toString()
                    },

                ]}
                getRowKey={(row) => row.iface}
                data={info.network}
                updateDataState={(sortedData) => {
                    setInfo({
                        network: sortedData,
                        wifi: info.wifi,
                    })
                }}
            >
            </SortTable>
            <h2>WiFi</h2>
            <SortTable
                columns={[
                    {
                        header: 'ssid',
                        name: 'ssid',
                        getValue: row => row.ssid
                    },
                    {
                        header: 'channel',
                        name: 'channel',
                        getValue: row => row.channel
                    },
                    {
                        header: 'frequency',
                        name: 'frequency',
                        getValue: row => row.frequency
                    },
                    {
                        header: 'security',
                        name: 'security',
                        getValue: row => row.security.join()
                    },

                ]}
                getRowKey={(row) => row.ssid}
                data={info.wifi}
                updateDataState={(sortedData) => {
                    setInfo({
                        network: info.network,
                        wifi: sortedData,
                    })
                }}
            >
            </SortTable>
        </div>
    )
}

export default NetInfo 