const express = require('express')
const cors = require('cors')
const infoRouter = require('./routers/info')
const app = express()
const morgan = require('morgan')

const transformJson = require('./utils/middleware/transformJson')
const unknownEndpoint = require('./utils/middleware/unknownEndpoint')
const errorHandler = require('./utils/errorHandling/errorHandler')


// parses incoming requests with JSON payloads and is based on body-parser.
// app.use(express.json())


app.use(cors())                         // --> middleware to support CORS
// app.use(express.static('build'))     // --> add static folder -> for frontend  
// app.use(middleware.requestLogger)    // --> add logging
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))

app.use(transformJson)

app.use('/api/info', infoRouter)

app.get('/', function (req, res) {
    res.send('<h2>OK</h2>' +
        'Raspi system info service up and running.')
})

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app