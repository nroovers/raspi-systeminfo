import axios from 'axios'


const getInfo = (flags) => {
    console.log('infoService.getInfo', flags)
    const flagsQuery = flags ?
        '?' + flags.map(f => 'flag=' + f).join('&')
        : ''
    return axios.get('/api/info' + flagsQuery)
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
    getInfo
}

export default infoService