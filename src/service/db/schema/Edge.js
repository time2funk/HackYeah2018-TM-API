// src/service/db/schema/Edge.js
const mongoose = require("mongoose");
const VertexSchema = require('./Vertex');

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
    height: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    vertices: {
        first: {
            type: String,
            required: true
        },
        second: {
            type: String,
            required: true
        }
    },
    direction: {
        type: Number,
        required: true
    }
}, {
    collection: "edge"
});
// mongoose.Schema.Types.ObjectId
        // first: {
        //     type: Schema.Types.ObjectId,
        //     ref: "Vertex",
        //     required: true
        // },
        // second: {
        //     type: VertexSchema,
        //     required: true
        // }

        /**
         * value = -1 || 0 || 1
         * 
         *  0 - both sides
         *  1 - from first vertex to last
         * -1 - from last vertex to first
         * 
         */