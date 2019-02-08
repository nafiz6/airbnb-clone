const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'airbnb'
})

const signupGuest = (request, response)=>{
    var name = request.body.name;
    var description = request.body.description;
    var contact = request.body.contact;
    var location = request.body.location;
    var username = request.body.username;
    var password = request.body.password;
    pool.query('INSERT INTO public."Guests" (name, description, contact,location, username, password) VALUES ($1, $2, $3, $4, $5, $6)',
        [name, description, contact, location,username, password], (error, results) => {
        if (error) {
            console.log(error);
            response.send(error);
        }
        else{
            response.status(201).send(`User added with ID: ${results.insertId}`)
    }
    })
}
const signupOwner = (request, response)=>{
    var name = request.body.name;
    var description = request.body.description;
    var contact = request.body.contact;
    var location = request.body.location;
    var username = request.body.username;
    var password = request.body.password;
    pool.query('INSERT INTO public."Owner" (name, description, contact,location, username, password) VALUES ($1, $2, $3, $4, $5, $6)'
        , [name, description, contact, location, username, password], (error, results) => {
        if (error) {
            console.log(error);
            response.send(error);
        }
        else{
            response.status(201).send(`User added with ID: ${results.insertId}`)
    }
    })
}

const loginOwner = (request, response)=>{
    var username = request.body.username;
    var password = request.body.password;
    pool.query('SELECT id FROM public."Owner" WHERE (username=$1 AND password = $2)'
        , [username, password], (error, results) => {
        if (error) {
            console.log(error);
            response.send(error);
        }
        else{
            response.send(results.rows);
    }
    })
}
const loginGuest = (request, response)=>{
    var username = request.body.username;
    var password = request.body.password;
    pool.query('SELECT id FROM public."Guests" WHERE (username=$1 AND password = $2)'
        , [username, password], (error, results) => {
        if (error) {
            console.log(error);
            response.send(error);
        }
        else{
            response.send(results.rows);
    }
    })
}


const ownerBookings = (request, response)=>{
    var ownerId = parseInt(request.params.id)
    pool.query('SELECT B.id AS booking_id,  to_char(B.check_in_date, \'DD-Mon-YYYY\') as check_in_date, ' +
        'to_char(B.check_out_date, \'DD-Mon-YYYY\') as check_out_date, P.name AS prop_name, G.name as booked_by, T.owing, T.paid' +
        ' FROM public."Booking" AS B' +
        ' INNER JOIN' +
        ' public."Property" AS P' +
        ' ON P.id = B.property_id' +
        ' LEFT OUTER JOIN' +
        ' public."Transaction" AS T' +
        ' ON (T.booking_id = B.id)' +
        ' INNER JOIN' +
        ' public."Guests" AS G ON G.id = B.booked_by' +
        ' WHERE P.owner_id = $1'
        ,[ownerId], (error, results) => {
        if (error) {
            console.log(error);
            response.send(error);
        }
        else{
            console.log(results.rows)
            response.send(results.rows);
    }
    })
}

const guestBookings = (request, response)=>{
    var guestId = parseInt(request.params.id)
    pool.query('SELECT B.id AS booking_id,  to_char(B.check_in_date, \'DD-Mon-YYYY\') as check_in_date, ' +
        'to_char(B.check_out_date, \'DD-Mon-YYYY\') as check_out_date, P.name AS prop_name, P.id AS prop_id, O.id as owner_id O.name as owner_name, T.owing, T.paid' +
        ' FROM public."Booking" AS B' +
        ' INNER JOIN' +
        ' public."Property" AS P' +
        ' ON P.id = B.property_id' +
        ' LEFT OUTER JOIN' +
        ' public."Transaction" AS T' +
        ' ON (T.booking_id = B.id)' +
        ' INNER JOIN' +
        ' public."Owner" AS O ' +
        ' ON O.id = P.owner_id '+
        ' WHERE B.booked_by = $1'
        ,[guestId], (error, results) => {
        if (error) {
            console.log(error);
            response.send(error);
        }
        else{
            console.log(results.rows)
            response.send(results.rows);
    }
    })
}



const getPropertyByAll = (request, response)=>{
    var cid = request.params.check_in_date.toString();
    var cod = (request.params.check_out_date).toString();

    var loc = request.params.location;
    console.log(loc)
    var guests = request.params.guests;

    pool.query('SELECT P.id AS prop_id, P.name as prop_name , P.no_of_beds, P.type,P.price, O.id AS owner_id, O.name as owner_name' +
        ' FROM public."Property" AS P' +
        ' INNER JOIN' +
        ' public."Owner" as O' +
        ' ON P.owner_id = O.id' +
        ' WHERE checkAvailibility($2, $3, P.id)' +
        ' AND P.location_id in' +
        ' (SELECT id FROM public."Location" WHERE country=$1)' +
        ' AND P.no_of_guests>=$4', [loc,cid,cod,guests], (error, results)=>{
        if (error){
            console.log(error);
            response.send(error);

        }
        else{
            console.log(results.rows)
            response.send(results.rows);
        }
    });

}
const getPropertyByLocation = (request, response)=>{
    var loc = request.params.location;

    pool.query('SELECT P.id AS prop_id, P.name as prop_name , P.no_of_beds, P.type,P.price, O.id AS owner_id, O.name as owner_name' +
        ' FROM public."Property" AS P' +
        ' INNER JOIN' +
        ' public."Owner" as O' +
        ' ON P.owner_id = O.id' +
        ' WHERE P.location_id in' +
        ' (SELECT id FROM public."Location" WHERE country=$1)'
        , [loc], (error, results)=>{
        if (error){
            console.log(error);
            response.send(error);

        }
        else{
            console.log(results.rows)
            response.send(results.rows);
        }
    });

}

module.exports ={
    signupGuest,
    signupOwner,
    loginOwner,
    loginGuest,
    getPropertyByAll,
    getPropertyByLocation,
    ownerBookings,
    guestBookings
}