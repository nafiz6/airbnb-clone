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

app.get('/owner/:id', db.getOwner)

app.post('/signup/guest', db.signupGuest)


app.listen(port, () =>{
    console.log(`App running on ${port}.`)
})
