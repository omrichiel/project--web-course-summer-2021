const sql = require("../DB/db.js");
global.active_user = 'guest';

//get today date
function today() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return (today);
}

//get current time
function currentTime() {
    var now = new Date();
    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    now = hh + ':' + mm + ':' + ss;
    return (now);
}

//record a connection by user to his account and add it to connections table
const addNewConection = function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).render('error_req');
        return;
    }
    sql.query('select * from users where username = ?', [req.body.username], function(err, rows) {
        if (rows.length == 1){
            if (rows[0].username == req.body.username && rows[0].password == req.body.password){
                const connection_time = today() + ' ' + currentTime();
                const newConnection = {
                    "username": req.body.username,
                    "connection_time": connection_time
                };
                sql.query("INSERT INTO connections SET ?", newConnection, (err, mysqlres) => {
                    if (err) {
                        console.log("error: ", err);
                        res.status(400).render('error_req');
                        return;
                    }
                    console.log("created ticket: ", { id: mysqlres.insertId, ...newConnection });
                    active_user = req.body.username;
                    res.render('connecting');
                    return;
                });
            } else {
                res.render('error_connection');
                return;
            }
        } else {
            res.render('error_connection');
            return;
        }
    });
};

//add a new user to users table
const createNewUser = function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).render('error_req');
        return;
    }
    const join_date = today();
    const newUser = {
        "username": req.body.username,
        "email": req.body.email,
        "password": req.body.password,
        "phone_number": req.body.phone_number,
        "join_date": join_date
    };
    sql.query("INSERT INTO users SET ?", newUser, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).render('error_req');
            return;
        }
        console.log("created user: ", { id: mysqlres.insertId, ...newUser });
        active_user = req.body.username;
        res.render('successful_registration');
        return;
    });
};

//add a "contact us" message to contacts table
const createNewContact = function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).render('error_req');
        return;
    }
    const contact_time = today() + ' ' + currentTime();
    const newContact = {
        "full_name": req.body.full_name,
        "phone_number": req.body.phone_number,
        "email": req.body.email,
        "content": req.body.message,
        "contact_time": contact_time
    };
    sql.query("INSERT INTO contacts SET ?", newContact, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).render('error_req');
            return;
        }
        console.log("created user: ", { id: mysqlres.insertId, ...newContact });
        res.render('successful_contact');
        return;
    });
};

//delete a ticket from tickets table
const deleteTicket = function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).render('error_req');;
        return;
    }
    if (req.body.owner == active_user){
        const delete_ticket = req.body.ticketID;

        sql.query("DELETE FROM tickets WHERE ticket_ID = ?", [delete_ticket], (err, mysqlres) => {
            if (err) {
                console.log("error: ", err);
                res.status(400).render('error_req');
                return;
            }
            console.log("deleted ticket: ", { id: mysqlres.insertId, ...delete_ticket });
            res.render('successful_delete_ticket');
            return;
        });
    };
};

//delete an user
const deleteUser = function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).render('error_req');;
        return;
    }
    if (req.body.owner == active_user){
        //delete the user from user table
        sql.query("DELETE FROM users WHERE username = ?", [delete_ticket], (err, mysqlres) => {
            if (err) {
                console.log("error: ", err);
                res.status(400).render('error_req');
                return;
            }
            //delete all the tickets of this deleted user from tickets table
            sql.query("DELETE FROM tickets WHERE owner = ?", [active_user], (err, mysqlres) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(400).render('error_req');
                    return;
                }
            });
            console.log("deleted user: ", { id: mysqlres.insertId, ...delete_user });
            active_user = 'guest';
            res.render('successful_delete_user');
            return;
        });
    };
};

//add a new ticket to tickets table
const createNewTicket = function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).render('error_req');
        return;
    }
    const upload_time = today() + ' ' + currentTime();
    const newTicket = {
        "event_name": req.body.event_name,
        "category": req.body.category,
        "event_date": req.body.date,
        "start_time": req.body.start_time,
        "location_name": req.body.location,
        "address": req.body.address,
        "row_seat": req.body.row,
        "chair": req.body.chair,
        "purchase_price": req.body.purchase_price,
        "sale_price": req.body.sale_price,
        "qunatity": req.body.quantity,
        "phone": req.body.phone,
        "sold": 0,
        "owner": active_user,
        "upload_time": upload_time
    };
    sql.query("INSERT INTO tickets SET ?", newTicket, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).render('error_req');
            return;
        }
        console.log("created ticket: ", { id: mysqlres.insertId, ...newTicket });
        res.render('successful_ticket');
        return;
    });
};

//add a deal to deals table
const createNewDeal = function(req,res){
    // Validate request
    if (!req.body) {
        res.render('successful_ticket');
        return;
    }
    if (active_user == 'guest'){
        res.render('sign in');
        return;
    }
    const deal_time = today() + ' ' + currentTime();
    const newDeal = {
        "ticket_ID": req.body.ticket_ID,
        "ticket_price": req.body.sale_price,
        "seller": req.body.seller,
        "buyer": active_user,
        "deal_datetime": deal_time
    };
    sql.query("INSERT INTO deals SET ?", newDeal, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.render('successful_ticket');
            return;
        }
        console.log("created deal: ", { id: mysqlres.insertId, ...newDeal });
        //update the owner of the buying ticket to the active user (the seller)
        sql.query("UPDATE tickets SET owner = ? WHERE ticket_ID = ?", [active_user, req.body.ticket_ID], (err, mysqlres) => {
            if (err) {
                console.log("error: ", err);
                res.render('error_req');
                return;
            }
            sql.query("UPDATE tickets SET sold=TRUE WHERE ticket_ID = ?", [newDeal.ticket_ID], (err, mysqlres) => {
                if (err) {
                    console.log("error: ", err);
                    res.render('error_req');
                    return;
                }
                console.log("ticket update: ", { id: mysqlres.insertId, ...newDeal.tickets });
                res.render('successful_deal');
                return;
            });
        });
    });
    
};

const getAvailableTickets = function(req, res) {
	var ticketsList = [];
    sql.query('SELECT * FROM availableTickets', function(err, rows) {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // Loop check on each row
            for (var i = 0; i < rows.length; i++) {

                // Create an object to save current row's data
                var ticket = {
                    'ticket_ID':rows[i].ticket_ID,
                    'event_name':rows[i].event_name,
                    'location_name':rows[i].location_name,
                    'address':rows[i].address,
                    'purchase_price':rows[i].purchase_price,
                    'event_date':rows[i].event_date,
                    'start_time':rows[i].start_time,
                    'category':rows[i].category
                }
                // Add object into array
                ticketsList.push(ticket);
                console.log('titcket added to array');
            }
        console.log(ticketsList)
        // Render tickets.pug page using array 
        res.render('tickets', {"ticketsList": ticketsList});
        }
    });
}

const getTicketDetails = function(req, res) {
    var ticketDetails;
    sql.query('SELECT * FROM availableTickets WHERE ticket_ID = ' + req.params.ticket_ID, function(err, rows) {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            if(rows.length == 1) {
                ticketDetails = {
                    'ticket_ID':rows[0].ticket_ID,
                    'event_name':rows[0].event_name,
                    'category':rows[0].category,
                    'row_seat':rows[0].row_seat,
                    'chair':rows[0].chair,
                    'qunatity':rows[0].qunatity,
                    'phone':rows[0].phone,
                    'upload_time':rows[0].upload_time,
                    'sale_price':rows[0].sale_price,
                    'location_name':rows[0].location_name,
                    'address':rows[0].address,
                    'purchase_price':rows[0].purchase_price,
                    'event_date':rows[0].event_date,
                    'start_time':rows[0].start_time,
                    'owner':rows[0].owner
                }
                console.log(ticketDetails);
                res.render('ticket_page', {"ticketDetails": ticketDetails});
            } else {
                // render not found page
                res.status(404).json({"status_code":404, "status_message": "Ticket not found"});
            }
        }
  });
}

const getMyProfile = function(req, res) {
    if (active_user == 'guest'){
        res.render('sign in');
    }
	var forSale = [];   //array of all the tickets that the active user uploaded and offers for sale
    var sells = [];     //array of all the tickets that the active user already sold
    var purchases = []; //arry of all the tickets that the active user bought 
    sql.query('SELECT * FROM userTickets', [active_user], function(err, rows) {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // Loop check on each row
            for (var i = 0; i < rows.length; i++) {
                if (active_user == rows[i].owner){
                    // Create an object to save current row's data
                    var saleTicket = {
                        'ticket_ID':rows[i].ticket_ID,
                        'event_name':rows[i].event_name,
                        'location_name':rows[i].location,
                        'address':rows[i].address,
                        'purchase_price':rows[i].price,
                        'event_date':rows[i].event_date,
                        'start_time':rows[i].start_time,
                        'category':rows[i].category
                    }
                    // Add object into array
                    forSale.push(saleTicket);
                    console.log('titcket added to array');
                }
            }
            console.log(forSale);

            for (var i = 0; i < rows.length; i++) {
                if (active_user == rows[i].seller) {
                    // Create an object to save current row's data
                    var sellTicket = {
                        'ticket_ID':rows[i].ticket_ID,
                        'event_name':rows[i].event_name,
                        'location_name':rows[i].location,
                        'address':rows[i].address,
                        'purchase_price':rows[i].price,
                        'event_date':rows[i].event_date,
                        'start_time':rows[i].start_time,
                        'category':rows[i].category
                    }
                    // Add object into array
                    sells.push(sellTicket);
                    console.log('titcket added to array');
                }
            }
            console.log(sells);

            for (var i = 0; i < rows.length; i++) {
                if (active_user == rows[i].buyer) {
                    // Create an object to save current row's data
                    var buyTicket = {
                        'ticket_ID':rows[i].ticket_ID,
                        'event_name':rows[i].event_name,
                        'location_name':rows[i].location,
                        'address':rows[i].address,
                        'purchase_price':rows[i].price,
                        'event_date':rows[i].event_date,
                        'start_time':rows[i].start_time,
                        'category':rows[i].category
                    }
                    // Add object into array
                    purchases.push(buyTicket);
                    console.log('titcket added to array');
                }
            }
            console.log(purchases);
            res.render('my_profile', {"forSale": forSale, "sells": sells, "purchases": purchases});
        }
    });
}

//active user updating his account details
const updateUser = function(req, res) {
    // Validate request
    if (!req.body) {
        res.render('error_req');
        return;
    }
    const updatePassword = req.body.password;
    //chainging password
    sql.query("UPDTATE users SET password = ? WHERE username = ?", [updatePassword, active_user], (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).render('error_req');
            return;
        }
        console.log("created user: ", { id: mysqlres.insertId, ...updatePassword });
        res.render('successful_update');
        return;
    });
}

//get data of the tickets in the home page
const getHomePage = function(req, res) {
    var todayEventsList = [];       //array of all the ticket that occurs today
    var lastUploadsList = [];       //array of the 10 last uploaded tickets to the website
    var discountTicketsList = [];   //array of the tickets that sells at lower price then it boughts
    sql.query('SELECT * FROM availableTickets order by upload_time desc', function(err, rows) {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // Loop check on each row
            //today
            for (var i = 0; i < rows.length; i++) {
                if (today() == rows[i].event_date){
                    // Create an object to save current row's data
                    var todayEvent = {
                        'ticket_ID':rows[i].ticket_ID,
                        'event_name':rows[i].event_name,
                        'location_name':rows[i].location,
                        'address':rows[i].address,
                        'purchase_price':rows[i].price,
                        'event_date':rows[i].event_date,
                        'start_time':rows[i].start_time,
                        'category':rows[i].category
                    }
                    // Add object into array
                    todayEventsList.push(todayEvent);
                    console.log('titcket added to array');
                }
            }
            console.log(todayEventsList);
            //upload
            for (var i = 0; i < 10; i++) {
                // Create an object to save current row's data
                var uploadTicket = {
                    'ticket_ID':rows[i].ticket_ID,
                    'event_name':rows[i].event_name,
                    'location_name':rows[i].location,
                    'address':rows[i].address,
                    'purchase_price':rows[i].price,
                    'event_date':rows[i].event_date,
                    'start_time':rows[i].start_time,
                    'category':rows[i].category
                }
                // Add object into array
                lastUploadsList.push(uploadTicket);
                console.log('titcket added to array');
                if (i+1 == rows.length){
                    break;
                }
            }
            console.log(lastUploadsList);
            //discount
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].sale_price < rows[i].purchase_price) {
                    // Create an object to save current row's data
                    var discountTicket = {
                        'ticket_ID':rows[i].ticket_ID,
                        'event_name':rows[i].event_name,
                        'location_name':rows[i].location,
                        'address':rows[i].address,
                        'purchase_price':rows[i].price,
                        'event_date':rows[i].event_date,
                        'start_time':rows[i].start_time,
                        'category':rows[i].category
                    }
                    // Add object into array
                    discountTicketsList.push(discountTicket);
                    console.log('titcket added to array');
                }
            }
            console.log(discountTicketsList);
            res.render('home_page', {"todayEventsList": todayEventsList,"lastUploadsList": lastUploadsList, 
                "discountTicketsList":discountTicketsList, 'active_user': active_user});
        }
    });
}

module.exports = {createNewContact, createNewUser, createNewTicket, deleteTicket, createNewDeal, 
    deleteUser, updateUser, addNewConection, getAvailableTickets, getTicketDetails, getMyProfile, getHomePage}