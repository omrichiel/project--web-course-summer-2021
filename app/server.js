const express = require("express");
const bodyParser = require("body-parser");
const path = require ('path');
const app = express();
const sql = require("./DB/db.js");
const CRUD = require("./routes/CRUD_operations.js");


// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));



app.get("/", CRUD.getHomePage);

app.get("/connecting", (req, res) =>{
    res.render('connecting');
});

app.get("/sign_out", (req, res) =>{
    active_user = 'guest';
    res.render('sign_out');
});

app.get("/tickets", CRUD.getAvailableTickets);

//for specific ticket
app.get("/tickets/:ticket_ID", CRUD.getTicketDetails);

app.get("/my_profile", CRUD.getMyProfile);

//start pug conection
app.get("/About", (req, res) =>{
    res.render('About');
});

app.get("/add_tickets", (req, res) =>{
    res.render('add_tickets');
});

app.get("/Contact_page", (req, res) =>{
    res.render('Contact_page');
});

app.get("/FAQ", (req, res) =>{
    res.render('FAQ');
});

app.get("/policy", (req, res) =>{
    res.render('policy');
});

app.get("/registration", (req, res) =>{
    res.render('registration');
});

app.get("/sign_in", (req, res) =>{
    res.render('sign in');
});

app.get("/tickets", (req, res) =>{
    res.render('tickets');
});

//end pug conection


//sign in
app.post("/new_connection", CRUD.addNewConection);

//update_user
app.post("/update_user_detales", CRUD.updateUser);

app.get("/update_user", (req, res) =>{
    res.render('update_user');
});

//update_user
app.post("/delete_user", CRUD.deleteUser);

//new contact message
app.post("/contact", CRUD.createNewContact);

//create a new user
app.post("/new_user", CRUD.createNewUser);

//create a new ticket
app.post("/new_ticket", CRUD.createNewTicket);

//create a new dael
app.post("/new_deal", CRUD.createNewDeal);

//delete ticket
app.post("/delete_ticket", CRUD.deleteTicket);




// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});