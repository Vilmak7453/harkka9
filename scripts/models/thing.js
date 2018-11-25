"use strict";
var mongoose = require('mongoose');
var moment = require('moment-timezone');

var Schema = mongoose.Schema;

var ThingSchema = new Schema(
  {
  	name: {type: String, require: true}
  }
);

//Export model
module.exports = mongoose.model('Thing', ThingSchema);