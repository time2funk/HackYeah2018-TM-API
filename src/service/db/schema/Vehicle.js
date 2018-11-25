// src/service/db/schema/Vehicle.js
const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    width: {
        type: Number,
        required: true
    },
    heigth: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    }
}, {
    collection: "vehicle"
});