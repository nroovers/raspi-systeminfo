import React from 'react'
import { useState, useEffect } from 'react'
import infoService from '../services/infoService'
import Chart from "react-google-charts";

const CpuInfo = (props) => {

    const maxGraphIntervals = 25
    const refreshInterval = 5000;
    // const [refreshInterval, setRefreshInterval] = useState(10000);
    const [cpuData, setCpuData] = useState({});
    const [speedData, setSpeedData] = useState([]);
    const [tempData, setTempData] = useState([]);


    const fetchMetrics = () => {
        // retrieve and then setData()
        infoService.getInfo(['cpuTemp', 'cpuSpeed'])
            .then(data => {
                // console.log('->', tempData)
                // console.log('-->', data, data.cpuTemp.main, tempData.concat(data.cpuTemp.main))
                setTempData((tempData.length === maxGraphIntervals ? tempData.slice(1) : tempData).concat(data.cpuTemp.main))
                setSpeedData((speedData.length === maxGraphIntervals ? speedData.slice(1) : speedData).concat(data.cpuSpeed.avg))
                // console.log('--->', tempData)
            })
    }

    const getTempChartData = () => {
        var i = 0
        var data = [['x', 'temp']]
        for (i = 0; i < maxGraphIntervals; i++) {
            data = data.concat([[i, (i < tempData.length ? tempData[tempData.length - i] : 0)]])
        }
        return data
    }

    const getSpeedChartData = () => {
        var i = 0
        var data = [['x', 'speed']]
        for (i = 0; i < maxGraphIntervals; i++) {
            data = data.concat([[i, (i < speedData.length ? speedData[speedData.length - i] : 0)]])
        }
        return data
    }

    useEffect(() => {
        console.log('useeffect CPU')
        if (!cpuData.cpu) {
            infoService.getInfo(['cpu'])
                .then(data => {
                    console.log('CPU data', data)
                    setCpuData(data)
                })
        }
    }, [cpuData]);

    useEffect(() => {
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(fetchMetrics, refreshInterval);
            return () => clearInterval(interval);
        }
        // }, [refreshInterval]);
    });


    return (
        <div>
            {/* <div>Temperature: {props.info?.cpuTemp?.main} </div> */}

            {/* <div>Speed: {props.info?.cpuSpeed?.avg} </div> */}


            {/* <div>Temperature: <ul>{tempData.map(temp => {
                console.log(i)
                return (<li key={++i}>  {temp}  </li>)
            })}
            </ul>
            </div> */}

            <h2>CPU</h2>

            <p>manufacturer: {cpuData.cpu?.manufacturer}</p>
            <p>brand: {cpuData.cpu?.brand}</p>
            <p>speed: {cpuData.cpu?.speed} GHz</p>
            <p>cores: {cpuData.cpu?.cores}</p>
            <p>Current speed: {speedData.length > 0 ? speedData[speedData.length - 1] : 0} GHz</p>
            <p>Current temperature: {tempData.length > 0 ? tempData[tempData.length - 1] : 0} C</p>

            <Chart
                width={'500px'}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={getSpeedChartData()}
                options={{
                    hAxis: {},
                    vAxis: {
                        title: 'Speed',
                        viewWindow: { min: 0, max: 100 }
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
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
                    hAxis: {
                        // baseline: 20,
                        // color: '#333', 
                        // minSpacing: 20
                    },
                    vAxis: {
                        title: 'Temperature',
                        // color: '#333', minSpacing: 20
                        viewWindow: { min: 40, max: 100 }
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
            />

        </div>
    )
}

export default CpuInfo 