const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sql = require("./db.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to ticketMe." });
});

// Create a route for getting all users
app.get("/users", function(req, res){
    sql.query("select * from users", (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.users(400).send({message: "error in getting all users: " + err});
            return;
        }
        console.log("got all users...");
        res.send(mysqlres);
        return;
    });
});

// Create a route for getting all locations
app.get("/locations", function(req, res){
    sql.query("select * from locations", (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.users(400).send({message: "error in getting all locations: " + err});
            return;
        }
        console.log("got all locations...");
        res.send(mysqlres);
        return;
    });
});

// set port, listen for requests
app.listen(3000, () => {
console.log("Server is running on port 3000.");
});