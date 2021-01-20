import React from 'react'
import { useState, useEffect } from 'react'
import infoService from '../services/infoService'
import Chart from "react-google-charts";

const CpuInfo = (props) => {


    const maxGraphIntervals = 10
    const refreshInterval = 5000;
    // const [refreshInterval, setRefreshInterval] = useState(10000);
    const [temps, setTemps] = useState([]);


    const fetchMetrics = () => {
        // retrieve and then setData()
        infoService.getInfo(['cpuTemp'])
            .then(data => {
                // console.log('->', temps)
                // console.log('-->', data, data.cpuTemp.main, temps.concat(data.cpuTemp.main))
                setTemps((temps.length === maxGraphIntervals ? temps.slice(1) : temps).concat(data.cpuTemp.main))
                // console.log('--->', temps)
            })
    }

    const getChartData = () => {
        var i = 0
        var data = [['x', 'cpu']]
        for (i = 0; i < maxGraphIntervals; i++) {
            data = data.concat([[i, (i < temps.length ? temps[temps.length - i] : 0)]])
        }
        return data
    }

    useEffect(() => {
        if (refreshInterval && refreshInterval > 0) {
            const interval = setInterval(fetchMetrics, refreshInterval);
            return () => clearInterval(interval);
        }
        // }, [refreshInterval]);
    });


    // console.log('CpuInfo', props)
    // var i = 1
    return (
        <div>
            {/* <div>Temperature: {props.info?.cpuTemp?.main} </div> */}

            <div>Speed: {props.info?.cpuSpeed?.avg} </div>


            {/* <div>Temperature: <ul>{temps.map(temp => {
                console.log(i)
                return (<li key={++i}>  {temp}  </li>)
            })}
            </ul>
            </div> */}


            <Chart
                width={'600px'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                // data={[
                //     // ['x', 'temp'],
                // ]}
                data={getChartData()}
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