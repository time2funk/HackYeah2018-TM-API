// src/service/db/model/edge.js
require('debug')('edge model')('include');
const mongoose = require("mongoose");
const EdgeSchema = require('../schema/Edge')

module.exports = mongoose.model("Edge", EdgeSchema);