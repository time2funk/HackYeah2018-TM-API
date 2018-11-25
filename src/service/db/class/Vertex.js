// src/service/db/class/Vertex.js
const debug = require('debug')('Vertex Class');
const mongoose = require("mongoose");
const vertexModel = require('../model/vertex');

module.exports = class Vertex {
    constructor () {}

    insert (id, x, y, lat, lon) {
        debug(`method:insert`, `start`);
        return new Promise((resolve, reject) => {
            if (!(id && x && y && lat && lon))
                reject(`Vertex:insert: wrong params`);
            else
                new vertexModel({
                    "id": id,
                    "x": x,
                    "y": y,
                    "lat": lat,
                    "lon": lon
                }).save((err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
        });
    }

    get () { // get all vertices
        debug(`method:get`, `start`);
        return new Promise((resolve, reject) => {
            vertexModel.find({}, function(err, vertices) {
                if (err) reject(err);
                else {
                    debug(`method:get:response: ${vertices}`);
                    resolve(vertices);
                }
            });
        });
    }

    update (id, options) {
        debug(`method:remove`, `start`);
        return new Promise((resolve, reject) => {
            if (!id) 
                reject('Vertex:update: id must be specified');
            if (!options)
                reject('Vertex:update: options must be specified');

            vertexModel.findOne({
                "id": id
            }, function (err, vertex) {
                if (err) reject(err);
                else {
                    if (options.id && (vertex.id !== options.id))
                        vertex.id = id;
                    if (options.x && (vertex.x !== options.x))
                        vertex.x = x;
                    if (options.y && (vertex.y !== options.y))
                        vertex.y = y;
                    if (options.lat && (vertex.lat !== options.lat))
                        vertex.lat = options.lat;
                    if (options.lon && (vertex.lon !== options.lon))
                        vertex.lon = options.lon;

                    vertex.save(function (err, updatedObj) {
                        if (err) reject(err);
                        else resolve();
                    });
                }
            });
        });
    }

    remove (id) {
        debug(`method:remove`, `start`);
        return new Promise((resolve, reject) => {
            if (!id) 
                reject('Vertex:remove: id must be specified');

            vertexModel.deleteOne({ 
                id: id
            }, function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    purge () {
        debug(`method:purge`, `start`);
        return new Promise((resolve, reject) => {
            vertexModel.remove({}, function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}