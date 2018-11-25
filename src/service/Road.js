// src/service/Road.js
const debug = require('debug')('Road');
const Point = require('./Point');

// Road class
module.exports = class Road {
    /**
     * 
     * @param {Point} point1 
     * @param {Point} point2 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Boolean} availability 
     */
    constructor (point1, point2, width, height, availability) {
        if ((!point1 || !point2 || !height || !availability) 
            || !(point1 instanceof Point)
            || !(point2 instanceof Point))
            throw new Error('Road:constructor', 'wrong params');
        
        this.points = [point1, point2];
        this.width = width;
        this.height = height;
        this.availabe = availability;
    }

}