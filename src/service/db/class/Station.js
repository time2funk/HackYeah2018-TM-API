// src/service/db/class/Station.js
const debug = require('debug')('Station Class');
const mongoose = require("mongoose");
const stationModel = require('../model/station');

module.exports = class Station {
    constructor () {}

    /**
     * 
     * @param {String} id 
     * @param {String} edge on
     * @param {String} vertex to 
     */
    insert (id, edge, vertex) {
        debug(`method:insert`, `start`);
        return new Promise((resolve, reject) => {
            if (!(id && edge && vertex))
                reject(`Station:insert: wrong params`);
            else
                new stationModel({
                    "id": id,
                    "edge": edge,
                    "vertex": vertex,
                }).save((err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
        });
    }

    get () { // get all Stations
        debug(`method:get`, `start`);
        return new Promise((resolve, reject) => {
            stationModel.find({}, function(err, Stations) {
                if (err) reject(err);
                else {
                    debug(`method:get:response: ${Stations}`);
                    resolve(Stations);
                }
            });
        });
    }

    /**
     * 
     * @param {String} id 
     * @param {Object} options 
        options = {
            id,
            edge,
            vertex
        }
     */
    update (id, options) {
        debug(`method:remove`, `start`);
        return new Promise((resolve, reject) => {
            if (!id) 
                reject('Station:update: id must be specified');
            if (!options)
                reject('Station:update: options must be specified');

            stationModel.findOne({
                "id": id
            }, function (err, station) {
                if (err) reject(err);
                else {
                    if ('id' in options)
                        if (station.id !== options.id)
                            station.id = options.id;

                    if ('vertex' in options)
                        if (station.vertex !== options.vertex)
                            station.vertex = options.vertex;

                    if ('edge' in options)
                        if (station.edge !== options.edge)
                            station.edge = options.edge;

                    station.save(function (err, updatedObj) {
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
                reject('Station:remove: id must be specified');

            stationModel.deleteOne({ 
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
            stationModel.remove({}, function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}