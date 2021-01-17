const si = require('systeminformation')

const cpu = () => {
    return si.cpu()
}

const cpuSpeed = () => {
    return si.cpuCurrentspeed()
}

const cpuTemp = () => {
    return si.cpuTemperature()
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
    mem,
    os,
    load,
    // processes,
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