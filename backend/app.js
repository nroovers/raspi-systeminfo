const express = require('express')
const infoRouter = require('./routers/info')
const transformJsonResp = require('./utils/middleware/transformJson')
const app = express()

const transformJson = require('./utils/middleware/transformJson')


// parses incoming requests with JSON payloads and is based on body-parser.
// app.use(express.json())


// app.use(cors())                      --> middleware to support CORS
// app.use(express.static('build'))     --> add static folder -> for frontend  
// app.use(middleware.requestLogger)    --> add logging


app.use(transformJson)

app.use('/api/info', infoRouter)


// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

module.exports = app