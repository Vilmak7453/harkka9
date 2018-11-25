"use strict";
var Thing = require("../models/thing");

exports.save_thing = function(newThing) {
	
	console.log("Saving thing " + newThing);

	var thing = new Thing({
		name: newThing
	});
	thing.save(
		function (err) {
            if (err) { 
            	console.log("Saving thing failed.");
            	return; }
			console.log("thing saved " + newThing);
    });
};

exports.retrieve_things = function(req, res, next) {

	Thing.find().exec(
		function(err, thing_list) {
			if (err) { console.log(err); return next(err); }

			res.send(thing_list);
	});
}

exports.remove_thing = function(rmThing) {

	Thing.find({'name' : rmThing}).deleteOne().exec(function(err) {
		if(err)
			console.log("Removing " + rmThing + " failed");
		else
			console.log("Removing " + rmThing + " successful");
	});
}