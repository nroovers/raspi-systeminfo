const si = require('systeminformation')

const cpu = () => {
    return si.cpu()
}

const cpuSpeed = async () => {
    // return si.cpuCurrentspeed()
    const speed = await si.cpuCurrentspeed()
    speed.avg = Math.round(((Math.random() * 50) + 0) * 10) / 10
    console.log('speed:', speed)
    return speed
}

const cpuTemp = async () => {
    // return si.cpuTemperature()
    const temp = await si.cpuTemperature()
    temp.main = Math.round(((Math.random() * 20) + 60) * 10) / 10
    console.log('temp:', temp)
    return temp
}

const cpuLoad = () => {
    return si.currentLoad()
}

const mem = () => {
    return si.mem()
}

const os = () => {
    return si.osInfo()
}

const load = () => {
    return si.currentLoad()
}

const processes = () => {
    return si.processes()
}

const disk = () => {
    return si.diskLayout()
}

const fsSize = () => {
    return si.fsSize()
}

const network = () => {
    return si.networkInterfaces()
}

const wifi = () => {
    return si.wifiNetworks()
}

module.exports = {
    cpu,
    cpuSpeed,
    cpuTemp,
    cpuLoad,
    mem,
    os,
    load,
    processes,
    disk,
    fsSize,
    network,
    wifi
}


// const info2 = {
//     cpu: {
//         speed: 70,
//         temp: 60,
//         avgLoad: 0.15,
//         currentLoad: 0.15,
//     },
//     memory: {
//         total: 100,
//         free: 70,
//         used: 30
//     },
//     // battery:{

//     // },
//     network: [
//         {
//             interface: 'eth0',
//             ip4: '',
//             ip4subnet: '',
//             dhcp: '',
//             mac: '',
//         },
//         {
//             interface: 'wlan0',
//             ip4: '',
//             ip4subnet: '',
//             dhcp: '',
//             mac: '',
//         }],
//     processes: [
//         {
//             id: 'ábc',
//             name: 'proc1',
//             cpu: 0.10,
//             memory: 150,
//             status: 'idle'
//         },
//         {
//             id: 'xyz',
//             name: 'proc2',
//             cpu: 0.20,
//             memory: 723,
//             status: 'running'
//         }
//     ]
// }