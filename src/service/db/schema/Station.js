// src/service/db/schema/Station.js
const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    edge: {
        type: String,
        required: true
    },
    vertex: {
        type: String,
        required: true
    }
}, {
    collection: "station"
});