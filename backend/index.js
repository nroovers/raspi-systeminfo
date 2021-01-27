const app = require('./app') // the actual Express application
const http = require('http')

const server = http.createServer(app)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
    //   logger.info(`Server running on port ${config.PORT}`)
    console.log(`Node_ENV:${process.env.NODE_ENV}.`)
    console.log(`Server running on port ${PORT}`)
})