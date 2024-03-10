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

// Test data
moods = [{user: "Jack", date: new Date(2024, 3, 1), mood: 70},
        {user: "Jack", date: new Date(2024, 3, 2), mood: 75},
        {user: "Jack", date: new Date(2024, 3, 3), mood: 80},
        {user: "Jack", date: new Date(2024, 3, 4), mood: 88},
        {user: "Jack", date: new Date(2024, 3, 5), mood: 55},
        {user: "Jack", date: new Date(2024, 3, 6), mood: 50},
        {user: "Jack", date: new Date(2024, 3, 7), mood: 45},
        {user: "Jack", date: new Date(2024, 3, 8), mood: 30},
        {user: "Jack", date: new Date(2024, 3, 9), mood: 35},
        {user: "Jeremy", date: new Date(2024, 3, 1), mood: 50},
        {user: "Jeremy", date: new Date(2024, 3, 2), mood: 50},
        {user: "Jeremy", date: new Date(2024, 3, 3), mood: 50},
        {user: "Jeremy", date: new Date(2024, 3, 4), mood: 50},
        {user: "Jeremy", date: new Date(2024, 3, 5), mood: 50},
        {user: "Jeremy", date: new Date(2024, 3, 6), mood: 60},
        {user: "Jeremy", date: new Date(2024, 3, 7), mood: 70},
        {user: "Jeremy", date: new Date(2024, 3, 8), mood: 80},
        {user: "Jeremy", date: new Date(2024, 3, 9), mood: 90}]
supervisors = [{supervisor: "Lara", supervisees: ["Jack", "Jeremy", "John"]}]
sleep = [{user: "Jack", date: new Date(2024, 3, 1), mood: 70},
    {user: "Jack", date: new Date(2024, 3, 2), hours: 8},
    {user: "Jack", date: new Date(2024, 3, 3), hours: 8.25},
    {user: "Jack", date: new Date(2024, 3, 4), hours: 7},
    {user: "Jack", date: new Date(2024, 3, 5), hours: 6.33},
    {user: "Jack", date: new Date(2024, 3, 6), hours: 5},
    {user: "Jack", date: new Date(2024, 3, 7), hours: 5.55},
    {user: "Jack", date: new Date(2024, 3, 8), hours: 4.78},
    {user: "Jack", date: new Date(2024, 3, 9), hours: 6}]

// GET request bindings
app.get('/', (req, res) => {
    res.send('YOUR EXPRESS BACKEND IS RUNNING')
  })

app.get('/getSleep', (req, res) => {
    thisSleep = sleep.filter((s) => s.user === res.locals.user)
    console.log(`sleep sent len ${thisSleep.length}`)
    res.send({ sleep: thisSleep })
  })

app.get('/getMyMood', (req, res) => {
    thisMood = moods.filter((m) => m.user === res.locals.user)
    console.log(`mood sent len ${thisMood.length}`)
    res.send({ mood: thisMood })
  })

app.get('/getSupervisorMood', (req, res) => {
    superviseeList = []
    supervisors.foreach((s) => {if (s.supervisor === res.locals.supervisor) {superviseeList = s.supervisees}})
    thisMood = moods.filter((m) => superviseeList.includes(m.user))
    dates = new Object()
    thisMood.foreach((m) => {
        currVals = dates[m.date]
        if (currVals === undefined) {
            dates[m.date] = {total: m.mood, num: 1}
        } else {
            dates[m.date].num++
            dates[m.date].total += m.mood
        }
    })
    final = Object.keys(dates).map((d) => {return {date: d, avgMood: dates[d].total / dates[d].num}})
    console.log(`super mood sent len ${final.length}`)
    res.send({ mood: final })
  })

// POST request bindings
app.post('/sendMoodVal', (req, res) => {
    today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    found = false
    moods.foreach((m) => {if (m.user === res.locals.user && m.date === today) {
        found = true
        m.mood = req.body.hours
    }})
    if (!found) {
        sleep.push({user: res.locals.user, date: today, hours: req.body.hours})
    }
    console.log('Inserted value', req.body.hours)

    res.send({ message: 0 })
  })

app.post('/sendSleepVal', (req, res) => {
    today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    found = false
    sleep.foreach((s) => {if (s.user === res.locals.user && s.date === today) {
        found = true
        s.hours = req.body.mood
    }})
    if (!found) {
        moods.push({user: res.locals.user, date: today, mood: req.body.mood})
    }
    console.log('Inserted value', req.body.mood)

    res.send({ message: 0 })
  })
  

app.listen(port, () => {console.log("listening on port", port)})
