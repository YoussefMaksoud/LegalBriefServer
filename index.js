//server index

const { json } = require("express");
const express = require("express");
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
var mysql = require('mysql');
var cors = require('cors');

//const PORT = process.env.PORT || 3002;

const app = express();

app.set('port', process.env.PORT || 3000)

app.use(cors());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


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
    console.log("Connected to LegalBrief Database running on ");
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

async function mainMail(name, email, message){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'legalbriefsolutions@gmail.com',
            pass: 'odldjbbsyimmaxan'
        },
    });

    const mailOptions = {
        from: `${email}`,
        to: 'legalbriefsolutions@gmail.com',
        subject: 'Email from legalbrief contact form',
        text: `Name: ${name}\nMessage: ${message}`
    };
    try{
        await transporter.sendMail(mailOptions);
        return Promise.resolve("Message Sent Successfully!");
    }catch(error){
        return Promise.reject(error);
    }
}

app.post('/send-email', async (req, res, next) => {
    
    const {fname, lname, email, message} = req.body;
    console.log(req.body);
    try{
        await mainMail(fname + ' ' + lname, email, message);

        res.send("Message Successfully sent!");
    }catch (error){
        res.send("Message could not be sent")
        console.log(error);
    }
});

app.listen(process.env.PORT || 3000);
