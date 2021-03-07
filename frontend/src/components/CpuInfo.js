import React from 'react'
import { useState, useEffect } from 'react'
import infoService from '../services/infoService'
import Chart from "react-google-charts";
import { Row, Col } from "react-bootstrap"
import appStateUtils from '../utils/appStateUtils'


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
            })
    }

    useEffect(() => {
        appStateUtils.setLoading(props.appState, props.setAppState, true)
    }, [props.appState.selectedNode])

    useEffect(() => {
        console.log('useeffect CPU')
        var cpuInfoMounted = true
        infoService.getInfo(['cpu'])
            .then(data => {
                console.log('CPU data')
                if (cpuInfoMounted)
                    setInfo({ ...info, cpu: data.cpu })
            })
            .catch(err => {
                appStateUtils.addNotification(
                    props.appState,
                    props.setAppState,
                    { title: 'Error', body: <><p>Retrieving cpu data failed</p><p>{err.message}</p></>, type: 'danger' })
            })
            .finally(() =>
                appStateUtils.setLoading(props.appState, props.setAppState, false)
            )
        return () => cpuInfoMounted = false
    }, [props.appState.selectedNode])
    // }, [info.cpu]);

    useEffect(() => {
        console.log('useeffect Interval')
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(fetchMetrics, refreshInterval);
            return () => clearInterval(interval);
        }
        // }, [refreshInterval]);
    });

    const getChartData = (label, infoData) => {
        console.log('infodata', infoData)
        var i = 0
        var chartData = [['x', label]]
        for (i = 0; i < maxGraphIntervals; i++) {
            chartData = chartData.concat([[i, (i < infoData.length ? infoData[infoData.length - i - 1] : 0)]])
        }
        return chartData
    }

    return (
        <div>
            <Row>
                <Col></Col>
            </Row>
            <Row>
                <Col><h2>CPU</h2></Col>
            </Row>
            <Row xs={1} md={2}>
                <Col>Manufacturer: {info.cpu?.manufacturer}</Col>
                <Col>Speed: {info.cpu?.speed} GHz</Col>
                <Col>Brand: {info.cpu?.brand}</Col>
                <Col>Cores: {info.cpu?.cores}</Col>
                <Col>Current load: {info.cpuLoad.length > 0 ? (info.cpuLoad[info.cpuLoad.length - 1]).toFixed(2) : 0} %</Col>
                <Col>Current temperature: {info.cpuTemp.length > 0 ? (info.cpuTemp[info.cpuTemp.length - 1]).toFixed(2) : 0} C</Col>
            </Row>
            {/* 
            <p>manufacturer: {info.cpu?.manufacturer}</p>
            <p>brand: {info.cpu?.brand}</p>
            <p>speed: {info.cpu?.speed} GHz</p>
            <p>cores: {info.cpu?.cores}</p>
            <p>Current load: {info.cpuLoad.length > 0 ? (info.cpuLoad[info.cpuLoad.length - 1]).toFixed(2) : 0} %</p>
            <p>Current temperature: {info.cpuTemp.length > 0 ? (info.cpuTemp[info.cpuTemp.length - 1]).toFixed(2) : 0} C</p> 
            */}
            <Row xs={1} md={2}>
                <Col>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={getChartData('load', info.cpuLoad)}
                        options={{
                            title: 'CPU Load',
                            hAxis: {},
                            vAxis: {
                                // title: 'Load',
                                viewWindow: { min: 0, max: 100 }
                            },
                            legend: 'bottom',
                        }}
                    />
                </Col>
                <Col>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={getChartData('temp', info.cpuTemp)}
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
                    />
                </Col>
            </Row>
        </div>
    )
}

export default CpuInfo 