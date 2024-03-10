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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
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
moods = [{user: "Jack", date: new Date(2024, 2, 1), mood: 70},
        {user: "Jack", date: new Date(2024, 2, 2), mood: 75},
        {user: "Jack", date: new Date(2024, 2, 3), mood: 80},
        {user: "Jack", date: new Date(2024, 2, 4), mood: 88},
        {user: "Jack", date: new Date(2024, 2, 5), mood: 55},
        {user: "Jack", date: new Date(2024, 2, 6), mood: 50},
        {user: "Jack", date: new Date(2024, 2, 7), mood: 45},
        {user: "Jack", date: new Date(2024, 2, 8), mood: 30},
        {user: "Jack", date: new Date(2024, 2, 9), mood: 35},
        {user: "Jeremy", date: new Date(2024, 2, 1), mood: 50},
        {user: "Jeremy", date: new Date(2024, 2, 2), mood: 50},
        {user: "Jeremy", date: new Date(2024, 2, 3), mood: 50},
        {user: "Jeremy", date: new Date(2024, 2, 4), mood: 50},
        {user: "Jeremy", date: new Date(2024, 2, 5), mood: 50},
        {user: "Jeremy", date: new Date(2024, 2, 6), mood: 60},
        {user: "Jeremy", date: new Date(2024, 2, 7), mood: 70},
        {user: "Jeremy", date: new Date(2024, 2, 8), mood: 80},
        {user: "Jeremy", date: new Date(2024, 2, 9), mood: 90}]
supervisors = [{supervisor: "Lara", supervisees: ["Jack", "Jeremy", "John"]}]
sleep = [{user: "Jack", date: new Date(2024, 2, 1), hours: 8},
    {user: "Jack", date: new Date(2024, 2, 2), hours: 8},
    {user: "Jack", date: new Date(2024, 2, 3), hours: 8.25},
    {user: "Jack", date: new Date(2024, 2, 4), hours: 7},
    {user: "Jack", date: new Date(2024, 2, 5), hours: 6.33},
    {user: "Jack", date: new Date(2024, 2, 6), hours: 5},
    {user: "Jack", date: new Date(2024, 2, 7), hours: 5.55},
    {user: "Jack", date: new Date(2024, 2, 8), hours: 4.78},
    {user: "Jack", date: new Date(2024, 2, 9), hours: 6}]

// GET request bindings
app.get('/', (req, res) => {
    res.send('YOUR EXPRESS BACKEND IS RUNNING')
  })

// POST request bindings
app.post('/getSleep', (req, res) => {
    thisSleep = sleep.filter((s) => s.user === req.body.user)
    console.log(`sleep sent len ${thisSleep.length}`)
    res.send({ sleep: thisSleep })
  })

app.post('/getMyMood', (req, res) => {
    thisMood = moods.filter((m) => m.user === req.body.user)
    console.log(`mood sent len ${thisMood.length}`)
    res.send({ mood: thisMood })
  })

app.post('/getSupervisorMood', (req, res) => {
    superviseeList = []
    supervisors.forEach((s) => {if (s.supervisor === req.body.supervisor) {superviseeList = s.supervisees}})
    thisMood = moods.filter((m) => superviseeList.includes(m.user))
    dates = new Object()
    thisMood.forEach((m) => {
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

app.post('/sendMoodVal', (req, res) => {
    today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    found = false
    moods.forEach((m) => {
        if (m.user === req.body.user && m.date.toString() === today.toString()) {
            found = true
            m.mood = req.body.mood
        }})
    if (!found) {
        moods.push({user: req.body.user, date: today, mood: req.body.mood})
    }
    console.log('Inserted value', req.body.mood)

    res.send({ message: 0 })
  })

app.post('/sendSleepVal', (req, res) => {
    today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    found = false
    sleep.forEach((s) => {if (s.user === req.body.user && s.date.toString() === today.toString()) {
        found = true
        s.hours = req.body.hours
    }})
    if (!found) {
        sleep.push({user: req.body.user, date: today, hours: req.body.hours})
    }
    console.log('Inserted value', req.body.hours)

    res.send({ message: 0 })
  })
  

app.listen(port, () => {console.log("listening on port", port)})
