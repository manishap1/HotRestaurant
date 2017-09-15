var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Star Wars Characters (DATA)
// =============================================================
var tableData = [{
  Name: "Jade",
  PhoneNumber: 5125555555,
  Email: "Jade@gmail.com",
  customerID: 900,
  tableNumber:1
  
}, 
 {
  Name: "Erin",
  PhoneNumber: 51200000,
  Email: "erin@gmail.com",
  customerID: 10111,
  tableNumber:4
  
}];

var waitList = []

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "reserv.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "table.html"));
});


// Get all characters
app.get("/all", function(req, res) {
  res.json(tableData);
});

app.get("/waitlist", function(req, res) {
  res.json(waitList);
});

// Search for Specific Character (or all characters) - provides JSON
// app.get("/api/:table?", function(req, res) {
//   var chosen = req.params.tableData;

//   if (chosen) {
//     console.log(chosen);

//     for (var i = 0; i < tableData.length; i++) {
//       if (chosen === tableData[i].routeName) {
//         return res.json(tableData[i]);
//       }
//     }
//     return res.json(false);
//   }
//   return res.json(tableData);
// });

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  var newReservation = req.body;

  console.log(newReservation);

  if (tableData.length>5){
    waitList.push(newReservation);
    res.json({failed: true});
  } else {
      tableData.push(newReservation);
      res.json(newReservation);
  }

 // this going to send back data
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
