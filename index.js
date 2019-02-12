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
app.get('/getpackage/:id', db.getPackage)
app.get('/getpropertybyowner/:id', db.getPropertyByOwner)
app.get('/guestpay/:id', db.guestPay)
app.get('/getpropertydetails/:id', db.getPropertyDetails)
app.get('/getpropertyreview/:id', db.getPropertyReview)
app.get('/guestbookings/:id', db.guestBookings)
app.get('/lefttoreview/:id', db.leftToReview)
app.get('/lefttoreviewowner/:id', db.leftToReviewOwner)
app.get('/lefttoreviewguest/:id', db.leftToReviewGuest)
app.post('/review/', db.review)
app.post('/addproperty/', db.addProperty)
app.post('/book/', db.placeBooking)

app.get('/property/:location/:check_in_date/:check_out_date/:guests', db.getPropertyByAll)
app.get('/property/:location', db.getPropertyByLocation)

app.post('/signup/guest', db.signupGuest)
app.post('/signup/owner', db.signupOwner)
app.post('/login/owner', db.loginOwner)
app.post('/login/guest', db.loginGuest)



app.listen(port, () =>{
    console.log(`App running on ${port}.`)
})
