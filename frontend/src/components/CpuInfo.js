import React from 'react'
import { useState, useEffect } from 'react'
import infoService from '../services/infoService'
import Chart from "react-google-charts";


// TODO fix state updating only when mounted -> useEffect to return cleanup function

const CpuInfo = (props) => {

    const maxGraphIntervals = 25
    const refreshInterval = 5000;
    // const [refreshInterval, setRefreshInterval] = useState(10000);

    const [info, setInfo] = useState({ cpu: {}, cpuLoad: [], cpuTemp: [] })


    const fetchMetrics = () => {
        // retrieve and then setData()
        console.log('fetchmetrics')
        infoService.getInfo(['cpuTemp', 'cpuLoad'])
            .then(data => {
                console.log('metrics fetched')//, data, info.cpuTemp, data.cpuTemp.main)
                // console.log('->', tempData)
                // console.log('-->', data, data.cpuTemp.main, tempData.concat(data.cpuTemp.main))
                var updatedInfo = {
                    cpu: info.cpu,
                    cpuTemp: (info.cpuTemp.length === maxGraphIntervals ? info.cpuTemp.slice(1) : info.cpuTemp).concat(data.cpuTemp.main),
                    cpuLoad: (info.cpuLoad.length === maxGraphIntervals ? info.cpuLoad.slice(1) : info.cpuLoad).concat(data.cpuLoad.currentload),
                }
                // console.log('updatedInfo', info, updatedInfo)
                setInfo(updatedInfo)
                // console.log('--->', tempData)
            })
    }

    const getTempChartData = () => {
        var i = 0
        var data = [['x', 'temp']]
        for (i = 0; i < maxGraphIntervals; i++) {
            data = data.concat([[i, (i < info.cpuTemp.length ? info.cpuTemp[info.cpuTemp.length - i] : 0)]])
        }
        return data
    }

    const getLoadChartData = () => {
        var i = 0
        var data = [['x', 'load']]
        for (i = 0; i < maxGraphIntervals; i++) {
            data = data.concat([[i, (i < info.cpuLoad.length ? info.cpuLoad[info.cpuLoad.length - i] : 0)]])
        }
        return data
    }

    useEffect(() => {
        console.log('useeffect CPU')
        // if (!info.cpu) {
            infoService.getInfo(['cpu'])
                .then(data => {
                    console.log('CPU data')//, data)
                    setInfo({ ...info, cpu: data.cpu })
                })
        // }
    }, [])
    // }, [info.cpu]);

    useEffect(() => {
        console.log('useeffect Interval')
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(fetchMetrics, refreshInterval);
            return () => clearInterval(interval);
        }
        // }, [refreshInterval]);
    });


    return (
        <div>
            <h2>CPU</h2>

            <p>manufacturer: {info.cpu?.manufacturer}</p>
            <p>brand: {info.cpu?.brand}</p>
            <p>speed: {info.cpu?.speed} GHz</p>
            <p>cores: {info.cpu?.cores}</p>
            <p>Current load: {info.cpuLoad.length > 0 ? (info.cpuLoad[info.cpuLoad.length - 1]).toFixed(2) : 0} %</p>
            <p>Current temperature: {info.cpuTemp.length > 0 ? (info.cpuTemp[info.cpuTemp.length - 1]).toFixed(2) : 0} C</p>

            <Chart
                width={'500px'}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={getLoadChartData()}
                options={{
                    title: 'CPU Load',
                    hAxis: {},
                    vAxis: {
                        // title: 'Load',
                        viewWindow: { min: 0, max: 100 }
                    },
                    legend: 'bottom',
                }}
                // rootProps={{ 'data-testid': '1' }}
            />

            <Chart
                width={'500px'}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                // data={[
                //     // ['x', 'temp'],
                // ]}
                data={getTempChartData()}
                options={{
                    title: 'CPU Temperature',
                    hAxis: {
                        // baseline: 20,
                        // color: '#333', 
                        // minSpacing: 20
                    },
                    vAxis: {
                        // title: 'Temperature',
                        // color: '#333', minSpacing: 20
                        viewWindow: { min: 40, max: 100 }
                    },
                    legend: 'bottom',
                }}
                // rootProps={{ 'data-testid': '1' }}
            />

        </div>
    )
}

export default CpuInfo 