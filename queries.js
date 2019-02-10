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

const addProperty = (request, response)=>{
    var amenities = request.body.amenities;
    var bed = request.body.bed;
    var description = request.body.description;
    var guest = request.body.guest;
    var location = request.body.location;
    var price = request.body.price;
    var type = request.body.type;
    var propName = request.body.propName;
    var ownerId = request.body.ownerId;
    pool.query('INSERT INTO public."Property" (name, description, amenities, price, no_of_guests,' +
        ' no_of_beds, location_id, owner_id, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
        , [propName, description, amenities, price, guest, bed, location, ownerId, type ], (error, results) => {
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
        'to_char(B.check_out_date, \'DD-Mon-YYYY\') as check_out_date, P.name AS prop_name, P.id AS prop_id, O.id as owner_id, O.name as owner_name, T.owing, T.paid' +
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

const getPropertyDetails = (request, response)=>{
    var propId = parseInt(request.params.id)
    pool.query('SELECT P.name as propName, L.country, L.city, P.description AS prop_desc, P.amenities,' +
        '    P.price, P.no_of_guests, P.no_of_beds, O.name as owner_name,' +
        '    O.id as owner_id, O.description AS owner_desc' +
        '    FROM public."Property" AS P' +
        '    LEFT OUTER JOIN public."Owner" AS O' +
        '    ON P.owner_id = O.id' +
        '    LEFT OUTER JOIN public."Location" AS L' +
        '    ON P.location_id = L.id' +
        '    WHERE P.id = $1 '
        ,[propId], (error, results) => {
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

const getPropertyReview = (request, response) =>{
    var propId = parseInt(request.params.id)
    pool.query('SELECT R.rating, R.description, to_char(R.date, \'DD-Mon-YYYY\') as date, G.name ' +
        'FROM public."Review" AS R, public."Guests" AS G ' +
        'WHERE R.id in (SELECT ROP.rev_id ' +
        ' FROM public."ReviewOfProperty" AS ROP ' +
        ' WHERE ROP.prop_id = $1 AND G.id=ROP.guest_id)'
    , [propId], (error,  results) => {
        if (error){
            console.log(error);
            response.send(error);
        }
        else{
            console.log(results.rows)
            response.send(results.rows);

        }
    })
}



const leftToReview = (request, response)=>{
    var guestId = parseInt(request.params.id);
    pool.query('SELECT P.id AS prop_id, P.name as prop_name ' +
        'FROM public."Property" AS P ' +
        'WHERE P.id NOT IN (SELECT R.prop_id ' +
        '  FROM public."ReviewOfProperty" AS R' +
        '  WHERE guest_id=$1) AND ' +
        ' P.id IN (SELECT B.property_id' +
        '  FROM public."Booking" AS B' +
        '   WHERE B.booked_by=$1)',
        [guestId], (error, results)=> {
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

const leftToReviewOwner = (request, response)=>{
    var guestId = parseInt(request.params.id);
    pool.query('SELECT O.id as owner_id, O.name as owner_name' +
        '    FROM public."Owner" AS O' +
        '    WHERE O.id not in (Select  R.owner_id' +
        '    FROM public."ReviewOfOwner" as R' +
        '    WHERE R.guest_id=$1)' +
        '    AND O.id in (SELECT P.owner_id' +
        '    FROM public."Property"as P' +
        '    WHERE P.id in (SELECT B.property_id' +
        '    FROM public."Booking" as B' +
        '    where B.booked_by = $1))',
        [guestId], (error, results)=> {
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


const placeBooking = (request, response)=>{
    var cid = request.body.check_in_date.toString();
    var cod = request.body.check_out_date.toString();
    var loc = request.body.id;
    var username = request.body.username;
    var password = request.body.password;



    pool.query('SELECT * FROM bookGuest($1, $2, $3, $4, $5 )', [cid,cod,loc,username,password], (error, results)=>{
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
        ' (SELECT id FROM public."Location" WHERE country=$1 OR city=$1)' +
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
const review = (request, response)=>{
    var rate = request.body.rating;
    var description = request.body.description;
    var type = request.body.type;
    var idTo = request.body.to;
    var idFrom = request.body.from;


    pool.query('SELECT * FROM placeReview($1,$2,$3,$4,$5)', [rate, description,type,idFrom,idTo], (error, results)=>{
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
        ' (SELECT id FROM public."Location" WHERE country=$1 OR city=$1)'
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
    guestBookings,
    leftToReview,
    leftToReviewOwner,
    review,
    addProperty,
    getPropertyReview,
    getPropertyDetails,
    placeBooking
}