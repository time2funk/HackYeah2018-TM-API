// src/service/db/index.js
const Mongo = require('./Mongo');

const vehicleModel = require('./model/vehicle');
const edgeModel = require('./model/edge');
const vertexModel = require('./model/vertex');
const stationModel = require('./model/station');

const Vehicle = require('./class/Vehicle');
const Edge = require('./class/Edge');
const Vertex = require('./class/Vertex');
const Station = require('./class/Station');

const vehicle = new Vehicle();
const edge = new Edge();
const vertex = new Vertex();
const station = new Station();

module.exports = {
    model: {
        vehicle: vehicleModel,
        edge: edgeModel,
        vertex: vertexModel,
        station: stationModel
    },
    class: {
        vehicle: vehicle,
        edge: edge,
        vertex: vertex,
        station: station
    },
    Mongo: Mongo
}