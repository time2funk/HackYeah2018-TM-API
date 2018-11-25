// src/service/db/schema/Vertex.js
const mongoose = require("mongoose");
const EdgeSchema = require('./Edge');

module.exports = new mongoose.Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    edges: [{
        type: String
    }]
}, {
    collection: "vertex"
});
