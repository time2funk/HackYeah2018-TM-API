// src/service/db/model/station.js
require('debug')('station model')('include');
const mongoose = require("mongoose");
const StationSchema = require('../schema/Station')

module.exports = mongoose.model("Station", StationSchema);
