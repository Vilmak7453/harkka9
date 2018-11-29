"use strict";
var express = require("express");
var app = express();
var server = require("http").Server(app);
var path = require("path");
var thingController = require("./scripts/controllers/thingController");

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/dist'));

//Set mongoose connection
var mongoose = require('mongoose');
//var mongoDB = 'mongodb://mongo:27017/localLibrary';
var mongoDB = 'mongodb://192.168.99.100:27017/localLibrary';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/dist/views"));

app.get("/", function(req, res) {

	res.redirect("/bestlist");
});

app.get("/bestlist", function(req, res) {

	res.render("bestlist", {title: "Kivoja asioita"});
});

app.post("/bestlist", function(req, res) {

	res.render("bestlist", {title: "Kivoja asioita"});
});


app.post("/addThing", function(req, res) {

	thingController.save_thing(req.body.thing);
});

app.get("/retrieveThings", thingController.retrieve_things);

app.post("/removeThing", function(req, res) {

	thingController.remove_thing(req.body.thing);
})

server.listen(PORT, function() {

	console.log(`Listening on ${PORT}`);
});