// src/service/db/class/Edge.js
const debug = require('debug')('Edge Class');
const mongoose = require("mongoose");
const edgeModel = require('../model/edge');

module.exports = class Edge {
    constructor () {}

    /**
     * 
     * @param {String} id 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Boolean} available 
     * @param {String} firstVertex 
     * @param {String} secondVertex 
     * @param {Number} direction (-1 || 0 || 1)
     */
    insert (id, width, height, available, firstVertex, secondVertex, direction = 0) {
        // direction : Number
        //  0 - both sides
        //  1 - from first vertex to last
        // -1 - from last vertex to first
        debug(`method:insert`, `start`);
        return new Promise((resolve, reject) => {
            console.log({

                    "id": id,
                    "width": width,
                    "height": height,
                    "available": available,
                    "vertices": {
                        "first": firstVertex,
                        "second": secondVertex
                    },
                    "direction": direction
            });
            // if (!(id && width 
            //         && height 
            //         && available 
            //         && firstVertex
            //         && secondVertex))
            //     reject(`Edge:insert: wrong params`);
            // else if (!(firstVertex instanceof Vertex && secondVertex instanceof Vertex))
            //     reject(`Edge:insert: wrong Vertex param`);
            // else 
            // if (direction !== 0 && direction !== -1 && direction !== 1)
            //     reject(`Edge:insert: wrong direction param`);

            // else
                new edgeModel({
                    "id": id,
                    "width": width,
                    "height": height,
                    "available": available,
                    "vertices": {
                        "first": firstVertex,
                        "second": secondVertex
                    },
                    "direction": direction
                }).save((err, result) => {
                    if (err) reject(err);
                    else console.log('booooya');
                    resolve(result);
                });
        });
    }

    get () { // get all edges
        debug(`method:get`, `start`);
        return new Promise((resolve, reject) => {
            edgeModel.find({}, function(err, edges) {
                if (err) reject(err);
                else {
                    debug(`method:get:response: ${edges}`);
                    resolve(edges);
                }
            });
        });
    }

    /**
     * 
     * @param {String} id 
     * @param {Object} options 
        options = {
            width, 
            height, 
            available, 
            vertices: {
                first: Vertex
                last: Vertex
            }
        }
     */
    update (id, options) {
        debug(`method:remove`, `start`);
        return new Promise((resolve, reject) => {
            if (!id) 
                reject('Edge:update: id must be specified');
            if (!options)
                reject('Edge:update: options must be specified');
            
            // else if (!(options.firstVertex && options.firstVertex instanceof Vertex && 
            //             options.secondVertex && options.secondVertex instanceof Vertex))
            //     reject(`Edge:update: wrong Vertex parametric in options`);
            if ('direction' in options)
                if (!(options.direction === 0 || options.direction === -1 || options.direction === 1))
                    reject(`Edge:update: wrong direction parametric in options`);

            edgeModel.findOne({
                "id": id
            }, function (err, edge) {
                if (err) reject(err);
                else {
                    if ('id' in options)
                        if (edge.id !== options.id)
                            edge.id = options.id;

                    if ('width' in options)
                        if (edge.width !== options.width)
                            edge.width = options.width;
                    
                    if ('height' in options)
                        if (edge.height !== options.height)
                            edge.height = options.height;

                    if ('available' in options)
                        if (edge.available !== options.available)
                            edge.available = options.available;

                    if ('direction' in options)
                        if (edge.direction !== options.direction)
                            edge.direction = options.direction;
                    
                    if ('firstVertex' in options)
                        if (edge.vertices.first !== options.firstVertex)
                            edge.vertices.first = options.firstVertex;
                    if ('secondVertex' in options)
                        if (edge.vertices.second !== options.secondVertex)
                            edge.vertices.second = options.secondVertex;

                    edge.save(function (err, updatedObj) {
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
                reject('Edge:remove: id must be specified');

            edgeModel.deleteOne({ 
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
            edgeModel.remove({}, function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}