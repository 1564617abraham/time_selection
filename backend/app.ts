const express = require('express')
const cors = require('cors')

const application = express()

//configuration

application.set('port', process.env.PORT || 4000) 

//middleware

application.use(cors())
application.use(express.json())

//routes

application.get('/', (req, res) => {
    res.send('Welcome to my api rest full')
})

//route for api users

application.use('/api/users', require('./routes/user'))

module.exports = app