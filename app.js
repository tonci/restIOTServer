var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    MongoClient = require('mongodb').MongoClient;

var DBurl = 'mongodb://localhost:27017/IOTServer';

var app = express();

app.TH_COLLECTION = "th";

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

MongoClient.connect(DBurl, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    var routes = require("./routes/routes.js")(app, db);

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});
