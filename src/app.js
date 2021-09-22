const express = require('express')
const rateLimit = require('express-rate-limit')
const bodyParser = require('body-parser')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const routes = require('../src/router')
const AppError = require('../src/utils/appError')
const app = express()
const globalErrHandler = require('../src/controller/errorController')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json()); 

/* Allow Cross-Origin requests */
app.use(cors())

/* Limit request from the same API */
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many Request from this IP, please try again in an hour'
})
app.use('/api', limiter)

/* Body parser, reading data from body into req.body */
app.use(express.json({
  limit: '20000kb'
}))

/* Data sanitization against XSS(clean user input from malicious HTML code) */
app.use(xss())

/* Prevent parameter pollution */
app.use(hpp())

// app.post('/', function (req, res) {
//   console.log(req.body)
// })

app.use('/', routes)

/* handle undefined Routes */
app.use('*', (req, res, next) => {
  const err = new AppError(404, 'fail', 'undefined route')
  next(err, req, res, next)
})

app.use(globalErrHandler)

module.exports = app