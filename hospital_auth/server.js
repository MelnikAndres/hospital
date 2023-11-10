const express = require('express')
const jwtRouter = require('./routers/jwtRouter')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use('/', jwtRouter)
app.listen('3030', () => {
    console.log("Server is running on port 3030")
})