// src/service/db/model/vertex.js
require('debug')('vertex model')('include');
const mongoose = require("mongoose");
const VertexSchema = require('../schema/Vertex')

module.exports = mongoose.model("Vertex", VertexSchema);