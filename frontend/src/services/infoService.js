import axios from 'axios'

var node

const setNode = (n) => node = n

// const getInfo = (node, flags) => {
const getInfo = (flags) => {
    if (!node)
        throw new Error('Node not set')

    console.log('infoService.getInfo', flags)
    const flagsQuery = flags ?
        '?' + flags.map(f => 'flag=' + f).join('&')
        : ''
    return axios.get(node.apiUrlPref + '/info' + flagsQuery)
        .then(res => {
            if (res.data.data) {
                // console.log('infoService.getInfo', res.data.data)
                return res.data.data
            }
            else if (res.data.error)
                //TODO errorhandlign
                return res.data.error
            return ''
        })
}

const infoService = {
    setNode,
    getInfo
}

export default infoService