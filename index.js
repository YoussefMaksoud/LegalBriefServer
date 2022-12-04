//server index

const { json } = require("express");
const express = require("express");
var mysql = require('mysql');

const PORT = process.env.PORT || 3002;

const app = express();

var con = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    port: '3006',
    user: "bca689b78c2bfe",
    password: "b056ac87",
    database: "legaltree"
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

// app.get("/optionsInitial", (req, res) => {
//     console.log("reading table");
//     con.query("SELECT * FROM heroku_4048796efb1faa6.legaltree WHERE parent = 'none'", (err, rows, fields) => {
//         if(err){
//             console.log(err);
//         }else{
//             res.json({message: rows});
//         }
//     });
// });

// app.get("/nextOptionSet/:id", (req, res) => {
//     var parent = req.params.id;
//     var requestString = "SELECT * FROM heroku_4048796efb1faa6.legaltree WHERE parent = '" + parent + "'";
//     console.log(requestString);
//     con.query(requestString, (err, rows, fields) => {
//         if(err){
//             console.log(err);
//         }else{
//             res.json({message: rows});
//         }
//     });
// });

// app.listen(PORT, () => {

//     console.log(`Server listening on ${PORT}`);
// });