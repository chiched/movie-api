    const connection = require('../config.js');
    const config = require("../db/config");
    const knex = require("knex")(config.db);

module.exports = {
    all: function(req, res) {
        connection.query('SELECT * FROM movies', (err, rows) => {
            if (!err) {     
                let movies = rows.rows;            
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(movies);
            } else {
                res.status(400).send(err);
            }
        });
    },

    create: function(req, res, next) {
        let response;
        const rank = req.body.rank;
        const title = req.body.title;
        const genre = req.body.genre;
        const description = req.body.description;
        const director = req.body.director;
        const actors = req.body.actors;
        const year = req.body.year;
        const runtime = req.body.runtime;
        const rating = req.body.rating;
        const votes = req.body.votes;
        const revenue = req.body.revenue;
        const metascore = req.body.metascore;

        if (
            typeof title !== 'undefined'
            && typeof description !== 'undefined'
        ) {
            connection.query('INSERT INTO movies (rank, title, genre, description, director, actors, year, runtime, rating, votes, revenue, metascore) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
                [rank, title, genre, description, director, actors, year, runtime, rating, votes, revenue, metascore],
                function(err, result) {
                    handleSuccessOrErrorMessage(err, result, res);
                });
    
        } else {
            response = {
                'result' : 'error',
                'msg' : 'Please fill required details'
            };
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        }
    },

    get: function (req,res) {
        connection.query('SELECT * FROM movies WHERE id = ? LIMIT 1', [req.params.id], (err, rows) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(
                {
                    'result' : 'success',
                    'data': rows[0]
                })
            );
        })
    },

update: function (req,res) {
    let response;
    const id = req.params.id;
    const rank = req.body.rank;
    const title = req.body.title;
    const genre = req.body.genre;
    const description = req.body.description;
    const director = req.body.director;
    const actors = req.body.actors;
    const year = req.body.year;
    const runtime = req.body.runtime;
    const rating = req.body.rating;
    const votes = req.body.votes;
    const revenue = req.body.revenue;
    const metascore = req.body.metascore;

    let getQuery = (req) => {
        let presentProps = Object.keys(req);
        let presentVal = Object.values(req);

        let newString = [];

        for (let i = 0; i < presentProps.length; i++) {
            newString.push(presentProps[i] + ' = $' + (i + 2));
            }   
            newString = newString.join(',');
            newString = 'UPDATE movies SET ' + newString + ' WHERE id = $1';
        
        presentVal.unshift(id);
        return [newString, presentVal];
    }

    let values = getQuery(req.body)

    if (true ) { // should check if ID exists
        connection.query(values[0],
            values[1],
            function(err, result) {
                handleSuccessOrErrorMessage(err, result, res);
            });
    } else {
        response = {'result' : name, 'msg' : 'This id doesn\'t exist'};
        res.setHeader('Content-Type', 'application/json');
        res.send(200, JSON.stringify(response));
    }
},

delete: function (req,res) {
    console.log(req.params.id);
    connection.query('DELETE FROM movies WHERE id = $1', 
    [req.params.id], 
    function(err, result) {
        handleSuccessOrErrorMessage(err, result, res);
    });
}
};

function handleSuccessOrErrorMessage (err, result, res) {
    if (!err){
        if (result.affectedRows != 0) {
            response = {'result' : 'success'};
        } else {
            response = {'msg' : 'No Result Found'};
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(response));
    } else {
        res.status(400).send(err);
    }
 }
