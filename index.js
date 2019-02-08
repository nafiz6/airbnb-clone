const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries.js')
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/user/', (request,response)=>{
    response.json({ info: 'HI SOMEK'})
})

app.get('/ownerbookings/:id', db.ownerBookings)
app.get('/guestbookings/:id', db.guestBookings)

app.get('/property/:location/:check_in_date/:check_out_date/:guests', db.getPropertyByAll)
app.get('/property/:location', db.getPropertyByLocation)

app.post('/signup/guest', db.signupGuest)
app.post('/signup/owner', db.signupOwner)
app.post('/login/owner', db.loginOwner)
app.post('/login/guest', db.loginGuest)



app.listen(port, () =>{
    console.log(`App running on ${port}.`)
})
