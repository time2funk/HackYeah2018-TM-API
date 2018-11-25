// src/service/db/model/vehicle.js
require('debug')('vehicle model')('include');
const mongoose = require("mongoose");
const VehicleSchema = require('../schema/Vehicle')

module.exports = mongoose.model("Vehicle", VehicleSchema);
