// Include dependencies
const axios = require("axios")
const express = require('express')
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// Setup server
const app = express()
const port = 5000

app.use(express.json())
app.use( bodyParser.json() ) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // to support URL-encoded bodies
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "localhost:3000")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELTE, PUT")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})
app.use(cookieParser())

// GET request bindings
app.get('/', (req, res) => {
    res.send('YOUR EXPRESS BACKEND IS RUNNING')
  })

app.listen(port, () => {console.log("listening on port", port)})
