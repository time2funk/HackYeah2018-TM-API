// src/service/Mongo.js
const debug = require('debug')('Mongo');
const config = require('config');
const mongoose = require("mongoose");

let connected = null;

module.exports = class Mongo {
    constructor () {}

    init () {
        return new Promise((resolve, reject) => {
            if (connected) resolve();

            mongoose.connect(config.db.uri, { 
                useNewUrlParser: true 
            }).then(() => {
                debug('Database is connected');
                connected = true;
                initModels();
                resolve();
            }, err => { 
                debug('Can not connect to the Mondo DB'+ err);
                connected = false;
                reject();
            });
        });
    }
}

const initModels = () => {
    try {
        debug('Mongo Models requiring');
        require('./model/edge');
        require('./model/vehicle');
        require('./model/vertex');
    } catch (error) {
        console.error(error);
        throw new Error('there was some errors with Mongo Models');
    }
}