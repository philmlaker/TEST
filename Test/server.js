/* MongoDB Zoo Site (18.2.4)
 * Back-end
 * ========================= */

// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var mongojs = require("mongojs");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

// Initialize Express


// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "myDb";
var collections = ["myCollection"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});


// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res) {
  res.send("Hello world");
});

// 2. At the "/all" path, display every entry in the animals collection
app.get("/all", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  db.myCollection.find({}, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
      console.log(found);
    }
  });
});

// 3. At the "/name" path, display every entry in the animals collection, sorted by name
app.get("/find/:id", function(req, res) {
	var test_id = req.param('id');

  db.myCollection.find({"Test Name": test_id }, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
      console.log("From server");
      console.log(found);
      
    }
  });
  });

  


// 4. At the "/weight" path, display every entry in the animals collection, sorted by weight
app.get("/weight", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by weight (-1 means descending order)
 db.animals.find().sort({ weight: -1 }, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});


app.post("/submit", function(req, res) {

  // Save the request body as an object called book
  var firstname = JSON.stringify(req.body);
  var book = req.body;

  console.log("This is from server " + firstname);

  // If we want the object to have a boolean value of false,
  // we have to do it here, because the ajax post will convert it
  // to a string instead of a boolean
 

  // Save the book object as an entry into the books collection in mongo
  db.test.save(book, function(error, saved) {
    // Show any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the response to the client (for AJAX success function)
    else {
      res.send(saved);
    }
  });
});






// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});


