//server index

const { json } = require("express");
const express = require("express");
var mysql = require('mysql');
var cors = require('cors');

//const PORT = process.env.PORT || 3002;

const app = express();

app.set('port', process.env.PORT || 3000)

app.use(cors());

var con = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    user: "bca689b78c2bfe",
    password: "b056ac87",
    database: "heroku_4048796efb1faa6"

    // host: "localhost",
    // user: "root",
    // password: "password",
    // database: "legalbrief"
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected to LegalBrief Database");
});

// con.on("connect", err => {
//     if(err){
//         console.error(err.message);
//     }else{
//         console.log("reading table");
//         con.query("SELECT * FROM legaltree", (err, rows, fields) => {
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log(rows);
//             }
//         });
//     }
// })

app.get("/optionsInitial", (req, res) => {
    console.log("reading table");
    con.query("SELECT * FROM legaltree WHERE parent = 'none'", (err, rows, fields) => {
        if(err){
            console.log(err);
        }else{
            res.json({message: rows});
        }
    });
});

app.get("/nextOptionSet/:id", (req, res) => {
    var parent = req.params.id;
    var requestString = "SELECT * FROM legaltree WHERE parent = '" + parent + "'";
    console.log(requestString);
    con.query(requestString, (err, rows, fields) => {
        if(err){
            console.log(err);
        }else{
            res.json({message: rows});
        }
    });
});

app.listen(process.env.PORT || 3000);
