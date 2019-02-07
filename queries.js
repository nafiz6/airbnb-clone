const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'airbnb2'
})

const getOwner = (request, response) => {
    id = parseInt(request.params.id)
    pool.query('SELECT * FROM public."Owner" WHERE id = $1', [id], (error, results)=> {
        if (error){
            throw error
        }
        response.send(results.rows)
    });
}

const signupGuest = (request, response)=>{
    var name = request.body.name;
    var username = request.body.username;
    var password = request.body.password;
    pool.query('INSERT INTO public."Guests" (name, username,password) VALUES ($1, $2, $3)', [name, username, password], (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const getPropertyByAll = (request, response)=>{

}

module.exports ={
    getOwner,
    signupGuest
}