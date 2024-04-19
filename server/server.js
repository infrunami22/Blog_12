require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const userRoute = require('./userRoute')
const topicRoute = require('./topicRoute')
/* const authentication = require('./authentication') */
const {router2,authenticateToken} = require('./tokenRoute')
app.use(express.json())
app.use(cors())


app.use('/users',userRoute)
app.use('/auth',router2)
app.use('/topics',topicRoute)

app.listen(5000, () => {
    console.log("listening on port 5000")
})