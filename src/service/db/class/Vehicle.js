// src/service/db/class/Vehicle.js
const debug = require('debug')('Vehicle Class');
const mongoose = require("mongoose");
const vehicleModel = require('../model/vehicle');

module.exports = class Vehicle {
    constructor () {}

    insert (id, width, heigth, length) {
        debug(`method:insert`, `start`);
        return new Promise((resolve, reject) => {
            if (!(id && width && heigth && length)) 
                reject(`Vehicle:insert: wrong params`);
            else
                new vehicleModel({
                    "id": id,
                    "width": width,
                    "heigth": heigth,
                    "length": length
                }).save((err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
        });
    }

    get () { // get all vehicles
        debug(`method:get`, `start`);
        return new Promise((resolve, reject) => {
            vehicleModel.find({}, function(err, vehicles) {
                if (err) reject(err);
                else {
                    debug(`method:get:response: ${vehicles}`);
                    resolve(vehicles);
                }
            });
        });
    }

    find (id) {
        debug(`method:find`, `start`);
        return new Promise((resolve, reject) => {
            if (!id) 
                reject(`Vehicle:find: id must be specified`);

            vehicleModel.findOne({
                'id': id
            }, (err, vehicle) => {
                if (err) reject(err);
                else {
                    debug(`method:find:response: ${vehicle}`);
                    resolve(vehicle);
                }
            });
        });
    }

    /**
     * 
     * @param {String} id 
     * @param {Object} options {id, width, height, length}
     */
    update (id, options) {
        debug(`method:remove`, `start`);
        return new Promise((resolve, reject) => {
            if (!id) 
                reject('Vehicle:update: id must be specified');
            if (!options)
                reject('Vehicle:update: options must be specified');
            
            vehicleModel.findOne({
                "id": id
            }, function (err, vehicle) {
                if (err) reject(err);
                else {
                    if (options.id && (vehicle.id !== options.id))
                        vehicle.id = options.id
                        
                    if (options.width && (vehicle.width !== options.width))
                        vehicle.width = options.width
                        
                    if (options.height && (vehicle.height !== options.height))
                        vehicle.height = options.height
                        
                    if (options.length && (vehicle.length !== options.length))
                        vehicle.length = options.length

                    vehicle.save(function (err, updatedObj) {
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
                reject('Vehicle:remove: id must be specified');

            if (typeof id === 'string') {
                vehicleModel.deleteOne({ 
                    id: id
                }, function (err) {
                    if (err) reject(err);
                    else resolve();
                });

            } else if (typeof index === 'number') {
                vehicleModel.deleteOne({ 
                    _id: id 
                }, function (err) {
                    if (err) reject(err);
                    else resolve();
                });
                // vehicleModel.find({ 
                //     id: id
                // }).remove( callback );

            } else reject('Vehicle:remove: wrong type');
        });
    }

    purge () {
        debug(`method:purge`, `start`);
        return new Promise((resolve, reject) => {
            vehicleModel.remove({}, function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}