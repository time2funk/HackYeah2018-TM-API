// src/router/index.js
const debug = require('debug')('router');
const ctrl = require('../controller');

module.exports = function(app) {

	app.get('/-/api/test', ctrl.test);
	app.get('/-/api/vertices', ctrl.get.vertices);
	app.get('/-/api/edges', ctrl.get.edges);
	app.get('/-/api/vehicles', ctrl.get.vehicles);
	app.get('/-/api/stations', ctrl.get.stations);

	app.post('/-/api/vertex', ctrl.post.vertex);
	app.post('/-/api/vertices', ctrl.post.vertices);
	app.post('/-/api/edge', ctrl.post.edge);
	app.post('/-/api/edges', ctrl.post.edges);
	app.post('/-/api/vehicle', ctrl.post.vehicle);
	app.post('/-/api/vehicles', ctrl.post.vehicle);
	app.post('/-/api/station', ctrl.post.station);
	app.post('/-/api/stations', ctrl.post.stations);

	app.post('/-/api/vertices/purge', ctrl.delete.vertices);
	app.post('/-/api/edges/purge', ctrl.delete.edges);
	app.post('/-/api/vehicles/purge', ctrl.delete.vehicles);
	app.post('/-/api/stations/purge', ctrl.delete.stations);

	app.post('/-/api/edges/filtered', ctrl.post.filteredEdges);
};