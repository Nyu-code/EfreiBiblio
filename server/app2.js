const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')


const apiRouter = require('./routes/api.js')

const app2 = express()


app2.use(logger('dev'))
app2.use(express.json())
app2.use(express.urlencoded({ extended: false }))
app2.use(cookieParser())
app2.use(session({ secret: 'grehjznejzkhgjrez', saveUninitialized: false, resave: false }))
app2.use(express.static(path.join(__dirname, '../client')))

app2.use('/api/', apiRouter)

module.exports = app2
