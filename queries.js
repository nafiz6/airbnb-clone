const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'airbnb'
})

const getOwner = (request, response) => {
    id = parseInt(request.params.id)
    pool.query('SELECT * FROM public."Owner" WHERE id = $1', [id], (error, results)=> {
        if (error){
            console.log(error)
            response.send(error);
        }
        else{
            response.send(results.rows)
    }
    });
}

const signupGuest = (request, response)=>{
    var name = request.body.name;
    var username = request.body.username;
    var password = request.body.password;
    pool.query('INSERT INTO public."Guests" (name, username,password) VALUES ($1, $2, $3)', [name, username, password], (error, results) => {
        if (error) {
            console.log(error);
            response.send(error);
        }
        else{
            response.status(201).send(`User added with ID: ${results.insertId}`)
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

module.exports ={
    getOwner,
    signupGuest,
    getPropertyByAll
}